let ipadArray = [];
axios
  .get("/products/iPad")
  .then((response) => {
    ipadArray = response.data;
    const ipadSection = document.getElementById("ipadSection");

    printProduct(ipadArray, ipadSection, "ipad");

    const preIpadBtn = document.getElementsByClassName("ipadPreviousButton");
    const nextIpadBtn = document.getElementsByClassName("ipadNextButton");
    const ipadImgArray = document.getElementsByClassName("ipadImg");
    const addIpadToCartBtnArray =
      document.getElementsByClassName("ipadCartBtn");
      // addToCartMessage(addIpadToCartBtnArray, ipadArray);
    nextImg(nextIpadBtn, ipadImgArray, ipadArray);
    PreviousImg(preIpadBtn, ipadImgArray, ipadArray);
  })
  .catch((error) => {
    console.log(error);
  });

