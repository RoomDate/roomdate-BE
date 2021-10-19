
const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

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
