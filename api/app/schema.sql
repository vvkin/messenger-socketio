CREATE TABLE users_auth (
	id serial PRIMARY KEY,
	email varchar(255) UNIQUE NOT NULL,
	username varchar(128) UNIQUE NOT NULL,
	password varchar(128) NOT NULL
);

CREATE TABLE users (
	id serial PRIMARY KEY,
	auth_id REFERENCES users_auth (id),
	name varchar(128) NOT NULL,
	status varchar(128),
	entered_date timestamp
);

CREATE TABLE chats (
	id serial PRIMARY KEY,
	tag varchar(32) UNIQUE NOT NULL,
	title varchar(64) NOT NULL,
	description varchar(128)
);

CREATE TABLE users_chats (
	user_id int REFERENCES users (id),
	chat_id int REFERENCES chats (id)
);

CREATE TABLE messages (
	id int,
	author_id int REFERENCES users (id),
	chat_id int REFERENCES chats (id),
	content text,
	PRIMARY KEY (chat_id, id)
);
