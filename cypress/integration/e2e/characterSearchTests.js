/// <reference types="cypress" />
// Require() function is used instead of cy.fixture() to utilize the json array object outside 'it' test block.
const validCharactersJson = require('../../fixtures/characters.json');
const validPlanetsJson = require('../../fixtures/planets.json');
import MainApp from '../pageObjects/MainApp'
import CharacterSearchResult from '../pageObjects/CharacterSearchResult'
import PlanetSearchResult from '../pageObjects/PlanetSearchResult'
import SearchForm from '../pageObjects/SearchForm'
let mainAppObject
let characterSearchResultObject
let planetSearchResultObject
let searchFormObject
let swapiBaseURL = 'https://swapi.dev/api/'
let appBaseURL = '/'

before(() => {
    mainAppObject = new MainApp()
    characterSearchResultObject = new CharacterSearchResult()
    planetSearchResultObject = new PlanetSearchResult()
    searchFormObject = new SearchForm()
})

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
        var {searchQuery, name, gender, birthYear, eyeColor, skinColor, description} = charachter
        var searchType = "people"
        var eventType = "click"
        it('Verify search results (using click event) for a character - '+ description, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            if(description === "which doesn't exist"){
                mainAppObject.isNotFound().should('exist')
            }else{
                characterSearchResultObject.getCharachterName().should('have.text',name)
                characterSearchResultObject.getGenderValue().should('have.text',gender)
                characterSearchResultObject.getBirthYearValue().should('have.text',birthYear)
                characterSearchResultObject.getEyeColorValue().should('have.text',eyeColor)
                characterSearchResultObject.getSkinColorValue().should('have.text',skinColor)
            }
        })
    })
})

describe("Planet Search Test suite", () => {
    validPlanetsJson.forEach(planet => {
        var {searchQuery, name, population, climate, gravity, description} = planet
        var searchType = "planets"
        var eventType = "click"
        it('Verify search results (using click event) for a planet - '+ description, function() {
            searchFormObject.checkRadioButton(searchType).should('be.checked')
            searchFormObject.inputSearchQuery(searchQuery)
            cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
            if(description === "which doesn't exist"){
                mainAppObject.isNotFound().should('exist')
            }else{
                planetSearchResultObject.getPlanetName().should('have.text',name)
                planetSearchResultObject.getPopulationValue().should('have.text',population)
                planetSearchResultObject.getClimateValue().should('have.text',climate)
                planetSearchResultObject.getGravityValue().should('have.text',gravity)
            }
        })
    })
})

describe("Additional scenarios", () => {
    var {searchQuery, name, population, climate, gravity, description} = validPlanetsJson[0]
    var searchType = "planets"
    var eventType = "click"
    it('Verify previous search result are removed on searching empty input query', function() {
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        planetSearchResultObject.getPlanetName().should('have.text',name)
        planetSearchResultObject.getPopulationValue().should('have.text',population)
        planetSearchResultObject.getClimateValue().should('have.text',climate)
        planetSearchResultObject.getGravityValue().should('have.text',gravity)
        searchFormObject.clearSearchQuery()
        searchFormObject.clickSubmitButton()
        planetSearchResultObject.getPlanetName().should('not.exist')
    })
    it('Verify "Not Found" in place of previous search result on changing the search type', function() {
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        planetSearchResultObject.getPlanetName().should('have.text',name)
        planetSearchResultObject.getPopulationValue().should('have.text',population)
        planetSearchResultObject.getClimateValue().should('have.text',climate)
        planetSearchResultObject.getGravityValue().should('have.text',gravity)
        searchType = "people"
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery)
        mainAppObject.isNotFound().should('exist')
        planetSearchResultObject.getPlanetName().should('not.exist')
    })
    it('Verify search results (using enter event) for a planet', function() {
        searchType = "planets"
        eventType = "enter"
        searchFormObject.checkRadioButton(searchType).should('be.checked')
        searchFormObject.inputSearchQuery(searchQuery)
        cy.interceptUntilResults(searchFormObject, swapiBaseURL, searchType, searchQuery, eventType)
        planetSearchResultObject.getPlanetName().should('have.text',name)
        planetSearchResultObject.getPopulationValue().should('have.text',population)
        planetSearchResultObject.getClimateValue().should('have.text',climate)
        planetSearchResultObject.getGravityValue().should('have.text',gravity)
    })
})