context("Home Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000");
  });

  it("should log out successfully", () => {
    cy.get("button").contains("Logout").click();
    cy.url().should("include", "/login");
  });
});
