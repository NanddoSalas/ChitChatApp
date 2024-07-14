package com.chitchatapp.server.models;

import com.chitchatapp.server.dtos.FullUserDTO;
import com.chitchatapp.server.dtos.UserDTO;

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

    public FullUserDTO toFullDTO() {
        FullUserDTO fullDTO = new FullUserDTO();

        fullDTO.setId(id);
        fullDTO.setFullName(fullName);
        fullDTO.setEmail(email);
        fullDTO.setAvatar(avatar);
        fullDTO.setAbout(about);
        fullDTO.setRole(role);
        fullDTO.setCreationDate(creationDate);

        fullDTO.setHasPassword((password != null));
        fullDTO.setHasGoogle((googleId != null));
        fullDTO.setHasGigHub((githubId != null));

        return fullDTO;
    }

}
