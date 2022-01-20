Cypress.Commands.add('interceptUntilResults', (searchFormObject, swapiBaseURL, searchType, searchQuery, eventType) => {
    var encodedSearchQuery = encodeURIComponent(searchQuery.trim())
    var encodedSearchURL = swapiBaseURL + searchType +'/?search='+ encodedSearchQuery
    cy.intercept('GET', encodedSearchURL).as('getResponse')
    if (eventType === "click"){ 
        searchFormObject.clickSubmitButton()
     } else {
         cy.log("inside else")
         searchFormObject.enterSubmitButton()}
    cy.wait('@getResponse', {'timeout':10000}).its('response.statusCode').should('be.eql', 200)
})

