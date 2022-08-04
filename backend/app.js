import analyze from './analysis/analysisService.js'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
const app = express()
const port = 5000

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

app.post('/analysis', upload.single('file'), function (req, res) {
  console.log('Recieved a file for processing')
  const filePath =  req.file.path
  analyze(filePath)
  res.json({})
})

app.listen(port, () => {
  console.log(`Launched API at base url: http://localhost:${port}`)
})