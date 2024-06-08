package com.chitchatzone.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.models.Invitation;
import com.chitchatzone.server.repositories.mappers.InvitationMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class InvitationRepository {

    private final JdbcTemplate template;
    private final InvitationMapper mapper;

    public List<Invitation> findAllByCreatorId(int creatorId) {
        String sql = "select * from invitations where creator_id = ?;";

        return template.query(sql, mapper, creatorId);
    }

    public Invitation addInvitation(String inviteCode, int limit, int creatorId) {
        String sql =
                "insert into invitations (invite_code, max_uses, creator_id) values (?, ?, ?) RETURNING *;";

        List<Invitation> invitations = template.query(sql, mapper, inviteCode, limit, creatorId);

        if (!invitations.isEmpty()) {
            return invitations.get(0);
        }

        // todo: handle posible insertion error

        return null;
    }

    public void revokeInvitation(int invitationId, int creatorId) {
        String sql =
                "update invitations set revoked = true where id = ? and creator_id = ? and revoked = false;";

        template.update(sql, invitationId, creatorId);
    }

}
