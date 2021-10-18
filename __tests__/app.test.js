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

  it('hshshs', async () => {
    expect(true).toEqual(true);
  });


  //----------------------------------------------------------------------------------//

  it('SEED users_main', async () => {

    const usersMainData = await Promise.all(seedUsernames.map(async (username) =>  await pool.query(`
        INSERT INTO users_main ( google_id, username) 
        VALUES($1, $2) RETURNING *`, [username.google_id, username.username])));

    expect(usersMainData).toEqual(seedUsernames);
  });

  //----------------------------------------------------------------------------------//

  it('SEED employment', async () => {
    const userEmployment = await Promise.all(seedEmployment.map(async (employee) =>  await pool.query(`
        INSERT INTO employment (employment_status) 
        VALUES($1) RETURNING *`, [employee.employment_status])));

    expect(userEmployment).toEqual(seedEmployment);
  });

  //----------------------------------------------------------------------------------//



  afterAll(() => {
    pool.end();
  });
});
