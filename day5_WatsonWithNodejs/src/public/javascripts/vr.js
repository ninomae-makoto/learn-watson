

/**
 * 画像認識
 */
function vr() {

    var attachment = document.getElementById("imageFile")

    if (attachment.files && attachment.files.length > 0) {
        var file = attachment.files[0]
        var url = window.location.origin + "/vr/";
        fileUpload(url, file, function (result) {
            // 通信後処理
            console.log(result);
            var data = JSON.parse(result)
            var resultField = document.getElementById("result")
            resultField.value = 
                "アップロードされた画像は " + data.images[0].classifiers[0].classes[0].class + "です。\n\n" +
                JSON.stringify(JSON.parse(result), null, "  ")
        })
    }

}


/**
 * ファイルをアップロードする
 * @param {*} url 
 * @param {*} file File
 * @param {*} onDone 成功時処理
 * @param {*} onError 失敗時処理
 */
function fileUpload(url, file, onDone, onError) {
    if (onError === void 0) { onError = function (status, response) { }; }

    const reader = new FileReader()
    reader.onloadend = () => {
        const formData = new FormData()
        const imgBlob = new Blob([reader.result], { type: file.type })
        formData.append("thumbnail", imgBlob, file.name)

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
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
        xhr.send(formData);
    }
    reader.readAsArrayBuffer(file)
};