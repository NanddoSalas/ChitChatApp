package com.chitchatzone.server.repositories.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.chitchatzone.server.models.InvitedUser;

@Component
public class InvitedUserMapper implements RowMapper<InvitedUser> {

    @Override
    public InvitedUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        InvitedUser invitedUser = new InvitedUser();

        invitedUser.setInvitationId(rs.getInt("invitation_id"));
        invitedUser.setUserId(rs.getInt("user_id"));

        return invitedUser;
    }

}
