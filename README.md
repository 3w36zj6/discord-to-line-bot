# discord-to-line-bot

# Deploy
1. `./src/main.ts`にLINEのMessaging APIのチャネルアクセストークンを記述
2. `clasp push`で`./src/`内のファイルをGASにデプロイ
3. `./glitch/.env`にDiscordのBotのトークンとGASのURLを記述
4. `./glitch/`内のファイルをGlitchにデプロイ