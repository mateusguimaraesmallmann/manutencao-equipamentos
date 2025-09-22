package com.example.back_end.controllers;

import com.example.back_end.dtos.LoginDTO;
import com.example.back_end.dtos.TokenDTO;
import com.example.back_end.services.AuthorizationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthorizationService authorizationService;

    public AuthenticationController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<TokenDTO> login(@RequestBody @Valid LoginDTO loginDTO) {
        try {
            TokenDTO token = authorizationService.login(loginDTO);
            return ResponseEntity.ok(token);
        } catch (BadCredentialsException e) {
            // Não logue stacktrace para credenciais inválidas (ruído e possível vazamento)
            log.warn("Tentativa de login inválida para usuário: {}", loginDTO.login());
            throw e; // delega para o ControllerAdvice
        }
    }
}
