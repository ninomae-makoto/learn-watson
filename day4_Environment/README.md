# 開発環境の構築

## Visual Studio Codeのインストール
エディタ
https://code.visualstudio.com/

チェック等は不要

### Visual Studio Codeに Japanese Language Packを導入する

Ctrl + Shift + X → "japan"と入力  
Japanese Language Pack をインストール(緑のInstallクリック)

## gitのインストール
バージョン管理ツール  
https://git-scm.com/

インストール後再起動、インストール確認（後でまとめて再起動＆確認してもいい）  
Windowsキー → "cmd"と入力 → エンター

```
git --version
```

## Node.jsのインストール
サーバサイドJavaScript 
https://nodejs.org/ja/ 
LTSを推奨   
8.x以降ならだいたい動作する。  
途中のチェックボックスは入れると時間がかかるので不要。

インストール後再起動、インストール確認（後でまとめて再起動＆確認してもいい）

```
node -v
```


## Bluemix CLI のインストール

Bluemix(Paas上)へソースコードをプッシュするときに利用する。

### Cloud Foundry CLI インストール
https://github.com/cloudfoundry/cli#downloads

Windowsなら64bit * Installer  
https://packages.cloudfoundry.org/stable?release=windows64&source=github

インストール後再起動、インストール確認（後でまとめて再起動＆確認してもいい）

```
cf -v
```

### BluemixCLI インストール
※ 時間がかかるので以下は不要

Cloud Foundry CLI をBluemix用に拡張したツール。  
インストールしなくても問題ない。  
~~https://console.bluemix.net/docs/cli/index.html#overview~~

~~Windowsキー → "powershell"と入力 → powershellを右クリックして管理者として実行~~


```
Set-ExecutionPolicy Unrestricted; iex(New-Object Net.WebClient).DownloadString('http://ibm.biz/idt-win-installer')
```


## リポジトリからgit clone

プロジェクトを作成したいフォルダで右クリック → Git Bash here

```
git clone https://github.com/ninomae-makoto/learn-watson.git
```

## Visual Studio Codeでcloneしてきたディレクトリを開く
ファイル → フォルダを開く からクローンしてきた learn-watsonを選択

## サンプルコードを実行する

Ctrl + @
ターミナルタブで以下のコマンド

依存関係の解決

```
npm i
```

ローカルサーバの起動

```
node .\day4_Environment\src\app.js
```

http://localhost:3000  
へアクセス