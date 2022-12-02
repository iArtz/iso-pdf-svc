import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request'
import { isLocal } from '../middlewares/is-local-request'

import { images } from '../services/scrape'
import { makePDF } from '../services/pdf'

import { STORAGE_PDF } from '../config/constants'
import { deleteImage } from '../utils/files'

const router = express.Router()

router.post(
    '/new',
    [
        body('cookie').not().isEmpty().withMessage('cookie is required'),
        body('link').not().isEmpty().withMessage('link is required'),
        body('id').not().isEmpty().withMessage('id is required'),
    ],
    validateRequest,
    isLocal,
    async (req: Request, res: Response) => {
        const { cookie, link, id } = req.body
        console.log(cookie, link, id)
        const { filename, length } = await images(id, link, cookie)
        makePDF(filename, length)
        const filePath = `${STORAGE_PDF}/${filename}`
        setTimeout(() => {
            deleteImage(filePath)
        }, 10 * 1000)
        res.download(filePath)
    }
)

export { router as createPDFRouter }
