module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tasks", {
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT('long')
      },
      due_date: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      }
    
    });
    return User;
  };