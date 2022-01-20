const dataAttribute = "data-test"
class PlanetSearchResultObject{
    getPlanetName(){
        return cy.get('['+dataAttribute+'="planet-name"]')
    }
    getPopulationLabel(){
        return cy.get('['+dataAttribute+'="population-label"]')
    }
    getPopulationValue(){
        return cy.get('['+dataAttribute+'="population-value"]')
    }
    getClimateLabel(){
        return cy.get('['+dataAttribute+'="climate-label"]')
    }
    getClimateValue(){
        return cy.get('['+dataAttribute+'="climate-value"]')
    }
    getGravityLabel(){
        return cy.get('['+dataAttribute+'="gravity-label"]')
    }
    getGravityValue(){
        return cy.get('['+dataAttribute+'="gravity-value"]')
    }
}
export default PlanetSearchResultObject