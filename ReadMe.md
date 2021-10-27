

<h1 align="center">Hi 👋, we're Room Date</h1>
<h3 align="center">Room Date is a <strong>Human</strong> focused app designed to connect people by lifestyle and region.</h3>

<h6 align= "left">We use detailed information provided by users to match them with potential housemates in their chosen region. 
Historically, finding housemates online has been impersonal and clumsy, often leaving much to be desired. 
Room Date aims to eliminate those awkward interactions by helping you match with people based on shared interests or values.
Using a dating app styled UI it's easy to swipe through our database and find potential roomies with a familiar UX.  



![FrontendMockup](https://user-images.githubusercontent.com/83792867/137665640-1cb9f64b-4aee-4534-85e7-1750470c4c7e.png)






<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> </p>
 
![Backend RoomDate](https://user-images.githubusercontent.com/83792867/137643244-92dcb6a5-6fbe-4d8d-8a33-112dc173dc31.png)


<h3 align="center">How to use RoomDate</h3>
<h5> In order to be able to get full user experience you will need to use an API client tool to test the API endpoints. Some examples are postman and thunderclient. Next follow the steps below:</h5>

1. Sigup as new user
    - "POST"
    - roomdate.herokuapp.com/api/v1/users/sigup
    - { "username":"your unique username"}

2. Login 
    - "POST"
    - roomdate.herokuapp.com/api/v1/users/login
    - { "username":"your unique username"}

3. Post your user information 
    - "POST"
    - roomdate.herokuapp.com/api/v1/users/userfo
    -    {     
        "username": String " your username",
        "job_status": Number - pick a number between 1 and 4,
        "edu_status": Number - pick a number between 1 and 3,
        "first_name" : String "your name",
        "last_name": String "your lastname",
        "dob": String "your date of birth",
        "age": Number - your age,
        "gender": String,
        "zipcode": "80204" -  use this zipcode to show more users in your area,
        "bio": String,
        "smoke": boolean,
        "drugs": boolean,
        "alcohol": boolean,
        "introvert": boolean,
        "extrovert": boolean,
        "cleanlieness": Number - pick a job status between 1 and 5,
        "pets": boolean
   }
   - NOTE: keep track of the id given in the body. It will be use in the next step.

   4. Post your preferences 
    - "POST"
    - roomdate.herokuapp.com/api/v1/preferences
    -  {
        "preference_id": "id given in the previous step",
        username": String " your username",
        "gender": "male",
        "smoke": boolean,
        "drugs": boolean,
        "alcohol": boolean,
        "introvert": boolean,
        "extrovert": boolean,
        "cleanlieness": Number - pick a job status between 1 and 5,
        "pets": boolean,
        "age": Number,
        "radius": Number,
        "employment_status": Number - pick a number between 1 and 4,
        "education_status": Number - pick a number between 1 and 4
    }

5. Look for roommies in your area
    - "GET"
    - roomdate.herokuapp.com/api/v1/users/roommies/zipcode/80204
    - look at the roommie id you would like to match with

6. Like a potential roommie
    - "POST"
    - roomdate.herokuapp.com/api/v1/users/likes/id of roommie
    - if the roommie you liked, liked you as well a match will be created.
    - Otherwise, wait until someone likes you back

7. Dislike a potential roommie
    - "POST"
    - roomdate.herokuapp.com/api/v1/users/dislikes/id of roommie

8. Check for matches
    - "GET"
    - roomdate.herokuapp.com/api/v1/users/matches
    - if you have not matched with anyone, it will deplay an empty array.

9.  Logout
    - "GET"
    - roomdate.herokuapp.com/api/v1/users/Logout


    

- 📫 How to reach me 
    - Justin Soto **justinwsoto@gmail.com**
    - Madden Lockin **maddenlockin@gmail.com**
    - Evon Perez **perez.evon@gmail.com**
    - Cristian Montes **cmontesmujica@gmail.com**

