"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RENDERING_SCHEDULED = exports.RENDERING_PAUSED = exports.MAIN_LOOP_EVENTS = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _three = require("three");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var RENDERING_PAUSED = 0;
exports.RENDERING_PAUSED = RENDERING_PAUSED;
var RENDERING_SCHEDULED = 1;
/**
 * MainLoop's update events list that are fired using
 * {@link View#execFrameRequesters}.
 *
 * @property UPDATE_START {string} fired at the start of the update
 * @property BEFORE_CAMERA_UPDATE {string} fired before the camera update
 * @property AFTER_CAMERA_UPDATE {string} fired after the camera update
 * @property BEFORE_LAYER_UPDATE {string} fired before the layer update
 * @property AFTER_LAYER_UPDATE {string} fired after the layer update
 * @property BEFORE_RENDER {string} fired before the render
 * @property AFTER_RENDER {string} fired after the render
 * @property UPDATE_END {string} fired at the end of the update
 */

exports.RENDERING_SCHEDULED = RENDERING_SCHEDULED;
var MAIN_LOOP_EVENTS = {
  UPDATE_START: 'update_start',
  BEFORE_CAMERA_UPDATE: 'before_camera_update',
  AFTER_CAMERA_UPDATE: 'after_camera_update',
  BEFORE_LAYER_UPDATE: 'before_layer_update',
  AFTER_LAYER_UPDATE: 'after_layer_update',
  BEFORE_RENDER: 'before_render',
  AFTER_RENDER: 'after_render',
  UPDATE_END: 'update_end'
};
exports.MAIN_LOOP_EVENTS = MAIN_LOOP_EVENTS;

function updateElements(context, geometryLayer, elements) {
  if (!elements) {
    return;
  }

  var _iterator = _createForOfIteratorHelper(elements),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      // update element
      // TODO find a way to notify attachedLayers when geometryLayer deletes some elements
      // and then update Debug.js:addGeometryLayerDebugFeatures
      var newElementsToUpdate = geometryLayer.update(context, geometryLayer, element);
      var sub = geometryLayer.getObjectToUpdateForAttachedLayers(element);

      if (sub) {
        if (sub.element) {
          // update attached layers
          var _iterator2 = _createForOfIteratorHelper(geometryLayer.attachedLayers),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var attachedLayer = _step2.value;

              if (attachedLayer.ready) {
                attachedLayer.update(context, attachedLayer, sub.element, sub.parent);
                attachedLayer.cache.flush();
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else if (sub.elements) {
          for (var i = 0; i < sub.elements.length; i++) {
            if (!sub.elements[i].isObject3D) {
              throw new Error("\n                            Invalid object for attached layer to update.\n                            Must be a THREE.Object and have a THREE.Material");
            } // update attached layers


            var _iterator3 = _createForOfIteratorHelper(geometryLayer.attachedLayers),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _attachedLayer = _step3.value;

                if (_attachedLayer.ready) {
                  _attachedLayer.update(context, _attachedLayer, sub.elements[i], sub.parent);

                  _attachedLayer.cache.flush();
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }
      }

      updateElements(context, geometryLayer, newElementsToUpdate);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function filterChangeSources(updateSources, geometryLayer) {
  var fullUpdate = false;
  var filtered = new Set();
  updateSources.forEach(function (src) {
    if (src === geometryLayer || src.isCamera) {
      geometryLayer.info.clear();
      fullUpdate = true;
    } else if (src.layer === geometryLayer) {
      filtered.add(src);
    }
  });
  return fullUpdate ? new Set([geometryLayer]) : filtered;
}

var _needsRedraw = /*#__PURE__*/new WeakMap();

var _updateLoopRestarted = /*#__PURE__*/new WeakMap();

var _lastTimestamp = /*#__PURE__*/new WeakMap();

var _update = /*#__PURE__*/new WeakSet();

var _step4 = /*#__PURE__*/new WeakSet();

var _renderView = /*#__PURE__*/new WeakSet();

var MainLoop = /*#__PURE__*/function (_EventDispatcher) {
  (0, _inherits2["default"])(MainLoop, _EventDispatcher);

  var _super = _createSuper(MainLoop);

  function MainLoop(scheduler, engine) {
    var _this;

    (0, _classCallCheck2["default"])(this, MainLoop);
    _this = _super.call(this);

    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _renderView);

    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _step4);

    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _update);

    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _needsRedraw, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _updateLoopRestarted, {
      writable: true,
      value: true
    });

    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _lastTimestamp, {
      writable: true,
      value: 0
    });

    _this.renderingState = RENDERING_PAUSED;
    _this.scheduler = scheduler;
    _this.gfxEngine = engine; // TODO: remove me

    return _this;
  }

  (0, _createClass2["default"])(MainLoop, [{
    key: "scheduleViewUpdate",
    value: function scheduleViewUpdate(view, forceRedraw) {
      var _this2 = this;

      (0, _classPrivateFieldSet2["default"])(this, _needsRedraw, (0, _classPrivateFieldGet2["default"])(this, _needsRedraw) | forceRedraw);

      if (this.renderingState !== RENDERING_SCHEDULED) {
        this.renderingState = RENDERING_SCHEDULED;
        requestAnimationFrame(function (timestamp) {
          _classPrivateMethodGet(_this2, _step4, _step5).call(_this2, view, timestamp);
        });
      }
    }
  }]);
  return MainLoop;
}(_three.EventDispatcher);

