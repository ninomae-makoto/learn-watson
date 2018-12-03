
// 初期処理
window.addEventListener("load", function (params) {
    var context = this.document.getElementById("context")
    var answer = this.document.getElementById("answer")

    answer.value = JSON.parse(context.value).output.text[0]
    
})

// 質問の送信
function sendQuestion() {
    // post
    var url = window.location.origin + "/bot/";
    var question = document.getElementById("question")
    var context = document.getElementById("context")
    var data = "question=" + question.value + "&context=" + context.value
    post(url, data, function(res) {
        var result = JSON.parse(res)
        console.log(res);
        var answer = this.document.getElementById("answer")
        answer.value = result.output.text[0]
        context.value = JSON.stringify(result.context)
    })
}

// 通信処理
function post(url, data, onDone, onError) {
    if (onError === void 0) { onError = function (status, response) { }; }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    // xhr.setRequestHeader("X-XSRF-Token", (document.getElementById("csrfToken") as HTMLInputElement).value)
    xhr.setRequestHeader("Pragma", "no-cache");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
    xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
            case 0: // UNSENT. open() not called
                console.log("uninitialized!");
                break;
            case 1: // OPEND. send() not called
                console.log("loading...");
                break;
            case 2: // HEADERS_RECEIVED. send() called & headers recieved
                console.log("loaded.");
                break;
            case 3: // LOADING. downloading ...
                // console.log("interactive... ")
                break;
            case 4: // DONE. completed
                if (xhr.status === 200 || xhr.status === 304) {
                    onDone(xhr.response);
                }
                else {
                    console.log("Failed. HttpStatus: " + xhr.statusText);
                    if (onError) {
                        onError(xhr.statusText, xhr.responseText);
                    }
                }
                break;
            default:
                console.log("error nop default");
        }
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
};