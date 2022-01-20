const dataAttribute = "data-test"
class CharacterSearchResultObject{
    getCharachterName(){
        //return cy.get('['+dataAttribute+'="character-name"]')
        return cy.get(`[${dataAttribute}="character-name"]`)
    }
    getGenderLabel(){
        return cy.get('['+dataAttribute+'="gender-label"]')
    }
    getGenderValue(){
        return cy.get('['+dataAttribute+'="gender-value"]')
    }
    getBirthYearLabel(){
        return cy.get('['+dataAttribute+'="birthyear-label"]')
    }
    getBirthYearValue(){
        return cy.get('['+dataAttribute+'="birthyear-value"]')
    }
    getEyeColorLabel(){
        return cy.get('['+dataAttribute+'="eyecolor-label"]')
    }
    getEyeColorValue(){
        return cy.get('['+dataAttribute+'="eyecolor-value"]')
    }
    getSkinColorLabel(){
        return cy.get('['+dataAttribute+'="skincolor-label"]')
    }
    getSkinColorValue(){
        return cy.get('['+dataAttribute+'="skincolor-value"]')
    }
}
export default CharacterSearchResultObject