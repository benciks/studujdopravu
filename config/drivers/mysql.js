const mysql = require('mysql2');
const util = require('util');

module.exports = (config) => {
  const connection = mysql.createConnection(config);

  return {
    query(sql, args) {
      return util.promisify(connection.execute)
        .call(connection,sql,args);
    },
    close() {
      return util.promisify(connection.end)
        .call(connection);
    }
  };
}


