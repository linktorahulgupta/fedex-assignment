//This page class will expose custom css selector based on data attribute
const dataAttribute = "data-test"
class PlanetSearchResultObject{
    getPlanetName(){
        return cy.get(`[${dataAttribute}="planet-name"]`)
    }
    getPopulationLabel(){
        return cy.get(`[${dataAttribute}="population-label"]`)
    }
    getPopulationValue(){
        return cy.get(`[${dataAttribute}="population-value"]`)
    }
    getClimateLabel(){
        return cy.get(`[${dataAttribute}="climate-label"]`)
    }
    getClimateValue(){
        return cy.get(`[${dataAttribute}="climate-value"]`)
    }
    getGravityLabel(){
        return cy.get(`[${dataAttribute}="gravity-label"]`)
    }
    getGravityValue(){
        return cy.get(`[${dataAttribute}="gravity-value"]`)
    }
    assertPlanetSearchResult(planet, chainer){
        var {searchQuery, name, population, climate, gravity, description} = planet
        this.getPlanetName().should(chainer,name)
        this.getPopulationValue().should(chainer,population)
        this.getClimateValue().should(chainer,climate)
        this.getGravityValue().should(chainer,gravity)
    }
}
export default PlanetSearchResultObject