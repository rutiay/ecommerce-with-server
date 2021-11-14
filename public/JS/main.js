function printProduct(productsArray, section, productName) {
  for (let index = 0; index < productsArray.length; index++) {
    section.innerHTML += `<article>
    <button class="${productName}PreviousButton">&#8249;</button>
    <img class="${productName}Img" src=${productsArray[index].pictures[0]}>
    <button class="${productName}NextButton">&#8250;</button><br>
    <form method="get" action="updateProductForm.html"><button class="${productName}UpdateBtn" name="productId" value='${productsArray[index]._id}'>Update</button></form>
    <button onclick = "deleteProduct('${productsArray[index]._id}')" type="button" class="${productName}DeleteBtn">Delete</button>
        <h1>${productsArray[index].name}</h1>
        <p>${productsArray[index].description}</p>
        <p>${productsArray[index].price}₪</p>
        <button onclick = "addProductToCart('${productsArray[index]._id}', '${productsArray[index].name}', '${productsArray[index].pictures[0]}')" type="button" class="${productName}CartBtn">Add To Cart</button>
        </article>`;
  }
}

function nextImg(nextButtonArray, imgArray, productsArray) {
  for (let index = 0; index < nextButtonArray.length; index++) {
    let imgCounter = 0;
    nextButtonArray[index].addEventListener("click", () => {
      imgCounter = ++imgCounter % productsArray[index].pictures.length;
      imgArray[index].src = productsArray[index].pictures[imgCounter];
    });
  }
}

function PreviousImg(previousButtonArray, imgArray, productsArray) {
  for (let index = 0; index < previousButtonArray.length; index++) {
    let imgCounter = 0;
    previousButtonArray[index].addEventListener("click", () => {
      imgCounter = ++imgCounter % productsArray[index].pictures.length;
      imgArray[index].src = productsArray[index].pictures[imgCounter];
    });
  }
}

function addProductToCart(productId, productName, productImg) {
  console.log(productId, productName, productImg);
  axios
  .patch("/cart/add/6190094c8faf692d926f6555", {
    _id: productId,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
  Swal.fire({
    title: 'Great!',
    text: `${productName} has been added to your cart!`,
    imageUrl: `${productImg}`,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
}

function deleteProduct(productId) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`/products/${productId}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
