TRUNCATE TABLE users,
invitations,
invited_users,
rooms,
members,
room_messages,
direct_messages RESTART IDENTITY;


-- Inserting sample data into the 'users' table
INSERT INTO
  users (
    full_name,
    email,
    avatar,
    about,
    server_role,
    encrypted_password
  )
VALUES
  (
    'John Doe',
    'john.doe@example.com',
    'https://randomuser.me/api/portraits/men/1.jpg',
    'I am John',
    'ServerAdmin',
    'encrypted_pass_123'
  ),
  (
    'Jane Smith',
    'jane.smith@example.com',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'I am Jane',
    'Admin',
    'encrypted_pass_456'
  ),
  (
    'Alice Johnson',
    'alice.johnson@example.com',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'I am Alice',
    'Member',
    'encrypted_pass_789'
  ),
  (
    'Bob Brown',
    'bob.brown@example.com',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'I am Bob',
    'Member',
    'encrypted_pass_101'
  );


-- Inserting sample data into the 'invitations' table
INSERT INTO
  invitations (invite_code, uses, max_uses, revoked, creator_id)
VALUES
  ('INVITE1234', 1, 5, FALSE, 1),
  ('INVITE5678', 1, 10, FALSE, 2);


-- Inserting sample data into the 'invited_users' table
INSERT INTO
  invited_users (invitation_id, user_id)
VALUES
  (1, 3),
  (2, 4);


-- Inserting sample data into the 'rooms' table
INSERT INTO
  rooms (room_name, creator_id, private)
VALUES
  ('General', 1, FALSE),
  ('Admin Room', 2, TRUE);


-- Inserting sample data into the 'members' table
INSERT INTO
  members (room_id, user_id)
VALUES
  (2, 1),
  (2, 2);


-- Inserting sample data into the 'room_messages' table
INSERT INTO
  room_messages (sender_id, room_id, body)
VALUES
  (1, 1, 'Welcome to the General room!'),
  (2, 1, 'Hello everyone!'),
  (3, 1, 'Hi, I am Alice.'),
  (2, 2, 'This is an Admin only room.');


-- Inserting sample data into the 'direct_messages' table
INSERT INTO
  direct_messages (sender_id, receiver_id, body)
VALUES
  (1, 2, 'Hey Jane, how are you?'),
  (2, 1, 'I am good, John. How about you?'),
  (3, 4, 'Hi Bob!'),
  (4, 3, 'Hello Alice!');