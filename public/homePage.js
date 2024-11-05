const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function updateRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

updateRates();
setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            moneyManager.setMessage(false, response.error || "Ошибка пополнения баланса");
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация выполнена успешно");
        } else {
            moneyManager.setMessage(false, response.error || "Ошибка конвертации");
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод выполнен успешно");
        } else {
            moneyManager.setMessage(false, response.error || "Ошибка перевода");
        }
    });
};

const favoritesWidget = new FavoritesWidget();

function updateFavoritesList() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}

updateFavoritesList();

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            updateFavoritesList();
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное");
        } else {
            favoritesWidget.setMessage(false, response.error || "Ошибка добавления пользователя в избранное");
        }
    });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            updateFavoritesList();
            favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного");
        } else {
            favoritesWidget.setMessage(false, response.error || "Ошибка удаления пользователя из избранного");
        }
    });
};
