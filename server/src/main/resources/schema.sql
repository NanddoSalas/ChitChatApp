CREATE TABLE IF NOT EXISTS
  users (
    id serial PRIMARY KEY,
    full_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    avatar VARCHAR(256) DEFAULT '' NOT NULL,
    about VARCHAR(256) DEFAULT '' NOT NULL,
    server_role VARCHAR(16) DEFAULT 'Member' NOT NULL,
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    encrypted_password VARCHAR(128),
    google_id VARCHAR(128) UNIQUE,
    github_id VARCHAR(128) UNIQUE
  );


CREATE TABLE IF NOT EXISTS
  invitations (
    id serial PRIMARY KEY,
    invite_code VARCHAR(16) NOT NULL,
    uses INT DEFAULT 0 NOT NULL,
    max_uses INT DEFAULT 0 NOT NULL,
    revoked BOOLEAN DEFAULT FALSE NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    creator_id INT REFERENCES users (id) NOT NULL
  );


CREATE TABLE IF NOT EXISTS
  invited_users (
    invitation_id INT REFERENCES invitations (id) NOT NULL,
    user_id INT REFERENCES users (id) NOT NULL,
    PRIMARY KEY (invitation_id, user_id)
  );


CREATE TABLE IF NOT EXISTS
  rooms (
    id serial PRIMARY KEY,
    room_name VARCHAR(64) NOT NULL,
    creator_id INT REFERENCES users (id) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    private BOOLEAN DEFAULT FALSE NOT NULL
  );


CREATE TABLE IF NOT EXISTS
  members (
    room_id INT REFERENCES rooms (id) NOT NULL,
    user_id INT REFERENCES users (id) NOT NULL,
    member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (room_id, user_id)
  );


CREATE TABLE IF NOT EXISTS
  room_messages (
    sender_id INT REFERENCES users (id) NOT NULL,
    room_id INT REFERENCES rooms (id) NOT NULL,
    sended_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    body VARCHAR(256) NOT NULL,
    PRIMARY KEY (sender_id, room_id)
  );


CREATE TABLE IF NOT EXISTS
  direct_messages (
    sender_id INT REFERENCES users (id) NOT NULL,
    receiver_id INT REFERENCES users (id) NOT NULL,
    sended_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    body VARCHAR(256) NOT NULL,
    PRIMARY KEY (sender_id, receiver_id)
  );