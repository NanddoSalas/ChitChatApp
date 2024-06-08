package com.chitchatzone.server.dtos;

import lombok.Data;

@Data
public class InvitationDTO {

    int id;
    String inviteCode;
    int uses;
    int maxUses;
    boolean revoked;
    String creatioDate;

}
