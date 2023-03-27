"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _Extent = _interopRequireDefault(require("../Core/Geographic/Extent"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var nextuuid = 1;

function addPickingAttribute(points) {
  // generate unique id for picking
  var numPoints = points.geometry.attributes.position.count;
  var ids = new Uint8Array(4 * numPoints);
  var baseId = nextuuid++;

  if (numPoints > 0xffff || baseId > 0xffff) {
    // TODO: fixme
    console.warn('Currently picking is limited to Points with less than 65535 elements and less than 65535 Points instances');
    return points;
  }

  for (var i = 0; i < numPoints; i++) {
    // todo numpoints > 16bits
    var v = baseId << 16 | i;
    ids[4 * i + 0] = (v & 0xff000000) >> 24;
    ids[4 * i + 1] = (v & 0x00ff0000) >> 16;
    ids[4 * i + 2] = (v & 0x0000ff00) >> 8;
    ids[4 * i + 3] = (v & 0x000000ff) >> 0;
  }

  points.baseId = baseId;
  points.geometry.setAttribute('unique_id', new THREE.BufferAttribute(ids, 4, true));
  return points;
}

var _default = {
  executeCommand: function executeCommand(command) {
    var layer = command.layer;
    var node = command.requester;
    return node.load().then(function (geometry) {
      var points = new THREE.Points(geometry, layer.material);
      addPickingAttribute(points);
      points.frustumCulled = false;
      points.matrixAutoUpdate = false;

      if (!layer.isEntwinePointTileLayer) {
        points.position.copy(node.bbox.min);
        points.scale.copy(layer.scale);
      }

      points.updateMatrix();
      points.tightbbox = geometry.boundingBox.applyMatrix4(points.matrix);
      points.layers.set(layer.threejsLayer);
      points.layer = layer;
      points.extent = _Extent["default"].fromBox3(command.view.referenceCrs, node.bbox);
      points.userData.node = node;
      return points;
    });
  }
};
exports["default"] = _default;