class Api {
    constructor(baseUrl, token, groupId) {
        this._baseUrl = baseUrl
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        return fetch(`${this._baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                uthorization: `Bearer ${localStorage.getItem('token')}`,
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
            return res.json().data;
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
}

export default new Api (
     "http://api.lucia-mesto.nomoredomains.club",

)