package com.example.manutencao_equipamentos.controller;

import org.slf4j.LoggerFactory;

import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.manutencao_equipamentos.dto.LoginDTO;
import com.example.manutencao_equipamentos.dto.TokenDTO;
import com.example.manutencao_equipamentos.services.AuthorizationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated LoginDTO loginDTO) {
        try {
            TokenDTO token = authorizationService.login(loginDTO);
            return ResponseEntity.status(HttpStatus.OK).body(token);
        } catch (BadCredentialsException e) {
            logger.error("Login falhou para o usuário: {}", loginDTO.login());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("erro", "Credenciais inválidas"));
        }
    }
    
}