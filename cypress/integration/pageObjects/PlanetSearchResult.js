//This page class will expose custom css selector based on data attribute
const dataAttribute = "data-test"
const dataAttributeForLoop = "data-card-index"
class PlanetSearchResultObject{
    getPlanetName(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="planet-name"]`)
    }
    getPopulationLabel(){
        return cy.get(`[${dataAttribute}="population-label"]`)
    }
    getPopulationValue(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="population-value"]`)
    }
    getClimateLabel(){
        return cy.get(`[${dataAttribute}="climate-label"]`)
    }
    getClimateValue(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="climate-value"]`)
    }
    getGravityLabel(){
        return cy.get(`[${dataAttribute}="gravity-label"]`)
    }
    getGravityValue(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="gravity-value"]`)
    }
    assertPlanetSearchResult(planet, cardIndex, chainer){
        var {searchQuery, name, population, climate, gravity, description} = planet
        this.getPlanetName(cardIndex).should(chainer,name)
        this.getPopulationValue(cardIndex).should(chainer,population)
        this.getClimateValue(cardIndex).should(chainer,climate)
        this.getGravityValue(cardIndex).should(chainer,gravity)
    }
}
export default PlanetSearchResultObject