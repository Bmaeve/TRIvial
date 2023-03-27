"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LayerUpdateState = _interopRequireDefault(require("../Layer/LayerUpdateState"));

var _ObjectRemovalHelper = _interopRequireDefault(require("./ObjectRemovalHelper"));

var _handlerNodeError = _interopRequireDefault(require("./handlerNodeError"));

var _Coordinates = _interopRequireDefault(require("../Core/Geographic/Coordinates"));

var _GeoidLayer = require("../Layer/GeoidLayer");

var coord = new _Coordinates["default"]('EPSG:4326', 0, 0, 0);
var _default = {
  update: function update(context, layer, node) {
    if (!node.parent && node.children.length) {
      // if node has been removed dispose three.js resource
      _ObjectRemovalHelper["default"].removeChildrenAndCleanupRecursively(layer, node);

      return;
    }

    if (!node.visible) {
      return;
    }

    if (node.layerUpdateState[layer.id] === undefined) {
      node.layerUpdateState[layer.id] = new _LayerUpdateState["default"]();
    } else if (!node.layerUpdateState[layer.id].canTryUpdate()) {
      // toggle visibility features
      node.link.forEach(function (f) {
        var _f$layer;

        if (((_f$layer = f.layer) === null || _f$layer === void 0 ? void 0 : _f$layer.id) == layer.id) {
          f.layer.object3d.add(f);
          f.meshes.position.z = (0, _GeoidLayer.geoidLayerIsVisible)(layer.parent) ? node.geoidHeight : 0;
          f.meshes.updateMatrixWorld();
        }
      });
      return;
    }

    var extentsDestination = node.getExtentsByProjection(layer.source.crs) || [node.extent];
    var zoomDest = extentsDestination[0].zoom; // check if it's tile level is equal to display level layer.

    if (zoomDest != layer.zoom.min || // check if there's data in extent tile.
    !this.source.extentInsideLimit(node.extent, zoomDest) || // In FileSource case, check if the feature center is in extent tile.
    layer.source.isFileSource && !node.extent.isPointInside(layer.source.extent.center(coord))) {
      // if not, there's not data to add at this tile.
      node.layerUpdateState[layer.id].noMoreUpdatePossible();
      return;
    }

    node.layerUpdateState[layer.id].newTry();
    var command = {
      layer: layer,
      extentsSource: extentsDestination,
      view: context.view,
      threejsLayer: layer.threejsLayer,
      requester: node
    };
    return context.scheduler.execute(command).then(function (featureMeshes) {
      node.layerUpdateState[layer.id].noMoreUpdatePossible();
      featureMeshes.forEach(function (featureMesh) {
        if (featureMesh) {
          featureMesh.as(context.view.referenceCrs);
          featureMesh.meshes.position.z = (0, _GeoidLayer.geoidLayerIsVisible)(layer.parent) ? node.geoidHeight : 0;
          featureMesh.updateMatrixWorld();

          if (layer.onMeshCreated) {
            layer.onMeshCreated(featureMesh, context);
          }

          if (!node.parent) {
            // TODO: Clean cache needs a refactory, because it isn't really efficient and used
            _ObjectRemovalHelper["default"].removeChildrenAndCleanupRecursively(layer, featureMesh);
          } else {
            layer.object3d.add(featureMesh);
            node.link.push(featureMesh);
          }

          featureMesh.layer = layer;
        } else {
          // TODO: verify if it's possible the featureMesh is undefined.
          node.layerUpdateState[layer.id].failure(1, true);
        }
      });
    }, function (err) {
      return (0, _handlerNodeError["default"])(err, node, layer, node.level, context.view);
    });
  }
};
exports["default"] = _default;