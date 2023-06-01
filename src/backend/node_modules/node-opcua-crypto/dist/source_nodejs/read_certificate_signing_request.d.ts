/// <reference types="node" />
export type CertificateSigningRequest = Buffer;
export declare function readCertificateSigningRequest(filename: string): Promise<CertificateSigningRequest>;
