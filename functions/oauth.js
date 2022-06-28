const DiscordOauth2 = require('discord-oauth2');
const oauth = new DiscordOauth2();
const config = require('../config.json');


async function getToken(code) {
    let token = "undefined";

    oauth.tokenRequest({
        clientId: config.client_id,
        clientSecret: config.client_secret,
    
        code: code,
        scope: "identify guilds",
        grantType: "authorization_code",
    
        redirectUri: config.redirect_uri,
    }).then(console.log)
    return token;
}


async function getUser(token) {
    const user = oauth.getUser(token).then(console.log);
    return user;
}


module.exports = {
    getToken,
    getUser
}