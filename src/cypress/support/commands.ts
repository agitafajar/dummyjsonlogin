// Define the custom command
Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "https://dummyjson.com/auth/login",
    body: {
      username: "emilys",
      password: "emilyspass",
    },
  }).then((response) => {
    localStorage.setItem("token", response.body.token);
    cy.setCookie("token", response.body.token);
  });
});
