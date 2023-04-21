export class UploadedFileDto {
    repairsId: string
    type: string
    userNum: string
}

export class DeleteFileDto {
    fileName: string
    type: string
}

export class AutoDeleteFileDto {
    repairsId: string
}