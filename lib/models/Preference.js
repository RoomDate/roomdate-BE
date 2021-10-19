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
    jobStatus;
    eduStatus;

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
        this.job_status = row.jobStatus;
        this.edu_status = row.eduStatus;
    }

    static async create({ username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, jobStatus, eduStatus }) {
        const { rows } = await pool.query(
            `INSERT INTO preferences (username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, jobStatus, eduStatus)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *`,
            [username, smoke, gender, drugs, alcohol, introvert, extrovert, cleanliness, pets, age, radius, jobStatus, eduStatus]
        );
        console.log('rows', rows);
        return new Preference(rows[0]);
    }
};

