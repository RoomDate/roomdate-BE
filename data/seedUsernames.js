const faker = require('faker');

module.exports = [
    {
        id: 1,
        google_id: `${faker.internet.ip()}`,
        username: 'user1'
    },
    {
        id: 2,
        google_id: `${faker.internet.ip()}`,
        username: 'user2'
    },
    {
        id: 3,
        google_id: `${faker.internet.ip()}`,
        username: 'user3'
    },
    {
        id: 4,
        google_id: `${faker.internet.ip()}`,
        username: 'user4'
    }
];
