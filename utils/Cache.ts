import LRU from "lru-cache"

let DiscordUsercacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 60
}

export const DiscordUserCache = new LRU(DiscordUsercacheOptions)