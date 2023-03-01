package com.example.foodapp.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Locale;

@ControllerAdvice
public class RestRepositoryExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(e.getCustomError().getCode()).body(e.getCustomError());
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity handle(Exception e, Locale locale) {
        return ResponseEntity.status(403).body(new CustomError(404, e.getMessage(), "No account found associated with this email."));
    }
}
