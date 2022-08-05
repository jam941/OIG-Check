import getData from './formatData.js'
import fs from 'fs'

async function parse(path){
    let data = await getData(path,(e)=>{return e.FIRSTNAME})
    let reformatedResults = []
    data.forEach(person=>{
        reformatedResults.push({
            Name: person.LASTNAME + ','+ person.FIRSTNAME + ' ' + person.MIDNAME,
            DOB:person.DOB
        })
    })
    let saveObj = {data:reformatedResults}
    let stringy = JSON.stringify(saveObj)
    fs.writeFileSync('../analysis/oig.json',stringy)
}
parse('./UPDATED.csv')