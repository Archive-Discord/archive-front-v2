import { BotCache as BotInterface, DiscordUser, Guild } from "@types"
import LRU from "lru-cache"

let DiscordUsercacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 60
}

let BotDataCacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 10
}

let ServerDataCacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 10
}

export const DiscordUserCache: LRU<string, DiscordUser> = new LRU(DiscordUsercacheOptions)
export const BotCache: LRU<string, BotInterface> = new LRU(BotDataCacheOptions)
export const ServerCache: LRU<string, Guild> = new LRU(ServerDataCacheOptions)