"use strict"

const colorDepth = require(`./converter/colorDepth`)
const createTileGridConverter = require(`./converter/createTileGridConverter`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = ({context, tileset, imageFilename}) => {
  const mappoTileset = {}

  switch (tileset.formatName) {
    case `v1vsp`: {
      mappoTileset.tileWidth = 16
      mappoTileset.tileHeight = 16
      mappoTileset.tileCount = tileset.tileCount
      mappoTileset.raw32bitData = colorDepth.convert8to32({
        palette: tileset.palette.map(v => v * 4),
        raw8bitData: tileset.tiles,
      })
    } break;
    case `v2vsp`: {
      mappoTileset.tileWidth = 16
      mappoTileset.tileHeight = 16
      mappoTileset.tileCount = tileset.tileCount
      mappoTileset.raw32bitData = colorDepth.convert8to32({
        palette: tileset.palette.map(v => v * 4),
        raw8bitData: tileset.frames.decompressed,
      })
    } break;

    case `v27vsp8bit`: {
      mappoTileset.tileWidth = tileset.tileWidth
      mappoTileset.tileHeight = tileset.tileHeight
      mappoTileset.tileCount = tileset.tileCount
      mappoTileset.raw32bitData = colorDepth.convert8to32({
        palette: tileset.palette,
        raw8bitData: tileset.imageData.decompressed,
      })
    } break

    case `v27vsp32bit`: {
      mappoTileset.tileWidth = tileset.tileWidth
      mappoTileset.tileHeight = tileset.tileHeight
      mappoTileset.tileCount = tileset.tileCount
      mappoTileset.raw32bitData = tileset.imageData.decompressed
    } break

    case `v3vsp`: {
      mappoTileset.tileWidth = tileset.tileSize
      mappoTileset.tileHeight = tileset.tileSize
      mappoTileset.tileCount = tileset.tileCount
      mappoTileset.raw32bitData = colorDepth.convert24to32({
        raw24bitData: tileset.tiles.decompressed,
      })
    } break;
  }

  mappoTileset.imageFilename = imageFilename
  mappoTileset.tileColumns = 20

  return mappoTileset
}
