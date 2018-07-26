const Sequelize = require('sequelize');
const chalk = require('chalk');

const sequelize = new Sequelize(
  'postgres://Spencer@localhost:5432/auth-with-koa',
  {
    benchmark: true,
    logging: (msg, time) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          // pretty custom logging
          chalk.magenta(
            `\n${msg}${chalk.cyan(`\nExecution time of ${time}ms`)}`
          )
        );
      } else if (process.env.NODE_ENV === 'testing') {
        console.log(
          chalk.magenta(
            `query :) ${chalk.cyan(`\nExecution time of ${time}ms`)}`
          )
        );
      }
    }
  }
);

module.exports = { sequelize, db: Sequelize };
