const { RESTDataSource } = require('apollo-datasource-rest');

class userAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/';
  }

  async findUser({ email }) {
    const response = await this.get('users', { email });

    return Array.isArray(response) && response.length > 0
      ? response.map((user) => this.userReducer(user))
      : [];
  }

  async addUser({ email, name, password }) {
    const response = await this.post('users', { email, name, password });
    return response;
  }

  userReducer(user) {
    const { email, id, name, password, token } = user;
    return {
      email,
      id,
      name,
      password,
      token,
    };
  }
}

module.exports = userAPI;
