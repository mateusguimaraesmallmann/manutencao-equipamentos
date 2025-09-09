package com.example.back_end.exceptions;

public class DuplicateCpfException extends RuntimeException {
    public DuplicateCpfException(String msg) { super(msg); }
}