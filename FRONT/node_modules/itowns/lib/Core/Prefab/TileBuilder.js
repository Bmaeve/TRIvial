"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = newTileGeometry;

var THREE = _interopRequireWildcard(require("three"));

var _TileGeometry = _interopRequireDefault(require("../TileGeometry"));

var _Cache = _interopRequireDefault(require("../Scheduler/Cache"));

var _computeBufferTileGeometry = _interopRequireDefault(require("./computeBufferTileGeometry"));

var _OBB = _interopRequireDefault(require("../../Renderer/OBB"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var cacheBuffer = new Map();
var cacheTile = new _Cache["default"]();

function newTileGeometry(builder, params) {
  var _builder$computeShara = builder.computeSharableExtent(params.extent),
      sharableExtent = _builder$computeShara.sharableExtent,
      quaternion = _builder$computeShara.quaternion,
      position = _builder$computeShara.position;

  var south = sharableExtent.south.toFixed(6);
  var bufferKey = "".concat(builder.crs, "_").concat(params.disableSkirt ? 0 : 1, "_").concat(params.segment);
  var promiseGeometry = cacheTile.get(south, params.level, bufferKey); // build geometry if doesn't exist

  if (!promiseGeometry) {
    var resolve;
    promiseGeometry = new Promise(function (r) {
      resolve = r;
    });
    cacheTile.set(promiseGeometry, south, params.level, bufferKey);
    params.extent = sharableExtent;
    params.center = builder.center(params.extent).clone(); // Read previously cached values (index and uv.wgs84 only depend on the # of triangles)

    var cachedBuffers = cacheBuffer.get(bufferKey);
    params.buildIndexAndUv_0 = !cachedBuffers;
    params.builder = builder;
    var buffers;

    try {
      buffers = (0, _computeBufferTileGeometry["default"])(params);
    } catch (e) {
      return Promise.reject(e);
    }

    if (!cachedBuffers) {
      cachedBuffers = {};
      cachedBuffers.index = new THREE.BufferAttribute(buffers.index, 1);
      cachedBuffers.uv = new THREE.BufferAttribute(buffers.uvs[0], 2); // Update cacheBuffer

      cacheBuffer.set(bufferKey, cachedBuffers);
    }

    buffers.index = cachedBuffers.index;
    buffers.uvs[0] = cachedBuffers.uv;
    buffers.position = new THREE.BufferAttribute(buffers.position, 3);
    buffers.normal = new THREE.BufferAttribute(buffers.normal, 3);

    if (params.builder.uvCount > 1) {
      buffers.uvs[1] = new THREE.BufferAttribute(buffers.uvs[1], 1);
    }

    var geometry = new _TileGeometry["default"](params, buffers);
    geometry.OBB = new _OBB["default"](geometry.boundingBox.min, geometry.boundingBox.max);
    geometry._count = 0;

    geometry.dispose = function () {
      geometry._count--;

      if (geometry._count <= 0) {
        // To avoid remove index buffer and attribute buffer uv_0
        //  error un-bound buffer in webgl with VAO rendering.
        // Could be removed if the attribute buffer deleting is
        //  taken into account in the buffer binding state (in THREE.WebGLBindingStates code).
        geometry.index = null;
        delete geometry.attributes.uv_0;
        THREE.BufferGeometry.prototype.dispose.call(geometry);
        cacheTile["delete"](south, params.level, bufferKey);
      }
    };

    resolve(geometry);
    return Promise.resolve({
      geometry: geometry,
      quaternion: quaternion,
      position: position
    });
  }

  return promiseGeometry.then(function (geometry) {
    return {
      geometry: geometry,
      quaternion: quaternion,
      position: position
    };
  });
}