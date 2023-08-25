// src/api.controller.ts

import { Controller, Get, Req, Headers, Res } from '@nestjs/common';
import { Request, Response } from 'express';

type Scope = 'whatsapp' | 'telegram' | 'signal';

@Controller('v1')
export class ApiController {
  private scopeToApiKey: Record<Scope, string> = {
    whatsapp: 'api_key_1',
    telegram: 'api_key_2',
    signal: 'api_key_3',
  };

  @Get()
  async handleRequest(
    @Req() request: Request,
    @Headers('sessionKey') sessionKey: string,
    @Headers('apiKey') apiKey: string,
    @Res() response: Response,
  ): Promise<void | string> {
    const subdomainData = request['subdomainData'];
    if (subdomainData) {
      const { string: scopeId } = subdomainData;

      // Validate the apiKey for the given scopeId
      if (this.scopeToApiKey[scopeId as Scope] !== apiKey) {
        response.status(403).send('Invalid apiKey for scopeId');
        return;
      }

      // Now, you can use the scopeId and optional sessionKey to fetch or process the desired data.
      if (sessionKey) {
        console.log(`Data for scope: ${scopeId}, session: ${sessionKey}`);
        // If sessionKey is provided, fetch data for a specific chat session.
        response
          .status(200)
          .send(`Data for scope: ${scopeId}, session: ${sessionKey}`);
        return;
      } else {
        console.log(`General data for scope: ${scopeId}`);
        // If sessionKey is not provided, perhaps you want to fetch general data for the scope.
        response.status(200).send(`General data for scope: ${scopeId}`);
        return;
      }
    } else {
      // This is for the main domain logic (rizt.dev/v1)
      response.status(200).send('No subdomain data');
      return;
    }
  }
}
