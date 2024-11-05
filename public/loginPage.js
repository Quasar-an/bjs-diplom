"use strict";

class UserForm {
    constructor() {
        this.loginFormCallback = null;
        this.registerFormCallback = null;
    }

    showMessage(message) {
        console.log("Сообщение:", message);
        alert("Сообщение: " + message);
    }

    showError(error) {
        console.error("Ошибка:", error);
        alert("Ошибка: " + error);
    }
}

class UserForm {
    constructor() {
        this.loginFormCallback = null;
        this.registerFormCallback = null;
    }

    showMessage(message) {
        console.log("Сообщение:", message);
        alert("Сообщение: " + message);
    }

    showError(error) {
        console.error("Ошибка:", error);
        alert("Ошибка: " + error);
    }
}

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        console.log("Ответ сервера при авторизации:", response);
        if (response.success) {
            userForm.showMessage("Авторизация успешна!");
            location.reload();
        } else {
            userForm.showError(response.error || "Неверный логин или пароль");
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        console.log("Ответ сервера при регистрации:", response);
        if (response.success) {
            userForm.showMessage("Регистрация успешна!");
            location.reload();
        } else {
            userForm.showError(response.error || "Ошибка регистрации");
        }
    });
};

document.getElementById("loginButton").addEventListener("click", () => {
    const loginData = {
        login: "oleg@demo.ru",
        password: "demo"
    };
    userForm.loginFormCallback(loginData);
});

document.getElementById("registerButton").addEventListener("click", () => {
    const registerData = {
        login: "newuser@demo.ru",
        password: "password123"
    };
    userForm.registerFormCallback(registerData);
});