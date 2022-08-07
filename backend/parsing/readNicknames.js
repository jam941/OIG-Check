import getData from './formatData.js'
import fs from 'fs'

async function parse(path){
    let data = await getData(path,(e)=>{return true})
    let cache = {}
    data.forEach(e => {
        if(Object.keys(cache).includes(e.name.toLowerCase())){
            cache[e.name.trim().toLowerCase()].push(e.nickname.trim().toLowerCase())
        }
        else{
            cache[e.name.trim().toLowerCase()] = [e.nickname.trim().toLowerCase(),e.name.trim().toLowerCase()]
        }
    });
    console.log(cache)
    let saveObj = cache
    let stringy = JSON.stringify(saveObj)
    fs.writeFileSync('../analysis/nicknames.json',stringy)
}
parse('./nicknames.csv')