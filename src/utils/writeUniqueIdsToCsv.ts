import ObjectsToCsv from 'objects-to-csv'
import { generateUniqueIds } from './'

export async function writeUniqueIdsToCsv(
    numIds: number,
    outputFilePath: string,
    urlPrefix: string
): Promise<void> {
    const uniqueIds: string[] = generateUniqueIds(numIds, urlPrefix)
    const uniqueIdObjects: { id: string }[] = uniqueIds.map((id: string) => ({
        id: id
    }))
    const csv: ObjectsToCsv = new ObjectsToCsv(uniqueIdObjects)
    await csv.toDisk(outputFilePath)
}
