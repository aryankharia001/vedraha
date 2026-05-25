import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuid } from "uuid"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

const s3 = new S3Client({
  endpoint: "https://s3.minio.traffakpay.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
})

const BUCKET = process.env.MINIO_BUCKET || "vedraha"
const PUBLIC_BASE = "https://s3.minio.traffakpay.com"

// Upload one or more express-fileupload file objects to MinIO.
// express-fileupload file shape: { name, tempFilePath, mimetype, data, ... }
// Returns an array of { url, publicId }
export const uploadImage = async (files, folder = 'landing-products') => {
  const fileArray = Array.isArray(files) ? files : [files]
  const uploadedImages = []

  for (const file of fileArray) {
    const ext = file.name.match(/\.[^.]+$/)?.[0] || ".jpg"
    const key = `${folder}/${uuid()}-${file.name.replace(/\.[^.]+$/, "")}${ext}`

    // express-fileupload with useTempFiles:true gives tempFilePath
    // without useTempFiles it gives a data buffer
    const body = file.tempFilePath
      ? fs.createReadStream(file.tempFilePath)
      : file.data

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: file.mimetype,
    }))

    uploadedImages.push({
      url: `${PUBLIC_BASE}/${BUCKET}/${key}`,
      publicId: key,
    })

    // Clean up temp file if it exists
    if (file.tempFilePath && fs.existsSync(file.tempFilePath)) {
      fs.unlinkSync(file.tempFilePath)
    }
  }

  return uploadedImages
}

// Delete an image from MinIO by its publicId (the S3 key)
export const deleteImage = async (publicId) => {
  if (!publicId) return
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: publicId }))
    console.log(`Deleted from MinIO: ${publicId}`)
  } catch (err) {
    console.error(`Failed to delete MinIO object '${publicId}':`, err.message)
  }
}

export default s3;