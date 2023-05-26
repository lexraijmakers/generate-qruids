import { writeUniqueIdsToCsv } from './utils'
import { generateQRCodeBatch } from './utils/generateQRCode'

const numIds: number = Number(process.argv[2])
const urlPrefix: string = process.argv[3]
const outputFilePath: string = `output/qruids-${Date.now().toString()}.csv`

writeUniqueIdsToCsv(numIds, outputFilePath, urlPrefix)
    .then(() => console.log(`Unique IDs written to ${outputFilePath}`))
    .then(() =>
        process.argv[4] === 'Y' ||
        process.argv[4] === 'y' ||
        process.argv[4] === 'yes' ||
        process.argv[4] === 'Yes'
            ? generateQRCodeBatch(outputFilePath).catch((error: Error) => console.error(error))
            : null
    )
    .catch((error: Error) => console.error(error))
