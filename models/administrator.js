const mysqlConnection = require('./dbconnection');
var password = require('password-hash-and-salt');
var jwt = require('jsonwebtoken');
const admininstratorValidations = require('../config/admininstratorValidations');

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

module.exports = {

/**
 * admin sign in
 * @param {*} req request parameters
 * @param {*} res response parameters
 */
adminLogin_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {   
      let sql = 'SELECT adminId,fName,password,status FROM ?? WHERE ?? = ?';
      let query = connection.format(sql,["db_admin","userName", req.body.username]);
      connection.query(query, function (error, results, fields) {
        if (error) {
          errorResult["Message"] = "Something went wrong. Please try again later.";
          return res.send(errorResult);
        }
        else{
          if (results.length <= 0){
            errorResult["Message"] = "Wrong username";
            return res.send(errorResult);
          }
          password(req.body.password).verifyAgainst(results[0].password, function (error, verified) {
            if (verified == true) {
              if(results[0].status == 1){
                let payLoad = { subject: results[0].adminId, reference: results[0].fName };
                let token = jwt.sign(payLoad, 'secretKey');

                successResult["Message"] = "login successful.";
                successResult["data"] = {token};
                return res.send(successResult);
              } else  {
                errorResult["Message"] = "Account Deactivated";
                return res.send(errorResult);
              } 
            } else {
              errorResult["Message"] = "Wrong password";
              return res.send(errorResult);
            }
          }); 
        }
        connection.release();
        if (error) throw error;
      });
  });

},

/**
 * create a new category
 * @param {*} req 
 * @param {*} res 
 */
addCategory_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let obj = {
      "fieldName": req.body.category,
      "columnName": "category",
      "tableName": "db_category"
    };

    admininstratorValidations.checkIfExitOrNot(obj, (result) => {
      if(result.Code == 1) {
        let sql = 'INSERT INTO ?? SET ?? = ?';
        let query = connection.format(sql,["db_category","category", req.body.category]);
        connection.query(query, function (error, results, fields) {
          if (error) {
            errorResult["Message"] = "Something went wrong. Please try again later.";
            return res.send(errorResult);
          }
          else{
            successResult["Message"] = "Category has been inserted successfully";
            return res.send(successResult);
          }  
        });
      } else if(result.Code == 2) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      } else {
        errorResult["Message"] = "Category already exists";
        return res.send(errorResult);
      }
    });
      connection.release();
  });
},



/**
 * check duplicate category name
 * @param {*} req 
 * @param {*} res 
 */
asynCheckCategory_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = 'SELECT COUNT(*) as numb FROM ?? WHERE ?? = ?';
    let query = connection.format(sql,["db_category","category", req.body.category]);     
    connection.query(query, function (error, results, fields) {
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      if (results[0].numb >= 1) {
        return res.send(errorResult);
      }
      if (results[0].numb == 0) {
        successResult["Message"] = "";
        return res.send(successResult);
      }
      connection.release();
      if (error) throw error;
    });
  });
},


/**
 * fetch all category list
 * @param {*} res 
 */
getAllCategory_db: function (res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;                                                                                 // not connected!
    let sql = 'SELECT * FROM ?? WHERE ?? IS NOT NULL ORDER BY dateTime DESC';
    let query = connection.format(sql,["db_category","id"]);
    connection.query(query, function (error, results, fields) {                                       // Use the connection
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      if (results.length >= 1) {
        successResult["data"] = results;
        return res.send(successResult);
      }
      if (results.length == 0) {
        errorResult["Message"] = "No Records Found";
        return res.send(errorResult);
      }
      connection.release();                                                                           // Handle error after the release.
      if (error) throw error;                                                                         // Don't use the connection here, it has been returned to the pool.
    });
  });
},




/**
 * update category status
 * @param {*} req 
 * @param {*} res 
 */
updateCategoryStatus_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let stat;
    if(req.body.param2 == 1) { stat = 0; } else { stat = 1 };
    let sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    let query = connection.format(sql,["db_category","status", stat, "id",req.body.param1]);
    connection.query(query, function (error, results, fields) {
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      else{
        successResult["Message"] = "Category status updated successfully";
        return res.send(successResult);
      }
    });
    connection.release();
  });
},



/**
 * update category
 * @param {*} req 
 * @param {*} res 
 */
