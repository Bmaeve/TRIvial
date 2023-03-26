"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var _display = /*#__PURE__*/new WeakMap();

/**
 * An interface that stores common methods for all specific widgets.
 *
 * @hideconstructor
 */
var Widget = /*#__PURE__*/function () {
  function Widget(view) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultOptions = arguments.length > 2 ? arguments[2] : undefined;
    (0, _classCallCheck2["default"])(this, Widget);

    _classPrivateFieldInitSpec(this, _display, {
      writable: true,
      value: void 0
    });

    this.parentElement = options.parentElement || view.domElement;
    this.position = options.position || defaultOptions.position;

    if (!['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'bottom', 'left', 'right'].includes(this.position)) {
      console.warn('\'position\' optional parameter for \'Widget\' constructor is not a valid option. ' + "It will be set to '".concat(defaultOptions.position, "'."));
      this.position = defaultOptions.position;
    } // ---------- CREATE A DomElement WITH id, classes AND style RELEVANT TO THE WIDGET PROPERTIES : ----------
    // Create a div containing minimap widget and add it to its specified parent.


    this.domElement = document.createElement('div');
    this.parentElement.appendChild(this.domElement); // Size widget according to options.

    this.domElement.style.width = "".concat(options.width || options.size || defaultOptions.width, "px");
    this.domElement.style.height = "".concat(options.height || options.size || defaultOptions.height, "px"); // Position widget according to options.

    var positionArray = this.position.split('-');
    this.domElement.classList.add("".concat(positionArray[0], "-widget"));

    if (positionArray[1]) {
      this.domElement.classList.add("".concat(positionArray[1], "-widget"));
    } else {
      // If only one position parameter was given, center the domElement on the other axis.
      // TODO : at this stage, offsetWidth and offsetHeight do no include borders. This should be worked around.
      switch (positionArray[0]) {
        case 'top':
        case 'bottom':
          this.domElement.style.left = "calc(50% - ".concat(this.domElement.offsetWidth / 2, "px)");
          break;

        case 'left':
        case 'right':
          this.domElement.style.top = "calc(50% - ".concat(this.domElement.offsetHeight / 2, "px)");
          break;

        default:
          break;
      }
    } // Translate widget div according to optional translate parameter.


    if (options.translate) {
      this.domElement.style.transform = "translate(".concat(options.translate.x || 0, "px, ").concat(options.translate.y || 0, "px)");
    } // Prevent triggering `GlobeControls` and `PlanarControls` mouse or pointer events when clicking the search bar.
    // For example, this prevents triggering an animated travel when double-clicking search bar in a `GlobeView`.


    this.domElement.addEventListener('pointerdown', function (e) {
      e.stopPropagation();
    });
    this.domElement.addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });
  }
  /**
   * Change the widget style `display` property so that the widget becomes visible.
   */


  (0, _createClass2["default"])(Widget, [{
    key: "show",
    value: function show() {
      this.domElement.style.display = (0, _classPrivateFieldGet2["default"])(this, _display);
    }
    /**
     * Change the widget style `display` property so that the widget becomes invisible.
     */

  }, {
    key: "hide",
    value: function hide() {
      (0, _classPrivateFieldSet2["default"])(this, _display, window.getComputedStyle(this.domElement).display);
      this.domElement.style.display = 'none';
    }
  }]);
  return Widget;
}();

var _default = Widget;
exports["default"] = _default;