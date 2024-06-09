package com.chitchatzone.server.repositories.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.chitchatzone.server.models.Invitation;

@Component
public class InvitationMapper implements RowMapper<Invitation> {

    @Override
    public Invitation mapRow(ResultSet rs, int rowNum) throws SQLException {
        Invitation invitation = new Invitation();

        invitation.setId(rs.getInt("id"));
        invitation.setInviteCode(rs.getString("invite_code"));
        invitation.setUses(rs.getInt("uses"));
        invitation.setMaxUses(rs.getInt("max_uses"));
        invitation.setRevoked(rs.getBoolean("revoked"));
        invitation.setCreatioDate(rs.getString("creation_date"));
        invitation.setCreatorId(rs.getInt("creator_id"));

        return invitation;
    }

}
