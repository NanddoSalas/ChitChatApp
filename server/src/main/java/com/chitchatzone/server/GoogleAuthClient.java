package com.chitchatzone.server;

import java.io.IOException;
import java.text.ParseException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTParser;

@Component
public class GoogleAuthClient {

  @Value("${google.clientId}")
  private String clientId;

  @Value("${google.clientSecret}")
  private String clientSecret;

  @Value("${google.redirectUri}")
  private String redirectUri;

  public Optional<JWT> requestIdToken(String code) {
    try {
      GoogleTokenResponse response = new GoogleAuthorizationCodeTokenRequest(new NetHttpTransport(),
          new GsonFactory(), clientId, clientSecret, code, redirectUri).execute();

      String idToken = response.getIdToken();

      return Optional.of(JWTParser.parse(idToken));
    } catch (IOException | ParseException ex) {
      return Optional.empty();
    }

  }

}