function _update2(view, updateSources, dt) {
  var context = {
    camera: view.camera,
    engine: this.gfxEngine,
    scheduler: this.scheduler,
    view: view
  }; // replace layer with their parent where needed

  updateSources.forEach(function (src) {
    var layer = src.layer || src;

    if (layer.isLayer && layer.parent) {
      updateSources.add(layer.parent);
    }
  });

  var _iterator4 = _createForOfIteratorHelper(view.getLayers(function (x, y) {
    return !y;
  })),
      _step6;

  try {
    for (_iterator4.s(); !(_step6 = _iterator4.n()).done;) {
      var geometryLayer = _step6.value;
      context.geometryLayer = geometryLayer;

      if (geometryLayer.ready && geometryLayer.visible && !geometryLayer.frozen) {
        view.execFrameRequesters(MAIN_LOOP_EVENTS.BEFORE_LAYER_UPDATE, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted), geometryLayer); // Filter updateSources that are relevant for the geometryLayer

        var srcs = filterChangeSources(updateSources, geometryLayer);

        if (srcs.size > 0) {
          // pre update attached layer
          var _iterator5 = _createForOfIteratorHelper(geometryLayer.attachedLayers),
              _step7;

          try {
            for (_iterator5.s(); !(_step7 = _iterator5.n()).done;) {
              var attachedLayer = _step7.value;

              if (attachedLayer.ready && attachedLayer.preUpdate) {
                attachedLayer.preUpdate(context, srcs);
              }
            } // `preUpdate` returns an array of elements to update

          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          var elementsToUpdate = geometryLayer.preUpdate(context, srcs); // `update` is called in `updateElements`.

          updateElements(context, geometryLayer, elementsToUpdate); // `postUpdate` is called when this geom layer update process is finished

          geometryLayer.postUpdate(context, geometryLayer, updateSources);
        } // Clear the cache of expired resources


        geometryLayer.cache.flush();
        view.execFrameRequesters(MAIN_LOOP_EVENTS.AFTER_LAYER_UPDATE, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted), geometryLayer);
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}

function _step5(view, timestamp) {
  var dt = timestamp - (0, _classPrivateFieldGet2["default"])(this, _lastTimestamp);

  view._executeFrameRequestersRemovals();

  view.execFrameRequesters(MAIN_LOOP_EVENTS.UPDATE_START, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted));
  var willRedraw = (0, _classPrivateFieldGet2["default"])(this, _needsRedraw);
  (0, _classPrivateFieldSet2["default"])(this, _lastTimestamp, timestamp); // Reset internal state before calling _update (so future calls to View.notifyChange()
  // can properly change it)

  (0, _classPrivateFieldSet2["default"])(this, _needsRedraw, false);
  this.renderingState = RENDERING_PAUSED;
  var updateSources = new Set(view._changeSources);

  view._changeSources.clear(); // update camera


  var dim = this.gfxEngine.getWindowSize();
  view.execFrameRequesters(MAIN_LOOP_EVENTS.BEFORE_CAMERA_UPDATE, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted));
  view.camera.update(dim.x, dim.y);
  view.execFrameRequesters(MAIN_LOOP_EVENTS.AFTER_CAMERA_UPDATE, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted)); // Disable camera's matrix auto update to make sure the camera's
  // world matrix is never updated mid-update.
  // Otherwise inconsistencies can appear because object visibility
  // testing and object drawing could be performed using different
  // camera matrixWorld.
  // Note: this is required at least because WEBGLRenderer calls
  // camera.updateMatrixWorld()

  var oldAutoUpdate = view.camera.camera3D.matrixAutoUpdate;
  view.camera.camera3D.matrixAutoUpdate = false; // update data-structure

  _classPrivateMethodGet(this, _update, _update2).call(this, view, updateSources, dt);

  if (this.scheduler.commandsWaitingExecutionCount() == 0) {
    this.dispatchEvent({
      type: 'command-queue-empty'
    });
  } // Redraw *only* if needed.
  // (redraws only happen when this.#needsRedraw is true, which in turn only happens when
  // view.notifyChange() is called with redraw=true)
  // As such there's no continuous update-loop, instead we use a ad-hoc update/render
  // mechanism.


  if (willRedraw) {
    _classPrivateMethodGet(this, _renderView, _renderView2).call(this, view, dt);
  } // next time, we'll consider that we've just started the loop if we are still PAUSED now


  (0, _classPrivateFieldSet2["default"])(this, _updateLoopRestarted, this.renderingState === RENDERING_PAUSED);
  view.camera.camera3D.matrixAutoUpdate = oldAutoUpdate;
  view.execFrameRequesters(MAIN_LOOP_EVENTS.UPDATE_END, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted));
}

function _renderView2(view, dt) {
  view.execFrameRequesters(MAIN_LOOP_EVENTS.BEFORE_RENDER, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted));

  if (view.render) {
    view.render();
  } else {
    // use default rendering method
    this.gfxEngine.renderView(view);
  }

  view.execFrameRequesters(MAIN_LOOP_EVENTS.AFTER_RENDER, dt, (0, _classPrivateFieldGet2["default"])(this, _updateLoopRestarted));
}

var _default = MainLoop;
exports["default"] = _default;