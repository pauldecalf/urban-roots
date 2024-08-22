/// <reference types="multer" />
import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: Express.Multer.File, response: Response): Promise<Response<any, Record<string, any>>>;
}
