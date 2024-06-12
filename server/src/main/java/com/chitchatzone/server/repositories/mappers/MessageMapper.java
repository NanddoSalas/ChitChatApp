package com.chitchatzone.server.repositories.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.chitchatzone.server.models.Message;

@Component
public class MessageMapper implements RowMapper<Message> {

    @Override
    public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
        Message message = new Message();

        message.setId(rs.getInt("id"));
        message.setSenderId(rs.getInt("sender_id"));
        message.setCreationDate(rs.getString("creation_date"));
        message.setBody(rs.getString("body"));

        return message;
    }

}
