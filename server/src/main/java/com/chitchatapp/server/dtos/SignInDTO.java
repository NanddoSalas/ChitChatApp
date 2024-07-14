package com.chitchatapp.server.dtos;

import lombok.Data;

@Data
public class SignInDTO {

    private String accessToken;
    private FullUserDTO user;

}
