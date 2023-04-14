import * as fs from 'fs'
import * as path from 'path'
import * as qrcode from 'qrcode'

interface QRCode {
    id: string
    data: string
}

async function generateQRCode(qrCode: QRCode, outputDirectory: string): Promise<void> {
    const fileName: string = `${qrCode.id}.png`
    const filePath: string = path.join(outputDirectory, fileName)

    await qrcode.toFile(filePath, qrCode.data, {
        type: 'png',
        errorCorrectionLevel: 'L',
        margin: 1
    })
}

async function readQRCodeData(inputFilePath: string): Promise<QRCode[]> {
    return new Promise<QRCode[]>((resolve, reject) => {
        const qrCodes: QRCode[] = []

        fs.createReadStream(inputFilePath)
            .on('data', (chunk: Buffer) => {
                const data: string = chunk.toString()
                const lines: string[] = data.split('\n')

                for (let i = 1; i < lines.length; i++) {
                    const line: string = lines[i].trim()

                    if (line) {
                        const id: string = line.substring(line.lastIndexOf('/') + 1)
                        const qrCode: QRCode = { id: id, data: line }
                        qrCodes.push(qrCode)
                    }
                }
            })
            .on('end', () => {
                resolve(qrCodes)
            })
            .on('error', (error: Error) => {
                reject(error)
            })
    })
}

export async function generateQRCodeBatch(inputFilePath: string): Promise<void> {
    const outputDirectory = `images/${inputFilePath
        .substring(inputFilePath.lastIndexOf('/') + 1)
        .replace('.csv', '')}`

    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory)
    }

    const qrCodes: QRCode[] = await readQRCodeData(inputFilePath)
    await Promise.all(qrCodes.map((qrCode) => generateQRCode(qrCode, outputDirectory)))
    console.log(`QR Images written to ${outputDirectory}`)
}
