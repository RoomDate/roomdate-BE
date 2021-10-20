const pool = require('../lib/utils/pool.js');
const request = require('supertest');
// const seedData = require('../data/seedPreferences.js');
const setup = require('../data/setup.js');
const app = require('../lib/app.js');
const User = require('../lib/models/User.js');
const seedEducation = require('../data/seedEducation.js');
// const seedRoles = require('../data/seedRoles.js');
const seedEmployment = require('../data/seedEmployment.js');


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



describe('roomdate preference routes', () => {
    beforeAll(() => {
        return setup(pool);
    });

    it('SEED education', async () => {
        await Promise.all(seedEducation.map(async (education) =>  await pool.query(`
        INSERT INTO education (edu_status) 
        VALUES($1) RETURNING *`, [education.education_status])));

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




    

    afterAll(() => {
        pool.end();
    });
});


