
const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("CHANNEL_ACCESS_TOKEN")

const SERVER_URL = PropertiesService.getScriptProperties().getProperty("SERVER_URL")


const wakeServer = (): number => {
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "contentType": "application/json; charset=utf-8",
        "method": "get",
        "muteHttpExceptions": true
    }
    const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(SERVER_URL, params)

    return response.getResponseCode()
}

const doPost = (e) => {
    const events = JSON.parse(e.postData.contents).events
    for (const event of events) {
        sendLineMessage(event)
    }
}

const sendLineMessage = (e): number => {
    const message = {
        "messages": [
            {
                "type": "text",
                "text": `#${e.channel}\n${e.name}より送信\n\n${e.message}`
            }
        ]
    }
    const replyData: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
        },
        "payload": JSON.stringify(message)
    }

    const response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", replyData)

    return response.getResponseCode()
}