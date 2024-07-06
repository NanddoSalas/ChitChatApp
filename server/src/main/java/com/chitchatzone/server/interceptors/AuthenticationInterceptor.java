package com.chitchatzone.server.interceptors;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

import com.chitchatzone.server.models.AccessTokenPrincipal;

import lombok.AllArgsConstructor;


@Component
@AllArgsConstructor
public class AuthenticationInterceptor implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            Jwt jwt;

            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> map =
                        (Map<String, Object>) message.getHeaders().get("nativeHeaders");

                @SuppressWarnings("unchecked")
                ArrayList<String> list = (ArrayList<String>) map.get("accessToken");

                String accessToken = list.get(0);

                jwt = jwtDecoder.decode(accessToken);
            } catch (JwtException e) {
                throw new AccessDeniedException("");
            }

            AccessTokenPrincipal principal = AccessTokenPrincipal.build(jwt);
            accessor.setUser(principal);
        }


        return message;
    }

}
