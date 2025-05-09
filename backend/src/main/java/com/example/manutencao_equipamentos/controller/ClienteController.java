package com.example.manutencao_equipamentos.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.manutencao_equipamentos.dto.AutocadastroDTO;
import com.example.manutencao_equipamentos.services.ClienteService;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired 
    private ClienteService clienteService;

    @PostMapping("/autocadastro")
    public ResponseEntity<?> autocadastrar(@RequestBody AutocadastroDTO dto) {
        clienteService.autocadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("mensagem", "Cadastro realizado com sucesso. Verifique seu e-mail para a senha."));
    }
    
}
