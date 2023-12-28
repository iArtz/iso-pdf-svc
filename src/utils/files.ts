import { existsSync, mkdirSync, unlinkSync } from 'fs'
import { URL } from 'node:url'

const checkDir = (dir: string): void => {
    !existsSync(dir) && mkdirSync(dir)
}

const getFilename = (uri: string): string => {
    const currentURL = new URL(uri)
    const urlParams = new URLSearchParams(currentURL.search)
    const id = urlParams.get('mt_id')
    return `${id}.pdf`
}

const deleteImage = (path: string): void => {
    existsSync(path) && unlinkSync(path)
}

export { checkDir, getFilename, deleteImage }
