
const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');
const getZipcodes = require('../utils/helper');


module.exports = class User {

    
    constructor(row){

    
        // this.google_id = row.google_id;
        this.username = row.username;
       
        
    }


    static async getUser({ username }){
    
        const { rows } = await pool.query(`
        
        SELECT * FROM users_main
        WHERE username = $1`, [username]);

        if(!rows[0]) return null;
        
        return new User(rows[0]);

    }

    

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
        SELECT users_profile.id, first_name,last_name, smoke, alcohol, drugs, pets, roles.type, education.edu_status,employment.job_status, zipcode, bio  FROM users_info
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
        return rows;
    }

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


    static async insertNewUser({ google_id, username }){
        const { rows } = await pool.query(
            'INSERT INTO users_main (google_id, username) VALUES ($1, $2) RETURNING *', [google_id, username]
        );

        return  new User(rows[0]);
    }




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






    static async sendLike(id, current_user){
        const liked_profile = await this.getProfileById(id);
        await pool.query(
            'INSERT INTO likes (user_owner, liked_user) VALUES ($1, $2)', 
            [current_user, liked_profile.username]
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

  



    authToken(){
        return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
            expiresIn: '24h'
        });
    }

    toJSON(){
        return{
            username: this.username,
        };
    }



};
