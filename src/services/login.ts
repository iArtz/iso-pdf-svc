import { init } from './scrape'

const login = async (link: string) => {
    //@ts-expect-error: any type
    const { browser, page } = await init(link)
    // Enter credentials and submit the form
    //@ts-expect-error: any type
    await page.type('input[name="username"]', process.env.USERNAME)
    //@ts-expect-error: any type
    await page.type('input[name="password"]', process.env.PASSWORD)
    await page.select('#branch_login', 'RY')
    await page.click('button') // Replace with the actual login button selectorS
    // Wait for navigation after login
    await page.waitForNavigation()
    // Get cookies after login
    const cookies = await page.cookies()
    // Close the browser
    await browser.close()
    // Return the cookies or use them as needed
    return cookies
}

export { login }
