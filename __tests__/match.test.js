const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const notSeen = require('../lib/utils/helper');

const seedEducation = require('../data/seedEducation');
const seedEmployment = require('../data/seedEmployment');
const seedPreferences = require('../data/seedPreferences');
const seedRoles = require('../data/seedRoles');
const seedUsernames = require('../data/seedUsernames');
const seedUsersInfo = require('../data/seedUsersInfo');
const seedUsersProfile = require('../data/seedUsersProfile');
const User = require('../lib/models/User.js');

describe.skip('roomdate routes', () => {
    beforeAll(() => {
        return setup(pool);
    });

    //----------------------------------------------------------------------------------//

    it('SEED users_main', async () => {

        await Promise.all(seedUsernames.map(async (username) =>  await pool.query(`
        INSERT INTO users_main ( google_id, username) 
        VALUES($1, $2) RETURNING *`, [username.google_id, username.username])));

        expect(true).toEqual(true);
    });

    //----------------------------------------------------------------------------------//

    it('SEED employment', async () => {
        await Promise.all(seedEmployment.map(async (employee) =>  await pool.query(`
        INSERT INTO employment (job_status) 
        VALUES($1) RETURNING *`, [employee.employment_status])));

        expect(true).toEqual(true);
    });

    //----------------------------------------------------------------------------------//

    it('SEED education', async () => {
        await Promise.all(seedEducation.map(async (education) =>  await pool.query(`
        INSERT INTO education (edu_status) 
        VALUES($1) RETURNING *`, [education.education_status])));

        expect(true).toEqual(true);
    });

    //----------------------------------------------------------------------------------//
    it('SEED roles', async () => {
        await Promise.all(seedRoles.map(async (role) =>  await pool.query(`
        INSERT INTO roles (type) 
        VALUES($1) RETURNING *`, [role.role_type])));

        expect(true).toEqual(true);
    });

    //----------------------------------------------------------------------------------//

    it('SEED users_info', async () => {
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

        expect(true).toEqual(true);
    });

    //----------------------------------------------------------------------------------//
  
    it('SEED preferences', async () => {
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

        expect(true).toEqual(true);
    });

    //----------------------------------------------------------------------------------//

    it('SEED users_profile', async () => {
        await Promise.all(seedUsersProfile.map(async (userProf) =>  await pool.query(`
        INSERT INTO users_profile(
          preference_id,
          username,
          role_id,
          job_id ,
          edu_id,
          user_info_id ) 
          VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [
            userProf.preference_username, 
            userProf.username, 
            userProf.role_type, 
            userProf.employment_id, 
            userProf.education_id, 
            userProf.user_info
        ]))
        );

        expect(true).toEqual(true);
    });





    it('Like a profile POST and MATCH', async () => {
        const agent = request.agent(app);
        await agent
            .post('/api/v1/users/login')
            .send({ username: 'user1' });        
        await agent
            .get('/api/v1/users/roommies/zipcode/80204');
        await agent
            .post('/api/v1/users/likes/4');
        await agent
            .post('/api/v1/users/login')
            .send({ username: 'user4' }); 
        await agent
            .get('/api/v1/users/roommies/zipcode/80204');
        await agent
            .post('/api/v1/users/likes/1');       
        
        await agent
            .get('/api/v1/users/likes/1');

        const res = await agent
            .post('/api/v1/users/matches/1');

        expect(res.body).toEqual({ 'id': '1', 'unique_key': 'user1user4', 'user_a': 'user4', 'user_b': 'user1' });
        });

  //----------------------------------------------------------------------------------//

    it('view matches GET/ ', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user4' });        
        const res = await agent.get('/api/v1/users/matches/1');
        expect(res.body).toEqual([{ 'id': '1', 'unique_key': 'user1user4', 'user_a': 'user4', 'user_b': 'user1' }]);
    });

  //----------------------------------------------------------------------------------//    

    it('DELETES a match', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user4' });
        const res = await agent 
            .delete('/api/v1/users/likes/1');
         

        expect(res.body).toEqual({
            id: expect.any(String),
            unique_key: expect.any(String),
            user_a: expect.any(String),
            user_b: expect.any(String),
        });
    });

    afterAll(() => {
        pool.end();
    });

});