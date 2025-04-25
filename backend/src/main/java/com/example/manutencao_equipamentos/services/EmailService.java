package com.example.manutencao_equipamentos.services;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void enviar(String destino, String assunto, String conteudo) {
        // implementar envio real com JavaMailSender
        System.out.printf("Email para %s: %s - %s%n", destino, assunto, conteudo);
    }
    
}
