module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "john1234",
    DB: "aimleap",
    dialect: "mysql",
    PORT:3308,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };