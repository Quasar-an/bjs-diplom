"use strict";

class UserForm {
    constructor() {
        this.loginForm = document.getElementById("login");
        this.registerForm = document.getElementById("register");

        this.init();
    }

    init() {
        if (this.loginForm) {
            this.loginForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const formData = new FormData(this.loginForm);
                const login = formData.get("email");
                const password = formData.get("password");

                if (this.loginFormCallback) {
                    this.loginFormCallback({ login, password });
                }
            });
        }

        if (this.registerForm) {
            this.registerForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const formData = new FormData(this.registerForm);
                const login = formData.get("email");
                const password = formData.get("password");

                if (this.registerFormCallback) {
                    this.registerFormCallback({ login, password });
                }
            });
        }
    }


    setLoginFormCallback(callback) {
        this.loginFormCallback = callback;
    }

    setRegisterFormCallback(callback) {
        this.registerFormCallback = callback;
    }

    displayError(message) {
        alert(`Ошибка: ${message}`);
    }
}

const userForm = new UserForm();

userForm.setLoginFormCallback((data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            console.log("Успешная авторизация", response);
        } else {
            userForm.displayError(response.error || "Неверный логин или пароль.");
        }
    });
});

userForm.setRegisterFormCallback((data) => {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            console.log("Успешная регистрация", response);
            } else {
            userForm.displayError(response.error || "Ошибка регистрации.");
        }
    });
});
