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
        "name": "서포트서버",
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
        API: "https://archiver.me/api"
    }
}

export let Scope = ['guilds', 'guilds.join', 'email', 'identify']
// /api/v1/auth/discord/callback 이걸로 할려고 하는데
// 그 아카이브 어플게이션 초대할수 있나요? 지금 보냈어여
//콜백링크 어떤걸로 추가하면될까여?