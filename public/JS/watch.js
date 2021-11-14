let watchArray = [];

axios
  .get("/products/Apple Watch")
  .then(function (response) {
    watchArray = response.data;
    let watchSection = document.getElementById("appleWatchSection");

    for (let index = 0; index < watchArray.length; index++) {
      watchSection.innerHTML += `<article>
        <img class="appleWatchImg" src=${watchArray[index].pictures[0]}>
        <form method="get" action="updateProductForm.html"><button class="watchUpdateBtn" name="productId" value='${watchArray[index]._id}'>Update</button></form>
        <button onclick = "deleteProduct('${watchArray[index]._id}')" type="button" class="watchDeleteBtn">Delete</button>
        <h1>${watchArray[index].name}</h1>
        <p>${watchArray[index].description}</p>
        <p>${watchArray[index].price}₪</p>
        <button onclick = "addProductToCart('${watchArray[index]._id}', '${watchArray[index].name}', '${watchArray[index].pictures[0]}')" type="button" class="watchCartBtn">Add To Cart</button>
        </article>`;
    }

    const watchImgArray = document.getElementsByClassName("appleWatchImg");

    for (let index = 0; index < watchImgArray.length; index++) {
      watchImgArray[index].addEventListener("mouseover", () => {
        watchImgArray[index].src = watchArray[index].pictures[1];
      });
      watchImgArray[index].addEventListener("mouseout", () => {
        watchImgArray[index].src = watchArray[index].pictures[0];
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
