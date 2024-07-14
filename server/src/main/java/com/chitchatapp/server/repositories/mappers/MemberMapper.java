package com.chitchatapp.server.repositories.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.chitchatapp.server.models.Member;

@Component
public class MemberMapper implements RowMapper<Member> {

    @Override
    public Member mapRow(ResultSet rs, int rowNum) throws SQLException {
        Member member = new Member();

        member.setRoomId(rs.getInt("room_id"));
        member.setUserId(rs.getInt("user_id"));
        member.setCreationDate(rs.getString("creation_date"));

        return member;
    }

}
