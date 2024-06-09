package com.chitchatzone.server.models;

import com.chitchatzone.server.dtos.InvitationDTO;

import lombok.Data;

@Data
public class Invitation {

    int id;
    String inviteCode;
    int uses;
    int maxUses;
    boolean revoked;
    String creatioDate;
    int creatorId;

    public InvitationDTO toDTO() {
        InvitationDTO invitationDTO = new InvitationDTO();

        invitationDTO.setId(id);
        invitationDTO.setInviteCode(inviteCode);
        invitationDTO.setUses(uses);
        invitationDTO.setMaxUses(maxUses);
        invitationDTO.setRevoked(revoked);
        invitationDTO.setCreatioDate(creatioDate);

        return invitationDTO;
    }

}
