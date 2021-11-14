const section = document.getElementById("contacts");

  axios
  .get("/contact")
  .then(function (response) {
    const contacts = response.data;
      for (const person of contacts) {
        section.innerHTML += `<article class="messages">
        <h1>Name: ${person.firstName} ${person.lastName}</h1>
        <h4>Email: ${person.email}</h4>
        <hr>
        <h3 class="userMessage">${person.message}<h3>
        </article>`;
      }
    })
    .catch(function (error) {
      console.log(error);
   });
