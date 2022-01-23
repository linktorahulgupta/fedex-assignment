//Created a custom command which can potentially intercept 
//any request made to swapi to avoid negative test failures 
//incase swapi response status code is not 200

Cypress.Commands.add('interceptUntilResults', (searchFormObject, swapiBaseURL, searchType, searchQuery, eventType) => {
    var encodedSearchQuery = encodeURIComponent(searchQuery.trim())
    var encodedSearchURL = swapiBaseURL + searchType +'/?search='+ encodedSearchQuery
    cy.intercept('GET', encodedSearchURL).as('getResponse')
    var typeOfEvent = {"click":"click", "enter":"enter"}
    switch(eventType){
        case typeOfEvent.click:
            searchFormObject.clickSubmitButton()
            break
        case typeOfEvent.enter:
            searchFormObject.enterSubmitButton()
            break
    }
    cy.wait('@getResponse', {'timeout':10000}).its('response.statusCode').should('be.eql', 200)
})

