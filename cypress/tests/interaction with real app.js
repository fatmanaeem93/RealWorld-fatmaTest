///<reference types="Cypress"/>


describe("interaction with realapp",()=>{


    before(()=>{
        cy.visit("http://localhost:3000/signin")
     })  

     context("Sign up",()=>{
    
         it("Verify clicking on sign-up link",()=>{
           cy.get(".MuiGrid-root  a").should("have.text","Don't have an account? Sign Up").click()
           cy.url().should("contain","/signup")
         });
         it('Verify filling first Name field', () => {
             cy.get("#firstName").type("fatma").should('have.value',"fatma").and('be.focused')
         });
         it('Verify filling First Name field', () => {
            cy.get("#lastName").type("shawaf").should('have.value',"shawaf").and('be.focused')
        });
        it('Verify filling user Name field', () => {
            cy.get("#username").type("fatma shawaf").should("have.value","fatma shawaf").and("be.focused")
        });
        it('Verify filling password field', () => {
            cy.get("#password").type("123456").should('have.value',"123456").and('be.focused')
        });
        it('Verify filling confirm password field', () => {
            cy.get("#confirmPassword").type("123456").should('have.value',"123456").and('be.focused')
            cy.get("form button").should('not.have.attr',"disabled")            
        });
        it('Verify clicking on ', () => {
            cy.get("form button").should("be.visible").click()
            cy.url().should("contain","/signin")
        });
     })

})