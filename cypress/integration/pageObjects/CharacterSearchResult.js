//This page class will expose custom css selector based on data attribute
const dataAttribute = "data-test"
const dataAttributeForLoop = "data-card-index"
class CharacterSearchResultObject{
    getCharachterName(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="character-name"]`)
    }
    getGenderLabel(){
        return cy.get(`[${dataAttribute}="gender-label"]`)
    }
    getGenderValue(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="gender-value"]`)
    }
    getBirthYearLabel(){
        return cy.get(`[${dataAttribute}="birthyear-label"]`)
    }
    getBirthYearValue(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="birthyear-value"]`)
    }
    getEyeColorLabel(){
        return cy.get(`[${dataAttribute}="eyecolor-label"]`)
    }
    getEyeColorValue(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="eyecolor-value"]`)
    }
    getSkinColorLabel(){
        return cy.get(`[${dataAttribute}="skincolor-label"]`)
    }
    getSkinColorValue(index){
        return cy.get(`[${dataAttributeForLoop}=${index}]`).find(`[${dataAttribute}="skincolor-value"]`)
    }
    assertCharacherSearchResult(charachter, cardIndex, chainer){
        var {searchQuery, name, gender, birthYear, eyeColor, skinColor, description} = charachter
        this.getCharachterName(cardIndex).should(chainer,name)
        this.getGenderValue(cardIndex).should(chainer,gender)
        this.getBirthYearValue(cardIndex).should(chainer,birthYear)
        this.getEyeColorValue(cardIndex).should(chainer,eyeColor)
        this.getSkinColorValue(cardIndex).should(chainer,skinColor)
    }
}
export default CharacterSearchResultObject