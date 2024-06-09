package com.chitchatzone.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.models.Room;
import com.chitchatzone.server.repositories.mappers.RoomMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class RoomRepository {

    private final JdbcTemplate template;
    private final RoomMapper mapper;

    public List<Room> findAll(int userId) {
        String sql = """
                SELECT r.id,
                  r.room_name,
                  r.creator_id,
                  r.creation_date,
                  r.private,
                  CASE
                    WHEN m.user_id IS NULL THEN FALSE
                    ELSE TRUE
                  END has_access
                FROM rooms r
                  LEFT JOIN members m ON m.room_id = r.id
                  AND m.user_id = ?;""";

        return template.query(sql, mapper, userId);
    }

    public Room createRoom(int creatorId, String name, boolean isPrivate) {
        String sql = """
                WITH r AS (
                  INSERT INTO rooms (room_name, creator_id, private)
                  VALUES (?, ?, ?)
                  RETURNING *
                ),
                m AS (
                  INSERT INTO members (room_id, user_id)
                  VALUES (
                      (
                        SELECT id
                        FROM r
                      ),
                      ?
                    )
                )
                SELECT *,
                  TRUE has_access
                FROM r;""";



        List<Room> rooms = template.query(sql, mapper, name, creatorId, isPrivate, creatorId);

        if (!rooms.isEmpty()) {
            return rooms.get(0);
        }

        // todo: handle posible insertion error

        return null;
    }

    public boolean updateRoom(int roomId, int creatorId, String name, boolean isPrivate) {
        String sql = "update rooms set name = ?, private = ? where id = ?, creator_id = ?;";

        int affectedRows = template.update(sql, name, isPrivate, roomId, creatorId);

        return affectedRows == 1;
    }

    public boolean deleteRoom(int roomId, int creatorId) {
        String sql = "delete from rooms where id = ? and creator_id = ?;";

        int affectedRows = template.update(sql, roomId, creatorId);

        return affectedRows == 1;
    }

}
