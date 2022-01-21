//This page class will expose custom css selector based on data attribute
const dataAttribute = "data-test"
class MainAppObject{
    getMainTitle(){
        return cy.get(`[${dataAttribute}="main-title"]`)
    }
    isloading(){
        return cy.get(`[${dataAttribute}="loading"]`)
    }
    isNotFound(){
        return cy.get(`[${dataAttribute}="not-found"]`)
    }
}
export default MainAppObject