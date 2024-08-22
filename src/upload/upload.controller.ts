import { Controller, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('imgProfil', {
        storage: diskStorage({
            destination: './imgprofil',  // Le dossier où les fichiers seront enregistrés
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },  // Limite la taille du fichier à 5 MB
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
        try {
            const imageUrl = `/imgprofil/${file.filename}`;
            return response.status(201).json({ message: 'Fichier téléchargé avec succès', imageUrl });
        } catch (error) {
            console.error('Error uploading file:', error);
            return response.status(500).json({ message: 'Erreur lors du téléchargement du fichier' });
        }
    }
}
