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

     context("Sign up",()=>{
        it("Verify clicking on sign-up link",()=>{
          cy.get(".MuiGrid-root  a").should("have.text","Don't have an account? Sign Up").click()
          cy.url().should("contain","/signup")
        });
        it('Verify register of sender', () => {
           cy.register("fatma","shawaf","fatma shawaf","123456","123456")
           
        });
        it('Verify register of receiver', () => {
           cy.register("receiver1","sham","sham","123456","123456")
        });
    })

    context("Sender operation",()=>{
        it('Verify sign in sender', () => { 
            cy.signin("fatma shawaf","123456")    
    });
    it('Verify Create bank account', () => {
        cy.createBankAccount("bankQ","123456789","123456789")
    });
        // cy.get("[data-test=user-onboarding-dialog]  .MuiPaper-root").should("be.visible")
  
//  })
//  context("Sender operation",()=>{
//      it('Verify GetStarted view appear', () => {
//         cy.get("[data-test=user-onboarding-dialog]  .MuiPaper-root").should("be.visible")
         
//      });
//      it('Verify clicking on next button',()=>{
//          cy.get('[data-test="user-onboarding-next"]').click()

//     });
//     it('Verify filling bank name', () => {
//         cy.get("#bankaccount-bankName-input").type("BankQ").should("have.value","BankQ")
//     });
//     it('Verify filling routing number', () => {
//         cy.get("#bankaccount-routingNumber-input").type("123456789").should("have.value","123456789")
//     });
//     it('Verify filling account number', () => {
//         cy.get("#bankaccount-accountNumber-input").type("123456789").should("have.value","123456789")
//     });
//     it('Verify clicking in save button ', () => {
//         cy.get('[data-test="bankaccount-submit"]').click()
//     });
//     it('Verify clicking on done button', () => {
//         cy.get('[data-test="user-onboarding-next"]').click()
//     });
    it('Verify Clicking on New button', () => {
        cy.get('.MuiToolbar-root a[href="/transaction/new"]').click()
        cy.url().should("contain","/transaction/new")
    });
    it('Verify searching of receiver user', () => {
       cy.get(":nth-child(3) > .MuiStepLabel-root > .MuiStepLabel-iconContainer > .MuiSvgIcon-root").should("not.have.class","MuiStepIcon-active")
        cy.get("#user-list-search-input").type("receiver1")
        cy.wait(2000)
        cy.get("ul.MuiList-root li:first-child").click({force: true})
       
    });
   it('Verify the receiver was selected', () => {
    cy.get(":nth-child(3) > .MuiStepLabel-root > .MuiStepLabel-iconContainer > .MuiSvgIcon-root").should("have.class","MuiStepIcon-active")
   });
    it('Verify filling amount field', () => {
        cy.get("#amount").clear().type("50000").should("have.value","$50,000")
        cy.get('.MuiGrid-root button[data-test="transaction-create-submit-request"]').should("be.disabled")
    });
    it('Verify filling note field', () => {
        cy.get('.MuiGrid-root button[data-test="transaction-create-submit-request"]').should("be.disabled")
        cy.get("#transaction-create-description-input").clear().type("amount").should("have.value","amount")
    });
    it('Verify clicking on request button', () => {
        cy.get('.MuiGrid-root button[data-test="transaction-create-submit-request"]').should("not.be.disabled").click()
        });
    it('Verify name of receiver', () => {
        cy.get('div:nth-child(2) > h2').should('contain','receiver1')
        // cy.get(":nth-child(3) > .MuiStepLabel-root > .MuiStepLabel-iconContainer > .MuiSvgIcon-root").should("have.class","MuiStepIcon-active")
  
    });
    it('Verify transaction added', () => {
        // cy.get('[data-test="transaction-create-submit-request"]').should("contain"," $50,000.00")
    });
    it('verify logout',()=>{
        cy.get("div:nth-child(5) > ul > div > div > div.MuiListItemText-root > span").should("have.text","Logout").click()
        cy.url().should("contain","/signin")
    })
    })
    context("receiver operation",()=>{
        it('Verify sign in receiver account', () => {
           cy.signin("sham","123456")    
         });
        it('Verify Create bank account', () => {
            cy.createBankAccount("bankrec","123456789","123456789")
        });
        it('Verify clicking on notification button',()=>{
            cy.get('.MuiToolbar-root a[href="/notifications"]').should("have.text","1")
            cy.get("a.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit").click()
            cy.url().should("contain","/notifications")
            
        })
        it('Verify header of page is notification', () => {
            cy.get(".MuiContainer-maxWidthMd > div > div > div > h2").should("have.text","Notifications")
        });
        it('Verify info of sender', () => {
            cy.get("ul[data-test] li:first-child .MuiListItemText-root span").should("contain","fatma shawaf")
        });
        it('Verify clicking on dissmis button', () => {
           cy.get("ul[data-test] li:first-child button").click()
        });
        it('Verify clicking on Mine tab', () => {
            cy.get('.MuiGrid-root ul a[href="/"]').click()
           cy.url().should("contain","/")
           cy.get('.MuiTabs-scroller .MuiTabs-flexContainer a[href="/personal"]').click()
           cy.url().should("contain","/personal")
        });
       it('Verify that the requested exist in mine menu', () => {
          cy.get("div:nth-child(1) > li div.MuiGrid-root.MuiGrid-container .MuiTypography-gutterBottom > span:nth-child(1)")
          .should("contain","fatma shawaf")     
          cy.get("div:nth-child(1) > li div.MuiGrid-root.MuiGrid-container .MuiTypography-gutterBottom > span:nth-child(3)")
          .should("contain","receiver1 sham")    
       });
       it('Verify Clicking on requested in mine menu', () => {
           cy.get(".ReactVirtualized__Grid__innerScrollContainer div:first-child li").click()
           cy.url().should("contain","/transaction")
       });
       it('Verify clicking on Accept Request', () => {
          cy.contains("Accept Request").click()
          cy.url().should("contain","/transaction/")
       });
       it('Verify transaction added succefully',()=>{
       cy.get(".MuiGrid-root p span:first-child").should('have.text','fatma shawaf')
       cy.get(".MuiGrid-root p span:nth-child(3)").should('have.text','receiver1 sham')
       })
        })

})