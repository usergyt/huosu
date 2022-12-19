/// <reference types="multer" />
export declare class UploadController {
    uploadFile(file: Express.Multer.File, fileName: any): Promise<{
        fileName: any;
        originalname: string;
        mimetype: string;
    }>;
    uploadFils(files: Array<Express.Multer.File>): Promise<Express.Multer.File[]>;
}
