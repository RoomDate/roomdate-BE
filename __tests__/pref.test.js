const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const setup = require('../data/setup.js');
const app = require('../lib/app.js');
const User = require('../lib/models/User.js');
const seedEducation = require('../data/seedEducation.js');
const seedEmployment = require('../data/seedEmployment.js');
const seedUsersProfile = require('../data/seedUsersProfile.js');
const seedPreferences = require('../data/seedPreferences.js');
const seedUsersInfo = require('../data/seedUsersInfo.js');
const seedRoles = require('../data/seedRoles.js');
const seedUsernames = require('../data/seedUsernames.js');


const userInfoTemplate = {
    first_name: 'El Chupacabra',
    username:'user5',
    job_status: '1',
    edu_status: '3',
    last_name: 'Scaryman',
    dob: '1990-02-14',
    age: 31,
    gender:'female',
    zipcode: '80206',
    bio: 'I love blood, I am super friendly',
    smoke: true,
    drugs: true,
    alcohol: false,
    introvert: true,
    extrovert: false,
    cleanliness: 4,
    pets: false
};

const userPreferenceTemplate = {
    username:'user5',
    smoke: true,
    gender: 'female',
    drugs: true,
    alcohol: false,
    introvert: true,
    extrovert: false,
    cleanliness: 4,
    pets: false,
    age: 31,
    radius: 3,
    job_status: 3,
    edu_status:3
};


describe.skip('roomdate preference routes', () => {
    beforeAll(() => {
        return setup(pool);
    });

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


    //----------------------------------------------------------------------------------//

    it('posts new roommate preferences', async () => {
        const agent = request.agent(app);
        await User.insertNewUser({ google_id: '122.3445.224', username: 'user5' });
        await agent.post('/api/v1/users/login').send({ username: 'user5' });
        await agent.post('/api/v1/users/usersinfo').send(userInfoTemplate);

        const res = await agent
            .post('/api/v1/preferences')
            .send(userPreferenceTemplate);
        expect(res.body).toEqual({
            id:expect.any(String),
            username:expect.any(String),
            smoke: expect.any(Boolean),
            gender: expect.any(String),
            drugs: expect.any(Boolean),
            alcohol: expect.any(Boolean),
            introvert: expect.any(Boolean),
            extrovert: expect.any(Boolean),
            cleanliness: expect.any(Number),
            pets: expect.any(Boolean),
            age: expect.any(Number),
            radius: expect.any(Number),
            job_status: expect.any(String),
            edu_status:expect.any(String)
        });
    });

    //----------------------------------------------------------------------------------//    
    it('PUT an existing user', async () => {
        // const entry = await Preference.create(seedData[0]);
        const agent = request.agent(app);
        const updateEntry = {
            id: '5',
            username: 'user5',
            smoke: true,
            gender: '',
            drugs: true,
            alcohol: false,
            introvert: true,
            extrovert: true,
            cleanliness: 4,
            pets: false,
            age: 19,
            radius: 5,
            job_status: '2',
            edu_status: '1'
        };

        await agent.post('/api/v1/users/login').send({ username: 'user5' });
        const res =  await agent.put('/api/v1/preferences/5').send(updateEntry);

        expect(res.body).toEqual(updateEntry);
    });

    //----------------------------------------------------------------------------------//    
    it('PUT an existing user with no authorized user', async () => {
        // const entry = await Preference.create(seedData[0]);
        const agent = request.agent(app);
        const updateEntry = {
            id: '5',
            username: 'user5',
            smoke: true,
            gender: '',
            drugs: true,
            alcohol: false,
            introvert: true,
            extrovert: true,
            cleanliness: 4,
            pets: false,
            age: 19,
            radius: 5,
            job_status: '2',
            edu_status: '1'
        };

        await agent.post('/api/v1/users/login').send({ username: 'user4' });
        const res =  await agent.put('/api/v1/preferences/5').send(updateEntry);

        expect(res.status).toEqual(403);
    });


    afterAll(() => {
        pool.end();
    });
});


