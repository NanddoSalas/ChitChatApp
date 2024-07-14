package com.chitchatapp.server.models;

import java.security.Principal;

import org.springframework.security.oauth2.jwt.Jwt;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AccessTokenPrincipal implements Principal {

    private String id;
    private String email;
    private String role;

    @Override
    public String getName() {
        return id;
    }

    public static AccessTokenPrincipal build(Jwt jwt) {
        return new AccessTokenPrincipal(jwt.getSubject(), jwt.getClaim("email"),
                jwt.getClaim("scope"));
    }

}
