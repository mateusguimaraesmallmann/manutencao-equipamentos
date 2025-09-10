package com.example.back_end.exceptions;

public class UsuarioJaExistenteException extends RuntimeException {
    public UsuarioJaExistenteException(String msg) { super(msg); }
}