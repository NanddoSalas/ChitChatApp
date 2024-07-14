package com.chitchatapp.server.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateRolePayload extends JsonPayload {

    private String role;
    private String accessToken;

}
