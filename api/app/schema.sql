CREATE TABLE users (
	user_id serial PRIMARY KEY,
	name varchar(128) NOT NULL,
	username varchar(32) UNIQUE NOT NULL,
	email varchar(255) UNIQUE,
	status varchar(128),
	password varchar(255) NOT NULL
);

CREATE TABLE chats (
	chat_id serial PRIMARY KEY,
	tag varchar(128) UNIQUE NOT NULL,
	title varchar(64) NOT NULL,
	description varchar(255)
);

CREATE TABLE users_chats (
	user_id int REFERENCES users (user_id),
	chat_id int REFERENCES chats (chat_id)
);

CREATE TABLE messages (
	msg_id int,
	chat_id int REFERENCES chats (chat_id),
	author_id int REFERENCES users (user_id),
	content text,
	PRIMARY KEY (chat_id, msg_id)
);
