"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _TileMesh = _interopRequireDefault(require("../Core/TileMesh"));

var _LayeredMaterial = _interopRequireDefault(require("../Renderer/LayeredMaterial"));

var _TileBuilder = _interopRequireDefault(require("../Core/Prefab/TileBuilder"));

var _ReferencingLayerProperties = _interopRequireDefault(require("../Layer/ReferencingLayerProperties"));

var _GeoidLayer = require("../Layer/GeoidLayer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dimensions = new THREE.Vector2();

function setTileFromTiledLayer(tile, tileLayer) {
  if (tileLayer.diffuse) {
    tile.material.diffuse = tileLayer.diffuse;
  }

  if (tileLayer.isGlobeLayer) {
    // Computes a point used for horizon culling.
    // If the point is below the horizon,
    // the tile is guaranteed to be below the horizon as well.
    tile.horizonCullingPoint = tile.extent.center().as('EPSG:4978').toVector3();
    tile.extent.planarDimensions(dimensions).multiplyScalar(THREE.MathUtils.DEG2RAD); // alpha is maximum angle between two points of tile

    var alpha = dimensions.length();
    var h = Math.abs(1.0 / Math.cos(alpha * 0.5));
    tile.horizonCullingPoint.setLength(h * tile.horizonCullingPoint.length());
    tile.horizonCullingPointElevationScaled = tile.horizonCullingPoint.clone();
  }
}

var _default = {
  convert: function convert(requester, extent, layer) {
    var builder = layer.builder;
    var parent = requester;
    var level = parent !== undefined ? parent.level + 1 : 0;
    var paramsGeometry = {
      extent: extent,
      level: level,
      segment: layer.segments || 16,
      disableSkirt: layer.disableSkirt
    };
    return (0, _TileBuilder["default"])(builder, paramsGeometry).then(function (result) {
      // build tile mesh
      result.geometry._count++;
      var crsCount = layer.tileMatrixSets.length;
      var material = new _LayeredMaterial["default"](layer.materialOptions, crsCount);
      (0, _ReferencingLayerProperties["default"])(material, layer);
      var tile = new _TileMesh["default"](result.geometry, material, layer, extent, level); // Commented because layer.threejsLayer is undefined;
      // Fix me: conflict with object3d added in view.scene;
      // tile.layers.set(layer.threejsLayer);

      if (parent && parent.isTileMesh) {
        // get parent extent transformation
        var pTrans = builder.computeSharableExtent(parent.extent); // place relative to his parent

        result.position.sub(pTrans.position).applyQuaternion(pTrans.quaternion.invert());
        result.quaternion.premultiply(pTrans.quaternion);
      }

      tile.position.copy(result.position);
      tile.quaternion.copy(result.quaternion);
      tile.visible = false;
      tile.updateMatrix();
      tile.add(tile.obb);
      setTileFromTiledLayer(tile, layer);

      if (parent) {
        tile.geoidHeight = parent.geoidHeight;
        var geoidHeight = (0, _GeoidLayer.geoidLayerIsVisible)(layer) ? tile.geoidHeight : 0;
        tile.setBBoxZ({
          min: parent.obb.z.min,
          max: parent.obb.z.max,
          geoidHeight: geoidHeight
        });
        tile.material.geoidHeight = geoidHeight;
      }

      return tile;
    });
  }
};
exports["default"] = _default;