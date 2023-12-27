import { join } from 'path'

interface Payload {
    cookie: string
    link: string
    id: string
}
declare global {
    interface Global {
        payload: Payload
        STORAGE: string
    }
}
jest.setTimeout(1 * (60 * 1000))
// Save the original console log time
//@ts-expect-error: any type
global.consoleLog = global.console.log
//@ts-expect-error: any type
global.consoleTime = global.console.time
//@ts-expect-error: any type
global.consoleTimeEnd = global.console.timeEnd
// Disable console time methods
global.console.log = jest.fn()
global.console.time = jest.fn()
global.console.timeEnd = jest.fn()
//@ts-expect-error: any type
global.payload = {
    cookie: 'PHPSESSID=aa97921224e226fb779e60012281d2ee',
    link: 'https://localhost/inspec/dashboard/1_3Phase/pdf.php?mt=RY2-230901-0022&mt_id=RY2-230901-0022&type=preview',
    id: 'RY2-230901-0022',
}

//@ts-expect-error: any type
global.STORAGE = join(process.cwd(), 'src', 'storage')
