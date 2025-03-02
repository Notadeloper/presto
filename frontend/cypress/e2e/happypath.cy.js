describe('user happy path', () => {
  it('should navigate to register page on start', () => {
    cy.visit('localhost:3000');
    cy.wait(1000);
    cy.url().should('include', '/register');
  });
  it('should register successfully', () => {
    cy.visit('localhost:3000');
    cy.get('input[name="register-email"]').type('user123@example.com');
    cy.get('input[name="register-password"]').type('123');
    cy.get('input[name="confirm-register-password"]').type('123');
    cy.get('input[name="user-name"]').type('Sample Name');
    cy.get('button[aria-label="register"]').click();
    cy.url().should('include', '/dashboard');
  })
  it('it should create a new presentation successfully', () => {
    cy.get('button[aria-label="new-slide"]').click();
    cy.url().should('include', '/presentation');
  })
})