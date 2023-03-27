"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.geoidLayerIsVisible = geoidLayerIsVisible;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Layer2 = _interopRequireDefault(require("./Layer"));

var _LayerUpdateState = _interopRequireDefault(require("./LayerUpdateState"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function geoidLayerIsVisible(tilelayer) {
  var _tilelayer$attachedLa;

  return tilelayer === null || tilelayer === void 0 ? void 0 : (_tilelayer$attachedLa = tilelayer.attachedLayers.filter(function (l) {
    return l.isGeoidLayer;
  })[0]) === null || _tilelayer$attachedLa === void 0 ? void 0 : _tilelayer$attachedLa.visible;
}
/**
 * `GeoidLayer` is a specific `{@link Layer}` which supports geoid height data. When added to a `{@link View}`, it
 * vertically translates each of the view's tiles by a proper geoid height value. For a given tile, the geoid height
 * value used for translation is the geoid height computed at the center of the tile.
 *
 * @example
 * // Create a GeoidLayer from a GTX geoid heights file.
 * const geoidLayer = new GeoidLayer('geoid', {
 *     source: new FileSource({
 *         url: 'url-to-some-GTX-geoid-heights-file.gtx',
 *         crs: 'EPSG:4326',
 *         format: 'application/gtx',
 *     }),
 * });
 */


var GeoidLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(GeoidLayer, _Layer);

  var _super = _createSuper(GeoidLayer);

  /**
   * Creates a new instance of `GeoidLayer`.
   *
   * @param   {string}    id              An unique identifier for the layer.
   * @param   {Object}    config          The layer configuration. All elements in it will be merged as is in the
                                          * layer. For example, if the configuration contains three elements `name,
                                          * protocol, extent`, these elements will be available using `layer.name` or
                                          * something else depending on the property name. Only `config.source`
                                          * parameter is mandatory.
   * @param   {Object}    config.source   The source of the geoid data displayed by the `GeoidLayer`. It is mandatory
                                          * that the source data for a `GeoidLayer` be parsed into a
                                          * `{@link GeoidGrid}`. You can refer to `{@link GTXParser}`,
                                          * `{@link GDFParser}` and `{@link ISGParser}` to see how three standard
                                          * geoid height grid file formats are parsed into `{@link GeoidGrid}`.
   */
  function GeoidLayer(id) {
    var _this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, GeoidLayer);
    _this = _super.call(this, id, config);
    _this.isGeoidLayer = true;

    _this.defineLayerProperty('visible', true);

    return _this;
  }

  (0, _createClass2["default"])(GeoidLayer, [{
    key: "updateNodeZ",
    value: function updateNodeZ(node) {
      node.material.geoidHeight = this.visible ? node.geoidHeight : 0;
      node.obb.updateZ({
        geoidHeight: node.material.geoidHeight
      });
    }
  }, {
    key: "update",
    value: function update(context, layer, node, parent) {
      var _this2 = this;

      if (!parent || !node.material) {
        return;
      } // Don't update tile if its zoom is not within the layer's zoom limits


      var extentsDestination = node.getExtentsByProjection(layer.crs);
      var zoom = extentsDestination[0].zoom;

      if (zoom > layer.zoom.max || zoom < layer.zoom.min) {
        return;
      }

      if (node.layerUpdateState[layer.id] === undefined) {
        node.layerUpdateState[layer.id] = new _LayerUpdateState["default"]();

        var updateNodeZ = function () {
          return _this2.updateNodeZ(node);
        };

        layer.addEventListener('visible-property-changed', updateNodeZ);
        node.addEventListener('dispose', function () {
          layer.removeEventListener('visible-property-changed', updateNodeZ);
        });
      }

      if (layer.frozen || !layer.visible || !node.material.visible || !node.layerUpdateState[layer.id].canTryUpdate()) {
        return;
      }

      node.layerUpdateState[layer.id].newTry();
      return this.getData(node.extent, extentsDestination).then(function (result) {
        node.geoidHeight = result.getHeightAtCoordinates(node.extent.center());

        _this2.updateNodeZ(node);

        node.layerUpdateState[layer.id].noMoreUpdatePossible();
      });
    }
  }]);
  return GeoidLayer;
}(_Layer2["default"]);

var _default = GeoidLayer;
exports["default"] = _default;