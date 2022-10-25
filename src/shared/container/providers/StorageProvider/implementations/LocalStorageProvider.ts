import fs from "node:fs";
import { resolve } from "node:path";

import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string) {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string) {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}
