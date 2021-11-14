const mongoDB = require("mongodb");
require('dotenv').config()
const MongoClient = mongoDB.MongoClient;
const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017";
const ObjectId = mongoDB.ObjectId;
const dbName = "ecommerce";


function getProducts(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const ecommerceDB = connection.db(dbName);
    ecommerceDB
      .collection("products")
      .find()
      .toArray((err, products) => {
        if (err) {
          throw error;
        }
        res.send(products);
        connection.close();
      });
  });
}

function getProductsByCategory(req, res) {
  const category = { category: req.params.category };
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const ecommerceDB = connection.db(dbName);
    ecommerceDB
      .collection("products")
      .find(category)
      .toArray((err, products) => {
        if (err) {
          throw error;
        }
        res.send(products);
        connection.close();
      });
  });
}

function addProduct(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const ecommerceDB = connection.db(dbName);
    const obj = req.body;
    console.log(obj);
    if (obj != undefined) {
      ecommerceDB.collection("products").insertOne(obj, (err, response) => {
        if (err) {
          throw err;
        }
        res.sendStatus(201);
        connection.close();
      });
    } else {
      res.sendStatus(400);
    }
  });
}

function deleteProductById(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const ecommerceDB = connection.db(dbName);
    const id = req.params.id;
    ecommerceDB
      .collection("products")
      .findOneAndDelete({ _id: ObjectId(id) }, (err, response) => {
        if (err) {
          throw err;
        }
        if (response.value) {
          res.send(response);
        } else {
          res.sendStatus(404);
        }
        connection.close();
      });
  });
}

function updateProductById(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const id = req.params.id;
    const myObj = req.body;
    const ecommerceDB = connection.db(dbName);
    ecommerceDB
      .collection("products")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: myObj },
        (err, response) => {
          if (err) {
            throw err;
          }
          if (response.value) {
            res.send(response);
          } else {
            res.sendStatus(404);
          }
          connection.close();
        }
      );
  });
}

function getCart(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const id = req.params.id;
    const ecommerceDB = connection.db(dbName);
    ecommerceDB
      .collection("carts")
      .findOne({ _id: ObjectId(id) }, (err, response) => {
        if (err) {
          throw err;
        }
        res.send(response);
        connection.close();
      });
  });
}

function addProductToCart(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const id = req.params.id;
    const productId = req.body._id;
    const ecommerceDB = connection.db(dbName);
    ecommerceDB
      .collection("products")
      .findOne({ _id: ObjectId(productId) }, (error, product) => {
        if (error) {
          throw error;
        }
        ecommerceDB
          .collection("carts")
          .updateOne(
            { _id: ObjectId(id) },
            { $push: { products: product } },
            (error, res) => {
              if (error) {
                throw error;
              }
              console.log(res);
            }
          );
      });
  });
}

function deleteProductFromCart(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const id = req.params.id;
    const productId = req.body._id;
    const ecommerceDB = connection.db(dbName);
    ecommerceDB
    .collection("products")
    .findOne({ _id: ObjectId(productId) }, (error, product) => {
      if (error) {
        throw error;
      }
      console.log(product);
    ecommerceDB
      .collection("carts")
      .updateOne(
        { _id: ObjectId(id) },
        { $pull: { products: product } },
        (error, response) => {
          if (error) {
            throw error;
          }
          console.log(response);
        }
      );
    });
  });
}

function getContacts(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const ecommerceDB = connection.db(dbName);
    ecommerceDB
      .collection("contact")
      .find()
      .toArray((err, products) => {
        if (err) {
          console.log(err);
        }
        res.send(products);
        connection.close();
      });
  });
}

function addContact(req, res) {
  MongoClient.connect(mongoURL, (error, connection) => {
    if (error) {
      throw error;
    }
    const ecommerceDB = connection.db(dbName);
    const obj = req.body;
    console.log(obj);
    if (obj != undefined) {
      ecommerceDB.collection("contact").insertOne(obj, (err, response) => {
        if (err) {
          throw err;
        }
        res.sendStatus(201);
        connection.close();
      });
    } else {
      res.sendStatus(400);
    }
  });
}

module.exports = {
  getProductsByCategory,
  getProducts,
  deleteProductById,
  addProduct,
  updateProductById,
  getCart,
  addProductToCart,
  deleteProductFromCart,
  getContacts,
  addContact,
};
