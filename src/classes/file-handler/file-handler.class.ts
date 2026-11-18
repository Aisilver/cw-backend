import fs from "fs"
import { randomUUID } from "node:crypto"; 
import path from "path";

export class FileHandler {
    private TempFolderName = "temp"

    private UploadFolderName = "upload"
    
    private folderExists (name: string) {
        return fs.existsSync(name)
    }

    private createFolder (name: string) {
        fs.mkdirSync(name)
    }

    // Stores buffer in a temporary folder and returns the new filename
    saveFileToTemp (file: Express.Multer.File) {
        if(!this.folderExists(this.TempFolderName)) this.createFolder(this.TempFolderName)

        return new Promise <string> ((res, rej) => {
            const {originalname, buffer} = file,

            ext = originalname.split(".")[1],

            newFileName = `${randomUUID()}.${ext}`

            fs.writeFile(path.join(this.TempFolderName, newFileName), buffer, err => {
                if(err) rej(err)

                else res(newFileName)
            })
        })
    }

    moveToUpload = (filename: string) => new Promise<void>((res, rej) => {

        const oldFileName = path.join(this.TempFolderName, filename),
        
        newFileName = path.join(this.UploadFolderName, filename)

        fs.rename(oldFileName, newFileName, err => {
            if(err) rej(err)

            else res()
        })
    })

    deleteFIle = (folder: "temp" | "upload", filename: string) => new Promise<void>((res, rej) => {
        const pathToFile = path.join(folder, filename)

        if(!this.folderExists(pathToFile)) return

        fs.unlink(pathToFile, err => {
            if(err) res()

            else rej(err)
        })
    }) 
}