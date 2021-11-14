let macArray = [];

axios
  .get("/products/Mac")
  .then(function (response) {
    macArray = response.data;
    const macSection = document.getElementById("macSection");

    printProduct(macArray, macSection, "mac");

    const preMacBtn = document.getElementsByClassName("macPreviousButton");
    const nextMacBtn = document.getElementsByClassName("macNextButton");
    const macImgArray = document.getElementsByClassName("macImg");
    const addMacToCartBtnArray = document.getElementsByClassName("macCartBtn");
    // addToCartMessage(addMacToCartBtnArray, macArray);
    nextImg(nextMacBtn, macImgArray, macArray);
    PreviousImg(preMacBtn, macImgArray, macArray);
  })
  .catch(function (error) {
    console.log(error);
  });
