package com.chitchatapp.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatapp.server.models.Invitation;
import com.chitchatapp.server.repositories.mappers.InvitationMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class InvitationRepository {

    private final JdbcTemplate template;
    private final InvitationMapper mapper;

    public List<Invitation> findAllByCreatorId(int creatorId) {
        String sql = "select * from invitations where creator_id = ? order by id asc;";

        return template.query(sql, mapper, creatorId);
    }

    public Invitation addInvitation(String inviteCode, int limit, int creatorId) {
        String sql =
                "insert into invitations (invite_code, max_uses, creator_id) values (?, ?, ?) RETURNING *;";

        return template.query(sql, mapper, inviteCode, limit, creatorId).get(0);
    }

    public void revokeInvitation(int invitationId, int creatorId) {
        String sql =
                "update invitations set revoked = true where id = ? and creator_id = ? and revoked = false;";

        template.update(sql, invitationId, creatorId);
    }

}
