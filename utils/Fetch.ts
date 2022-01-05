import { User } from "@types"
import { User as UserDB } from "@utils/Mongodb"

export async function getUserData(token: string, isPrivate = false): Promise<User|null> {
  let user: User = await UserDB.findOne({ acces_token: token })
  if(isPrivate) {
    return user
  } else {
    return;
  }
}