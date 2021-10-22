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
// const { use } = require('../lib/app.js');
const User = require('../lib/models/User.js');


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

// const userPreferenceTemplate = {
//     username:'user5',
//     smoke: true,
//     gender: 'female',
//     drugs: true,
//     alcohol: false,
//     introvert: true,
//     extrovert: false,
//     cleanliness: 4,
//     pets: false,
//     age: 31,
//     radius: 3,
//     job_status: 3,
//     edu_status:3
// };

jest.mock('../lib/middleware/ensureAuth.js', () => {
    return (req, res, next) => {
        req.user = {
            username: 'randolf',
            // iat: Date.now(),
            // exp: Date.now(),
        };
  
        next();
    };
});



describe('user_info roomdate routes', () => {

    beforeAll(() => {
        return setup(pool);
    });

    it('hshshs', async () => {
        expect(true).toEqual(true);
    });
    //----------------------------------------------------------------------------------//

    it('SEED users_main', async () => {

        await Promise.all(seedUsernames.map(async (users_main) =>  await pool.query(`
        INSERT INTO users_main (username) 
        VALUES($1) RETURNING *`, [users_main.username])));

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

    it('POST new users_info', async () => {
        await User.insertNewUser({ username:'randolf' });
        const agent = request.agent(app);
        // await agent
        //     .post('/api/v1/users/usersinfo')
        //     .send(userInfoTemplate);

        const res =  await agent
            .post('/api/v1/usersinfo')
            .send({
                first_name: 'El Chupacabra',
                username:'randolf',
                job_status: 1,
                edu_status: 3,
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
            });

        expect(res.body).toEqual({
            id:expect.any(String),
            first_name: expect.any(String),
            username: expect.any(String),
            job_status: expect.any(String),
            edu_status: expect.any(String),
            last_name: expect.any(String),
            dob: expect.any(String),
            age: expect.any(Number),
            gender:expect.any(String),
            zipcode: expect.any(String),
            bio: expect.any(String),
            smoke: expect.any(Boolean),
            drugs: expect.any(Boolean),
            alcohol: expect.any(Boolean),
            introvert: expect.any(Boolean),
            extrovert: expect.any(Boolean),
            cleanliness: expect.any(Number),
            pets: expect.any(Boolean)
        });

    });

    it('updates an existing users userinfo', async () => {
        const agent = request.agent(app);
        const updateEntry = {
            id: '5',
            first_name: 'randolf',
            username:'user5',
            job_status: '1',
            edu_status: '3',
            last_name: 'Scaryman',
            dob: '1990-02-14T07:00:00.000Z',
            age:31,
            gender:'nonexistant',
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

        // await agent
        //     .post('/api/v1/auth/login')
        //     .send({ username: 'user5' });
        const res =  await agent
            .put('/api/v1/usersinfo/5')
            .send(updateEntry);

        expect(res.body).toEqual(updateEntry);
    });

    xit('tries to update an existing users userinfo without being authorized', async () => {
        const agent = request.agent(app);
        const updateEntry = {
            id: '5',
            first_name: 'El Chupacabra',
            username:'user5',
            job_status: '1',
            edu_status: '3',
            last_name: 'Scaryman',
            dob: '1990-02-14T08:00:00.000Z',
            age:31,
            gender:'nonexistant',
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

        await agent
            .post('/api/v1/users/login')
            .send({ username: 'user4' });
        const res =  await agent
            .put('/api/v1/users/usersinfo/5')
            .send(updateEntry);

        expect(res.status).toEqual(403);
    });


    xit('POST new users_info', async () => {
        const agent = request.agent(app);
        const res = await agent.get('/api/v1/auth/verify');
        console.log(res.body);
        expect(res.body).toEqual({ username:'randolf' });

    });


    afterAll(() => {
        pool.end();
    });
});
