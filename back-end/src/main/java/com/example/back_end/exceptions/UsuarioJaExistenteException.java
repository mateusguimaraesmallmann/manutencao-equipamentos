package com.example.back_end.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UsuarioJaExistenteException extends RuntimeException {
    public UsuarioJaExistenteException(String message) { super(message); }
}