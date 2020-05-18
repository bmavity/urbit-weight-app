import { File, knownFolders, path } from 'tns-core-modules/file-system'

export function getPath(fileName) {
  return path.join(knownFolders.currentApp().path, fileName)
}

export async function saveFile(fileName, fileText) {
  return File
    .fromPath(fileName)
    .writeText(fileText)
}
