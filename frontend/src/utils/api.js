class Api {
    constructor(baseUrl, token, groupId) {
        this._baseUrl = baseUrl
        this._token = token
        this._groupId = groupId
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards`,{
            headers: {
                authorization: this._token
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/users/me`,{
            headers: {
                authorization: this._token
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/users/me`,{
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about,

            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards`,{
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link,

            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards/likes/${cardId}`,{
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards/likes/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar,
            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
}

export default new Api (
     "https://mesto.nomoreparties.co",
     "70633b92-f713-4bf2-95db-64e42dedc0a6",
     "cohort-19"

)