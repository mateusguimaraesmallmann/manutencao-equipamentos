package com.example.back_end.enums;

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