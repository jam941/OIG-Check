import csv from'csv-parser'
import fs from'fs'



export default async function getData(){
return new Promise((resolve)=>{
    const results = [];
    let file = fs.createReadStream('../OigData/UPDATED.csv').pipe(csv())
    file.on('data', (data) => {
          
          if(data.FIRSTNAME){
              results.push(data)
          }
      })
    
    return file.on('end', () => {
      resolve(results)
    }); 
    
  })
}  
    


