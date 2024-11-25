'use strict';

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const updateRates = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};

updateRates();
setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
        ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация выполнена успешно');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

const favorites = new FavoritesWidget();

const updateFavorites = () => {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
};

updateFavorites();

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            updateFavorites();
            favorites.setMessage(true, 'Пользователь успешно добавлен в избранное');
        } else {
            favorites.setMessage(false, response.error);
        }
    });
};

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            updateFavorites();
            favorites.setMessage(true, 'Пользователь успешно удален из избранного');
        } else {
            favorites.setMessage(false, response.error);
        }
    });
};