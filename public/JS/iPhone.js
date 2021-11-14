let iphoneArray = [];
axios
  .get("/products/iPhone")
  .then(function (response) {
    iphoneArray = response.data;
    let iphoneSection = document.getElementById("iphoneSection");

    printProduct(iphoneArray, iphoneSection, "iphone");

    let preIphoneBtn = document.getElementsByClassName("iphonePreviousButton");
    let nextIphoneBtn = document.getElementsByClassName("iphoneNextButton");
    const iphoneImgArray = document.getElementsByClassName("iphoneImg");
    const addIphoneToCartBtnArray =
      document.getElementsByClassName("iphoneCartBtn");
      // addToCartMessage(addIphoneToCartBtnArray, iphoneArray);
    nextImg(nextIphoneBtn, iphoneImgArray, iphoneArray);
    PreviousImg(preIphoneBtn, iphoneImgArray, iphoneArray);
  })
  .catch(function (error) {
    console.log(error);
  });
