package com.chitchatapp.server.services;

import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.chitchatapp.server.models.User;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JwtService {

    private final JwtEncoder jwtEncoder;

    public Jwt generateAccessToken(User user) {

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(String.valueOf(user.getId()))
                .claim("scope", user.getRole())
                .claim("email", user.getEmail())
                .build();

        JwsHeader jwsHeader = JwsHeader.with(() -> "HS256").build();

        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims));
    }
}
