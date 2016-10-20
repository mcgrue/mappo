"use strict"

const {T} = require(`../readFormat`)
const V3_CHRANIM = require(`./v3chranim`)

module.exports = {
  signature: T.u32,
  version: T.u32,
  bpp: T.u32,
  flags: T.u32,
  tcol: T.u32,
  hotSpotX: T.u32,
  hotSpotY: T.u32,
  hotSpotWidth: T.u32,
  hotSpotHeight: T.u32,
  frameWidth: T.u32,
  frameHeight: T.u32,
  totalframes: T.u32,
  didle: T.u32,
  uidle: T.u32,
  lidle: T.u32,
  ridle: T.u32,
  anims: T.list(V3_CHRANIM, 8),
  customscripts: T.u32,
  compression: T.u32,
  imagedata: T.zlibU8(({record}) => {
    return record.totalframes * record.frameWidth * record.frameHeight * (record.bpp / 8)
  }),
}
