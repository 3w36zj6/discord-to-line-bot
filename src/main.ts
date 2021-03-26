// Messaging APIのチャネルアクセストークン
var CHANNEL_ACCESS_TOKEN = "";

var GLITCH_URL = "";

// Glitchサーバーを起動させる
function wakeGlitch() {
    var json = {
        "type": "wake"
    };
    sendGlitch(GLITCH_URL, json);
}

function sendGlitch(uri, json) {
    var params: any = {
        "contentType": "application/json; charset=utf-8",
        "method": "post",
        "payload": json,
        "muteHttpExceptions": true
    };
    response = UrlFetchApp.fetch(uri, params);
}

/*
 * ボットイベント処理
 */
function doPost(e) {
    var events = JSON.parse(e.postData.contents).events;
    events.forEach(function (event) {
        if (event.type == "discord") {
            sendLineMessage(event);
        }
    });
}

/*
 * LINEBotへメッセージを送信処理
 */
function sendLineMessage(e) {
    // メッセージの内容(送信先と内容)
    var message = {
        "messages": [
            {
                "type": "text",
                "text": "#" + e.channel + "\n" + e.name + "より送信\n\n" + e.message
            }
        ]
    };
    // LINEにpostするメッセージデータ
    var replyData: any = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
        },
        "payload": JSON.stringify(message)
    };
    // LINEにデータを投げる
    var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", replyData);
    // LINEにステータスコード200を返す
    return response.getResponseCode();
}