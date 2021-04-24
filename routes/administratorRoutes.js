const express = require('express');
const router = express.Router();
const dbFunctions = require('../models/administrator');
const tokenValidator = require('./../config/token-validator');
var newUploadedFileName = [];

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

/**
 * admin sign in
 */
router.post('/adminLogin_db', (req, res) => {
    dbFunctions.adminLogin_db(req,res);
});

/**
 * check if session value altered by user or not in session storage of the browser 
 */
router.get('/checkSesssion/',tokenValidator.verifyToken, (req,res) => {
});

/**
 * create new category
 */
router.post('/addCategory_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.addCategory_db(req,res);
});

/**
 * check duplicate category name
 */
router.post('/asynCheckCategory_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.asynCheckCategory_db(req,res);
});

/**
 * update category status
 */
router.post('/updateCategoryStatus_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.updateCategoryStatus_db(req,res);
});

/**
 * edit category
 */
router.post('/editCategory_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.editCategory_db(req,res);
});

/**
 * get list of all categories
 */
router.get('/getAllCategory_db',tokenValidator.verifyToken, (req, res) => {
   dbFunctions.getAllCategory_db(res);
});

/**
 * create new manufacturer
 */
router.post('/addManufacturer_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.addManufacturer_db(req,res);
});

/**
 * check duplicate manufacturer name
 */
router.post('/asynCheckManufacturer_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.asynCheckManufacturer_db(req,res);
});

/**
 * update manufacturer status
 */
router.post('/updateManufacturerStatus_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.updateManufacturerStatus_db(req,res);
});

/**
 * edit manufacturer
 */
router.post('/editManufacturer_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.editManufacturer_db(req,res);
});

/**
 * get list of all manufacturers
 */
router.get('/getAllManufacturer_db',tokenValidator.verifyToken, (req, res) => {
   dbFunctions.getAllManufacturer_db(res);
});

/**
 * get list of all products
 */
router.get('/getAllProduct_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.getAllProduct_db(res);
 });

/**
 * update product status
 */
router.post('/updateProductStatus_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.updateProductStatus_db(req,res);
});

/**
 * uploading products image
 */
router.post('/uploadImage_db/',tokenValidator.verifyToken, (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        errorResult["Message"] = "No files were uploaded.";
        return res.send(errorResult);
        }
    let boolean;
    
    let len = req.files.file.length === undefined ? 1 : req.files.file.length;
    
    for(let i = 0; i < len; i++) {
        let sampleFile = len == 1 ? req.files.file : req.files.file[i];
        let spt = sampleFile.name.split('.');
        let lstelm = spt[spt.length - 1];
        let rndNum = Math.floor(Math.random() * 99999);
        let newName = sampleFile.md5 + rndNum + '.' + lstelm;
        
        sampleFile.mv('./uploads/images/' + newName, function(err) {
            if (err) {
                boolean = false;
            } else {
                boolean = true;
                newUploadedFileName.push(newName);
            }
        });
    }
    
    if (boolean == false) {
        errorResult["Message"] = "Something went wrong. Please try again later.";
        return res.send(errorResult);
    } else {
        successResult["Message"] = "Image(s) have been upload successful";
        return res.send(successResult);
    } 
});

/**
 * check duplicate sku number for products
 */
router.post('/asynCheckSkuNo_db',tokenValidator.verifyToken, (req, res) => {
    dbFunctions.asynCheckSkuNo_db(req,res);
});

/**
 * insert new product to the database
 */
router.post('/addProduct_db/', tokenValidator.verifyToken, (req, res) => {
    var obj = new Object({ 'filepath': newUploadedFileName });
    var obj1 = Object.assign(req, obj);
    dbFunctions.addProduct_db(obj1,res);
});


module.exports = router;