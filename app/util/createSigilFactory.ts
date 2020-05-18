import { sigil, stringRenderer } from '@tlon/sigil-js'

export default function(urbitId, fileSystem) {
  return async function(name, bgColor, lineColor) {
    let sigilSvg = sigil({
      patp: urbitId,
      renderer: stringRenderer,
      size: 100,
      colors: [bgColor, lineColor],
    })

    const filePath = fileSystem.getPath(`images/${name}.svg`)
    await fileSystem.saveFile(filePath, sigilSvg)
    return filePath
  }
}
