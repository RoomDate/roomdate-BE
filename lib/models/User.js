
const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');
const getZipcodes = require('../utils/helper');


module.exports = class User {

    
    constructor(row){

        this.google_id = row.google_id;
        this.username = row.username;
       
    }

    //------------------------------------------------------------------------------------//
    static async getUser({ username }){
    
        const { rows } = await pool.query(`
        
        SELECT * FROM users_main
        WHERE username = $1`, [username]);

        if(!rows[0]) return null;
        
        return new User(rows[0]);

    }

    //------------------------------------------------------------------------------------//
    static async getAllInZipcode(zipcode){
        const allZips = await getZipcodes(zipcode);
        // const allZips = allInfo.DataList.map(zips => zips.Code);
        const arrZips = [];

        for(let i = 0; i < allZips.length ; i++){
            
            const { rows } = await pool.query(`
             SELECT * FROM users_info WHERE zipcode=ANY($1)`, [allZips[i]]
            );
            
            if(rows.length !== 0){
          
                arrZips.push(rows);
            }
        }
        return arrZips.flatMap(x => x);

    }
    //------------------------------------------------------------------------------------//
    static async roommiesNearBy(username, zipcode){
        const allZips = await getZipcodes(zipcode);
        const type = await this.currentUser(username);

        let tipo = '';
        if(type.type  ===  'houser'){
            tipo = 'roommie';
        } else if(type.type  ===  'roommie'){
            tipo = 'houser';
        }

        const { rows } = await pool.query(`
        SELECT users_profile.id, 
        first_name,
        last_name, 
        smoke, 
        alcohol, 
        drugs, 
        pets, 
        roles.type, 
        education.edu_status,
        employment.job_status, 
        zipcode, 
        bio,
        users_profile.username 
        FROM users_info
        LEFT JOIN users_profile
        ON users_info.id = users_profile.id
        LEFT JOIN roles
        ON roles.id = users_profile.role_id
        LEFT JOIN education
        ON education.id = users_profile.edu_id
        LEFT JOIN employment
        ON employment.id = users_profile.job_id
        WHERE zipcode=ANY($1) AND roles.type =$2`, [allZips, tipo]);
        //console.log( rows) coming back from luch.

 
        const liked_users = await this.getLikedUsers(username);
        const disliked_users = await this.getDislikedUsers(username);
        const seen_users = liked_users.concat(disliked_users);
        const filteredNearby = await this.notSeen(rows, seen_users);

        console.log('LOOK HERE MY MAN', filteredNearby);
        return filteredNearby;
    }




    //------------------------------------------------------------------------------------//


    static async notSeen(allpeopleNearby, seenPeople){
       
        const obj = {};
        const notSeenArr = [];
        //list of seen people
        for(let i = 0; i < seenPeople.length; i++){
            if(!obj[seenPeople[i].username]){
                obj[seenPeople[i].username] = seenPeople[i].username; 
            }
        }
        //list all in area
        for(let i = 0; i < allpeopleNearby.length; i++){
            if(!obj[allpeopleNearby[i].username]){
        
                notSeenArr.push(allpeopleNearby[i]); 
            }
        }
       
        return notSeenArr;
    }
        
    //------------------------------------------------------------------------------------//
    static async currentUser(username){
        const { rows } = await pool.query(`
        SELECT 
        first_name,
        roles.type, 
        users_info.username,
        zipcode,
        age, 
        dob
        FROM users_info
        LEFT JOIN users_profile
        ON users_info.id = users_profile.id
        LEFT JOIN roles
        ON roles.id = users_profile.role_id
        WHERE users_info.username =$1`, [username]);

        return rows[0];
    }
    //------------------------------------------------------------------------------------//
    static async insertNewUser({ google_id, username }){
        const { rows } = await pool.query(
            'INSERT INTO users_main (google_id, username) VALUES ($1, $2) RETURNING *', [google_id, username]
        );
        console.log(rows[0]);
        return rows[0];
    }

    //------------------------------------------------------------------------------------//
    static async getProfileById(id){

        const { rows } = await pool.query(`
    
    
    SELECT 
    users_profile.id, 
    users_info.username,
    first_name,last_name, 
    smoke, 
    alcohol, 
    drugs,
    pets, 
    roles.type, 
    education.edu_status,
    employment.job_status, 
    zipcode,
    bio  
    FROM users_info
    LEFT JOIN users_profile
    ON users_info.id = users_profile.id
    LEFT JOIN roles
    ON roles.id = users_profile.role_id
    LEFT JOIN education
    ON education.id = users_profile.edu_id
    LEFT JOIN employment
    ON employment.id = users_profile.job_id
    WHERE users_info.id = $1 `, [id]);

        return rows[0]; 

    }
    //------------------------------------------------------------------------------------//
    static async sendLike(id, current_user){
        const liked_profile = await this.getProfileById(id);

        const unique_key = this.uniqueKey(liked_profile.username, current_user);
        console.log('UNIQUE KEY:', unique_key);

        const unique_key_exist = await pool.query(`
        SELECT * 
        FROM likes
        WHERE likes.unique_key = $1
        `, [unique_key]);
        console.log('UNIQUE KEY EXIST:', unique_key_exist.rows);
        if(unique_key_exist.rows.length === 0){

            await pool.query(
                'INSERT INTO likes (user_owner, liked_user, unique_key) VALUES ($1, $2, $3)', 
                [current_user, liked_profile.username, unique_key]
            );

            const obj = {

                'alcohol' : liked_profile.alcohol,
                'bio' : liked_profile.bio,
                'drugs' : liked_profile.drugs,
                'edu_status' : liked_profile.edu_status, 
                'job_status' : liked_profile.job_status,
                'first_name' : liked_profile.first_name,
                'last_name' : liked_profile.last_name,
                'pets' : liked_profile.pets,
                'smoke' : liked_profile.smoke,
                'type' : liked_profile.type,
                'zipcode' : liked_profile.zipcode,
                'id' : liked_profile.id
    
            };
          
            return obj;
        }


        const { rows } = await pool.query(`
        INSERT INTO matches
        (user_a, user_b, unique_key)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [current_user, liked_profile.username, unique_key]); 

        return rows[0];
      
    }
    //------------------------------------------------------------------------------------//
    static async sendDislike(id, current_user){
        const disliked_profile = await this.getProfileById(id);
        await pool.query(
            'INSERT INTO dislikes (user_owner, disliked_user) VALUES ($1, $2)', 
            [current_user, disliked_profile.username]
        );
        const obj = {

            'alcohol' : disliked_profile.alcohol,
            'bio' : disliked_profile.bio,
            'drugs' : disliked_profile.drugs,
            'edu_status' : disliked_profile.edu_status, 
            'job_status' : disliked_profile.job_status,
            'first_name' : disliked_profile.first_name,
            'last_name' : disliked_profile.last_name,
            'pets' : disliked_profile.pets,
            'smoke' : disliked_profile.smoke,
            'type' : disliked_profile.type,
            'zipcode' : disliked_profile.zipcode,
            'id' : disliked_profile.id
        };
      
        return obj;
    }
    //------------------------------------------------------------------------------------//

    static async insertNewUserInfo(objBody){
        const { rows } = await pool.query(
            `INSERT INTO users_info (
                first_name,
                username,
                job_status,
                edu_status,
                last_name,
                dob,
                age,
                gender,
                zipcode,
                bio,
                smoke,
                drugs,
                alcohol,
                introvert,
                extrovert,
                cleanliness,
                pets
                ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
                RETURNING *`, [objBody.first_name, objBody.username, objBody.job_status, objBody.edu_status, objBody.last_name, objBody.dob, objBody.age, objBody.gender, objBody.zipcode, objBody.bio, objBody.smoke, objBody.drugs, objBody.alcohol, objBody.introvert, objBody.extrovert, objBody.cleanliness, objBody.pets]
        );

        return rows[0];
    }
    //------------------------------------------------------------------------------------//

    static async getLikedUsers(username){

        const { rows } = await pool.query(`

        SELECT  
            liked_user as username
            FROM likes
            WHERE likes.user_owner = $1
        `, [username]);
        return rows; 
    }

    //------------------------------------------------------------------------------------//

    static async getMatches(username){

        const { rows } = await pool.query(`

        SELECT *
        FROM matches
        WHERE user_a = $1 OR user_b = $1
        `, [username]);
        return rows; 
    }

    //------------------------------------------------------------------------------------//
    static async getDislikedUsers(username){

        const { rows } = await pool.query(`

        SELECT  
            disliked_user as username
            FROM dislikes
            WHERE dislikes.user_owner = $1
        `, [username]);
        return rows; 
    }

    //------------------------------------------------------------------------------------//

    static sumChars(str){

        let sum = 0;
        
        for(let i = 0; i < str.length; i++){
        
            sum = sum + str.charCodeAt(i);
        }
        
        return sum;
        
    }
        
        
        
        
    static uniqueKey(userA, userB){
        
        
        let str = '';
        const sumA = this.sumChars(userA);
        const sumB = this.sumChars(userB);
        
        
        if(sumA < sumB){
        
            str = userA + userB;
        }
        else{
        
            str = userB + userA;
        }
        
        return str;
        
    }


    //-------------------------------------------------------------------------------------//
  
    authToken(){
        return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
            expiresIn: '24h'
        });
    }
    //------------------------------------------------------------------------------------//
    toJSON(){
        return{
            // google_id: this.google_id,
            username: this.username,
        };
    }
    //------------------------------------------------------------------------------------//


};
