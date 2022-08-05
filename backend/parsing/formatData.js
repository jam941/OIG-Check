
import csv from 'csv-parser'
import fs from 'fs'
import process from 'process'

export default async function getData(path,verify){
  console.log(process.cwd())
  return new Promise((resolve)=>{
  
    const results = [];
    let file = fs.createReadStream(path).pipe(csv())
    file.on('data', (data) => {
          
      if(verify(data)){
        results.push(data)
      }
          
      })
    
    return file.on('end', () => {
      resolve(results)
    }); 
    
  })
}  
    


