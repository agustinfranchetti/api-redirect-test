import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SubdomainMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const [subdomain] = req.hostname.split('.');

    // Assuming subdomains are of format {string}-{random hash}.rizt.dev
    const [string, hash] = subdomain.split('-');
    // Attach subdomain data to request
    req['subdomainData'] = {
      string,
      hash,
    };

    next();
  }
}
