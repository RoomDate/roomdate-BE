const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const seedData = require('../data/seedPreferences.js');
const setup = require('../data/setup.js');
const app = require('../lib/app.js');


describe('roomdate preference routes', () => {
    beforeAll(() => {
        return setup(pool);
    });

    it('posts new roommate preferences', async () => {
        const agent = request.agent(app);
        const res = await agent
            .post('/api/v1/preferences')
            .send(seedData[0]);
        expect(res.body).toEqual(seedData[0]);
    });
});

