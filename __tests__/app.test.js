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
const { use } = require('../lib/app.js');

describe.skip('roomdate routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('hshshs', async () => {
    expect(true).toEqual(true);
  });
  //----------------------------------------------------------------------------------//



  //----------------------------------------------------------------------------------//

  afterAll(() => {
    pool.end();
  });
});
