/// <reference types="cypress" />

// Inbuilt cy.fixture() function of cypress has intentionally not being used here
// to load fixtures so we can use foreach loop outside 'it' test block.
const validCharactersJson = require('../../fixtures/characters.json')
const inValidCharactersJson = require('../../fixtures/inValidCharacters.json')
const multiCharactersJson = require('../../fixtures/multiCharacters.json')
const validPlanetsJson = require('../../fixtures/planets.json')
const inValidPlanetsJson = require('../../fixtures/inValidPlanets.json')
import MainApp from '../pageObjects/MainApp'
import CharacterSearchResult from '../pageObjects/CharacterSearchResult'
import PlanetSearchResult from '../pageObjects/PlanetSearchResult'
import SearchForm from '../pageObjects/SearchForm'
let mainAppObject = new MainApp()
let characterSearchResultObject = new CharacterSearchResult()
let planetSearchResultObject = new PlanetSearchResult();
let searchFormObject = new SearchForm()
const swapiBaseURL = 'https://swapi.dev/api/'
const appBaseURL = '/'

beforeEach(() => {
    cy.visit(appBaseURL)
    mainAppObject.getMainTitle().should('have.text','The Star Wars Search')
})

afterEach(()=> {
    searchFormObject.clearSearchQuery().should('have.value', '')
})

describe("Service availability test suite", () => {
    it('Check star wars API status is 200', () => {
        const response = cy.request('GET', swapiBaseURL)
        response.its('status').should('be.eql', 200)
    })
})

describe("Multiple characters search results test suite", () => {
    let searchType = 'people'
    let eventType = 'click'
    let mutlipleCardIndex = 0
    let searchQuery = multiCharactersJson[0].searchQuery
    let searchResults = multiCharactersJson[0].results
    it(`Verify multiple search results returned for "${searchResults[0].name}, ${searchResults[1].name}, ${searchResults[2].name}" using search query - "${multiCharactersJson[0].searchQuery}"`, function() {
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        searchResults.forEach(charachter => {
            characterSearchResultObject.assertCharacherSearchResult(charachter, mutlipleCardIndex, 'have.text')
            mutlipleCardIndex = mutlipleCardIndex + 1
        })
    })
})

describe("Valid character search test suite", () => {
    let searchType = 'people'
    let eventType = 'click'
    let cardIndex = 0
    validCharactersJson.forEach(charachter => {
        var searchQuery = charachter.searchQuery
        var description = charachter.description
        it(`Verify search results (using click event) for a character - ${description}`, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            characterSearchResultObject.assertCharacherSearchResult(charachter, cardIndex, 'have.text')
        })
    })
})

describe("Valid planet search test suite", () => {
    let searchType = 'planets'
    let eventType = 'click'
    let cardIndex = 0
    validPlanetsJson.forEach(planet => {
        var searchQuery = planet.searchQuery
        var description = planet.description
        it(`Verify search results (using click event) for a planet - ${description}`, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            planetSearchResultObject.assertPlanetSearchResult(planet, cardIndex, 'have.text')
        })
    })
})

describe("Invalid character Search Test suite", () => {
    let searchType = 'people'
    let eventType = 'click'
    let cardIndex = 0
    inValidCharactersJson.forEach(charachter => {
        var searchQuery = charachter.searchQuery
        var description = charachter.description
        it(`Verify search results (using click event) for a character - ${description}`, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            mainAppObject.isNotFound().should('exist')
            mainAppObject.isCardAvailable(cardIndex).should('not.exist')
        })
    })
})

describe("Invalid planet search Test suite", () => {
    let searchType = 'planets'
    let eventType = 'click'
    let cardIndex = 0
    inValidPlanetsJson.forEach(planet => {
        var searchQuery = planet.searchQuery
        var description = planet.description
        it(`Verify search results (using click event) for a planet - ${description}`, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            mainAppObject.isNotFound().should('exist')
            mainAppObject.isCardAvailable(cardIndex).should('not.exist')
        })
    })
})

describe("Additional scenarios", () => {
    let searchType = 'people'
    let eventType = 'click'
    let cardIndex = 0
    var searchQuery = validCharactersJson[0].searchQuery
    it(`Verify previous search result are removed on searching empty input query`, function() {
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        characterSearchResultObject.assertCharacherSearchResult(validCharactersJson[0], cardIndex, 'have.text')
        searchFormObject.clearSearchQuery()
        searchFormObject.clickSubmitButton()
        mainAppObject.isCardAvailable(cardIndex).should('not.exist')
    })
    it(`Verify "Not Found" in place of previous search result on changing the search type`, function() {
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        characterSearchResultObject.assertCharacherSearchResult(validCharactersJson[0], cardIndex, 'have.text')
        searchType = 'planets'
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        mainAppObject.isNotFound().should('exist')
        mainAppObject.isCardAvailable(cardIndex).should('not.exist')
    })
    it(`Verify search results (using enter event) for a planet`, function() {
        searchType = 'people'
        eventType = 'enter'
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        characterSearchResultObject.assertCharacherSearchResult(validCharactersJson[0], cardIndex, 'have.text')
    })
})
