
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
        const allInfo = await getZipcodes(zipcode);
        const allZips = allInfo.DataList.map(zips => zips.Code);
    
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
