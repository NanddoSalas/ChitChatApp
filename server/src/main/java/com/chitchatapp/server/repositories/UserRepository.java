package com.chitchatapp.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatapp.server.models.InvitedUser;
import com.chitchatapp.server.models.User;
import com.chitchatapp.server.repositories.mappers.InvitedUserMapper;
import com.chitchatapp.server.repositories.mappers.UserMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class UserRepository {

  private final JdbcTemplate template;
  private final UserMapper mapper;
  private final InvitedUserMapper invitedUserMapper;

  public List<User> findAll() {
    String sql = "select * from users order by id asc;";

    return template.query(sql, mapper);
  }

  public Optional<User> findById(int userId) {
    String sql = "select * from users where id = ?;";

    List<User> users = template.query(sql, mapper, userId);

    if (!users.isEmpty()) {
      return Optional.of(users.get(0));
    }

    return Optional.empty();
  }

  public Optional<User> findByGoogleId(String googleId) {
    String sql = "select * from users where google_id = ?;";

    List<User> users = template.query(sql, mapper, googleId);

    if (!users.isEmpty()) {
      return Optional.of(users.get(0));
    }

    return Optional.empty();
  }

  public InvitedUser addUser(String fullName, String email, String password, String inviteCode) {
    String sql = """
        WITH u AS (
          INSERT INTO users (full_name, email, encrypted_password)
          VALUES (
              ?,
              ?,
              ?
            )
          RETURNING id
        ),
        i AS (
          UPDATE invitations
          SET uses = uses + 1,
            revoked = (
              CASE
                WHEN max_uses = uses + 1 THEN TRUE
                ELSE FALSE
              END
            )
          WHERE invite_code = ?
            AND revoked = FALSE
            AND (
              uses < max_uses
              OR max_uses = 0
            )
          RETURNING id
        ),
        iu AS (
          INSERT INTO invited_users (invitation_id, user_id)
          VALUES (
              (
                SELECT id
                FROM i
              ),
              (
                SELECT id
                FROM u
              )
            )
          RETURNING *
        )
        SELECT *
        FROM iu;
        """;

    return template.query(sql, invitedUserMapper, fullName, email, password, inviteCode).get(0);
  }

  public InvitedUser addGoogleUser(String fullName, String email, String googleId,
      String inviteCode) {
    String sql = """
        WITH u AS (
          INSERT INTO users (full_name, email, google_id)
          VALUES (
              ?,
              ?,
              ?
            )
          RETURNING id
        ),
        i AS (
          UPDATE invitations
          SET uses = uses + 1,
            revoked = (
              CASE
                WHEN max_uses = uses + 1 THEN TRUE
                ELSE FALSE
              END
            )
          WHERE invite_code = ?
            AND revoked = FALSE
            AND (
              uses < max_uses
              OR max_uses = 0
            )
          RETURNING id
        ),
        iu AS (
          INSERT INTO invited_users (invitation_id, user_id)
          VALUES (
              (
                SELECT id
                FROM i
              ),
              (
                SELECT id
                FROM u
              )
            )
          RETURNING *
        )
        SELECT *
        FROM iu;
        """;

    return template.query(sql, invitedUserMapper, fullName, email, googleId, inviteCode).get(0);
  }

  public Optional<User> findByEmail(String email) {
    String sql = "select * from users where email = ?;";

    List<User> users = template.query(sql, mapper, email);

    if (users.isEmpty()) {
      return Optional.empty();
    } else {
      return Optional.of(users.get(0));
    }
  }

  public boolean updateProfile(int userId, String fullName, String about) {
    String sql = "update users set full_name = ?, about = ? where id = ?;";

    int affectedRows = template.update(sql, fullName, about, userId);

    return affectedRows == 1;
  }

  public boolean updatePassword(int userId, String newPassword) {
    String sql = "update users set encrypted_password = ? where id = ?;";

    int affectedRows = template.update(sql, newPassword, userId);

    return affectedRows == 1;
  }

  public boolean updateRole(int userId, String newRole) {
    String sql = "update users set server_role = ? where id = ?;";

    int affectedRows = template.update(sql, newRole, userId);

    return affectedRows == 1;
  }

  public boolean connectGoogleAccount(int userId, String googleId) {
    String sql = """
        UPDATE users
        SET google_id = ?
        WHERE id = ?""";

    int affectedRows = template.update(sql, googleId, userId);

    return affectedRows == 1;
  }

  public boolean disconnectGoogleAccount(int userId) {
    String sql = """
        UPDATE users
        SET google_id = NULL
        WHERE id = ?
          AND google_id IS NOT NULL
          AND (
            encrypted_password IS NOT NULL
            OR github_id IS NOT NULL
          );""";

    int affectedRows = template.update(sql, userId);

    return affectedRows == 1;
  }

}
