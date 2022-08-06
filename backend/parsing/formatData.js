
import csv from 'csv-parser'
import fs from 'fs'
import process from 'process'

function removeWhitespace(obj){
  Object.keys(obj).forEach(e=>{
    var trimmed = e.trim()
    if(e != trimmed){
      obj[trimmed] = obj[e]
      delete obj[e]
    }
  })
  return obj
}

export default async function getData(path,verify){
  console.log(process.cwd())
  return new Promise((resolve)=>{
  
    const results = [];
    let file = fs.createReadStream(path).pipe(csv())
    file.on('data', (data) => {
          
      if(verify(data)){
        results.push(removeWhitespace(data))
      }
          
      })
    
    return file.on('end', () => {
      resolve(results)
    }); 
    
  })
}  
    


