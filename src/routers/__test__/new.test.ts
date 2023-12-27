import request from 'supertest'
import { app } from '../../app'

describe('New Route', () => {
    it('Create new pdf', async () => {
        const response = await request(app)
            .post('/api/pdf/new')
            // @ts-expect-error: Complier warns about any type
            .send(global.payload)
        expect(response.status).toEqual(200)
    })
})
