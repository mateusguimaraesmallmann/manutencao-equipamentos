package com.example.back_end.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dtos.AutocadastroDTO;
import com.example.back_end.models.Client;
import com.example.back_end.services.ClientService;

@RestController
@RequestMapping("/clientes")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping("/autocadastro")
    public ResponseEntity<?> autocadastrar(@RequestBody AutocadastroDTO dto) {
        Client newClient = clientService.autocadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newClient);
    }

}
