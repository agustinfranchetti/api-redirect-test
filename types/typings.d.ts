// typings.d.ts or types/typings.d.ts

declare namespace Express {
  export interface Request {
    subdomainData?: {
      string: string;
      hash: string;
    };
  }
}
