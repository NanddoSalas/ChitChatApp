package com.chitchatapp.server.dtos;

import lombok.Data;

@Data
public class FullUserDTO {

    private int id;
    private String fullName;
    private String email;
    private String avatar;
    private String about;
    private String role;
    private String creationDate;
    private boolean hasPassword;
    private boolean hasGoogle;
    private boolean hasGigHub;

}
