package com.chitchatzone.server.exceptions;

public class EmailAlreadyInUseException extends Exception {

    public EmailAlreadyInUseException(String message) {
        super(message);
    }

}
