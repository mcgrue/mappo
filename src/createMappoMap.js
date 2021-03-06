"use strict"

module.exports = ({map}) => {
  const mappoMap = {}

  const parseRenderString = (renderString, separator=``) => {
    const parts = renderString.split(separator)
    const layerReferences = parts.filter(part => /\d/.test(part))
    const layerIndices = layerReferences.map(Number).map(v => v - 1)
    return layerIndices
  }

  switch (map.formatName) {
    case `v1map`: {
      mappoMap.mapLayerOrder = [0, 1]
      mappoMap.tilesetFilename = map.vspFilename
      mappoMap.tileLayers = [{
        description: `Background`,
        width: map.width,
        height: map.height,
        tileIndexGrid: map.layers[0],
        parallax: {
          x: 1.0,
          y: 1.0,
        },
      }, {
        description: `Foreground`,
        width: map.width,
        height: map.height,
        tileIndexGrid: map.layers[1],
        parallax: {
          x: map.parallax.mul / map.parallax.div,
          y: map.parallax.mul / map.parallax.div,
        },
      }]
    } break;
    case `v2map`: {
      mappoMap.mapLayerOrder = parseRenderString(map.renderString)
      mappoMap.tilesetFilename = map.vspFilename
      mappoMap.tileLayers = map.layers.map((tileIndexGrid, index) => {
        const layerInfo = map.layerInfo[index]
        return {
          description: `Layer #` + index,
          width: layerInfo.sizex,
          height: layerInfo.sizey,
          tileIndexGrid: tileIndexGrid.decompressed,
          parallax: {
            x: layerInfo.parallax.x.mul / layerInfo.parallax.x.div,
            y: layerInfo.parallax.y.mul / layerInfo.parallax.y.div,
          },
        }
      })
    } break;
    case `v27map`: {
      mappoMap.mapLayerOrder = parseRenderString(map.renderString)
      mappoMap.tilesetFilename = map.vspFilename
      mappoMap.tileLayers = map.layers.map((tileIndexGrid, index) => {
        // TODO(chuck): this seems entirely wrong, yet it fixes the parallax
        //              for experiment/DEFLATOR/*.map
        const layerInfo = map.layerInfo[mappoMap.mapLayerOrder[index]]
        return {
          description: `Layer #` + index,
          width: map.width,
          height: map.height,
          tileIndexGrid: tileIndexGrid.decompressed,
          parallax: {
            x: layerInfo.parallax.x.mul / layerInfo.parallax.x.div,
            y: layerInfo.parallax.y.mul / layerInfo.parallax.y.div,
          },
        }
      })
    } break
    case `v3map`: {
      mappoMap.mapLayerOrder = parseRenderString(map.renderString, `,`)
      mappoMap.tilesetFilename = map.vspFilename
      mappoMap.tileLayers = map.layers.map(layerInfo => ({
        description: layerInfo.description,
        width: layerInfo.width,
        height: layerInfo.height,
        tileIndexGrid: layerInfo.tileData.decompressed,
        parallax: layerInfo.parallax,
      }))
    } break;
  }

  return mappoMap
}
