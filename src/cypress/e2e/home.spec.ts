describe("Home Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should display welcome message", () => {
    cy.contains("Welcome valid@example.com").should("be.visible");
  });

  it("should log out successfully", () => {
    cy.get("button").contains("Logout").click();
    cy.url().should("include", "/login");
  });
});
