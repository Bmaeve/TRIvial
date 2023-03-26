"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var THREE = _interopRequireWildcard(require("three"));

var _DEMUtils = _interopRequireDefault(require("../Utils/DEMUtils"));

var _Coordinates = _interopRequireDefault(require("./Geographic/Coordinates"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var coord = new _Coordinates["default"]('EPSG:4326');
var rect; // set it once

var STYLE_TRANSFORM = '';

if (document.documentElement.style.transform !== undefined) {
  STYLE_TRANSFORM = 'transform';
} else if (document.documentElement.style.webkitTransform !== undefined) {
  STYLE_TRANSFORM = 'webkitTransform';
} else if (document.documentElement.style.mozTransform !== undefined) {
  STYLE_TRANSFORM = 'mozTransform';
} else if (document.documentElement.style.oTransform !== undefined) {
  STYLE_TRANSFORM = 'oTransform';
} else {
  STYLE_TRANSFORM = 'transform';
}
/**
 * An object that handles the display of a text and/or an icon, linked to a 3D
 * position. The content of the `Label` is managed through a DOM object, in a
 * `<div>` handled by the `Label2DRenderer`.
 *
 * @property {boolean} isLabel - Used to checkout whether this object is a
 * Label. Default is true. You should not change this, as it is used internally
 * for optimisation.
 * @property {Element} content - The DOM object that contains the content of the
 * label. The style and the position are applied on this object. All labels
 * contain the `itowns-label` class, as well as a specific class related to the
 * layer linked to it: `itowns-label-[layer-id]` (replace `[layer-id]` by the
 * correct string).
 * @property {THREE.Vector3} position - The position in the 3D world of the
 * label.
 * @property {number} padding - sets the padding area on all four sides of an element at once.
 * @property {Coordinates} coordinates - The coordinates of the label.
 * @property {number} order - Order of the label that will be read from the
 * style. It helps sorting and prioritizing a Label during render.
 */


var Label = /*#__PURE__*/function (_THREE$Object3D) {
  (0, _inherits2["default"])(Label, _THREE$Object3D);

  var _super = _createSuper(Label);

  /**
   * @param {Element|string} content - The content; can be a
   * string, with or without HTML tags in it, or it can be an Element.
   * @param {Coordinates} coordinates - The world coordinates, where to place
   * the Label.
   * @param {Style} style - The style to apply to the content. Once the style
   * is applied, it cannot be changed directly. However, if it really needed,
   * it can be accessed through `label.content.style`, but it is highly
   * discouraged to do so.
   * @param {Object} [sprites] the sprites.
   */
  function Label() {
    var _this;

    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var coordinates = arguments.length > 1 ? arguments[1] : undefined;
    var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var sprites = arguments.length > 3 ? arguments[3] : undefined;
    (0, _classCallCheck2["default"])(this, Label);

    if (coordinates == undefined) {
      throw new Error('coordinates are mandatory to add a Label');
    }

    _this = _super.call(this);
    var _visible = _this.visible; // can't do an ES6 setter/getter here

    Object.defineProperty((0, _assertThisInitialized2["default"])(_this), 'visible', {
      set: function set(v) {
        if (v != _visible) {
          // avoid changing the style
          _visible = v;
          this.content.style.display = v ? 'block' : 'none'; // TODO: add smooth transition for fade in/out
        }
      },
      get: function get() {
        return _visible;
      }
    });
    _this.isLabel = true;
    _this.coordinates = coordinates;
    _this.projectedPosition = {
      x: 0,
      y: 0
    };
    _this.boundaries = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };

    if (typeof content === 'string') {
      _this.content = document.createElement('div');
      _this.content.textContent = content;
    } else {
      _this.content = content.cloneNode(true);
    }

    _this.content.classList.add('itowns-label');

    _this.content.style.userSelect = 'none';
    _this.content.style.position = 'absolute';
    _this.baseContent = content;

    if (style.isStyle) {
      _this.anchor = style.getTextAnchorPosition();
      _this.styleOffset = style.text.offset;

      if (typeof content === 'string') {
        if (style.text.haloWidth > 0) {
          _this.content.classList.add('itowns-stroke-single');
        }

        style.applyToHTML(_this.content, sprites);
      }
    } else {
      _this.anchor = [0, 0];
      _this.styleOffset = [0, 0];
    }

    _this.icon = _this.content.getElementsByClassName('itowns-icon')[0];
    _this.iconOffset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    _this.zoom = {
      min: style.zoom && style.zoom.min != undefined ? style.zoom.min : 2,
      max: style.zoom && style.zoom.max != undefined ? style.zoom.max : 24
    };
    _this.order = style.order || 0; // Padding value, to avoid labels being too close to each other.

    _this.padding = 2;
    return _this;
  }
  /**
   * Moves a label on the screen, using screen coordinates. It updates the
   * boundaries as it moves it.
   *
   * @param {number} x - X coordinates in pixels, from left.
   * @param {number} y - Y coordinates in pixels, from top.
   */


  (0, _createClass2["default"])(Label, [{
    key: "updateProjectedPosition",
    value: function updateProjectedPosition(x, y) {
      var X = Math.round(x);
      var Y = Math.round(y);

      if (X != this.projectedPosition.x || Y != this.projectedPosition.y) {
        this.projectedPosition.x = X;
        this.projectedPosition.y = Y;
        this.boundaries.left = x + this.offset.left - this.padding;
        this.boundaries.right = x + this.offset.right + this.padding;
        this.boundaries.top = y + this.offset.top - this.padding;
        this.boundaries.bottom = y + this.offset.bottom + this.padding; // The boundaries of the label are the union of the boundaries of the text
        // and the boundaries of the icon, if it exists.
        // Checking if this.icon is not only zeros is mandatory, to prevent case
        // when a boundary is set to x or y coordinate

        if (this.iconOffset.left !== 0 || this.iconOffset.right !== 0 || this.iconOffset.top !== 0 || this.iconOffset.bottom !== 0) {
          this.boundaries.left = Math.min(this.boundaries.left, x + this.iconOffset.left);
          this.boundaries.right = Math.max(this.boundaries.right, x + this.iconOffset.right);
          this.boundaries.top = Math.min(this.boundaries.top, y + this.iconOffset.top);
          this.boundaries.bottom = Math.max(this.boundaries.bottom, y + this.iconOffset.bottom);
        }
      }
    }
  }, {
    key: "updateCSSPosition",
    value: function updateCSSPosition() {
      // translate all content according to its given anchor
      this.content.style[STYLE_TRANSFORM] = "translate(".concat(this.projectedPosition.x + this.offset.left, "px, ").concat(this.projectedPosition.y + this.offset.top, "px)"); // translate possible icon inside content to cancel anchoring on it, so that it can later be positioned
      // according to its own anchor

      if (this.icon) {
        this.icon.style[STYLE_TRANSFORM] = "translate(".concat(-this.offset.left, "px, ").concat(-this.offset.top, "px)");
      }
    }
    /**
     * Updates the screen dimensions of the label, using
     * `getBoundingClientRect`.  It updates `width` and `height` property of the
     * label, and the boundaries.
     */

  }, {
    key: "initDimensions",
    value: function initDimensions() {
      if (!this.offset) {
        rect = this.content.getBoundingClientRect();
        var width = Math.round(rect.width);
        var height = Math.round(rect.height);
        this.offset = {
          left: width * this.anchor[0] + this.styleOffset[0],
          top: height * this.anchor[1] + this.styleOffset[1]
        };
        this.offset.right = this.offset.left + width;
        this.offset.bottom = this.offset.top + height;

        if (this.icon) {
          rect = this.icon.getBoundingClientRect();
          this.iconOffset = {
            left: Math.floor(rect.x),
            top: Math.floor(rect.y),
            right: Math.ceil(rect.x + rect.width),
            bottom: Math.ceil(rect.y + rect.height)
          };
        }
      }
    }
  }, {
    key: "update3dPosition",
    value: function update3dPosition(crs) {
      this.coordinates.as(crs, coord);
      coord.toVector3(this.position);
      this.parent.worldToLocal(this.position);
      this.updateMatrixWorld();
    }
  }, {
    key: "updateElevationFromLayer",
    value: function updateElevationFromLayer(layer) {
      var elevation = Math.max(0, _DEMUtils["default"].getElevationValueAt(layer, this.coordinates, _DEMUtils["default"].FAST_READ_Z));

      if (elevation && elevation != this.coordinates.z) {
        this.coordinates.z = elevation;
        this.updateHorizonCullingPoint();
        return true;
      }
    }
  }, {
    key: "updateHorizonCullingPoint",
    value: function updateHorizonCullingPoint() {
      if (this.horizonCullingPoint) {
        this.getWorldPosition(this.horizonCullingPoint);
      }
    }
  }]);
  return Label;
}(THREE.Object3D);

var _default = Label;
exports["default"] = _default;