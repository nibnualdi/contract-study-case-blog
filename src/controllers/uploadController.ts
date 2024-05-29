import { Request, Response } from "express";
import multer from "multer";
import Files from "../db/models/files";

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toISOString().replace(/:/g, "-") + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + "screenshot" + "_" + file.originalname);
  },
});

const multerUpload = multer({ storage });

const upload = (req: Request, res: Response) => {
  multerUpload.single("document")(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        message: "Gagal mengupload file!",
        file: req.file,
      });
      return;
    }
    if (!req.file) {
      res.status(400).json({
        message: "Pastikan file sudah terpilih!",
        file: req.file,
      });
      return;
    }
    try {
      const path = `${req.file?.destination}/${req.file?.filename}`;
      const url = `http://localhost:${port}/${path}`;
      const fileName = req.file.filename;
      const type = req.file.mimetype;

      const file = await (
        await Files.create({
          fileName,
          path,
          type,
          url,
        })
      ).reload();

      const id = file.dataValues.id;
      const updatedAt = file.dataValues.updatedAt;
      const createdAt = file.dataValues.createdAt;

      res.status(201).json({
        code: 201,
        message: "Berhasil menambahkan data",
        data: {
          url,
          id,
          fileName,
          type,
          path,
          updatedAt,
          createdAt,
        },
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  });
};

export { upload };
