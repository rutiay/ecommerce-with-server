const currentUrlString = window.location.href;
const currentUrlObj = new URL(currentUrlString);
const productId = currentUrlObj.searchParams.get("productId");

const form = document.getElementById("updateProductForm");
form.addEventListener("submit", updateProduct)

function updateProduct(e) {
    e.preventDefault();
    console.log(productId);
    axios
      .patch(`products/${productId}`, {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        pictures: [
          document.getElementById("imgOne").value,
          document.getElementById("imgTwo").value
        ]
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
