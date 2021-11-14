const express = require("express"),
path = require("path");

utils = require("./utils");

const app = express();

const productRoute = "/products",
  cartRoute = "/cart",
  contactRoute = "/contact",
  publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));
app.use(express.json());

app.get(productRoute, (req, res) => {
  utils.getProducts(req, res);
});

app.get(`${productRoute}/:category`, (req, res) => {
  utils.getProductsByCategory(req, res);
});

app.post(productRoute, (req, res) => {
  utils.addProduct(req, res);
});

app.delete(`${productRoute}/:id`, (req, res) => {
  utils.deleteProductById(req, res);
});

app.patch(`${productRoute}/:id`, (req, res) => {
  utils.updateProductById(req, res);
});

app.get(`${cartRoute}/:id`, (req, res) => {
  utils.getCart(req, res);
});

app.patch(`${cartRoute}/add/:id`, (req, res) => {
  utils.addProductToCart(req, res);
});

app.patch(`${cartRoute}/delete/:id`, (req, res) => {
  utils.deleteProductFromCart(req, res);
});

app.get(contactRoute, (req, res) => {
  utils.getContacts(req, res);
});

app.post(contactRoute, (req, res) => {
  utils.addContact(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
