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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CONTROL_KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  BOTTOM: 40,
  SPACE: 32,
  SHIFT: 16,
  CTRL: 17,
  S: 83
}; // TODO : a class should be made for `State`, and the properties marked with `_` prefix should be made private

var DEFAULT_STATES = {
  ORBIT: {
    enable: true,
    mouseButton: THREE.MOUSE.LEFT,
    "double": false,
    keyboard: CONTROL_KEYS.CTRL,
    finger: 2,
    _event: 'rotate'
  },
  MOVE_GLOBE: {
    enable: true,
    mouseButton: THREE.MOUSE.LEFT,
    "double": false,
    finger: 1,
    _event: 'drag'
  },
  DOLLY: {
    enable: true,
    mouseButton: THREE.MOUSE.MIDDLE,
    "double": false,
    finger: 2,
    _event: 'dolly'
  },
  PAN: {
    enable: true,
    mouseButton: THREE.MOUSE.RIGHT,
    "double": false,
    finger: 3,
    _event: 'pan'
  },
  PANORAMIC: {
    enable: true,
    mouseButton: THREE.MOUSE.LEFT,
    "double": false,
    keyboard: CONTROL_KEYS.SHIFT,
    _event: 'panoramic'
  },
  TRAVEL_IN: {
    enable: true,
    mouseButton: THREE.MOUSE.LEFT,
    "double": true,
    _event: 'travel_in',
    _trigger: true,
    _direction: 'in'
  },
  TRAVEL_OUT: {
    enable: false,
    "double": false,
    _event: 'travel_out',
    _trigger: true,
    _direction: 'out'
  },
  ZOOM: {
    enable: true,
    _event: 'zoom',
    _trigger: true
  },
  PAN_UP: {
    enable: true,
    keyboard: CONTROL_KEYS.UP,
    "double": false,
    _event: 'pan',
    _trigger: true,
    _direction: 'up'
  },
  PAN_BOTTOM: {
    enable: true,
    keyboard: CONTROL_KEYS.BOTTOM,
    "double": false,
    _event: 'pan',
    _trigger: true,
    _direction: 'bottom'
  },
  PAN_LEFT: {
    enable: true,
    keyboard: CONTROL_KEYS.LEFT,
    "double": false,
    _event: 'pan',
    _trigger: true,
    _direction: 'left'
  },
  PAN_RIGHT: {
    enable: true,
    keyboard: CONTROL_KEYS.RIGHT,
    "double": false,
    _event: 'pan',
    _trigger: true,
    _direction: 'right'
  }
};
var viewCoords = new THREE.Vector2();
/**
 * @typedef {Object} StateControl~State
 * @property {boolean} enable=true Indicate whether the state is enabled or not.
 * @property {Number} [mouseButton] The mouse button bound to this state.
 * @property {Number} [keyboard] The keyCode of the keyboard input bound to this state.
 * @property {Number} [finger] The number of fingers on the pad bound to this state.
 * @property {boolean} [double] True if the mouse button bound to this state must be pressed twice. For
                                * example, if `double` is set to true with a `mouseButton` set to left click,
                                * the State will be bound to a double click mouse button.
 */

/**
 * It represents the control's states.
 * Each {@link State} is a control mode of the camera and how to interact with
 * the interface to activate this mode.
 * @class StateControl
 *
 * @property {State}    NONE        {@link State} when camera is idle.
 * @property {State}    ORBIT       {@link State} describing camera orbiting movement : the camera moves around its
                                    * target at a constant distance from it.
 * @property {State}    DOLLY       {@link State} describing camera dolly movement : the camera moves forward or
                                    * backward from its target.
 * @property {State}    PAN         {@link State} describing camera pan movement : the camera moves parallel to the
                                    * current view plane.
 * @property {State}    MOVE_GLOBE  {@link State} describing camera drag movement : the camera is moved around the view
                                    * to give the feeling that the view is dragged under a static camera.
 * @property {State}    PANORAMIC   {@link State} describing camera panoramic movement : the camera is rotated around
                                    * its own position.
 * @property {State}    TRAVEL_IN   {@link State} describing camera travel in movement : the camera is zoomed in toward
                                    * a given position. The target position depends on the key/mouse binding of this
                                    * state. If bound to a mouse button, the target position is the mouse position.
                                    * Otherwise, it is the center of the screen.
 * @property {State}    TRAVEL_OUT  {@link State} describing camera travel out movement : the camera is zoomed out from
                                    * a given position. The target position depends on the key/mouse binding of this
                                    * state. If bound to a mouse button, the target position is the mouse position.
                                    * Otherwise, it is the center of the screen. It is disabled by default.
 * @property {State}    ZOOM        {@link State} describing camera zoom in and out movement.
 * @property {boolean}  enable      Defines whether all input will be communicated to the associated `Controls` or not.
                                    * Default is true.
 * @property {boolean}  enableKeys  Defines whether keyboard input will be communicated to the associated `Controls` or
                                    * not. Default is true.
 */