editCategory_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
      if (err) throw err;
      let sql = 'SELECT COUNT(*) as numb FROM ?? WHERE ?? = ? AND ?? != ?';
      let query = connection.format(sql,["db_category","category", req.body.category, "id",req.body.catId]); 
      connection.query(query, function (error, results, fields) {
        if (error) {
          errorResult["Message"] = "Something went wrong. Please try again later.";
          return res.send(errorResult);
        }
        if (results[0].numb >= 1) {
          errorResult["Message"] = "Category already exists.";
          return res.send(errorResult);
        }
        if (results[0].numb == 0) {
          let sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
          let query = connection.format(sql,["db_category","category", req.body.category, "id",req.body.catId]);
          connection.query(query, function (error, results, fields) {
            if (error) {
              errorResult["Message"] = "Something went wrong. Please try again later.";
              return res.send(errorResult);
            } else{
              successResult["Message"] = "Category has been updated successfully";
              return res.send(successResult);
            }
          });
        }
      });
      connection.release();
  });
},

/**
 * create a new manufacturer
 * @param {*} req 
 * @param {*} res 
 */
addManufacturer_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let obj = {
      "fieldName": req.body.manufacturer,
      "columnName": "manufacturer",
      "tableName": "db_manufacturer"
    };
    
    admininstratorValidations.checkIfExitOrNot(obj, (result) => {
      if(result.Code == 1) {
          let sql = 'INSERT INTO ?? SET ?? = ?';
          let query = connection.format(sql,["db_manufacturer","manufacturer", req.body.manufacturer]);
          connection.query(query, function (error, results, fields) {
            if (error) {
              errorResult["Message"] = "Something went wrong. Please try again later.";
              return res.send(errorResult);
            }
            else{
              successResult["Message"] = "Manufacturer has been inserted successfully";
              return res.send(successResult);
            }  
          });
      } else if(result.Code == 2) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      } else {
        errorResult["Message"] = "Manufacturer already exists";
        return res.send(errorResult);
      }
    });
      connection.release();
  });
},



/**
 * check duplicate manufacturer name
 * @param {*} req 
 * @param {*} res 
 */
asynCheckManufacturer_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = 'SELECT COUNT(*) as numb FROM ?? WHERE ?? = ?';
    let query = connection.format(sql,["db_manufacturer","manufacturer", req.body.manufacturer]);     
    connection.query(query, function (error, results, fields) {
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      if (results[0].numb >= 1) {
        return res.send(errorResult);
      }
      if (results[0].numb == 0) {
        successResult["Message"] = "";
        return res.send(successResult);
      }
      connection.release();
      if (error) throw error;
    });
  });
},


/**
 * fetch all manufacturer list
 * @param {*} res 
 */
getAllManufacturer_db: function (res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;                                                                                 // not connected!
    let sql = 'SELECT * FROM ?? WHERE ?? IS NOT NULL ORDER BY dateTime DESC';
    let query = connection.format(sql,["db_manufacturer","id"]);
    connection.query(query, function (error, results, fields) {                                       // Use the connection
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      if (results.length >= 1) {
        successResult["data"] = results;
        return res.send(successResult);
      }
      if (results.length == 0) {
        errorResult["Message"] = "No Records Found";
        return res.send(errorResult);
      }
      connection.release();                                                                           // Handle error after the release.
      if (error) throw error;                                                                         // Don't use the connection here, it has been returned to the pool.
    });
  });
},



/**
 * update manufacturer status
 * @param {*} req 
 * @param {*} res 
 */
updateManufacturerStatus_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let stat;
    if(req.body.param2 == 1) { stat = 0; } else { stat = 1 };
    let sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    let query = connection.format(sql,["db_manufacturer","status", stat, "id",req.body.param1]);
    connection.query(query, function (error, results, fields) {
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      else{
        successResult["Message"] = "Manufacturer status updated successfully";
        return res.send(successResult);
      }
    });
    connection.release();
  });
},



/**
 * update manufacturer
 * @param {*} req 
 * @param {*} res 
 */
editManufacturer_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
      if (err) throw err;
      let sql = 'SELECT COUNT(*) as numb FROM ?? WHERE ?? = ? AND ?? != ?';
      let query = connection.format(sql,["db_manufacturer","manufacturer", req.body.manufacturer, "id",req.body.manuId]); 
      connection.query(query, function (error, results, fields) {
        if (error) {
          errorResult["Message"] = "Something went wrong. Please try again later.";
          return res.send(errorResult);
        }
        if (results[0].numb >= 1) {
          errorResult["Message"] = "Manufacturer already exists.";
          return res.send(errorResult);
        }
        if (results[0].numb == 0) {
          let sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
          let query = connection.format(sql,["db_manufacturer","manufacturer", req.body.manufacturer, "id",req.body.manuId]);
          connection.query(query, function (error, results, fields) {
            if (error) {
              errorResult["Message"] = "Something went wrong. Please try again later.";
              return res.send(errorResult);
            } else{
              successResult["Message"] = "Manufacturer has been updated successfully";
              return res.send(successResult);
            }
          });
        }
      });
      connection.release();
  });
},


