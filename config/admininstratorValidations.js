const mysqlConnection = require('../models/dbconnection');

/**
 * Sample Output Objects
 */
let errorResult = {
  "Code": "0",
  "Message": "Operation not successful.",
  "data": ""
  };
let successResult = {
  "Code": "1",
  "Message": "Operation successful.",
  "data": ""
 };
 let systemError = {
  "Code": "2",
  "Message": "Something went wrong",
  "data": ""
  };

module.exports = {

    /**
     * validation to check if row exist or not
     * @param {*} req 
     * @param {*} callback 
     */
    checkIfExitOrNot: function (req, callback) {
      mysqlConnection.getConnection(function (err, connection) {
          if (err) throw err;
          let sql = 'SELECT COUNT(*) as numb FROM ?? WHERE ?? = ?';
          let query = connection.format(sql,[req.tableName,req.columnName, req.fieldName]);  
          connection.query(query, function (error, results, fields) {
            if (error) {
              callback(systemError);
            }
            if (results[0].numb >= 1) {
              callback(errorResult);
            }
            if (results[0].numb == 0) {
              callback(successResult);
            }
            connection.release();
          });
        });
    }
};