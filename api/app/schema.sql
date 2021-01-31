CREATE TABLE users (
	user_id serial PRIMARY KEY,
	name varchar(128) NOT NULL,
	username varchar(32) UNIQUE NOT NULL,
	email varchar(255) UNIQUE,
	status varchar(128),
	password varchar(128) NOT NULL
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

-- FUNCTIONS
CREATE OR REPLACE FUNCTION get_user_chats(user_id int)
RETURNS SETOF varchar(128) AS $$
	SELECT c.tag
	FROM chats c
	WHERE EXISTS (
		SELECT 1
		FROM users_chats uc
		WHERE uc.user_id = user_id
		    AND uc.chat_id = c.chat_id
	)
$$ LANGUAGE SQL;
