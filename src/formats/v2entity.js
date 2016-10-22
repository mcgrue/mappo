"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  x: T.u32,
  y: T.u32,
  tx: T.u16,
  ty: T.u16,
  facing: T.u8,
  moving: T.u8,
  movementCounter: T.u8,
  frame: T.u8,
  specialFrame: T.u8,
  characterIndex: T.u8,
  reset: T.u8,
  obsmode1: T.u8,
  obsmode2: T.u8,
  speed: T.u8,
  speedCounter: T.u8,
  delayct: T.u8,
  animofs: T.u32,
  scriptofs: T.u32,
  face: T.u8,
  actm: T.u8,
  movementPatternCode: T.u8,
  movementScript: T.u8,
  ctr: T.u8,
  mode: T.u8,
  modePadding: T.list(T.u8, 2),
  step: T.u16,
  delay: T.u16,
  stepctr: T.u16,
  delayctr: T.u16,
  data1: T.u16,
  data2: T.u16,
  data3: T.u16,
  data4: T.u16,
  data5: T.u16,
  data6: T.u16,
  activationScript: T.u32,
  expand1: T.u32,
  expand2: T.u32,
  expand3: T.u32,
  expand4: T.u32,
  desc: T.stringFixed(20),
}
