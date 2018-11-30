const express = require('express')
const app = express()
var cfenv = require("cfenv")

app.get('/', (req, res) => res.send('Hello Node.js!!'))
app.get('/test', (req, res) => res.send('Hello Test!!'))
app.get('/date', (req, res) => res.send(new Date()))
//app.use("/day", require("./routes/api"))
//app.listen(3000, () => console.log('Example app listening on port 3000!'))

var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function () {
    // print a message when the server starts listening
    console.log("server starting on %o", appEnv.url);
});
