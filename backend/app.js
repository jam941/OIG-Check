const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')

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
  console.log(req.file.path)
  res.json({})
})

app.listen(port, () => {
  console.log(`Launched API at base url: http://localhost:${port}`)
})