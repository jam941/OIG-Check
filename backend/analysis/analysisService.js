import fs from 'fs'
import getData from '../parsing/formatData.js'
export default async function analyze(path){
    let oig = JSON.parse(fs.readFileSync('./analysis/oig.json')).data
    let comp = await getData(path,()=>{return true})
    console.log(comp[0])
    console.log(oig[0])
    
}