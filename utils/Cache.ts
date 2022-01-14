import LRU from "lru-cache"

let DiscordUsercacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 60
}

let BotDataCacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 10
}

export const DiscordUserCache = new LRU(DiscordUsercacheOptions)
export const BotCache = new LRU(BotDataCacheOptions)