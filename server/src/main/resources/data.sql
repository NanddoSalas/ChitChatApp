TRUNCATE TABLE users,
invitations,
invited_users,
rooms,
members,
room_messages,
direct_messages RESTART IDENTITY;


-- Insert sample data into users table
INSERT INTO
  users (
    full_name,
    email,
    avatar,
    about,
    server_role,
    encrypted_password,
    google_id,
    github_id
  )
VALUES
  (
    'Alice Johnson',
    'alice.johnson@example.com',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'Loves hiking and outdoor adventures.',
    'ServerAdmin',
    '$2a$10$KJA.HlSfLW35KO38oEUSK.JmCVNxPSxXGvCsyGgMk.VkNWBUi7/je',
    NULL,
    NULL
  ),
  (
    'Bob Smith',
    'bob.smith@example.com',
    'https://randomuser.me/api/portraits/men/1.jpg',
    'Avid reader and writer.',
    'Member',
    '$2a$10$KJA.HlSfLW35KO38oEUSK.JmCVNxPSxXGvCsyGgMk.VkNWBUi7/je',
    NULL,
    NULL
  ),
  (
    'Charlie Brown',
    'charlie.brown@example.com',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'Tech enthusiast and gamer.',
    'Member',
    '$2a$10$KJA.HlSfLW35KO38oEUSK.JmCVNxPSxXGvCsyGgMk.VkNWBUi7/je',
    NULL,
    NULL
  ),
  (
    'Diana Prince',
    'diana.prince@example.com',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'Superhero and warrior.',
    'Member',
    '$2a$10$KJA.HlSfLW35KO38oEUSK.JmCVNxPSxXGvCsyGgMk.VkNWBUi7/je',
    NULL,
    NULL
  ),
  (
    'Eve Adams',
    'eve.adams@example.com',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'Musician and artist.',
    'Admin',
    '$2a$10$KJA.HlSfLW35KO38oEUSK.JmCVNxPSxXGvCsyGgMk.VkNWBUi7/je',
    NULL,
    NULL
  );


-- Insert sample data into invitations table
INSERT INTO
  invitations (invite_code, uses, max_uses, revoked, creator_id)
VALUES
  ('INVITE1234', 2, 10, FALSE, 1),
  ('INVITE5678', 5, 5, TRUE, 2),
  ('INVITE91011', 1, 3, FALSE, 3);


-- Insert sample data into invited_users table
INSERT INTO
  invited_users (invitation_id, user_id)
VALUES
  (1, 4),
  (1, 5),
  (2, 3);


-- Insert sample data into rooms table
INSERT INTO
  rooms (room_name, creator_id, private)
VALUES
  ('General Chat', 1, FALSE),
  ('Gaming Room', 3, FALSE),
  ('Admin Room', 1, TRUE),
  ('Music Lounge', 5, FALSE),
  ('Book Club', 2, FALSE);


-- Insert sample data into members table
INSERT INTO
  members (room_id, user_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 3),
  (2, 4),
  (3, 1),
  (3, 5),
  (4, 5),
  (4, 1),
  (5, 2),
  (5, 3);


-- Insert sample data into room_messages table
INSERT INTO
  room_messages (sender_id, room_id, body)
VALUES
  (1, 1, 'Welcome to the General Chat!'),
  (2, 1, 'Hello everyone!'),
  (3, 1, 'Hi all! How is it going?'),
  (3, 2, 'Anyone up for a game tonight?'),
  (4, 2, 'Sure, I am in.'),
  (1, 3, 'Admin room discussions.'),
  (5, 3, 'Reviewing user reports.'),
  (5, 4, 'Let’s share some music recommendations.'),
  (1, 4, 'Here is a song I like.'),
  (2, 5, 'What book are we discussing this week?'),
  (3, 5, 'I think it’s "1984" by George Orwell.');


-- Insert sample data into direct_messages table
INSERT INTO
  direct_messages (sender_id, receiver_id, body)
VALUES
  (1, 2, 'Hey Bob, can you check the admin panel?'),
  (2, 1, 'Sure Alice, I will check it now.'),
  (
    3,
    4,
    'Hi Diana, are you joining the game tonight?'
  ),
  (4, 3, 'Yes, I will be there!'),
  (
    5,
    1,
    'Alice, I have completed the report review.'
  ),
  (1, 5, 'Great, thank you Eve!');