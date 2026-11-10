import { getToken } from "./token.js";

class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async _request(route, method, body) {
    const token = getToken();

    const res = await fetch(`${this.baseUrl}${route}`, {
      ...(method && { method: method }),
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        ...(body && { "Content-Type": "application/json" }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!res.ok) {
      const error = new Error(`Error: ${res.status}`);
      error.status = res.status;
      throw error;
    }

    return await res.json();
  }

  signup(name, email, password) {
    return this._request("/signup", "POST", { name, email, password });
  }

  signin(email, password) {
    return this._request("/signin", "POST", { email, password });
  }

  getUser() {
    return this._request("/users/me", "GET");
  }
}

const mainApi = new MainApi("https://api.somaisumlivro.estradatech.com");

export default mainApi;
