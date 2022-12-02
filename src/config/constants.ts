import { join } from 'path'

import project from '../../package.json'

const PLATFORM = process.platform
const VERSION = project.version
const EXECUTEABLE_PATH =
    PLATFORM === 'linux'
        ? '/usr/bin/chromium-browser'
        : PLATFORM === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const USER_DATA = join('src', 'storage', 'data')
const STORAGE_IMAGES = join('src', 'storage', 'images')
const STORAGE_PDF = join('src', 'storage', 'pdf')

export { VERSION, EXECUTEABLE_PATH, USER_DATA, STORAGE_IMAGES, STORAGE_PDF }
