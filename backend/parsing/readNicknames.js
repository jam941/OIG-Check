import getData from './formatData.js'
import fs from 'fs'

async function parse(path){
    let data = await getData(path,(e)=>{return true})
    let saveObj = {data:data}
    let stringy = JSON.stringify(saveObj)
    fs.writeFileSync('../analysis/nicknames.json',stringy)
}
parse('./nicknames.csv')