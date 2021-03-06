
const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
// const notSeen = require('../lib/utils/helper');

const seedEducation = require('../data/seedEducation');
const seedEmployment = require('../data/seedEmployment');
const seedPreferences = require('../data/seedPreferences');
const seedRoles = require('../data/seedRoles');
const seedUsernames = require('../data/seedUsernames');
const seedUsersInfo = require('../data/seedUsersInfo');
const seedUsersProfile = require('../data/seedUsersProfile');
const User = require('../lib/models/User.js');

describe('roomdate routes', () => {
    beforeAll(() => {
        return setup(pool);
    });

    it('hshshs', async () => {
        expect(true).toEqual(true);
    });
    //----------------------------------------------------------------------------------//

    it('SEED users_main', async () => {

        await Promise.all(seedUsernames.map(async (username) =>  await pool.query(`
        INSERT INTO users_main (username) 
        VALUES($1) RETURNING *`, [username.username])));

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
            userProf.preference_id, 
            userProf.username, 
            userProf.role_id, 
            userProf.job_id, 
            userProf.edu_id, 
            userProf.user_info_id
        ]))
        );

        expect(true).toEqual(true);
    });


    //---------****-----------------------------******-----------------------------------//
  
    xit('POST new user to data base', async () => {
        await User.insertNewUser({ username: 'user24' });
        expect(true).toEqual(true);
    }); 

    //---------****-----------------------------******-----------------------------------//
    
    // it('POST new user to data base BY ROUTE', async () => {
    //     const res  = await request(app).post('/api/v1/users/signup').send({ username:'mikey' });

    //     expect(res.body).toEqual({ username: 'mikey' });
    // }); 

    //---------****-----------------------------******-----------------------------------//
    //     it('POST new user BUT already exist should get 500 already exist', async () => {
    //       const res  = await request(app).post('/api/v1/users/signup').send({ username:'mikey' });

    //       expect(res.status).toEqual(500);
    //   }); 

    //---------****-----------------------------******-----------------------------------//
  
    xit('POST new users_info', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user5' });
        const res =  await agent.post('/api/v1/users/usersinfo').send({
            first_name: 'El Chupacabra',
            username:'user5',
            job_status: '1',
            edu_status: '3',
            last_name: 'Scaryman',
            dob: '1990-02-14',
            age:31,
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
            pets: expect.any(Boolean),
        });




    }); 


    //----------------------------------------------------------------------------------//



    xit('POST login returns the user that is logging in', async () => {
        const agent = request.agent(app);
        const res = await agent.post('/api/v1/users/login').send({ username: 'user2' });
      
        expect(res.body).toEqual({ username: 'user2' });
    });
    
    //----------------------------------------------------------------------------------//

    // it('GET zipcode and returns all users in a 5 mile radius', async () => {
    //     const agent = request.agent(app);
    //     await agent.post('/api/v1/users/login').send({ username: 'user1' });        
    //     const res = await agent.get('/api/v1/users/zipcode/80204');

    //     // console.log('EHEHEHHEEH', res.body);
      
    //     expect(res.body).toEqual(expect.any(Array));
    // });
    
    //----------------------------------------------------------------------------------//

    xit('GET zipcode and returns all users in a 5 mile radius, but only roommies', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user2' });        
        const res = await agent.get('/api/v1/users/roommies/zipcode/80204');

        let bool = true;
        for(let i = 0; i < res.body.length; i++){
            if(res.body[i].type !== 'roommie'){
                bool = false;
            }

        }
        expect(bool).toEqual(true);
    });
    
    //----------------------------------------------------------------------------------//

    xit('GET zipcode and returns all users in a 5 mile radius, but only housers', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user1' });        
        const res = await agent.get('/api/v1/users/roommies/zipcode/80204');

        let bool = true;
        for(let i = 0; i < res.body.length; i++){
            if(res.body[i].type !== 'houser'){
                bool = false;
            }

        }
        
        expect(bool).toEqual(true);
    });
    
    //----------------------------------------------------------------------------------//

    xit('Like a profile POST/', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user1' });        
        await agent.get('/api/v1/users/roommies/zipcode/80204');

        const res = await agent.post('/api/v1/users/likes/4');

        expect(res.body).toEqual({
            first_name: expect.any(String),
            last_name: expect.any(String),
            smoke: expect.any(Boolean),
            alcohol: expect.any(Boolean),
            drugs: expect.any(Boolean),
            pets: expect.any(Boolean),
            type: 'roommie',
            edu_status: expect.any(String),
            job_status: expect.any(String),
            zipcode: '80204',
            bio: expect.any(String),
            id:'4'
        });
    });
    //----------------------------------------------------------------------------------//
    xit('Like a profile POST/ PART 2', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user4' });        
        await agent.get('/api/v1/users/roommies/zipcode/80204');

        const res = await agent.post('/api/v1/users/likes/1');

        expect(res.body).toEqual({ 'id': '1', 'unique_key': 'user1user4', 'user_a': 'user4', 'user_b': 'user1' });
    });
    //----------------------------------------------------------------------------------//

    xit('view matches GET/ ', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user4' });        
        const res = await agent.get('/api/v1/users/matches');
        expect(res.body).toEqual([{ 'id': '1', 'unique_key': 'user1user4', 'user_a': 'user4', 'user_b': 'user1' }]);
    });
    //----------------------------------------------------------------------------------//
    xit('Disike a profile POST/', async () => {
        const agent = request.agent(app);
        await agent.post('/api/v1/users/login').send({ username: 'user1' });        
        await agent.get('/api/v1/users/roommies/zipcode/80204');

        const res = await agent.post('/api/v1/users/dislikes/3');

        expect(res.body).toEqual({
            first_name: expect.any(String),
            last_name: expect.any(String),
            smoke: expect.any(Boolean),
            alcohol: expect.any(Boolean),
            drugs: expect.any(Boolean),
            pets: expect.any(Boolean),
            type: 'houser',
            edu_status: expect.any(String),
            job_status: expect.any(String),
            zipcode: '80204',
            bio: expect.any(String),
            id:'3'
        });
    });
    //----------------------------------------------------------------------------------//
    // it('gets an arry of objects of disliked and likes users', async () => {

    //     const list  = await User.getDislikedAndLiked('user1');

    //     expect(list).toEqual([{ disliked_user:'user2', liked_user: 'user3' }]);
    // });
    //----------------------------------------------------------------------------------//

    xit('filters out already liked and disliked people nearby', async () => {



        const filteredNearby = await User.roommiesNearBy('user1', 80204);
        console.log('CRISTIAN LOVES APPLES AND WATER', filteredNearby);

        expect(filteredNearby).toEqual([
            {
                id: '2',
                first_name: 'Angelina',
                last_name: 'Jolie',
                smoke: false,
                alcohol: true,
                drugs: false,
                pets: true,
                type: 'houser',
                edu_status: 'in college',
                job_status: 'unemployed',
                zipcode: '80209',
                bio: 'Hello, I am Tomb Raider',
                username: 'user2'
            }
        ]);
    });
    //----------------------------------------------------------------------------------//

    afterAll(() => {
        pool.end();
    });
});
