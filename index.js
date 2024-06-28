var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}` )
  },
})

const upload = multer({ storage })

app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file 

  return res.json({
    name: originalname,
    type: mimetype,
    size
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
