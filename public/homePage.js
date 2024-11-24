const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        } else {
            console.error(response.error);
        }
    });
};

const ratesBoard = new RatesBoard();

function updateRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            console.error(response.error);
        }
    });
}

updateRates();
setInterval(updateRates, 60000);


const profileWidget = new ProfileWidget();

ApiConnector.current(response => {
    if (response.success) {
        profileWidget.showProfile(response.data);
    } else {
        console.error('Ошибка получения данных пользователя:', response.error);
    }
});


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Пополнение прошло успешно!');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};


moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация выполнена успешно!');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};


moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен успешно!');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    } else {
        console.error(response.error);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь добавлен!');
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь удалён!');
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};
