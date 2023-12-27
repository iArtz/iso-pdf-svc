import { images } from '../scrape'

describe('Scrape Test', () => {
    it('Create images from payload', async () => {
        // @ts-expect-error: any type
        const { cookie, link, id } = global.payload
        const { filename, length } = await images(id, link, cookie)
        expect(filename).toEqual('RY2-230901-0022.pdf')
        expect(length).toEqual(9)
    })
})
