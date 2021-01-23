CREATE OR REPLACE TABLE users (
	id serial PRIMARY KEY,
	name varchar(128) NOT NULL,
	username varchar(128) UNIQUE NOT NULL,
	status varchar(128),
	entered_date timestamp
);

CREATE OR REPLACE TABLE users_auth (
	id serial PRIMARY KEY,
	user_id int REFERENCES user (user_id) NOT NULL,
	email varchar(255) UNIQUE NOT NULL,
	password varchar(128) NOT NULL
);

CREATE OR REPLACE chats (
	id serial PRIMARY KEY,
	title varchar(32) NOT NULL,
	description varchar(128)
);

CREATE OR REPLACE TABLE users_chats (
	user_id int REFERENCES users_auth (id),
	chat_id int REFERENCES chats (id)
);

CREATE OR REPLACE TABLE messages (
	id serial PRIMARY KEY,
	author_id int REFERENCES users_auth (id) NOT NULL,
	chat_id int REFERENCES chats (id)
	content text,
	PRIMARY KEY (id, chat_id)
);
