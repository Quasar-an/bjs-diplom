"use strict";

if (typeof UserForm === "undefined") {
    class UserForm {
        constructor() {
            this.loginFormCallback = null;
            this.registerFormCallback = null;
        }

        displayError(message) {
            alert(`Ошибка: ${message}`);
        }
    }
}

if (typeof ApiConnector === "undefined") {
    class ApiConnector {
        static login({ login, password }, callback) {
            fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ login, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Ответ сервера на авторизацию:", data);
                callback(data);
            })
            .catch(error => {
                console.error("Ошибка запроса:", error);
                callback({ success: false, error: "Ошибка соединения с сервером" });
            });
        }

        static register({ login, password }, callback) {
            fetch("https://example.com/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ login, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Ответ сервера на регистрацию:", data);
                callback(data);
            })
            .catch(error => {
                console.error("Ошибка запроса:", error);
                callback({ success: false, error: "Ошибка соединения с сервером" });
            });
        }
    }
}

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            this.displayError(response.error);
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            this.displayError(response.error);
        }
    });
};

userForm.loginFormCallback({ login: "oleg@demo.ru", password: "demo" });
userForm.registerFormCallback({ login: "newuser@demo.ru", password: "password123" });

