import { access } from 'fs'
import { join } from 'path'
import { makePDF } from '../pdf'
import { images } from '../scrape'

describe('PDF Test', () => {
    it('Create PDF', async () => {
        // Create images for test make PDF
        // @ts-expect-error: any type
        const { cookie, link, id } = global.payload
        const { filename } = await images(id, link, cookie)

        makePDF(filename, 9)
        // @ts-expect-error: any type
        access(join(global.STORAGE, 'pdf', filename), (err) => {
            expect(err).toBeNull()
        })
    })
})
