let cartArray = [];
const cart = document.getElementById("cartTable");
const sumOfProducts = document.getElementById("sum");
const shippingFee = document.getElementById("shipping");
const totalSum = document.getElementById("total");

axios
  .get("cart/6190094c8faf692d926f6555")
  .then(function (response) {
    cartArray = response.data.products;
    for (let index = 0; index < cartArray.length; index++) {
      if (index == 0) {
        cart.innerHTML = `<tr><th colspan="2">Product</th><th>Discription</th><th>Price</th></tr>`;
      }
      cart.innerHTML += `<tr>
    <td><img class="cartImg" src=${cartArray[index].pictures[0]}></td>
    <td>${cartArray[index].name}</td>
    <td>${cartArray[index].description}</td>
    <td>${cartArray[index].price}₪</td>
    <td><button onclick = "removeFromCart('${cartArray[index]._id}')" type="button" class="removeBtn">Remove</button></td>
    </tr>`;
      sumOfProducts.innerText = `${sum()}₪`;
      shippingFee.innerText = `${calculateShippingFee(sum())}`;
      totalSum.innerText = `${calculateTotalSum(
        sum(),
        calculateShippingFee(sum())
      )}₪`;
    }
  })
  .catch(function (error) {
    console.log(error);
  });


function sum() {
  let sum = 0;
  for (const product of cartArray) {
    sum += product.price;
  }
  return sum;
}

function calculateShippingFee(sum) {
  if (sum > 2000) {
    return "Free";
  } else if (cartArray.length == 0) {
    return 0;
  } else {
    return 179;
  }
}

function calculateTotalSum(sum, shipping) {
  if (Number(shipping)) {
    return sum + shipping;
  }
  return sum;
}

function removeFromCart(productId) {
  for (let index = 0; index < cartArray.length; index++) {
    if (cartArray[index]._id == productId) {
      axios.patch("cart/delete/6190094c8faf692d926f6555", {
        _id: productId
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      sumOfProducts.innerText = `${sum()}₪`;
      if (Number(calculateShippingFee(sum()))) {
        shippingFee.innerText = `${calculateShippingFee(sum())}₪`;
      } else {
        shippingFee.innerText = `${calculateShippingFee(sum())}`;
      }
      totalSum.innerText = `${calculateTotalSum(
        sum(),
        calculateShippingFee(sum())
      )}₪`;
    }
  }
}

function checkOutMessage(){
  Swal.fire(
    'Thank You!',
    'Your order was completed successfully.',
    'success'
  )
}