package com.example.manutencao_equipamentos.Enums;

public enum Tipo {
    
    CLIENTE("cliente"),
    FUNCIONARIO("funcionario");

    private String role;

    Tipo(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
    
}