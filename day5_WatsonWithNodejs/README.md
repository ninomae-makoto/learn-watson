# Node.jsからWatson APIを使用する

## Visual Recognition
ダッシュボード → カタログからVisual Recognitionを追加

### 資格情報を取得する

![資格情報](cap/3.PNG)

### コマンドから確認

以下のコマンド  
windowsの場合 git on bash から確認可能(ダウンロードした画像のあるディレクトリ上で右クリック → git on bash)  
apikey,ファイル名は置き換える

```
curl -X POST -u "apikey:p-9OY_llWlSXVZ8GRUXPy4AOjv65TWoP_5u5FV11pD7t" --form "images_file=@apple.png" "https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19"
```

### サンプルの実行確認

route/vr.js
の31行目接続情報を書き換える。  
実運用ではprocess.env.VCAP_SERVICES などを利用する。
サンプルコードについてプロダクトに組み込む場合接続情報は環境変数などを利用する。

依存関係の解決

```
npm install
```

ローカルサーバの起動

```
npm start
```

http://localhost:3000/vr
へアクセス

#### オプション

- accept_language
戻り値(分類名)の言語
- threshold
閾値
低いと誤判定率が上がる
高いと認識率が下がる

作り込めばカスタム学習した画像認識APIを利用して
スマートフォンのカメラから撮影した画像を判定する
といった活用が可能

## AssistantをNodeRedからNode.jsから移行してみる

route/bot.js
の接続情報を書き換える  

ローカルサーバを再起動して
http://localhost:3000/bot
へアクセス

バージョンが異なる場合一部書き換えが必要？
https://console.bluemix.net/apidocs/assistant-v2

iam_apikeyを使用する。

```
    var assistant = new watson.AssistantV1({
        iam_apikey: '{apikey}',
        version: '2018-09-20'
    });
```

## Text to Speech をドキュメントを参照しながら実装する

https://console.bluemix.net/apidocs/text-to-speech
からWebAPIの機能ととサンプルコードが参照できる。

```
node .\day5_WatsonWithNodejs\tts.js
```

# 参考情報

## Watson APIs
ダッシュボード → 資料から参照できるがたまに動いていないときがある
https://console.bluemix.net/docs/home/alldocs

### 各種apiの呼び出し方法
https://console.bluemix.net/apidocs

### Sample Code
https://github.com/watson-developer-cloud/

https://developer.ibm.com/jp/

# 次にやること

## Web周りについて詳しくなる
- [MDN](https://developer.mozilla.org)
- [MDN-JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- [w3cschools](https://www.w3schools.com/)

## Node.jsについて詳しくなる
- [NodeJS](https://nodejs.org/ja/docs/)

## Expressについて詳しくなる
Webフレームワーク
- [Express](https://expressjs.com/ja/)

## フロントエンドフレームワークを使用してみる
- [Vue.js](https://jp.vuejs.org/v2/guide/index.html)
- [React](https://reactjs.org/)

## その他
Webpack  
TypeScript  
Single Page Application  
CI/CD  
Docker  
kubernetes  
サーバレスアーキテクチャ  
マイクロサービスアーキテクチャ  
etc...
