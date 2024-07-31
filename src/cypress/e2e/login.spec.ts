describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login form", () => {
    cy.get("form").should("be.visible");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("should show error on invalid credentials", () => {
    cy.get('input[name="username"]').type("emilys");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get("button").click();
    cy.get("div").contains("Invalid credentials").should("be.visible");
  });

  it("should redirect to home on valid login", () => {
    cy.get('input[name="username"]').type("emilys");
    cy.get('input[name="password"]').type("emilyspass");
    cy.get("button").click();
    cy.url().should("include", "/");
  });
});
