package com.example.manutencao_equipamentos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cliente")
@Entity(name = "cliente")
public class Cliente extends Usuario {

    @Column(unique = true)
    private String cpf;

    private String nome;
    private String telefone;

    @Embedded
    private Endereco endereco;
    
}
