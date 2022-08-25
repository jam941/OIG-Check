import analyze from './analysis/analysisService.js'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import hash from 'object-hash'
import { flushSync } from 'react-dom'
import fs from 'fs'
const app = express()
const port = 5000
const temp_dir = './finished'

function getHash(str){
  return hash(str)
}

function waitForFile(key){
  let dir =  temp_dir+'/'+key+'.json'
  return new Promise(function(resolve,reject){
    fs.access(dir, fs.constants.R_OK,function(err){
      if(!err){
        resolve(dir)
      }
      else{
        reject(err)
      }
    })
  })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'companyData/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/analysis', upload.single('file'), async function (req, res) {
  console.log('Recieved a file for processing')
  const filePath =  req.file.path

  let saveLabel = getHash(filePath)
  res.send({key:saveLabel})

  let resObj = await analyze(filePath)
  console.log('The CWD from this perspective is: ', process.cwd())
  saveLabel = temp_dir+ '/'+saveLabel;
  let stringy = JSON.stringify(resObj)
  fs.writeFileSync(saveLabel+'.json',stringy)
})

app.get('/getFile/:key',async function (req,res){
  let key = req.params.key
  key = await waitForFile(key)
  let data =  JSON.parse(fs.readFileSync(key))
  res.send(data)
})

app.listen(port, () => {
  console.log(`Launched API at base url: http://localhost:${port}`)
})