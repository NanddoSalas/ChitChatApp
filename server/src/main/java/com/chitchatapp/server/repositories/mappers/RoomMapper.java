package com.chitchatapp.server.repositories.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.chitchatapp.server.models.Room;

@Component
public class RoomMapper implements RowMapper<Room> {

    @Override
    public Room mapRow(ResultSet rs, int rowNum) throws SQLException {
        Room room = new Room();

        room.setId(rs.getInt("id"));
        room.setRoomName(rs.getString("room_name"));
        room.setCreatorId(rs.getInt("creator_id"));
        room.setCreationDate(rs.getString("creation_date"));
        room.setPrivate(rs.getBoolean("private"));
        room.setHasAccess(rs.getBoolean("has_access"));

        return room;
    }

}
