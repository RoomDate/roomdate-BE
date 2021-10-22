
const seedEducation = require('./data/seedEducation');
const seedEmployment = require('./data/seedEmployment');
const seedPreferences = require('./data/seedPreferences');
const seedRoles = require('./data/seedRoles');
const seedUsernames = require('./data/seedUsernames');
const seedUsersInfo = require('./data/seedUsersInfo');
const seedUsersProfile = require('./data/seedUsersProfile');
const pool = require('./lib/utils/pool.js');

const seed = async () => {

    await Promise.all(seedUsernames.map(async (username) =>  await pool.query(`
        INSERT INTO users_main (username) 
        VALUES($1) RETURNING *`, [username.username])));

   
    //----------------------------------------------------------------------------------//

   
    await Promise.all(seedEmployment.map(async (employee) =>  await pool.query(`
        INSERT INTO employment (job_status) 
        VALUES($1) RETURNING *`, [employee.employment_status])));

    //----------------------------------------------------------------------------------//


    await Promise.all(seedEducation.map(async (education) =>  await pool.query(`
        INSERT INTO education (edu_status) 
        VALUES($1) RETURNING *`, [education.education_status])));

   
    //----------------------------------------------------------------------------------//
    
    await Promise.all(seedRoles.map(async (role) =>  await pool.query(`
        INSERT INTO roles (type) 
        VALUES($1) RETURNING *`, [role.role_type])));

  

    //----------------------------------------------------------------------------------//

 
    await Promise.all(seedUsersInfo.map(async (userInfo) =>  await pool.query(`
        INSERT INTO users_info (
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
          pets) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`, [userInfo.first_name, userInfo.username, userInfo.job_status, userInfo.edu_status, userInfo.last_name, userInfo.dob, userInfo.age, userInfo.gender, userInfo.zipcode, userInfo.bio, userInfo.smoke, userInfo.drugs, userInfo.alcohol, userInfo.introvert, userInfo.extrovert, userInfo.cleanlieness, userInfo.pets]))
    );


    //----------------------------------------------------------------------------------//
  
    
    await Promise.all(seedPreferences.map(async (userPrefer) =>  await pool.query(`
        INSERT INTO preferences(
            username,
            smoke,
            gender,
            drugs,
            alcohol,
            introvert,
            extrovert,
            cleanliness,
            pets,
            age,
            radius,
            job_status,
            edu_status) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`, [userPrefer.username, userPrefer.smoke, userPrefer.gender, userPrefer.drugs, userPrefer.alcohol, userPrefer.introvert, userPrefer.extrovert, userPrefer.cleanlieness, userPrefer.pets, userPrefer.age, userPrefer.radius, userPrefer.employment_status, userPrefer.education_status]))
    );

 
    //----------------------------------------------------------------------------------//


    await Promise.all(seedUsersProfile.map(async (userProf) =>  await pool.query(`
        INSERT INTO users_profile(
          preference_id,
          username,
          role_id,
          job_id ,
          edu_id,
          user_info_id ) 
          VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [
        userProf.preference_id, 
        userProf.username, 
        userProf.role_id, 
        userProf.job_id, 
        userProf.edu_id, 
        userProf.user_info_id
    ]))
    );

   
};


seed(); 
