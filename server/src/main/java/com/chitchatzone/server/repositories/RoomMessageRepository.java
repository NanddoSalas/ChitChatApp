package com.chitchatzone.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.models.Message;
import com.chitchatzone.server.repositories.mappers.MessageMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class RoomMessageRepository {

  private final JdbcTemplate template;
  private final MessageMapper mapper;

  public List<Message> findAll(int roomId, int cursor) {
    if (cursor > 0) {
      String sql = """
          SELECT *
          FROM room_messages
          WHERE room_id = ?
            AND id < ?
          ORDER BY id DESC
          LIMIT 10""";

      return template.query(sql, mapper, roomId, cursor);
    }

    String sql = """
        SELECT *
        FROM room_messages
        WHERE room_id = ?
        ORDER BY id DESC
        LIMIT 10""";

    return template.query(sql, mapper, roomId);
  }

  public Message createMessage(int senderId, int roomId, String body) {
    String sql = """
        INSERT INTO room_messages (sender_id, room_id, body)
        VALUES (?, ?, ?)
        RETURNING *;
        """;

    return template.query(sql, mapper, senderId, roomId, body).get(0);
  }

}
