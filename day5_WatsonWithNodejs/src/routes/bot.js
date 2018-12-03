var express = require('express');
var router = express.Router();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

/* GET users listing. */
router.get('/', function (req, res, next) {
  callAssistant("", null, function(result) {
    res.render('bot', { title: 'Assistant', context: result });
  })
});

router.post('/', function (req, res, next) {

    // username, password, workspace_id 書き換え 実際はソースに直書きせず別途管理しないといけない

    // 入力された質問 改行、タブ文字のエスケープ
    var question = req.body.question.replace(/[\t\r\n]/g, " ")
    var context = JSON.parse(req.body.context)

    console.log( "question: " + question);
    console.log( "context: " + context);

    callAssistant(question, context, function(result) {
        res.send(result);
    })

});

function callAssistant(question, context, onDone) {
    
    var assistant = new AssistantV1({
        username: '6dc420bb-2ae1-411b-83f2-3f62dabfcf4b',
        password: 'xxxxxxxxxxx',
        url: 'https://gateway.watsonplatform.net/assistant/api/',
        version: '2018-02-16'
        });
    
        assistant.message(
            {
                input: { text: question },
                workspace_id: 'dd3e7ea4-8845-458b-8080-7e703e8a13f8',
                context: context
            },
            function(err, response) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(JSON.stringify(response, null, 2));
                    onDone(response)
                }
            }
        );
}

module.exports = router;
