import Sequelize from 'sequelize';

// Models
import User from '../app/models/User';

// Config
import databaseConfig from '../config/database';

const Models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    Models.map((model) => model.init(this.connection));
  }
}

export default new Database();
