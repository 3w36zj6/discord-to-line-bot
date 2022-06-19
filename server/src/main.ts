
const http = require("http")
const request = require("request")

http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    })
    response.end("Discord bot is active now.\n")
}).listen(3000)

const sendGAS = (msg) => {
    const params = {
        events: [{
            name: msg.author.username,
            channel: msg.channel.name,
            message: msg.content
        }]
    }

    const options = {
        uri: GAS_URL,
        headers: {
            "Content-type": "application/json"
        },
        json: params,
        followAllRedirects: true
    }

    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error)
            return
        }
    })
}

const discord = require("discord.js")
const client = new discord.Client({ intents: Object.values(discord.Intents.FLAGS) })

client.on("ready", (message) => {
    client.user.setPresence({
        activity: {
            name: "with discord.js"
        },
        status: "online"
    })
    console.log("bot is ready!")
})

client.on("messageCreate", (message) => {

    if (message.author.bot) {
        return
    }
    if (message.channel.type == "dm") {
        return
    }

    if (message.content.includes(process.env.TARGET_MESSAGE)) {
        sendGAS(message)
        return
    }
})

if (process.env.DISCORD_BOT_TOKEN == undefined) {
    console.log("please set ENV: DISCORD_BOT_TOKEN")
    process.exit(0)
}

const GAS_URL = process.env.GAS_URL
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

client.login(process.env.DISCORD_BOT_TOKEN)