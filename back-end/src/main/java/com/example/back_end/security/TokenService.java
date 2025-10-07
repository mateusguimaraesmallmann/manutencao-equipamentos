package com.example.back_end.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.back_end.models.User;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User usuario){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            Instant now = LocalDateTime.now().toInstant(ZoneOffset.of("-03:00"));

            return JWT.create()
                    .withIssuer("auth")
                    .withSubject(usuario.getEmail())
                    .withIssuedAt(Date.from(now))
                    .withExpiresAt(dataExpiracao())
                    .withClaim("id", usuario.getId())
                    .withClaim("name", usuario.getNome())
                    .withClaim("email", usuario.getEmail())
                    .withClaim("role", usuario.getRole().name())
                    .withClaim("ativo", Boolean.TRUE.equals(usuario.getAtivo()))
                    .sign(algorithm);
        } catch (JWTCreationException ex) {
            throw new RuntimeException("Erro ao gerar token JWT", ex);
        }
    }
    
    public String validateToken(String token){
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo)
                      .withIssuer("auth")
                      .build()
                      .verify(token)
                      .getSubject();
        } catch (JWTVerificationException ex) {
            throw new RuntimeException("Token JWT inválido ou expirado!");
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
    
}