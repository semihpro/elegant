import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import formidable from "formidable";
import fs, { readFile } from "fs/promises";
import { Gallery } from "@prisma/client";
import { utapi } from "uploadthing/server";
import { FileEsque } from "uploadthing/dist/sdk/utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const gallery: Gallery | null = await prisma.gallery.findFirst({
    where: { id: Number(id) },
  });
  if (!gallery) {
    Response.json({
      result: `Aranilan Resim bulunamadi`,
      status: 504,
    });
    return;
  }
  // if imagekey exist delete it from utapi
  gallery.image_key && (await utapi.deleteFiles(gallery.image_key));
  // delete data
  const deleteResult = await prisma.gallery.delete({
    where: { id: Number(id) },
  });
  Response.json({
    status: "ok",
    deleteResult,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const gallery: Gallery | null = await prisma.gallery.findFirst({
    where: { id: Number(id) },
  });
  if (!gallery) {
    Response.json({
      result: `Aranilan Resim bulunamadi`,
      status: 504,
    });
    return;
  }
  // if imagekey exist delete it from utapi
  gallery.image_key && (await utapi.deleteFiles(gallery.image_key));
  // Formidable file read
  const data: { fields: any; files: any } = await new Promise(
    (resolve, reject) => {
      const form = formidable({});
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    }
  );
  const controller = new AbortController();
  const { signal } = controller;
  const binaryFile = await readFile(data.files.image[0].filepath, { signal });
  const fileBlob: FileEsque = new Blob([binaryFile]);
  fileBlob.name = "gallery_image.jpg";
  // Abort the request before the promise settles.
  controller.abort();
  const result = await utapi.uploadFiles<FileEsque>(fileBlob);
  // update data
  const updateResult = await prisma.gallery.update({
    where: { id: Number(id) },
    data: {
      image_key: result?.data?.key,
      image_path: result?.data?.url,
    },
  });
  Response.json({
    status: "ok",
    updateResult,
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    !(
      req.method.toUpperCase() === "POST" ||
      req.method.toUpperCase() === "DELETE"
    )
  ) {
    res.json({
      result:
        "bascurdugunuz api sadece post ve delete operasyonlarini destelemektedir!",
      status: 404,
    });
  }
  try {
    const { id } = req.query;

    const gallery: Gallery = await prisma.gallery.findFirst({
      where: { id: Number(id) },
    });
    if (!gallery) {
      res.json({
        result: `Aranilan Resim bulunamadi`,
        status: 504,
      });
      return;
    }
    // if imagekey exist delete it from utapi
    gallery.image_key && (await utapi.deleteFiles(gallery.image_key));
    if (req.method.toUpperCase() === "DELETE") {
      const deleteResult = await prisma.gallery.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({
        status: "ok",
        deleteResult,
      });
      return;
    } else {
      // Formidable file read
      const data: { fields: any; files: any } = await new Promise(
        (resolve, reject) => {
          const form = formidable({});
          form.parse(req, (err: any, fields: any, files: any) => {
            if (err) reject({ err });
            resolve({ fields, files });
          });
        }
      );
      const controller = new AbortController();
      const { signal } = controller;
      const binaryFile = await readFile(data.files.image[0].filepath, {
        signal,
      });
      const fileBlob: FileEsque = new Blob([binaryFile]);
      fileBlob.name = "gallery_image.jpg";
      // Abort the request before the promise settles.
      controller.abort();
      const result = await utapi.uploadFiles<FileEsque>(fileBlob);
      // update data
      const updateResult = await prisma.gallery.update({
        where: { id: Number(id) },
        data: {
          image_key: result.data.key,
          image_path: result.data.url,
        },
      });
      res.status(200).json({
        status: "ok",
        updateResult,
      });
    }
  } catch (err) {
    // When a request is aborted - err is an AbortError
    res.json(err);
  }
};
