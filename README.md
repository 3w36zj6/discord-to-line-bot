# discord-to-line-bot

# Deploy
1. `./src/main.ts`にLINEのMessaging APIのチャネルアクセストークンを記述
2. `./.clasp.json`に`"rootDir": "./src"`を追加
3. `clasp push`で`./src/`内のファイルをGASにデプロイ
4. `./glitch/.env`にDiscordのBotのトークンとGASのURLを記述
5. `./glitch/`内のファイルをGlitchにデプロイ