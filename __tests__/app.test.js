const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const seedUsernames = require('../data/seedUsernames.js');

describe('roomdate routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('hshshs', async () => {
    expect(true).toEqual(true);
  });


  //___________----------------------------------------------------------------------------------//

  it('SEED users_main', async () => {
    const usersMainData = await Promise.all(seedUsernames.map(async (username) =>  await pool.query(`
        INSERT INTO users_main ( google_id, username) 
        VALUES($1, $2) RETURNING *`, [username.google_id, username.username])));

    expect(usersMainData).toEqual(seedUsernames);
  });
  
  //___________----------------------------------------------------------------------------------//




  afterAll(() => {
    pool.end();
  });
});
