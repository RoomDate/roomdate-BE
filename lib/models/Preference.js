const pool = require('../utils/pool');

module.exports = class Preference {
    id;
    username;
    smoke;
    gender;
    drugs;
    alcohol;
    introvert;
    extrovert;
    cleanliness;
    pets;
    age;
    radius;
    job_status;
    edu_status;

    constructor(row) {
        this.id = row.id;
        this.username = row.username;
        this.smoke = row.smoke;
        this.gender = row.gender;
        this.drugs = row.drugs;
        this.alcohol = row.alcohol;
        this.introvert = row.introvert;
        this.extrovert = row.extrovert;
        this.cleanliness = row.cleanliness;
        this.pets = row.pets;
        this.age = row.age;
        this.radius = row.radius;
        this.job_status = row.job_status;
        this.edu_status = row.edu_status;
    }

    static async create({ username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, job_status, edu_status }) {
        const { rows } = await pool.query(
            `INSERT INTO preferences (username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, job_status, edu_status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *`,
            [username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, job_status, edu_status]
        );
        // console.log('rows', rows);
        return new Preference(rows[0]);

    }

    //----------------------------------------------------------------------------------//  
    static async update(id, { username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, job_status, edu_status }) {
        const { rows } = await pool.query(
            `UPDATE preferences 
            SET 
            username = $2, 
            smoke = $3, 
            gender= $4, 
            drugs = $5, 
            alcohol = $6, 
            introvert=$7,
            extrovert=$8, 
            cleanliness=$9, 
            pets=$10, 
            age=$11, 
            radius=$12, 
            job_status=$13, 
            edu_status=$14
            WHERE id=$1 
            RETURNING *`,
            [id, username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, job_status, edu_status]
        );
        return new Preference(rows[0]);
    }
};

