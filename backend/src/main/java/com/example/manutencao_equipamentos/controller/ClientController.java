package com.example.manutencao_equipamentos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.manutencao_equipamentos.dto.AutocadastroDTO;
import com.example.manutencao_equipamentos.model.Client;
import com.example.manutencao_equipamentos.services.ClientService;

@RestController
@RequestMapping("/clientes")
public class ClientController {

    @Autowired 
    private ClientService clienteService;

    @PostMapping("/autocadastro")
    public ResponseEntity<?> autocadastrar(@RequestBody AutocadastroDTO dto) {
        Client newClient = clienteService.autocadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newClient);
    }
    
}
