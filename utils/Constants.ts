export let NavBarList = [
    {
        "name": "홈",
        "href": "/"
    },
    {
        "name": "서버 리스트",
        "href": "/servers"
    },
    {
        "name": "봇 리스트",
        "href": "/bots"
    },
    {
        "name": "디스코드",
        "href": "/support"
    },
    {
        "name": "개발자",
        "href": "/developers"
    }
]
export let EndPoints = {
    Discord: {
        API: 'https://discord.com/api',
        CDN: 'https://cdn.discordapp.com',
    },
    Archive: {
        API: process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://api.archiver.me/"
    }
}

export let Keys = {
    Captcha: {
        CLIENT: "b9427100-570d-4e8a-9256-588bbbf88c60"
    }
}