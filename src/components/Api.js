export default class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
    this._token = options.headers["authorization"];
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponse(res));
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponse(res));
  }

  postNewCard(data) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponse(res));
  }

  changedAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: src.link,
      }),
    }).then((res) => this._getResponse(res));
  }

  saveUserChanges(data) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponse(res));
  }

  deleteCardServer(idCard) {
    return fetch(`${this._cardsUrl}/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject()));
  }

  likedCard(idCard) {
    return fetch(`${this._likesUrl}/${idCard}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponse(res));
  }

  dislikedCard(idCard) {
    return fetch(`${this._likesUrl}/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponse(res));
  }
}
