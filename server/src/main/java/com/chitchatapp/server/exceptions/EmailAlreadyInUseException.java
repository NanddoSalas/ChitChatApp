package com.chitchatapp.server.exceptions;

public class EmailAlreadyInUseException extends Exception {

    public EmailAlreadyInUseException(String message) {
        super(message);
    }

}
