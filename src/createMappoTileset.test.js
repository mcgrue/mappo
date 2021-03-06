"use strict"

const expect = require(`expect`)
const asset = require(`./asset`)
const {makeBuffer, B} = require(`./makeBuffer`)
const filler = require(`./filler`)
const createMappoTileset = require(`./createMappoTileset`)

{
  // can create from v1 vsp
  const tileCount = 3
  const buffer = makeBuffer([
    B.u16(0), // version
    B.u8(filler(3 * 256)),
    B.u16(tileCount),
    B.u8(filler(16 * 16 * tileCount, 99)),
    B.u8(filler(2 * 4 * 100, 88)), // 100 vsp animations
  ])

  const v1vsp = asset.fromBuffer(buffer, asset.v1vsp)
  const mappoTileset = createMappoTileset({tileset: v1vsp})

  expect(mappoTileset.tileWidth).toBe(16)
  expect(mappoTileset.tileHeight).toBe(16)
  expect(mappoTileset.tileCount).toBe(tileCount)
  expect(mappoTileset.raw32bitData.length).toBe(16 * 16 * 4 * tileCount)
}

{
  // can create from v2 vsp
  const tileCount = 3
  const buffer = makeBuffer([
    B.u16(0), // version
    B.u8(filler(3 * 256)),
    B.u16(tileCount),
    B.compressedU8(filler(16 * 16 * tileCount, 99)),
    B.u8(filler(2 * 4 * 100, 88)), // 100 vsp animations
  ])

  const v2vsp = asset.fromBuffer(buffer, asset.v2vsp)
  const mappoTileset = createMappoTileset({tileset: v2vsp})

  expect(mappoTileset.tileWidth).toBe(16)
  expect(mappoTileset.tileHeight).toBe(16)
  expect(mappoTileset.tileCount).toBe(tileCount)
  expect(mappoTileset.raw32bitData.length).toBe(16 * 16 * 4 * tileCount)
}

{
  // can create from v3 vsp
  const tileCount = 3
  const tileSize = 32
  const buffer = makeBuffer([
    // sig/version/tileSize/format/#tiles/compression
    B.u32([0, 0, tileSize, 0, tileCount, 1]),
    B.zlibU8(filler(tileSize * tileSize * 3 * tileCount)),
    B.u32(1), // #animations
    B.stringFixed(256, `vsp anim name`),
    B.u32([0, 0, 0, 0]), // start/finish/delay/mode
    B.u32(1), // #obs
    B.zlibU8(filler(tileSize * tileSize)),
  ])

  const v3vsp = asset.fromBuffer(buffer, asset.v3vsp)
  const mappoTileset = createMappoTileset({tileset: v3vsp})

  expect(mappoTileset.tileWidth).toBe(tileSize)
  expect(mappoTileset.tileHeight).toBe(tileSize)
  expect(mappoTileset.tileCount).toBe(tileCount)
  expect(mappoTileset.raw32bitData.length).toBe(tileSize * tileSize * 4 * tileCount)
}
