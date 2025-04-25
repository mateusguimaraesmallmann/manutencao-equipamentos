package com.example.manutencao_equipamentos.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "funcionario")
@Entity(name = "funcionario")
public class Funcionario extends Usuario {
    
    private String nome;
    private LocalDate dataNascimento;
}
