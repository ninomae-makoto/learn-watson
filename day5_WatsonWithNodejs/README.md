# Node.jsからWatson APIを使用する

## Text To Spetchを使用する

## Visual Recognition

### 資格情報を取得する
ダッシュボード → カタログからVisual Recognitionを追加

![資格情報](cap/3.PNG)

### コマンドから確認

windowsの場合 git on bash から確認可能

```
curl -X POST -u "apikey:p-xxxxxxxxxxxxxxxxxxxxxxxx" --form "images_file=@apple.png" "https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19"
```

### ソースの確認

'''
npm start
'''

http://localhost:3000/vr
へアクセス

#### オプション

- accept_language
言語
- threshold
閾値  
低いほどよりたくさんの画像を判定するが誤判定率が上がる


プロダクトに組み込む場合接続情報は環境変数などを利用する。

作り込めばカスタム学習した画像認識APIを利用して
スマートフォンのカメラから撮影した画像を判定する
といった活用が可能

## AssistantをNodeRedからNode.jsから移行してみる


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

## Node.jsについて詳しくなる

## Expressについて詳しくなる

## フロントエンドフレームワークを使用してみる
Vue.js
React

## その他
Webpack
TypeScript
Single Page Application
CI/CD
etc...
