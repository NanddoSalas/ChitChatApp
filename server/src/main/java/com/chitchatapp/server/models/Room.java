package com.chitchatapp.server.models;

import lombok.Data;

@Data
public class Room {

    int id;
    String roomName;
    int creatorId;
    String creationDate;
    boolean isPrivate;
    boolean hasAccess;

}
