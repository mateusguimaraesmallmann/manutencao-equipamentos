package com.example.manutencao_equipamentos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.manutencao_equipamentos.dto.EmployeeCreateDTO;
import com.example.manutencao_equipamentos.dto.EmployeeDTO;
import com.example.manutencao_equipamentos.model.User;
import com.example.manutencao_equipamentos.services.EmployeeService;

@RestController
@RequestMapping("/funcionarios")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> listar() {
        return ResponseEntity.ok(employeeService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> criar(@RequestBody @Validated EmployeeCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.criar(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id, @AuthenticationPrincipal User usuarioAtual) {
        employeeService.excluir(id, usuarioAtual.getId());
        return ResponseEntity.noContent().build();
    }
    
}