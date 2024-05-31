package com.chitchatzone.server.dtos;

import lombok.Data;

@Data
public class UserDTO {

    private int id;
    private String fullName;
    private String email;
    private String avatar;
    private String about;
    private String role;
    private String creationDate;

}
