const faker = require('faker');

module.exports = [
    {
        id: 1,
        github_id: `${faker.internet.ip()}`,
        username: 'user1'
    },
    {
        id: 2,
        github_id: `${faker.internet.ip()}`,
        username: 'user2'
    },
    {
        id: 3,
        github_id: `${faker.internet.ip()}`,
        username: 'user3'
    },
    {
        id: 4,
        github_id: `${faker.internet.ip()}`,
        username: 'user4'
    }
];
