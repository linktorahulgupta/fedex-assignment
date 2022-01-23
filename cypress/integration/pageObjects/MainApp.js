//This page class will expose custom css selector based on data attribute
const dataAttribute = "data-test"
const dataAttributeForLoop = "data-card-index"
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
    isCardAvailable(cardIndex){
        return cy.get(`[${dataAttributeForLoop}=${cardIndex}]`)
    }
}
export default MainAppObject