import fs from 'fs'
import getData from '../parsing/formatData.js'

export default async function analyze(path){
    let oig = JSON.parse(fs.readFileSync('./analysis/oig.json')).data
    let comp = await getData(path,()=>{return true})
    
    oig.forEach(e=>{
        e.DOB = getDate(e.DOB)
        e.Name = e.Name.trim().toLowerCase()
    })
    comp.forEach(e=>{
        e.DOB = getDate(e.DOB)
        e.Name = e.Name.trim().toLowerCase()
    })    
    
}

export function getDate(input){
    
    let output = null
    if(input.includes('/')){
        //case for parsing user provided dates
        let args = input.split('/')
        let month = parseInt(args[0]) -1
        let day = parseInt(args[1])
        let year = parseInt(args[2])
        if(year<30){
            year+=2000
        }
        else{
            year+=1900
        }
        output= new Date(year,month,day)
        
    }
    else{
        //case for parsing OIG provided dates
        let year = parseInt(input.slice(0,4))
        let month = parseInt(input.slice(4,6))-1
        let day = parseInt(input.slice(6,8))
        output = new Date(year,month,day)
    }
    return output
}