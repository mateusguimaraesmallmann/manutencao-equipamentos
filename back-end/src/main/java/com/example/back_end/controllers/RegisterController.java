package com.example.back_end.controllers;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dtos.request.RegisterDTO;
import com.example.back_end.dtos.response.ClienteDTO;
import com.example.back_end.services.ClientService;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);

    @Autowired
    private ClientService clientService;

    @PostMapping
    public ResponseEntity<Object> register(@RequestBody @Validated RegisterDTO registerDTO) {
        try {
            ClienteDTO created = clientService.register(registerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
}