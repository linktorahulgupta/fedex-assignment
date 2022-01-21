/// <reference types="cypress" />

// Inbuilt cy.fixture() function of cypress has intentionally not being used here
// to load fixtures so we can use foreach loop outside 'it' test block.
const validCharactersJson = require('../../fixtures/characters.json');
const validPlanetsJson = require('../../fixtures/planets.json');
const inValidCharactersJson = require('../../fixtures/inValidCharacters.json');
const inValidPlanetsJson = require('../../fixtures/inValidPlanets.json');
import MainApp from '../pageObjects/MainApp'
import CharacterSearchResult from '../pageObjects/CharacterSearchResult'
import PlanetSearchResult from '../pageObjects/PlanetSearchResult'
import SearchForm from '../pageObjects/SearchForm'
let mainAppObject = new MainApp();
let characterSearchResultObject = new CharacterSearchResult();
let planetSearchResultObject = new PlanetSearchResult();
let searchFormObject = new SearchForm();
let swapiBaseURL = 'https://swapi.dev/api/'
let appBaseURL = '/'

beforeEach(() => {
    cy.visit(appBaseURL)
    mainAppObject.getMainTitle().should('have.text','The Star Wars Search')
})

afterEach(()=> {
    searchFormObject.clearSearchQuery().should('have.value', '')
})

describe("Service availability Test suite", () => {
    it('Check star wars API status is 200', () => {
        const response = cy.request('GET', swapiBaseURL)
        response.its('status').should('be.eql', 200)
    })
})

describe("Character Search Test suite", () => {
    // validCharactersJson.forEach(charachterArr => {
    //     charachterArr.childNodes.forEach(charachter =>{
    //         const {searchQuery, name, gender, birthYear, eyeColor, skinColor, description} = charachter
    //         it.only('Verify search results for a character - '+ description, function() {
    //             searchFormObject.checkPeopleRadioButton().should('be.checked')
    //             searchFormObject.inputSearchQuery(searchQuery)
    //             searchFormObject.clickSubmitButton()
    //             characterSearchResultObject.getCharachterName().should('have.text',name);
    //             characterSearchResultObject.getGenderValue().should('have.text',gender);
    //             characterSearchResultObject.getBirthYearValue().should('have.text',birthYear);
    //             characterSearchResultObject.getEyeColorValue().should('have.text',eyeColor);
    //             characterSearchResultObject.getSkinColorValue().should('have.text',skinColor);
    //         })
    //     })
    // })

    validCharactersJson.forEach(charachter => {
        var searchQuery = charachter.searchQuery
        var description = charachter.description
        var searchType = "people"
        var eventType = "click"
        it('Verify search results (using click event) for a character - '+ description, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            characterSearchResultObject.assertCharacherSearchResult(charachter, 'have.text')
        })
    })
})

describe("Planet Search Test suite", () => {
    validPlanetsJson.forEach(planet => {
        var searchQuery = planet.searchQuery
        var description = planet.description
        var searchType = "planets"
        var eventType = "click"
        it('Verify search results (using click event) for a planet - '+ description, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            planetSearchResultObject.assertPlanetSearchResult(planet, 'have.text')
        })
    })
})

describe("Invalid character Search Test suite", () => {
    inValidCharactersJson.forEach(charachter => {
        var searchQuery = charachter.searchQuery
        var description = charachter.description
        var searchType = "people"
        var eventType = "click"
        it('Verify search results (using click event) for a character - '+ description, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            mainAppObject.isNotFound().should('exist')
            characterSearchResultObject.assertCharacherSearchResult(charachter, 'not.exist')
        })
    })
})

describe("Invalid planet Search Test suite", () => {
    inValidPlanetsJson.forEach(planet => {
        var searchQuery = planet.searchQuery
        var description = planet.description
        var searchType = "planets"
        var eventType = "click"
        it('Verify search results (using click event) for a planet - '+ description, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            mainAppObject.isNotFound().should('exist')
            planetSearchResultObject.assertPlanetSearchResult(planet, 'not.exist')
        })
    })
})

describe("Additional scenarios", () => {
    var searchQuery = validPlanetsJson[0].searchQuery
    var searchType = "planets"
    var eventType = "click"
    it('Verify previous search result are removed on searching empty input query', function() {
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        planetSearchResultObject.assertPlanetSearchResult(validPlanetsJson[0], 'have.text')
        searchFormObject.clearSearchQuery()
        searchFormObject.clickSubmitButton()
        planetSearchResultObject.assertPlanetSearchResult(validPlanetsJson[0], 'not.exist')
    })
    it('Verify "Not Found" in place of previous search result on changing the search type', function() {
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        planetSearchResultObject.assertPlanetSearchResult(validPlanetsJson[0], 'have.text')
        searchType = "people"
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        mainAppObject.isNotFound().should('exist')
        planetSearchResultObject.assertPlanetSearchResult(validPlanetsJson[0], 'not.exist')
    })
    it('Verify search results (using enter event) for a planet', function() {
        searchType = "planets"
        eventType = "enter"
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        planetSearchResultObject.assertPlanetSearchResult(validPlanetsJson[0], 'have.text')
    })
})