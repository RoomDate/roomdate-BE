DROP TABLE IF EXISTS users_main CASCADE;
DROP TABLE IF EXISTS employment CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users_info CASCADE;
DROP TABLE IF EXISTS preferences CASCADE;
DROP TABLE IF EXISTS users_profile CASCADE;



CREATE TABLE users_main (
  	google_id TEXT NOT NULL UNIQUE, 
    username TEXT NOT NULL PRIMARY KEY
);

CREATE TABLE employment (
  	employment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employment_status TEXT NOT NULL UNIQUE
);

CREATE TABLE education (
	education_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	education_status TEXT NOT NULL UNIQUE
);

CREATE TABLE roles (
	role_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	role_type TEXT NOT NULL UNIQUE
);


CREATE TABLE users_info (
	user_info_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	first_name TEXT NOT NULL,
    username TEXT NOT NULL REFERENCES users_main(username),
  	last_name TEXT NOT NULL,
  	dob DATE NOT NULL,
  	gender TEXT NOT NULL,
  	zipcode BIGINT NOT NULL,
  	bio VARCHAR(200),
  	smoke BOOLEAN,
  	drugs BOOLEAN,
  	alcohol BOOLEAN,
  	introvert BOOLEAN,
   	extrovert BOOLEAN,
  	cleanlieness INT,
  	pets BOOLEAN
);

CREATE TABLE preferences(
	preference_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	username TEXT NOT NULL REFERENCES users_main(username),
	smoke BOOLEAN,
    gender TEXT,
  	drugs BOOLEAN,
  	alcohol BOOLEAN,
  	introvert BOOLEAN,
   	extrovert BOOLEAN,
  	cleanlieness INT,
  	pets BOOLEAN,
  	age INT,
  	radius INT,
  	employment_status BIGINT REFERENCES employment(employment_id),
  	education_status BIGINT REFERENCES education(education_id)
);



CREATE TABLE users_profile (
  	user_profile_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	preference_username BIGINT NOT NULL REFERENCES preferences(preference_id),
  	username TEXT NOT NULL REFERENCES users_main(username),
  	role_type BIGINT NOT NULL REFERENCES roles(role_id),
  	employment_id BIGINT NOT NULL REFERENCES employment(employment_id),
  	education_id BIGINT NOT NULL REFERENCES  education(education_id),
  	user_info BIGINT NOT NULL REFERENCES users_info(user_info_id)
--   	matches TEXT[],
--   	liked_profiles TEXT [],
--   	disliked_profiles TEXT []
);