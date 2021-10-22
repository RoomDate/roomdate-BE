const pool = require('../utils/pool');

module.exports = class UserInfo {
    id;
    first_name;
    username;
    job_status;
    edu_status;
    last_name;
    dob;
    age;
    gender;
    zipcode;
    bio;
    smoke;
    drugs;
    alcohol;
    introvert;
    extrovert;
    cleanliness;
    pets;

    constructor(row) {
        this.id = row.id;
        this.first_name = row.first_name;
        this.username = row.username;
        this.job_status = row.job_status;
        this.edu_status = row.edu_status;
        this.last_name = row.last_name;
        this.dob = row.dob;
        this.age = row.age;
        this.gender = row.gender;
        this.zipcode = row.zipcode;
        this.bio = row.bio;
        this.smoke = row.smoke;
        this.drugs = row.drugs;
        this.alcohol = row.alcohol;
        this.introvert = row.introvert;
        this.extrovert = row.extrovert;
        this.cleanliness = row.cleanliness;
        this.pets = row.pets;
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

    static async update(id, { first_name, username, job_status, edu_status, last_name, dob, age, gender, zipcode, bio, smoke, drugs, alcohol, introvert, extrovert, cleanliness, pets }) {
        const { rows } = await pool.query(
            `UPDATE users_info 
            SET 
            first_name= $2,
            username= $3,
            job_status= $4, 
            edu_status= $5,
            last_name= $6,
            dob= $7,
            age= $8,
            gender= $9,
            zipcode= $10,
            bio= $11,
            smoke= $12,
            drugs= $13,
            alcohol= $14,
            introvert= $15,
            extrovert= $16,
            cleanliness= $17,
            pets= $18
            WHERE id=$1 
            RETURNING *`,
            [id, first_name, username, job_status, edu_status, last_name, dob, age, gender, zipcode, bio, smoke, drugs, alcohol, introvert, extrovert, cleanliness, pets]
        );
        return new UserInfo(rows[0]);
    }
};
