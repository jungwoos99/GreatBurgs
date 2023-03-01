package com.example.foodapp.exceptions;

public class UserNotFoundException extends RuntimeException {

    private CustomError customError;

    public UserNotFoundException(CustomError customError) {
        super();
        this.customError = customError;
    }

    public CustomError getCustomError() {
        return customError;
    }

    public void setCustomError(CustomError customError) {
        this.customError = customError;
    }
}
