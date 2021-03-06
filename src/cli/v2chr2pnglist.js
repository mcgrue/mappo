"use strict"

const process = require(`process`)

const fs = require(`fs`)
const colorDepth = require(`../converter/colorDepth`)
const ripTiles = require(`../ripTiles`)
const {PNG} = require(`pngJS`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v2chr)

const raw32BitData = colorDepth.convert8to32({
  palette: palData.palette.map(v => v * 4),
  raw8bitData: chrData.frames.decompressed,
})

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
