package com.chitchatzone.server.models;

import lombok.Data;

@Data
public class Message {

    int id;
    int senderId;
    String creationDate;
    String body;

}
