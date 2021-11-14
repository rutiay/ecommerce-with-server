const form = document.getElementById("addProductForm");

form.addEventListener("submit", addProductClient);

function addProductClient(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const imgOne = document.getElementById("imgOne").value;
  const imgTwo = document.getElementById("imgTwo").value;
  const pictures = [imgOne, imgTwo];
  axios
    .post("/products", {
        name,
        price,
        description,
        category,
        pictures
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}