var StateControl = /*#__PURE__*/function (_THREE$EventDispatche) {
  (0, _inherits2["default"])(StateControl, _THREE$EventDispatche);

  var _super = _createSuper(StateControl);

  function StateControl(view) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, StateControl);
    _this = _super.call(this);
    _this._view = view;
    _this._domElement = view.domElement;
    var enabled = true;
    Object.defineProperty((0, _assertThisInitialized2["default"])(_this), 'enabled', {
      get: function get() {
        return enabled;
      },
      set: function set(value) {
        if (!value) {
          _this.onKeyUp();

          _this.onPointerUp();
        }

        enabled = value;
      }
    }); // Set to true to disable use of the keys

    var enableKeys = true;
    Object.defineProperty((0, _assertThisInitialized2["default"])(_this), 'enableKeys', {
      get: function get() {
        return enableKeys;
      },
      set: function set(value) {
        if (!value) {
          _this.onKeyUp();
        }

        enableKeys = value;
      }
    });
    _this.NONE = {};
    var currentState = _this.NONE;
    Object.defineProperty((0, _assertThisInitialized2["default"])(_this), 'currentState', {
      get: function get() {
        return currentState;
      },
      set: function set(newState) {
        if (currentState !== newState) {
          var previous = currentState;
          currentState = newState;

          _this.dispatchEvent({
            type: 'state-changed',
            viewCoords: viewCoords,
            previous: previous
          });
        }
      }
    }); // TODO : the 4 next properties should be made private when ES6 allows it

    _this._clickTimeStamp = 0;
    _this._lastMousePressed = {
      viewCoords: new THREE.Vector2()
    };
    _this._currentMousePressed = undefined;
    _this._currentKeyPressed = undefined;
    _this._onPointerDown = _this.onPointerDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onPointerMove = _this.onPointerMove.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onPointerUp = _this.onPointerUp.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onMouseWheel = _this.onMouseWheel.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onKeyUp = _this.onKeyUp.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onBlur = _this.onBlur.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onContextMenu = _this.onContextMenu.bind((0, _assertThisInitialized2["default"])(_this));

    _this._domElement.addEventListener('pointerdown', _this._onPointerDown, false);

    _this._domElement.addEventListener('wheel', _this._onMouseWheel, false); // The event listener is added on `window` so that key input can be accounted event if the view does not have
    // the focus. This can occur at page loading, when a mini map is displayed : the minimap initially has the focus
    // and key input would not be considered on the view's domElement.


    window.addEventListener('keydown', _this._onKeyDown, false);
    window.addEventListener('keyup', _this._onKeyUp, false); // Reset key/mouse when window loose focus

    window.addEventListener('blur', _this._onBlur); // disable context menu when right-clicking

    _this._domElement.addEventListener('contextmenu', _this._onContextMenu, false);

    _this.setFromOptions(options);

    return _this;
  }
  /**
   * get the state corresponding to the mouse button and the keyboard key. If the input relates to a trigger - a
   * single event which triggers movement, without the move of the mouse for instance -, dispatch a relevant event.
   * @param      {Number}  mouseButton  The mouse button
   * @param      {Number}  keyboard     The keyboard
   * @param      {Boolean} [double]     Value of the searched state `double` property
   * @return     {State}  the state corresponding
   */


  (0, _createClass2["default"])(StateControl, [{
    key: "inputToState",
    value: function inputToState(mouseButton, keyboard) {
      var _double = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      for (var _i = 0, _Object$keys = Object.keys(DEFAULT_STATES); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var state = this[key];

        if (state.enable && state.mouseButton === mouseButton && state.keyboard === keyboard && state["double"] === _double) {
          // If the input relates to a state, returns it
          if (!state._trigger) {
            return state;
          } // If the input relates to a trigger (TRAVEL_IN, TRAVEL_OUT), dispatch a relevant event.


          this.dispatchEvent({
            type: state._event,
            // Dont pass viewCoords if the input is only a keyboard input.
            viewCoords: mouseButton !== undefined && viewCoords,
            direction: state._direction
          });
        }
      }

      return this.NONE;
    }
    /**
     * get the state corresponding to the number of finger on the pad
     *
     * @param      {Number}  finger  The number of finger
     * @return     {state}  the state corresponding
     */

  }, {
    key: "touchToState",
    value: function touchToState(finger) {
      for (var _i2 = 0, _Object$keys2 = Object.keys(DEFAULT_STATES); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];
        var state = this[key];

        if (state.enable && finger == state.finger) {
          return state;
        }
      }

      return this.NONE;
    }
    /**
     * Set the current StateControl {@link State} properties to given values.
     * @param {Object}  options     Object containing the `State` values to set current `StateControl` properties to.
                                    * The `enable` property do not necessarily need to be specified. In that case, the
                                    * previous value of this property will be kept for the new {@link State}.
     *
     * @example
     * // Switch bindings for PAN and MOVE_GLOBE actions, and disabling PANORAMIC movement :
     * view.controls.states.setFromOptions({
     *     PAN: {
     *         mouseButton: itowns.THREE.MOUSE.LEFT,
     *     },
     *     MOVE_GLOBE: {
     *         mouseButton: itowns.THREE.MOUSE.RIGHT,
     *     },
     *     PANORAMIC: {
     *         enable: false,
     *     },
     * };
     */

  }, {
    key: "setFromOptions",
    value: function setFromOptions(options) {
      for (var state in DEFAULT_STATES) {
        if ({}.hasOwnProperty.call(DEFAULT_STATES, state)) {
          var newState = {};
          newState = options[state] || this[state] || Object.assign(newState, DEFAULT_STATES[state]); // Copy the previous value of `enable` property if not defined in options

          if (options[state] && options[state].enable === undefined) {
            newState.enable = this[state].enable;
          } // If no value is provided for the `double` property,
          // defaults it to `false` instead of leaving it undefined


          newState["double"] = !!newState["double"]; // Copy the `_event` and `_trigger` properties

          newState._event = DEFAULT_STATES[state]._event;
          newState._trigger = DEFAULT_STATES[state]._trigger;
          newState._direction = DEFAULT_STATES[state]._direction;
          this[state] = newState;
        }
      }
    } // ---------- POINTER EVENTS : ----------

  }, {
    key: "onPointerDown",
    value: function onPointerDown(event) {
      if (!this.enabled) {
        return;
      }

      viewCoords.copy(this._view.eventToViewCoords(event));

      switch (event.pointerType) {
        case 'mouse':
          this._currentMousePressed = event.button;
          this.currentState = this.inputToState(this._currentMousePressed, this._currentKeyPressed, // Detect if the mouse button was pressed less than 500 ms before, and if the cursor has not moved two much
          // since previous click. If so, set dblclick to true.
          event.timeStamp - this._clickTimeStamp < 500 && this._lastMousePressed.button === this._currentMousePressed && this._lastMousePressed.viewCoords.distanceTo(viewCoords) < 5);
          this._clickTimeStamp = event.timeStamp;
          this._lastMousePressed.button = this._currentMousePressed;

          this._lastMousePressed.viewCoords.copy(viewCoords);

          break;
        // TODO : add touch event management

        default:
      }

      this._domElement.addEventListener('pointermove', this._onPointerMove, false);

      this._domElement.addEventListener('pointerup', this._onPointerUp, false);

      this._domElement.addEventListener('mouseleave', this._onPointerUp, false);
    }
  }, {
    key: "onPointerMove",
    value: function onPointerMove(event) {
      event.preventDefault();

      if (!this.enabled) {
        return;
      }

      viewCoords.copy(this._view.eventToViewCoords(event));

      switch (event.pointerType) {
        case 'mouse':
          this.dispatchEvent({
            type: this.currentState._event,
            viewCoords: viewCoords
          });
          break;
        // TODO : add touch event management

        default:
      }
    }
  }, {
    key: "onPointerUp",
    value: function onPointerUp() {
      if (!this.enabled) {
        return;
      }

      this._currentMousePressed = undefined;

      this._domElement.removeEventListener('pointermove', this._onPointerMove, false);

      this._domElement.removeEventListener('pointerup', this._onPointerUp, false);

      this._domElement.removeEventListener('mouseleave', this._onPointerUp, false);

      this.currentState = this.NONE;
    } // ---------- WHEEL EVENT : ----------

  }, {
    key: "onMouseWheel",
    value: function onMouseWheel(event) {
      event.preventDefault();

      if (this.enabled && this.ZOOM.enable) {
        this.dispatchEvent({
          type: this.ZOOM._event,
          delta: event.deltaY
        });
      }
    } // ---------- KEYBOARD EVENTS : ----------

  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (!this.enabled || !this.enableKeys) {
        return;
      }

      this._currentKeyPressed = event.keyCode;
      this.inputToState(this._currentMousePressed, this._currentKeyPressed);
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp() {
      if (!this.enabled || !this.enableKeys) {
        return;
      }

      this._currentKeyPressed = undefined;

      if (this._currentMousePressed === undefined) {
        this.currentState = this.NONE;
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.onKeyUp();
      this.onPointerUp();
    }
  }, {
    key: "onContextMenu",
    value: function onContextMenu(event) {
      event.preventDefault();
    }
    /**
     * Remove all event listeners created within this instance of `StateControl`
     */

  }, {
    key: "dispose",
    value: function dispose() {
      this._clickTimeStamp = 0;
      this._lastMousePressed = undefined;
      this._currentKeyPressed = undefined;

      this._domElement.removeEventListener('pointerdown', this._onPointerDown, false);

      this._domElement.removeEventListener('pointermove', this._onPointerMove, false);

      this._domElement.removeEventListener('pointerup', this._onPointerUp, false);

      this._domElement.removeEventListener('wheel', this._onMouseWheel, false);

      this._domElement.removeEventListener('keydown', this._onKeyDown, false);

      this._domElement.removeEventListener('keyup', this._onKeyUp, false);

      window.removeEventListener('blur', this._onBlur);

      this._domElement.removeEventListener('contextmenu', this._onContextMenu, false);
    }
  }]);
  return StateControl;
}(THREE.EventDispatcher);

var _default = StateControl;
exports["default"] = _default;