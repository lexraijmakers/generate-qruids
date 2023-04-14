import { writeUniqueIdsToCsv } from './utils'

const numIds: number = Number(process.argv[2])
const urlPrefix: string = process.argv[3]
const outputFilePath: string = `output/qruids-${Date.now().toString()}.csv`

writeUniqueIdsToCsv(numIds, outputFilePath, urlPrefix)
    .then(() => console.log(`Unique IDs written to ${outputFilePath}`))
    .catch((error: Error) => console.error(error))