/**
 * fetch all products
 * @param {*} res 
 */
getAllProduct_db: function (res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;                                                                                 // not connected!
    let sql = 'SELECT db_products.id,db_products.cat_fk,db_products.manufacturer_fk,db_products.sku_no,db_products.p_name,db_products.p_description,db_products.quantity,db_products.alloted_quantity,db_products.price,db_products.status,db_products.dateTime,db_category.category,db_manufacturer.manufacturer FROM ?? INNER JOIN ?? ON ?? = ?? INNER JOIN ?? ON ?? = ?? WHERE ?? != ? ORDER BY db_products.id DESC';
    let query = connection.format(sql,["db_products","db_category","db_products.cat_fk","db_category.id","db_manufacturer","db_manufacturer.id","db_products.manufacturer_fk","db_products.id",""]);
    connection.query(query, function (error, results, fields) {                                       // Use the connection
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      if (results.length >= 1) {
        successResult["data"] = results;
        return res.send(successResult);
      }
      if (results.length == 0) {
        errorResult["Message"] = "No Records Found";
        return res.send(errorResult);
      }
      connection.release();                                                                           // Handle error after the release.
      if (error) throw error;                                                                         // Don't use the connection here, it has been returned to the pool.
    });
  });
},


/**
 * update product status
 * @param {*} req 
 * @param {*} res 
 */
updateProductStatus_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let stat;
    if(req.body.param2 == 1) { stat = 0; } else { stat = 1 };
    let sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    let query = connection.format(sql,["db_products","status", stat, "id",req.body.param1]);
    connection.query(query, function (error, results, fields) {
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      else{
        successResult["Message"] = "Product status updated successfully";
        return res.send(successResult);
      }
    });
    connection.release();
  });
},


/**
 * check duplicate sku number
 * @param {*} req 
 * @param {*} res 
 */
asynCheckSkuNo_db: function (req,res) {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = 'SELECT COUNT(*) as numb FROM ?? WHERE ?? = ?';
    let query = connection.format(sql,["db_products","sku_no", req.body.skuNo]);     
    connection.query(query, function (error, results, fields) {
      if (error) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
      }
      if (results[0].numb >= 1) {
        return res.send(errorResult);
      }
      if (results[0].numb == 0) {
        successResult["Message"] = "";
        return res.send(successResult);
      }
      connection.release();
      if (error) throw error;
    });
  });
},


/**
 * create new product in the database
 * @param {*} req 
 * @param {*} res 
 */
addProduct_db: function (req,res) {

  // console.log(req.body);
  // console.log(req.filepath);

  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err;
    let obj = {
      "fieldName": req.body.skuNo,
      "columnName": "manufacturer",
      "tableName": "db_manufacturer"
    };
    admininstratorValidations.checkIfExitOrNot(obj, (result) => {
    if(result.Code == 1) {

      /**
       * insert into products table
       */
      let insId;
      var sql = 'INSERT INTO ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?';
      var query = connection.format(sql,["db_products", "cat_fk", req.body.category, "manufacturer_fk", req.body.manufacturer, "sku_no", req.body.skuNo,"p_name", req.body.productName, "p_description", req.body.productDescription, "quantity", req.body.quantity, "alloted_quantity", req.body.allotedQuantity, "price", req.body.price]);
      connection.query(query, function (error, results, fields) {
        if (error) {
          errorResult["Message"] = "Something went wrong. Please try again later.";
          return res.send(errorResult);
        }
        else {
          insId = results.insertId;
           /**
           * insert into products image
           */
          req.filepath.forEach(element => {
            var sql = 'INSERT INTO ?? SET ?? = ?, ?? = ?';
            var query = connection.format(sql,["db_product_images", "product_fk", insId, "product_image", element]);
            connection.query(query, function (error, results, fields) {
              
            });
          });
          successResult["Message"] = "Product has been inserted successfully";
          return res.send(successResult);
        }
      });
    } else if(result.Code == 2) {
      errorResult["Message"] = "Something went wrong. Please try again later.";
      return res.send(errorResult);
    } else {
      errorResult["Message"] = "Product already exists";
      return res.send(errorResult);
    }
  });
      connection.release();
  });
}

};