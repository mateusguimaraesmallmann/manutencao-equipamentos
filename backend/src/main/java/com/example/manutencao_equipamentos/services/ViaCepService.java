package com.example.manutencao_equipamentos.services;

import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.model.Endereco;

@Service
public class ViaCepService {

        public Endereco buscarEndereco(String cep) {
        Endereco e = new Endereco();
        e.setCep(cep);
        e.setRua("Simulado");
        e.setBairro("Bairro");
        e.setCidade("Cidade");
        e.setUf("UF");
        return e;
    }
    
}