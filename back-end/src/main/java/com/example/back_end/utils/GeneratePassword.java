package com.example.back_end.utils;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class GeneratePassword {

    private static final String caracteres = "0123456789";

    public static String generatePassword() {
        int tamanho = 4;
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(tamanho);

        for (int i = 0; i < tamanho; i++) {
            int randomIndex = random.nextInt(caracteres.length());
            password.append(caracteres.charAt(randomIndex));
        }
        return password.toString();
    }
    
}