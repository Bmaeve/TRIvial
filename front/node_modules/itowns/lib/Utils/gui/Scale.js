"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _GlobeControls = require("../../Controls/GlobeControls");

var _GlobeView = require("../../Core/Prefab/GlobeView");

var _PlanarControls = require("../../Controls/PlanarControls");

var _View = require("../../Core/View");

var _Widget2 = _interopRequireDefault(require("./Widget"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_OPTIONS = {
  width: 200,
  height: 30,
  position: 'bottom-left'
};
/**
 * A widget for scale
 *
 * To use it, you need to link the widgets' stylesheet to your html webpage. This stylesheet is included in
 * [itowns bundles](https://github.com/iTowns/itowns/releases) if you downloaded them, or it can be found in
 * `node_modules/itowns/examples/css` if you installed iTowns with npm. Otherwise, it can be found at
 * [this link](https://raw.githubusercontent.com/iTowns/itowns/master/examples/css/widgets.css). See
 * [this example](http://www.itowns-project.org/itowns/examples/#widgets_scale) for more details.
 *
 * @extends Widget
 *
 * @property    {HTMLElement}   domElement      An html div containing the scale.
 * @property    {HTMLElement}   parentElement   The parent HTML container of `this.domElement`.
 */

var Scale = /*#__PURE__*/function (_Widget) {
  (0, _inherits2["default"])(Scale, _Widget);

  var _super = _createSuper(Scale);

  /**
   * @param   {View}                  view                                    The iTowns view the scale should be
                                                                              * linked to. If it is a
                                                                              * {@link PlanarView} or a
                                                                              * {@link GlobeView}, the scale will be
                                                                              * automatically updated. Otherwise, user
                                                                              * will need to implement the update
                                                                              * automation using the `Scale.update`
                                                                              * method.
   * @param   {Object}                [options]                               The scale optional configuration.
   * @param   {HTMLElement}           [options.parentElement=view.domElement] The parent HTML container of the div
                                                                              * which contains scale widgets.
   * @param   {number}                [options.width=200]                     The width in pixels of the scale.
   * @param   {number}                [options.height=30]                     The height in pixels of the scale.
   * @param   {string}                [options.position='bottom-left']        Defines which position within the
                                                                              * `parentElement` the scale should be
                                                                              * displayed to. Possible values are
                                                                              * `top`, `bottom`, `left`, `right`,
                                                                              * `top-left`, `top-right`, `bottom-left`
                                                                              * and `bottom-right`. If the input value
                                                                              * does not match one of these, it will
                                                                              * be defaulted to `bottom-left`.
   * @param   {Object}                [options.translate]                     An optional translation of the scale.
   * @param   {number}                [options.translate.x=0]                 The scale translation along the page
                                                                              * x-axis.
   * @param   {number}                [options.translate.y=0]                 The scale translation along the page
                                                                              * y-axis.
   */
  function Scale(view) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, Scale);
    // ---------- BUILD PROPERTIES ACCORDING TO DEFAULT OPTIONS AND OPTIONS PASSED IN PARAMETERS : ----------
    _this = _super.call(this, view, options, DEFAULT_OPTIONS); // ---------- this.domElement SETTINGS SPECIFIC TO SCALE : ----------

    _this.domElement.id = 'widgets-scale';
    _this.view = view; // Initialize the text content of the scale, which will later be updated by a numerical value.

    _this.domElement.innerHTML = 'Scale';
    _this.width = options.width || DEFAULT_OPTIONS.width;

    if (_this.view.isGlobeView) {
      _this.view.addEventListener(_GlobeView.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED, function () {
        _this.update();
      });

      _this.view.controls.addEventListener(_GlobeControls.CONTROL_EVENTS.RANGE_CHANGED, function () {
        _this.update();
      });
    } else if (_this.view.isPlanarView) {
      _this.view.addEventListener(_View.VIEW_EVENTS.INITIALIZED, function () {
        _this.update();
      });

      _this.view.addEventListener(_PlanarControls.PLANAR_CONTROL_EVENT.MOVED, function () {
        _this.update();
      });
    } else {
      console.warn('The \'view\' linked to scale widget is neither a \'GlobeView\' nor a \'PlanarView\'. The ' + 'scale wont automatically update. You can implement its update automation using \'Scale.update\' ' + 'method.');
    }

    return _this;
  }

  (0, _createClass2["default"])(Scale, [{
    key: "addEventListeners",
    value: function addEventListeners() {}
    /**
     * Update the scale size and content according to view camera position.
     */

  }, {
    key: "update",
    value: function update() {
      // Calculate the rounded metric distance which matches the scale width in pixels.
      var metricDistance = Math.round(this.view.getPixelsToMeters(this.width));
      var digit = Math.pow(10, metricDistance.toString().length - 1);
      metricDistance = Math.round(metricDistance / digit) * digit;
      var pixelDistance = this.view.getMetersToPixels(metricDistance);
      var unit = 'm';

      if (metricDistance >= 1000) {
        metricDistance /= 1000;
        unit = 'km';
      }

      this.domElement.innerHTML = "".concat(metricDistance, " ").concat(unit);
      this.domElement.style.width = "".concat(pixelDistance, "px");
    }
  }]);
  return Scale;
}(_Widget2["default"]);

var _default = Scale;
exports["default"] = _default;