import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

export const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "AKIAUOKDHNEHIBVHSDEY",
    secretAccessKey: "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",
  },
});

export const multerUpload = multer({
  storage: multerS3({
    s3,
    bucket: "goodboard",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
    },
  }),
});
