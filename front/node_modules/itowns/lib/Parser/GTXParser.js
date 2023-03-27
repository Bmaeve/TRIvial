"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BYTES_PER_FLOAT = exports.BYTES_PER_DOUBLE = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _GeoidGrid = _interopRequireDefault(require("../Core/Geographic/GeoidGrid"));

var _Extent = _interopRequireDefault(require("../Core/Geographic/Extent"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BYTES_PER_DOUBLE = 8;
exports.BYTES_PER_DOUBLE = BYTES_PER_DOUBLE;
var BYTES_PER_FLOAT = 4;
/**
 * The `GTXParser` module provides a `[parse]{@link module:GTXParser.parse}` method. This method takes the content of a
 * GTX file in, and returns a `{@link GeoidGrid}`. The `{@link GeoidGrid}` contains all the necessary attributes and
 * methods to access the GTX data in iTowns.
 *
 * @module GTXParser
 */

exports.BYTES_PER_FLOAT = BYTES_PER_FLOAT;
var _default = {
  /**
   * Parses a GTX file content and returns a corresponding `{@link GeoidGrid}`.
   *
   * @param   {ArrayBuffer}   gtx                             The content of the GTX file to parse.
   * @param   {Object}        options                         An object gathering the optional parameters to pass to
                                                              * the parser.
   * @param   {Object}        [options.in={}]                 Information on the GTX data.
   * @param   {string}        [options.in.crs='EPSG:4326']    The Coordinates Reference System (CRS) of the GTX data.
                                                              * It must be a geographic CRS, and must be given as an
                                                              * EPSG code.
   * @param   {string}        [options.in.dataType='float']   The encoding of geoid height data within the GTX file.
                                                              * Must be `'float'` or `'double'`.
   *
   * @returns {Promise<GeoidGrid>}    A promise resolving with a `{@link GeoidGrid}`, which contains all the necessary
                                      * attributes and methods to access GTX file data.
   */
  parse: function parse(gtx) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      "in": {}
    };
    var dataType = options["in"].dataType || 'float';

    if (!['float', 'double'].includes(dataType)) {
      throw new Error('`dataType` parameter is incorrect for GTXParser.parse method. ' + 'This parameter must be either `double` or `float`.');
    } // ---------- GET METADATA FROM THE FILE : ----------


    var headerView = new DataView(gtx, 0, 40);
    var metadata = {
      minX: headerView.getFloat64(8),
      minY: headerView.getFloat64(0),
      stepX: headerView.getFloat64(24),
      stepY: headerView.getFloat64(16),
      nColumns: headerView.getInt32(36),
      nRows: headerView.getInt32(32)
    }; // ---------- BUILD A DATA VIEWER : ----------

    var dataView = new DataView(gtx, 40); // ---------- CREATE A GeoidGrid FOR THE GIVEN FILE DATA : ----------
    // formula for the max longitude : maxLongitude = minLongitude + deltaLongitude * (nColumns - 1)

    var maxX = metadata.minX + metadata.stepX * (metadata.nColumns - 1); // formula for the max latitude : maxLatitude = minLatitude + deltaLatitude * (nRows - 1)

    var maxY = metadata.minY + metadata.stepY * (metadata.nRows - 1);
    var dataExtent = new _Extent["default"](options["in"].crs || 'EPSG:4326', metadata.minX, maxX, metadata.minY, maxY);
    var dataStep = new THREE.Vector2(metadata.stepX, metadata.stepY);
    return Promise.resolve(new _GeoidGrid["default"](dataExtent, dataStep, function getData(verticalIndex, horizontalIndex) {
      // formula to get the index of a geoid height from a latitude and longitude indexes is :
      // ``(nColumns * latIndex + lonIndex) * nBytes``, where nBytes stands for the number of bytes geoid
      // height data are encoded on.
      if (dataType === 'float') {
        return dataView.getFloat32((metadata.nColumns * verticalIndex + horizontalIndex) * BYTES_PER_FLOAT);
      } else if (dataType === 'double') {
        return dataView.getFloat64((metadata.nColumns * verticalIndex + horizontalIndex) * BYTES_PER_DOUBLE);
      }
    }));
  }
};
exports["default"] = _default;