const dataAttribute = "data-test"
class SearchFormObject{
    getSearchForm(){
        return cy.get('['+dataAttribute+'="search-form"]')
    }
    getPeopleRadioButton(){
        return cy.get('['+dataAttribute+'="people-radio"]')
    }
    getPeopleRadioButtonLabel(){
        return cy.get('['+dataAttribute+'="people-label"]')
    }
    getPlanetsRadioButton(){
        return cy.get('['+dataAttribute+'="planets-radio"]')
    }
    getPlanetsRadioButtonLabel(){
        return cy.get('['+dataAttribute+'="planets-label"]')
    }
    getQuerySearchInput(){
        return cy.get('['+dataAttribute+'="query-search"]')
    }
    getSubmitButton(){
        return cy.get('['+dataAttribute+'="submit-button"]')
    }
    checkRadioButton(searchType){
        return (searchType === "people") ? this.getPeopleRadioButton().check() : this.getPlanetsRadioButton().check()
    }
    inputSearchQuery(searchQuery){
        return this.getQuerySearchInput().type(searchQuery)
    }
    clickSubmitButton(){
        return this.getSubmitButton().click()
    }
    enterSubmitButton(){
        return this.getQuerySearchInput().type('{enter}')
    }
    clearSearchQuery(){
        return this.getQuerySearchInput().clear()
    }
}
export default SearchFormObject