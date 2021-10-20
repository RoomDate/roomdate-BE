const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const seedData = require('../data/seedPreferences.js');
const setup = require('../data/setup.js');
const app = require('../lib/app.js');
const Preference = require('../lib/models/Preference.js');


describe('roomdate preference routes', () => {
    beforeAll(() => {
        return setup(pool);
    });

    xit('posts new roommate preferences', async () => {
        const agent = request.agent(app);
        const res = await agent
            .post('/api/v1/preferences')
            .send(seedData[0]);
        expect(res.body).toEqual(seedData[0]);
    });

        it('updates a users preferences', async () => {
        const entry = await Preference.create(seedData[0]);
        const updateEntry = {
            id: 1,
            username: 'user1',
            gender: '',
            smoke: true,
            drugs: true,
            alcohol: false,
            introvert: true,
            extrovert: true,
            cleanlieness: 4,
            pets: false,
            age: 19,
            radius: 5,
            jobStatus: 2,
            eduStatus: 1
        };

        return request(app)
            .put('/api/v1/preferences')
            .send(updateEntry);
        expect(res.body).toEqual({ id: '1', ...updateEntry });
    });
});

