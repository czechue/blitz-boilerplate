import { generateComponents } from '@uploadthing/react'
import { OurFileRouter } from '@/uploadthing/uploadthing-router'

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()
import { generateReactHelpers } from '@uploadthing/react/hooks'

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
