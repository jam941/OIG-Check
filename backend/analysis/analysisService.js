import fs from 'fs'
import getData from '../parsing/formatData.js'
import compareNames from 'compare-names'

export default async function analyze(path){
    let nicknames = JSON.parse(fs.readFileSync('./analysis/nicknames.json')).data
    let oig = JSON.parse(fs.readFileSync('./analysis/oig.json')).data
    let comp = await getData(path,()=>{return true})
    
    oig.forEach(e=>{
        e.DOB = getDate(e.DOB)
        e.First = e.First.trim().toLowerCase().replace(/\W/g, '')
        e.Last = e.Last.trim().toLowerCase().replace(/\W/g, '')
    })
    comp.forEach(e=>{
        e.DOB = getDate(e.DOB)
        let names = e.Name.trim().toLowerCase().split(' ')
        e.Last = names[0].replace(/\W/g, '')
        e.First = names[0].replace(/\W/g, '')
         
    })
    let matches = []
    comp.forEach((employee)=>{
        oig.forEach((person)=>{
            if(test(employee,person,5,nicknames))
                matches.push({
                    employee:employee,
                    oig:person
                })
            })
            })
           
    console.log(matches[0])
}

function test(p1,p2,limit,nicknames){
    return checkFirst(p1,p2,nicknames) || checkLast(p1,p2,limit) || checkDOB(p1,p2)
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

function checkDOB(personA,personB){
    return personA.DOB.getTime() === personB.DOB.getTime()
        
}
function checkLast(lastA,lastB,limit){
    if(lastA == lastB){
        return true
    }
    let len = Math.min([lastA.length,lastB.length,limit])
    for(let i =0; i<len; i++){
        if(lastA.charAt(i) != lastB.charAt(i)){
            return false
        }
    }
    return true
}



function checkFirst(firstA,firstB, nicknames){
    if(firstA==firstB){
        return true
    }
    //TODO: repalce with directory of nicknames
    nicknames.forEach(e=>{
        let tempName = e.name.toLowerCase()
        let tempNickname = e.nickname.toLowerCase()
        if(firstA==tempName){
            if(firstB == tempNickname){
                return true
            }
        }
        if(firstA == tempNickname){
            if(firstA == tempName){
                return true
            }
        }
    })
    return false
}
