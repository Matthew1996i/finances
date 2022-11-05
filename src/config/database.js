require('dotenv/config');

module.exports = {
  dialect: process.env.DIALECT,
  host:
    process.env.ENVIRONMENT === 'dev'
      ? process.env.DEVDBHOST
      : process.env.DBHOST,
  port:
    process.env.ENVIRONMENT === 'dev'
      ? process.env.DEVDBPORT
      : process.env.DBPORT,
  username:
    process.env.ENVIRONMENT === 'dev'
      ? process.env.DEVDBUSER
      : process.env.DBUSER,
  password:
    process.env.ENVIRONMENT === 'dev'
      ? process.env.DEVDBPASS
      : process.env.DBPASS,
  database:
    process.env.ENVIRONMENT === 'dev'
      ? process.env.DEVDATABASE
      : process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
  timezone: '-03:00',
};
