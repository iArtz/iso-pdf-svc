'use strict'
import { join } from 'path'
import { URL } from 'node:url'
import puppeteer, { Browser, Page } from 'puppeteer'
import { checkDir, getFilename } from '../utils/files'
import {
    EXECUTEABLE_PATH,
    STORAGE_IMAGES,
    USER_DATA,
} from '../config/constants'

type Cookie = {
    name: string
    value: string
    domain: string
}

type returnBrowser = Promise<{ browser: Browser; page: Page }>

type InitFunction = (
    url: string,
    headless: boolean,
    cookies: Cookie[]
) => returnBrowser

const init: InitFunction = async (url, headless = true, cookies) => {
    const initialConfig = {
        headless: headless,
        executablePath: EXECUTEABLE_PATH,
        userDataDir: USER_DATA,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--ignore-certificate-errors',
        ],
    }

    try {
        const browser = await puppeteer.launch(initialConfig)
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(0)
        await page.setCookie(...cookies)
        // Configure the navigation timeout
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })
        // Get scroll height of the rendered page and set viewport
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
        await page.setViewport({
            width: bodyWidth,
            height: bodyHeight,
            deviceScaleFactor: 2,
        })
        return { browser, page }
    } catch (err) {
        console.error(err)
        throw new Error('initial browser failure')
    }
}

const images = async (id: string, link: string, cookie: string) => {
    const domain = link.split(/\//)[2]
    const [name, value] = cookie.split('=')
    const cookies = [
        {
            name,
            value,
            domain,
        },
    ]

    const { browser, page } = await init(link, true, cookies)

    const dir = STORAGE_IMAGES
    checkDir(dir)
    const elements = await page.$$('page')

    for (let i = 0; i < elements.length; i++) {
        try {
            // get screenshot of a particular element
            await elements[i].screenshot({
                path: join(dir, `${id}-${i}.jpeg`),
                quality: 100,
                type: 'jpeg',
            })
        } catch (e) {
            // if element is 'not visible', spit out error and continue
            console.error(
                `couldnt take screenshot of element with index: ${i}. cause: `,
                e
            )
        }
    }
    await browser.close()
    const filename = getFilename(link)
    const { length } = elements
    console.log(length, filename)
    return { filename, length }
}

export { images }
