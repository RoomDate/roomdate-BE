const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

const seedEducation = require('../data/seedEducation');
const seedEmployment = require('../data/seedEmployment');
const seedPreferences = require('../data/seedPreferences');
const seedRoles = require('../data/seedRoles');
const seedUsernames = require('../data/seedUsernames');
const seedUsersinfo = require('../data/seedUsersInfo');
const seedUsersProfile = require('../data/seedUsersProfile');


describe('roomdate routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  xit('SEED users_main', async () => {
    const usersMainData = await Promise.all(seedUsernames.map(async (username) =>  await pool.query(`
        INSERT INTO users_main ( google_id, username) 
        VALUES($1, $2) RETURNING *`, [username.google_id, username.username])));

    expect(usersMainData).toEqual(seedUsernames);
  });

  //___________----------------------------------------------------------------------------------//


  it('SEED users_main', async () => {
    const { rows } = await pool.query(`
        INSERT INTO users_main ( google_id, username) 
        VALUES($1, $2) RETURNING *`, [seedUsernames[0].google_id, seedUsernames[0].username]);

    expect(rows[0]).toEqual(seedUsernames[0]);
  });

  //___________----------------------------------------------------------------------------------//







  afterAll(() => {
    pool.end();
  });
});
