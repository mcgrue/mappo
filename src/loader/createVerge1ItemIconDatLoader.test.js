"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1ItemIconDatLoader = require('./createVerge1ItemIconDatLoader')
const fill = require('lodash/fill')

const tileWidth = 16
const tileHeight = 16
const numtiles = 21
const itemicons = fill(Array(tileWidth * tileHeight * numtiles), 99)

{
  // can read ITEMICON.DAT
  const loader = createVerge1ItemIconDatLoader({
    data: Buffer.concat([
      Buffer.from([21]),
      Buffer.from(itemicons)
    ])
  })

  const data = loader.load()

  expect(data.numtiles).toEqual(numtiles)
  expect(data.itemicons).toEqual(itemicons)
}