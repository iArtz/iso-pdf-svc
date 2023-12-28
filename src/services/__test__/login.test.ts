import { login } from '../login'

describe('Login Test', () => {
    it('Login', async () => {
        const expectedKeys = ['name', 'value']
        // @ts-expect-error: any type
        const cookies = await login(global.payload.link)
        expect(cookies).toEqual(
            expect.arrayContaining(
                cookies.map(() =>
                    expect.objectContaining(
                        expectedKeys.reduce(
                            (result: Record<string, unknown>, key: string) => {
                                result[key] = expect.anything()
                                return result
                            },
                            {}
                        )
                    )
                )
            )
        )
    })
})
