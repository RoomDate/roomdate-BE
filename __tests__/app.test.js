const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

const seedEducation = require('../data/seedEducation');
const seedEmployment = require('../data/seedEmployment');
const seedPreferences = require('../data/seedPreferences');
const seedRoles = require('../data/seedRoles');
const seedUsernames = require('../data/seedUsernames');
const seedUsersInfo = require('../data/seedUsersInfo');
const seedUsersProfile = require('../data/seedUsersProfile');
const { use } = require('../lib/app.js');

describe('roomdate routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('hshshs', async () => {
    expect(true).toEqual(true);
  });
  //----------------------------------------------------------------------------------//

  it('SEED users_main', async () => {

    const usersMainData = await Promise.all(seedUsernames.map(async (username) =>  await pool.query(`
        INSERT INTO users_main ( google_id, username) 
        VALUES($1, $2) RETURNING *`, [username.google_id, username.username])));

    expect(usersMainData).toEqual(seedUsernames);
  });

  //----------------------------------------------------------------------------------//

  it('SEED employment', async () => {
    const userEmployment = await Promise.all(seedEmployment.map(async (employee) =>  await pool.query(`
        INSERT INTO employment (employment_status) 
        VALUES($1) RETURNING *`, [employee.employment_status])));

    expect(userEmployment).toEqual(seedEmployment);
  });

  //----------------------------------------------------------------------------------//

  it('SEED education', async () => {
    const userEducation = await Promise.all(seedEducation.map(async (education) =>  await pool.query(`
        INSERT INTO education (education_status) 
        VALUES($1) RETURNING *`, [education.education_status])));

    expect(userEducation).toEqual(seedEducation);
  });

  //----------------------------------------------------------------------------------//
  it('SEED roles', async () => {
    const userRole = await Promise.all(seedRoles.map(async (role) =>  await pool.query(`
        INSERT INTO roles (role_type) 
        VALUES($1) RETURNING *`, [role.role_type])));

    expect(userRole).toEqual(seedRoles);
  });

  //----------------------------------------------------------------------------------//

  it('SEED users_info', async () => {
    const userInformation = await Promise.all(seedUsersInfo.map(async (userInfo) =>  await pool.query(`
        INSERT INTO users_info (
          first_name, 
          username, 
          last_name, 
          dob, 
          gender, 
          zipcode, 
          bio, 
          smoke, 
          drugs, 
          alcohol, 
          introvert, 
          extrovert, 
          cleanlieness, 
          pets) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [userInfo.first_name, userInfo.username, userInfo.last_name, userInfo.dob, userInfo.gender, userInfo.zipcode, userInfo.bio, userInfo.smoke, userInfo.drugs, userInfo.alcohol, userInfo.introvert, userInfo.extrovert, userInfo.cleanlieness, userInfo.pets]))
    );

    expect(userInformation).toEqual(seedUsersInfo);
  });

  //----------------------------------------------------------------------------------//
  
  it('SEED preferences', async () => {
    const userPreferences = await Promise.all(seedPreferences.map(async (userPrefer) =>  await pool.query(`
        INSERT INTO preferences(
            username,
            smoke,
            gender,
            drugs,
            alcohol,
            introvert,
            extrovert,
            cleanlieness,
            pets,
            age,
            radius,
            employment_status,
            education_status) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`, [userPrefer.username, userPrefer.smoke, userPrefer.gender, userPrefer.drugs, userPrefer.alcohol, userPrefer.introvert, userPrefer.extrovert, userPrefer.cleanlieness, userPrefer.pets, userPrefer.age, userPrefer.radius, userPrefer.employment_status, userPrefer.education_status]))
    );

    expect(userPreferences).toEqual(seedPreferences);
  });

  //----------------------------------------------------------------------------------//

  it('SEED users_profile', async () => {
    const userProfile = await Promise.all(seedUsersProfile.map(async (userProf) =>  await pool.query(`
        INSERT INTO users_profile(
          preference_username,
          username,
          role_type,
          employment_id ,
          education_id,
          user_info ) 
          VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [
      userProf.preference_username, 
      userProf.username, 
      userProf.role_type, 
      userProf.employment_id, 
      userProf.education_id, 
      userProf.user_info
    ]))
    );

    expect(userProfile).toEqual(seedUsersProfile);
  });

  //----------------------------------------------------------------------------------//

  afterAll(() => {
    pool.end();
  });
});
