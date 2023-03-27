"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Coordinates = _interopRequireDefault(require("../../Core/Geographic/Coordinates"));

var _MainLoop = require("../../Core/MainLoop");

var _PlanarView = _interopRequireDefault(require("../../Core/Prefab/PlanarView"));

var _Camera = require("../../Renderer/Camera");

var _Widget2 = _interopRequireDefault(require("./Widget"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_OPTIONS = {
  minScale: 1 / 500000,
  maxScale: 1 / 5E8,
  zoomRatio: 1 / 30,
  width: 150,
  height: 150,
  position: 'bottom-left'
};
/**
 * A widget for minimap
 *
 * To use it, you need to link the widgets' stylesheet to your html webpage. This stylesheet is included in
 * [itowns bundles](https://github.com/iTowns/itowns/releases) if you downloaded them, or it can be found in
 * `node_modules/itowns/examples/css` if you installed iTowns with npm. Otherwise, it can be found at
 * [this link](https://raw.githubusercontent.com/iTowns/itowns/master/examples/css/widgets.css). See
 * [this example](http://www.itowns-project.org/itowns/examples/#widgets_minimap) for more details.
 *
 * @extends Widget
 *
 * @property    {HTMLElement}   domElement      An html div containing the minimap.
 * @property    {HTMLElement}   parentElement   The parent HTML container of `this.domElement`.
 */

var Minimap = /*#__PURE__*/function (_Widget) {
  (0, _inherits2["default"])(Minimap, _Widget);

  var _super = _createSuper(Minimap);

  /**
   * @param   {GlobeView}             view                                    The iTowns view the minimap should be
                                                                              * linked to. Only {@link GlobeView} is
                                                                              * supported at the moment.
   * @param   {ColorLayer}            layer                                   The {@link ColorLayer} that should be
                                                                              * displayed on the minimap.
   * @param   {Object}                [options]                               The minimap optional configuration.
   * @param   {HTMLElement}           [options.parentElement=view.domElement] The parent HTML container of the div
                                                                              * which contains minimap widgets.
   * @param   {number}                [options.size]                          The size of the minimap. It is a number
                                                                              * that describes both width and height
                                                                              * in pixels of the minimap.
   * @param   {number}                [options.width=150]                     The width in pixels of the minimap.
   * @param   {number}                [options.height=150]                    The height in pixels of the minimap.
   * @param   {string}                [options.position='bottom-left']        Defines which position within the
                                                                              * `parentElement` the minimap should be
                                                                              * displayed to. Possible values are
                                                                              * `top`, `bottom`, `left`, `right`,
                                                                              * `top-left`, `top-right`, `bottom-left`
                                                                              * and `bottom-right`. If the input value
                                                                              * does not match one of these, it will
                                                                              * be defaulted to `bottom-left`.
   * @param   {Object}                [options.translate]                     An optional translation of the minimap.
   * @param   {number}                [options.translate.x=0]                 The minimap translation along the page
                                                                              * x-axis.
   * @param   {number}                [options.translate.y=0]                 The minimap translation along the page
                                                                              * y-axis.
   * @param   {HTMLElement|string}    [options.cursor]                        An html element or an HTML string
                                                                              * describing a cursor showing minimap
                                                                              * view camera target position at the
                                                                              * center of the minimap.
   * @param   {number}                [options.minScale=1/2000]               The minimal scale the minimap can reach.
   * @param   {number}                [options.maxScale=1/1_250_000]          The maximal scale the minimap can reach.
   * @param   {number}                [options.zoomRatio=1/30]                The ratio between minimap camera zoom
                                                                              * and view camera zoom.
   * @param   {number}                [options.pitch=0.28]                    The screen pixel pitch, used to compute
                                                                              * view and minimap scale.
   */
  function Minimap(view, layer) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, Minimap);

    // ---------- BUILD PROPERTIES ACCORDING TO DEFAULT OPTIONS AND OPTIONS PASSED IN PARAMETERS : ----------
    if (!view.isGlobeView) {
      throw new Error('\'Minimap\' plugin only supports \'GlobeView\'. Therefore, the \'view\' parameter must be a ' + '\'GlobeView\'.');
    }

    if (!layer.isColorLayer) {
      throw new Error('\'layer\' parameter form \'Minimap\' constructor should be a \'ColorLayer\'.');
    }

    _this = _super.call(this, view, options, DEFAULT_OPTIONS);
    _this.minScale = options.minScale || DEFAULT_OPTIONS.minScale;
    _this.maxScale = options.maxScale || DEFAULT_OPTIONS.maxScale; // TODO : it could be interesting to be able to specify a method as zoomRatio parameter. This method could
    //  return a zoom ratio from the scale of the minimap.

    _this.zoomRatio = options.zoomRatio || DEFAULT_OPTIONS.zoomRatio; // ---------- this.domElement SETTINGS SPECIFIC TO MINIMAP : ----------

    _this.domElement.id = 'widgets-minimap'; // Display a cursor at the center of the minimap, if requested.

    if (options.cursor) {
      // Wrap cursor domElement inside a div to center it in minimap.
      var cursorWrapper = document.createElement('div');
      cursorWrapper.id = 'cursor-wrapper';

      _this.domElement.appendChild(cursorWrapper); // Add specified cursor to its wrapper.


      if (typeof options.cursor === 'string') {
        cursorWrapper.innerHTML = options.cursor;
      } else if (options.cursor instanceof HTMLElement) {
        cursorWrapper.appendChild(options.cursor);
      }
    } // ---------- CREATE A MINIMAP View AND DISPLAY DATA PASSED IN Layer PARAMETER : ----------


    _this.view = new _PlanarView["default"](_this.domElement, layer.source.extent, {
      camera: {
        type: _Camera.CAMERA_TYPE.ORTHOGRAPHIC
      },
      placement: layer.source.extent,
      // TODO : the default placement should be the view extent for ortho camera
      noControls: true,
      maxSubdivisionLevel: view.tileLayer.maxSubdivisionLevel,
      disableFocusOnStart: true
    });

    _this.view.addLayer(layer); // TODO : should this promise be returned by constructor so that user can use it ?
    // Prevent the minimap domElement to get focus when clicked, and prevent click event to be propagated to the
    // main view controls.


    _this.domElement.addEventListener('pointerdown', function (event) {
      event.preventDefault();
    }); // Store minimap view camera3D in constant for code convenience.


    var camera3D = _this.view.camera.camera3D; // ---------- UPDATE MINIMAP VIEW WHEN UPDATING THE MAIN VIEW : ----------
    // The minimal and maximal value the minimap camera3D zoom can reach in order to stay in the scale limits.

    var initialScale = _this.view.getScale(options.pitch);

    var minZoom = camera3D.zoom * _this.maxScale / initialScale;
    var maxZoom = camera3D.zoom * _this.minScale / initialScale; // Coordinates used to transform position vectors from the main view CRS to the minimap view CRS.

    var mainViewCoordinates = new _Coordinates["default"](view.referenceCrs);
    var viewCoordinates = new _Coordinates["default"](_this.view.referenceCrs);
    var targetPosition = view.controls.getCameraTargetPosition();
    view.addFrameRequester(_MainLoop.MAIN_LOOP_EVENTS.AFTER_RENDER, function () {
      // Update minimap camera zoom
      var distance = view.camera.camera3D.position.distanceTo(targetPosition);
      var scale = view.getScaleFromDistance(options.pitch, distance);
      camera3D.zoom = _this.zoomRatio * maxZoom * scale / _this.minScale;
      camera3D.zoom = Math.min(Math.max(camera3D.zoom, minZoom), maxZoom);
      camera3D.updateProjectionMatrix(); // Update minimap camera position.

      mainViewCoordinates.setFromVector3(view.controls.getCameraTargetPosition());
      mainViewCoordinates.as(_this.view.referenceCrs, viewCoordinates);
      camera3D.position.x = viewCoordinates.x;
      camera3D.position.y = viewCoordinates.y;
      camera3D.updateMatrixWorld(true);

      _this.view.notifyChange(camera3D);
    });
    return _this;
  }

  return (0, _createClass2["default"])(Minimap);
}(_Widget2["default"]);

var _default = Minimap;
exports["default"] = _default;