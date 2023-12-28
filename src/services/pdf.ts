import { readFileSync } from 'fs'
import { join } from 'path'

import { jsPDF } from 'jspdf'
import { STORAGE_IMAGES, STORAGE_PDF } from '../config/constants'
import { checkDir, deleteImage } from '../utils/files'

type MakePDF = (filename: string, length: number) => void

const makePDF: MakePDF = (filename, length) => {
    console.time('makePDF')
    checkDir(STORAGE_PDF)
    const doc = new jsPDF('p', 'mm', 'A4')

    const pics = new Array(length).fill(null).map((_, i) => i)

    pics.map((pic, idx) => {
        const imagePath = join(
            STORAGE_IMAGES,
            `${filename.split('.')[0]}-${pic}.jpeg`
        )
        doc.addImage(base64Encode(imagePath), 'JPEG', 0, 0, 210, 300)
        idx >= 0 && idx !== pics.length - 1 && doc.addPage()
        deleteImage(imagePath)
    })
    doc.save(join(STORAGE_PDF, filename))
    console.timeEnd('makePDF')
}

type Base64Encode = (file: string) => string

const base64Encode: Base64Encode = (file) => {
    const bitmap = readFileSync(file)
    return Buffer.from(bitmap).toString('base64')
}

export { makePDF }
