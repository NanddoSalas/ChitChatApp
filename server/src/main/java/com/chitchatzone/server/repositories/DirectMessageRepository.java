package com.chitchatzone.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.models.Message;
import com.chitchatzone.server.repositories.mappers.MessageMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class DirectMessageRepository {

  private final JdbcTemplate template;
  private final MessageMapper mapper;

  public List<Message> findAll(int senderId, int receiverId, int cursor) {

    if (cursor > 0) {
      String sql = """
          SELECT *
          FROM direct_messages
          WHERE (
              (
                sender_id = ?
                AND receiver_id = ?
              )
              OR (
                sender_id = ?
                AND receiver_id = ?
              )
            )
            AND id > ?
          ORDER BY id DESC
          LIMIT 20;
          """;

      return template.query(sql, mapper, senderId, receiverId, receiverId, senderId, cursor);
    }

    String sql = """
        SELECT *
        FROM direct_messages
        WHERE (
            sender_id = ?
            AND receiver_id = ?
          )
          OR (
            sender_id = ?
            AND receiver_id = ?
          )
        ORDER BY id DESC
        LIMIT 20;
        """;

    return template.query(sql, mapper, senderId, receiverId, receiverId, senderId);
  }

  public Message createMessage(int senderId, int receiverId, String body) {
    String sql = """
        INSERT INTO direct_messages (sender_id, receiver_id, body)
        VALUES (?, ?, ?)
        RETURNING *;
        """;

    return template.query(sql, mapper, senderId, receiverId, body).get(0);
  }

}
