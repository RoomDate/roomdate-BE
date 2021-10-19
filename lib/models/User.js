
const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');
const getZipcodes = require('../utils/helper');

module.exports = class User {

    constructor(row){
        this.google_id = row.google_id;
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
             SELECT * FROM users_info WHERE zipcode=$1`, [allZips[i]]);
            
            if(rows.length !== 0){
          
                arrZips.push(rows);
            }
        }
        return arrZips.flatMap(x => x);

    }

    static async roommiesNearBy(username, zipcode){
        const allZips = await getZipcodes(zipcode);
        const type = await this.currentUser(username);
        console.log(type.type);

        let tipo = '';
        if(type.type  ===  'houser'){
            tipo = 'roommie';
        } else if(type.type  ===  'roommie'){
            tipo = 'houser';
        }


        const { rows } = await pool.query(`
        SELECT first_name,last_name, smoke, alcohol, drugs, pets, roles.type, education.edu_status,employment.job_status, zipcode, bio  FROM users_info
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
