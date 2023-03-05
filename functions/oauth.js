const fetch = require('axios');
const { client_id, client_secret, redirect_uri } = require('../config.json');

async function getToken(code) {

    try {
        param = new URLSearchParams({
                client_id: client_id,
                client_secret: client_secret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirect_uri,
                scope: 'identify',
            }).toString();
        const oauthResult = await fetch.post('https://discord.com/api/oauth2/token', param,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded','Content-Length':param.length,
            },
        });
        const oauthData = oauthResult.data;
        return oauthData;

    } catch (error) {

        console.log(error);
        return error;
    }

}

async function refresh_token(refresh_token) {
    const refreshResult = await fetch.post('https://discord.com/api/oauth2/token',new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'refresh_token',
            refresh_token,
            redirect_uri: redirect_uri,
            scope: 'identify',
        }).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const refreshed_token = await refreshResult.data;
    return refreshed_token;
}

async function getUser(access_token) {
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    const userData = userResult.data;
    return userData;
    
}
    

module.exports = {
    getToken,
    refresh_token,
    getUser
};
