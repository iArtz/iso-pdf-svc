import { Request, Response, NextFunction } from 'express'

export const isLocal = (req: Request, res: Response, next: NextFunction) => {
    if (process.platform !== 'darwin')
        req.body.link = req.body.link.replace(
            'localhost',
            'host.docker.internal'
        )
    next()
}
