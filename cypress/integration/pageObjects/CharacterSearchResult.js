//This page class will expose custom css selector based on data attribute
const dataAttribute = "data-test"
class CharacterSearchResultObject{
    getCharachterName(){
        return cy.get(`[${dataAttribute}="character-name"]`)
    }
    getGenderLabel(){
        return cy.get(`[${dataAttribute}="gender-label"]`)
    }
    getGenderValue(){
        return cy.get(`[${dataAttribute}="gender-value"]`)
    }
    getBirthYearLabel(){
        return cy.get(`[${dataAttribute}="birthyear-label"]`)
    }
    getBirthYearValue(){
        return cy.get(`[${dataAttribute}="birthyear-value"]`)
    }
    getEyeColorLabel(){
        return cy.get(`[${dataAttribute}="eyecolor-label"]`)
    }
    getEyeColorValue(){
        return cy.get(`[${dataAttribute}="eyecolor-value"]`)
    }
    getSkinColorLabel(){
        return cy.get(`[${dataAttribute}="skincolor-label"]`)
    }
    getSkinColorValue(){
        return cy.get(`[${dataAttribute}="skincolor-value"]`)
    }
    assertCharacherSearchResult(charachter, chainer){
        var {searchQuery, name, gender, birthYear, eyeColor, skinColor, description} = charachter
        this.getCharachterName().should(chainer,name)
        this.getGenderValue().should(chainer,gender)
        this.getBirthYearValue().should(chainer,birthYear)
        this.getEyeColorValue().should(chainer,eyeColor)
        this.getSkinColorValue().should(chainer,skinColor)
    }
}
export default CharacterSearchResultObject