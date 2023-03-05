const fetch = require('axios');
const { client_id, client_secret, redirect_uri } = require('../config.json');

async function getToken(code) {

    try {
        const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: client_id,
                client_secret: client_secret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: redirect_uri,
                scope: 'identify',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const oauthData = await oauthResult.json();
        return oauthData;

    } catch (error) {

        console.log(error);
        return error;
    }

}

async function refresh_token(refresh_token) {
    const refreshResult = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'refresh_token',
            refresh_token,
            scope: 'identify',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const refreshed_token = await refreshResult.json();
    return refreshed_token;
}

async function getUser(access_token) {
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    const userData = await userResult.json();
    return userData;
    
}
    

module.exports = {
    getToken,
    refresh_token,
    getUser
};