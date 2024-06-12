package com.chitchatzone.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.models.Member;
import com.chitchatzone.server.repositories.mappers.MemberMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class MemberRepository {

    private final JdbcTemplate template;
    private final MemberMapper mapper;

    public boolean isUserMemberOfRoom(int userId, int roomId) {
        String sql = """
                SELECT EXISTS (
                    SELECT *
                    FROM members
                    WHERE room_id = ?
                      AND user_id = ?
                  );
                  """;

        return template.queryForObject(sql, Boolean.class, roomId, userId);
    }

    public List<Member> findAllByRoomId(int roomId) {
        String sql = "select * from members where room_id = ?;";

        return template.query(sql, mapper, roomId);
    }

    public Member addMember(int userId, int roomId) {
        String sql = "insert into members (room_id, user_id) values (?, ?) RETURNING *;";

        return template.query(sql, mapper, roomId, userId).get(0);
    }

    public boolean deleteMember(int userId, int roomId) {
        String sql = "delete from members where user_id = ? and room_id = ?;";

        int affectedRows = template.update(sql, userId, roomId);

        return affectedRows == 1;
    }

}
