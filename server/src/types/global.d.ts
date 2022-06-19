declare namespace NodeJS {
    interface ProcessEnv {
        readonly GAS_URL: string
        readonly DISCORD_BOT_TOKEN: string
        readonly TARGET_MESSAGE: string
    }
}