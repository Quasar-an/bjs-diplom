if (typeof ApiConnector === "undefined") {
    class ApiConnector {
        static logout(callback) {
            fetch("http://localhost:8000/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }

        static current(callback) {
            fetch("http://localhost:8000/current", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }

        static getRates(callback) {
            fetch("http://localhost:8000/rates", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }

        static addMoney(data, callback) {
            fetch("http://localhost:8000/addMoney", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }

        static convertMoney(data, callback) {
            fetch("http://localhost:8000/convertMoney", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }

        static transferMoney(data, callback) {
            fetch("http://localhost:8000/transferMoney", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }

        static addUserToFavorites(data, callback) {
            fetch("http://localhost:8000/addFavorite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }

        static removeUserFromFavorites(data, callback) {
            fetch("http://localhost:8000/removeFavorite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => callback({ success: false, error: "Ошибка соединения с сервером" }));
        }
    }
}
