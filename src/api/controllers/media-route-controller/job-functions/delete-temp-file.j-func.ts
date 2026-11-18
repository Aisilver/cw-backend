import { FileHandler } from "../../../../classes/file-handler/file-handler.class.js";

export function MEDIA_CRONJOB_deleteTempFile (filename: string) {
    const filehandler = new FileHandler()

    filehandler.deleteFIle("temp", filename)
}