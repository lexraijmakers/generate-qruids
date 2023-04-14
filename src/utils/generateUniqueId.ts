import * as crypto from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'

export function generateUniqueId(urlPrefix: string): string {
    const uuid: string = uuidv4() // generate a UUID
    const timestamp: string = Date.now().toString() // get current timestamp
    const random: string = Math.random().toString() // generate a random number
    const hash: crypto.lib.WordArray = crypto.SHA256(uuid + timestamp + random) // create a SHA-256 hash object
    const uniqueId: string = hash.toString() // generate the hash in hexadecimal format

    return `${urlPrefix}${uniqueId}`
}
