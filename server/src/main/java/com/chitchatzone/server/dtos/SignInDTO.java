package com.chitchatzone.server.dtos;

import lombok.Data;

@Data
public class SignInDTO {

    private String accessToken;
    private UserDTO user;

}
