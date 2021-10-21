const pool = require('../utils/pool');

module.exports = class Match {
    id;
    user_a;
    user_b;
    unique_key;

    constructor(row) {
        this.id = row.id;
        this.user_a = row.user_a;
        this.user_b = row.user_b;
        this.unique_key = row.unique_key;
    };

    static async create({ user_a, user_b, unique_key }) {
        const { rows } = await pool.query(
            `INSERT INTO matches (user_a, user_b, unique_key)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [user_a, user_b, unique_key]
        );
        // console.log('rows', rows);
        return new Match(rows[0]);
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
}