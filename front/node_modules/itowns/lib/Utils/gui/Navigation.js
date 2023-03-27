"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _View = require("../../Core/View");

var _Widget2 = _interopRequireDefault(require("./Widget"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var DEFAULT_OPTIONS = {
  displayCompass: true,
  display3DToggle: true,
  displayZoomIn: true,
  displayZoomOut: true,
  animationDuration: 500,
  position: 'bottom-left',
  direction: 'column'
};
var DEFAULT_BUTTONS = {
  compass: {
    id: 'compass',
    content: '',
    info: 'Rotate the camera to face North',
    parentId: 'widgets'
  },
  toggle3D: {
    id: '3d-button',
    content: '3D',
    info: 'Tilt the camera'
  },
  zoomIn: {
    id: 'zoom-in-button',
    content: '<span class="widget-zoom-button-logo"></span>',
    info: 'Zoom in',
    parentId: 'zoom-button-bar'
  },
  zoomOut: {
    id: 'zoom-out-button',
    content: '<span id="zoom-out-logo" class="widget-zoom-button-logo"></span>',
    info: 'Zoom out',
    parentId: 'zoom-button-bar'
  }
};
/**
 * A widget menu manager for navigation.
 *
 * To use it, you need to link the widgets' stylesheet to your html webpage. This stylesheet is included in
 * [itowns bundles](https://github.com/iTowns/itowns/releases) if you downloaded them, or it can be found in
 * `node_modules/itowns/examples/css` if you installed iTowns with npm. Otherwise, it can be found at
 * [this link](https://raw.githubusercontent.com/iTowns/itowns/master/examples/css/widgets.css). See
 * [this example](http://www.itowns-project.org/itowns/examples/#widgets_navigation) for more details.
 *
 * @extends Widget
 *
 * @property {HTMLElement}          domElement      An html div containing all navigation widgets.
 * @property {HTMLElement}          parentElement   The parent HTML container of `this.domElement`.
 * @property {HTMLButtonElement}    compass         The HTML button for the compass.
 * @property {HTMLButtonElement}    toggle3D        The HTML button for the 3D/2D toggle button.
 * @property {HTMLButtonElement}    zoomIn          The HTML button for the zoom-in button.
 * @property {HTMLButtonElement}    zoomOut         The HTML button for the zoom-out button.
 *
 * @example
 * // Create a Navigation widget in the bottom-right corner of an iTowns view domElement
 * const navigation = new Navigation(view, { position: 'bottom-right' };
 *
 * // Change the tooltip for the compass :
 * navigation.compass.title = 'new tooltip';
 *
 * // Change the method ran when clicking zoom-in button :
 * function newMethod() {
 *     // do something
 * }
 * navigation.zoomIn.onclick = newMethod;
 */

var _view = /*#__PURE__*/new WeakMap();

var _action = /*#__PURE__*/new WeakSet();

var _addDefaultButton = /*#__PURE__*/new WeakSet();

var Navigation = /*#__PURE__*/function (_Widget) {
  (0, _inherits2["default"])(Navigation, _Widget);

  var _super = _createSuper(Navigation);

  /**
   * @param   {GlobeView}     view                                    The iTowns view the navigation should be linked
                                                                      * to. For the moment, only `{@link GlobeView}`
                                                                      * is supported.
   * @param   {Object}        options                                 The navigation menu optional configuration.
   * @param   {HTMLElement}   [options.parentElement=view.domElement] The parent HTML container of the div which
                                                                      * contains navigation widgets.
   * @param   {boolean}       [options.displayCompass=true]           Whether the compass widget should be displayed.
   * @param   {boolean}       [options.display3DToggle=true]          Whether the navigation should include a widget
                                                                      * to toggle between top and oblique view.
   * @param   {boolean}       [options.displayZoomIn=true]            Whether the zoom-in widget should be displayed.
   * @param   {boolean}       [options.displayZoomOut=true]           Whether the zoom-out widget should be displayed.
   * @param   {number}        [options.animationDuration=500]         The duration of travel animations, when clicking
                                                                      * navigation widgets.
   * @param   {string}        [options.position='bottom-left']        Defines which corner of the `parentElement` the
                                                                      * navigation menu should be displayed to.
                                                                      * Possible values are `top-left`, `top-right`,
                                                                      * `bottom-left` and `bottom-right`. If the input
                                                                      * value does not match one of these, it will be
                                                                      * defaulted to `bottom-left`.
   * @param   {string}        [options.direction='column']            Whether the navigation menu should expand
                                                                      * horizontally or vertically. Possible values
                                                                      * are `column` and `row`. If the input value
                                                                      * does not match one of these, it will be
                                                                      * defaulted to `column`.
   * @param   {Object}        [options.translate]                     An optional translation of the navigation menu.
   * @param   {number}        [options.translate.x=0]                 The navigation menu translation along the page
                                                                      * x-axis.
   * @param   {number}        [options.translate.y=0]                 The navigation menu translation along the page
                                                                      * y-axis.
   */
  function Navigation(view) {
    var _options$displayCompa, _options$display3DTog, _options$displayZoomI, _options$displayZoomO;

    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, Navigation);

    // ---------- BUILD PROPERTIES ACCORDING TO DEFAULT OPTIONS AND OPTIONS PASSED IN PARAMETERS : ----------
    // Check if the view is supported.
    if (!view.isGlobeView) {
      throw new Error('\'Navigation\' plugin only supports \'GlobeView\'. Therefore, the \'view\' parameter must be a ' + '\'GlobeView\'.');
    } // `top`, `bottom`, `left` and `right` values for `position` option are not relevant for navigation widget.


    if (['top', 'bottom', 'left', 'right'].includes(options.position)) {
      console.warn('\'position\' optional parameter for \'Navigation\' is not a valid option. ' + "It will be set to '".concat(DEFAULT_OPTIONS.position, "'."));
      options.position = DEFAULT_OPTIONS.position;
    }

    _this = _super.call(this, view, options, DEFAULT_OPTIONS);

    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _addDefaultButton);

    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _action);

    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _view, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])((0, _assertThisInitialized2["default"])(_this), _view, view);
    _this.direction = options.direction || DEFAULT_OPTIONS.direction;

    if (!['column', 'row'].includes(_this.direction)) {
      console.warn('\'direction\' optional parameter for \'Navigation\' constructor is not a valid option. ' + "It will be set to '".concat(DEFAULT_OPTIONS.direction, "'."));
      _this.direction = DEFAULT_OPTIONS.direction;
    }

    _this.animationDuration = options.animationDuration === undefined ? DEFAULT_OPTIONS.animationDuration : options.animationDuration; // ---------- CREATE A DomElement WITH id AND classes RELEVANT TO THE WIDGET PROPERTIES : ----------
    // Create a div containing all widgets and add it to its specified parent.

    _this.domElement.id = 'widgets-navigation'; // Position widget div according to options.

    _this.domElement.classList.add("".concat(_this.direction, "-widget")); // ---------- CREATE THE DEFAULT WIDGETS IF NOT HIDDEN (COMPASS, 3D AND ZOOM BUTTONS) : ----------
    // Add a compass widget if requested.


    if ((_options$displayCompa = options.displayCompass) !== null && _options$displayCompa !== void 0 ? _options$displayCompa : DEFAULT_OPTIONS.displayCompass) {
      _this.compass = _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _addDefaultButton, _addDefaultButton2).call((0, _assertThisInitialized2["default"])(_this), DEFAULT_BUTTONS.compass, function () {
        _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _action, _action2).call((0, _assertThisInitialized2["default"])(_this), {
          heading: 0,
          tilt: 89.5
        });
      }); // Manage compass rotation when the view's camera is moved.

      view.addEventListener(_View.VIEW_EVENTS.CAMERA_MOVED, function (event) {
        _this.compass.style.transform = "rotate(".concat(-event.heading, "deg)");
      });
    } // Add a 3D toggle button if requested.


    if ((_options$display3DTog = options.display3DToggle) !== null && _options$display3DTog !== void 0 ? _options$display3DTog : DEFAULT_OPTIONS.display3DToggle) {
      _this.toggle3D = _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _addDefaultButton, _addDefaultButton2).call((0, _assertThisInitialized2["default"])(_this), DEFAULT_BUTTONS.toggle3D, function () {
        _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _action, _action2).call((0, _assertThisInitialized2["default"])(_this), {
          tilt: (0, _classPrivateFieldGet2["default"])((0, _assertThisInitialized2["default"])(_this), _view).controls.getTilt() < 89 ? 89.5 : 40
        });
      }); // Manage button content toggle when the view's camera is moved.

      view.addEventListener(_View.VIEW_EVENTS.CAMERA_MOVED, function (event) {
        _this.toggle3D.innerHTML = event.tilt < 89 ? '2D' : '3D';
      });
    } // Add a zoom-in button if requested.


    if ((_options$displayZoomI = options.displayZoomIn) !== null && _options$displayZoomI !== void 0 ? _options$displayZoomI : DEFAULT_OPTIONS.displayZoomIn) {
      _this.zoomIn = _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _addDefaultButton, _addDefaultButton2).call((0, _assertThisInitialized2["default"])(_this), DEFAULT_BUTTONS.zoomIn, function () {
        _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _action, _action2).call((0, _assertThisInitialized2["default"])(_this), {
          zoom: Math.min(20, (0, _classPrivateFieldGet2["default"])((0, _assertThisInitialized2["default"])(_this), _view).controls.getZoom() + 1)
        });
      });
    } // Add a zoom-out button if requested.


    if ((_options$displayZoomO = options.displayZoomOut) !== null && _options$displayZoomO !== void 0 ? _options$displayZoomO : DEFAULT_OPTIONS.displayZoomOut) {
      _this.zoomOut = _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _addDefaultButton, _addDefaultButton2).call((0, _assertThisInitialized2["default"])(_this), DEFAULT_BUTTONS.zoomOut, function () {
        _classPrivateMethodGet((0, _assertThisInitialized2["default"])(_this), _action, _action2).call((0, _assertThisInitialized2["default"])(_this), {
          zoom: Math.max(3, (0, _classPrivateFieldGet2["default"])((0, _assertThisInitialized2["default"])(_this), _view).controls.getZoom() - 1)
        });
      });
    }

    return _this;
  }
  /**
   *
   * @param   {string}    id              The unique id the created button should be given.
   * @param   {string}    [content='']    An HTML string defining the content of the button.
   * @param   {string}    [title='']      An HTML string defining information on the button. This string will be
                                          * displayed in a tooltip when hovering the button.
   * @param   {function}  [onclick] The method that should be executed when the button is clicked on.
   * @param   {string}    [parentId]      The unique id of a button bar in which the created button should be added.
                                          * A button bar is a group which contains one or several buttons. All
                                          * buttons created with Navigation are in a button bar. If the given id does
                                          * not match an already existing button bar, a new button bar will be created
                                          * with this id. If no id is given, a button bar will be created with no id.
                                          * The later case can be useful for creating isolated buttons.
   *
   * @returns {HTMLButtonElement}     The created button.
   */


  (0, _createClass2["default"])(Navigation, [{
    key: "addButton",
    value: function addButton(id) {
      var _this2 = this;

      var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var onclick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
      var parentId = arguments.length > 4 ? arguments[4] : undefined;
      var buttonBar = document.getElementById(parentId);

      if (!buttonBar) {
        buttonBar = this.addButtonBar(parentId);
      }

      var button = document.createElement('button');
      button.className = 'widget-button';
      button.id = id;
      button.innerHTML = content;
      button.title = title;
      button.onclick = onclick;
      buttonBar.appendChild(button); // The buttons must not be focused using tab key.

      button.tabIndex = -1; // When releasing the mouse after clicking the button, we give the focus back to the view. Therefore, we can use
      // key events on the view without having to click the view to grant it focus.

      window.addEventListener('pointerup', function () {
        if (document.activeElement === button) {
          (0, _classPrivateFieldGet2["default"])(_this2, _view).domElement.focus();
        }
      });
      return button;
    }
  }, {
    key: "addButtonBar",
    value: function addButtonBar(id) {
      var buttonBar = document.createElement('div');
      buttonBar.className = 'widget-button-bar';

      if (id) {
        buttonBar.id = id;
      }

      this.domElement.appendChild(buttonBar);
      return buttonBar;
    }
  }]);
  return Navigation;
}(_Widget2["default"]);

function _action2(params) {
  params.time = this.animationDuration;
  return (0, _classPrivateFieldGet2["default"])(this, _view).controls.lookAtCoordinate(params);
}

function _addDefaultButton2(settings, onclick) {
  return this.addButton(settings.id, settings.content, settings.info, onclick, settings.parentId);
}

var _default = Navigation;
exports["default"] = _default;