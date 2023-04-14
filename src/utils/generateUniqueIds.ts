import { generateUniqueId } from './'

export function generateUniqueIds(numIds: number, urlPrefix: string): string[] {
    const uniqueIds: string[] = []
    for (let i: number = 0; i < numIds; i++) {
        const uniqueId: string = generateUniqueId(urlPrefix)
        uniqueIds.push(uniqueId)
    }
    return uniqueIds
}
