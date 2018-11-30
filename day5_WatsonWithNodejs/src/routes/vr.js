var express = require('express');
var router = express.Router();
var multer = require('multer');

const upload = multer({ dest: "./uploads/" }).single("thumbnail")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('vr', { title: 'Visual Recognition' });
});

router.post('/', function (req, res, next) {
  upload(req, res, (err) => {
    var file = req.file
    var uploadFile = (`uploads/${file.filename}`)
    if (err) {
      res.send("Failed to write " + file.destination + " with " + err)
    } else {

      var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
      var fs = require('fs');

      // ここにapikeyを追加
      var apikey = ""
      var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: apikey
      });

      var images_file = fs.createReadStream(uploadFile);
      var owners = ["IBM"];
      var threshold = 0.6;

      var params = {
        images_file: images_file,
        owners: owners,
        threshold: threshold,
        accept_language: "ja"
      };

      visualRecognition.classify(params, function (err, response) {
        fs.unlink(uploadFile, (err) => {
          console.log(err)
        })
        if (err) {
          console.log(err);
          res.send(err)
        } else {
          console.log(JSON.stringify(response, null, 2))
          res.send(response)
        }
      });
    }
  })
});

module.exports = router;
