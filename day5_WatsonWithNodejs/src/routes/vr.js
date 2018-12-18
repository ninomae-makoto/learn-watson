var express = require('express');
var router = express.Router();
var multer = require('multer');

const upload = multer({ dest: "./uploads/" }).single("thumbnail")

/* GET users listing. */
router.get('/', function (req, res, next) {
  // views/vr.pug の情報を元にHTMLに変換してレンダリング
  res.render('vr', { title: 'Visual Recognition' });
});

/**
 * 画像認識処理
 * 画像を受け取って watson APIに投げる
 * 受け取った値を返す
 */
router.post('/', function (req, res, next) {
  upload(req, res, (err) => {
    // 画像ファイル
    var file = req.file
    var uploadFile = (`uploads/${file.filename}`)
    if (err) {
      res.send("Failed to write " + file.destination + " with " + err)
    } else {

      var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
      var fs = require('fs');

      // ここにapikeyを追加 実際はソースに直書きせず別で管理しないといけない
      var apikey = "p-9OY_llWlSXVZ8GRUXPy4AOjv65TWoP_5u5FV11pD7t"
      var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: apikey
      });

      // パラメータ 画像、オーナー、閾値
      var images_file = fs.createReadStream(uploadFile);
      var owners = ["IBM"];
      var threshold = 0.6;

      var params = {
        images_file: images_file,
        owners: owners,
        threshold: threshold,
        accept_language: "ja"
      };

      // 画像認識APIコール
      visualRecognition.classify(params, function (err, response) {
        fs.unlink(uploadFile, (err) => {
          console.log(err)
        })
        if (err) {
          console.log(err);
          res.send(err)
        } else {
          console.log(JSON.stringify(response, null, 2))
          // 画像の色を判定する
          // response.images[0].classifiers[0].classes.forEach(element => {
          //   if (element.class.indexOf("色") !== -1 ) {
          //     res.send(element)
          //   }
          // });
          res.send(response)
        }
      });
    }
  })
});

module.exports = router;
