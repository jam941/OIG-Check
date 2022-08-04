import fs from 'fs'
import getData from '../OigData/formatData.js'
export default async function analyze(path){
    let oig = await getData('./OigData/UPDATED.csv',(value)=>{return value.FIRSTNAME})
    let comp = await getData(path,()=>{return true})
    console.log(comp)
}