const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
// const request = require('supertest');
// const app = require('../lib/app.js');
// const { use } = require('../lib/app.js');
// const getZipcodes = require('../lib/utils/helper.js');

describe('roomdate routes', () => {
    beforeAll(() => {
        return setup(pool);
    });

    it('hshshs', async () => {
        expect(true).toEqual(true);
    });
    //----------------------------------------------------------------------------------//
    // it('gets a list of zipcodes and info about it', async () => {

    //     const res = await getZipcodes('02148');
    //     expect(res.DataList).toEqual(expect.any(Array));
    //     expect(res.DataList[0]).toEqual({
    //         'Code': '02148',
    //         'City':'MALDEN',
    //         'State': 'MA',
    //         'Latitude': expect.any(Number),
    //         'Longitude':expect.any(Number),
    //         'County': expect.any(String)
    //     });
    // });


    
    //----------------------------------------------------------------------------------//

    afterAll(() => {
        pool.end();
    });
});
