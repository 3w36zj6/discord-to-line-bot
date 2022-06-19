# discord-to-line-bot
Discordサーバー内の特定のメッセージをLINEに転送するBot

## Deploy

### Google Apps Script

POSTされたメッセージをLINEに送信する

1. `./gas/.clasp.json`に`"rootDir": "./src"`と`"scriptId"`を追加
2. `clasp push`で`./gas/src/`以下をGASにpush
3. script.google.comでスクリプト プロパティにLINEのMessaging APIのチャネルアクセストークンを`CHANNEL_ACCESS_TOKEN`、Serverのデプロイ先URLを`SERVER_URL`として追加
4. 初回はscript.google.com上でデプロイ
5. 2回目以降は`clasp deployments`でDeploy IDを確認し`clasp deploy -i <Deploy ID>`でデプロイを更新

### Server

Discordサーバーを監視して特定のメッセージをPOSTする

1. `./server/.env`にDiscordのBotのトークンとGASのURLと反応させたいメッセージを記述
2. `./server/`以下をどこかにデプロイ