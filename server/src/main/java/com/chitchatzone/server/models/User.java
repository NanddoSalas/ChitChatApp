package com.chitchatzone.server.models;

import com.chitchatzone.server.dtos.UserDTO;

import lombok.Data;

@Data
public class User {

    private int id;
    private String fullName;
    private String email;
    private String avatar;
    private String about;
    private String role;
    private String creationDate;
    private String password;
    private String googleId;
    private String githubId;

    public UserDTO toDTO() {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(id);
        userDTO.setFullName(fullName);
        userDTO.setEmail(email);
        userDTO.setAvatar(avatar);
        userDTO.setAbout(about);
        userDTO.setRole(role);
        userDTO.setCreationDate(creationDate);

        return userDTO;
    }

}
