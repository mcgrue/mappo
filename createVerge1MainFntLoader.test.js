"use strict"

const expect = require('expect')
const createVerge1FntLoader = require('./createVerge1MainFntLoader')
const fill = require('lodash/fill')

const tileWidth = 9
const tileHeight = 16
const numtiles = 95
const fnt = fill(Array(tileWidth * tileHeight * numtiles), 99)

{
  // can read font
  const loader = createVerge1FntLoader({
    data: Buffer.from(fnt)
  })

  const data = loader.load()

  expect(data.fnt).toEqual(fnt) 
}