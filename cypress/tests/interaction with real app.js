///<reference types="Cypress"/>

const { Verify } = require("crypto");
const { verify } = require("sinon");



describe("interaction with realapp",()=>{
    beforeEach(() => {
        // Preserve cookie in every test
        Cypress.Cookies.defaults({
          preserve: (cookie) => {
            return true;
          }
        })
       
      });

    before(()=>{
        cy.visit("http://localhost:3000/signin")
     })  

 




})