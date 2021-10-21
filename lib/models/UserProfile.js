const pool = require('../utils/pool');

module.exports = class UserProfile {
    id;
    preference_id;
    username;
    role_id;
    job_id;
    edu_id;
    user_info_id;

    constructor(row) {
        this.id = row.id;
        this.preference_id = row.preference_id;
        this.username = row.username;
        this.role_id = row.role_id;
        this.job_id = row.job_id;
        this.edu_id = row.edu_id;
        this.user_info_id = row.user_info_id;
    }

    static async create({ preference_id, username, role_id, job_id, edu_id, user_info_id }){
        const { rows } = await pool.query(
            `INSERT INTO users_profile (
                preference_id,
                username,
                role_id,
                job_id,
                edu_id,
                user_info_id
                ) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *`, [preference_id, username, role_id, job_id, edu_id, user_info_id]
        );

        return new UserProfile(rows[0]);
    }
    static async delete(id){
        const { rows } = await pool.query(
            'DELETE FROM users_profile WHERE id = $1', [id]
        );
        return rows[0];
    }
};
   
