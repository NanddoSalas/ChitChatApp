package com.chitchatapp.server.models;

import com.chitchatapp.server.dtos.MemberDTO;

import lombok.Data;

@Data
public class Member {

    int roomId;
    int userId;
    String creationDate;

    public MemberDTO toDTO() {
        MemberDTO memberDTO = new MemberDTO();

        memberDTO.setUserId(userId);
        memberDTO.setMemberSince(creationDate);

        return memberDTO;
    }

}
