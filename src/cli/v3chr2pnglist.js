"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge3ChrConverter = require(`../converter/createVerge3ChrConverter`)
const colorDepth = require(`../converter/colorDepth`)
const ripTiles = require(`../ripTiles`)
const {PNG} = require(`pngJS`)
const asset = require(`../asset`)

const chrFilename = process.argv[2]
const chrData = asset.fromDisk(chrFilename, asset.v3chr)

let raw32BitData = chrData.frames.decompressed
if (chrData.bitsPerPixel === 24) {
    raw32BitData = colorDepth.convert24to32({raw24bitData: chrData.frames.decompressed})
}

const tileWidth = chrData.frameWidth
const tileHeight = chrData.frameHeight
const tileList = ripTiles({
  raw32BitData,
  raw32BitDataWidth: tileWidth,
  raw32BitDataHeight: tileHeight * chrData.frameCount,
  ripFromX: 0,
  ripFromY: 0,
  tileWidth: tileWidth,
  tileHeight: tileHeight,
  tileCount: chrData.frameCount,
  columnCount: 1,
})

console.log(`converting`, chrFilename)
tileList.forEach((tile, tileIndex) => {
  const targetFilename = chrFilename + `-` + tileIndex + `.png`
  const png = new PNG({width: tileWidth, height: tileHeight})
  for (let p = 0; p < tileWidth * tileHeight * 4; p++) {
    png.data[p] = tile[p]
  }
  png.pack().pipe(fs.createWriteStream(targetFilename))
  console.log(`generated`, targetFilename)
})
