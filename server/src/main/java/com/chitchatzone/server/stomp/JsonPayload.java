package com.chitchatzone.server.stomp;

import com.google.gson.Gson;

abstract class JsonPayload {

    public String build() {
        return new Gson().toJson(this);
    }

}
