const form = document.getElementById("form");
form.addEventListener("submit", addContact);

function addContact(e) {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
  axios
    .post("/contact", {
      firstName,
      lastName,
      email,
      phone,
      message,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

