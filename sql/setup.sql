DROP TABLE IF EXISTS users_main CASCADE;
DROP TABLE IF EXISTS employment CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users_info CASCADE;
DROP TABLE IF EXISTS preferences CASCADE;
DROP TABLE IF EXISTS users_profile CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS dislikes CASCADE;
DROP TABLE IF EXISTS matches CASCADE;


CREATE TABLE users_main (
    username TEXT NOT NULL PRIMARY KEY
);

CREATE TABLE employment (
  	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_status TEXT NOT NULL UNIQUE
);

CREATE TABLE education (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	edu_status TEXT NOT NULL UNIQUE
);

CREATE TABLE roles (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	type TEXT NOT NULL UNIQUE
);


CREATE TABLE users_info (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	first_name TEXT NOT NULL,
    username TEXT NOT NULL REFERENCES users_main(username),
	job_status BIGINT REFERENCES employment(id),
  	edu_status BIGINT REFERENCES education(id),
  	last_name TEXT NOT NULL,
  	dob DATE NOT NULL,
	age INT NOT NULL,
  	gender TEXT NOT NULL,
  	zipcode BIGINT NOT NULL,
  	bio VARCHAR(200),
  	smoke BOOLEAN,
  	drugs BOOLEAN,
  	alcohol BOOLEAN,
  	introvert BOOLEAN,
   	extrovert BOOLEAN,
  	cleanliness INT,
  	pets BOOLEAN
);

CREATE TABLE preferences(
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	username TEXT NOT NULL REFERENCES users_main(username),
	smoke BOOLEAN,
    gender TEXT,
  	drugs BOOLEAN,
  	alcohol BOOLEAN,
  	introvert BOOLEAN,
   	extrovert BOOLEAN,
  	cleanliness INT,
  	pets BOOLEAN,
  	age INT,
  	radius INT,
  	job_status BIGINT REFERENCES employment(id),
  	edu_status BIGINT REFERENCES education(id)
);



CREATE TABLE users_profile (
  	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	preference_id BIGINT NOT NULL REFERENCES preferences(id) ON DELETE CASCADE,
  	username TEXT NOT NULL REFERENCES users_main(username) ON DELETE CASCADE,
  	role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  	job_id BIGINT NOT NULL REFERENCES employment(id) ON DELETE CASCADE,
  	edu_id BIGINT NOT NULL REFERENCES  education(id) ON DELETE CASCADE,
  	user_info_id BIGINT NOT NULL REFERENCES users_info(id) ON DELETE CASCADE
--   	matches TEXT[],
--   	liked_profiles TEXT [],
--   	disliked_profiles TEXT []
);



CREATE TABLE likes (

	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_owner TEXT NOT NULL REFERENCES users_main(username),
	liked_user TEXT NOT NULL REFERENCES users_main(username),
	unique_key TEXT UNIQUE

);

CREATE TABLE dislikes (

	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_owner TEXT NOT NULL REFERENCES users_main(username),
	disliked_user TEXT NOT NULL REFERENCES users_main(username)

);

CREATE TABLE matches (

	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_a TEXT NOT NULL REFERENCES users_main(username),
	user_b TEXT NOT NULL REFERENCES users_main(username),
	unique_key TEXT NOT NULL UNIQUE REFERENCES likes(unique_key)

);

