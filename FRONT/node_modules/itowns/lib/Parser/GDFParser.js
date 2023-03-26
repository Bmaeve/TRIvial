"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.getHeaderAttribute = getHeaderAttribute;

var THREE = _interopRequireWildcard(require("three"));

var _GeoidGrid = _interopRequireDefault(require("../Core/Geographic/GeoidGrid"));

var _Extent = _interopRequireDefault(require("../Core/Geographic/Extent"));

var _GTXParser = require("./GTXParser");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getHeaderAttribute(header, attributeName) {
  var attributeRow = header[header.indexOf(header.find(function (element) {
    return element.includes(attributeName);
  }))].split(' ').filter(function (value) {
    return value !== '';
  });
  return parseFloat(attributeRow[attributeRow.length - 1]);
}
/**
 * The `GDFParser` module provides a `[parse]{@link module:GDFParser.parse}` method. This method takes the content of a
 * GDF file in, and returns a `{@link GeoidGrid}`. the `{@link GeoidGrid}` contains all the necessary attributes and
 * methods to access the GDF data in iTowns.
 *
 * @module GDFParser
 */


var _default = {
  /**
   * Parses a GDF file content and returns a corresponding `{@link GeoidGrid}`.
   *
   * @param   {string}    gdf                             The content of the GDF file to parse.
   * @param   {Object}    options                         An object gathering the optional parameters to pass to
                                                          * the parser.
   * @param   {Object}    [options.in={}]                 Information on the GDF data.
   * @param   {string}    [options.in.crs='EPSG:4326']    The Coordinates Reference System (CRS) of the GDF data.
                                                          * It must be a geographic CRS, and must be given as an EPSG
                                                          * code.
   *
   * @returns {Promise<GeoidGrid>}    A promise resolving with a `{@link GeoidGrid}`, which contains all the necessary
                                      * attributes and methods to access GDF file data.
   */
  parse: function parse(gdf) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      "in": {}
    };
    var rows = gdf.split('\n');
    var firstMeasureLine = rows.indexOf(rows.find(function (row) {
      return row.includes('end_of_head');
    })) + 1;
    var rawHeaderData = rows.slice(0, firstMeasureLine); // ---------- GET METADATA FROM THE FILE : ----------

    var metadata = {
      minX: getHeaderAttribute(rawHeaderData, 'longlimit_west'),
      maxX: getHeaderAttribute(rawHeaderData, 'longlimit_east'),
      minY: getHeaderAttribute(rawHeaderData, 'latlimit_south'),
      maxY: getHeaderAttribute(rawHeaderData, 'latlimit_north'),
      stepX: getHeaderAttribute(rawHeaderData, 'gridstep'),
      stepY: getHeaderAttribute(rawHeaderData, 'gridstep'),
      nRows: getHeaderAttribute(rawHeaderData, 'latitude_parallels'),
      nColumns: getHeaderAttribute(rawHeaderData, 'longitude_parallels')
    }; // ---------- BUILD A DATA VIEWER FROM THE TEXT DATA : ----------

    var data = new DataView(new ArrayBuffer(_GTXParser.BYTES_PER_DOUBLE * metadata.nRows * metadata.nColumns));
    var index = 0;

    var _iterator = _createForOfIteratorHelper(rows.slice(firstMeasureLine, rows.length)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var row = _step.value;
        row = row.split(' ').filter(function (value) {
          return value !== '';
        });

        if (!row.length) {
          continue;
        }

        data.setFloat64(index * _GTXParser.BYTES_PER_DOUBLE, parseFloat(row[2]));
        index++;
      } // ---------- CREATE A GeoidGrid FOR THE GIVEN FILE DATA : ----------

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var dataExtent = new _Extent["default"](options["in"].crs || 'EPSG:4326', metadata.minX, metadata.maxX, metadata.minY, metadata.maxY);
    var dataStep = new THREE.Vector2(metadata.stepX, metadata.stepY);
    return Promise.resolve(new _GeoidGrid["default"](dataExtent, dataStep, function getData(verticalIndex, horizontalIndex) {
      return data.getFloat64((metadata.nColumns * (metadata.nRows - verticalIndex - 1) + horizontalIndex) * _GTXParser.BYTES_PER_DOUBLE);
    }));
  }
};
exports["default"] = _default;