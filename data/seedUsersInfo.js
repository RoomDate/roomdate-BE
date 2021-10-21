const faker = require('faker');

const generateDate = () => {

    return `${faker.datatype.number({ min:1950, max:2015 })}-${('0' + faker.datatype.number({ min:1, max:12 })).slice(-2)}-${('0' + faker.datatype.number({ min:1, max:28 })).slice(-2)}`;
};


module.exports = [
    {
        user_info_id: '1',
        username: 'user1',
        job_status: 1,
        edu_status:1,
        first_name : 'pepe',
        last_name: 'ochoa',
        dob: generateDate(),
        age:23,
        gender: 'male',
        zipcode: 80206,
        bio:' Hello my name slim shady',
        smoke: true,
        drugs: true,
        alcohol: true,
        introvert: true,
        extrovert:false,
        cleanlieness: 3,
        pets: true
    },
    {
        user_info_id: '2',
        username: 'user2',
        job_status: 1,
        edu_status:1,
        first_name : 'Angelina',
        last_name: 'Jolie',
        dob: generateDate(),
        age:27,
        gender: 'female',
        zipcode: 80209,
        bio:'Hello, I am Tomb Raider',
        smoke: false,
        drugs: false,
        alcohol: true,
        introvert: false,
        extrovert: true,
        cleanlieness: 5,
        pets: true
    },
    {
        user_info_id: '3',
        username: 'user3',
        job_status: 1,
        edu_status:1,
        first_name : 'Cristiano',
        last_name: 'Ronaldo',
        dob: generateDate(),
        age:34,
        gender: 'male',
        zipcode: 80204,
        bio:'I am the best soccer player in the world',
        smoke: true,
        drugs: true,
        alcohol: false,
        introvert: true,
        extrovert: true,
        cleanlieness: 2,
        pets: false
    },
    {
        user_info_id: '4',
        username: 'user4',
        job_status: 1,
        edu_status:1,
        first_name : 'Luke',
        last_name: 'Skywalker',
        dob: generateDate(),
        age:30,
        gender: 'male',
        zipcode: 80204,
        bio:' I am a jedi',
        smoke: false,
        drugs: true,
        alcohol: false,
        introvert: true,
        extrovert: true,
        cleanlieness: 4,
        pets: false
    }
  
];
  
