"format register";


System.register("github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {  /* */ 
      "format global";
      /*!
       * Copyright 2014 Drifty Co.
       * http://drifty.com/
       *
       * Ionic, v1.0.0-beta.13
       * A powerful HTML5 mobile app framework.
       * http://ionicframework.com/
       *
       * By @maxlynch, @benjsperry, @adamdbradley <3
       *
       * Licensed under the MIT license. Please see LICENSE for more information.
       *
       */
      
      (function() {
      
      // Create global ionic obj and its namespaces
      // build processes may have already created an ionic obj
      window.ionic = window.ionic || {};
      window.ionic.views = {};
      window.ionic.version = '1.0.0-beta.13';
      
      (function(window, document, ionic) {
      
        var readyCallbacks = [];
        var isDomReady = document.readyState === 'complete' || document.readyState === 'interactive';
      
        function domReady() {
          isDomReady = true;
          for(var x=0; x<readyCallbacks.length; x++) {
            ionic.requestAnimationFrame(readyCallbacks[x]);
          }
          readyCallbacks = [];
          document.removeEventListener('DOMContentLoaded', domReady);
        }
        if (!isDomReady){
          document.addEventListener('DOMContentLoaded', domReady);
        }
        
      
        // From the man himself, Mr. Paul Irish.
        // The requestAnimationFrame polyfill
        // Put it on window just to preserve its context
        // without having to use .call
        window._rAF = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  function( callback ){
                    window.setTimeout(callback, 16);
                  };
        })();
      
        var cancelAnimationFrame = window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          window.webkitCancelRequestAnimationFrame;
      
        /**
        * @ngdoc utility
        * @name ionic.DomUtil
        * @module ionic
        */
        ionic.DomUtil = {
          //Call with proper context
          /**
           * @ngdoc method
           * @name ionic.DomUtil#requestAnimationFrame
           * @alias ionic.requestAnimationFrame
           * @description Calls [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame), or a polyfill if not available.
           * @param {function} callback The function to call when the next frame
           * happens.
           */
          requestAnimationFrame: function(cb) {
            return window._rAF(cb);
          },
      
          cancelAnimationFrame: function(requestId) {
            cancelAnimationFrame(requestId);
          },
      
          /**
           * @ngdoc method
           * @name ionic.DomUtil#animationFrameThrottle
           * @alias ionic.animationFrameThrottle
           * @description
           * When given a callback, if that callback is called 100 times between
           * animation frames, adding Throttle will make it only run the last of
           * the 100 calls.
           *
           * @param {function} callback a function which will be throttled to
           * requestAnimationFrame
           * @returns {function} A function which will then call the passed in callback.
           * The passed in callback will receive the context the returned function is
           * called with.
           */
          animationFrameThrottle: function(cb) {
            var args, isQueued, context;
            return function() {
              args = arguments;
              context = this;
              if (!isQueued) {
                isQueued = true;
                ionic.requestAnimationFrame(function() {
                  cb.apply(context, args);
                  isQueued = false;
                });
              }
            };
          },
      
          /**
           * @ngdoc method
           * @name ionic.DomUtil#getPositionInParent
           * @description
           * Find an element's scroll offset within its container.
           * @param {DOMElement} element The element to find the offset of.
           * @returns {object} A position object with the following properties:
           *   - `{number}` `left` The left offset of the element.
           *   - `{number}` `top` The top offset of the element.
           */
          getPositionInParent: function(el) {
            return {
              left: el.offsetLeft,
              top: el.offsetTop
            };
          },
      
          /**
           * @ngdoc method
           * @name ionic.DomUtil#ready
           * @description
           * Call a function when the DOM is ready, or if it is already ready
           * call the function immediately.
           * @param {function} callback The function to be called.
           */
          ready: function(cb) {
            if(isDomReady) {
              ionic.requestAnimationFrame(cb);
            } else {
              readyCallbacks.push(cb);
            }
          },
      
          /**
           * @ngdoc method
           * @name ionic.DomUtil#getTextBounds
           * @description
           * Get a rect representing the bounds of the given textNode.
           * @param {DOMElement} textNode The textNode to find the bounds of.
           * @returns {object} An object representing the bounds of the node. Properties:
           *   - `{number}` `left` The left position of the textNode.
           *   - `{number}` `right` The right position of the textNode.
           *   - `{number}` `top` The top position of the textNode.
           *   - `{number}` `bottom` The bottom position of the textNode.
           *   - `{number}` `width` The width of the textNode.
           *   - `{number}` `height` The height of the textNode.
           */
          getTextBounds: function(textNode) {
            if(document.createRange) {
              var range = document.createRange();
              range.selectNodeContents(textNode);
              if(range.getBoundingClientRect) {
                var rect = range.getBoundingClientRect();
                if(rect) {
                  var sx = window.scrollX;
                  var sy = window.scrollY;
      
                  return {
                    top: rect.top + sy,
                    left: rect.left + sx,
                    right: rect.left + sx + rect.width,
                    bottom: rect.top + sy + rect.height,
                    width: rect.width,
                    height: rect.height
                  };
                }
              }
            }
            return null;
          },
      
          /**
           * @ngdoc method
           * @name ionic.DomUtil#getChildIndex
           * @description
           * Get the first index of a child node within the given element of the
           * specified type.
           * @param {DOMElement} element The element to find the index of.
           * @param {string} type The nodeName to match children of element against.
           * @returns {number} The index, or -1, of a child with nodeName matching type.
           */
          getChildIndex: function(element, type) {
            if(type) {
              var ch = element.parentNode.children;
              var c;
              for(var i = 0, k = 0, j = ch.length; i < j; i++) {
                c = ch[i];
                if(c.nodeName && c.nodeName.toLowerCase() == type) {
                  if(c == element) {
                    return k;
                  }
                  k++;
                }
              }
            }
            return Array.prototype.slice.call(element.parentNode.children).indexOf(element);
          },
      
          /**
           * @private
           */
          swapNodes: function(src, dest) {
            dest.parentNode.insertBefore(src, dest);
          },
      
          elementIsDescendant: function(el, parent, stopAt) {
            var current = el;
            do {
              if (current === parent) return true;
              current = current.parentNode;
            } while (current && current !== stopAt);
            return false;
          },
      
          /**
           * @ngdoc method
           * @name ionic.DomUtil#getParentWithClass
           * @param {DOMElement} element
           * @param {string} className
           * @returns {DOMElement} The closest parent of element matching the
           * className, or null.
           */
          getParentWithClass: function(e, className, depth) {
            depth = depth || 10;
            while(e.parentNode && depth--) {
              if(e.parentNode.classList && e.parentNode.classList.contains(className)) {
                return e.parentNode;
              }
              e = e.parentNode;
            }
            return null;
          },
          /**
           * @ngdoc method
           * @name ionic.DomUtil#getParentOrSelfWithClass
           * @param {DOMElement} element
           * @param {string} className
           * @returns {DOMElement} The closest parent or self matching the
           * className, or null.
           */
          getParentOrSelfWithClass: function(e, className, depth) {
            depth = depth || 10;
            while(e && depth--) {
              if(e.classList && e.classList.contains(className)) {
                return e;
              }
              e = e.parentNode;
            }
            return null;
          },
      
          /**
           * @ngdoc method
           * @name ionic.DomUtil#rectContains
           * @param {number} x
           * @param {number} y
           * @param {number} x1
           * @param {number} y1
           * @param {number} x2
           * @param {number} y2
           * @returns {boolean} Whether {x,y} fits within the rectangle defined by
           * {x1,y1,x2,y2}.
           */
          rectContains: function(x, y, x1, y1, x2, y2) {
            if(x < x1 || x > x2) return false;
            if(y < y1 || y > y2) return false;
            return true;
          }
        };
      
        //Shortcuts
        ionic.requestAnimationFrame = ionic.DomUtil.requestAnimationFrame;
        ionic.cancelAnimationFrame = ionic.DomUtil.cancelAnimationFrame;
        ionic.animationFrameThrottle = ionic.DomUtil.animationFrameThrottle;
      })(window, document, ionic);
      
      /**
       * ion-events.js
       *
       * Author: Max Lynch <max@drifty.com>
       *
       * Framework events handles various mobile browser events, and
       * detects special events like tap/swipe/etc. and emits them
       * as custom events that can be used in an app.
       *
       * Portions lovingly adapted from github.com/maker/ratchet and github.com/alexgibson/tap.js - thanks guys!
       */
      
      (function(ionic) {
      
        // Custom event polyfill
        ionic.CustomEvent = (function() {
          if( typeof window.CustomEvent === 'function' ) return CustomEvent;
      
          var customEvent = function(event, params) {
            var evt;
            params = params || {
              bubbles: false,
              cancelable: false,
              detail: undefined
            };
            try {
              evt = document.createEvent("CustomEvent");
              evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            } catch (error) {
              // fallback for browsers that don't support createEvent('CustomEvent')
              evt = document.createEvent("Event");
              for (var param in params) {
                evt[param] = params[param];
              }
              evt.initEvent(event, params.bubbles, params.cancelable);
            }
            return evt;
          };
          customEvent.prototype = window.Event.prototype;
          return customEvent;
        })();
      
      
        /**
         * @ngdoc utility
         * @name ionic.EventController
         * @module ionic
         */
        ionic.EventController = {
          VIRTUALIZED_EVENTS: ['tap', 'swipe', 'swiperight', 'swipeleft', 'drag', 'hold', 'release'],
      
          /**
           * @ngdoc method
           * @name ionic.EventController#trigger
           * @alias ionic.trigger
           * @param {string} eventType The event to trigger.
           * @param {object} data The data for the event. Hint: pass in
           * `{target: targetElement}`
           * @param {boolean=} bubbles Whether the event should bubble up the DOM.
           * @param {boolean=} cancelable Whether the event should be cancelable.
           */
          // Trigger a new event
          trigger: function(eventType, data, bubbles, cancelable) {
            var event = new ionic.CustomEvent(eventType, {
              detail: data,
              bubbles: !!bubbles,
              cancelable: !!cancelable
            });
      
            // Make sure to trigger the event on the given target, or dispatch it from
            // the window if we don't have an event target
            data && data.target && data.target.dispatchEvent && data.target.dispatchEvent(event) || window.dispatchEvent(event);
          },
      
          /**
           * @ngdoc method
           * @name ionic.EventController#on
           * @alias ionic.on
           * @description Listen to an event on an element.
           * @param {string} type The event to listen for.
           * @param {function} callback The listener to be called.
           * @param {DOMElement} element The element to listen for the event on.
           */
          on: function(type, callback, element) {
            var e = element || window;
      
            // Bind a gesture if it's a virtual event
            for(var i = 0, j = this.VIRTUALIZED_EVENTS.length; i < j; i++) {
              if(type == this.VIRTUALIZED_EVENTS[i]) {
                var gesture = new ionic.Gesture(element);
                gesture.on(type, callback);
                return gesture;
              }
            }
      
            // Otherwise bind a normal event
            e.addEventListener(type, callback);
          },
      
          /**
           * @ngdoc method
           * @name ionic.EventController#off
           * @alias ionic.off
           * @description Remove an event listener.
           * @param {string} type
           * @param {function} callback
           * @param {DOMElement} element
           */
          off: function(type, callback, element) {
            element.removeEventListener(type, callback);
          },
      
          /**
           * @ngdoc method
           * @name ionic.EventController#onGesture
           * @alias ionic.onGesture
           * @description Add an event listener for a gesture on an element.
           *
           * Available eventTypes (from [hammer.js](http://eightmedia.github.io/hammer.js/)):
           *
           * `hold`, `tap`, `doubletap`, `drag`, `dragstart`, `dragend`, `dragup`, `dragdown`, <br/>
           * `dragleft`, `dragright`, `swipe`, `swipeup`, `swipedown`, `swipeleft`, `swiperight`, <br/>
           * `transform`, `transformstart`, `transformend`, `rotate`, `pinch`, `pinchin`, `pinchout`, </br>
           * `touch`, `release`
           *
           * @param {string} eventType The gesture event to listen for.
           * @param {function(e)} callback The function to call when the gesture
           * happens.
           * @param {DOMElement} element The angular element to listen for the event on.
           */
          onGesture: function(type, callback, element, options) {
            var gesture = new ionic.Gesture(element, options);
            gesture.on(type, callback);
            return gesture;
          },
      
          /**
           * @ngdoc method
           * @name ionic.EventController#offGesture
           * @alias ionic.offGesture
           * @description Remove an event listener for a gesture on an element.
           * @param {string} eventType The gesture event.
           * @param {function(e)} callback The listener that was added earlier.
           * @param {DOMElement} element The element the listener was added on.
           */
          offGesture: function(gesture, type, callback) {
            gesture.off(type, callback);
          },
      
          handlePopState: function(event) {}
        };
      
      
        // Map some convenient top-level functions for event handling
        ionic.on = function() { ionic.EventController.on.apply(ionic.EventController, arguments); };
        ionic.off = function() { ionic.EventController.off.apply(ionic.EventController, arguments); };
        ionic.trigger = ionic.EventController.trigger;//function() { ionic.EventController.trigger.apply(ionic.EventController.trigger, arguments); };
        ionic.onGesture = function() { return ionic.EventController.onGesture.apply(ionic.EventController.onGesture, arguments); };
        ionic.offGesture = function() { return ionic.EventController.offGesture.apply(ionic.EventController.offGesture, arguments); };
      
      })(window.ionic);
      
      /**
        * Simple gesture controllers with some common gestures that emit
        * gesture events.
        *
        * Ported from github.com/EightMedia/hammer.js Gestures - thanks!
        */
      (function(ionic) {
      
        /**
         * ionic.Gestures
         * use this to create instances
         * @param   {HTMLElement}   element
         * @param   {Object}        options
         * @returns {ionic.Gestures.Instance}
         * @constructor
         */
        ionic.Gesture = function(element, options) {
          return new ionic.Gestures.Instance(element, options || {});
        };
      
        ionic.Gestures = {};
      
        // default settings
        ionic.Gestures.defaults = {
          // add css to the element to prevent the browser from doing
          // its native behavior. this doesnt prevent the scrolling,
          // but cancels the contextmenu, tap highlighting etc
          // set to false to disable this
          stop_browser_behavior: 'disable-user-behavior'
        };
      
        // detect touchevents
        ionic.Gestures.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
        ionic.Gestures.HAS_TOUCHEVENTS = ('ontouchstart' in window);
      
        // dont use mouseevents on mobile devices
        ionic.Gestures.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
        ionic.Gestures.NO_MOUSEEVENTS = ionic.Gestures.HAS_TOUCHEVENTS && window.navigator.userAgent.match(ionic.Gestures.MOBILE_REGEX);
      
        // eventtypes per touchevent (start, move, end)
        // are filled by ionic.Gestures.event.determineEventTypes on setup
        ionic.Gestures.EVENT_TYPES = {};
      
        // direction defines
        ionic.Gestures.DIRECTION_DOWN = 'down';
        ionic.Gestures.DIRECTION_LEFT = 'left';
        ionic.Gestures.DIRECTION_UP = 'up';
        ionic.Gestures.DIRECTION_RIGHT = 'right';
      
        // pointer type
        ionic.Gestures.POINTER_MOUSE = 'mouse';
        ionic.Gestures.POINTER_TOUCH = 'touch';
        ionic.Gestures.POINTER_PEN = 'pen';
      
        // touch event defines
        ionic.Gestures.EVENT_START = 'start';
        ionic.Gestures.EVENT_MOVE = 'move';
        ionic.Gestures.EVENT_END = 'end';
      
        // hammer document where the base events are added at
        ionic.Gestures.DOCUMENT = window.document;
      
        // plugins namespace
        ionic.Gestures.plugins = {};
      
        // if the window events are set...
        ionic.Gestures.READY = false;
      
        /**
         * setup events to detect gestures on the document
         */
        function setup() {
          if(ionic.Gestures.READY) {
            return;
          }
      
          // find what eventtypes we add listeners to
          ionic.Gestures.event.determineEventTypes();
      
          // Register all gestures inside ionic.Gestures.gestures
          for(var name in ionic.Gestures.gestures) {
            if(ionic.Gestures.gestures.hasOwnProperty(name)) {
              ionic.Gestures.detection.register(ionic.Gestures.gestures[name]);
            }
          }
      
          // Add touch events on the document
          ionic.Gestures.event.onTouch(ionic.Gestures.DOCUMENT, ionic.Gestures.EVENT_MOVE, ionic.Gestures.detection.detect);
          ionic.Gestures.event.onTouch(ionic.Gestures.DOCUMENT, ionic.Gestures.EVENT_END, ionic.Gestures.detection.detect);
      
          // ionic.Gestures is ready...!
          ionic.Gestures.READY = true;
        }
      
        /**
         * create new hammer instance
         * all methods should return the instance itself, so it is chainable.
         * @param   {HTMLElement}       element
         * @param   {Object}            [options={}]
         * @returns {ionic.Gestures.Instance}
         * @name Gesture.Instance
         * @constructor
         */
        ionic.Gestures.Instance = function(element, options) {
          var self = this;
      
          // A null element was passed into the instance, which means
          // whatever lookup was done to find this element failed to find it
          // so we can't listen for events on it.
          if(element === null) {
            void 0;
            return;
          }
      
          // setup ionic.GesturesJS window events and register all gestures
          // this also sets up the default options
          setup();
      
          this.element = element;
      
          // start/stop detection option
          this.enabled = true;
      
          // merge options
          this.options = ionic.Gestures.utils.extend(
              ionic.Gestures.utils.extend({}, ionic.Gestures.defaults),
              options || {});
      
          // add some css to the element to prevent the browser from doing its native behavoir
          if(this.options.stop_browser_behavior) {
            ionic.Gestures.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
          }
      
          // start detection on touchstart
          ionic.Gestures.event.onTouch(element, ionic.Gestures.EVENT_START, function(ev) {
            if(self.enabled) {
              ionic.Gestures.detection.startDetect(self, ev);
            }
          });
      
          // return instance
          return this;
        };
      
      
        ionic.Gestures.Instance.prototype = {
          /**
           * bind events to the instance
           * @param   {String}      gesture
           * @param   {Function}    handler
           * @returns {ionic.Gestures.Instance}
           */
          on: function onEvent(gesture, handler){
            var gestures = gesture.split(' ');
            for(var t=0; t<gestures.length; t++) {
              this.element.addEventListener(gestures[t], handler, false);
            }
            return this;
          },
      
      
          /**
           * unbind events to the instance
           * @param   {String}      gesture
           * @param   {Function}    handler
           * @returns {ionic.Gestures.Instance}
           */
          off: function offEvent(gesture, handler){
            var gestures = gesture.split(' ');
            for(var t=0; t<gestures.length; t++) {
              this.element.removeEventListener(gestures[t], handler, false);
            }
            return this;
          },
      
      
          /**
           * trigger gesture event
           * @param   {String}      gesture
           * @param   {Object}      eventData
           * @returns {ionic.Gestures.Instance}
           */
          trigger: function triggerEvent(gesture, eventData){
            // create DOM event
            var event = ionic.Gestures.DOCUMENT.createEvent('Event');
            event.initEvent(gesture, true, true);
            event.gesture = eventData;
      
            // trigger on the target if it is in the instance element,
            // this is for event delegation tricks
            var element = this.element;
            if(ionic.Gestures.utils.hasParent(eventData.target, element)) {
              element = eventData.target;
            }
      
            element.dispatchEvent(event);
            return this;
          },
      
      
          /**
           * enable of disable hammer.js detection
           * @param   {Boolean}   state
           * @returns {ionic.Gestures.Instance}
           */
          enable: function enable(state) {
            this.enabled = state;
            return this;
          }
        };
      
        /**
         * this holds the last move event,
         * used to fix empty touchend issue
         * see the onTouch event for an explanation
         * type {Object}
         */
        var last_move_event = null;
      
      
        /**
         * when the mouse is hold down, this is true
         * type {Boolean}
         */
        var enable_detect = false;
      
      
        /**
         * when touch events have been fired, this is true
         * type {Boolean}
         */
        var touch_triggered = false;
      
      
        ionic.Gestures.event = {
          /**
           * simple addEventListener
           * @param   {HTMLElement}   element
           * @param   {String}        type
           * @param   {Function}      handler
           */
          bindDom: function(element, type, handler) {
            var types = type.split(' ');
            for(var t=0; t<types.length; t++) {
              element.addEventListener(types[t], handler, false);
            }
          },
      
      
          /**
           * touch events with mouse fallback
           * @param   {HTMLElement}   element
           * @param   {String}        eventType        like ionic.Gestures.EVENT_MOVE
           * @param   {Function}      handler
           */
          onTouch: function onTouch(element, eventType, handler) {
            var self = this;
      
            this.bindDom(element, ionic.Gestures.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
              var sourceEventType = ev.type.toLowerCase();
      
              // onmouseup, but when touchend has been fired we do nothing.
              // this is for touchdevices which also fire a mouseup on touchend
              if(sourceEventType.match(/mouse/) && touch_triggered) {
                return;
              }
      
              // mousebutton must be down or a touch event
              else if( sourceEventType.match(/touch/) ||   // touch events are always on screen
                sourceEventType.match(/pointerdown/) || // pointerevents touch
                (sourceEventType.match(/mouse/) && ev.which === 1)   // mouse is pressed
                ){
                  enable_detect = true;
                }
      
              // mouse isn't pressed
              else if(sourceEventType.match(/mouse/) && ev.which !== 1) {
                enable_detect = false;
              }
      
      
              // we are in a touch event, set the touch triggered bool to true,
              // this for the conflicts that may occur on ios and android
              if(sourceEventType.match(/touch|pointer/)) {
                touch_triggered = true;
              }
      
              // count the total touches on the screen
              var count_touches = 0;
      
              // when touch has been triggered in this detection session
              // and we are now handling a mouse event, we stop that to prevent conflicts
              if(enable_detect) {
                // update pointerevent
                if(ionic.Gestures.HAS_POINTEREVENTS && eventType != ionic.Gestures.EVENT_END) {
                  count_touches = ionic.Gestures.PointerEvent.updatePointer(eventType, ev);
                }
                // touch
                else if(sourceEventType.match(/touch/)) {
                  count_touches = ev.touches.length;
                }
                // mouse
                else if(!touch_triggered) {
                  count_touches = sourceEventType.match(/up/) ? 0 : 1;
                }
      
                // if we are in a end event, but when we remove one touch and
                // we still have enough, set eventType to move
                if(count_touches > 0 && eventType == ionic.Gestures.EVENT_END) {
                  eventType = ionic.Gestures.EVENT_MOVE;
                }
                // no touches, force the end event
                else if(!count_touches) {
                  eventType = ionic.Gestures.EVENT_END;
                }
      
                // store the last move event
                if(count_touches || last_move_event === null) {
                  last_move_event = ev;
                }
      
                // trigger the handler
                handler.call(ionic.Gestures.detection, self.collectEventData(element, eventType, self.getTouchList(last_move_event, eventType), ev));
      
                // remove pointerevent from list
                if(ionic.Gestures.HAS_POINTEREVENTS && eventType == ionic.Gestures.EVENT_END) {
                  count_touches = ionic.Gestures.PointerEvent.updatePointer(eventType, ev);
                }
              }
      
              //debug(sourceEventType +" "+ eventType);
      
              // on the end we reset everything
              if(!count_touches) {
                last_move_event = null;
                enable_detect = false;
                touch_triggered = false;
                ionic.Gestures.PointerEvent.reset();
              }
            });
          },
      
      
          /**
           * we have different events for each device/browser
           * determine what we need and set them in the ionic.Gestures.EVENT_TYPES constant
           */
          determineEventTypes: function determineEventTypes() {
            // determine the eventtype we want to set
            var types;
      
            // pointerEvents magic
            if(ionic.Gestures.HAS_POINTEREVENTS) {
              types = ionic.Gestures.PointerEvent.getEvents();
            }
            // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
            else if(ionic.Gestures.NO_MOUSEEVENTS) {
              types = [
                'touchstart',
                'touchmove',
                'touchend touchcancel'];
            }
            // for non pointer events browsers and mixed browsers,
            // like chrome on windows8 touch laptop
            else {
              types = [
                'touchstart mousedown',
                'touchmove mousemove',
                'touchend touchcancel mouseup'];
            }
      
            ionic.Gestures.EVENT_TYPES[ionic.Gestures.EVENT_START]  = types[0];
            ionic.Gestures.EVENT_TYPES[ionic.Gestures.EVENT_MOVE]   = types[1];
            ionic.Gestures.EVENT_TYPES[ionic.Gestures.EVENT_END]    = types[2];
          },
      
      
          /**
           * create touchlist depending on the event
           * @param   {Object}    ev
           * @param   {String}    eventType   used by the fakemultitouch plugin
           */
          getTouchList: function getTouchList(ev/*, eventType*/) {
            // get the fake pointerEvent touchlist
            if(ionic.Gestures.HAS_POINTEREVENTS) {
              return ionic.Gestures.PointerEvent.getTouchList();
            }
            // get the touchlist
            else if(ev.touches) {
              return ev.touches;
            }
            // make fake touchlist from mouse position
            else {
              ev.identifier = 1;
              return [ev];
            }
          },
      
      
          /**
           * collect event data for ionic.Gestures js
           * @param   {HTMLElement}   element
           * @param   {String}        eventType        like ionic.Gestures.EVENT_MOVE
           * @param   {Object}        eventData
           */
          collectEventData: function collectEventData(element, eventType, touches, ev) {
      
            // find out pointerType
            var pointerType = ionic.Gestures.POINTER_TOUCH;
            if(ev.type.match(/mouse/) || ionic.Gestures.PointerEvent.matchType(ionic.Gestures.POINTER_MOUSE, ev)) {
              pointerType = ionic.Gestures.POINTER_MOUSE;
            }
      
            return {
              center      : ionic.Gestures.utils.getCenter(touches),
                          timeStamp   : new Date().getTime(),
                          target      : ev.target,
                          touches     : touches,
                          eventType   : eventType,
                          pointerType : pointerType,
                          srcEvent    : ev,
      
                          /**
                           * prevent the browser default actions
                           * mostly used to disable scrolling of the browser
                           */
                          preventDefault: function() {
                            if(this.srcEvent.preventManipulation) {
                              this.srcEvent.preventManipulation();
                            }
      
                            if(this.srcEvent.preventDefault) {
                              //this.srcEvent.preventDefault();
                            }
                          },
      
                          /**
                           * stop bubbling the event up to its parents
                           */
                          stopPropagation: function() {
                            this.srcEvent.stopPropagation();
                          },
      
                          /**
                           * immediately stop gesture detection
                           * might be useful after a swipe was detected
                           * @return {*}
                           */
                          stopDetect: function() {
                            return ionic.Gestures.detection.stopDetect();
                          }
            };
          }
        };
      
        ionic.Gestures.PointerEvent = {
          /**
           * holds all pointers
           * type {Object}
           */
          pointers: {},
      
          /**
           * get a list of pointers
           * @returns {Array}     touchlist
           */
          getTouchList: function() {
            var self = this;
            var touchlist = [];
      
            // we can use forEach since pointerEvents only is in IE10
            Object.keys(self.pointers).sort().forEach(function(id) {
              touchlist.push(self.pointers[id]);
            });
            return touchlist;
          },
      
          /**
           * update the position of a pointer
           * @param   {String}   type             ionic.Gestures.EVENT_END
           * @param   {Object}   pointerEvent
           */
          updatePointer: function(type, pointerEvent) {
            if(type == ionic.Gestures.EVENT_END) {
              this.pointers = {};
            }
            else {
              pointerEvent.identifier = pointerEvent.pointerId;
              this.pointers[pointerEvent.pointerId] = pointerEvent;
            }
      
            return Object.keys(this.pointers).length;
          },
      
          /**
           * check if ev matches pointertype
           * @param   {String}        pointerType     ionic.Gestures.POINTER_MOUSE
           * @param   {PointerEvent}  ev
           */
          matchType: function(pointerType, ev) {
            if(!ev.pointerType) {
              return false;
            }
      
            var types = {};
            types[ionic.Gestures.POINTER_MOUSE] = (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE || ev.pointerType == ionic.Gestures.POINTER_MOUSE);
            types[ionic.Gestures.POINTER_TOUCH] = (ev.pointerType == ev.MSPOINTER_TYPE_TOUCH || ev.pointerType == ionic.Gestures.POINTER_TOUCH);
            types[ionic.Gestures.POINTER_PEN] = (ev.pointerType == ev.MSPOINTER_TYPE_PEN || ev.pointerType == ionic.Gestures.POINTER_PEN);
            return types[pointerType];
          },
      
      
          /**
           * get events
           */
          getEvents: function() {
            return [
              'pointerdown MSPointerDown',
            'pointermove MSPointerMove',
            'pointerup pointercancel MSPointerUp MSPointerCancel'
              ];
          },
      
          /**
           * reset the list
           */
          reset: function() {
            this.pointers = {};
          }
        };
      
      
        ionic.Gestures.utils = {
          /**
           * extend method,
           * also used for cloning when dest is an empty object
           * @param   {Object}    dest
           * @param   {Object}    src
           * @param	{Boolean}	merge		do a merge
           * @returns {Object}    dest
           */
          extend: function extend(dest, src, merge) {
            for (var key in src) {
              if(dest[key] !== undefined && merge) {
                continue;
              }
              dest[key] = src[key];
            }
            return dest;
          },
      
      
          /**
           * find if a node is in the given parent
           * used for event delegation tricks
           * @param   {HTMLElement}   node
           * @param   {HTMLElement}   parent
           * @returns {boolean}       has_parent
           */
          hasParent: function(node, parent) {
            while(node){
              if(node == parent) {
                return true;
              }
              node = node.parentNode;
            }
            return false;
          },
      
      
          /**
           * get the center of all the touches
           * @param   {Array}     touches
           * @returns {Object}    center
           */
          getCenter: function getCenter(touches) {
            var valuesX = [], valuesY = [];
      
            for(var t= 0,len=touches.length; t<len; t++) {
              valuesX.push(touches[t].pageX);
              valuesY.push(touches[t].pageY);
            }
      
            return {
              pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
                pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
            };
          },
      
      
          /**
           * calculate the velocity between two points
           * @param   {Number}    delta_time
           * @param   {Number}    delta_x
           * @param   {Number}    delta_y
           * @returns {Object}    velocity
           */
          getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
            return {
              x: Math.abs(delta_x / delta_time) || 0,
              y: Math.abs(delta_y / delta_time) || 0
            };
          },
      
      
          /**
           * calculate the angle between two coordinates
           * @param   {Touch}     touch1
           * @param   {Touch}     touch2
           * @returns {Number}    angle
           */
          getAngle: function getAngle(touch1, touch2) {
            var y = touch2.pageY - touch1.pageY,
            x = touch2.pageX - touch1.pageX;
            return Math.atan2(y, x) * 180 / Math.PI;
          },
      
      
          /**
           * angle to direction define
           * @param   {Touch}     touch1
           * @param   {Touch}     touch2
           * @returns {String}    direction constant, like ionic.Gestures.DIRECTION_LEFT
           */
          getDirection: function getDirection(touch1, touch2) {
            var x = Math.abs(touch1.pageX - touch2.pageX),
            y = Math.abs(touch1.pageY - touch2.pageY);
      
            if(x >= y) {
              return touch1.pageX - touch2.pageX > 0 ? ionic.Gestures.DIRECTION_LEFT : ionic.Gestures.DIRECTION_RIGHT;
            }
            else {
              return touch1.pageY - touch2.pageY > 0 ? ionic.Gestures.DIRECTION_UP : ionic.Gestures.DIRECTION_DOWN;
            }
          },
      
      
          /**
           * calculate the distance between two touches
           * @param   {Touch}     touch1
           * @param   {Touch}     touch2
           * @returns {Number}    distance
           */
          getDistance: function getDistance(touch1, touch2) {
            var x = touch2.pageX - touch1.pageX,
            y = touch2.pageY - touch1.pageY;
            return Math.sqrt((x*x) + (y*y));
          },
      
      
          /**
           * calculate the scale factor between two touchLists (fingers)
           * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
           * @param   {Array}     start
           * @param   {Array}     end
           * @returns {Number}    scale
           */
          getScale: function getScale(start, end) {
            // need two fingers...
            if(start.length >= 2 && end.length >= 2) {
              return this.getDistance(end[0], end[1]) /
                this.getDistance(start[0], start[1]);
            }
            return 1;
          },
      
      
          /**
           * calculate the rotation degrees between two touchLists (fingers)
           * @param   {Array}     start
           * @param   {Array}     end
           * @returns {Number}    rotation
           */
          getRotation: function getRotation(start, end) {
            // need two fingers
            if(start.length >= 2 && end.length >= 2) {
              return this.getAngle(end[1], end[0]) -
                this.getAngle(start[1], start[0]);
            }
            return 0;
          },
      
      
          /**
           * boolean if the direction is vertical
           * @param    {String}    direction
           * @returns  {Boolean}   is_vertical
           */
          isVertical: function isVertical(direction) {
            return (direction == ionic.Gestures.DIRECTION_UP || direction == ionic.Gestures.DIRECTION_DOWN);
          },
      
      
          /**
           * stop browser default behavior with css class
           * @param   {HtmlElement}   element
           * @param   {Object}        css_class
           */
          stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_class) {
            // changed from making many style changes to just adding a preset classname
            // less DOM manipulations, less code, and easier to control in the CSS side of things
            // hammer.js doesn't come with CSS, but ionic does, which is why we prefer this method
            if(element && element.classList) {
              element.classList.add(css_class);
              element.onselectstart = function() {
                return false;
              };
            }
          }
        };
      
      
        ionic.Gestures.detection = {
          // contains all registred ionic.Gestures.gestures in the correct order
          gestures: [],
      
          // data of the current ionic.Gestures.gesture detection session
          current: null,
      
          // the previous ionic.Gestures.gesture session data
          // is a full clone of the previous gesture.current object
          previous: null,
      
          // when this becomes true, no gestures are fired
          stopped: false,
      
      
          /**
           * start ionic.Gestures.gesture detection
           * @param   {ionic.Gestures.Instance}   inst
           * @param   {Object}            eventData
           */
          startDetect: function startDetect(inst, eventData) {
            // already busy with a ionic.Gestures.gesture detection on an element
            if(this.current) {
              return;
            }
      
            this.stopped = false;
      
            this.current = {
              inst        : inst, // reference to ionic.GesturesInstance we're working for
              startEvent  : ionic.Gestures.utils.extend({}, eventData), // start eventData for distances, timing etc
              lastEvent   : false, // last eventData
              name        : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
            };
      
            this.detect(eventData);
          },
      
      
          /**
           * ionic.Gestures.gesture detection
           * @param   {Object}    eventData
           */
          detect: function detect(eventData) {
            if(!this.current || this.stopped) {
              return;
            }
      
            // extend event data with calculations about scale, distance etc
            eventData = this.extendEventData(eventData);
      
            // instance options
            var inst_options = this.current.inst.options;
      
            // call ionic.Gestures.gesture handlers
            for(var g=0,len=this.gestures.length; g<len; g++) {
              var gesture = this.gestures[g];
      
              // only when the instance options have enabled this gesture
              if(!this.stopped && inst_options[gesture.name] !== false) {
                // if a handler returns false, we stop with the detection
                if(gesture.handler.call(gesture, eventData, this.current.inst) === false) {
                  this.stopDetect();
                  break;
                }
              }
            }
      
            // store as previous event event
            if(this.current) {
              this.current.lastEvent = eventData;
            }
      
            // endevent, but not the last touch, so dont stop
            if(eventData.eventType == ionic.Gestures.EVENT_END && !eventData.touches.length-1) {
              this.stopDetect();
            }
      
            return eventData;
          },
      
      
          /**
           * clear the ionic.Gestures.gesture vars
           * this is called on endDetect, but can also be used when a final ionic.Gestures.gesture has been detected
           * to stop other ionic.Gestures.gestures from being fired
           */
          stopDetect: function stopDetect() {
            // clone current data to the store as the previous gesture
            // used for the double tap gesture, since this is an other gesture detect session
            this.previous = ionic.Gestures.utils.extend({}, this.current);
      
            // reset the current
            this.current = null;
      
            // stopped!
            this.stopped = true;
          },
      
      
          /**
           * extend eventData for ionic.Gestures.gestures
           * @param   {Object}   ev
           * @returns {Object}   ev
           */
          extendEventData: function extendEventData(ev) {
            var startEv = this.current.startEvent;
      
            // if the touches change, set the new touches over the startEvent touches
            // this because touchevents don't have all the touches on touchstart, or the
            // user must place his fingers at the EXACT same time on the screen, which is not realistic
            // but, sometimes it happens that both fingers are touching at the EXACT same time
            if(startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
              // extend 1 level deep to get the touchlist with the touch objects
              startEv.touches = [];
              for(var i=0,len=ev.touches.length; i<len; i++) {
                startEv.touches.push(ionic.Gestures.utils.extend({}, ev.touches[i]));
              }
            }
      
            var delta_time = ev.timeStamp - startEv.timeStamp,
                delta_x = ev.center.pageX - startEv.center.pageX,
                delta_y = ev.center.pageY - startEv.center.pageY,
                velocity = ionic.Gestures.utils.getVelocity(delta_time, delta_x, delta_y);
      
            ionic.Gestures.utils.extend(ev, {
              deltaTime   : delta_time,
      
              deltaX      : delta_x,
              deltaY      : delta_y,
      
              velocityX   : velocity.x,
              velocityY   : velocity.y,
      
              distance    : ionic.Gestures.utils.getDistance(startEv.center, ev.center),
              angle       : ionic.Gestures.utils.getAngle(startEv.center, ev.center),
              direction   : ionic.Gestures.utils.getDirection(startEv.center, ev.center),
      
              scale       : ionic.Gestures.utils.getScale(startEv.touches, ev.touches),
              rotation    : ionic.Gestures.utils.getRotation(startEv.touches, ev.touches),
      
              startEvent  : startEv
            });
      
            return ev;
          },
      
      
          /**
           * register new gesture
           * @param   {Object}    gesture object, see gestures.js for documentation
           * @returns {Array}     gestures
           */
          register: function register(gesture) {
            // add an enable gesture options if there is no given
            var options = gesture.defaults || {};
            if(options[gesture.name] === undefined) {
              options[gesture.name] = true;
            }
      
            // extend ionic.Gestures default options with the ionic.Gestures.gesture options
            ionic.Gestures.utils.extend(ionic.Gestures.defaults, options, true);
      
            // set its index
            gesture.index = gesture.index || 1000;
      
            // add ionic.Gestures.gesture to the list
            this.gestures.push(gesture);
      
            // sort the list by index
            this.gestures.sort(function(a, b) {
              if (a.index < b.index) {
                return -1;
              }
              if (a.index > b.index) {
                return 1;
              }
              return 0;
            });
      
            return this.gestures;
          }
        };
      
      
        ionic.Gestures.gestures = ionic.Gestures.gestures || {};
      
        /**
         * Custom gestures
         * ==============================
         *
         * Gesture object
         * --------------------
         * The object structure of a gesture:
         *
         * { name: 'mygesture',
         *   index: 1337,
         *   defaults: {
         *     mygesture_option: true
         *   }
         *   handler: function(type, ev, inst) {
         *     // trigger gesture event
         *     inst.trigger(this.name, ev);
         *   }
         * }
      
         * @param   {String}    name
         * this should be the name of the gesture, lowercase
         * it is also being used to disable/enable the gesture per instance config.
         *
         * @param   {Number}    [index=1000]
         * the index of the gesture, where it is going to be in the stack of gestures detection
         * like when you build an gesture that depends on the drag gesture, it is a good
         * idea to place it after the index of the drag gesture.
         *
         * @param   {Object}    [defaults={}]
         * the default settings of the gesture. these are added to the instance settings,
         * and can be overruled per instance. you can also add the name of the gesture,
         * but this is also added by default (and set to true).
         *
         * @param   {Function}  handler
         * this handles the gesture detection of your custom gesture and receives the
         * following arguments:
         *
         *      @param  {Object}    eventData
         *      event data containing the following properties:
         *          timeStamp   {Number}        time the event occurred
         *          target      {HTMLElement}   target element
         *          touches     {Array}         touches (fingers, pointers, mouse) on the screen
         *          pointerType {String}        kind of pointer that was used. matches ionic.Gestures.POINTER_MOUSE|TOUCH
         *          center      {Object}        center position of the touches. contains pageX and pageY
         *          deltaTime   {Number}        the total time of the touches in the screen
         *          deltaX      {Number}        the delta on x axis we haved moved
         *          deltaY      {Number}        the delta on y axis we haved moved
         *          velocityX   {Number}        the velocity on the x
         *          velocityY   {Number}        the velocity on y
         *          angle       {Number}        the angle we are moving
         *          direction   {String}        the direction we are moving. matches ionic.Gestures.DIRECTION_UP|DOWN|LEFT|RIGHT
         *          distance    {Number}        the distance we haved moved
         *          scale       {Number}        scaling of the touches, needs 2 touches
         *          rotation    {Number}        rotation of the touches, needs 2 touches *
         *          eventType   {String}        matches ionic.Gestures.EVENT_START|MOVE|END
         *          srcEvent    {Object}        the source event, like TouchStart or MouseDown *
         *          startEvent  {Object}        contains the same properties as above,
         *                                      but from the first touch. this is used to calculate
         *                                      distances, deltaTime, scaling etc
         *
         *      @param  {ionic.Gestures.Instance}    inst
         *      the instance we are doing the detection for. you can get the options from
         *      the inst.options object and trigger the gesture event by calling inst.trigger
         *
         *
         * Handle gestures
         * --------------------
         * inside the handler you can get/set ionic.Gestures.detectionic.current. This is the current
         * detection sessionic. It has the following properties
         *      @param  {String}    name
         *      contains the name of the gesture we have detected. it has not a real function,
         *      only to check in other gestures if something is detected.
         *      like in the drag gesture we set it to 'drag' and in the swipe gesture we can
         *      check if the current gesture is 'drag' by accessing ionic.Gestures.detectionic.current.name
         *
         *      readonly
         *      @param  {ionic.Gestures.Instance}    inst
         *      the instance we do the detection for
         *
         *      readonly
         *      @param  {Object}    startEvent
         *      contains the properties of the first gesture detection in this sessionic.
         *      Used for calculations about timing, distance, etc.
         *
         *      readonly
         *      @param  {Object}    lastEvent
         *      contains all the properties of the last gesture detect in this sessionic.
         *
         * after the gesture detection session has been completed (user has released the screen)
         * the ionic.Gestures.detectionic.current object is copied into ionic.Gestures.detectionic.previous,
         * this is usefull for gestures like doubletap, where you need to know if the
         * previous gesture was a tap
         *
         * options that have been set by the instance can be received by calling inst.options
         *
         * You can trigger a gesture event by calling inst.trigger("mygesture", event).
         * The first param is the name of your gesture, the second the event argument
         *
         *
         * Register gestures
         * --------------------
         * When an gesture is added to the ionic.Gestures.gestures object, it is auto registered
         * at the setup of the first ionic.Gestures instance. You can also call ionic.Gestures.detectionic.register
         * manually and pass your gesture object as a param
         *
         */
      
        /**
         * Hold
         * Touch stays at the same place for x time
         * events  hold
         */
        ionic.Gestures.gestures.Hold = {
          name: 'hold',
          index: 10,
          defaults: {
            hold_timeout	: 500,
            hold_threshold	: 1
          },
          timer: null,
          handler: function holdGesture(ev, inst) {
            switch(ev.eventType) {
              case ionic.Gestures.EVENT_START:
                // clear any running timers
                clearTimeout(this.timer);
      
                // set the gesture so we can check in the timeout if it still is
                ionic.Gestures.detection.current.name = this.name;
      
                // set timer and if after the timeout it still is hold,
                // we trigger the hold event
                this.timer = setTimeout(function() {
                  if(ionic.Gestures.detection.current.name == 'hold') {
                    ionic.tap.cancelClick();
                    inst.trigger('hold', ev);
                  }
                }, inst.options.hold_timeout);
                break;
      
                // when you move or end we clear the timer
              case ionic.Gestures.EVENT_MOVE:
                if(ev.distance > inst.options.hold_threshold) {
                  clearTimeout(this.timer);
                }
                break;
      
              case ionic.Gestures.EVENT_END:
                clearTimeout(this.timer);
                break;
            }
          }
        };
      
      
        /**
         * Tap/DoubleTap
         * Quick touch at a place or double at the same place
         * events  tap, doubletap
         */
        ionic.Gestures.gestures.Tap = {
          name: 'tap',
          index: 100,
          defaults: {
            tap_max_touchtime	: 250,
            tap_max_distance	: 10,
            tap_always			: true,
            doubletap_distance	: 20,
            doubletap_interval	: 300
          },
          handler: function tapGesture(ev, inst) {
            if(ev.eventType == ionic.Gestures.EVENT_END && ev.srcEvent.type != 'touchcancel') {
              // previous gesture, for the double tap since these are two different gesture detections
              var prev = ionic.Gestures.detection.previous,
              did_doubletap = false;
      
              // when the touchtime is higher then the max touch time
              // or when the moving distance is too much
              if(ev.deltaTime > inst.options.tap_max_touchtime ||
                  ev.distance > inst.options.tap_max_distance) {
                    return;
                  }
      
              // check if double tap
              if(prev && prev.name == 'tap' &&
                  (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval &&
                  ev.distance < inst.options.doubletap_distance) {
                    inst.trigger('doubletap', ev);
                    did_doubletap = true;
                  }
      
              // do a single tap
              if(!did_doubletap || inst.options.tap_always) {
                ionic.Gestures.detection.current.name = 'tap';
                inst.trigger('tap', ev);
              }
            }
          }
        };
      
      
        /**
         * Swipe
         * triggers swipe events when the end velocity is above the threshold
         * events  swipe, swipeleft, swiperight, swipeup, swipedown
         */
        ionic.Gestures.gestures.Swipe = {
          name: 'swipe',
          index: 40,
          defaults: {
            // set 0 for unlimited, but this can conflict with transform
            swipe_max_touches  : 1,
            swipe_velocity     : 0.7
          },
          handler: function swipeGesture(ev, inst) {
            if(ev.eventType == ionic.Gestures.EVENT_END) {
              // max touches
              if(inst.options.swipe_max_touches > 0 &&
                  ev.touches.length > inst.options.swipe_max_touches) {
                    return;
                  }
      
              // when the distance we moved is too small we skip this gesture
              // or we can be already in dragging
              if(ev.velocityX > inst.options.swipe_velocity ||
                  ev.velocityY > inst.options.swipe_velocity) {
                    // trigger swipe events
                    inst.trigger(this.name, ev);
                    inst.trigger(this.name + ev.direction, ev);
                  }
            }
          }
        };
      
      
        /**
         * Drag
         * Move with x fingers (default 1) around on the page. Blocking the scrolling when
         * moving left and right is a good practice. When all the drag events are blocking
         * you disable scrolling on that area.
         * events  drag, drapleft, dragright, dragup, dragdown
         */
        ionic.Gestures.gestures.Drag = {
          name: 'drag',
          index: 50,
          defaults: {
            drag_min_distance : 10,
            // Set correct_for_drag_min_distance to true to make the starting point of the drag
            // be calculated from where the drag was triggered, not from where the touch started.
            // Useful to avoid a jerk-starting drag, which can make fine-adjustments
            // through dragging difficult, and be visually unappealing.
            correct_for_drag_min_distance : true,
            // set 0 for unlimited, but this can conflict with transform
            drag_max_touches  : 1,
            // prevent default browser behavior when dragging occurs
            // be careful with it, it makes the element a blocking element
            // when you are using the drag gesture, it is a good practice to set this true
            drag_block_horizontal   : true,
            drag_block_vertical     : true,
            // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
            // It disallows vertical directions if the initial direction was horizontal, and vice versa.
            drag_lock_to_axis       : false,
            // drag lock only kicks in when distance > drag_lock_min_distance
            // This way, locking occurs only when the distance has become large enough to reliably determine the direction
            drag_lock_min_distance : 25
          },
          triggered: false,
          handler: function dragGesture(ev, inst) {
            // current gesture isnt drag, but dragged is true
            // this means an other gesture is busy. now call dragend
            if(ionic.Gestures.detection.current.name != this.name && this.triggered) {
              inst.trigger(this.name +'end', ev);
              this.triggered = false;
              return;
            }
      
            // max touches
            if(inst.options.drag_max_touches > 0 &&
                ev.touches.length > inst.options.drag_max_touches) {
                  return;
                }
      
            switch(ev.eventType) {
              case ionic.Gestures.EVENT_START:
                this.triggered = false;
                break;
      
              case ionic.Gestures.EVENT_MOVE:
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(ev.distance < inst.options.drag_min_distance &&
                    ionic.Gestures.detection.current.name != this.name) {
                      return;
                    }
      
                // we are dragging!
                if(ionic.Gestures.detection.current.name != this.name) {
                  ionic.Gestures.detection.current.name = this.name;
                  if (inst.options.correct_for_drag_min_distance) {
                    // When a drag is triggered, set the event center to drag_min_distance pixels from the original event center.
                    // Without this correction, the dragged distance would jumpstart at drag_min_distance pixels instead of at 0.
                    // It might be useful to save the original start point somewhere
                    var factor = Math.abs(inst.options.drag_min_distance/ev.distance);
                    ionic.Gestures.detection.current.startEvent.center.pageX += ev.deltaX * factor;
                    ionic.Gestures.detection.current.startEvent.center.pageY += ev.deltaY * factor;
      
                    // recalculate event data using new start point
                    ev = ionic.Gestures.detection.extendEventData(ev);
                  }
                }
      
                // lock drag to axis?
                if(ionic.Gestures.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance<=ev.distance)) {
                  ev.drag_locked_to_axis = true;
                }
                var last_direction = ionic.Gestures.detection.current.lastEvent.direction;
                if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
                  // keep direction on the axis that the drag gesture started on
                  if(ionic.Gestures.utils.isVertical(last_direction)) {
                    ev.direction = (ev.deltaY < 0) ? ionic.Gestures.DIRECTION_UP : ionic.Gestures.DIRECTION_DOWN;
                  }
                  else {
                    ev.direction = (ev.deltaX < 0) ? ionic.Gestures.DIRECTION_LEFT : ionic.Gestures.DIRECTION_RIGHT;
                  }
                }
      
                // first time, trigger dragstart event
                if(!this.triggered) {
                  inst.trigger(this.name +'start', ev);
                  this.triggered = true;
                }
      
                // trigger normal event
                inst.trigger(this.name, ev);
      
                // direction event, like dragdown
                inst.trigger(this.name + ev.direction, ev);
      
                // block the browser events
                if( (inst.options.drag_block_vertical && ionic.Gestures.utils.isVertical(ev.direction)) ||
                    (inst.options.drag_block_horizontal && !ionic.Gestures.utils.isVertical(ev.direction))) {
                      ev.preventDefault();
                    }
                break;
      
              case ionic.Gestures.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                  inst.trigger(this.name +'end', ev);
                }
      
                this.triggered = false;
                break;
            }
          }
        };
      
      
        /**
         * Transform
         * User want to scale or rotate with 2 fingers
         * events  transform, pinch, pinchin, pinchout, rotate
         */
        ionic.Gestures.gestures.Transform = {
          name: 'transform',
          index: 45,
          defaults: {
            // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
            transform_min_scale     : 0.01,
            // rotation in degrees
            transform_min_rotation  : 1,
            // prevent default browser behavior when two touches are on the screen
            // but it makes the element a blocking element
            // when you are using the transform gesture, it is a good practice to set this true
            transform_always_block  : false
          },
          triggered: false,
          handler: function transformGesture(ev, inst) {
            // current gesture isnt drag, but dragged is true
            // this means an other gesture is busy. now call dragend
            if(ionic.Gestures.detection.current.name != this.name && this.triggered) {
              inst.trigger(this.name +'end', ev);
              this.triggered = false;
              return;
            }
      
            // atleast multitouch
            if(ev.touches.length < 2) {
              return;
            }
      
            // prevent default when two fingers are on the screen
            if(inst.options.transform_always_block) {
              ev.preventDefault();
            }
      
            switch(ev.eventType) {
              case ionic.Gestures.EVENT_START:
                this.triggered = false;
                break;
      
              case ionic.Gestures.EVENT_MOVE:
                var scale_threshold = Math.abs(1-ev.scale);
                var rotation_threshold = Math.abs(ev.rotation);
      
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(scale_threshold < inst.options.transform_min_scale &&
                    rotation_threshold < inst.options.transform_min_rotation) {
                      return;
                    }
      
                // we are transforming!
                ionic.Gestures.detection.current.name = this.name;
      
                // first time, trigger dragstart event
                if(!this.triggered) {
                  inst.trigger(this.name +'start', ev);
                  this.triggered = true;
                }
      
                inst.trigger(this.name, ev); // basic transform event
      
                // trigger rotate event
                if(rotation_threshold > inst.options.transform_min_rotation) {
                  inst.trigger('rotate', ev);
                }
      
                // trigger pinch event
                if(scale_threshold > inst.options.transform_min_scale) {
                  inst.trigger('pinch', ev);
                  inst.trigger('pinch'+ ((ev.scale < 1) ? 'in' : 'out'), ev);
                }
                break;
      
              case ionic.Gestures.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                  inst.trigger(this.name +'end', ev);
                }
      
                this.triggered = false;
                break;
            }
          }
        };
      
      
        /**
         * Touch
         * Called as first, tells the user has touched the screen
         * events  touch
         */
        ionic.Gestures.gestures.Touch = {
          name: 'touch',
          index: -Infinity,
          defaults: {
            // call preventDefault at touchstart, and makes the element blocking by
            // disabling the scrolling of the page, but it improves gestures like
            // transforming and dragging.
            // be careful with using this, it can be very annoying for users to be stuck
            // on the page
            prevent_default: false,
      
            // disable mouse events, so only touch (or pen!) input triggers events
            prevent_mouseevents: false
          },
          handler: function touchGesture(ev, inst) {
            if(inst.options.prevent_mouseevents && ev.pointerType == ionic.Gestures.POINTER_MOUSE) {
              ev.stopDetect();
              return;
            }
      
            if(inst.options.prevent_default) {
              ev.preventDefault();
            }
      
            if(ev.eventType ==  ionic.Gestures.EVENT_START) {
              inst.trigger(this.name, ev);
            }
          }
        };
      
      
        /**
         * Release
         * Called as last, tells the user has released the screen
         * events  release
         */
        ionic.Gestures.gestures.Release = {
          name: 'release',
          index: Infinity,
          handler: function releaseGesture(ev, inst) {
            if(ev.eventType ==  ionic.Gestures.EVENT_END) {
              inst.trigger(this.name, ev);
            }
          }
        };
      })(window.ionic);
      
      (function(window, document, ionic) {
      
        var IOS = 'ios';
        var ANDROID = 'android';
        var WINDOWS_PHONE = 'windowsphone';
      
        /**
         * @ngdoc utility
         * @name ionic.Platform
         * @module ionic
         */
        ionic.Platform = {
      
          // Put navigator on platform so it can be mocked and set
          // the browser does not allow window.navigator to be set
          navigator: window.navigator,
      
          /**
           * @ngdoc property
           * @name ionic.Platform#isReady
           * @returns {boolean} Whether the device is ready.
           */
          isReady: false,
          /**
           * @ngdoc property
           * @name ionic.Platform#isFullScreen
           * @returns {boolean} Whether the device is fullscreen.
           */
          isFullScreen: false,
          /**
           * @ngdoc property
           * @name ionic.Platform#platforms
           * @returns {Array(string)} An array of all platforms found.
           */
          platforms: null,
          /**
           * @ngdoc property
           * @name ionic.Platform#grade
           * @returns {string} What grade the current platform is.
           */
          grade: null,
          ua: navigator.userAgent,
      
          /**
           * @ngdoc method
           * @name ionic.Platform#ready
           * @description
           * Trigger a callback once the device is ready, or immediately
           * if the device is already ready. This method can be run from
           * anywhere and does not need to be wrapped by any additonal methods.
           * When the app is within a WebView (Cordova), it'll fire
           * the callback once the device is ready. If the app is within
           * a web browser, it'll fire the callback after `window.load`.
           * Please remember that Cordova features (Camera, FileSystem, etc) still
           * will not work in a web browser.
           * @param {function} callback The function to call.
           */
          ready: function(cb) {
            // run through tasks to complete now that the device is ready
            if(this.isReady) {
              cb();
            } else {
              // the platform isn't ready yet, add it to this array
              // which will be called once the platform is ready
              readyCallbacks.push(cb);
            }
          },
      
          /**
           * @private
           */
          detect: function() {
            ionic.Platform._checkPlatforms();
      
            ionic.requestAnimationFrame(function(){
              // only add to the body class if we got platform info
              for(var i = 0; i < ionic.Platform.platforms.length; i++) {
                document.body.classList.add('platform-' + ionic.Platform.platforms[i]);
              }
            });
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#setGrade
           * @description Set the grade of the device: 'a', 'b', or 'c'. 'a' is the best
           * (most css features enabled), 'c' is the worst.  By default, sets the grade
           * depending on the current device.
           * @param {string} grade The new grade to set.
           */
          setGrade: function(grade) {
            var oldGrade = this.grade;
            this.grade = grade;
            ionic.requestAnimationFrame(function() {
              if (oldGrade) {
                document.body.classList.remove('grade-' + oldGrade);
              }
              document.body.classList.add('grade-' + grade);
            });
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#device
           * @description Return the current device (given by cordova).
           * @returns {object} The device object.
           */
          device: function() {
            return window.device || {};
          },
      
          _checkPlatforms: function(platforms) {
            this.platforms = [];
            var grade = 'a';
      
            if(this.isWebView()) {
              this.platforms.push('webview');
              this.platforms.push('cordova');
            } else {
              this.platforms.push('browser');
            }
            if(this.isIPad()) this.platforms.push('ipad');
      
            var platform = this.platform();
            if(platform) {
              this.platforms.push(platform);
      
              var version = this.version();
              if(version) {
                var v = version.toString();
                if(v.indexOf('.') > 0) {
                  v = v.replace('.', '_');
                } else {
                  v += '_0';
                }
                this.platforms.push(platform + v.split('_')[0]);
                this.platforms.push(platform + v);
      
                if(this.isAndroid() && version < 4.4) {
                  grade = (version < 4 ? 'c' : 'b');
                } else if(this.isWindowsPhone()) {
                  grade = 'b';
                }
              }
            }
      
            this.setGrade(grade);
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#isWebView
           * @returns {boolean} Check if we are running within a WebView (such as Cordova).
           */
          isWebView: function() {
            return !(!window.cordova && !window.PhoneGap && !window.phonegap);
          },
          /**
           * @ngdoc method
           * @name ionic.Platform#isIPad
           * @returns {boolean} Whether we are running on iPad.
           */
          isIPad: function() {
            if( /iPad/i.test(ionic.Platform.navigator.platform) ) {
              return true;
            }
            return /iPad/i.test(this.ua);
          },
          /**
           * @ngdoc method
           * @name ionic.Platform#isIOS
           * @returns {boolean} Whether we are running on iOS.
           */
          isIOS: function() {
            return this.is(IOS);
          },
          /**
           * @ngdoc method
           * @name ionic.Platform#isAndroid
           * @returns {boolean} Whether we are running on Android.
           */
          isAndroid: function() {
            return this.is(ANDROID);
          },
          /**
           * @ngdoc method
           * @name ionic.Platform#isWindowsPhone
           * @returns {boolean} Whether we are running on Windows Phone.
           */
          isWindowsPhone: function() {
            return this.is(WINDOWS_PHONE);
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#platform
           * @returns {string} The name of the current platform.
           */
          platform: function() {
            // singleton to get the platform name
            if(platformName === null) this.setPlatform(this.device().platform);
            return platformName;
          },
      
          /**
           * @private
           */
          setPlatform: function(n) {
            if(typeof n != 'undefined' && n !== null && n.length) {
              platformName = n.toLowerCase();
            } else if(this.ua.indexOf('Android') > 0) {
              platformName = ANDROID;
            } else if(this.ua.indexOf('iPhone') > -1 || this.ua.indexOf('iPad') > -1 || this.ua.indexOf('iPod') > -1) {
              platformName = IOS;
            } else if(this.ua.indexOf('Windows Phone') > -1) {
              platformName = WINDOWS_PHONE;
            } else {
              platformName = ionic.Platform.navigator.platform && navigator.platform.toLowerCase().split(' ')[0] || '';
            }
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#version
           * @returns {string} The version of the current device platform.
           */
          version: function() {
            // singleton to get the platform version
            if(platformVersion === null) this.setVersion(this.device().version);
            return platformVersion;
          },
      
          /**
           * @private
           */
          setVersion: function(v) {
            if(typeof v != 'undefined' && v !== null) {
              v = v.split('.');
              v = parseFloat(v[0] + '.' + (v.length > 1 ? v[1] : 0));
              if(!isNaN(v)) {
                platformVersion = v;
                return;
              }
            }
      
            platformVersion = 0;
      
            // fallback to user-agent checking
            var pName = this.platform();
            var versionMatch = {
              'android': /Android (\d+).(\d+)?/,
              'ios': /OS (\d+)_(\d+)?/,
              'windowsphone': /Windows Phone (\d+).(\d+)?/
            };
            if(versionMatch[pName]) {
              v = this.ua.match( versionMatch[pName] );
              if(v &&  v.length > 2) {
                platformVersion = parseFloat( v[1] + '.' + v[2] );
              }
            }
          },
      
          // Check if the platform is the one detected by cordova
          is: function(type) {
            type = type.toLowerCase();
            // check if it has an array of platforms
            if(this.platforms) {
              for(var x = 0; x < this.platforms.length; x++) {
                if(this.platforms[x] === type) return true;
              }
            }
            // exact match
            var pName = this.platform();
            if(pName) {
              return pName === type.toLowerCase();
            }
      
            // A quick hack for to check userAgent
            return this.ua.toLowerCase().indexOf(type) >= 0;
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#exitApp
           * @description Exit the app.
           */
          exitApp: function() {
            this.ready(function(){
              navigator.app && navigator.app.exitApp && navigator.app.exitApp();
            });
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#showStatusBar
           * @description Shows or hides the device status bar (in Cordova).
           * @param {boolean} shouldShow Whether or not to show the status bar.
           */
          showStatusBar: function(val) {
            // Only useful when run within cordova
            this._showStatusBar = val;
            this.ready(function(){
              // run this only when or if the platform (cordova) is ready
              ionic.requestAnimationFrame(function(){
                if(ionic.Platform._showStatusBar) {
                  // they do not want it to be full screen
                  window.StatusBar && window.StatusBar.show();
                  document.body.classList.remove('status-bar-hide');
                } else {
                  // it should be full screen
                  window.StatusBar && window.StatusBar.hide();
                  document.body.classList.add('status-bar-hide');
                }
              });
            });
          },
      
          /**
           * @ngdoc method
           * @name ionic.Platform#fullScreen
           * @description
           * Sets whether the app is fullscreen or not (in Cordova).
           * @param {boolean=} showFullScreen Whether or not to set the app to fullscreen. Defaults to true.
           * @param {boolean=} showStatusBar Whether or not to show the device's status bar. Defaults to false.
           */
          fullScreen: function(showFullScreen, showStatusBar) {
            // showFullScreen: default is true if no param provided
            this.isFullScreen = (showFullScreen !== false);
      
            // add/remove the fullscreen classname to the body
            ionic.DomUtil.ready(function(){
              // run this only when or if the DOM is ready
              ionic.requestAnimationFrame(function(){
                // fixing pane height before we adjust this
                panes = document.getElementsByClassName('pane');
                for(var i = 0;i<panes.length;i++){
                  panes[i].style.height = panes[i].offsetHeight+"px";
                }
                if(ionic.Platform.isFullScreen) {
                  document.body.classList.add('fullscreen');
                } else {
                  document.body.classList.remove('fullscreen');
                }
              });
              // showStatusBar: default is false if no param provided
              ionic.Platform.showStatusBar( (showStatusBar === true) );
            });
          }
      
        };
      
        var platformName = null, // just the name, like iOS or Android
        platformVersion = null, // a float of the major and minor, like 7.1
        readyCallbacks = [],
        windowLoadListenderAttached;
      
        // setup listeners to know when the device is ready to go
        function onWindowLoad() {
          if(ionic.Platform.isWebView()) {
            // the window and scripts are fully loaded, and a cordova/phonegap
            // object exists then let's listen for the deviceready
            document.addEventListener("deviceready", onPlatformReady, false);
          } else {
            // the window and scripts are fully loaded, but the window object doesn't have the
            // cordova/phonegap object, so its just a browser, not a webview wrapped w/ cordova
            onPlatformReady();
          }
          if (windowLoadListenderAttached){
            window.removeEventListener("load", onWindowLoad, false);
          }
        }
        if (document.readyState === 'complete') {
          onWindowLoad();
        } else {
          windowLoadListenderAttached = true;
          window.addEventListener("load", onWindowLoad, false);
        }
        
        window.addEventListener("load", onWindowLoad, false);
      
        function onPlatformReady() {
          // the device is all set to go, init our own stuff then fire off our event
          ionic.Platform.isReady = true;
          ionic.Platform.detect();
          for(var x=0; x<readyCallbacks.length; x++) {
            // fire off all the callbacks that were added before the platform was ready
            readyCallbacks[x]();
          }
          readyCallbacks = [];
          ionic.trigger('platformready', { target: document });
      
          ionic.requestAnimationFrame(function(){
            document.body.classList.add('platform-ready');
          });
        }
      
      })(this, document, ionic);
      
      (function(document, ionic) {
        'use strict';
      
        // Ionic CSS polyfills
        ionic.CSS = {};
      
        (function() {
      
          // transform
          var i, keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform',
                         '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
      
          for(i = 0; i < keys.length; i++) {
            if(document.documentElement.style[keys[i]] !== undefined) {
              ionic.CSS.TRANSFORM = keys[i];
              break;
            }
          }
      
          // transition
          keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
          for(i = 0; i < keys.length; i++) {
            if(document.documentElement.style[keys[i]] !== undefined) {
              ionic.CSS.TRANSITION = keys[i];
              break;
            }
          }
      
        })();
      
        // classList polyfill for them older Androids
        // https://gist.github.com/devongovett/1381839
        if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
          Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
              var self = this;
              function update(fn) {
                return function() {
                  var x, classes = self.className.split(/\s+/);
      
                  for(x=0; x<arguments.length; x++) {
                    fn(classes, classes.indexOf(arguments[x]), arguments[x]);
                  }
      
                  self.className = classes.join(" ");
                };
              }
      
              return {
                add: update(function(classes, index, value) {
                  ~index || classes.push(value);
                }),
      
                remove: update(function(classes, index) {
                  ~index && classes.splice(index, 1);
                }),
      
                toggle: update(function(classes, index, value) {
                  ~index ? classes.splice(index, 1) : classes.push(value);
                }),
      
                contains: function(value) {
                  return !!~self.className.split(/\s+/).indexOf(value);
                },
      
                item: function(i) {
                  return self.className.split(/\s+/)[i] || null;
                }
              };
      
            }
          });
        }
      
      })(document, ionic);
      
      
      /**
       * @ngdoc page
       * @name tap
       * @module ionic
       * @description
       * On touch devices such as a phone or tablet, some browsers implement a 300ms delay between
       * the time the user stops touching the display and the moment the browser executes the
       * click. This delay was initially introduced so the browser can know whether the user wants to
       * double-tap to zoom in on the webpage.  Basically, the browser waits roughly 300ms to see if
       * the user is double-tapping, or just tapping on the display once.
       *
       * Out of the box, Ionic automatically removes the 300ms delay in order to make Ionic apps
       * feel more "native" like. Resultingly, other solutions such as
       * [fastclick](https://github.com/ftlabs/fastclick) and Angular's
       * [ngTouch](https://docs.angularjs.org/api/ngTouch) should not be included, to avoid conflicts.
       *
       * Some browsers already remove the delay with certain settings, such as the CSS property
       * `touch-events: none` or with specific meta tag viewport values. However, each of these
       * browsers still handle clicks differently, such as when to fire off or cancel the event
       * (like scrolling when the target is a button, or holding a button down).
       * For browsers that already remove the 300ms delay, consider Ionic's tap system as a way to
       * normalize how clicks are handled across the various devices so there's an expected response
       * no matter what the device, platform or version. Additionally, Ionic will prevent
       * ghostclicks which even browsers that remove the delay still experience.
       *
       * In some cases, third-party libraries may also be working with touch events which can interfere
       * with the tap system. For example, mapping libraries like Google or Leaflet Maps often implement
       * a touch detection system which conflicts with Ionic's tap system.
       *
       * ### Disabling the tap system
       *
       * To disable the tap for an element and all of its children elements,
       * add the attribute `data-tap-disabled="true"`.
       *
       * ```html
       * <div data-tap-disabled="true">
       *     <div id="google-map"></div>
       * </div>
       * ```
       *
       * ### Additional Notes:
       *
       * - Ionic tap  works with Ionic's JavaScript scrolling
       * - Elements can come and go from the DOM and Ionic tap doesn't keep adding and removing
       *   listeners
       * - No "tap delay" after the first "tap" (you can tap as fast as you want, they all click)
       * - Minimal events listeners, only being added to document
       * - Correct focus in/out on each input type (select, textearea, range) on each platform/device
       * - Shows and hides virtual keyboard correctly for each platform/device
       * - Works with labels surrounding inputs
       * - Does not fire off a click if the user moves the pointer too far
       * - Adds and removes an 'activated' css class
       * - Multiple [unit tests](https://github.com/driftyco/ionic/blob/master/test/unit/utils/tap.unit.js) for each scenario
       *
       */
      /*
      
       IONIC TAP
       ---------------
       - Both touch and mouse events are added to the document.body on DOM ready
       - If a touch event happens, it does not use mouse event listeners
       - On touchend, if the distance between start and end was small, trigger a click
       - In the triggered click event, add a 'isIonicTap' property
       - The triggered click receives the same x,y coordinates as as the end event
       - On document.body click listener (with useCapture=true), only allow clicks with 'isIonicTap'
       - Triggering clicks with mouse events work the same as touch, except with mousedown/mouseup
       - Tapping inputs is disabled during scrolling
      */
      
      var tapDoc; // the element which the listeners are on (document.body)
      var tapActiveEle; // the element which is active (probably has focus)
      var tapEnabledTouchEvents;
      var tapMouseResetTimer;
      var tapPointerMoved;
      var tapPointerStart;
      var tapTouchFocusedInput;
      var tapLastTouchTarget;
      var tapTouchMoveListener = 'touchmove';
      
      // how much the coordinates can be off between start/end, but still a click
      var TAP_RELEASE_TOLERANCE = 6; // default tolerance
      var TAP_RELEASE_BUTTON_TOLERANCE = 50; // button elements should have a larger tolerance
      
      var tapEventListeners = {
        'click': tapClickGateKeeper,
      
        'mousedown': tapMouseDown,
        'mouseup': tapMouseUp,
        'mousemove': tapMouseMove,
      
        'touchstart': tapTouchStart,
        'touchend': tapTouchEnd,
        'touchcancel': tapTouchCancel,
        'touchmove': tapTouchMove,
      
        'pointerdown': tapTouchStart,
        'pointerup': tapTouchEnd,
        'pointercancel': tapTouchCancel,
        'pointermove': tapTouchMove,
      
        'MSPointerDown': tapTouchStart,
        'MSPointerUp': tapTouchEnd,
        'MSPointerCancel': tapTouchCancel,
        'MSPointerMove': tapTouchMove,
      
        'focusin': tapFocusIn,
        'focusout': tapFocusOut
      };
      
      ionic.tap = {
      
        register: function(ele) {
          tapDoc = ele;
      
          tapEventListener('click', true, true);
          tapEventListener('mouseup');
          tapEventListener('mousedown');
      
          if( window.navigator.pointerEnabled ) {
            tapEventListener('pointerdown');
            tapEventListener('pointerup');
            tapEventListener('pointcancel');
            tapTouchMoveListener = 'pointermove';
      
          } else if (window.navigator.msPointerEnabled) {
            tapEventListener('MSPointerDown');
            tapEventListener('MSPointerUp');
            tapEventListener('MSPointerCancel');
            tapTouchMoveListener = 'MSPointerMove';
      
          } else {
            tapEventListener('touchstart');
            tapEventListener('touchend');
            tapEventListener('touchcancel');
          }
      
          tapEventListener('focusin');
          tapEventListener('focusout');
      
          return function() {
            for(var type in tapEventListeners) {
              tapEventListener(type, false);
            }
            tapDoc = null;
            tapActiveEle = null;
            tapEnabledTouchEvents = false;
            tapPointerMoved = false;
            tapPointerStart = null;
          };
        },
      
        ignoreScrollStart: function(e) {
          return (e.defaultPrevented) ||  // defaultPrevented has been assigned by another component handling the event
                 (/^(file|range)$/i).test(e.target.type) ||
                 (e.target.dataset ? e.target.dataset.preventScroll : e.target.getAttribute('data-prevent-scroll')) == 'true' || // manually set within an elements attributes
                 (!!(/^(object|embed)$/i).test(e.target.tagName)) ||  // flash/movie/object touches should not try to scroll
                 ionic.tap.isElementTapDisabled(e.target); // check if this element, or an ancestor, has `data-tap-disabled` attribute
        },
      
        isTextInput: function(ele) {
          return !!ele &&
                 (ele.tagName == 'TEXTAREA' ||
                  ele.contentEditable === 'true' ||
                  (ele.tagName == 'INPUT' && !(/^(radio|checkbox|range|file|submit|reset)$/i).test(ele.type)) );
        },
      
        isDateInput: function(ele) {
          return !!ele &&
                  (ele.tagName == 'INPUT' && (/^(date|time|datetime-local|month|week)$/i).test(ele.type));
        },
      
        isLabelWithTextInput: function(ele) {
          var container = tapContainingElement(ele, false);
      
          return !!container &&
                 ionic.tap.isTextInput( tapTargetElement( container ) );
        },
      
        containsOrIsTextInput: function(ele) {
          return ionic.tap.isTextInput(ele) || ionic.tap.isLabelWithTextInput(ele);
        },
      
        cloneFocusedInput: function(container, scrollIntance) {
          if(ionic.tap.hasCheckedClone) return;
          ionic.tap.hasCheckedClone = true;
      
          ionic.requestAnimationFrame(function(){
            var focusInput = container.querySelector(':focus');
            if( ionic.tap.isTextInput(focusInput) ) {
              var clonedInput = focusInput.parentElement.querySelector('.cloned-text-input');
              if(!clonedInput) {
                clonedInput = document.createElement(focusInput.tagName);
                clonedInput.placeholder = focusInput.placeholder;
                clonedInput.type = focusInput.type;
                clonedInput.value = focusInput.value;
                clonedInput.style = focusInput.style;
                clonedInput.className = focusInput.className;
                clonedInput.classList.add('cloned-text-input');
                clonedInput.readOnly = true;
                if (focusInput.isContentEditable) {
                  clonedInput.contentEditable = focusInput.contentEditable;
                  clonedInput.innerHTML = focusInput.innerHTML;
                }
                focusInput.parentElement.insertBefore(clonedInput, focusInput);
                focusInput.style.top = focusInput.offsetTop;
                focusInput.classList.add('previous-input-focus');
              }
            }
          });
        },
      
        hasCheckedClone: false,
      
        removeClonedInputs: function(container, scrollIntance) {
          ionic.tap.hasCheckedClone = false;
      
          ionic.requestAnimationFrame(function(){
            var clonedInputs = container.querySelectorAll('.cloned-text-input');
            var previousInputFocus = container.querySelectorAll('.previous-input-focus');
            var x;
      
            for(x=0; x<clonedInputs.length; x++) {
              clonedInputs[x].parentElement.removeChild( clonedInputs[x] );
            }
      
            for(x=0; x<previousInputFocus.length; x++) {
              previousInputFocus[x].classList.remove('previous-input-focus');
              previousInputFocus[x].style.top = '';
              previousInputFocus[x].focus();
            }
          });
        },
      
        requiresNativeClick: function(ele) {
          if(!ele || ele.disabled || (/^(file|range)$/i).test(ele.type) || (/^(object|video)$/i).test(ele.tagName) || ionic.tap.isLabelContainingFileInput(ele) ) {
            return true;
          }
          return ionic.tap.isElementTapDisabled(ele);
        },
      
        isLabelContainingFileInput: function(ele) {
          var lbl = tapContainingElement(ele);
          if(lbl.tagName !== 'LABEL') return false;
          var fileInput = lbl.querySelector('input[type=file]');
          if(fileInput && fileInput.disabled === false) return true;
          return false;
        },
      
        isElementTapDisabled: function(ele) {
          if(ele && ele.nodeType === 1) {
            var element = ele;
            while(element) {
              if( (element.dataset ? element.dataset.tapDisabled : element.getAttribute('data-tap-disabled')) == 'true' ) {
                return true;
              }
              element = element.parentElement;
            }
          }
          return false;
        },
      
        setTolerance: function(releaseTolerance, releaseButtonTolerance) {
          TAP_RELEASE_TOLERANCE = releaseTolerance;
          TAP_RELEASE_BUTTON_TOLERANCE = releaseButtonTolerance;
        },
      
        cancelClick: function() {
          // used to cancel any simulated clicks which may happen on a touchend/mouseup
          // gestures uses this method within its tap and hold events
          tapPointerMoved = true;
        },
      
        pointerCoord: function(event) {
          // This method can get coordinates for both a mouse click
          // or a touch depending on the given event
          var c = { x:0, y:0 };
          if(event) {
            var touches = event.touches && event.touches.length ? event.touches : [event];
            var e = (event.changedTouches && event.changedTouches[0]) || touches[0];
            if(e) {
              c.x = e.clientX || e.pageX || 0;
              c.y = e.clientY || e.pageY || 0;
            }
          }
          return c;
        }
      
      };
      
      function tapEventListener(type, enable, useCapture) {
        if(enable !== false) {
          tapDoc.addEventListener(type, tapEventListeners[type], useCapture);
        } else {
          tapDoc.removeEventListener(type, tapEventListeners[type]);
        }
      }
      
      function tapClick(e) {
        // simulate a normal click by running the element's click method then focus on it
        var container = tapContainingElement(e.target);
        var ele = tapTargetElement(container);
      
        if( ionic.tap.requiresNativeClick(ele) || tapPointerMoved ) return false;
      
        var c = ionic.tap.pointerCoord(e);
      
        void 0;
        triggerMouseEvent('click', ele, c.x, c.y);
      
        // if it's an input, focus in on the target, otherwise blur
        tapHandleFocus(ele);
      }
      
      function triggerMouseEvent(type, ele, x, y) {
        // using initMouseEvent instead of MouseEvent for our Android friends
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.initMouseEvent(type, true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
        clickEvent.isIonicTap = true;
        ele.dispatchEvent(clickEvent);
      }
      
      function tapClickGateKeeper(e) {
        if(e.target.type == 'submit' && e.detail === 0) {
          // do not prevent click if it came from an "Enter" or "Go" keypress submit
          return;
        }
      
        // do not allow through any click events that were not created by ionic.tap
        if( (ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target) ) ||
            (!e.isIonicTap && !ionic.tap.requiresNativeClick(e.target)) ) {
          void 0;
          e.stopPropagation();
      
          if( !ionic.tap.isLabelWithTextInput(e.target) ) {
            // labels clicks from native should not preventDefault othersize keyboard will not show on input focus
            e.preventDefault();
          }
          return false;
        }
      }
      
      // MOUSE
      function tapMouseDown(e) {
        if(e.isIonicTap || tapIgnoreEvent(e)) return;
      
        if(tapEnabledTouchEvents) {
          void 0;
          e.stopPropagation();
      
          if( (!ionic.tap.isTextInput(e.target) || tapLastTouchTarget !== e.target) && !(/^(select|option)$/i).test(e.target.tagName) ) {
            // If you preventDefault on a text input then you cannot move its text caret/cursor.
            // Allow through only the text input default. However, without preventDefault on an
            // input the 300ms delay can change focus on inputs after the keyboard shows up.
            // The focusin event handles the chance of focus changing after the keyboard shows.
            e.preventDefault();
          }
      
          return false;
        }
      
        tapPointerMoved = false;
        tapPointerStart = ionic.tap.pointerCoord(e);
      
        tapEventListener('mousemove');
        ionic.activator.start(e);
      }
      
      function tapMouseUp(e) {
        if(tapEnabledTouchEvents) {
          e.stopPropagation();
          e.preventDefault();
          return false;
        }
      
        if( tapIgnoreEvent(e) || (/^(select|option)$/i).test(e.target.tagName) ) return false;
      
        if( !tapHasPointerMoved(e) ) {
          tapClick(e);
        }
        tapEventListener('mousemove', false);
        ionic.activator.end();
        tapPointerMoved = false;
      }
      
      function tapMouseMove(e) {
        if( tapHasPointerMoved(e) ) {
          tapEventListener('mousemove', false);
          ionic.activator.end();
          tapPointerMoved = true;
          return false;
        }
      }
      
      
      // TOUCH
      function tapTouchStart(e) {
        if( tapIgnoreEvent(e) ) return;
      
        tapPointerMoved = false;
      
        tapEnableTouchEvents();
        tapPointerStart = ionic.tap.pointerCoord(e);
      
        tapEventListener(tapTouchMoveListener);
        ionic.activator.start(e);
      
        if( ionic.Platform.isIOS() && ionic.tap.isLabelWithTextInput(e.target) ) {
          // if the tapped element is a label, which has a child input
          // then preventDefault so iOS doesn't ugly auto scroll to the input
          // but do not prevent default on Android or else you cannot move the text caret
          // and do not prevent default on Android or else no virtual keyboard shows up
      
          var textInput = tapTargetElement( tapContainingElement(e.target) );
          if( textInput !== tapActiveEle ) {
            // don't preventDefault on an already focused input or else iOS's text caret isn't usable
            e.preventDefault();
          }
        }
      }
      
      function tapTouchEnd(e) {
        if( tapIgnoreEvent(e) ) return;
      
        tapEnableTouchEvents();
        if( !tapHasPointerMoved(e) ) {
          tapClick(e);
      
          if( (/^(select|option)$/i).test(e.target.tagName) ) {
            e.preventDefault();
          }
        }
      
        tapLastTouchTarget = e.target;
        tapTouchCancel();
      }
      
      function tapTouchMove(e) {
        if( tapHasPointerMoved(e) ) {
          tapPointerMoved = true;
          tapEventListener(tapTouchMoveListener, false);
          ionic.activator.end();
          return false;
        }
      }
      
      function tapTouchCancel(e) {
        tapEventListener(tapTouchMoveListener, false);
        ionic.activator.end();
        tapPointerMoved = false;
      }
      
      function tapEnableTouchEvents() {
        tapEnabledTouchEvents = true;
        clearTimeout(tapMouseResetTimer);
        tapMouseResetTimer = setTimeout(function(){
          tapEnabledTouchEvents = false;
        }, 2000);
      }
      
      function tapIgnoreEvent(e) {
        if(e.isTapHandled) return true;
        e.isTapHandled = true;
      
        if( ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target) ) {
          e.preventDefault();
          return true;
        }
      }
      
      function tapHandleFocus(ele) {
        tapTouchFocusedInput = null;
      
        var triggerFocusIn = false;
      
        if(ele.tagName == 'SELECT') {
          // trick to force Android options to show up
          triggerMouseEvent('mousedown', ele, 0, 0);
          ele.focus && ele.focus();
          triggerFocusIn = true;
      
        } else if(tapActiveElement() === ele) {
          // already is the active element and has focus
          triggerFocusIn = true;
      
        } else if( (/^(input|textarea)$/i).test(ele.tagName) || ele.isContentEditable ) {
          triggerFocusIn = true;
          ele.focus && ele.focus();
          ele.value = ele.value;
          if( tapEnabledTouchEvents ) {
            tapTouchFocusedInput = ele;
          }
      
        } else {
          tapFocusOutActive();
        }
      
        if(triggerFocusIn) {
          tapActiveElement(ele);
          ionic.trigger('ionic.focusin', {
            target: ele
          }, true);
        }
      }
      
      function tapFocusOutActive() {
        var ele = tapActiveElement();
        if(ele && ((/^(input|textarea|select)$/i).test(ele.tagName) || ele.isContentEditable) ) {
          void 0;
          ele.blur();
        }
        tapActiveElement(null);
      }
      
      function tapFocusIn(e) {
        // Because a text input doesn't preventDefault (so the caret still works) there's a chance
        // that it's mousedown event 300ms later will change the focus to another element after
        // the keyboard shows up.
      
        if( tapEnabledTouchEvents &&
            ionic.tap.isTextInput( tapActiveElement() ) &&
            ionic.tap.isTextInput(tapTouchFocusedInput) &&
            tapTouchFocusedInput !== e.target ) {
      
          // 1) The pointer is from touch events
          // 2) There is an active element which is a text input
          // 3) A text input was just set to be focused on by a touch event
          // 4) A new focus has been set, however the target isn't the one the touch event wanted
          void 0;
          tapTouchFocusedInput.focus();
          tapTouchFocusedInput = null;
        }
        ionic.scroll.isScrolling = false;
      }
      
      function tapFocusOut() {
        tapActiveElement(null);
      }
      
      function tapActiveElement(ele) {
        if(arguments.length) {
          tapActiveEle = ele;
        }
        return tapActiveEle || document.activeElement;
      }
      
      function tapHasPointerMoved(endEvent) {
        if(!endEvent || endEvent.target.nodeType !== 1 || !tapPointerStart || ( tapPointerStart.x === 0 && tapPointerStart.y === 0 )) {
          return false;
        }
        var endCoordinates = ionic.tap.pointerCoord(endEvent);
      
        var hasClassList = !!(endEvent.target.classList && endEvent.target.classList.contains);
        var releaseTolerance = hasClassList & endEvent.target.classList.contains('button') ?
          TAP_RELEASE_BUTTON_TOLERANCE :
          TAP_RELEASE_TOLERANCE;
      
        return Math.abs(tapPointerStart.x - endCoordinates.x) > releaseTolerance ||
               Math.abs(tapPointerStart.y - endCoordinates.y) > releaseTolerance;
      }
      
      function tapContainingElement(ele, allowSelf) {
        var climbEle = ele;
        for(var x=0; x<6; x++) {
          if(!climbEle) break;
          if(climbEle.tagName === 'LABEL') return climbEle;
          climbEle = climbEle.parentElement;
        }
        if(allowSelf !== false) return ele;
      }
      
      function tapTargetElement(ele) {
        if(ele && ele.tagName === 'LABEL') {
          if(ele.control) return ele.control;
      
          // older devices do not support the "control" property
          if(ele.querySelector) {
            var control = ele.querySelector('input,textarea,select');
            if(control) return control;
          }
        }
        return ele;
      }
      
      ionic.DomUtil.ready(function(){
        var ng = typeof angular !== 'undefined' ? angular : null;
        //do nothing for e2e tests
        if (!ng || (ng && !ng.scenario)) {
          ionic.tap.register(document);
        }
      });
      
      (function(document, ionic) {
        'use strict';
      
        var queueElements = {};   // elements that should get an active state in XX milliseconds
        var activeElements = {};  // elements that are currently active
        var keyId = 0;            // a counter for unique keys for the above ojects
        var ACTIVATED_CLASS = 'activated';
      
        ionic.activator = {
      
          start: function(e) {
            var self = this;
      
            // when an element is touched/clicked, it climbs up a few
            // parents to see if it is an .item or .button element
            ionic.requestAnimationFrame(function(){
              if ( ionic.tap.requiresNativeClick(e.target) ) return;
              var ele = e.target;
              var eleToActivate;
      
              for(var x=0; x<6; x++) {
                if(!ele || ele.nodeType !== 1) break;
                if(eleToActivate && ele.classList.contains('item')) {
                  eleToActivate = ele;
                  break;
                }
                if( ele.tagName == 'A' || ele.tagName == 'BUTTON' || ele.hasAttribute('ng-click') ) {
                  eleToActivate = ele;
                  break;
                }
                if( ele.classList.contains('button') ) {
                  eleToActivate = ele;
                  break;
                }
                // no sense climbing past these
                if(ele.classList.contains('pane') || ele.tagName == 'BODY' || ele.tagName == 'ION-CONTENT'){
                  break;
                }
                ele = ele.parentElement;
              }
      
              if(eleToActivate) {
                // queue that this element should be set to active
                queueElements[keyId] = eleToActivate;
      
                // in XX milliseconds, set the queued elements to active
                if(e.type === 'touchstart') {
                  self._activateTimeout = setTimeout(activateElements, 80);
                } else {
                  ionic.requestAnimationFrame(activateElements);
                }
      
                keyId = (keyId > 19 ? 0 : keyId + 1);
              }
      
            });
          },
      
          end: function() {
            // clear out any active/queued elements after XX milliseconds
            clearTimeout(this._activateTimeout);
            setTimeout(clear, 200);
          }
      
        };
      
        function clear() {
          // clear out any elements that are queued to be set to active
          queueElements = {};
      
          // in the next frame, remove the active class from all active elements
          ionic.requestAnimationFrame(deactivateElements);
        }
      
        function activateElements() {
          // activate all elements in the queue
          for(var key in queueElements) {
            if(queueElements[key]) {
              queueElements[key].classList.add(ACTIVATED_CLASS);
              activeElements[key] = queueElements[key];
            }
          }
          queueElements = {};
        }
      
        function deactivateElements() {
          for(var key in activeElements) {
            if(activeElements[key]) {
              activeElements[key].classList.remove(ACTIVATED_CLASS);
              delete activeElements[key];
            }
          }
        }
      
      })(document, ionic);
      
      (function(ionic) {
      
        /* for nextUid() function below */
        var uid = ['0','0','0'];
      
        /**
         * Various utilities used throughout Ionic
         *
         * Some of these are adopted from underscore.js and backbone.js, both also MIT licensed.
         */
        ionic.Utils = {
      
          arrayMove: function (arr, old_index, new_index) {
            if (new_index >= arr.length) {
              var k = new_index - arr.length;
              while ((k--) + 1) {
                arr.push(undefined);
              }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
          },
      
          /**
           * Return a function that will be called with the given context
           */
          proxy: function(func, context) {
            var args = Array.prototype.slice.call(arguments, 2);
            return function() {
              return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
            };
          },
      
          /**
           * Only call a function once in the given interval.
           *
           * @param func {Function} the function to call
           * @param wait {int} how long to wait before/after to allow function calls
           * @param immediate {boolean} whether to call immediately or after the wait interval
           */
           debounce: function(func, wait, immediate) {
            var timeout, args, context, timestamp, result;
            return function() {
              context = this;
              args = arguments;
              timestamp = new Date();
              var later = function() {
                var last = (new Date()) - timestamp;
                if (last < wait) {
                  timeout = setTimeout(later, wait - last);
                } else {
                  timeout = null;
                  if (!immediate) result = func.apply(context, args);
                }
              };
              var callNow = immediate && !timeout;
              if (!timeout) {
                timeout = setTimeout(later, wait);
              }
              if (callNow) result = func.apply(context, args);
              return result;
            };
          },
      
          /**
           * Throttle the given fun, only allowing it to be
           * called at most every `wait` ms.
           */
          throttle: function(func, wait, options) {
            var context, args, result;
            var timeout = null;
            var previous = 0;
            options || (options = {});
            var later = function() {
              previous = options.leading === false ? 0 : Date.now();
              timeout = null;
              result = func.apply(context, args);
            };
            return function() {
              var now = Date.now();
              if (!previous && options.leading === false) previous = now;
              var remaining = wait - (now - previous);
              context = this;
              args = arguments;
              if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
              } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
              }
              return result;
            };
          },
           // Borrowed from Backbone.js's extend
           // Helper function to correctly set up the prototype chain, for subclasses.
           // Similar to `goog.inherits`, but uses a hash of prototype properties and
           // class properties to be extended.
          inherit: function(protoProps, staticProps) {
            var parent = this;
            var child;
      
            // The constructor function for the new subclass is either defined by you
            // (the "constructor" property in your `extend` definition), or defaulted
            // by us to simply call the parent's constructor.
            if (protoProps && protoProps.hasOwnProperty('constructor')) {
              child = protoProps.constructor;
            } else {
              child = function(){ return parent.apply(this, arguments); };
            }
      
            // Add static properties to the constructor function, if supplied.
            ionic.extend(child, parent, staticProps);
      
            // Set the prototype chain to inherit from `parent`, without calling
            // `parent`'s constructor function.
            var Surrogate = function(){ this.constructor = child; };
            Surrogate.prototype = parent.prototype;
            child.prototype = new Surrogate();
      
            // Add prototype properties (instance properties) to the subclass,
            // if supplied.
            if (protoProps) ionic.extend(child.prototype, protoProps);
      
            // Set a convenience property in case the parent's prototype is needed
            // later.
            child.__super__ = parent.prototype;
      
            return child;
          },
      
          // Extend adapted from Underscore.js
          extend: function(obj) {
             var args = Array.prototype.slice.call(arguments, 1);
             for(var i = 0; i < args.length; i++) {
               var source = args[i];
               if (source) {
                 for (var prop in source) {
                   obj[prop] = source[prop];
                 }
               }
             }
             return obj;
          },
      
          /**
           * A consistent way of creating unique IDs in angular. The ID is a sequence of alpha numeric
           * characters such as '012ABC'. The reason why we are not using simply a number counter is that
           * the number string gets longer over time, and it can also overflow, where as the nextId
           * will grow much slower, it is a string, and it will never overflow.
           *
           * @returns an unique alpha-numeric string
           */
          nextUid: function() {
            var index = uid.length;
            var digit;
      
            while(index) {
              index--;
              digit = uid[index].charCodeAt(0);
              if (digit == 57 /*'9'*/) {
                uid[index] = 'A';
                return uid.join('');
              }
              if (digit == 90  /*'Z'*/) {
                uid[index] = '0';
              } else {
                uid[index] = String.fromCharCode(digit + 1);
                return uid.join('');
              }
            }
            uid.unshift('0');
            return uid.join('');
          }
        };
      
        // Bind a few of the most useful functions to the ionic scope
        ionic.inherit = ionic.Utils.inherit;
        ionic.extend = ionic.Utils.extend;
        ionic.throttle = ionic.Utils.throttle;
        ionic.proxy = ionic.Utils.proxy;
        ionic.debounce = ionic.Utils.debounce;
      
      })(window.ionic);
      
      /**
       * @ngdoc page
       * @name keyboard
       * @module ionic
       * @description
       * On both Android and iOS, Ionic will attempt to prevent the keyboard from
       * obscuring inputs and focusable elements when it appears by scrolling them
       * into view.  In order for this to work, any focusable elements must be within
       * a [Scroll View](http://ionicframework.com/docs/api/directive/ionScroll/)
       * or a directive such as [Content](http://ionicframework.com/docs/api/directive/ionContent/)
       * that has a Scroll View.
       *
       * It will also attempt to prevent the native overflow scrolling on focus,
       * which can cause layout issues such as pushing headers up and out of view.
       *
       * The keyboard fixes work best in conjunction with the
       * [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugins-keyboard),
       * although it will perform reasonably well without.  However, if you are using
       * Cordova there is no reason not to use the plugin.
       *
       * ### Hide when keyboard shows
       *
       * To hide an element when the keyboard is open, add the class `hide-on-keyboard-open`.
       *
       * ```html
       * <div class="hide-on-keyboard-open">
       *   <div id="google-map"></div>
       * </div>
       * ```
       * ----------
       *
       * ### Plugin Usage
       * Information on using the plugin can be found at
       * [https://github.com/driftyco/ionic-plugins-keyboard](https://github.com/driftyco/ionic-plugins-keyboard).
       *
       * ----------
       *
       * ### Android Notes
       * - If your app is running in fullscreen, i.e. you have
       *   `<preference name="Fullscreen" value="true" />` in your `config.xml` file
       *   you will need to set `ionic.Platform.isFullScreen = true` manually.
       *
       * - You can configure the behavior of the web view when the keyboard shows by setting
       *   [android:windowSoftInputMode](http://developer.android.com/reference/android/R.attr.html#windowSoftInputMode)
       *   to either `adjustPan`, `adjustResize` or `adjustNothing` in your app's
       *   activity in `AndroidManifest.xml`. `adjustResize` is the recommended setting
       *   for Ionic, but if for some reason you do use `adjustPan` you will need to
       *   set `ionic.Platform.isFullScreen = true`.
       *
       *   ```xml
       *   <activity android:windowSoftInputMode="adjustResize">
       *
       *   ```
       *
       * ### iOS Notes
       * - If the content of your app (including the header) is being pushed up and
       *   out of view on input focus, try setting `cordova.plugins.Keyboard.disableScroll(true)`.
       *   This does **not** disable scrolling in the Ionic scroll view, rather it
       *   disables the native overflow scrolling that happens automatically as a
       *   result of focusing on inputs below the keyboard.
       *
       */
      
      var keyboardViewportHeight = getViewportHeight();
      var keyboardIsOpen;
      var keyboardActiveElement;
      var keyboardFocusOutTimer;
      var keyboardFocusInTimer;
      var keyboardPollHeightTimer;
      var keyboardLastShow = 0;
      
      var KEYBOARD_OPEN_CSS = 'keyboard-open';
      var SCROLL_CONTAINER_CSS = 'scroll';
      
      ionic.keyboard = {
        isOpen: false,
        height: null,
        landscape: false,
      
        hide: function() {
          clearTimeout(keyboardFocusInTimer);
          clearTimeout(keyboardFocusOutTimer);
          clearTimeout(keyboardPollHeightTimer);
      
          ionic.keyboard.isOpen = false;
      
          ionic.trigger('resetScrollView', {
            target: keyboardActiveElement
          }, true);
      
          ionic.requestAnimationFrame(function(){
            document.body.classList.remove(KEYBOARD_OPEN_CSS);
          });
      
          // the keyboard is gone now, remove the touchmove that disables native scroll
          if (window.navigator.msPointerEnabled) {
            document.removeEventListener("MSPointerMove", keyboardPreventDefault);
          } else {
            document.removeEventListener('touchmove', keyboardPreventDefault);
          }
          document.removeEventListener('keydown', keyboardOnKeyDown);
      
          if( keyboardHasPlugin() ) {
            cordova.plugins.Keyboard.close();
          }
        },
      
        show: function() {
          if( keyboardHasPlugin() ) {
            cordova.plugins.Keyboard.show();
          }
        }
      };
      
      function keyboardInit() {
        if( keyboardHasPlugin() ) {
          window.addEventListener('native.keyboardshow', keyboardNativeShow);
          window.addEventListener('native.keyboardhide', keyboardFocusOut);
      
          //deprecated
          window.addEventListener('native.showkeyboard', keyboardNativeShow);
          window.addEventListener('native.hidekeyboard', keyboardFocusOut);
      
        } else {
          document.body.addEventListener('focusout', keyboardFocusOut);
        }
      
        document.body.addEventListener('ionic.focusin', keyboardBrowserFocusIn);
        document.body.addEventListener('focusin', keyboardBrowserFocusIn);
      
        document.body.addEventListener('orientationchange', keyboardOrientationChange);
      
        if (window.navigator.msPointerEnabled) {
          document.removeEventListener("MSPointerDown", keyboardInit);
        } else {
          document.removeEventListener('touchstart', keyboardInit);
        }
      }
      
      function keyboardNativeShow(e) {
        clearTimeout(keyboardFocusOutTimer);
        ionic.keyboard.height = e.keyboardHeight;
      }
      
      function keyboardBrowserFocusIn(e) {
        if( !e.target || !ionic.tap.isTextInput(e.target) || ionic.tap.isDateInput(e.target) || !keyboardIsWithinScroll(e.target) ) return;
      
        document.addEventListener('keydown', keyboardOnKeyDown, false);
      
        document.body.scrollTop = 0;
        document.body.querySelector('.scroll-content').scrollTop = 0;
      
        keyboardActiveElement = e.target;
      
        keyboardSetShow(e);
      }
      
      function keyboardSetShow(e) {
        clearTimeout(keyboardFocusInTimer);
        clearTimeout(keyboardFocusOutTimer);
      
        keyboardFocusInTimer = setTimeout(function(){
          if ( keyboardLastShow + 350 > Date.now() ) return;
          void 0;
          keyboardLastShow = Date.now();
          var keyboardHeight;
          var elementBounds = keyboardActiveElement.getBoundingClientRect();
          var count = 0;
      
          keyboardPollHeightTimer = setInterval(function(){
      
            keyboardHeight = keyboardGetHeight();
            if (count > 10){
              clearInterval(keyboardPollHeightTimer);
              //waited long enough, just guess
              keyboardHeight = 275;
            }
            if (keyboardHeight){
              clearInterval(keyboardPollHeightTimer);
              keyboardShow(e.target, elementBounds.top, elementBounds.bottom, keyboardViewportHeight, keyboardHeight);
            }
            count++;
      
          }, 100);
        }, 32);
      }
      
      function keyboardShow(element, elementTop, elementBottom, viewportHeight, keyboardHeight) {
        var details = {
          target: element,
          elementTop: Math.round(elementTop),
          elementBottom: Math.round(elementBottom),
          keyboardHeight: keyboardHeight,
          viewportHeight: viewportHeight
        };
      
        details.hasPlugin = keyboardHasPlugin();
      
        details.contentHeight = viewportHeight - keyboardHeight;
      
        void 0;
      
        // figure out if the element is under the keyboard
        details.isElementUnderKeyboard = (details.elementBottom > details.contentHeight);
      
        ionic.keyboard.isOpen = true;
      
        // send event so the scroll view adjusts
        keyboardActiveElement = element;
        ionic.trigger('scrollChildIntoView', details, true);
      
        ionic.requestAnimationFrame(function(){
          document.body.classList.add(KEYBOARD_OPEN_CSS);
        });
      
        // any showing part of the document that isn't within the scroll the user
        // could touchmove and cause some ugly changes to the app, so disable
        // any touchmove events while the keyboard is open using e.preventDefault()
        if (window.navigator.msPointerEnabled) {
          document.addEventListener("MSPointerMove", keyboardPreventDefault, false);
        } else {
          document.addEventListener('touchmove', keyboardPreventDefault, false);
        }
      
        return details;
      }
      
      function keyboardFocusOut(e) {
        clearTimeout(keyboardFocusOutTimer);
      
        keyboardFocusOutTimer = setTimeout(ionic.keyboard.hide, 350);
      }
      
      function keyboardUpdateViewportHeight() {
        if( getViewportHeight() > keyboardViewportHeight ) {
          keyboardViewportHeight = getViewportHeight();
        }
      }
      
      function keyboardOnKeyDown(e) {
        if( ionic.scroll.isScrolling ) {
          keyboardPreventDefault(e);
        }
      }
      
      function keyboardPreventDefault(e) {
        if( e.target.tagName !== 'TEXTAREA' ) {
          e.preventDefault();
        }
      }
      
      function keyboardOrientationChange() {
        var updatedViewportHeight = getViewportHeight();
      
        //too slow, have to wait for updated height
        if (updatedViewportHeight === keyboardViewportHeight){
          var count = 0;
          var pollViewportHeight = setInterval(function(){
            //give up
            if (count > 10){
              clearInterval(pollViewportHeight);
            }
      
            updatedViewportHeight = getViewportHeight();
      
            if (updatedViewportHeight !== keyboardViewportHeight){
              if (updatedViewportHeight < keyboardViewportHeight){
                ionic.keyboard.landscape = true;
              } else {
                ionic.keyboard.landscape = false;
              }
              keyboardViewportHeight = updatedViewportHeight;
              clearInterval(pollViewportHeight);
            }
            count++;
      
          }, 50);
        } else {
          keyboardViewportHeight = updatedViewportHeight;
        }
      }
      
      function keyboardGetHeight() {
        // check if we are already have a keyboard height from the plugin
        if ( ionic.keyboard.height ) {
          return ionic.keyboard.height;
        }
      
        if ( ionic.Platform.isAndroid() ){
          //should be using the plugin, no way to know how big the keyboard is, so guess
          if ( ionic.Platform.isFullScreen ){
            return 275;
          }
          //otherwise, wait for the screen to resize
          if ( getViewportHeight() < keyboardViewportHeight ){
            return keyboardViewportHeight - getViewportHeight();
          } else {
            return 0;
          }
        }
      
        // fallback for when its the webview without the plugin
        // or for just the standard web browser
        if( ionic.Platform.isIOS() ) {
          if ( ionic.keyboard.landscape ){
            return 206;
          }
      
          if (!ionic.Platform.isWebView()){
            return 216;
          }
      
          return 260;
        }
      
        // safe guess
        return 275;
      }
      
      function getViewportHeight() {
        return window.innerHeight || screen.height;
      }
      
      function keyboardIsWithinScroll(ele) {
        while(ele) {
          if(ele.classList.contains(SCROLL_CONTAINER_CSS)) {
            return true;
          }
          ele = ele.parentElement;
        }
        return false;
      }
      
      function keyboardHasPlugin() {
        return !!(window.cordova && cordova.plugins && cordova.plugins.Keyboard);
      }
      
      ionic.Platform.ready(function() {
        keyboardUpdateViewportHeight();
      
        // Android sometimes reports bad innerHeight on window.load
        // try it again in a lil bit to play it safe
        setTimeout(keyboardUpdateViewportHeight, 999);
      
        // only initialize the adjustments for the virtual keyboard
        // if a touchstart event happens
        if (window.navigator.msPointerEnabled) {
          document.addEventListener("MSPointerDown", keyboardInit, false);
        } else {
          document.addEventListener('touchstart', keyboardInit, false);
        }
      });
      
      
      
      var viewportTag;
      var viewportProperties = {};
      
      ionic.viewport = {
        orientation: function() {
          // 0 = Portrait
          // 90 = Landscape
          // not using window.orientation because each device has a different implementation
          return (window.innerWidth > window.innerHeight ? 90 : 0);
        }
      };
      
      function viewportLoadTag() {
        var x;
      
        for(x=0; x<document.head.children.length; x++) {
          if(document.head.children[x].name == 'viewport') {
            viewportTag = document.head.children[x];
            break;
          }
        }
      
        if(viewportTag) {
          var props = viewportTag.content.toLowerCase().replace(/\s+/g, '').split(',');
          var keyValue;
          for(x=0; x<props.length; x++) {
            if(props[x]) {
              keyValue = props[x].split('=');
              viewportProperties[ keyValue[0] ] = (keyValue.length > 1 ? keyValue[1] : '_');
            }
          }
          viewportUpdate();
        }
      }
      
      function viewportUpdate() {
        // unit tests in viewport.unit.js
      
        var initWidth = viewportProperties.width;
        var initHeight = viewportProperties.height;
        var p = ionic.Platform;
        var version = p.version();
        var DEVICE_WIDTH = 'device-width';
        var DEVICE_HEIGHT = 'device-height';
        var orientation = ionic.viewport.orientation();
      
        // Most times we're removing the height and adding the width
        // So this is the default to start with, then modify per platform/version/oreintation
        delete viewportProperties.height;
        viewportProperties.width = DEVICE_WIDTH;
      
        if( p.isIPad() ) {
          // iPad
      
          if( version > 7 ) {
            // iPad >= 7.1
            // https://issues.apache.org/jira/browse/CB-4323
            delete viewportProperties.width;
      
          } else {
            // iPad <= 7.0
      
            if( p.isWebView() ) {
              // iPad <= 7.0 WebView
      
              if( orientation == 90 ) {
                // iPad <= 7.0 WebView Landscape
                viewportProperties.height = '0';
      
              } else if(version == 7) {
                // iPad <= 7.0 WebView Portait
                viewportProperties.height = DEVICE_HEIGHT;
              }
            } else {
              // iPad <= 6.1 Browser
              if(version < 7) {
                viewportProperties.height = '0';
              }
            }
          }
      
        } else if( p.isIOS() ) {
          // iPhone
      
          if( p.isWebView() ) {
            // iPhone WebView
      
            if(version > 7) {
              // iPhone >= 7.1 WebView
              delete viewportProperties.width;
      
            } else if(version < 7) {
              // iPhone <= 6.1 WebView
              // if height was set it needs to get removed with this hack for <= 6.1
              if( initHeight ) viewportProperties.height = '0';
      
            } else if(version == 7) {
              //iPhone == 7.0 WebView
              viewportProperties.height = DEVICE_HEIGHT;
            }
      
          } else {
            // iPhone Browser
      
            if (version < 7) {
              // iPhone <= 6.1 Browser
              // if height was set it needs to get removed with this hack for <= 6.1
              if( initHeight ) viewportProperties.height = '0';
            }
          }
      
        }
      
        // only update the viewport tag if there was a change
        if(initWidth !== viewportProperties.width || initHeight !== viewportProperties.height) {
          viewportTagUpdate();
        }
      }
      
      function viewportTagUpdate() {
        var key, props = [];
        for(key in viewportProperties) {
          if( viewportProperties[key] ) {
            props.push(key + (viewportProperties[key] == '_' ? '' : '=' + viewportProperties[key]) );
          }
        }
      
        viewportTag.content = props.join(', ');
      }
      
      ionic.Platform.ready(function() {
        viewportLoadTag();
      
        window.addEventListener("orientationchange", function(){
          setTimeout(viewportUpdate, 1000);
        }, false);
      });
      
      (function(ionic) {
      'use strict';
        ionic.views.View = function() {
          this.initialize.apply(this, arguments);
        };
      
        ionic.views.View.inherit = ionic.inherit;
      
        ionic.extend(ionic.views.View.prototype, {
          initialize: function() {}
        });
      
      })(window.ionic);
      
      /*
       * Scroller
       * http://github.com/zynga/scroller
       *
       * Copyright 2011, Zynga Inc.
       * Licensed under the MIT License.
       * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
       *
       * Based on the work of: Unify Project (unify-project.org)
       * http://unify-project.org
       * Copyright 2011, Deutsche Telekom AG
       * License: MIT + Apache (V2)
       */
      
      /* jshint eqnull: true */
      
      /**
       * Generic animation class with support for dropped frames both optional easing and duration.
       *
       * Optional duration is useful when the lifetime is defined by another condition than time
       * e.g. speed of an animating object, etc.
       *
       * Dropped frame logic allows to keep using the same updater logic independent from the actual
       * rendering. This eases a lot of cases where it might be pretty complex to break down a state
       * based on the pure time difference.
       */
      var zyngaCore = { effect: {} };
      (function(global) {
        var time = Date.now || function() {
          return +new Date();
        };
        var desiredFrames = 60;
        var millisecondsPerSecond = 1000;
        var running = {};
        var counter = 1;
      
        zyngaCore.effect.Animate = {
      
          /**
           * A requestAnimationFrame wrapper / polyfill.
           *
           * @param callback {Function} The callback to be invoked before the next repaint.
           * @param root {HTMLElement} The root element for the repaint
           */
          requestAnimationFrame: (function() {
      
            // Check for request animation Frame support
            var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
            var isNative = !!requestFrame;
      
            if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
              isNative = false;
            }
      
            if (isNative) {
              return function(callback, root) {
                requestFrame(callback, root);
              };
            }
      
            var TARGET_FPS = 60;
            var requests = {};
            var requestCount = 0;
            var rafHandle = 1;
            var intervalHandle = null;
            var lastActive = +new Date();
      
            return function(callback, root) {
              var callbackHandle = rafHandle++;
      
              // Store callback
              requests[callbackHandle] = callback;
              requestCount++;
      
              // Create timeout at first request
              if (intervalHandle === null) {
      
                intervalHandle = setInterval(function() {
      
                  var time = +new Date();
                  var currentRequests = requests;
      
                  // Reset data structure before executing callbacks
                  requests = {};
                  requestCount = 0;
      
                  for(var key in currentRequests) {
                    if (currentRequests.hasOwnProperty(key)) {
                      currentRequests[key](time);
                      lastActive = time;
                    }
                  }
      
                  // Disable the timeout when nothing happens for a certain
                  // period of time
                  if (time - lastActive > 2500) {
                    clearInterval(intervalHandle);
                    intervalHandle = null;
                  }
      
                }, 1000 / TARGET_FPS);
              }
      
              return callbackHandle;
            };
      
          })(),
      
      
          /**
           * Stops the given animation.
           *
           * @param id {Integer} Unique animation ID
           * @return {Boolean} Whether the animation was stopped (aka, was running before)
           */
          stop: function(id) {
            var cleared = running[id] != null;
            if (cleared) {
              running[id] = null;
            }
      
            return cleared;
          },
      
      
          /**
           * Whether the given animation is still running.
           *
           * @param id {Integer} Unique animation ID
           * @return {Boolean} Whether the animation is still running
           */
          isRunning: function(id) {
            return running[id] != null;
          },
      
      
          /**
           * Start the animation.
           *
           * @param stepCallback {Function} Pointer to function which is executed on every step.
           *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
           * @param verifyCallback {Function} Executed before every animation step.
           *   Signature of the method should be `function() { return continueWithAnimation; }`
           * @param completedCallback {Function}
           *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
           * @param duration {Integer} Milliseconds to run the animation
           * @param easingMethod {Function} Pointer to easing function
           *   Signature of the method should be `function(percent) { return modifiedValue; }`
           * @param root {Element} Render root, when available. Used for internal
           *   usage of requestAnimationFrame.
           * @return {Integer} Identifier of animation. Can be used to stop it any time.
           */
          start: function(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
      
            var start = time();
            var lastFrame = start;
            var percent = 0;
            var dropCounter = 0;
            var id = counter++;
      
            if (!root) {
              root = document.body;
            }
      
            // Compacting running db automatically every few new animations
            if (id % 20 === 0) {
              var newRunning = {};
              for (var usedId in running) {
                newRunning[usedId] = true;
              }
              running = newRunning;
            }
      
            // This is the internal step method which is called every few milliseconds
            var step = function(virtual) {
      
              // Normalize virtual value
              var render = virtual !== true;
      
              // Get current time
              var now = time();
      
              // Verification is executed before next animation step
              if (!running[id] || (verifyCallback && !verifyCallback(id))) {
      
                running[id] = null;
                completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false);
                return;
      
              }
      
              // For the current rendering to apply let's update omitted steps in memory.
              // This is important to bring internal state variables up-to-date with progress in time.
              if (render) {
      
                var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
                for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
                  step(true);
                  dropCounter++;
                }
      
              }
      
              // Compute percent value
              if (duration) {
                percent = (now - start) / duration;
                if (percent > 1) {
                  percent = 1;
                }
              }
      
              // Execute step callback, then...
              var value = easingMethod ? easingMethod(percent) : percent;
              if ((stepCallback(value, now, render) === false || percent === 1) && render) {
                running[id] = null;
                completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null);
              } else if (render) {
                lastFrame = now;
                zyngaCore.effect.Animate.requestAnimationFrame(step, root);
              }
            };
      
            // Mark as running
            running[id] = true;
      
            // Init first step
            zyngaCore.effect.Animate.requestAnimationFrame(step, root);
      
            // Return unique animation ID
            return id;
          }
        };
      })(this);
      
      /*
       * Scroller
       * http://github.com/zynga/scroller
       *
       * Copyright 2011, Zynga Inc.
       * Licensed under the MIT License.
       * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
       *
       * Based on the work of: Unify Project (unify-project.org)
       * http://unify-project.org
       * Copyright 2011, Deutsche Telekom AG
       * License: MIT + Apache (V2)
       */
      
      var Scroller;
      
      (function(ionic) {
        var NOOP = function(){};
      
        // Easing Equations (c) 2003 Robert Penner, all rights reserved.
        // Open source under the BSD License.
      
        /**
         * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
        **/
        var easeOutCubic = function(pos) {
          return (Math.pow((pos - 1), 3) + 1);
        };
      
        /**
         * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
        **/
        var easeInOutCubic = function(pos) {
          if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 3);
          }
      
          return 0.5 * (Math.pow((pos - 2), 3) + 2);
        };
      
      
      /**
       * ionic.views.Scroll
       * A powerful scroll view with support for bouncing, pull to refresh, and paging.
       * @param   {Object}        options options for the scroll view
       * @class A scroll view system
       * @memberof ionic.views
       */
      ionic.views.Scroll = ionic.views.View.inherit({
        initialize: function(options) {
          var self = this;
      
          this.__container = options.el;
          this.__content = options.el.firstElementChild;
      
          //Remove any scrollTop attached to these elements; they are virtual scroll now
          //This also stops on-load-scroll-to-window.location.hash that the browser does
          setTimeout(function() {
            if (self.__container && self.__content) {
              self.__container.scrollTop = 0;
              self.__content.scrollTop = 0;
            }
          });
      
          this.options = {
      
            /** Disable scrolling on x-axis by default */
            scrollingX: false,
            scrollbarX: true,
      
            /** Enable scrolling on y-axis */
            scrollingY: true,
            scrollbarY: true,
      
            startX: 0,
            startY: 0,
      
            /** The amount to dampen mousewheel events */
            wheelDampen: 6,
      
            /** The minimum size the scrollbars scale to while scrolling */
            minScrollbarSizeX: 5,
            minScrollbarSizeY: 5,
      
            /** Scrollbar fading after scrolling */
            scrollbarsFade: true,
            scrollbarFadeDelay: 300,
            /** The initial fade delay when the pane is resized or initialized */
            scrollbarResizeFadeDelay: 1000,
      
            /** Enable animations for deceleration, snap back, zooming and scrolling */
            animating: true,
      
            /** duration for animations triggered by scrollTo/zoomTo */
            animationDuration: 250,
      
            /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
            bouncing: true,
      
            /** Enable locking to the main axis if user moves only slightly on one of them at start */
            locking: true,
      
            /** Enable pagination mode (switching between full page content panes) */
            paging: false,
      
            /** Enable snapping of content to a configured pixel grid */
            snapping: false,
      
            /** Enable zooming of content via API, fingers and mouse wheel */
            zooming: false,
      
            /** Minimum zoom level */
            minZoom: 0.5,
      
            /** Maximum zoom level */
            maxZoom: 3,
      
            /** Multiply or decrease scrolling speed **/
            speedMultiplier: 1,
      
            deceleration: 0.97,
      
            /** Callback that is fired on the later of touch end or deceleration end,
              provided that another scrolling action has not begun. Used to know
              when to fade out a scrollbar. */
            scrollingComplete: NOOP,
      
            /** This configures the amount of change applied to deceleration when reaching boundaries  **/
            penetrationDeceleration : 0.03,
      
            /** This configures the amount of change applied to acceleration when reaching boundaries  **/
            penetrationAcceleration : 0.08,
      
            // The ms interval for triggering scroll events
            scrollEventInterval: 10,
      
            getContentWidth: function() {
              return Math.max(self.__content.scrollWidth, self.__content.offsetWidth);
            },
            getContentHeight: function() {
              return Math.max(self.__content.scrollHeight, self.__content.offsetHeight + (self.__content.offsetTop * 2));
            }
          };
      
          for (var key in options) {
            this.options[key] = options[key];
          }
      
          this.hintResize = ionic.debounce(function() {
            self.resize();
          }, 1000, true);
      
          this.onScroll = function() {
      
            if(!ionic.scroll.isScrolling) {
              setTimeout(self.setScrollStart, 50);
            } else {
              clearTimeout(self.scrollTimer);
              self.scrollTimer = setTimeout(self.setScrollStop, 80);
            }
      
          };
      
          this.setScrollStart = function() {
            ionic.scroll.isScrolling = Math.abs(ionic.scroll.lastTop - self.__scrollTop) > 1;
            clearTimeout(self.scrollTimer);
            self.scrollTimer = setTimeout(self.setScrollStop, 80);
          };
      
          this.setScrollStop = function() {
            ionic.scroll.isScrolling = false;
            ionic.scroll.lastTop = self.__scrollTop;
          };
      
          this.triggerScrollEvent = ionic.throttle(function() {
            self.onScroll();
            ionic.trigger('scroll', {
              scrollTop: self.__scrollTop,
              scrollLeft: self.__scrollLeft,
              target: self.__container
            });
          }, this.options.scrollEventInterval);
      
          this.triggerScrollEndEvent = function() {
            ionic.trigger('scrollend', {
              scrollTop: self.__scrollTop,
              scrollLeft: self.__scrollLeft,
              target: self.__container
            });
          };
      
          this.__scrollLeft = this.options.startX;
          this.__scrollTop = this.options.startY;
      
          // Get the render update function, initialize event handlers,
          // and calculate the size of the scroll container
          this.__callback = this.getRenderFn();
          this.__initEventHandlers();
          this.__createScrollbars();
      
        },
      
        run: function() {
          this.resize();
      
          // Fade them out
          this.__fadeScrollbars('out', this.options.scrollbarResizeFadeDelay);
        },
      
      
      
        /*
        ---------------------------------------------------------------------------
          INTERNAL FIELDS :: STATUS
        ---------------------------------------------------------------------------
        */
      
        /** Whether only a single finger is used in touch handling */
        __isSingleTouch: false,
      
        /** Whether a touch event sequence is in progress */
        __isTracking: false,
      
        /** Whether a deceleration animation went to completion. */
        __didDecelerationComplete: false,
      
        /**
         * Whether a gesture zoom/rotate event is in progress. Activates when
         * a gesturestart event happens. This has higher priority than dragging.
         */
        __isGesturing: false,
      
        /**
         * Whether the user has moved by such a distance that we have enabled
         * dragging mode. Hint: It's only enabled after some pixels of movement to
         * not interrupt with clicks etc.
         */
        __isDragging: false,
      
        /**
         * Not touching and dragging anymore, and smoothly animating the
         * touch sequence using deceleration.
         */
        __isDecelerating: false,
      
        /**
         * Smoothly animating the currently configured change
         */
        __isAnimating: false,
      
      
      
        /*
        ---------------------------------------------------------------------------
          INTERNAL FIELDS :: DIMENSIONS
        ---------------------------------------------------------------------------
        */
      
        /** Available outer left position (from document perspective) */
        __clientLeft: 0,
      
        /** Available outer top position (from document perspective) */
        __clientTop: 0,
      
        /** Available outer width */
        __clientWidth: 0,
      
        /** Available outer height */
        __clientHeight: 0,
      
        /** Outer width of content */
        __contentWidth: 0,
      
        /** Outer height of content */
        __contentHeight: 0,
      
        /** Snapping width for content */
        __snapWidth: 100,
      
        /** Snapping height for content */
        __snapHeight: 100,
      
        /** Height to assign to refresh area */
        __refreshHeight: null,
      
        /** Whether the refresh process is enabled when the event is released now */
        __refreshActive: false,
      
        /** Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
        __refreshActivate: null,
      
        /** Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
        __refreshDeactivate: null,
      
        /** Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
        __refreshStart: null,
      
        /** Zoom level */
        __zoomLevel: 1,
      
        /** Scroll position on x-axis */
        __scrollLeft: 0,
      
        /** Scroll position on y-axis */
        __scrollTop: 0,
      
        /** Maximum allowed scroll position on x-axis */
        __maxScrollLeft: 0,
      
        /** Maximum allowed scroll position on y-axis */
        __maxScrollTop: 0,
      
        /* Scheduled left position (final position when animating) */
        __scheduledLeft: 0,
      
        /* Scheduled top position (final position when animating) */
        __scheduledTop: 0,
      
        /* Scheduled zoom level (final scale when animating) */
        __scheduledZoom: 0,
      
      
      
        /*
        ---------------------------------------------------------------------------
          INTERNAL FIELDS :: LAST POSITIONS
        ---------------------------------------------------------------------------
        */
      
        /** Left position of finger at start */
        __lastTouchLeft: null,
      
        /** Top position of finger at start */
        __lastTouchTop: null,
      
        /** Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
        __lastTouchMove: null,
      
        /** List of positions, uses three indexes for each state: left, top, timestamp */
        __positions: null,
      
      
      
        /*
        ---------------------------------------------------------------------------
          INTERNAL FIELDS :: DECELERATION SUPPORT
        ---------------------------------------------------------------------------
        */
      
        /** Minimum left scroll position during deceleration */
        __minDecelerationScrollLeft: null,
      
        /** Minimum top scroll position during deceleration */
        __minDecelerationScrollTop: null,
      
        /** Maximum left scroll position during deceleration */
        __maxDecelerationScrollLeft: null,
      
        /** Maximum top scroll position during deceleration */
        __maxDecelerationScrollTop: null,
      
        /** Current factor to modify horizontal scroll position with on every step */
        __decelerationVelocityX: null,
      
        /** Current factor to modify vertical scroll position with on every step */
        __decelerationVelocityY: null,
      
      
        /** the browser-specific property to use for transforms */
        __transformProperty: null,
        __perspectiveProperty: null,
      
        /** scrollbar indicators */
        __indicatorX: null,
        __indicatorY: null,
      
        /** Timeout for scrollbar fading */
        __scrollbarFadeTimeout: null,
      
        /** whether we've tried to wait for size already */
        __didWaitForSize: null,
        __sizerTimeout: null,
      
        __initEventHandlers: function() {
          var self = this;
      
          // Event Handler
          var container = this.__container;
      
          self.scrollChildIntoView = function(e) {
      
            //distance from bottom of scrollview to top of viewport
            var scrollBottomOffsetToTop;
      
            if( !self.isScrolledIntoView ) {
              // shrink scrollview so we can actually scroll if the input is hidden
              // if it isn't shrink so we can scroll to inputs under the keyboard
              if (ionic.Platform.isIOS() || ionic.Platform.isFullScreen){
                // if there are things below the scroll view account for them and
                // subtract them from the keyboard height when resizing
                scrollBottomOffsetToTop = container.getBoundingClientRect().bottom;
                var scrollBottomOffsetToBottom = e.detail.viewportHeight - scrollBottomOffsetToTop;
                var keyboardOffset = Math.max(0, e.detail.keyboardHeight - scrollBottomOffsetToBottom);
                container.style.height = (container.clientHeight - keyboardOffset) + "px";
                container.style.overflow = "visible";
                //update scroll view
                self.resize();
              }
              self.isScrolledIntoView = true;
            }
      
            //If the element is positioned under the keyboard...
            if( e.detail.isElementUnderKeyboard ) {
              var delay;
              // Wait on android for web view to resize
              if ( ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen ) {
                // android y u resize so slow
                if ( ionic.Platform.version() < 4.4) {
                  delay = 500;
                } else {
                  // probably overkill for chrome
                  delay = 350;
                }
              } else {
                delay = 80;
              }
      
              //Put element in middle of visible screen
              //Wait for android to update view height and resize() to reset scroll position
              ionic.scroll.isScrolling = true;
              setTimeout(function(){
                //middle of the scrollview, where we want to scroll to
                var scrollMidpointOffset = container.clientHeight * 0.5;
      
                scrollBottomOffsetToTop = container.getBoundingClientRect().bottom;
                //distance from top of focused element to the bottom of the scroll view
                var elementTopOffsetToScrollBottom = e.detail.elementTop - scrollBottomOffsetToTop;
      
                var scrollTop = elementTopOffsetToScrollBottom  + scrollMidpointOffset;
      
                if (scrollTop > 0){
                  ionic.tap.cloneFocusedInput(container, self);
                  self.scrollBy(0, scrollTop, true);
                  self.onScroll();
                }
              }, delay);
            }
      
            //Only the first scrollView parent of the element that broadcasted this event
            //(the active element that needs to be shown) should receive this event
            e.stopPropagation();
          };
      
          self.resetScrollView = function(e) {
            //return scrollview to original height once keyboard has hidden
            if(self.isScrolledIntoView) {
              self.isScrolledIntoView = false;
              container.style.height = "";
              container.style.overflow = "";
              self.resize();
              ionic.scroll.isScrolling = false;
            }
          };
      
          //Broadcasted when keyboard is shown on some platforms.
          //See js/utils/keyboard.js
          container.addEventListener('scrollChildIntoView', self.scrollChildIntoView);
          container.addEventListener('resetScrollView', self.resetScrollView);
      
          function getEventTouches(e) {
            return e.touches && e.touches.length ? e.touches : [{
              pageX: e.pageX,
              pageY: e.pageY
            }];
          }
      
          self.touchStart = function(e) {
            self.startCoordinates = ionic.tap.pointerCoord(e);
      
            if ( ionic.tap.ignoreScrollStart(e) ) {
              return;
            }
      
            self.__isDown = true;
      
            if( ionic.tap.containsOrIsTextInput(e.target) || e.target.tagName === 'SELECT' ) {
              // do not start if the target is a text input
              // if there is a touchmove on this input, then we can start the scroll
              self.__hasStarted = false;
              return;
            }
      
            self.__isSelectable = true;
            self.__enableScrollY = true;
            self.__hasStarted = true;
            self.doTouchStart(getEventTouches(e), e.timeStamp);
            e.preventDefault();
          };
      
          self.touchMove = function(e) {
            if(!self.__isDown ||
              e.defaultPrevented ||
              (e.target.tagName === 'TEXTAREA' && e.target.parentElement.querySelector(':focus')) ) {
              return;
            }
      
            if( !self.__hasStarted && ( ionic.tap.containsOrIsTextInput(e.target) || e.target.tagName === 'SELECT' ) ) {
              // the target is a text input and scroll has started
              // since the text input doesn't start on touchStart, do it here
              self.__hasStarted = true;
              self.doTouchStart(getEventTouches(e), e.timeStamp);
              e.preventDefault();
              return;
            }
      
            if(self.startCoordinates) {
              // we have start coordinates, so get this touch move's current coordinates
              var currentCoordinates = ionic.tap.pointerCoord(e);
      
              if( self.__isSelectable &&
                  ionic.tap.isTextInput(e.target) &&
                  Math.abs(self.startCoordinates.x - currentCoordinates.x) > 20 ) {
                // user slid the text input's caret on its x axis, disable any future y scrolling
                self.__enableScrollY = false;
                self.__isSelectable = true;
              }
      
              if( self.__enableScrollY && Math.abs(self.startCoordinates.y - currentCoordinates.y) > 10 ) {
                // user scrolled the entire view on the y axis
                // disabled being able to select text on an input
                // hide the input which has focus, and show a cloned one that doesn't have focus
                self.__isSelectable = false;
                ionic.tap.cloneFocusedInput(container, self);
              }
            }
      
            self.doTouchMove(getEventTouches(e), e.timeStamp, e.scale);
            self.__isDown = true;
          };
      
          self.touchEnd = function(e) {
            if(!self.__isDown) return;
      
            self.doTouchEnd(e.timeStamp);
            self.__isDown = false;
            self.__hasStarted = false;
            self.__isSelectable = true;
            self.__enableScrollY = true;
      
            if( !self.__isDragging && !self.__isDecelerating && !self.__isAnimating ) {
              ionic.tap.removeClonedInputs(container, self);
            }
          };
      
          if ('ontouchstart' in window) {
            // Touch Events
            container.addEventListener("touchstart", self.touchStart, false);
            document.addEventListener("touchmove", self.touchMove, false);
            document.addEventListener("touchend", self.touchEnd, false);
            document.addEventListener("touchcancel", self.touchEnd, false);
      
          } else if (window.navigator.pointerEnabled) {
            // Pointer Events
            container.addEventListener("pointerdown", self.touchStart, false);
            document.addEventListener("pointermove", self.touchMove, false);
            document.addEventListener("pointerup", self.touchEnd, false);
            document.addEventListener("pointercancel", self.touchEnd, false);
      
          } else if (window.navigator.msPointerEnabled) {
            // IE10, WP8 (Pointer Events)
            container.addEventListener("MSPointerDown", self.touchStart, false);
            document.addEventListener("MSPointerMove", self.touchMove, false);
            document.addEventListener("MSPointerUp", self.touchEnd, false);
            document.addEventListener("MSPointerCancel", self.touchEnd, false);
      
          } else {
            // Mouse Events
            var mousedown = false;
      
            self.mouseDown = function(e) {
              if ( ionic.tap.ignoreScrollStart(e) || e.target.tagName === 'SELECT' ) {
                return;
              }
              self.doTouchStart(getEventTouches(e), e.timeStamp);
      
              if( !ionic.tap.isTextInput(e.target) ) {
                e.preventDefault();
              }
              mousedown = true;
            };
      
            self.mouseMove = function(e) {
              if (!mousedown || e.defaultPrevented) {
                return;
              }
      
              self.doTouchMove(getEventTouches(e), e.timeStamp);
      
              mousedown = true;
            };
      
            self.mouseUp = function(e) {
              if (!mousedown) {
                return;
              }
      
              self.doTouchEnd(e.timeStamp);
      
              mousedown = false;
            };
      
            self.mouseWheel = ionic.animationFrameThrottle(function(e) {
              var scrollParent = ionic.DomUtil.getParentOrSelfWithClass(e.target, 'ionic-scroll');
              if (scrollParent === self.__container) {
      
                self.hintResize();
                self.scrollBy(
                  e.wheelDeltaX/self.options.wheelDampen,
                  -e.wheelDeltaY/self.options.wheelDampen
                );
      
                self.__fadeScrollbars('in');
                clearTimeout(self.__wheelHideBarTimeout);
                self.__wheelHideBarTimeout = setTimeout(function() {
                  self.__fadeScrollbars('out');
                }, 100);
              }
            });
      
            container.addEventListener("mousedown", self.mouseDown, false);
            document.addEventListener("mousemove", self.mouseMove, false);
            document.addEventListener("mouseup", self.mouseUp, false);
            document.addEventListener('mousewheel', self.mouseWheel, false);
          }
        },
      
        __cleanup: function() {
          var container = this.__container;
          var self = this;
      
          container.removeEventListener('touchstart', self.touchStart);
          document.removeEventListener('touchmove', self.touchMove);
          document.removeEventListener('touchend', self.touchEnd);
          document.removeEventListener('touchcancel', self.touchCancel);
      
          container.removeEventListener("pointerdown", self.touchStart);
          document.removeEventListener("pointermove", self.touchMove);
          document.removeEventListener("pointerup", self.touchEnd);
          document.removeEventListener("pointercancel", self.touchEnd);
      
          container.removeEventListener("MSPointerDown", self.touchStart);
          document.removeEventListener("MSPointerMove", self.touchMove);
          document.removeEventListener("MSPointerUp", self.touchEnd);
          document.removeEventListener("MSPointerCancel", self.touchEnd);
      
          container.removeEventListener("mousedown", self.mouseDown);
          document.removeEventListener("mousemove", self.mouseMove);
          document.removeEventListener("mouseup", self.mouseUp);
          document.removeEventListener('mousewheel', self.mouseWheel);
      
          container.removeEventListener('scrollChildIntoView', self.scrollChildIntoView);
          container.removeEventListener('resetScrollView', self.resetScrollView);
      
          ionic.tap.removeClonedInputs(container, self);
      
          delete this.__container;
          delete this.__content;
          delete this.__indicatorX;
          delete this.__indicatorY;
          delete this.options.el;
      
          this.__callback = this.scrollChildIntoView = this.resetScrollView = angular.noop;
      
          this.mouseMove = this.mouseDown = this.mouseUp = this.mouseWheel =
            this.touchStart = this.touchMove = this.touchEnd = this.touchCancel = angular.noop;
      
          this.resize = this.scrollTo = this.zoomTo =
            this.__scrollingComplete = angular.noop;
          container = null;
        },
      
        /** Create a scroll bar div with the given direction **/
        __createScrollbar: function(direction) {
          var bar = document.createElement('div'),
            indicator = document.createElement('div');
      
          indicator.className = 'scroll-bar-indicator scroll-bar-fade-out';
      
          if(direction == 'h') {
            bar.className = 'scroll-bar scroll-bar-h';
          } else {
            bar.className = 'scroll-bar scroll-bar-v';
          }
      
          bar.appendChild(indicator);
          return bar;
        },
      
        __createScrollbars: function() {
          var indicatorX, indicatorY;
      
          if(this.options.scrollingX) {
            indicatorX = {
              el: this.__createScrollbar('h'),
              sizeRatio: 1
            };
            indicatorX.indicator = indicatorX.el.children[0];
      
            if(this.options.scrollbarX) {
              this.__container.appendChild(indicatorX.el);
            }
            this.__indicatorX = indicatorX;
          }
      
          if(this.options.scrollingY) {
            indicatorY = {
              el: this.__createScrollbar('v'),
              sizeRatio: 1
            };
            indicatorY.indicator = indicatorY.el.children[0];
      
            if(this.options.scrollbarY) {
              this.__container.appendChild(indicatorY.el);
            }
            this.__indicatorY = indicatorY;
          }
        },
      
        __resizeScrollbars: function() {
          var self = this;
      
          // Update horiz bar
          if(self.__indicatorX) {
            var width = Math.max(Math.round(self.__clientWidth * self.__clientWidth / (self.__contentWidth)), 20);
            if(width > self.__contentWidth) {
              width = 0;
            }
            self.__indicatorX.size = width;
            self.__indicatorX.minScale = this.options.minScrollbarSizeX / width;
            self.__indicatorX.indicator.style.width = width + 'px';
            self.__indicatorX.maxPos = self.__clientWidth - width;
            self.__indicatorX.sizeRatio = self.__maxScrollLeft ? self.__indicatorX.maxPos / self.__maxScrollLeft : 1;
          }
      
          // Update vert bar
          if(self.__indicatorY) {
            var height = Math.max(Math.round(self.__clientHeight * self.__clientHeight / (self.__contentHeight)), 20);
            if(height > self.__contentHeight) {
              height = 0;
            }
            self.__indicatorY.size = height;
            self.__indicatorY.minScale = this.options.minScrollbarSizeY / height;
            self.__indicatorY.maxPos = self.__clientHeight - height;
            self.__indicatorY.indicator.style.height = height + 'px';
            self.__indicatorY.sizeRatio = self.__maxScrollTop ? self.__indicatorY.maxPos / self.__maxScrollTop : 1;
          }
        },
      
        /**
         * Move and scale the scrollbars as the page scrolls.
         */
        __repositionScrollbars: function() {
          var self = this, width, heightScale,
              widthDiff, heightDiff,
              x, y,
              xstop = 0, ystop = 0;
      
          if(self.__indicatorX) {
            // Handle the X scrollbar
      
            // Don't go all the way to the right if we have a vertical scrollbar as well
            if(self.__indicatorY) xstop = 10;
      
            x = Math.round(self.__indicatorX.sizeRatio * self.__scrollLeft) || 0,
      
            // The the difference between the last content X position, and our overscrolled one
            widthDiff = self.__scrollLeft - (self.__maxScrollLeft - xstop);
      
            if(self.__scrollLeft < 0) {
      
              widthScale = Math.max(self.__indicatorX.minScale,
                  (self.__indicatorX.size - Math.abs(self.__scrollLeft)) / self.__indicatorX.size);
      
              // Stay at left
              x = 0;
      
              // Make sure scale is transformed from the left/center origin point
              self.__indicatorX.indicator.style[self.__transformOriginProperty] = 'left center';
            } else if(widthDiff > 0) {
      
              widthScale = Math.max(self.__indicatorX.minScale,
                  (self.__indicatorX.size - widthDiff) / self.__indicatorX.size);
      
              // Stay at the furthest x for the scrollable viewport
              x = self.__indicatorX.maxPos - xstop;
      
              // Make sure scale is transformed from the right/center origin point
              self.__indicatorX.indicator.style[self.__transformOriginProperty] = 'right center';
      
            } else {
      
              // Normal motion
              x = Math.min(self.__maxScrollLeft, Math.max(0, x));
              widthScale = 1;
      
            }
      
            self.__indicatorX.indicator.style[self.__transformProperty] = 'translate3d(' + x + 'px, 0, 0) scaleX(' + widthScale + ')';
          }
      
          if(self.__indicatorY) {
      
            y = Math.round(self.__indicatorY.sizeRatio * self.__scrollTop) || 0;
      
            // Don't go all the way to the right if we have a vertical scrollbar as well
            if(self.__indicatorX) ystop = 10;
      
            heightDiff = self.__scrollTop - (self.__maxScrollTop - ystop);
      
            if(self.__scrollTop < 0) {
      
              heightScale = Math.max(self.__indicatorY.minScale, (self.__indicatorY.size - Math.abs(self.__scrollTop)) / self.__indicatorY.size);
      
              // Stay at top
              y = 0;
      
              // Make sure scale is transformed from the center/top origin point
              self.__indicatorY.indicator.style[self.__transformOriginProperty] = 'center top';
      
            } else if(heightDiff > 0) {
      
              heightScale = Math.max(self.__indicatorY.minScale, (self.__indicatorY.size - heightDiff) / self.__indicatorY.size);
      
              // Stay at bottom of scrollable viewport
              y = self.__indicatorY.maxPos - ystop;
      
              // Make sure scale is transformed from the center/bottom origin point
              self.__indicatorY.indicator.style[self.__transformOriginProperty] = 'center bottom';
      
            } else {
      
              // Normal motion
              y = Math.min(self.__maxScrollTop, Math.max(0, y));
              heightScale = 1;
      
            }
      
            self.__indicatorY.indicator.style[self.__transformProperty] = 'translate3d(0,' + y + 'px, 0) scaleY(' + heightScale + ')';
          }
        },
      
        __fadeScrollbars: function(direction, delay) {
          var self = this;
      
          if(!this.options.scrollbarsFade) {
            return;
          }
      
          var className = 'scroll-bar-fade-out';
      
          if(self.options.scrollbarsFade === true) {
            clearTimeout(self.__scrollbarFadeTimeout);
      
            if(direction == 'in') {
              if(self.__indicatorX) { self.__indicatorX.indicator.classList.remove(className); }
              if(self.__indicatorY) { self.__indicatorY.indicator.classList.remove(className); }
            } else {
              self.__scrollbarFadeTimeout = setTimeout(function() {
                if(self.__indicatorX) { self.__indicatorX.indicator.classList.add(className); }
                if(self.__indicatorY) { self.__indicatorY.indicator.classList.add(className); }
              }, delay || self.options.scrollbarFadeDelay);
            }
          }
        },
      
        __scrollingComplete: function() {
          var self = this;
          self.options.scrollingComplete();
          ionic.tap.removeClonedInputs(self.__container, self);
      
          self.__fadeScrollbars('out');
        },
      
        resize: function() {
          if(!this.__container || !this.options) return;
      
          // Update Scroller dimensions for changed content
          // Add padding to bottom of content
          this.setDimensions(
            this.__container.clientWidth,
            this.__container.clientHeight,
            this.options.getContentWidth(),
            this.options.getContentHeight()
          );
        },
        /*
        ---------------------------------------------------------------------------
          PUBLIC API
        ---------------------------------------------------------------------------
        */
      
        getRenderFn: function() {
          var self = this;
      
          var content = this.__content;
      
          var docStyle = document.documentElement.style;
      
          var engine;
          if ('MozAppearance' in docStyle) {
            engine = 'gecko';
          } else if ('WebkitAppearance' in docStyle) {
            engine = 'webkit';
          } else if (typeof navigator.cpuClass === 'string') {
            engine = 'trident';
          }
      
          var vendorPrefix = {
            trident: 'ms',
            gecko: 'Moz',
            webkit: 'Webkit',
            presto: 'O'
          }[engine];
      
          var helperElem = document.createElement("div");
          var undef;
      
          var perspectiveProperty = vendorPrefix + "Perspective";
          var transformProperty = vendorPrefix + "Transform";
          var transformOriginProperty = vendorPrefix + 'TransformOrigin';
      
          self.__perspectiveProperty = transformProperty;
          self.__transformProperty = transformProperty;
          self.__transformOriginProperty = transformOriginProperty;
      
          if (helperElem.style[perspectiveProperty] !== undef) {
      
            return function(left, top, zoom, wasResize) {
              content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
              self.__repositionScrollbars();
              if(!wasResize) {
                self.triggerScrollEvent();
              }
            };
      
          } else if (helperElem.style[transformProperty] !== undef) {
      
            return function(left, top, zoom, wasResize) {
              content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
              self.__repositionScrollbars();
              if(!wasResize) {
                self.triggerScrollEvent();
              }
            };
      
          } else {
      
            return function(left, top, zoom, wasResize) {
              content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
              content.style.marginTop = top ? (-top/zoom) + 'px' : '';
              content.style.zoom = zoom || '';
              self.__repositionScrollbars();
              if(!wasResize) {
                self.triggerScrollEvent();
              }
            };
      
          }
        },
      
      
        /**
         * Configures the dimensions of the client (outer) and content (inner) elements.
         * Requires the available space for the outer element and the outer size of the inner element.
         * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
         *
         * @param clientWidth {Integer} Inner width of outer element
         * @param clientHeight {Integer} Inner height of outer element
         * @param contentWidth {Integer} Outer width of inner element
         * @param contentHeight {Integer} Outer height of inner element
         */
        setDimensions: function(clientWidth, clientHeight, contentWidth, contentHeight) {
          var self = this;
      
          // Only update values which are defined
          if (clientWidth === +clientWidth) {
            self.__clientWidth = clientWidth;
          }
      
          if (clientHeight === +clientHeight) {
            self.__clientHeight = clientHeight;
          }
      
          if (contentWidth === +contentWidth) {
            self.__contentWidth = contentWidth;
          }
      
          if (contentHeight === +contentHeight) {
            self.__contentHeight = contentHeight;
          }
      
          // Refresh maximums
          self.__computeScrollMax();
          self.__resizeScrollbars();
      
          // Refresh scroll position
          self.scrollTo(self.__scrollLeft, self.__scrollTop, true, null, true);
      
        },
      
      
        /**
         * Sets the client coordinates in relation to the document.
         *
         * @param left {Integer} Left position of outer element
         * @param top {Integer} Top position of outer element
         */
        setPosition: function(left, top) {
      
          var self = this;
      
          self.__clientLeft = left || 0;
          self.__clientTop = top || 0;
      
        },
      
      
        /**
         * Configures the snapping (when snapping is active)
         *
         * @param width {Integer} Snapping width
         * @param height {Integer} Snapping height
         */
        setSnapSize: function(width, height) {
      
          var self = this;
      
          self.__snapWidth = width;
          self.__snapHeight = height;
      
        },
      
      
        /**
         * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
         * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
         * the official Twitter client.
         *
         * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
         * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
         * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
         * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
         * @param showCallback {Function} Callback to execute when the refresher should be shown. This is for showing the refresher during a negative scrollTop.
         * @param hideCallback {Function} Callback to execute when the refresher should be hidden. This is for hiding the refresher when it's behind the nav bar.
         * @param tailCallback {Function} Callback to execute just before the refresher returns to it's original state. This is for zooming out the refresher.
         */
        activatePullToRefresh: function(height, activateCallback, deactivateCallback, startCallback, showCallback, hideCallback, tailCallback) {
      
          var self = this;
      
          self.__refreshHeight = height;
          self.__refreshActivate = function(){ionic.requestAnimationFrame(activateCallback);};
          self.__refreshDeactivate = function(){ionic.requestAnimationFrame(deactivateCallback);};
          self.__refreshStart = function(){ionic.requestAnimationFrame(startCallback);};
          self.__refreshShow = function(){ionic.requestAnimationFrame(showCallback);};
          self.__refreshHide = function(){ionic.requestAnimationFrame(hideCallback);};
          self.__refreshTail = function(){ionic.requestAnimationFrame(tailCallback);};
          self.__refreshTailTime = 100;
          self.__minSpinTime = 600;
        },
      
      
        /**
         * Starts pull-to-refresh manually.
         */
        triggerPullToRefresh: function() {
          // Use publish instead of scrollTo to allow scrolling to out of boundary position
          // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
          this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);
      
          var d = new Date();
          self.refreshStartTime = d.getTime();
      
          if (this.__refreshStart) {
            this.__refreshStart();
          }
        },
      
      
        /**
         * Signalizes that pull-to-refresh is finished.
         */
        finishPullToRefresh: function() {
      
          var self = this;
          // delay to make sure the spinner has a chance to spin for a split second before it's dismissed
          var d = new Date();
          var delay = 0;
          if(self.refreshStartTime + self.__minSpinTime > d.getTime()){
            delay = self.refreshStartTime + self.__minSpinTime - d.getTime();
          }
          setTimeout(function(){
            if(self.__refreshTail){
              self.__refreshTail();
            }
            setTimeout(function(){
              self.__refreshActive = false;
              if (self.__refreshDeactivate) {
                self.__refreshDeactivate();
              }
      
              self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
            },self.__refreshTailTime);
          },delay);
        },
      
      
        /**
         * Returns the scroll position and zooming values
         *
         * @return {Map} `left` and `top` scroll position and `zoom` level
         */
        getValues: function() {
      
          var self = this;
      
          return {
            left: self.__scrollLeft,
            top: self.__scrollTop,
            zoom: self.__zoomLevel
          };
      
        },
      
      
        /**
         * Returns the maximum scroll values
         *
         * @return {Map} `left` and `top` maximum scroll values
         */
        getScrollMax: function() {
      
          var self = this;
      
          return {
            left: self.__maxScrollLeft,
            top: self.__maxScrollTop
          };
      
        },
      
      
        /**
         * Zooms to the given level. Supports optional animation. Zooms
         * the center when no coordinates are given.
         *
         * @param level {Number} Level to zoom to
         * @param animate {Boolean} Whether to use animation
         * @param originLeft {Number} Zoom in at given left coordinate
         * @param originTop {Number} Zoom in at given top coordinate
         */
        zoomTo: function(level, animate, originLeft, originTop) {
      
          var self = this;
      
          if (!self.options.zooming) {
            throw new Error("Zooming is not enabled!");
          }
      
          // Stop deceleration
          if (self.__isDecelerating) {
            zyngaCore.effect.Animate.stop(self.__isDecelerating);
            self.__isDecelerating = false;
          }
      
          var oldLevel = self.__zoomLevel;
      
          // Normalize input origin to center of viewport if not defined
          if (originLeft == null) {
            originLeft = self.__clientWidth / 2;
          }
      
          if (originTop == null) {
            originTop = self.__clientHeight / 2;
          }
      
          // Limit level according to configuration
          level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);
      
          // Recompute maximum values while temporary tweaking maximum scroll ranges
          self.__computeScrollMax(level);
      
          // Recompute left and top coordinates based on new zoom level
          var left = ((originLeft + self.__scrollLeft) * level / oldLevel) - originLeft;
          var top = ((originTop + self.__scrollTop) * level / oldLevel) - originTop;
      
          // Limit x-axis
          if (left > self.__maxScrollLeft) {
            left = self.__maxScrollLeft;
          } else if (left < 0) {
            left = 0;
          }
      
          // Limit y-axis
          if (top > self.__maxScrollTop) {
            top = self.__maxScrollTop;
          } else if (top < 0) {
            top = 0;
          }
      
          // Push values out
          self.__publish(left, top, level, animate);
      
        },
      
      
        /**
         * Zooms the content by the given factor.
         *
         * @param factor {Number} Zoom by given factor
         * @param animate {Boolean} Whether to use animation
         * @param originLeft {Number} Zoom in at given left coordinate
         * @param originTop {Number} Zoom in at given top coordinate
         */
        zoomBy: function(factor, animate, originLeft, originTop) {
      
          var self = this;
      
          self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop);
      
        },
      
      
        /**
         * Scrolls to the given position. Respect limitations and snapping automatically.
         *
         * @param left {Number} Horizontal scroll position, keeps current if value is <code>null</code>
         * @param top {Number} Vertical scroll position, keeps current if value is <code>null</code>
         * @param animate {Boolean} Whether the scrolling should happen using an animation
         * @param zoom {Number} Zoom level to go to
         */
        scrollTo: function(left, top, animate, zoom, wasResize) {
          var self = this;
      
          // Stop deceleration
          if (self.__isDecelerating) {
            zyngaCore.effect.Animate.stop(self.__isDecelerating);
            self.__isDecelerating = false;
          }
      
          // Correct coordinates based on new zoom level
          if (zoom != null && zoom !== self.__zoomLevel) {
      
            if (!self.options.zooming) {
              throw new Error("Zooming is not enabled!");
            }
      
            left *= zoom;
            top *= zoom;
      
            // Recompute maximum values while temporary tweaking maximum scroll ranges
            self.__computeScrollMax(zoom);
      
          } else {
      
            // Keep zoom when not defined
            zoom = self.__zoomLevel;
      
          }
      
          if (!self.options.scrollingX) {
      
            left = self.__scrollLeft;
      
          } else {
      
            if (self.options.paging) {
              left = Math.round(left / self.__clientWidth) * self.__clientWidth;
            } else if (self.options.snapping) {
              left = Math.round(left / self.__snapWidth) * self.__snapWidth;
            }
      
          }
      
          if (!self.options.scrollingY) {
      
            top = self.__scrollTop;
      
          } else {
      
            if (self.options.paging) {
              top = Math.round(top / self.__clientHeight) * self.__clientHeight;
            } else if (self.options.snapping) {
              top = Math.round(top / self.__snapHeight) * self.__snapHeight;
            }
      
          }
      
          // Limit for allowed ranges
          left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
          top = Math.max(Math.min(self.__maxScrollTop, top), 0);
      
          // Don't animate when no change detected, still call publish to make sure
          // that rendered position is really in-sync with internal data
          if (left === self.__scrollLeft && top === self.__scrollTop) {
            animate = false;
          }
      
          // Publish new values
          self.__publish(left, top, zoom, animate, wasResize);
      
        },
      
      
        /**
         * Scroll by the given offset
         *
         * @param left {Number} Scroll x-axis by given offset
         * @param top {Number} Scroll y-axis by given offset
         * @param animate {Boolean} Whether to animate the given change
         */
        scrollBy: function(left, top, animate) {
      
          var self = this;
      
          var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
          var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;
      
          self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);
      
        },
      
      
      
        /*
        ---------------------------------------------------------------------------
          EVENT CALLBACKS
        ---------------------------------------------------------------------------
        */
      
        /**
         * Mouse wheel handler for zooming support
         */
        doMouseZoom: function(wheelDelta, timeStamp, pageX, pageY) {
      
          var self = this;
          var change = wheelDelta > 0 ? 0.97 : 1.03;
      
          return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);
      
        },
      
        /**
         * Touch start handler for scrolling support
         */
        doTouchStart: function(touches, timeStamp) {
          this.hintResize();
      
          if (timeStamp instanceof Date) {
            timeStamp = timeStamp.valueOf();
          }
          if (typeof timeStamp !== "number") {
            timeStamp = Date.now();
          }
      
          var self = this;
      
          // Reset interruptedAnimation flag
          self.__interruptedAnimation = true;
      
          // Stop deceleration
          if (self.__isDecelerating) {
            zyngaCore.effect.Animate.stop(self.__isDecelerating);
            self.__isDecelerating = false;
            self.__interruptedAnimation = true;
          }
      
          // Stop animation
          if (self.__isAnimating) {
            zyngaCore.effect.Animate.stop(self.__isAnimating);
            self.__isAnimating = false;
            self.__interruptedAnimation = true;
          }
      
          // Use center point when dealing with two fingers
          var currentTouchLeft, currentTouchTop;
          var isSingleTouch = touches.length === 1;
          if (isSingleTouch) {
            currentTouchLeft = touches[0].pageX;
            currentTouchTop = touches[0].pageY;
          } else {
            currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
            currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
          }
      
          // Store initial positions
          self.__initialTouchLeft = currentTouchLeft;
          self.__initialTouchTop = currentTouchTop;
      
          // Store initial touchList for scale calculation
          self.__initialTouches = touches;
      
          // Store current zoom level
          self.__zoomLevelStart = self.__zoomLevel;
      
          // Store initial touch positions
          self.__lastTouchLeft = currentTouchLeft;
          self.__lastTouchTop = currentTouchTop;
      
          // Store initial move time stamp
          self.__lastTouchMove = timeStamp;
      
          // Reset initial scale
          self.__lastScale = 1;
      
          // Reset locking flags
          self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
          self.__enableScrollY = !isSingleTouch && self.options.scrollingY;
      
          // Reset tracking flag
          self.__isTracking = true;
      
          // Reset deceleration complete flag
          self.__didDecelerationComplete = false;
      
          // Dragging starts directly with two fingers, otherwise lazy with an offset
          self.__isDragging = !isSingleTouch;
      
          // Some features are disabled in multi touch scenarios
          self.__isSingleTouch = isSingleTouch;
      
          // Clearing data structure
          self.__positions = [];
      
        },
      
      
        /**
         * Touch move handler for scrolling support
         */
        doTouchMove: function(touches, timeStamp, scale) {
          if (timeStamp instanceof Date) {
            timeStamp = timeStamp.valueOf();
          }
          if (typeof timeStamp !== "number") {
            timeStamp = Date.now();
          }
      
          var self = this;
      
          // Ignore event when tracking is not enabled (event might be outside of element)
          if (!self.__isTracking) {
            return;
          }
      
          var currentTouchLeft, currentTouchTop;
      
          // Compute move based around of center of fingers
          if (touches.length === 2) {
            currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
            currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      
            // Calculate scale when not present and only when touches are used
            if (!scale && self.options.zooming) {
              scale = self.__getScale(self.__initialTouches, touches);
            }
          } else {
            currentTouchLeft = touches[0].pageX;
            currentTouchTop = touches[0].pageY;
          }
      
          var positions = self.__positions;
      
          // Are we already is dragging mode?
          if (self.__isDragging) {
      
            // Compute move distance
            var moveX = currentTouchLeft - self.__lastTouchLeft;
            var moveY = currentTouchTop - self.__lastTouchTop;
      
            // Read previous scroll position and zooming
            var scrollLeft = self.__scrollLeft;
            var scrollTop = self.__scrollTop;
            var level = self.__zoomLevel;
      
            // Work with scaling
            if (scale != null && self.options.zooming) {
      
              var oldLevel = level;
      
              // Recompute level based on previous scale and new scale
              level = level / self.__lastScale * scale;
      
              // Limit level according to configuration
              level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);
      
              // Only do further compution when change happened
              if (oldLevel !== level) {
      
                // Compute relative event position to container
                var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
                var currentTouchTopRel = currentTouchTop - self.__clientTop;
      
                // Recompute left and top coordinates based on new zoom level
                scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
                scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;
      
                // Recompute max scroll values
                self.__computeScrollMax(level);
      
              }
            }
      
            if (self.__enableScrollX) {
      
              scrollLeft -= moveX * this.options.speedMultiplier;
              var maxScrollLeft = self.__maxScrollLeft;
      
              if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
      
                // Slow down on the edges
                if (self.options.bouncing) {
      
                  scrollLeft += (moveX / 2  * this.options.speedMultiplier);
      
                } else if (scrollLeft > maxScrollLeft) {
      
                  scrollLeft = maxScrollLeft;
      
                } else {
      
                  scrollLeft = 0;
      
                }
              }
            }
      
            // Compute new vertical scroll position
            if (self.__enableScrollY) {
      
              scrollTop -= moveY * this.options.speedMultiplier;
              var maxScrollTop = self.__maxScrollTop;
      
              if (scrollTop > maxScrollTop || scrollTop < 0) {
      
                // Slow down on the edges
                if (self.options.bouncing || (self.__refreshHeight && scrollTop < 0)) {
      
                  scrollTop += (moveY / 2 * this.options.speedMultiplier);
      
                  // Support pull-to-refresh (only when only y is scrollable)
                  if (!self.__enableScrollX && self.__refreshHeight != null) {
      
                    // hide the refresher when it's behind the header bar in case of header transparency
                    if(scrollTop < 0){
                      self.__refreshHidden = false;
                      self.__refreshShow();
                    }else{
                      self.__refreshHide();
                      self.__refreshHidden = true;
                    }
      
                    if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {
      
                      self.__refreshActive = true;
                      if (self.__refreshActivate) {
                        self.__refreshActivate();
                      }
      
                    } else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {
      
                      self.__refreshActive = false;
                      if (self.__refreshDeactivate) {
                        self.__refreshDeactivate();
                      }
      
                    }
                  }
      
                } else if (scrollTop > maxScrollTop) {
      
                  scrollTop = maxScrollTop;
      
                } else {
      
                  scrollTop = 0;
      
                }
              }else if(self.__refreshHeight && !self.__refreshHidden){
                // if a positive scroll value and the refresher is still not hidden, hide it
                self.__refreshHide();
                self.__refreshHidden = true;
              }
            }
      
            // Keep list from growing infinitely (holding min 10, max 20 measure points)
            if (positions.length > 60) {
              positions.splice(0, 30);
            }
      
            // Track scroll movement for decleration
            positions.push(scrollLeft, scrollTop, timeStamp);
      
            // Sync scroll position
            self.__publish(scrollLeft, scrollTop, level);
      
          // Otherwise figure out whether we are switching into dragging mode now.
          } else {
      
            var minimumTrackingForScroll = self.options.locking ? 3 : 0;
            var minimumTrackingForDrag = 5;
      
            var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
            var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
      
            self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
            self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;
      
            positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);
      
            self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
            if (self.__isDragging) {
              self.__interruptedAnimation = false;
              self.__fadeScrollbars('in');
            }
      
          }
      
          // Update last touch positions and time stamp for next event
          self.__lastTouchLeft = currentTouchLeft;
          self.__lastTouchTop = currentTouchTop;
          self.__lastTouchMove = timeStamp;
          self.__lastScale = scale;
      
        },
      
      
        /**
         * Touch end handler for scrolling support
         */
        doTouchEnd: function(timeStamp) {
          if (timeStamp instanceof Date) {
            timeStamp = timeStamp.valueOf();
          }
          if (typeof timeStamp !== "number") {
            timeStamp = Date.now();
          }
      
          var self = this;
      
          // Ignore event when tracking is not enabled (no touchstart event on element)
          // This is required as this listener ('touchmove') sits on the document and not on the element itself.
          if (!self.__isTracking) {
            return;
          }
      
          // Not touching anymore (when two finger hit the screen there are two touch end events)
          self.__isTracking = false;
      
          // Be sure to reset the dragging flag now. Here we also detect whether
          // the finger has moved fast enough to switch into a deceleration animation.
          if (self.__isDragging) {
      
            // Reset dragging flag
            self.__isDragging = false;
      
            // Start deceleration
            // Verify that the last move detected was in some relevant time frame
            if (self.__isSingleTouch && self.options.animating && (timeStamp - self.__lastTouchMove) <= 100) {
      
              // Then figure out what the scroll position was about 100ms ago
              var positions = self.__positions;
              var endPos = positions.length - 1;
              var startPos = endPos;
      
              // Move pointer to position measured 100ms ago
              for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 3) {
                startPos = i;
              }
      
              // If start and stop position is identical in a 100ms timeframe,
              // we cannot compute any useful deceleration.
              if (startPos !== endPos) {
      
                // Compute relative movement between these two points
                var timeOffset = positions[endPos] - positions[startPos];
                var movedLeft = self.__scrollLeft - positions[startPos - 2];
                var movedTop = self.__scrollTop - positions[startPos - 1];
      
                // Based on 50ms compute the movement to apply for each render step
                self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
                self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);
      
                // How much velocity is required to start the deceleration
                var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;
      
                // Verify that we have enough velocity to start deceleration
                if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
      
                  // Deactivate pull-to-refresh when decelerating
                  if (!self.__refreshActive) {
                    self.__startDeceleration(timeStamp);
                  }
                }
              } else {
                self.__scrollingComplete();
              }
            } else if ((timeStamp - self.__lastTouchMove) > 100) {
              self.__scrollingComplete();
            }
          }
      
          // If this was a slower move it is per default non decelerated, but this
          // still means that we want snap back to the bounds which is done here.
          // This is placed outside the condition above to improve edge case stability
          // e.g. touchend fired without enabled dragging. This should normally do not
          // have modified the scroll positions or even showed the scrollbars though.
          if (!self.__isDecelerating) {
      
            if (self.__refreshActive && self.__refreshStart) {
      
              // Use publish instead of scrollTo to allow scrolling to out of boundary position
              // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
              self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);
      
              var d = new Date();
              self.refreshStartTime = d.getTime();
      
              if (self.__refreshStart) {
                self.__refreshStart();
              }
              // for iOS-ey style scrolling
              if(!ionic.Platform.isAndroid())self.__startDeceleration();
            } else {
      
              if (self.__interruptedAnimation || self.__isDragging) {
                self.__scrollingComplete();
              }
              self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);
      
              // Directly signalize deactivation (nothing todo on refresh?)
              if (self.__refreshActive) {
      
                self.__refreshActive = false;
                if (self.__refreshDeactivate) {
                  self.__refreshDeactivate();
                }
      
              }
            }
          }
      
          // Fully cleanup list
          self.__positions.length = 0;
      
        },
      
      
      
        /*
        ---------------------------------------------------------------------------
          PRIVATE API
        ---------------------------------------------------------------------------
        */
      
        /**
         * Applies the scroll position to the content element
         *
         * @param left {Number} Left scroll position
         * @param top {Number} Top scroll position
         * @param animate {Boolean} Whether animation should be used to move to the new coordinates
         */
        __publish: function(left, top, zoom, animate, wasResize) {
      
          var self = this;
      
          // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
          var wasAnimating = self.__isAnimating;
          if (wasAnimating) {
            zyngaCore.effect.Animate.stop(wasAnimating);
            self.__isAnimating = false;
          }
      
          if (animate && self.options.animating) {
      
            // Keep scheduled positions for scrollBy/zoomBy functionality
            self.__scheduledLeft = left;
            self.__scheduledTop = top;
            self.__scheduledZoom = zoom;
      
            var oldLeft = self.__scrollLeft;
            var oldTop = self.__scrollTop;
            var oldZoom = self.__zoomLevel;
      
            var diffLeft = left - oldLeft;
            var diffTop = top - oldTop;
            var diffZoom = zoom - oldZoom;
      
            var step = function(percent, now, render) {
      
              if (render) {
      
                self.__scrollLeft = oldLeft + (diffLeft * percent);
                self.__scrollTop = oldTop + (diffTop * percent);
                self.__zoomLevel = oldZoom + (diffZoom * percent);
      
                // Push values out
                if (self.__callback) {
                  self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel, wasResize);
                }
      
              }
            };
      
            var verify = function(id) {
              return self.__isAnimating === id;
            };
      
            var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
              if (animationId === self.__isAnimating) {
                self.__isAnimating = false;
              }
              if (self.__didDecelerationComplete || wasFinished) {
                self.__scrollingComplete();
              }
      
              if (self.options.zooming) {
                self.__computeScrollMax();
              }
            };
      
            // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
            self.__isAnimating = zyngaCore.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
      
          } else {
      
            self.__scheduledLeft = self.__scrollLeft = left;
            self.__scheduledTop = self.__scrollTop = top;
            self.__scheduledZoom = self.__zoomLevel = zoom;
      
            // Push values out
            if (self.__callback) {
              self.__callback(left, top, zoom, wasResize);
            }
      
            // Fix max scroll ranges
            if (self.options.zooming) {
              self.__computeScrollMax();
            }
          }
        },
      
      
        /**
         * Recomputes scroll minimum values based on client dimensions and content dimensions.
         */
        __computeScrollMax: function(zoomLevel) {
      
          var self = this;
      
          if (zoomLevel == null) {
            zoomLevel = self.__zoomLevel;
          }
      
          self.__maxScrollLeft = Math.max((self.__contentWidth * zoomLevel) - self.__clientWidth, 0);
          self.__maxScrollTop = Math.max((self.__contentHeight * zoomLevel) - self.__clientHeight, 0);
      
          if(!self.__didWaitForSize && !self.__maxScrollLeft && !self.__maxScrollTop) {
            self.__didWaitForSize = true;
            self.__waitForSize();
          }
        },
      
      
        /**
         * If the scroll view isn't sized correctly on start, wait until we have at least some size
         */
        __waitForSize: function() {
      
          var self = this;
      
          clearTimeout(self.__sizerTimeout);
      
          var sizer = function() {
            self.resize();
      
            if((self.options.scrollingX && !self.__maxScrollLeft) || (self.options.scrollingY && !self.__maxScrollTop)) {
              //self.__sizerTimeout = setTimeout(sizer, 1000);
            }
          };
      
          sizer();
          self.__sizerTimeout = setTimeout(sizer, 1000);
        },
      
        /*
        ---------------------------------------------------------------------------
          ANIMATION (DECELERATION) SUPPORT
        ---------------------------------------------------------------------------
        */
      
        /**
         * Called when a touch sequence end and the speed of the finger was high enough
         * to switch into deceleration mode.
         */
        __startDeceleration: function(timeStamp) {
      
          var self = this;
      
          if (self.options.paging) {
      
            var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
            var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
            var clientWidth = self.__clientWidth;
            var clientHeight = self.__clientHeight;
      
            // We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
            // Each page should have exactly the size of the client area.
            self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
            self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
            self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
            self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
      
          } else {
      
            self.__minDecelerationScrollLeft = 0;
            self.__minDecelerationScrollTop = 0;
            self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
            self.__maxDecelerationScrollTop = self.__maxScrollTop;
            if(self.__refreshActive) self.__minDecelerationScrollTop = self.__refreshHeight *-1;
          }
      
          // Wrap class method
          var step = function(percent, now, render) {
            self.__stepThroughDeceleration(render);
          };
      
          // How much velocity is required to keep the deceleration running
          self.__minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.1;
      
          // Detect whether it's still worth to continue animating steps
          // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
          var verify = function() {
            var shouldContinue = Math.abs(self.__decelerationVelocityX) >= self.__minVelocityToKeepDecelerating ||
              Math.abs(self.__decelerationVelocityY) >= self.__minVelocityToKeepDecelerating;
            if (!shouldContinue) {
              self.__didDecelerationComplete = true;
      
              //Make sure the scroll values are within the boundaries after a bounce,
              //not below 0 or above maximum
              if (self.options.bouncing && !self.__refreshActive) {
                self.scrollTo(
                  Math.min( Math.max(self.__scrollLeft, 0), self.__maxScrollLeft ),
                  Math.min( Math.max(self.__scrollTop, 0), self.__maxScrollTop ),
                  self.__refreshActive
                );
              }
            }
            return shouldContinue;
          };
      
          var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
            self.__isDecelerating = false;
            if (self.__didDecelerationComplete) {
              self.__scrollingComplete();
            }
      
            // Animate to grid when snapping is active, otherwise just fix out-of-boundary positions
            if(self.options.paging) {
              self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
            }
          };
      
          // Start animation and switch on flag
          self.__isDecelerating = zyngaCore.effect.Animate.start(step, verify, completed);
      
        },
      
      
        /**
         * Called on every step of the animation
         *
         * @param inMemory {Boolean} Whether to not render the current step, but keep it in memory only. Used internally only!
         */
        __stepThroughDeceleration: function(render) {
      
          var self = this;
      
      
          //
          // COMPUTE NEXT SCROLL POSITION
          //
      
          // Add deceleration to scroll position
          var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;// * self.options.deceleration);
          var scrollTop = self.__scrollTop + self.__decelerationVelocityY;// * self.options.deceleration);
      
      
          //
          // HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
          //
      
          if (!self.options.bouncing) {
      
            var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
            if (scrollLeftFixed !== scrollLeft) {
              scrollLeft = scrollLeftFixed;
              self.__decelerationVelocityX = 0;
            }
      
            var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
            if (scrollTopFixed !== scrollTop) {
              scrollTop = scrollTopFixed;
              self.__decelerationVelocityY = 0;
            }
      
          }
      
      
          //
          // UPDATE SCROLL POSITION
          //
      
          if (render) {
      
            self.__publish(scrollLeft, scrollTop, self.__zoomLevel);
      
          } else {
      
            self.__scrollLeft = scrollLeft;
            self.__scrollTop = scrollTop;
      
          }
      
      
          //
          // SLOW DOWN
          //
      
          // Slow down velocity on every iteration
          if (!self.options.paging) {
      
            // This is the factor applied to every iteration of the animation
            // to slow down the process. This should emulate natural behavior where
            // objects slow down when the initiator of the movement is removed
            var frictionFactor = self.options.deceleration;
      
            self.__decelerationVelocityX *= frictionFactor;
            self.__decelerationVelocityY *= frictionFactor;
      
          }
      
      
          //
          // BOUNCING SUPPORT
          //
      
          if (self.options.bouncing) {
      
            var scrollOutsideX = 0;
            var scrollOutsideY = 0;
      
            // This configures the amount of change applied to deceleration/acceleration when reaching boundaries
            var penetrationDeceleration = self.options.penetrationDeceleration;
            var penetrationAcceleration = self.options.penetrationAcceleration;
      
            // Check limits
            if (scrollLeft < self.__minDecelerationScrollLeft) {
              scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
            } else if (scrollLeft > self.__maxDecelerationScrollLeft) {
              scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
            }
      
            if (scrollTop < self.__minDecelerationScrollTop) {
              scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
            } else if (scrollTop > self.__maxDecelerationScrollTop) {
              scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
            }
      
            // Slow down until slow enough, then flip back to snap position
            if (scrollOutsideX !== 0) {
              var isHeadingOutwardsX = scrollOutsideX * self.__decelerationVelocityX <= self.__minDecelerationScrollLeft;
              if (isHeadingOutwardsX) {
                self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
              }
              var isStoppedX = Math.abs(self.__decelerationVelocityX) <= self.__minVelocityToKeepDecelerating;
              //If we're not heading outwards, or if the above statement got us below minDeceleration, go back towards bounds
              if (!isHeadingOutwardsX || isStoppedX) {
                self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
              }
            }
      
            if (scrollOutsideY !== 0) {
              var isHeadingOutwardsY = scrollOutsideY * self.__decelerationVelocityY <= self.__minDecelerationScrollTop;
              if (isHeadingOutwardsY) {
                self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
              }
              var isStoppedY = Math.abs(self.__decelerationVelocityY) <= self.__minVelocityToKeepDecelerating;
              //If we're not heading outwards, or if the above statement got us below minDeceleration, go back towards bounds
              if (!isHeadingOutwardsY || isStoppedY) {
                self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
              }
            }
          }
        },
      
      
        /**
         * calculate the distance between two touches
         * @param   {Touch}     touch1
         * @param   {Touch}     touch2
         * @returns {Number}    distance
         */
        __getDistance: function getDistance(touch1, touch2) {
          var x = touch2.pageX - touch1.pageX,
          y = touch2.pageY - touch1.pageY;
          return Math.sqrt((x*x) + (y*y));
        },
      
      
        /**
         * calculate the scale factor between two touchLists (fingers)
         * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
         * @param   {Array}     start
         * @param   {Array}     end
         * @returns {Number}    scale
         */
        __getScale: function getScale(start, end) {
      
          var self = this;
      
          // need two fingers...
          if(start.length >= 2 && end.length >= 2) {
            return self.__getDistance(end[0], end[1]) /
              self.__getDistance(start[0], start[1]);
          }
          return 1;
        }
      });
      
      ionic.scroll = {
        isScrolling: false,
        lastTop: 0
      };
      
      })(ionic);
      
      (function(ionic) {
      'use strict';
      
        ionic.views.HeaderBar = ionic.views.View.inherit({
          initialize: function(opts) {
            this.el = opts.el;
      
            ionic.extend(this, {
              alignTitle: 'center'
            }, opts);
      
            this.align();
          },
      
          align: function(align) {
      
            align || (align = this.alignTitle);
      
            // Find the titleEl element
            var titleEl = this.el.querySelector('.title');
            if(!titleEl) {
              return;
            }
      
            var self = this;
            //We have to rAF here so all of the elements have time to initialize
            ionic.requestAnimationFrame(function() {
              var i, c, childSize;
              var childNodes = self.el.childNodes;
              var leftWidth = 0;
              var rightWidth = 0;
              var isCountingRightWidth = false;
      
              // Compute how wide the left children are
              // Skip all titles (there may still be two titles, one leaving the dom)
              // Once we encounter a titleEl, realize we are now counting the right-buttons, not left
              for(i = 0; i < childNodes.length; i++) {
                c = childNodes[i];
                if (c.tagName && c.tagName.toLowerCase() == 'h1') {
                  isCountingRightWidth = true;
                  continue;
                }
      
                childSize = null;
                if(c.nodeType == 3) {
                  var bounds = ionic.DomUtil.getTextBounds(c);
                  if(bounds) {
                    childSize = bounds.width;
                  }
                } else if(c.nodeType == 1) {
                  childSize = c.offsetWidth;
                }
                if(childSize) {
                  if (isCountingRightWidth) {
                    rightWidth += childSize;
                  } else {
                    leftWidth += childSize;
                  }
                }
              }
      
              var margin = Math.max(leftWidth, rightWidth) + 10;
      
              //Reset left and right before setting again
              titleEl.style.left = titleEl.style.right = '';
      
              // Size and align the header titleEl based on the sizes of the left and
              // right children, and the desired alignment mode
              if(align == 'center') {
                if(margin > 10) {
                  titleEl.style.left = margin + 'px';
                  titleEl.style.right = margin + 'px';
                }
                if(titleEl.offsetWidth < titleEl.scrollWidth) {
                  if(rightWidth > 0) {
                    titleEl.style.right = (rightWidth + 5) + 'px';
                  }
                }
              } else if(align == 'left') {
                titleEl.classList.add('title-left');
                if(leftWidth > 0) {
                  titleEl.style.left = (leftWidth + 15) + 'px';
                }
              } else if(align == 'right') {
                titleEl.classList.add('title-right');
                if(rightWidth > 0) {
                  titleEl.style.right = (rightWidth + 15) + 'px';
                }
              }
            });
          }
        });
      
      })(ionic);
      
      (function(ionic) {
      'use strict';
      
        var ITEM_CLASS = 'item';
        var ITEM_CONTENT_CLASS = 'item-content';
        var ITEM_SLIDING_CLASS = 'item-sliding';
        var ITEM_OPTIONS_CLASS = 'item-options';
        var ITEM_PLACEHOLDER_CLASS = 'item-placeholder';
        var ITEM_REORDERING_CLASS = 'item-reordering';
        var ITEM_REORDER_BTN_CLASS = 'item-reorder';
      
        var DragOp = function() {};
        DragOp.prototype = {
          start: function(e) {
          },
          drag: function(e) {
          },
          end: function(e) {
          },
          isSameItem: function(item) {
            return false;
          }
        };
      
        var SlideDrag = function(opts) {
          this.dragThresholdX = opts.dragThresholdX || 10;
          this.el = opts.el;
          this.canSwipe = opts.canSwipe;
        };
      
        SlideDrag.prototype = new DragOp();
      
        SlideDrag.prototype.start = function(e) {
          var content, buttons, offsetX, buttonsWidth;
      
          if (!this.canSwipe()) {
            return;
          }
      
          if(e.target.classList.contains(ITEM_CONTENT_CLASS)) {
            content = e.target;
          } else if(e.target.classList.contains(ITEM_CLASS)) {
            content = e.target.querySelector('.' + ITEM_CONTENT_CLASS);
          } else {
            content = ionic.DomUtil.getParentWithClass(e.target, ITEM_CONTENT_CLASS);
          }
      
          // If we don't have a content area as one of our children (or ourselves), skip
          if(!content) {
            return;
          }
      
          // Make sure we aren't animating as we slide
          content.classList.remove(ITEM_SLIDING_CLASS);
      
          // Grab the starting X point for the item (for example, so we can tell whether it is open or closed to start)
          offsetX = parseFloat(content.style[ionic.CSS.TRANSFORM].replace('translate3d(', '').split(',')[0]) || 0;
      
          // Grab the buttons
          buttons = content.parentNode.querySelector('.' + ITEM_OPTIONS_CLASS);
          if(!buttons) {
            return;
          }
          buttons.classList.remove('invisible');
      
          buttonsWidth = buttons.offsetWidth;
      
          this._currentDrag = {
            buttons: buttons,
            buttonsWidth: buttonsWidth,
            content: content,
            startOffsetX: offsetX
          };
        };
      
        /**
         * Check if this is the same item that was previously dragged.
         */
        SlideDrag.prototype.isSameItem = function(op) {
          if(op._lastDrag && this._currentDrag) {
            return this._currentDrag.content == op._lastDrag.content;
          }
          return false;
        };
      
        SlideDrag.prototype.clean = function(e) {
          var lastDrag = this._lastDrag;
      
          if(!lastDrag) return;
      
          lastDrag.content.style[ionic.CSS.TRANSITION] = '';
          lastDrag.content.style[ionic.CSS.TRANSFORM] = '';
          ionic.requestAnimationFrame(function() {
            setTimeout(function() {
              lastDrag.buttons && lastDrag.buttons.classList.add('invisible');
            }, 250);
          });
        };
      
        SlideDrag.prototype.drag = ionic.animationFrameThrottle(function(e) {
          var buttonsWidth;
      
          // We really aren't dragging
          if(!this._currentDrag) {
            return;
          }
      
          // Check if we should start dragging. Check if we've dragged past the threshold,
          // or we are starting from the open state.
          if(!this._isDragging &&
              ((Math.abs(e.gesture.deltaX) > this.dragThresholdX) ||
              (Math.abs(this._currentDrag.startOffsetX) > 0)))
          {
            this._isDragging = true;
          }
      
          if(this._isDragging) {
            buttonsWidth = this._currentDrag.buttonsWidth;
      
            // Grab the new X point, capping it at zero
            var newX = Math.min(0, this._currentDrag.startOffsetX + e.gesture.deltaX);
      
            // If the new X position is past the buttons, we need to slow down the drag (rubber band style)
            if(newX < -buttonsWidth) {
              // Calculate the new X position, capped at the top of the buttons
              newX = Math.min(-buttonsWidth, -buttonsWidth + (((e.gesture.deltaX + buttonsWidth) * 0.4)));
            }
      
            this._currentDrag.content.style[ionic.CSS.TRANSFORM] = 'translate3d(' + newX + 'px, 0, 0)';
            this._currentDrag.content.style[ionic.CSS.TRANSITION] = 'none';
          }
        });
      
        SlideDrag.prototype.end = function(e, doneCallback) {
          var _this = this;
      
          // There is no drag, just end immediately
          if(!this._currentDrag) {
            doneCallback && doneCallback();
            return;
          }
      
          // If we are currently dragging, we want to snap back into place
          // The final resting point X will be the width of the exposed buttons
          var restingPoint = -this._currentDrag.buttonsWidth;
      
          // Check if the drag didn't clear the buttons mid-point
          // and we aren't moving fast enough to swipe open
          if(e.gesture.deltaX > -(this._currentDrag.buttonsWidth/2)) {
      
            // If we are going left but too slow, or going right, go back to resting
            if(e.gesture.direction == "left" && Math.abs(e.gesture.velocityX) < 0.3) {
              restingPoint = 0;
            } else if(e.gesture.direction == "right") {
              restingPoint = 0;
            }
      
          }
      
          ionic.requestAnimationFrame(function() {
            if(restingPoint === 0) {
              _this._currentDrag.content.style[ionic.CSS.TRANSFORM] = '';
              var buttons = _this._currentDrag.buttons;
              setTimeout(function() {
                buttons && buttons.classList.add('invisible');
              }, 250);
            } else {
              _this._currentDrag.content.style[ionic.CSS.TRANSFORM] = 'translate3d(' + restingPoint + 'px, 0, 0)';
            }
            _this._currentDrag.content.style[ionic.CSS.TRANSITION] = '';
      
      
            // Kill the current drag
            _this._lastDrag = _this._currentDrag;
            _this._currentDrag = null;
      
            // We are done, notify caller
            doneCallback && doneCallback();
          });
        };
      
        var ReorderDrag = function(opts) {
          this.dragThresholdY = opts.dragThresholdY || 0;
          this.onReorder = opts.onReorder;
          this.listEl = opts.listEl;
          this.el = opts.el;
          this.scrollEl = opts.scrollEl;
          this.scrollView = opts.scrollView;
          // Get the True Top of the list el http://www.quirksmode.org/js/findpos.html
          this.listElTrueTop = 0;
          if (this.listEl.offsetParent) {
            var obj = this.listEl;
            do {
              this.listElTrueTop += obj.offsetTop;
              obj = obj.offsetParent;
            } while (obj);
          }
        };
      
        ReorderDrag.prototype = new DragOp();
      
        ReorderDrag.prototype._moveElement = function(e) {
          var y = e.gesture.center.pageY +
            this.scrollView.getValues().top -
            (this._currentDrag.elementHeight / 2) -
            this.listElTrueTop;
          this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0, '+y+'px, 0)';
        };
      
        ReorderDrag.prototype.start = function(e) {
          var content;
      
          var startIndex = ionic.DomUtil.getChildIndex(this.el, this.el.nodeName.toLowerCase());
          var elementHeight = this.el.scrollHeight;
          var placeholder = this.el.cloneNode(true);
      
          placeholder.classList.add(ITEM_PLACEHOLDER_CLASS);
      
          this.el.parentNode.insertBefore(placeholder, this.el);
          this.el.classList.add(ITEM_REORDERING_CLASS);
      
          this._currentDrag = {
            elementHeight: elementHeight,
            startIndex: startIndex,
            placeholder: placeholder,
            scrollHeight: scroll,
            list: placeholder.parentNode
          };
      
          this._moveElement(e);
        };
      
        ReorderDrag.prototype.drag = ionic.animationFrameThrottle(function(e) {
          // We really aren't dragging
          var self = this;
          if(!this._currentDrag) {
            return;
          }
      
          var scrollY = 0;
          var pageY = e.gesture.center.pageY;
          var offset = this.listElTrueTop;
      
          //If we have a scrollView, check scroll boundaries for dragged element and scroll if necessary
          if (this.scrollView) {
      
            var container = this.scrollView.__container;
            scrollY = this.scrollView.getValues().top;
      
            var containerTop = container.offsetTop;
            var pixelsPastTop = containerTop - pageY + this._currentDrag.elementHeight/2;
            var pixelsPastBottom = pageY + this._currentDrag.elementHeight/2 - containerTop - container.offsetHeight;
      
            if (e.gesture.deltaY < 0 && pixelsPastTop > 0 && scrollY > 0) {
              this.scrollView.scrollBy(null, -pixelsPastTop);
              //Trigger another drag so the scrolling keeps going
              ionic.requestAnimationFrame(function() {
                self.drag(e);
              });
            }
            if (e.gesture.deltaY > 0 && pixelsPastBottom > 0) {
              if (scrollY < this.scrollView.getScrollMax().top) {
                this.scrollView.scrollBy(null, pixelsPastBottom);
                //Trigger another drag so the scrolling keeps going
                ionic.requestAnimationFrame(function() {
                  self.drag(e);
                });
              }
            }
          }
      
          // Check if we should start dragging. Check if we've dragged past the threshold,
          // or we are starting from the open state.
          if(!this._isDragging && Math.abs(e.gesture.deltaY) > this.dragThresholdY) {
            this._isDragging = true;
          }
      
          if(this._isDragging) {
            this._moveElement(e);
      
            this._currentDrag.currentY = scrollY + pageY - offset;
      
            // this._reorderItems();
          }
        });
      
        // When an item is dragged, we need to reorder any items for sorting purposes
        ReorderDrag.prototype._getReorderIndex = function() {
          var self = this;
          var placeholder = this._currentDrag.placeholder;
          var siblings = Array.prototype.slice.call(this._currentDrag.placeholder.parentNode.children)
            .filter(function(el) {
              return el.nodeName === self.el.nodeName && el !== self.el;
            });
      
          var dragOffsetTop = this._currentDrag.currentY;
          var el;
          for (var i = 0, len = siblings.length; i < len; i++) {
            el = siblings[i];
            if (i === len - 1) {
              if (dragOffsetTop > el.offsetTop) {
                return i;
              }
            } else if (i === 0) {
              if (dragOffsetTop < el.offsetTop + el.offsetHeight) {
                return i;
              }
            } else if (dragOffsetTop > el.offsetTop - el.offsetHeight / 2 &&
                       dragOffsetTop < el.offsetTop + el.offsetHeight) {
              return i;
            }
          }
          return this._currentDrag.startIndex;
        };
      
        ReorderDrag.prototype.end = function(e, doneCallback) {
          if(!this._currentDrag) {
            doneCallback && doneCallback();
            return;
          }
      
          var placeholder = this._currentDrag.placeholder;
          var finalIndex = this._getReorderIndex();
      
          // Reposition the element
          this.el.classList.remove(ITEM_REORDERING_CLASS);
          this.el.style[ionic.CSS.TRANSFORM] = '';
      
          placeholder.parentNode.insertBefore(this.el, placeholder);
          placeholder.parentNode.removeChild(placeholder);
      
          this.onReorder && this.onReorder(this.el, this._currentDrag.startIndex, finalIndex);
      
          this._currentDrag = null;
          doneCallback && doneCallback();
        };
      
      
      
        /**
         * The ListView handles a list of items. It will process drag animations, edit mode,
         * and other operations that are common on mobile lists or table views.
         */
        ionic.views.ListView = ionic.views.View.inherit({
          initialize: function(opts) {
            var _this = this;
      
            opts = ionic.extend({
              onReorder: function(el, oldIndex, newIndex) {},
              virtualRemoveThreshold: -200,
              virtualAddThreshold: 200,
              canSwipe: function() {
                return true;
              }
            }, opts);
      
            ionic.extend(this, opts);
      
            if(!this.itemHeight && this.listEl) {
              this.itemHeight = this.listEl.children[0] && parseInt(this.listEl.children[0].style.height, 10);
            }
      
            //ionic.views.ListView.__super__.initialize.call(this, opts);
      
            this.onRefresh = opts.onRefresh || function() {};
            this.onRefreshOpening = opts.onRefreshOpening || function() {};
            this.onRefreshHolding = opts.onRefreshHolding || function() {};
      
            window.ionic.onGesture('release', function(e) {
              _this._handleEndDrag(e);
            }, this.el);
      
            window.ionic.onGesture('drag', function(e) {
              _this._handleDrag(e);
            }, this.el);
            // Start the drag states
            this._initDrag();
          },
          /**
           * Called to tell the list to stop refreshing. This is useful
           * if you are refreshing the list and are done with refreshing.
           */
          stopRefreshing: function() {
            var refresher = this.el.querySelector('.list-refresher');
            refresher.style.height = '0px';
          },
      
          /**
           * If we scrolled and have virtual mode enabled, compute the window
           * of active elements in order to figure out the viewport to render.
           */
          didScroll: function(e) {
            if(this.isVirtual) {
              var itemHeight = this.itemHeight;
      
              // TODO: This would be inaccurate if we are windowed
              var totalItems = this.listEl.children.length;
      
              // Grab the total height of the list
              var scrollHeight = e.target.scrollHeight;
      
              // Get the viewport height
              var viewportHeight = this.el.parentNode.offsetHeight;
      
              // scrollTop is the current scroll position
              var scrollTop = e.scrollTop;
      
              // High water is the pixel position of the first element to include (everything before
              // that will be removed)
              var highWater = Math.max(0, e.scrollTop + this.virtualRemoveThreshold);
      
              // Low water is the pixel position of the last element to include (everything after
              // that will be removed)
              var lowWater = Math.min(scrollHeight, Math.abs(e.scrollTop) + viewportHeight + this.virtualAddThreshold);
      
              // Compute how many items per viewport size can show
              var itemsPerViewport = Math.floor((lowWater - highWater) / itemHeight);
      
              // Get the first and last elements in the list based on how many can fit
              // between the pixel range of lowWater and highWater
              var first = parseInt(Math.abs(highWater / itemHeight), 10);
              var last = parseInt(Math.abs(lowWater / itemHeight), 10);
      
              // Get the items we need to remove
              this._virtualItemsToRemove = Array.prototype.slice.call(this.listEl.children, 0, first);
      
              // Grab the nodes we will be showing
              var nodes = Array.prototype.slice.call(this.listEl.children, first, first + itemsPerViewport);
      
              this.renderViewport && this.renderViewport(highWater, lowWater, first, last);
            }
          },
      
          didStopScrolling: function(e) {
            if(this.isVirtual) {
              for(var i = 0; i < this._virtualItemsToRemove.length; i++) {
                var el = this._virtualItemsToRemove[i];
                //el.parentNode.removeChild(el);
                this.didHideItem && this.didHideItem(i);
              }
              // Once scrolling stops, check if we need to remove old items
      
            }
          },
      
          /**
           * Clear any active drag effects on the list.
           */
          clearDragEffects: function() {
            if(this._lastDragOp) {
              this._lastDragOp.clean && this._lastDragOp.clean();
              this._lastDragOp = null;
            }
          },
      
          _initDrag: function() {
            //ionic.views.ListView.__super__._initDrag.call(this);
      
            // Store the last one
            this._lastDragOp = this._dragOp;
      
            this._dragOp = null;
          },
      
          // Return the list item from the given target
          _getItem: function(target) {
            while(target) {
              if(target.classList && target.classList.contains(ITEM_CLASS)) {
                return target;
              }
              target = target.parentNode;
            }
            return null;
          },
      
      
          _startDrag: function(e) {
            var _this = this;
      
            var didStart = false;
      
            this._isDragging = false;
      
            var lastDragOp = this._lastDragOp;
            var item;
      
            // Check if this is a reorder drag
            if(ionic.DomUtil.getParentOrSelfWithClass(e.target, ITEM_REORDER_BTN_CLASS) && (e.gesture.direction == 'up' || e.gesture.direction == 'down')) {
              item = this._getItem(e.target);
      
              if(item) {
                this._dragOp = new ReorderDrag({
                  listEl: this.el,
                  el: item,
                  scrollEl: this.scrollEl,
                  scrollView: this.scrollView,
                  onReorder: function(el, start, end) {
                    _this.onReorder && _this.onReorder(el, start, end);
                  }
                });
                this._dragOp.start(e);
                e.preventDefault();
              }
            }
      
            // Or check if this is a swipe to the side drag
            else if(!this._didDragUpOrDown && (e.gesture.direction == 'left' || e.gesture.direction == 'right') && Math.abs(e.gesture.deltaX) > 5) {
      
              // Make sure this is an item with buttons
              item = this._getItem(e.target);
              if(item && item.querySelector('.item-options')) {
                this._dragOp = new SlideDrag({ el: this.el, canSwipe: this.canSwipe });
                this._dragOp.start(e);
                e.preventDefault();
              }
            }
      
            // If we had a last drag operation and this is a new one on a different item, clean that last one
            if(lastDragOp && this._dragOp && !this._dragOp.isSameItem(lastDragOp) && e.defaultPrevented) {
              lastDragOp.clean && lastDragOp.clean();
            }
          },
      
      
          _handleEndDrag: function(e) {
            var _this = this;
      
            this._didDragUpOrDown = false;
      
            if(!this._dragOp) {
              //ionic.views.ListView.__super__._handleEndDrag.call(this, e);
              return;
            }
      
            this._dragOp.end(e, function() {
              _this._initDrag();
            });
          },
      
          /**
           * Process the drag event to move the item to the left or right.
           */
          _handleDrag: function(e) {
            var _this = this, content, buttons;
      
            if(Math.abs(e.gesture.deltaY) > 5) {
              this._didDragUpOrDown = true;
            }
      
            // If we get a drag event, make sure we aren't in another drag, then check if we should
            // start one
            if(!this.isDragging && !this._dragOp) {
              this._startDrag(e);
            }
      
            // No drag still, pass it up
            if(!this._dragOp) {
              //ionic.views.ListView.__super__._handleDrag.call(this, e);
              return;
            }
      
            e.gesture.srcEvent.preventDefault();
            this._dragOp.drag(e);
          }
      
        });
      
      })(ionic);
      
      (function(ionic) {
      'use strict';
      
        ionic.views.Modal = ionic.views.View.inherit({
          initialize: function(opts) {
            opts = ionic.extend({
              focusFirstInput: false,
              unfocusOnHide: true,
              focusFirstDelay: 600,
              backdropClickToClose: true,
              hardwareBackButtonClose: true,
            }, opts);
      
            ionic.extend(this, opts);
      
            this.el = opts.el;
          },
          show: function() {
            var self = this;
      
            if(self.focusFirstInput) {
              // Let any animations run first
              window.setTimeout(function() {
                var input = self.el.querySelector('input, textarea');
                input && input.focus && input.focus();
              }, self.focusFirstDelay);
            }
          },
          hide: function() {
            // Unfocus all elements
            if(this.unfocusOnHide) {
              var inputs = this.el.querySelectorAll('input, textarea');
              // Let any animations run first
              window.setTimeout(function() {
                for(var i = 0; i < inputs.length; i++) {
                  inputs[i].blur && inputs[i].blur();
                }
              });
            }
          }
        });
      
      })(ionic);
      
      (function(ionic) {
      'use strict';
      
        /**
         * The side menu view handles one of the side menu's in a Side Menu Controller
         * configuration.
         * It takes a DOM reference to that side menu element.
         */
        ionic.views.SideMenu = ionic.views.View.inherit({
          initialize: function(opts) {
            this.el = opts.el;
            this.isEnabled = (typeof opts.isEnabled === 'undefined') ? true : opts.isEnabled;
            this.setWidth(opts.width);
          },
          getFullWidth: function() {
            return this.width;
          },
          setWidth: function(width) {
            this.width = width;
            this.el.style.width = width + 'px';
          },
          setIsEnabled: function(isEnabled) {
            this.isEnabled = isEnabled;
          },
          bringUp: function() {
            if(this.el.style.zIndex !== '0') {
              this.el.style.zIndex = '0';
            }
          },
          pushDown: function() {
            if(this.el.style.zIndex !== '-1') {
              this.el.style.zIndex = '-1';
            }
          }
        });
      
        ionic.views.SideMenuContent = ionic.views.View.inherit({
          initialize: function(opts) {
            ionic.extend(this, {
              animationClass: 'menu-animated',
              onDrag: function(e) {},
              onEndDrag: function(e) {}
            }, opts);
      
            ionic.onGesture('drag', ionic.proxy(this._onDrag, this), this.el);
            ionic.onGesture('release', ionic.proxy(this._onEndDrag, this), this.el);
          },
          _onDrag: function(e) {
            this.onDrag && this.onDrag(e);
          },
          _onEndDrag: function(e) {
            this.onEndDrag && this.onEndDrag(e);
          },
          disableAnimation: function() {
            this.el.classList.remove(this.animationClass);
          },
          enableAnimation: function() {
            this.el.classList.add(this.animationClass);
          },
          getTranslateX: function() {
            return parseFloat(this.el.style[ionic.CSS.TRANSFORM].replace('translate3d(', '').split(',')[0]);
          },
          setTranslateX: ionic.animationFrameThrottle(function(x) {
            this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + x + 'px, 0, 0)';
          })
        });
      
      })(ionic);
      
      /*
       * Adapted from Swipe.js 2.0
       *
       * Brad Birdsall
       * Copyright 2013, MIT License
       *
      */
      
      (function(ionic) {
      'use strict';
      
      ionic.views.Slider = ionic.views.View.inherit({
        initialize: function (options) {
          var slider = this;
      
          // utilities
          var noop = function() {}; // simple no operation function
          var offloadFn = function(fn) { setTimeout(fn || noop, 0); }; // offload a functions execution
      
          // check browser capabilities
          var browser = {
            addEventListener: !!window.addEventListener,
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: (function(temp) {
              var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
              for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
              return false;
            })(document.createElement('swipe'))
          };
      
      
          var container = options.el;
      
          // quit if no root element
          if (!container) return;
          var element = container.children[0];
          var slides, slidePos, width, length;
          options = options || {};
          var index = parseInt(options.startSlide, 10) || 0;
          var speed = options.speed || 300;
          options.continuous = options.continuous !== undefined ? options.continuous : true;
      
          function setup() {
      
            // cache slides
            slides = element.children;
            length = slides.length;
      
            // set continuous to false if only one slide
            if (slides.length < 2) options.continuous = false;
      
            //special case if two slides
            if (browser.transitions && options.continuous && slides.length < 3) {
              element.appendChild(slides[0].cloneNode(true));
              element.appendChild(element.children[1].cloneNode(true));
              slides = element.children;
            }
      
            // create an array to store current positions of each slide
            slidePos = new Array(slides.length);
      
            // determine width of each slide
            width = container.offsetWidth || container.getBoundingClientRect().width;
      
            element.style.width = (slides.length * width) + 'px';
      
            // stack elements
            var pos = slides.length;
            while(pos--) {
      
              var slide = slides[pos];
      
              slide.style.width = width + 'px';
              slide.setAttribute('data-index', pos);
      
              if (browser.transitions) {
                slide.style.left = (pos * -width) + 'px';
                move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
              }
      
            }
      
            // reposition elements before and after index
            if (options.continuous && browser.transitions) {
              move(circle(index-1), -width, 0);
              move(circle(index+1), width, 0);
            }
      
            if (!browser.transitions) element.style.left = (index * -width) + 'px';
      
            container.style.visibility = 'visible';
      
            options.slidesChanged && options.slidesChanged();
          }
      
          function prev() {
      
            if (options.continuous) slide(index-1);
            else if (index) slide(index-1);
      
          }
      
          function next() {
      
            if (options.continuous) slide(index+1);
            else if (index < slides.length - 1) slide(index+1);
      
          }
      
          function circle(index) {
      
            // a simple positive modulo using slides.length
            return (slides.length + (index % slides.length)) % slides.length;
      
          }
      
          function slide(to, slideSpeed) {
      
            // do nothing if already on requested slide
            if (index == to) return;
      
            if (browser.transitions) {
      
              var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward
      
              // get the actual position of the slide
              if (options.continuous) {
                var natural_direction = direction;
                direction = -slidePos[circle(to)] / width;
      
                // if going forward but to < index, use to = slides.length + to
                // if going backward but to > index, use to = -slides.length + to
                if (direction !== natural_direction) to =  -direction * slides.length + to;
      
              }
      
              var diff = Math.abs(index-to) - 1;
      
              // move all the slides between index and to in the right direction
              while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
      
              to = circle(to);
      
              move(index, width * direction, slideSpeed || speed);
              move(to, 0, slideSpeed || speed);
      
              if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
      
            } else {
      
              to = circle(to);
              animate(index * -width, to * -width, slideSpeed || speed);
              //no fallback for a circular continuous if the browser does not accept transitions
            }
      
            index = to;
            offloadFn(options.callback && options.callback(index, slides[index]));
          }
      
          function move(index, dist, speed) {
      
            translate(index, dist, speed);
            slidePos[index] = dist;
      
          }
      
          function translate(index, dist, speed) {
      
            var slide = slides[index];
            var style = slide && slide.style;
      
            if (!style) return;
      
            style.webkitTransitionDuration =
            style.MozTransitionDuration =
            style.msTransitionDuration =
            style.OTransitionDuration =
            style.transitionDuration = speed + 'ms';
      
            style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
            style.msTransform =
            style.MozTransform =
            style.OTransform = 'translateX(' + dist + 'px)';
      
          }
      
          function animate(from, to, speed) {
      
            // if not an animation, just reposition
            if (!speed) {
      
              element.style.left = to + 'px';
              return;
      
            }
      
            var start = +new Date();
      
            var timer = setInterval(function() {
      
              var timeElap = +new Date() - start;
      
              if (timeElap > speed) {
      
                element.style.left = to + 'px';
      
                if (delay) begin();
      
                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
      
                clearInterval(timer);
                return;
      
              }
      
              element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';
      
            }, 4);
      
          }
      
          // setup auto slideshow
          var delay = options.auto || 0;
          var interval;
      
          function begin() {
      
            interval = setTimeout(next, delay);
      
          }
      
          function stop() {
      
            delay = options.auto || 0;
            clearTimeout(interval);
      
          }
      
      
          // setup initial vars
          var start = {};
          var delta = {};
          var isScrolling;
      
          // setup event capturing
          var events = {
      
            handleEvent: function(event) {
              if(event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove') {
                event.touches = [{
                  pageX: event.pageX,
                  pageY: event.pageY
                }];
              }
      
              switch (event.type) {
                case 'mousedown': this.start(event); break;
                case 'touchstart': this.start(event); break;
                case 'touchmove': this.touchmove(event); break;
                case 'mousemove': this.touchmove(event); break;
                case 'touchend': offloadFn(this.end(event)); break;
                case 'mouseup': offloadFn(this.end(event)); break;
                case 'webkitTransitionEnd':
                case 'msTransitionEnd':
                case 'oTransitionEnd':
                case 'otransitionend':
                case 'transitionend': offloadFn(this.transitionEnd(event)); break;
                case 'resize': offloadFn(setup); break;
              }
      
              if (options.stopPropagation) event.stopPropagation();
      
            },
            start: function(event) {
      
              var touches = event.touches[0];
      
              // measure start values
              start = {
      
                // get initial touch coords
                x: touches.pageX,
                y: touches.pageY,
      
                // store time to determine touch duration
                time: +new Date()
      
              };
      
              // used for testing first move event
              isScrolling = undefined;
      
              // reset delta and end measurements
              delta = {};
      
              // attach touchmove and touchend listeners
              if(browser.touch) {
                element.addEventListener('touchmove', this, false);
                element.addEventListener('touchend', this, false);
              } else {
                element.addEventListener('mousemove', this, false);
                element.addEventListener('mouseup', this, false);
                document.addEventListener('mouseup', this, false);
              }
            },
            touchmove: function(event) {
      
              // ensure swiping with one touch and not pinching
              // ensure sliding is enabled
              if (event.touches.length > 1 ||
                  event.scale && event.scale !== 1 ||
                  slider.slideIsDisabled) {
                return;
              }
      
              if (options.disableScroll) event.preventDefault();
      
              var touches = event.touches[0];
      
              // measure change in x and y
              delta = {
                x: touches.pageX - start.x,
                y: touches.pageY - start.y
              };
      
              // determine if scrolling test has run - one time test
              if ( typeof isScrolling == 'undefined') {
                isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
              }
      
              // if user is not trying to scroll vertically
              if (!isScrolling) {
      
                // prevent native scrolling
                event.preventDefault();
      
                // stop slideshow
                stop();
      
                // increase resistance if first or last slide
                if (options.continuous) { // we don't add resistance at the end
      
                  translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
                  translate(index, delta.x + slidePos[index], 0);
                  translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);
      
                } else {
      
                  delta.x =
                    delta.x /
                      ( (!index && delta.x > 0 ||         // if first slide and sliding left
                        index == slides.length - 1 &&     // or if last slide and sliding right
                        delta.x < 0                       // and if sliding at all
                      ) ?
                      ( Math.abs(delta.x) / width + 1 )      // determine resistance level
                      : 1 );                                 // no resistance if false
      
                  // translate 1:1
                  translate(index-1, delta.x + slidePos[index-1], 0);
                  translate(index, delta.x + slidePos[index], 0);
                  translate(index+1, delta.x + slidePos[index+1], 0);
                }
      
              }
      
            },
            end: function(event) {
      
              // measure duration
              var duration = +new Date() - start.time;
      
              // determine if slide attempt triggers next/prev slide
              var isValidSlide =
                    Number(duration) < 250 &&         // if slide duration is less than 250ms
                    Math.abs(delta.x) > 20 ||         // and if slide amt is greater than 20px
                    Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width
      
              // determine if slide attempt is past start and end
              var isPastBounds = (!index && delta.x > 0) ||      // if first slide and slide amt is greater than 0
                    (index == slides.length - 1 && delta.x < 0); // or if last slide and slide amt is less than 0
      
              if (options.continuous) isPastBounds = false;
      
              // determine direction of swipe (true:right, false:left)
              var direction = delta.x < 0;
      
              // if not scrolling vertically
              if (!isScrolling) {
      
                if (isValidSlide && !isPastBounds) {
      
                  if (direction) {
      
                    if (options.continuous) { // we need to get the next in this direction in place
      
                      move(circle(index-1), -width, 0);
                      move(circle(index+2), width, 0);
      
                    } else {
                      move(index-1, -width, 0);
                    }
      
                    move(index, slidePos[index]-width, speed);
                    move(circle(index+1), slidePos[circle(index+1)]-width, speed);
                    index = circle(index+1);
      
                  } else {
                    if (options.continuous) { // we need to get the next in this direction in place
      
                      move(circle(index+1), width, 0);
                      move(circle(index-2), -width, 0);
      
                    } else {
                      move(index+1, width, 0);
                    }
      
                    move(index, slidePos[index]+width, speed);
                    move(circle(index-1), slidePos[circle(index-1)]+width, speed);
                    index = circle(index-1);
      
                  }
      
                  options.callback && options.callback(index, slides[index]);
      
                } else {
      
                  if (options.continuous) {
      
                    move(circle(index-1), -width, speed);
                    move(index, 0, speed);
                    move(circle(index+1), width, speed);
      
                  } else {
      
                    move(index-1, -width, speed);
                    move(index, 0, speed);
                    move(index+1, width, speed);
                  }
      
                }
      
              }
      
              // kill touchmove and touchend event listeners until touchstart called again
              if(browser.touch) {
                element.removeEventListener('touchmove', events, false);
                element.removeEventListener('touchend', events, false);
              } else {
                element.removeEventListener('mousemove', events, false);
                element.removeEventListener('mouseup', events, false);
                document.removeEventListener('mouseup', events, false);
              }
      
            },
            transitionEnd: function(event) {
      
              if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
      
                if (delay) begin();
      
                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
      
              }
      
            }
      
          };
      
          // Public API
          this.update = function() {
            setTimeout(setup);
          };
          this.setup = function() {
            setup();
          };
      
          this.enableSlide = function(shouldEnable) {
            if (arguments.length) {
              this.slideIsDisabled = !shouldEnable;
            }
            return !this.slideIsDisabled;
          },
          this.slide = function(to, speed) {
            // cancel slideshow
            stop();
      
            slide(to, speed);
          };
      
          this.prev = this.previous = function() {
            // cancel slideshow
            stop();
      
            prev();
          };
      
          this.next = function() {
            // cancel slideshow
            stop();
      
            next();
          };
      
          this.stop = function() {
            // cancel slideshow
            stop();
          };
      
          this.start = function() {
            begin();
          };
      
          this.currentIndex = function() {
            // return current index position
            return index;
          };
      
          this.slidesCount = function() {
            // return total number of slides
            return length;
          };
      
          this.kill = function() {
            // cancel slideshow
            stop();
      
            // reset element
            element.style.width = '';
            element.style.left = '';
      
            // reset slides
            var pos = slides.length;
            while(pos--) {
      
              var slide = slides[pos];
              slide.style.width = '';
              slide.style.left = '';
      
              if (browser.transitions) translate(pos, 0, 0);
      
            }
      
            // removed event listeners
            if (browser.addEventListener) {
      
              // remove current event listeners
              element.removeEventListener('touchstart', events, false);
              element.removeEventListener('webkitTransitionEnd', events, false);
              element.removeEventListener('msTransitionEnd', events, false);
              element.removeEventListener('oTransitionEnd', events, false);
              element.removeEventListener('otransitionend', events, false);
              element.removeEventListener('transitionend', events, false);
              window.removeEventListener('resize', events, false);
      
            }
            else {
      
              window.onresize = null;
      
            }
          };
      
          this.load = function() {
            // trigger setup
            setup();
      
            // start auto slideshow if applicable
            if (delay) begin();
      
      
            // add event listeners
            if (browser.addEventListener) {
      
              // set touchstart event on element
              if (browser.touch) {
                element.addEventListener('touchstart', events, false);
              } else {
                element.addEventListener('mousedown', events, false);
              }
      
              if (browser.transitions) {
                element.addEventListener('webkitTransitionEnd', events, false);
                element.addEventListener('msTransitionEnd', events, false);
                element.addEventListener('oTransitionEnd', events, false);
                element.addEventListener('otransitionend', events, false);
                element.addEventListener('transitionend', events, false);
              }
      
              // set resize event on window
              window.addEventListener('resize', events, false);
      
            } else {
      
              window.onresize = function () { setup(); }; // to play nice with old IE
      
            }
          };
      
        }
      });
      
      })(ionic);
      
      (function(ionic) {
      'use strict';
      
        ionic.views.Toggle = ionic.views.View.inherit({
          initialize: function(opts) {
            var self = this;
      
            this.el = opts.el;
            this.checkbox = opts.checkbox;
            this.track = opts.track;
            this.handle = opts.handle;
            this.openPercent = -1;
            this.onChange = opts.onChange || function() {};
      
            this.triggerThreshold = opts.triggerThreshold || 20;
      
            this.dragStartHandler = function(e) {
              self.dragStart(e);
            };
            this.dragHandler = function(e) {
              self.drag(e);
            };
            this.holdHandler = function(e) {
              self.hold(e);
            };
            this.releaseHandler = function(e) {
              self.release(e);
            };
      
            this.dragStartGesture = ionic.onGesture('dragstart', this.dragStartHandler, this.el);
            this.dragGesture = ionic.onGesture('drag', this.dragHandler, this.el);
            this.dragHoldGesture = ionic.onGesture('hold', this.holdHandler, this.el);
            this.dragReleaseGesture = ionic.onGesture('release', this.releaseHandler, this.el);
          },
      
          destroy: function() {
            ionic.offGesture(this.dragStartGesture, 'dragstart', this.dragStartGesture);
            ionic.offGesture(this.dragGesture, 'drag', this.dragGesture);
            ionic.offGesture(this.dragHoldGesture, 'hold', this.holdHandler);
            ionic.offGesture(this.dragReleaseGesture, 'release', this.releaseHandler);
          },
      
          tap: function(e) {
            if(this.el.getAttribute('disabled') !== 'disabled') {
              this.val( !this.checkbox.checked );
            }
          },
      
          dragStart: function(e) {
            if(this.checkbox.disabled) return;
      
            this._dragInfo = {
              width: this.el.offsetWidth,
              left: this.el.offsetLeft,
              right: this.el.offsetLeft + this.el.offsetWidth,
              triggerX: this.el.offsetWidth / 2,
              initialState: this.checkbox.checked
            };
      
            // Stop any parent dragging
            e.gesture.srcEvent.preventDefault();
      
            // Trigger hold styles
            this.hold(e);
          },
      
          drag: function(e) {
            var self = this;
            if(!this._dragInfo) { return; }
      
            // Stop any parent dragging
            e.gesture.srcEvent.preventDefault();
      
            ionic.requestAnimationFrame(function(amount) {
              if (!self._dragInfo) { return; }
      
              var slidePageLeft = self.track.offsetLeft + (self.handle.offsetWidth / 2);
              var slidePageRight = self.track.offsetLeft + self.track.offsetWidth - (self.handle.offsetWidth / 2);
              var dx = e.gesture.deltaX;
      
              var px = e.gesture.touches[0].pageX - self._dragInfo.left;
              var mx = self._dragInfo.width - self.triggerThreshold;
      
              // The initial state was on, so "tend towards" on
              if(self._dragInfo.initialState) {
                if(px < self.triggerThreshold) {
                  self.setOpenPercent(0);
                } else if(px > self._dragInfo.triggerX) {
                  self.setOpenPercent(100);
                }
              } else {
                // The initial state was off, so "tend towards" off
                if(px < self._dragInfo.triggerX) {
                  self.setOpenPercent(0);
                } else if(px > mx) {
                  self.setOpenPercent(100);
                }
              }
            });
          },
      
          endDrag: function(e) {
            this._dragInfo = null;
          },
      
          hold: function(e) {
            this.el.classList.add('dragging');
          },
          release: function(e) {
            this.el.classList.remove('dragging');
            this.endDrag(e);
          },
      
      
          setOpenPercent: function(openPercent) {
            // only make a change if the new open percent has changed
            if(this.openPercent < 0 || (openPercent < (this.openPercent - 3) || openPercent > (this.openPercent + 3) ) ) {
              this.openPercent = openPercent;
      
              if(openPercent === 0) {
                this.val(false);
              } else if(openPercent === 100) {
                this.val(true);
              } else {
                var openPixel = Math.round( (openPercent / 100) * this.track.offsetWidth - (this.handle.offsetWidth) );
                openPixel = (openPixel < 1 ? 0 : openPixel);
                this.handle.style[ionic.CSS.TRANSFORM] = 'translate3d(' + openPixel + 'px,0,0)';
              }
            }
          },
      
          val: function(value) {
            if(value === true || value === false) {
              if(this.handle.style[ionic.CSS.TRANSFORM] !== "") {
                this.handle.style[ionic.CSS.TRANSFORM] = "";
              }
              this.checkbox.checked = value;
              this.openPercent = (value ? 100 : 0);
              this.onChange && this.onChange();
            }
            return this.checkbox.checked;
          }
      
        });
      
      })(ionic);
      
      })();
  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("github:angular/bower-angular@1.3.3/angular.min", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {  /* */ 
      "format global";
      "exports angular";
      /*
       AngularJS v1.3.3
       (c) 2010-2014 Google, Inc. http://angularjs.org
       License: MIT
      */
      (function(T,U,t){'use strict';function v(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.3/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Ra(b){if(null==b||Sa(b))return!1;var a=b.length;return b.nodeType===
      la&&a?!0:I(b)||G(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d,e;if(b)if(u(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(G(b)||Ra(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==r)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Cd(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
      b[d[e]],d[e]);return d}function kc(b){return function(a,c){b(c,a)}}function Dd(){return++kb}function lc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function H(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var k=f[g];b[k]=e[k]}}lc(b,a);return b}function aa(b){return parseInt(b,10)}function mc(b,a){return H(new (H(function(){},{prototype:b})),a)}function w(){}function ma(b){return b}function ba(b){return function(){return b}}
      function D(b){return"undefined"===typeof b}function A(b){return"undefined"!==typeof b}function L(b){return null!==b&&"object"===typeof b}function I(b){return"string"===typeof b}function W(b){return"number"===typeof b}function ea(b){return"[object Date]"===Ja.call(b)}function u(b){return"function"===typeof b}function lb(b){return"[object RegExp]"===Ja.call(b)}function Sa(b){return b&&b.window===b}function Ta(b){return b&&b.$evalAsync&&b.$watch}function Ua(b){return"boolean"===typeof b}function nc(b){return!(!b||
      !(b.nodeName||b.prop&&b.attr&&b.find))}function Ed(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function sa(b){return Q(b.nodeName||b[0].nodeName)}function Va(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Ca(b,a,c,d){if(Sa(b)||Ta(b))throw Wa("cpws");if(a){if(b===a)throw Wa("cpi");c=c||[];d=d||[];if(L(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(G(b))for(var f=a.length=0;f<b.length;f++)e=Ca(b[f],null,c,d),L(b[f])&&(c.push(b[f]),
      d.push(e)),a.push(e);else{var g=a.$$hashKey;G(a)?a.length=0:r(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Ca(b[f],null,c,d),L(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);lc(a,g)}}else if(a=b)G(b)?a=Ca(b,[],c,d):ea(b)?a=new Date(b.getTime()):lb(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):L(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Ca(b,e,c,d));return a}function ta(b,a){if(G(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(L(b))for(c in a=
      a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function na(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(G(b)){if(!G(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!na(b[d],a[d]))return!1;return!0}}else{if(ea(b))return ea(a)?na(b.getTime(),a.getTime()):!1;if(lb(b)&&lb(a))return b.toString()==a.toString();if(Ta(b)||Ta(a)||Sa(b)||Sa(a)||G(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&
      !u(b[d])){if(!na(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==t&&!u(a[d]))return!1;return!0}return!1}function Xa(b,a,c){return b.concat(Ya.call(a,c))}function oc(b,a){var c=2<arguments.length?Ya.call(arguments,2):[];return!u(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Xa(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Fd(b,a){var c=a;"string"===typeof b&&"$"===
      b.charAt(0)&&"$"===b.charAt(1)?c=t:Sa(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":Ta(a)&&(c="$SCOPE");return c}function Za(b,a){return"undefined"===typeof b?t:JSON.stringify(b,Fd,a?"  ":null)}function pc(b){return I(b)?JSON.parse(b):b}function ua(b){b=y(b).clone();try{b.empty()}catch(a){}var c=y("<div>").append(b).html();try{return b[0].nodeType===mb?Q(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+Q(b)})}catch(d){return Q(c)}}function qc(b){try{return decodeURIComponent(b)}catch(a){}}
      function rc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=qc(c[0]),A(d)&&(b=A(c[1])?qc(c[1]):!0,Jb.call(a,d)?G(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Kb(b){var a=[];r(b,function(b,d){G(b)?r(b,function(b){a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))}):a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))});return a.length?a.join("&"):""}function nb(b){return Da(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Da(b,a){return encodeURIComponent(b).replace(/%40/gi,
      "@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Gd(b,a){var c,d,e=ob.length;b=y(b);for(d=0;d<e;++d)if(c=ob[d]+a,I(c=b.attr(c)))return c;return null}function Hd(b,a){var c,d,e={};r(ob,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});r(ob,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Gd(c,"strict-di"),
      a(c,d?[d]:[],e))}function sc(b,a,c){L(c)||(c={});c=H({strictDi:!1},c);var d=function(){b=y(b);if(b.injector()){var d=b[0]===U?"document":ua(b);throw Wa("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=Lb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",
      d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;T&&e.test(T.name)&&(c.debugInfoEnabled=!0,T.name=T.name.replace(e,""));if(T&&!f.test(T.name))return d();T.name=T.name.replace(f,"");va.resumeBootstrap=function(b){r(b,function(b){a.push(b)});d()}}function Id(){T.name="NG_ENABLE_DEBUG_INFO!"+T.name;T.location.reload()}function Jd(b){return va.element(b).injector().get("$$testability")}function Mb(b,a){a=a||"_";return b.replace(Kd,function(b,d){return(d?a:"")+b.toLowerCase()})}
      function Ld(){var b;tc||((oa=T.jQuery)&&oa.fn.on?(y=oa,H(oa.fn,{scope:Ka.scope,isolateScope:Ka.isolateScope,controller:Ka.controller,injector:Ka.injector,inheritedData:Ka.inheritedData}),b=oa.cleanData,oa.cleanData=function(a){var c;if(Nb)Nb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=oa._data(e,"events"))&&c.$destroy&&oa(e).triggerHandler("$destroy");b(a)}):y=R,va.element=y,tc=!0)}function Ob(b,a,c){if(!b)throw Wa("areq",a||"?",c||"required");return b}function pb(b,a,c){c&&G(b)&&(b=b[b.length-1]);
      Ob(u(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function La(b,a){if("hasOwnProperty"===b)throw Wa("badname",a);}function uc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&u(b)?oc(e,b):b}function qb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return y(c)}function pa(){return Object.create(null)}function Md(b){function a(a,b,c){return a[b]||
      (a[b]=c())}var c=v("$injector"),d=v("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||v;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return n}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),n={_invokeQueue:b,_configBlocks:d,_runBlocks:e,requires:g,name:f,provider:a("$provide",
      "provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return n})}})}function Nd(b){H(b,{bootstrap:sc,copy:Ca,extend:H,equals:na,element:y,forEach:r,injector:Lb,noop:w,bind:oc,toJson:Za,
      fromJson:pc,identity:ma,isUndefined:D,isDefined:A,isString:I,isFunction:u,isObject:L,isNumber:W,isElement:nc,isArray:G,version:Od,isDate:ea,lowercase:Q,uppercase:rb,callbacks:{counter:0},getTestability:Jd,$$minErr:v,$$csp:$a,reloadWithDebugInfo:Id});ab=Md(T);try{ab("ngLocale")}catch(a){ab("ngLocale",[]).provider("$locale",Pd)}ab("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Qd});a.provider("$compile",vc).directive({a:Rd,input:wc,textarea:wc,form:Sd,script:Td,select:Ud,style:Vd,
      option:Wd,ngBind:Xd,ngBindHtml:Yd,ngBindTemplate:Zd,ngClass:$d,ngClassEven:ae,ngClassOdd:be,ngCloak:ce,ngController:de,ngForm:ee,ngHide:fe,ngIf:ge,ngInclude:he,ngInit:ie,ngNonBindable:je,ngPluralize:ke,ngRepeat:le,ngShow:me,ngStyle:ne,ngSwitch:oe,ngSwitchWhen:pe,ngSwitchDefault:qe,ngOptions:re,ngTransclude:se,ngModel:te,ngList:ue,ngChange:ve,pattern:xc,ngPattern:xc,required:yc,ngRequired:yc,minlength:zc,ngMinlength:zc,maxlength:Ac,ngMaxlength:Ac,ngValue:we,ngModelOptions:xe}).directive({ngInclude:ye}).directive(sb).directive(Bc);
      a.provider({$anchorScroll:ze,$animate:Ae,$browser:Be,$cacheFactory:Ce,$controller:De,$document:Ee,$exceptionHandler:Fe,$filter:Cc,$interpolate:Ge,$interval:He,$http:Ie,$httpBackend:Je,$location:Ke,$log:Le,$parse:Me,$rootScope:Ne,$q:Oe,$$q:Pe,$sce:Qe,$sceDelegate:Re,$sniffer:Se,$templateCache:Te,$templateRequest:Ue,$$testability:Ve,$timeout:We,$window:Xe,$$rAF:Ye,$$asyncCallback:Ze})}])}function bb(b){return b.replace($e,function(a,b,d,e){return e?d.toUpperCase():d}).replace(af,"Moz$1")}function Dc(b){b=
      b.nodeType;return b===la||!b||9===b}function Ec(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Pb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(bf.exec(b)||["",""])[1].toLowerCase();d=ha[d]||ha._default;c.innerHTML=d[1]+b.replace(cf,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Xa(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});return e}function R(b){if(b instanceof R)return b;var a;
      I(b)&&(b=P(b),a=!0);if(!(this instanceof R)){if(a&&"<"!=b.charAt(0))throw Qb("nosel");return new R(b)}if(a){a=U;var c;b=(c=df.exec(b))?[a.createElement(c[1])]:(c=Ec(b,a))?c.childNodes:[]}Fc(this,b)}function Rb(b){return b.cloneNode(!0)}function tb(b,a){a||ub(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)ub(c[d])}function Gc(b,a,c,d){if(A(d))throw Qb("offargs");var e=(d=vb(b))&&d.events,f=d&&d.handle;if(f)if(a)r(a.split(" "),function(a){if(A(c)){var d=e[a];Va(d||
      [],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function ub(b,a){var c=b.ng339,d=c&&wb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Gc(b)),delete wb[c],b.ng339=t))}function vb(b,a){var c=b.ng339,c=c&&wb[c];a&&!c&&(b.ng339=c=++ef,c=wb[c]={events:{},data:{},handle:t});return c}function Sb(b,a,c){if(Dc(b)){var d=A(c),e=!d&&a&&!L(a),f=!a;b=(b=vb(b,!e))&&b.data;if(d)b[a]=
      c;else{if(f)return b;if(e)return b&&b[a];H(b,a)}}}function Tb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Ub(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",P((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+P(a)+" "," ")))})}function Vb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");r(a.split(" "),function(a){a=P(a);-1===
      c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",P(c))}}function Fc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Hc(b,a){return xb(b,"$"+(a||"ngController")+"Controller")}function xb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=G(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=y.data(b,a[d]))!==t)return c;b=b.parentNode||11===b.nodeType&&b.host}}function Ic(b){for(tb(b,
      !0);b.firstChild;)b.removeChild(b.firstChild)}function Jc(b,a){a||tb(b);var c=b.parentNode;c&&c.removeChild(b)}function ff(b,a){a=a||T;if("complete"===a.document.readyState)a.setTimeout(b);else y(a).on("load",b)}function Kc(b,a){var c=yb[a.toLowerCase()];return c&&Lc[sa(b)]&&c}function gf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Mc[a]}function hf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:0;if(g){if(D(c.immediatePropagationStopped)){var h=
      c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=ta(f));for(var k=0;k<g;k++)c.isImmediatePropagationStopped()||f[k].call(b,c)}};c.elem=b;return c}function Ma(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=
      c+":"+(a||Dd)():c+":"+b}function cb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function jf(b){return(b=b.toString().replace(Nc,"").match(Oc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Wb(b,a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw I(c)&&c||(c=b.name||jf(b)),Ea("strictdi",c);a=b.toString().replace(Nc,"");a=a.match(Oc);r(a[1].split(kf),function(a){a.replace(lf,function(a,b,c){d.push(c)})})}b.$inject=d}}else G(b)?
      (a=b.length-1,pb(b[a],"fn"),d=b.slice(0,a)):pb(b,"fn",!0);return d}function Lb(b,a){function c(a){return function(b,c){if(L(b))r(b,kc(a));else return a(b,c)}}function d(a,b){La(a,"service");if(u(b)||G(b))b=q.instantiate(b);if(!b.$get)throw Ea("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=s.invoke(b,this,t,a);if(D(c))throw Ea("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=
      a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{I(a)?(c=ab(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):u(a)?b.push(q.invoke(a)):G(a)?b.push(q.invoke(a)):pb(a,"module")}catch(e){throw G(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ea("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a){if(b.hasOwnProperty(a)){if(b[a]===k)throw Ea("cdep",
      a+" <- "+l.join(" <- "));return b[a]}try{return l.unshift(a),b[a]=k,b[a]=c(a)}catch(e){throw b[a]===k&&delete b[a],e;}finally{l.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var k=[];g=Wb(b,a,g);var h,l,n;l=0;for(h=g.length;l<h;l++){n=g[l];if("string"!==typeof n)throw Ea("itkn",n);k.push(f&&f.hasOwnProperty(n)?f[n]:d(n))}G(b)&&(b=b[h]);return b.apply(c,k)}return{invoke:e,instantiate:function(a,b,c){var d=function(){};d.prototype=(G(a)?a[a.length-1]:a).prototype;d=new d;a=e(a,d,b,
      c);return L(a)||u(a)?a:d},get:d,annotate:Wb,has:function(a){return p.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var k={},l=[],m=new cb([],!0),p={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,ba(b),!1)}),constant:c(function(a,b){La(a,"constant");p[a]=b;n[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,
      null,{$delegate:a})}}}},q=p.$injector=h(p,function(){throw Ea("unpr",l.join(" <- "));}),n={},s=n.$injector=h(n,function(a){var b=q.get(a+"Provider");return s.invoke(b.$get,b,t,a)});r(g(b),function(a){s.invoke(a||w)});return s}function ze(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===sa(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;
      c=g.yOffset;u(c)?c=c():nc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):W(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||ff(function(){d.$evalAsync(g)})});return g}]}function Ze(){this.$get=["$$rAF","$timeout",
      function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function mf(b,a,c,d){function e(a){try{a.apply(null,Ya.call(arguments,1))}finally{if(x--,0===x)for(;B.length;)try{B.pop()()}catch(b){c.error(b)}}}function f(a,b){(function ya(){r(J,function(a){a()});z=b(ya,a)})()}function g(){h();k()}function h(){F=b.history.state;F=D(F)?null:F;na(F,S)&&(F=S);S=F}function k(){if(C!==m.url()||N!==F)C=m.url(),N=F,r(V,function(a){a(m.url(),F)})}function l(a){try{return decodeURIComponent(a)}catch(b){return a}}
      var m=this,p=a[0],q=b.location,n=b.history,s=b.setTimeout,O=b.clearTimeout,E={};m.isMock=!1;var x=0,B=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){x++};m.notifyWhenNoOutstandingRequests=function(a){r(J,function(a){a()});0===x?a():B.push(a)};var J=[],z;m.addPollFn=function(a){D(z)&&f(100,s);J.push(a);return a};var F,N,C=q.href,ca=a.find("base"),M=null;h();N=F;m.url=function(a,c,e){D(e)&&(e=null);q!==b.location&&(q=b.location);n!==b.history&&(n=b.history);if(a){var f=
      N===e;if(C!==a||d.history&&!f){var g=C&&Fa(C)===Fa(a);C=a;N=e;!d.history||g&&f?(g||(M=a),c?q.replace(a):q.href=a):(n[c?"replaceState":"pushState"](e,"",a),h(),N=F);return m}}else return M||q.href.replace(/%27/g,"'")};m.state=function(){return F};var V=[],X=!1,S=null;m.onUrlChange=function(a){if(!X){if(d.history)y(b).on("popstate",g);y(b).on("hashchange",g);X=!0}V.push(a);return a};m.$$checkUrlChange=k;m.baseHref=function(){var a=ca.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};
      var da={},A="",fa=m.baseHref();m.cookies=function(a,b){var d,e,f,g;if(a)b===t?p.cookie=encodeURIComponent(a)+"=;path="+fa+";expires=Thu, 01 Jan 1970 00:00:00 GMT":I(b)&&(d=(p.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+fa).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(p.cookie!==A)for(A=p.cookie,d=A.split("; "),da={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=l(e.substring(0,g)),da[a]===
      t&&(da[a]=l(e.substring(g+1))));return da}};m.defer=function(a,b){var c;x++;c=s(function(){delete E[c];e(a)},b||0);E[c]=!0;return c};m.defer.cancel=function(a){return E[a]?(delete E[a],O(a),e(w),!0):!1}}function Be(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new mf(b,d,a,c)}]}function Ce(){this.$get=function(){function b(b,d){function e(a){a!=p&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw v("$cacheFactory")("iid",
      b);var g=0,h=H({},d,{id:b}),k={},l=d&&d.capacity||Number.MAX_VALUE,m={},p=null,q=null;return a[b]={put:function(a,b){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!D(b))return a in k||g++,k[a]=b,g>l&&this.remove(q.key),b},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==p&&(p=b.p);b==q&&(q=b.n);f(b.n,b.p);delete m[a]}delete k[a];g--},removeAll:function(){k={};g=0;m={};p=q=null},destroy:function(){m=
      h=k=null;delete a[b]},info:function(){return H({},h,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Te(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function vc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};r(a,function(a,e){var f=a.match(c);if(!f)throw ia("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d=
      {},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Ed("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,k=/^(on[a-z]+|formaction)$/;this.directive=function p(a,e){La(a,"directive");I(a)?(Ob(e,"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];r(d[a],function(d,g){try{var h=b.invoke(d);u(h)?h={compile:ba(h)}:!h.compile&&h.link&&(h.compile=ba(h.link));h.priority=h.priority||0;h.index=
      g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";L(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(k){e(k)}});return f}])),d[a].push(e)):r(a,kc(p));return this};this.aHrefSanitizationWhitelist=function(b){return A(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return A(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var l=!0;this.debugInfoEnabled=
      function(a){return A(a)?(l=a,this):l};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,s,O,E,x,B,J,z,F){function N(a,b){try{a.addClass(b)}catch(c){}}function C(a,b,c,d,e){a instanceof y||(a=y(a));r(a,function(b,c){b.nodeType==mb&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var f=ca(a,b,a,c,d,e);C.$$addScopeClass(a);var g=null;return function(b,
      c,d){Ob(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==sa(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?y(T(g,y("<div>").append(a).html())):c?Ka.clone.call(a):a;if(h)for(var k in h)d.data("$"+k+"Controller",h[k].instance);C.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function ca(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,q,s,p,B;if(n)for(B=
      Array(c.length),q=0;q<h.length;q+=3)f=h[q],B[f]=c[f];else B=c;q=0;for(s=h.length;q<s;)k=B[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(l=a.$new(),C.$$addScopeInfo(y(k),l)):l=a,p=c.transcludeOnThisElement?M(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?M(a,b):null,c(f,l,k,d,p)):f&&f(a,k.childNodes,t,e)}for(var h=[],k,l,q,s,n,p=0;p<a.length;p++){k=new W;l=V(a[p],[],k,0===p?d:t,e);(f=l.length?A(l,a[p],k,b,c,null,[],[],f):null)&&f.scope&&C.$$addScopeClass(k.$$element);
      k=f&&f.terminal||!(q=a[p].childNodes)||!q.length?null:ca(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(p,f,k),s=!0,n=n||f;f=null}return s?g:null}function M(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function V(b,c,g,h,k){var l=g.$attr,q;switch(b.nodeType){case la:fa(c,wa(sa(b)),"E",h,k);for(var s,n,B,O=b.attributes,E=0,J=O&&O.length;E<
      J;E++){var F=!1,x=!1;s=O[E];q=s.name;s=P(s.value);n=wa(q);if(B=za.test(n))q=Mb(n.substr(6),"-");var N=n.replace(/(Start|End)$/,""),C;a:{var z=N;if(d.hasOwnProperty(z)){C=void 0;for(var z=a.get(z+"Directive"),V=0,r=z.length;V<r;V++)if(C=z[V],C.multiElement){C=!0;break a}}C=!1}C&&n===N+"Start"&&(F=q,x=q.substr(0,q.length-5)+"end",q=q.substr(0,q.length-6));n=wa(q.toLowerCase());l[n]=q;if(B||!g.hasOwnProperty(n))g[n]=s,Kc(b,n)&&(g[n]=!0);R(b,c,s,n,B);fa(c,n,"A",h,k,F,x)}b=b.className;if(I(b)&&""!==b)for(;q=
      f.exec(b);)n=wa(q[2]),fa(c,n,"C",h,k)&&(g[n]=P(q[3])),b=b.substr(q.index+q[0].length);break;case mb:Y(c,b.nodeValue);break;case 8:try{if(q=e.exec(b.nodeValue))n=wa(q[1]),fa(c,n,"M",h,k)&&(g[n]=P(q[2]))}catch(ca){}}c.sort(v);return c}function X(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);a.nodeType==la&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function S(a,b,c){return function(d,
      e,f,g,h){e=X(e[0],b,c);return a(d,e,f,g,h)}}function A(a,d,e,f,g,k,l,s,p){function B(a,b,c,d){if(a){c&&(a=S(a,c,d));a.require=K.require;a.directiveName=ga;if(M===K||K.$$isolateScope)a=Z(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=S(b,c,d));b.require=K.require;b.directiveName=ga;if(M===K||K.$$isolateScope)b=Z(b,{isolateScope:!0});s.push(b)}}function J(a,b,c,d){var e,f="data",g=!1,k=c,l;if(I(b)){l=b.match(h);b=b.substring(l[0].length);l[3]&&(l[1]?l[3]=null:l[1]=l[3]);"^"===l[1]?f="inheritedData":"^^"===
      l[1]&&(f="inheritedData",k=c.parent());"?"===l[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||k[f]("$"+b+"Controller");if(!e&&!g)throw ia("ctreq",b,a);return e||null}G(b)&&(e=[],r(b,function(b){e.push(J(a,b,c,d))}));return e}function F(a,c,f,g,h){function k(a,b,c){var d;Ta(a)||(c=b,b=a,a=t);H&&(d=N);c||(c=H?V.parent():V);return h(a,b,d,c,Xb)}var n,p,B,x,N,db,V,S;d===f?(S=e,V=e.$$element):(V=y(f),S=new W(V,e));M&&(x=c.$new(!0));h&&(db=k,db.$$boundTransclude=h);z&&(ca={},N={},r(z,function(a){var b=
      {$scope:a===M||a.$$isolateScope?x:c,$element:V,$attrs:S,$transclude:db};B=a.controller;"@"==B&&(B=S[a.name]);b=E(B,b,!0,a.controllerAs);N[a.name]=b;H||V.data("$"+a.name+"Controller",b.instance);ca[a.name]=b}));if(M){C.$$addScopeInfo(V,x,!0,!(da&&(da===M||da===M.$$originalDirective)));C.$$addScopeClass(V,!0);g=ca&&ca[M.name];var X=x;g&&g.identifier&&!0===M.bindToController&&(X=g.instance);r(x.$$isolateBindings=M.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,k,l;switch(a.mode){case "@":S.$observe(e,
      function(a){X[d]=a});S.$$observers[e].$$scope=c;S[e]&&(X[d]=b(S[e])(c));break;case "=":if(f&&!S[e])break;h=O(S[e]);l=h.literal?na:function(a,b){return a===b||a!==a&&b!==b};k=h.assign||function(){g=X[d]=h(c);throw ia("nonassign",S[e],M.name);};g=X[d]=h(c);f=function(a){l(a,X[d])||(l(a,g)?k(c,a=X[d]):X[d]=a);return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(S[e],f):c.$watch(O(S[e],f),null,h.literal);x.$on("$destroy",f);break;case "&":h=O(S[e]),X[d]=function(a){return h(c,a)}}})}ca&&(r(ca,
      function(a){a()}),ca=null);g=0;for(n=l.length;g<n;g++)p=l[g],$(p,p.isolateScope?x:c,V,S,p.require&&J(p.directiveName,p.require,V,N),db);var Xb=c;M&&(M.template||null===M.templateUrl)&&(Xb=x);a&&a(Xb,f.childNodes,t,h);for(g=s.length-1;0<=g;g--)p=s[g],$(p,p.isolateScope?x:c,V,S,p.require&&J(p.directiveName,p.require,V,N),db)}p=p||{};for(var x=-Number.MAX_VALUE,N,z=p.controllerDirectives,ca,M=p.newIsolateScopeDirective,da=p.templateDirective,fa=p.nonTlbTranscludeDirective,w=!1,Na=!1,H=p.hasElementTranscludeDirective,
      Y=e.$$element=y(d),K,ga,v,Ga=f,Q,R=0,za=a.length;R<za;R++){K=a[R];var zb=K.$$start,aa=K.$$end;zb&&(Y=X(d,zb,aa));v=t;if(x>K.priority)break;if(v=K.scope)K.templateUrl||(L(v)?(ya("new/isolated scope",M||N,K,Y),M=K):ya("new/isolated scope",M,K,Y)),N=N||K;ga=K.name;!K.templateUrl&&K.controller&&(v=K.controller,z=z||{},ya("'"+ga+"' controller",z[ga],K,Y),z[ga]=K);if(v=K.transclude)w=!0,K.$$tlb||(ya("transclusion",fa,K,Y),fa=K),"element"==v?(H=!0,x=K.priority,v=Y,Y=e.$$element=y(U.createComment(" "+ga+
      ": "+e[ga]+" ")),d=Y[0],Ab(g,Ya.call(v,0),d),Ga=C(v,f,x,k&&k.name,{nonTlbTranscludeDirective:fa})):(v=y(Rb(d)).contents(),Y.empty(),Ga=C(v,f));if(K.template)if(Na=!0,ya("template",da,K,Y),da=K,v=u(K.template)?K.template(Y,e):K.template,v=Qc(v),K.replace){k=K;v=Pb.test(v)?Rc(T(K.templateNamespace,P(v))):[];d=v[0];if(1!=v.length||d.nodeType!==la)throw ia("tplrt",ga,"");Ab(g,Y,d);za={$attr:{}};v=V(d,[],za);var of=a.splice(R+1,a.length-(R+1));M&&D(v);a=a.concat(v).concat(of);Pc(e,za);za=a.length}else Y.html(v);
      if(K.templateUrl)Na=!0,ya("template",da,K,Y),da=K,K.replace&&(k=K),F=nf(a.splice(R,a.length-R),Y,e,g,w&&Ga,l,s,{controllerDirectives:z,newIsolateScopeDirective:M,templateDirective:da,nonTlbTranscludeDirective:fa}),za=a.length;else if(K.compile)try{Q=K.compile(Y,e,Ga),u(Q)?B(null,Q,zb,aa):Q&&B(Q.pre,Q.post,zb,aa)}catch(ba){c(ba,ua(Y))}K.terminal&&(F.terminal=!0,x=Math.max(x,K.priority))}F.scope=N&&!0===N.scope;F.transcludeOnThisElement=w;F.elementTranscludeOnThisElement=H;F.templateOnThisElement=Na;
      F.transclude=Ga;p.hasElementTranscludeDirective=H;return F}function D(a){for(var b=0,c=a.length;b<c;b++)a[b]=mc(a[b],{$$isolateScope:!0})}function fa(b,e,f,g,h,k,l){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var s=0,B=e.length;s<B;s++)try{q=e[s],(g===t||g>q.priority)&&-1!=q.restrict.indexOf(f)&&(k&&(q=mc(q,{$$start:k,$$end:l})),b.push(q),h=q)}catch(O){c(O)}}return h}function Pc(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=e.charAt(0)&&
      (b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(N(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function nf(a,b,c,d,e,f,g,h){var k=[],l,q,n=b[0],p=a.shift(),B=H({},p,{templateUrl:null,transclude:null,replace:null,$$originalDirective:p}),O=u(p.templateUrl)?p.templateUrl(b,c):p.templateUrl,E=p.templateNamespace;
      b.empty();s(J.getTrustedResourceUrl(O)).then(function(s){var F,J;s=Qc(s);if(p.replace){s=Pb.test(s)?Rc(T(E,P(s))):[];F=s[0];if(1!=s.length||F.nodeType!==la)throw ia("tplrt",p.name,O);s={$attr:{}};Ab(d,b,F);var x=V(F,[],s);L(p.scope)&&D(x);a=x.concat(a);Pc(c,s)}else F=n,b.html(s);a.unshift(B);l=A(a,F,c,e,b,p,f,g,h);r(d,function(a,c){a==F&&(d[c]=b[0])});for(q=ca(b[0].childNodes,e);k.length;){s=k.shift();J=k.shift();var z=k.shift(),C=k.shift(),x=b[0];if(!s.$$destroyed){if(J!==n){var S=J.className;h.hasElementTranscludeDirective&&
      p.replace||(x=Rb(F));Ab(z,y(J),x);N(y(x),S)}J=l.transcludeOnThisElement?M(s,l.transclude,C):C;l(q,s,x,d,J)}}k=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(k?(k.push(b),k.push(c),k.push(d),k.push(a)):(l.transcludeOnThisElement&&(a=M(b,l.transclude,e)),l(q,b,c,d,a)))}}function v(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function ya(a,b,c,d){if(b)throw ia("multidir",b.name,c.name,a,ua(d));}function Y(a,c){var d=b(c,!0);d&&a.push({priority:0,
      compile:function(a){a=a.parent();var b=!!a.length;b&&C.$$addBindingClass(a);return function(a,c){var e=c.parent();b||C.$$addBindingClass(e);C.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function T(a,b){a=Q(a||"html");switch(a){case "svg":case "math":var c=U.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Ga(a,b){if("srcdoc"==b)return J.HTML;var c=sa(a);if("xlinkHref"==b||"form"==c&&"action"==b||
      "img"!=c&&("src"==b||"ngSrc"==b))return J.RESOURCE_URL}function R(a,c,d,e,f){var h=b(d,!0);if(h){if("multiple"===e&&"select"===sa(a))throw ia("selmulti",ua(a));c.push({priority:100,compile:function(){return{pre:function(c,d,l){d=l.$$observers||(l.$$observers={});if(k.test(e))throw ia("nodomevents");l[e]&&(h=b(l[e],!0,Ga(a,e),g[e]||f))&&(l[e]=h(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(h,function(a,b){"class"===e&&a!=b?l.$updateClass(a,b):l.$set(e,a)}))}}}})}}
      function Ab(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);y(c).data(y(d).data());oa?(Nb=!0,oa.cleanData([d])):delete y.cache[d[y.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],y(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Z(a,b){return H(function(){return a.apply(null,
      arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ua(d))}}var W=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};W.prototype={$normalize:wa,$addClass:function(a){a&&0<a.length&&z.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&z.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Sc(a,b);c&&c.length&&z.addClass(this.$$element,c);(c=Sc(b,a))&&c.length&&z.removeClass(this.$$element,
      c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Kc(f,a),h=gf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Mb(a,"-"));g=sa(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=F(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=P(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var q=2*l,g=g+F(P(h[q]),!0),g=g+(" "+P(h[q+
      1]));h=P(h[2*l]).split(/\s/);g+=F(P(h[0]),!0);2===h.length&&(g+=" "+P(h[1]));this[a]=b=g}!1!==d&&(null===b||b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&r(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=pa()),e=d[a]||(d[a]=[]);e.push(b);x.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Va(e,b)}}};var Na=b.startSymbol(),ga=b.endSymbol(),Qc="{{"==Na||"}}"==ga?ma:function(a){return a.replace(/\{\{/g,
      Na).replace(/}}/g,ga)},za=/^ngAttr[A-Z]/;C.$$addBindingInfo=l?function(a,b){var c=a.data("$binding")||[];G(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:w;C.$$addBindingClass=l?function(a){N(a,"ng-binding")}:w;C.$$addScopeInfo=l?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:w;C.$$addScopeClass=l?function(a,b){N(a,b?"ng-isolate-scope":"ng-scope")}:w;return C}]}function wa(b){return bb(b.replace(pf,""))}function Sc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),
      f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Rc(b){b=y(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&qf.call(b,a,1);return b}function De(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){La(a,"controller");L(a)?H(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!L(a.$scope))throw v("$controller")("noscp",d,
      b);a.$scope[b]=c}return function(g,h,k,l){var m,p,q;k=!0===k;l&&I(l)&&(q=l);I(g)&&(l=g.match(c),p=l[1],q=q||l[3],g=b.hasOwnProperty(p)?b[p]:uc(h.$scope,p,!0)||(a?uc(e,p,!0):t),pb(g,p,!0));if(k)return k=function(){},k.prototype=(G(g)?g[g.length-1]:g).prototype,m=new k,q&&f(h,q,m,p||g.name),H(function(){d.invoke(g,m,h,p);return m},{instance:m,identifier:q});m=d.instantiate(g,h,p);q&&f(h,q,m,p||g.name);return m}}]}function Ee(){this.$get=["$window",function(b){return y(b.document)}]}function Fe(){this.$get=
      ["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Yb(b,a){if(I(b)){b=b.replace(rf,"");var c=a("Content-Type");if(c&&0===c.indexOf(Tc)&&b.trim()||sf.test(b)&&tf.test(b))b=pc(b)}return b}function Uc(b){var a={},c,d,e;if(!b)return a;r(b.split("\n"),function(b){e=b.indexOf(":");c=Q(P(b.substr(0,e)));d=P(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Vc(b){var a=L(b)?b:t;return function(c){a||(a=Uc(b));return c?a[Q(c)]||null:a}}function Wc(b,a,c){if(u(c))return c(b,
      a);r(c,function(c){b=c(b,a)});return b}function Ie(){var b=this.defaults={transformResponse:[Yb],transformRequest:[function(a){return L(a)&&"[object File]"!==Ja.call(a)&&"[object Blob]"!==Ja.call(a)?Za(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ta(Zb),put:ta(Zb),patch:ta(Zb)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return A(b)?(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory",
      "$rootScope","$q","$injector",function(d,e,f,g,h,k){function l(a){function c(a){var b=H({},a);b.data=a.data?Wc(a.data,a.headers,d.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}var d={method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},e=function(a){var c=b.headers,d=H({},a.headers),e,f,c=H({},c.common,c[Q(a.method)]);a:for(e in c){a=Q(e);for(f in d)if(Q(f)===a)continue a;d[e]=c[e]}(function(a){var b;r(a,function(c,d){u(c)&&(b=c(),null!=
      b?a[d]=b:delete a[d])})})(d);return d}(a);H(d,a);d.headers=e;d.method=rb(d.method);var f=[function(a){e=a.headers;var d=Wc(a.data,Vc(e),a.transformRequest);D(d)&&r(e,function(a,b){"content-type"===Q(b)&&delete e[b]});D(a.withCredentials)&&!D(b.withCredentials)&&(a.withCredentials=b.withCredentials);return m(a,d,e).then(c,c)},t],g=h.when(d);for(r(n,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=
      f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,d)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,d)});return g};return g}function m(c,f,k){function n(b,c,d,e){function f(){m(c,b,d,e)}N&&(200<=b&&300>b?N.put(r,[b,c,Uc(d),e]):N.remove(r));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function m(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?z.resolve:z.reject)({data:a,status:b,headers:Vc(d),config:c,statusText:e})}
      function J(){var a=l.pendingRequests.indexOf(c);-1!==a&&l.pendingRequests.splice(a,1)}var z=h.defer(),F=z.promise,N,C,r=p(c.url,c.params);l.pendingRequests.push(c);F.then(J,J);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(N=L(c.cache)?c.cache:L(b.cache)?b.cache:q);if(N)if(C=N.get(r),A(C)){if(C&&u(C.then))return C.then(J,J),C;G(C)?m(C[1],C[0],ta(C[2]),C[3]):m(C,200,{},"OK")}else N.put(r,F);D(C)&&((C=Xc(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:t)&&(k[c.xsrfHeaderName||
      b.xsrfHeaderName]=C),d(c.method,r,f,n,k,c.timeout,c.withCredentials,c.responseType));return F}function p(a,b){if(!b)return a;var c=[];Cd(b,function(a,b){null===a||D(a)||(G(a)||(a=[a]),r(a,function(a){L(a)&&(a=ea(a)?a.toISOString():Za(a));c.push(Da(b)+"="+Da(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var q=f("$http"),n=[];r(c,function(a){n.unshift(I(a)?k.get(a):k.invoke(a))});l.pendingRequests=[];(function(a){r(arguments,function(a){l[a]=function(b,c){return l(H(c||
      {},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){l[a]=function(b,c,d){return l(H(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");l.defaults=b;return l}]}function uf(){return new T.XMLHttpRequest}function Je(){this.$get=["$browser","$window","$document",function(b,a,c){return vf(b,uf,b.defer,a.angular.callbacks,c[0])}]}function vf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;
      m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,n="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),n=a.type,g="error"===a.type?404:200);c&&c(g,n)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,k,l,m,p,q,n){function s(){x&&x();B&&B.abort()}function O(a,d,e,f,g){z&&c.cancel(z);x=B=null;a(d,e,f,g);b.$$completeOutstandingRequest(w)}b.$$incOutstandingRequestCount();
      h=h||b.url();if("jsonp"==Q(e)){var E="_"+(d.counter++).toString(36);d[E]=function(a){d[E].data=a;d[E].called=!0};var x=f(h.replace("JSON_CALLBACK","angular.callbacks."+E),E,function(a,b){O(l,a,d[E].data,"",b);d[E]=w})}else{var B=a();B.open(e,h,!0);r(m,function(a,b){A(a)&&B.setRequestHeader(b,a)});B.onload=function(){var a=B.statusText||"",b="response"in B?B.response:B.responseText,c=1223===B.status?204:B.status;0===c&&(c=b?200:"file"==Aa(h).protocol?404:0);O(l,c,b,B.getAllResponseHeaders(),a)};e=
      function(){O(l,-1,null,null,"")};B.onerror=e;B.onabort=e;q&&(B.withCredentials=!0);if(n)try{B.responseType=n}catch(J){if("json"!==n)throw J;}B.send(k||null)}if(0<p)var z=c(s,p);else p&&u(p.then)&&p.then(s)}}function Ge(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,n,s){function O(c){return c.replace(l,b).replace(m,
      a)}function E(a){try{var b=a;a=n?e.getTrusted(n,b):e.valueOf(b);var c;if(s&&!A(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=Za(a)}c=a}return c}catch(g){c=$b("interr",f,g.toString()),d(c)}}s=!!s;for(var x,B,J=0,z=[],F=[],N=f.length,C=[],r=[];J<N;)if(-1!=(x=f.indexOf(b,J))&&-1!=(B=f.indexOf(a,x+h)))J!==x&&C.push(O(f.substring(J,x))),J=f.substring(x+h,B),z.push(J),F.push(c(J,E)),J=B+k,r.push(C.length),C.push("");else{J!==N&&C.push(O(f.substring(J)));
      break}if(n&&1<C.length)throw $b("noconcat",f);if(!g||z.length){var M=function(a){for(var b=0,c=z.length;b<c;b++){if(s&&D(a[b]))return;C[r[b]]=a[b]}return C.join("")};return H(function(a){var b=0,c=z.length,e=Array(c);try{for(;b<c;b++)e[b]=F[b](a);return M(e)}catch(g){a=$b("interr",f,g.toString()),d(a)}},{exp:f,expressions:z,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(F,function(c,e){var f=M(c);u(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,k=a.length,l=new RegExp(b.replace(/./g,
      f),"g"),m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function He(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,k,l){var m=a.setInterval,p=a.clearInterval,q=0,n=A(l)&&!l,s=(n?d:c).defer(),O=s.promise;k=A(k)?k:0;O.then(null,null,e);O.$$intervalId=m(function(){s.notify(q++);0<k&&q>=k&&(s.resolve(q),p(O.$$intervalId),delete f[O.$$intervalId]);n||b.$apply()},h);f[O.$$intervalId]=s;return O}var f={};
      e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function Pd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),
      SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=
      nb(b[a]);return b.join("/")}function Yc(b,a){var c=Aa(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=aa(c.port)||wf[c.protocol]||null}function Zc(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Aa(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=rc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function xa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Fa(b){var a=
      b.indexOf("#");return-1==a?b:b.substr(0,a)}function bc(b){return b.substr(0,Fa(b).lastIndexOf("/")+1)}function cc(b,a){this.$$html5=!0;a=a||"";var c=bc(b);Yc(b,this);this.$$parse=function(a){var b=xa(c,a);if(!I(b))throw eb("ipthprfx",a,c);Zc(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Kb(this.$$search),b=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&
      "#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=xa(b,d))!==t?(g=f,g=(f=xa(a,f))!==t?c+(xa("/",f)||f):b+g):(f=xa(c,d))!==t?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function dc(b,a){var c=bc(b);Yc(b,this);this.$$parse=function(d){var e=xa(b,d)||xa(c,d),e="#"==e.charAt(0)?xa(a,e):this.$$html5?e:"";if(!I(e))throw eb("ihshprfx",d,a);Zc(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};
      this.$$compose=function(){var c=Kb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Fa(b)==Fa(a)?(this.$$parse(a),!0):!1}}function $c(b,a){this.$$html5=!0;dc.apply(this,arguments);var c=bc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Fa(d)?f=d:(g=xa(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=
      function(){var c=Kb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Bb(b){return function(){return this[b]}}function ad(b,a){return function(c){if(D(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Ke(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return A(a)?(b=a,this):b};this.html5Mode=function(b){return Ua(b)?(a.enabled=b,this):L(b)?(Ua(b.enabled)&&(a.enabled=
      b.enabled),Ua(b.requireBase)&&(a.requireBase=b.requireBase),Ua(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function h(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,l;l=d.baseHref();var m=d.url(),p;if(a.enabled){if(!l&&a.requireBase)throw eb("nobase");p=m.substring(0,
      m.indexOf("/",m.indexOf("//")+2))+(l||"/");l=e.history?cc:$c}else p=Fa(m),l=dc;k=new l(p,"#"+b);k.$$parseLinkUrl(m,m);k.$$state=d.state();var q=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&2!=b.which){for(var e=y(b.target);"a"!==sa(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var g=e.prop("href"),h=e.attr("href")||e.attr("xlink:href");L(g)&&"[object SVGAnimatedString]"===g.toString()&&(g=Aa(g.animVal).href);q.test(g)||!g||e.attr("target")||b.isDefaultPrevented()||
      !k.$$parseLinkUrl(g,h)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),T.angular["ff-684208-preventDefault"]=!0))}});k.absUrl()!=m&&d.url(k.absUrl(),!0);var n=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,g(d,!1,e)):(n=!1,h(d,e)))});c.$$phase||c.$digest()});c.$watch(function(){var a=d.url(),b=d.state(),f=k.$$replace,l=a!==
      k.absUrl()||k.$$html5&&e.history&&b!==k.$$state;if(n||l)n=!1,c.$evalAsync(function(){var d=k.absUrl(),e=c.$broadcast("$locationChangeStart",d,a,k.$$state,b).defaultPrevented;k.absUrl()===d&&(e?(k.$$parse(a),k.$$state=b):(l&&g(d,f,b===k.$$state?null:k.$$state),h(a,b)))});k.$$replace=!1});return k}]}function Le(){var b=!0,a=this;this.debugEnabled=function(a){return A(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?
      "Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||w;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function qa(b,a){if("__defineGetter__"===
      b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw ja("isecfld",a);return b}function ra(b,a){if(b){if(b.constructor===b)throw ja("isecfn",a);if(b.window===b)throw ja("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw ja("isecdom",a);if(b===Object)throw ja("isecobj",a);}return b}function ec(b){return b.constant}function Oa(b,a,c,d){ra(b,d);a=a.split(".");for(var e,f=0;1<a.length;f++){e=qa(a.shift(),d);var g=ra(b[e],d);g||(g={},b[e]=
      g);b=g}e=qa(a.shift(),d);ra(b[e],d);return b[e]=c}function Pa(b){return"constructor"==b}function bd(b,a,c,d,e,f,g){qa(b,f);qa(a,f);qa(c,f);qa(d,f);qa(e,f);var h=function(a){return ra(a,f)},k=g||Pa(b)?h:ma,l=g||Pa(a)?h:ma,m=g||Pa(c)?h:ma,p=g||Pa(d)?h:ma,q=g||Pa(e)?h:ma;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=k(h[b]);if(!a)return h;if(null==h)return t;h=l(h[a]);if(!c)return h;if(null==h)return t;h=m(h[c]);if(!d)return h;if(null==h)return t;h=p(h[d]);return e?null==
      h?t:h=q(h[e]):h}}function xf(b,a){return function(c,d){return b(c,d,ra,a)}}function cd(b,a,c){var d=a.expensiveChecks,e=d?yf:zf,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?bd(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=bd(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=t,a=f;while(e<h);return f};else{var k="";d&&(k+="s = eso(s, fe);\nl = eso(l, fe);\n");var l=d;r(g,function(a,b){qa(a,c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Pa(a))e="eso("+
      e+", fe)",l=!0;k+="if(s == null) return undefined;\ns="+e+";\n"});k+="return s;";a=new Function("s","l","eso","fe",k);a.toString=ba(k);l&&(a=xf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c){return Oa(a,b,c,b)};return e[b]=f}function fc(b){return u(b.valueOf)?b.valueOf():Af.call(b)}function Me(){var b=pa(),a=pa();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}
      function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=fc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var k=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,k)||(h=d(a),k=b&&fc(b));return h},b,c)}for(var l=[],q=0,n=e.length;q<n;q++)l[q]=g;return a.$watch(function(a){for(var b=
      !1,c=0,f=e.length;c<f;c++){var k=e[c](a);if(b||(b=!g(k,l[c])))l[c]=k&&fc(k)}b&&(h=d(a));return h},b,c)}function k(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;u(b)&&b.apply(this,arguments);A(a)&&d.$$postDigest(function(){A(f)&&e()})},c)}function l(a,b,c,d){function e(a){var b=!0;r(a,function(a){A(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;u(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,
      b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){u(b)&&b.apply(this,arguments);e()},c)}function p(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==l&&c!==k?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return A(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=[a]);return c}var q={csp:d.csp,expensiveChecks:!1},n={csp:d.csp,expensiveChecks:!0};return function(d,
      f,g){var r,B,J;switch(typeof d){case "string":J=d=d.trim();var z=g?a:b;r=z[J];r||(":"===d.charAt(0)&&":"===d.charAt(1)&&(B=!0,d=d.substring(2)),g=g?n:q,r=new gc(g),r=(new fb(r,c,g)).parse(d),r.constant?r.$$watchDelegate=m:B?(r=e(r),r.$$watchDelegate=r.literal?l:k):r.inputs&&(r.$$watchDelegate=h),z[J]=r);return p(r,f);case "function":return p(d,f);default:return p(w,f)}}}]}function Oe(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return dd(function(a){b.$evalAsync(a)},a)}]}function Pe(){this.$get=
      ["$browser","$exceptionHandler",function(b,a){return dd(function(a){b.defer(a)},a)}]}function dd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{u(b)?d.resolve(b(c.value)):
      1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=v("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return l(b,
      !0,a)},function(b){return l(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(L(b)||u(b))d=b&&b.then;u(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},
      $$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(u(b)?b(c):c)}catch(h){a(h)}}})}};var k=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},l=function(a,b,c){var d=null;try{u(c)&&(d=c())}catch(e){return k(e,!1)}return d&&u(d.then)?d.then(function(){return k(a,
      b)},function(a){return k(a,!1)}):k(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},p=function n(a){if(!u(a))throw h("norslvr",a);if(!(this instanceof n))return new n(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};p.defer=function(){return new g};p.reject=function(a){var b=new g;b.reject(a);return b.promise};p.when=m;p.all=function(a){var b=new g,c=0,d=G(a)?[]:{};r(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||
      (d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return p}function Ye(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};
      f.supported=e;return f}]}function Ne(){var b=10,a=v("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(e,f,g,h){function k(){this.$id=++kb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function l(b){if(s.$$phase)throw a("inprog",
      s.$$phase);s.$$phase=b}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function p(){}function q(){for(;x.length;)try{x.shift()()}catch(a){f(a)}d=null}function n(){null===d&&(d=h.defer(function(){s.$apply(q)}))}k.prototype={constructor:k,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new k,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=
      this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=++kb;this.$$ChildScope=null},this.$$ChildScope.prototype=this),d=new this.$$ChildScope);d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?(b.$$childTail.$$nextSibling=d,b.$$childTail=d):b.$$childHead=b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,h={fn:b,last:p,get:e,exp:a,eq:!!d};c=null;u(b)||
      (h.fn=w);f||(f=this.$$watchers=[]);f.unshift(h);return function(){Va(f,h);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},
      $watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!D(e)){if(L(e))if(Ra(e))for(f!==m&&(f=m,s=f.length=0,l++),a=e.length,s!==a&&(l++,f.length=s=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==q&&(f=q={},s=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(s++,f[b]=g,l++));if(s>a)for(b in l++,f)e.hasOwnProperty(b)||(s--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<
      b.length,l=0,p=g(a,c),m=[],q={},n=!0,s=0;return this.$watch(p,function(){n?(n=!1,b(e,e,d)):b(e,h,d);if(k)if(L(e))if(Ra(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)Jb.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var e,g,k,m,n,r,x=b,M,t=[],X,S;l("$digest");h.$$checkUrlChange();this===s&&null!==d&&(h.defer.cancel(d),q());c=null;do{r=!1;for(M=this;O.length;){try{S=O.shift(),S.scope.$eval(S.expression)}catch(A){f(A)}c=null}a:do{if(m=M.$$watchers)for(n=m.length;n--;)try{if(e=
      m[n])if((g=e.get(M))!==(k=e.last)&&!(e.eq?na(g,k):"number"===typeof g&&"number"===typeof k&&isNaN(g)&&isNaN(k)))r=!0,c=e,e.last=e.eq?Ca(g,null):g,e.fn(g,k===p?g:k,M),5>x&&(X=4-x,t[X]||(t[X]=[]),t[X].push({msg:u(e.exp)?"fn: "+(e.exp.name||e.exp.toString()):e.exp,newVal:g,oldVal:k}));else if(e===c){r=!1;break a}}catch(v){f(v)}if(!(m=M.$$childHead||M!==this&&M.$$nextSibling))for(;M!==this&&!(m=M.$$nextSibling);)M=M.$parent}while(M=m);if((r||O.length)&&!x--)throw s.$$phase=null,a("infdig",b,t);}while(r||
      O.length);for(s.$$phase=null;E.length;)try{E.shift()()}catch(y){f(y)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==s){for(var b in this.$$listenerCount)m(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=
      this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=w;this.$on=this.$watch=this.$watchGroup=function(){return w};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){s.$$phase||O.length||h.defer(function(){O.length&&s.$digest()});O.push({scope:this,expression:a})},$$postDigest:function(a){E.push(a)},$apply:function(a){try{return l("$apply"),
      this.$eval(a)}catch(b){f(b)}finally{s.$$phase=null;try{s.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&x.push(b);n()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,m(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,
      stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=Xa([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(p){f(p)}else d.splice(l,1),l--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;
      for(var g=Xa([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var s=new k,O=s.$$asyncQueue=[],E=s.$$postDigestQueue=[],x=s.$$applyAsyncQueue=[];return s}]}function Qd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;
      this.aHrefSanitizationWhitelist=function(a){return A(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return A(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Aa(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function Bf(b){if("self"===b)return b;if(I(b)){if(-1<b.indexOf("***"))throw Ba("iwcard",b);b=ed(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(lb(b))return new RegExp("^"+b.source+"$");throw Ba("imatcher");}function fd(b){var a=
      [];A(b)&&r(b,function(b){a.push(Bf(b))});return a}function Re(){this.SCE_CONTEXTS=ka;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=fd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=fd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?Xc(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};
      b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ba("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[ka.HTML]=e(g);h[ka.CSS]=e(g);h[ka.URL]=e(g);h[ka.JS]=e(g);h[ka.RESOURCE_URL]=e(h[ka.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ba("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Ba("itype",a);return new c(b)},getTrusted:function(c,e){if(null===
      e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===ka.RESOURCE_URL){var g=Aa(e.toString()),p,q,n=!1;p=0;for(q=b.length;p<q;p++)if(d(b[p],g)){n=!0;break}if(n)for(p=0,q=a.length;p<q;p++)if(d(a[p],g)){n=!1;break}if(n)return e;throw Ba("insecurl",e.toString());}if(c===ka.HTML)return f(e);throw Ba("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Qe(){var b=!0;this.enabled=function(a){arguments.length&&
      (b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Ha)throw Ba("iequirks");var d=ta(ka);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=ma);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;r(ka,function(a,b){var c=Q(b);d[bb("parse_as_"+c)]=function(b){return e(a,
      b)};d[bb("get_trusted_"+c)]=function(b){return f(a,b)};d[bb("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function Se(){this.$get=["$window","$document",function(b,a){var c={},d=aa((/android (\d+)/.exec(Q((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,k=f.body&&f.body.style,l=!1,m=!1;if(k){for(var p in k)if(l=h.exec(p)){g=l[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in k&&"webkit");
      l=!!("transition"in k||g+"Transition"in k);m=!!("animation"in k||g+"Animation"in k);!d||l&&m||(l=I(f.body.style.webkitTransition),m=I(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"==a&&9==Ha)return!1;if(D(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:$a(),vendorPrefix:g,transitions:l,animations:m,android:d}}]}function Ue(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;
      var g=a.defaults&&a.defaults.transformResponse;if(G(g))for(var h=g,g=[],k=0;k<h.length;++k){var l=h[k];l!==Yb&&g.push(l)}else g===Yb&&(g=null);return a.get(e,{cache:b,transformResponse:g}).then(function(a){a=a.data;d.totalPendingRequests--;b.put(e,a);return a},function(){d.totalPendingRequests--;if(!f)throw ia("tpload",e);return c.reject()})}d.totalPendingRequests=0;return d}]}function Ve(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");
      var g=[];r(a,function(a){var d=va.element(a).data("$binding");d&&r(d,function(d){c?(new RegExp("(^|\\s)"+ed(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}
      function We(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,k,l){var m=A(l)&&!l,p=(m?d:c).defer(),q=p.promise;k=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),e(a)}finally{delete g[q.$$timeoutId]}m||b.$apply()},k);q.$$timeoutId=k;g[k]=p;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Aa(b){Ha&&(Z.setAttribute("href",
      b),b=Z.href);Z.setAttribute("href",b);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function Xc(b){b=I(b)?Aa(b):b;return b.protocol===gd.protocol&&b.host===gd.host}function Xe(){this.$get=ba(T)}function Cc(b){function a(c,d){if(L(c)){var e={};r(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+
      "Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",hd);a("date",id);a("filter",Cf);a("json",Df);a("limitTo",Ef);a("lowercase",Ff);a("number",jd);a("orderBy",kd);a("uppercase",Gf)}function Cf(){return function(b,a,c){if(!G(b))return b;var d=typeof c,e=[];e.check=function(a,b){for(var c=0;c<e.length;c++)if(!e[c](a,b))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return va.equals(a,b)}:function(a,b){if(a&&
      b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Jb.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var f=function(a,b){if("string"===typeof b&&"!"===b.charAt(0))return!f(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&f(a[d],b))return!0}return!1;case "array":for(d=
      0;d<a.length;d++)if(f(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)(function(b){"undefined"!==typeof a[b]&&e.push(function(c){return f("$"==b?c:c&&c[b],a[b])})})(g);break;case "function":e.push(a);break;default:return b}d=[];for(g=0;g<b.length;g++){var h=b[g];e.check(h,g)&&d.push(h)}return d}}function hd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){D(d)&&(d=a.CURRENCY_SYM);D(e)&&(e=2);return null==
      b?b:ld(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function jd(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:ld(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function ld(b,a,c,d,e){if(!isFinite(b)||L(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",k=[],l=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?(g="0",b=0):(h=g,l=!0)}if(l)0<e&&-1<b&&1>b&&(h=b.toFixed(e));else{g=(g.split(md)[1]||"").length;D(e)&&(e=Math.min(Math.max(a.minFrac,
      g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);0===b&&(f=!1);b=(""+b).split(md);g=b[0];b=b[1]||"";var m=0,p=a.lgSize,q=a.gSize;if(g.length>=p+q)for(m=g.length-p,l=0;l<m;l++)0===(m-l)%q&&0!==l&&(h+=c),h+=g.charAt(l);for(l=m;l<g.length;l++)0===(g.length-l)%p&&0!==l&&(h+=c),h+=g.charAt(l);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}k.push(f?a.negPre:a.posPre);k.push(h);k.push(f?a.negSuf:a.posSuf);return k.join("")}function Cb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=
      ""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Cb(e,a,d)}}function Db(b,a){return function(c,d){var e=c["get"+b](),f=rb(a?"SHORT"+b:b);return d[f][e]}}function nd(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function od(b){return function(a){var c=nd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/
      6048E5);return Cb(a,b)}}function id(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=aa(b[9]+b[10]),g=aa(b[9]+b[11]));h.call(a,aa(b[1]),aa(b[2])-1,aa(b[3]));f=aa(b[4]||0)-f;g=aa(b[5]||0)-g;h=aa(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g=
      "",h=[],k,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;I(c)&&(c=Hf.test(c)?aa(c):a(c));W(c)&&(c=new Date(c));if(!ea(c))return c;for(;e;)(l=If.exec(e))?(h=Xa(h,l,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));r(h,function(a){k=Jf[a];g+=k?k(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Df(){return function(b){return Za(b,!0)}}function Ef(){return function(b,a){W(b)&&(b=b.toString());
      if(!G(b)&&!I(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):aa(a);if(I(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function kd(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c==d?(ea(a)&&ea(b)&&(a=a.valueOf(),b=b.valueOf()),"string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),
      a===b?0:a<b?-1:1):c<d?-1:1}if(!Ra(a))return a;c=G(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||ma;if(I(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(function(a,b){return f(a,b)},c);d=b(a);if(d.constant){var l=d();return e(function(a,b){return f(a[l],b[l])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});return Ya.call(a).sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ia(b){u(b)&&
      (b={link:b});b.restrict=b.restrict||"AC";return ba(b)}function pd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Eb;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){La(a.$name,"input");g.push(a);
      a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});Va(g,a)};qd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Va(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=
      function(){d.removeClass(b,Qa);d.addClass(b,Fb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Qa,Fb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function hc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function gb(b,a,c,d,e,f){var g=
      a[0].placeholder,h={},k=Q(a[0].type);if(!e.android){var l=!1;a.on("compositionstart",function(a){l=!0});a.on("compositionend",function(){l=!1;m()})}var m=function(b){if(!l){var e=a.val(),f=b&&b.type;Ha&&"input"===(b||h).type&&a[0].placeholder!==g?g=a[0].placeholder:("password"===k||c.ngTrim&&"false"===c.ngTrim||(e=P(e)),(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,f))}};if(e.hasEvent("input"))a.on("input",m);else{var p,q=function(a){p||(p=f.defer(function(){m(a);p=null}))};
      a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||q(a)});if(e.hasEvent("paste"))a.on("paste cut",q)}a.on("change",m);d.$render=function(){a.val(d.$isEmpty(d.$modelValue)?"":d.$viewValue)}}function Gb(b,a){return function(c,d){var e,f;if(ea(c))return c;if(I(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Kf.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),
      HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function hb(b,a,c,d){return function(e,f,g,h,k,l,m){function p(a){return A(a)?ea(a)?a:c(a):t}rd(e,f,g,h);gb(e,f,g,h,k,l);var q=h&&h.$options&&h.$options.timezone,n;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,n),"UTC"===
      q&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):t});h.$formatters.push(function(a){if(h.$isEmpty(a))n=null;else{if(!ea(a))throw Hb("datefmt",a);if((n=a)&&"UTC"===q){var b=6E4*n.getTimezoneOffset();n=new Date(n.getTime()+b)}return m("date")(a,d,q)}return""});if(A(g.min)||g.ngMin){var s;h.$validators.min=function(a){return h.$isEmpty(a)||D(s)||c(a)>=s};g.$observe("min",function(a){s=p(a);h.$validate()})}if(A(g.max)||g.ngMax){var r;h.$validators.max=function(a){return h.$isEmpty(a)||D(r)||c(a)<=
      r};g.$observe("max",function(a){r=p(a);h.$validate()})}h.$isEmpty=function(a){return!a||a.getTime&&a.getTime()!==a.getTime()}}}function rd(b,a,c,d){(d.$$hasNativeValidators=L(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function sd(b,a,c,d,e){if(A(d)){b=b(d);if(!b.constant)throw v("ngModel")("constexpr",c,d);return b(a)}return e}function qd(b){function a(a,b){b&&!f[a]?(l.addClass(e,a),f[a]=!0):!b&&f[a]&&(l.removeClass(e,a),f[a]=
      !1)}function c(b,c){b=b?"-"+Mb(b,"-"):"";a(ib+b,!0===c);a(td+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,k=b.parentForm,l=b.$animate;f[td]=!(f[ib]=e.hasClass(ib));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),ud(d.$pending)&&(d.$pending=t));Ua(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(vd,!0),d.$valid=d.$invalid=t,c("",null)):(a(vd,
      !1),d.$valid=ud(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);k.$setValidity(b,e,d)}}function ud(b){if(b)for(var a in b)return!1;return!0}function ic(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!G(a)){if(I(a))return a.split(" ");if(L(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});
      return b}}return a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(b){if(!0===a||f.$index%2===a){var l=e(b||[]);if(!m){var n=k(l,1);h.$addClass(n)}else if(!na(b,m)){var s=e(m),n=d(l,s),l=d(s,l),n=k(n,1),l=k(l,-1);n&&n.length&&c.addClass(g,n);l&&l.length&&c.removeClass(g,l)}}m=ta(b)}var m;f.$watch(h[b],l,!0);h.$observe("class",
      function(a){l(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[b]));g===a?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}var Lf=/^\/(.+)\/([a-z]*)$/,Q=function(b){return I(b)?b.toLowerCase():b},Jb=Object.prototype.hasOwnProperty,rb=function(b){return I(b)?b.toUpperCase():b},Ha,y,oa,Ya=[].slice,qf=[].splice,Mf=[].push,Ja=Object.prototype.toString,Wa=v("ng"),va=T.angular||(T.angular={}),ab,kb=0;Ha=U.documentMode;w.$inject=[];ma.$inject=
      [];var G=Array.isArray,P=function(b){return I(b)?b.trim():b},ed=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},$a=function(){if(A($a.isActive_))return $a.isActive_;var b=!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return $a.isActive_=b},ob=["ng-","data-ng-","ng:","x-ng-"],Kd=/[A-Z]/g,tc=!1,Nb,la=1,mb=3,Od={full:"1.3.3",major:1,minor:3,dot:3,codeName:"undersea-arithmetic"};R.expando="ng339";
      var wb=R.cache={},ef=1;R._data=function(b){return this.cache[b[this.expando]]||{}};var $e=/([\:\-\_]+(.))/g,af=/^moz([A-Z])/,Nf={mouseleave:"mouseout",mouseenter:"mouseover"},Qb=v("jqLite"),df=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Pb=/<|&#?\w+;/,bf=/<([\w:]+)/,cf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ha={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],
      td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ha.optgroup=ha.option;ha.tbody=ha.tfoot=ha.colgroup=ha.caption=ha.thead;ha.th=ha.td;var Ka=R.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),R(T).on("load",a))},toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:Mf,sort:[].sort,
      splice:[].splice},yb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){yb[Q(b)]=b});var Lc={};r("input select option textarea button form details".split(" "),function(b){Lc[b]=!0});var Mc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};r({data:Sb,removeData:ub},function(b,a){R[a]=b});r({data:Sb,inheritedData:xb,scope:function(b){return y.data(b,"$scope")||xb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return y.data(b,
      "$isolateScope")||y.data(b,"$isolateScopeNoTemplate")},controller:Hc,injector:function(b){return xb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Tb,css:function(b,a,c){a=bb(a);if(A(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=Q(a);if(yb[d])if(A(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||w).specified?d:t;else if(A(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,
      2),null===b?t:b},prop:function(b,a,c){if(A(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(D(b)){var d=a.nodeType;return d===la||d===mb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(D(a)){if(b.multiple&&"select"===sa(b)){var c=[];r(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(D(a))return b.innerHTML;tb(b,!0);b.innerHTML=a},empty:Ic},function(b,a){R.prototype[a]=function(a,
      d){var e,f,g=this.length;if(b!==Ic&&(2==b.length&&b!==Tb&&b!==Hc?a:d)===t){if(L(a)){for(e=0;e<g;e++)if(b===Sb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});r({removeData:ub,on:function a(c,d,e,f){if(A(f))throw Qb("onargs");if(Dc(c)){var g=vb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=hf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],k=g.length;k--;){d=
      g[k];var l=f[d];l||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Nf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),l=f[d]);l.push(e)}}},off:Gc,one:function(a,c,d){a=y(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;tb(a);r(new R(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){a.nodeType===
      la&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===la||11===d){c=new R(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===la){var d=a.firstChild;r(new R(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Jc,detach:function(a){Jc(a,!0)},after:function(a,c){var d=a,e=a.parentNode;
      c=new R(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Vb,removeClass:Ub,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;D(f)&&(f=!Tb(a,c));(f?Vb:Ub)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Rb,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=vb(a);if(h=(h=h&&h.events)&&
      h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:w,type:g,target:a},c.type&&(e=H(e,c)),c=ta(h),f=d?[e].concat(d):[e],r(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){R.prototype[c]=function(c,e,f){for(var g,h=0,k=this.length;h<
      k;h++)D(g)?(g=a(this[h],c,e,f),A(g)&&(g=y(g))):Fc(g,a(this[h],c,e,f));return A(g)?g:this};R.prototype.bind=R.prototype.on;R.prototype.unbind=R.prototype.off});cb.prototype={put:function(a,c){this[Ma(a,this.nextUid)]=c},get:function(a){return this[Ma(a,this.nextUid)]},remove:function(a){var c=this[a=Ma(a,this.nextUid)];delete this[a];return c}};var Oc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,kf=/,/,lf=/^\s*(_?)(\S+?)\1\s*$/,Nc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ea=v("$injector");Lb.$$annotate=Wb;var Of=
      v("$animate"),Ae=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Of("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=
      d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=pa();r((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});r(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function k(){m||(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function l(a,c){if(va.isObject(c)){var d=H(c.from||{},c.to||{});a.css(d)}}var m;return{animate:function(a,
      c,d){l(a,{from:c,to:d});return k()},enter:function(a,c,d,e){l(a,e);d?d.after(a):c.prepend(a);return k()},leave:function(a,c){a.remove();return k()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=y(a);c=I(c)?c:G(c)?c.join(" "):"";r(a,function(a){Vb(a,c)});l(a,d);return k()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,c,d){a=y(a);c=I(c)?c:G(c)?c.join(" "):
      "";r(a,function(a){Ub(a,c)});l(a,d);return k()},setClass:function(a,c,d,e){var k=this,l=!1;a=y(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=va.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=G(c)?c:c.split(" ");d=G(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));
      return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);l(a,e);return k()},enabled:w,cancel:w}}]}],ia=v("$compile");vc.$inject=["$provide","$$sanitizeUriProvider"];var pf=/^((?:x|data)[\:\-_])/i,Tc="application/json",Zb={"Content-Type":Tc+";charset=utf-8"},sf=/^\s*(\[|\{[^\{])/,tf=/[\}\]]\s*$/,rf=/^\)\]\}',?\n/,$b=v("$interpolate"),Pf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,wf={http:80,https:443,ftp:21},eb=v("$location"),Qf={$$html5:!1,
      $$replace:!1,absUrl:Bb("$$absUrl"),url:function(a){if(D(a))return this.$$url;a=Pf.exec(a);a[1]&&this.path(decodeURIComponent(a[1]));(a[2]||a[1])&&this.search(a[3]||"");this.hash(a[5]||"");return this},protocol:Bb("$$protocol"),host:Bb("$$host"),port:Bb("$$port"),path:ad("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(I(a)||W(a))a=a.toString(),this.$$search=rc(a);else if(L(a))a=Ca(a,
      {}),r(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw eb("isrcharg");break;default:D(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:ad("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};r([$c,dc,cc],function(a){a.prototype=Object.create(Qf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==cc||!this.$$html5)throw eb("nostate");this.$$state=D(c)?null:c;return this}});
      var ja=v("$parse"),Rf=Function.prototype.call,Sf=Function.prototype.apply,Tf=Function.prototype.bind,Ib=pa();r({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;Ib[c]=a});Ib["this"]=function(a){return a};Ib["this"].sharedGetter=!0;var jb=H(pa(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return A(d)?A(e)?d+e:d:A(e)?e:t},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(A(d)?d:0)-(A(e)?e:0)},
      "*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,
      c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Uf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();
      else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=jb[c],f=jb[d];jb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+
      a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=A(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw ja("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<
      this.text.length;){var d=Q(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=
      this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):
      d+=Uf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var fb=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};fb.ZERO=H(function(){return 0},{sharedGetter:!0,constant:!0});fb.prototype={constructor:fb,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);
      a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=
      this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw ja("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw ja("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=
      this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw ja("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=jb[a];return H(function(a,f){return d(a,f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,c,d,e){var f=jb[c];return H(function(c,e){return f(c,e,a,d)},{constant:a.constant&&d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&
      this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return Ib[a]||cd(a,this.options,this.text)},constant:function(){var a=this.consume().value;return H(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=
      this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return H(function(f,h){var k=a(f,h);if(e){e[0]=k;for(k=d.length;k--;)e[k+1]=d[k](f,h);return c.apply(t,e)}return c(k)},{constant:!c.$stateful&&f.every(ec),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;
      return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),H(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&(c=this.assignment(),this.consume(":"))){var d=this.assignment();return H(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},logicalOR:function(){for(var a=this.logicalAND(),
      c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.text,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.text,this.relational());return a},additive:function(){for(var a=
      this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(fb.ZERO,a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=this.text,d=this.consume().text,e=cd(d,this.options,
      c);return H(function(c,d,h){return e(h||a(c,d))},{assign:function(e,g,h){(h=a(e,h))||a.assign(e,h={});return Oa(h,d,g,c)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return H(function(e,f){var g=a(e,f),h=d(e,f);qa(h,c);return g?ra(g[h],c):t},{assign:function(e,f,g){var h=qa(d(e,g),c);(g=ra(a(e,g),c))||a.assign(e,g={});return g[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");
      var e=this.text,f=d.length?[]:null;return function(g,h){var k=c?c(g,h):g,l=a(g,h,k)||w;if(f)for(var m=d.length;m--;)f[m]=ra(d[m](g,h),e);ra(k,e);if(l){if(l.constructor===l)throw ja("isecfn",e);if(l===Rf||l===Sf||l===Tf)throw ja("isecff",e);}k=l.apply?l.apply(k,f):l(f[0],f[1],f[2],f[3],f[4]);return ra(k,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return H(function(c,d){for(var e=
      [],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(ec),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))}this.consume("}");return H(function(d,f){for(var g={},h=0,k=c.length;h<k;h++)g[a[h]]=c[h](d,f);return g},{literal:!0,constant:c.every(ec),
      inputs:c})}};var zf=pa(),yf=pa(),Af=Object.prototype.valueOf,Ba=v("$sce"),ka={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ia=v("$compile"),Z=U.createElement("a"),gd=Aa(T.location.href);Cc.$inject=["$provide"];hd.$inject=["$locale"];jd.$inject=["$locale"];var md=".",Jf={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:Db("Month"),MMM:Db("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",
      2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:Db("Day"),EEE:Db("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Cb(Math[0<a?"floor":"ceil"](a/60),2)+Cb(Math.abs(a%60),2))},ww:od(2),w:od(1)},If=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,Hf=/^\-?\d+$/;id.$inject=["$locale"];var Ff=ba(Q),Gf=ba(rb);
      kd.$inject=["$parse"];var Rd=ba({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===Ja.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}),sb={};r(yb,function(a,c){if("multiple"!=a){var d=wa("ng-"+c);sb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});r(Mc,function(a,c){sb[c]=function(){return{priority:100,
      link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Lf))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});r(["src","srcset","href"],function(a){var c=wa("ng-"+a);sb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Ja.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(h,c),Ha&&g&&e.prop(g,f[h])):"href"===
      a&&f.$set(h,null)})}}}});var Eb={$addControl:w,$$renameControl:function(a,c){a.$name=c},$removeControl:w,$setValidity:w,$setDirty:w,$setPristine:w,$setSubmitted:w};pd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var wd=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:pd,compile:function(a){a.addClass(Qa).addClass(ib);return{pre:function(a,d,g,h){if(!("action"in g)){var k=function(c){a.$apply(function(){h.$commitViewValue();h.$setSubmitted()});
      c.preventDefault?c.preventDefault():c.returnValue=!1};d[0].addEventListener("submit",k,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",k,!1)},0,!1)})}var l=h.$$parentForm,m=h.$name;m&&(Oa(a,m,h,m),g.$observe(g.name?"name":"ngForm",function(c){m!==c&&(Oa(a,m,t,m),m=c,Oa(a,m,h,m),l.$$renameControl(h,m))}));d.on("$destroy",function(){l.$removeControl(h);m&&Oa(a,m,t,m);H(h,Eb)})}}}}}]},Sd=wd(),ee=wd(!0),Kf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
      Vf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Wf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Xf=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,xd=/^(\d{4})-(\d{2})-(\d{2})$/,yd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,jc=/^(\d{4})-W(\d\d)$/,zd=/^(\d{4})-(\d\d)$/,Ad=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Yf=/(\s+|^)default(\s+|$)/,Hb=new v("ngModel"),Bd={text:function(a,c,d,e,f,g){gb(a,
      c,d,e,f,g);hc(e)},date:hb("date",xd,Gb(xd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":hb("datetimelocal",yd,Gb(yd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:hb("time",Ad,Gb(Ad,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:hb("week",jc,function(a,c){if(ea(a))return a;if(I(a)){jc.lastIndex=0;var d=jc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,k=0,l=nd(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),k=c.getMilliseconds());return new Date(e,0,l.getDate()+
      f,d,g,h,k)}}return NaN},"yyyy-Www"),month:hb("month",zd,Gb(zd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){rd(a,c,d,e);gb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:Xf.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!W(a))throw Hb("numfmt",a);a=a.toString()}return a});if(d.min||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||D(h)||a>=h};d.$observe("min",function(a){A(a)&&!W(a)&&(a=parseFloat(a,
      10));h=W(a)&&!isNaN(a)?a:t;e.$validate()})}if(d.max||d.ngMax){var k;e.$validators.max=function(a){return e.$isEmpty(a)||D(k)||a<=k};d.$observe("max",function(a){A(a)&&!W(a)&&(a=parseFloat(a,10));k=W(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e);e.$$parserName="url";e.$validators.url=function(a){return e.$isEmpty(a)||Vf.test(a)}},email:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e);e.$$parserName="email";e.$validators.email=function(a){return e.$isEmpty(a)||Wf.test(a)}},
      radio:function(a,c,d,e){D(d.name)&&c.attr("name",++kb);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,k){var l=sd(k,a,"ngTrueValue",d.ngTrueValue,!0),m=sd(k,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==l};e.$formatters.push(function(a){return na(a,
      l)});e.$parsers.push(function(a){return a?l:m})},hidden:w,button:w,submit:w,reset:w,file:w},wc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,k){k[0]&&(Bd[Q(h.type)]||Bd.text)(f,g,h,k[0],c,a,d,e)}}}}],ib="ng-valid",td="ng-invalid",Qa="ng-pristine",Fb="ng-dirty",vd="ng-pending",Zf=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,k,l,
      m){this.$modelValue=this.$viewValue=Number.NaN;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=m(d.name||"",!1)(a);var p=f(d.ngModel),q=null,n=this,s=function(){var c=p(a);n.$options&&n.$options.getterSetter&&u(c)&&(c=c());return c},O=function(c){var d;n.$options&&n.$options.getterSetter&&
      u(d=p(a))?d(n.$modelValue):p.assign(a,n.$modelValue)};this.$$setOptions=function(a){n.$options=a;if(!(p.assign||a&&a.getterSetter))throw Hb("nonassign",d.ngModel,ua(e));};this.$render=w;this.$isEmpty=function(a){return D(a)||""===a||null===a||a!==a};var E=e.inheritedData("$formController")||Eb,x=0;qd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:E,$animate:g});this.$setPristine=function(){n.$dirty=!1;n.$pristine=!0;g.removeClass(e,Fb);g.addClass(e,Qa)};
      this.$setUntouched=function(){n.$touched=!1;n.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){n.$touched=!0;n.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(q);n.$viewValue=n.$$lastCommittedViewValue;n.$render()};this.$validate=function(){W(n.$modelValue)&&isNaN(n.$modelValue)||this.$$parseAndValidate()};this.$$runValidators=function(a,c,d,e){function f(){var a=!0;r(n.$validators,function(e,f){var g=e(c,d);
      a=a&&g;h(f,g)});return a?!0:(r(n.$asyncValidators,function(a,c){h(c,null)}),!1)}function g(){var a=[],e=!0;r(n.$asyncValidators,function(f,g){var k=f(c,d);if(!k||!u(k.then))throw Hb("$asyncValidators",k);h(g,t);a.push(k.then(function(){h(g,!0)},function(a){e=!1;h(g,!1)}))});a.length?l.all(a).then(function(){k(e)},w):k(!0)}function h(a,c){m===x&&n.$setValidity(a,c)}function k(a){m===x&&e(a)}x++;var m=x;(function(a){var c=n.$$parserName||"parse";if(a===t)h(c,null);else if(h(c,a),!a)return r(n.$validators,
      function(a,c){h(c,null)}),r(n.$asyncValidators,function(a,c){h(c,null)}),!1;return!0})(a)?f()?g():k(!1):k(!1)};this.$commitViewValue=function(){var a=n.$viewValue;h.cancel(q);if(n.$$lastCommittedViewValue!==a||""===a&&n.$$hasNativeValidators)n.$$lastCommittedViewValue=a,n.$pristine&&(n.$dirty=!0,n.$pristine=!1,g.removeClass(e,Qa),g.addClass(e,Fb),E.$setDirty()),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var a=n.$$lastCommittedViewValue,c=a,d=D(c)?t:!0;if(d)for(var e=0;e<n.$parsers.length;e++)if(c=
      n.$parsers[e](c),D(c)){d=!1;break}W(n.$modelValue)&&isNaN(n.$modelValue)&&(n.$modelValue=s());var f=n.$modelValue,g=n.$options&&n.$options.allowInvalid;g&&(n.$modelValue=c,n.$modelValue!==f&&n.$$writeModelToScope());n.$$runValidators(d,c,a,function(a){g||(n.$modelValue=a?c:t,n.$modelValue!==f&&n.$$writeModelToScope())})};this.$$writeModelToScope=function(){O(n.$modelValue);r(n.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=function(a,c){n.$viewValue=a;n.$options&&!n.$options.updateOnDefault||
      n.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=n.$options;e&&A(e.debounce)&&(e=e.debounce,W(e)?d=e:W(e[c])?d=e[c]:W(e["default"])&&(d=e["default"]));h.cancel(q);d?q=h(function(){n.$commitViewValue()},d):k.$$phase?n.$commitViewValue():a.$apply(function(){n.$commitViewValue()})};a.$watch(function(){var a=s();if(a!==n.$modelValue){n.$modelValue=a;for(var c=n.$formatters,d=c.length,e=a;d--;)e=c[d](e);n.$viewValue!==e&&(n.$viewValue=n.$$lastCommittedViewValue=e,n.$render(),
      n.$$runValidators(t,a,e,w))}return a})}],te=function(){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Zf,priority:1,compile:function(a){a.addClass(Qa).addClass("ng-untouched").addClass(ib);return{pre:function(a,d,e,f){var g=f[0],h=f[1]||Eb;g.$$setOptions(f[2]&&f[2].$options);h.$addControl(g);e.$observe("name",function(a){g.$name!==a&&h.$$renameControl(g,a)});a.$on("$destroy",function(){h.$removeControl(g)})},post:function(a,d,e,f){var g=f[0];if(g.$options&&g.$options.updateOn)d.on(g.$options.updateOn,
      function(a){g.$$debounceViewValueCommit(a&&a.type)});d.on("blur",function(d){g.$touched||a.$apply(function(){g.$setTouched()})})}}}}},ve=ba({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),yc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a){return!d.required||!e.$isEmpty(a)},d.$observe("required",function(){e.$validate()}))}}},xc=function(){return{restrict:"A",
      require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){I(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw v("ngPattern")("noregexp",g,a,ua(c));f=a||t;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||D(f)||f.test(a)}}}}},Ac=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("maxlength",function(a){f=aa(a)||0;e.$validate()});e.$validators.maxlength=function(a,c){return e.$isEmpty(a)||
      c.length<=f}}}}},zc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=aa(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(a)||c.length>=f}}}}},ue=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?P(f):f;e.$parsers.push(function(a){if(!D(a)){var c=[];a&&r(a.split(h),function(a){a&&c.push(g?P(a):a)});return c}});
      e.$formatters.push(function(a){return G(a)?a.join(f):t});e.$isEmpty=function(a){return!a||!a.length}}}},$f=/^(true|false|\d+)$/,we=function(){return{restrict:"A",priority:100,compile:function(a,c){return $f.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},xe=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==t?
      (this.$options.updateOnDefault=!1,this.$options.updateOn=P(this.$options.updateOn.replace(Yf,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Xd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],Zd=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,
      f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===t?"":a})}}}}],Yd=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],$d=ic("",!0),be=ic("Odd",0),ae=ic("Even",
      1),ce=Ia({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),de=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Bc={},ag={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=wa("ng-"+a);Bc[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=d(g[c],null,!0);return function(c,d){d.on(a,
      function(d){var f=function(){h(c,{$event:d})};ag[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ge=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,k,l;c.$watch(e.ngIf,function(c){c?k||g(function(c,f){k=f;c[c.length++]=U.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(l&&(l.remove(),l=null),k&&(k.$destroy(),k=null),h&&(l=qb(h.clone),a.leave(l).then(function(){l=null}),
      h=null))})}}}],he=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:va.noop,compile:function(f,g){var h=g.ngInclude||g.src,k=g.onload||"",l=g.autoscroll;return function(f,g,q,n,r){var t=0,E,x,B,v=function(){x&&(x.remove(),x=null);E&&(E.$destroy(),E=null);B&&(d.leave(B).then(function(){x=null}),x=B,B=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=function(){!A(l)||l&&!f.$eval(l)||c()},q=
      ++t;e?(a(e,!0).then(function(a){if(q===t){var c=f.$new();n.template=a;a=r(c,function(a){v();d.enter(a,null,g).then(h)});E=c;B=a;E.$emit("$includeContentLoaded",e);f.$eval(k)}},function(){q===t&&(v(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(v(),n.template=null)})}}}}],ye=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Ec(f.template,U).childNodes)(c,function(a){d.append(a)},
      {futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ie=Ia({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),je=Ia({terminal:!0,priority:1E3}),ke=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,f,g){var h=g.count,k=g.$attr.when&&f.attr(g.$attr.when),l=g.offset||0,m=e.$eval(k)||{},p={},q=c.startSymbol(),n=c.endSymbol(),s=/^when(Minus)?(.+)$/;r(g,function(a,c){s.test(c)&&(m[Q(c.replace("when","").replace("Minus",
      "-"))]=f.attr(g.$attr[c]))});r(m,function(a,e){p[e]=c(a.replace(d,q+h+"-"+l+n))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in m||(c=a.pluralCat(c-l));return p[c](e)},function(a){f.text(a)})}}}],le=["$parse","$animate",function(a,c){var d=v("ngRepeat"),e=function(a,c,d,e,l,m,p){a[d]=e;l&&(a[l]=m);a.$index=c;a.$first=0===c;a.$last=c===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,
      $$tlb:!0,compile:function(f,g){var h=g.ngRepeat,k=U.createComment(" end ngRepeat: "+h+" "),l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw d("iexp",h);var m=l[1],p=l[2],q=l[3],n=l[4],l=m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",m);var s=l[3]||l[1],A=l[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(q)))throw d("badident",
      q);var v,x,B,J,z={$id:Ma};n?v=a(n):(B=function(a,c){return Ma(c)},J=function(a){return a});return function(a,f,g,l,n){v&&(x=function(c,d,e){A&&(z[A]=c);z[s]=d;z.$index=e;return v(a,z)});var m=pa();a.$watchCollection(p,function(g){var l,p,C=f[0],v,z=pa(),E,H,w,D,G,u,I;q&&(a[q]=g);if(Ra(g))G=g,p=x||B;else{p=x||J;G=[];for(I in g)g.hasOwnProperty(I)&&"$"!=I.charAt(0)&&G.push(I);G.sort()}E=G.length;I=Array(E);for(l=0;l<E;l++)if(H=g===G?l:G[l],w=g[H],D=p(H,w,l),m[D])u=m[D],delete m[D],z[D]=u,I[l]=u;else{if(z[D])throw r(I,
      function(a){a&&a.scope&&(m[a.id]=a)}),d("dupes",h,D,w);I[l]={id:D,scope:t,clone:t};z[D]=!0}for(v in m){u=m[v];D=qb(u.clone);c.leave(D);if(D[0].parentNode)for(l=0,p=D.length;l<p;l++)D[l].$$NG_REMOVED=!0;u.scope.$destroy()}for(l=0;l<E;l++)if(H=g===G?l:G[l],w=g[H],u=I[l],u.scope){v=C;do v=v.nextSibling;while(v&&v.$$NG_REMOVED);u.clone[0]!=v&&c.move(qb(u.clone),null,y(C));C=u.clone[u.clone.length-1];e(u.scope,l,s,w,A,H,E)}else n(function(a,d){u.scope=d;var f=k.cloneNode(!1);a[a.length++]=f;c.enter(a,
      null,y(C));C=f;u.clone=a;z[u.id]=u;e(u.scope,l,s,w,A,H,E)});m=z})}}}}],me=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],fe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ne=Ia(function(a,c,d){a.$watch(d.ngStyle,
      function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),oe=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],k=[],l=[],m=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=k.length;d<e;++d)a.cancel(k[d]);d=k.length=0;for(e=l.length;d<e;++d){var s=qb(h[d].clone);l[d].$destroy();(k[d]=a.leave(s)).then(m(k,d))}h.length=0;l.length=0;
      (g=f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=U.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],pe=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),qe=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,
      link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),se=Ia({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw v("ngTransclude")("orphan",ua(c));f(function(a){c.empty();c.append(a)})}}),Td=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],bg=v("ngOptions"),re=ba({restrict:"A",terminal:!0}),Ud=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
      e={$setViewValue:w};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var k=this,l={},m=e,p;k.databound=d.ngModel;k.init=function(a,c,d){m=a;p=d};k.addOption=function(c,d){La(c,'"option value"');l[c]=!0;m.$viewValue==c&&(a.val(c),p.parent()&&p.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};k.removeOption=function(a){this.hasOption(a)&&(delete l[a],m.$viewValue==a&&this.renderUnknownOption(a))};k.renderUnknownOption=function(c){c=
      "? "+Ma(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",!0)};k.hasOption=function(a){return l.hasOwnProperty(a)};c.$on("$destroy",function(){k.renderUnknownOption=w})}],link:function(e,g,h,k){function l(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(z.parent()&&z.remove(),c.val(a),""===a&&u.prop("selected",!0)):D(a)&&u?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){z.parent()&&z.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;
      d.$render=function(){var a=new cb(d.$viewValue);r(c.find("option"),function(c){c.selected=A(a.get(c.value))})};a.$watch(function(){na(e,d.$viewValue)||(e=ta(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(a,c,d){T[z]=d;F&&(T[F]=c);return a(e,T)}function k(a){var c;if(n)if(L&&G(a)){c=new cb([]);for(var d=0;d<a.length;d++)c.put(h(L,null,a[d]),!0)}else c=
      new cb(a);else L&&(a=h(L,null,a));return function(d,e){var f;f=L?L:w?w:E;return n?A(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){x||(e.$$postDigest(p),x=!0)}function m(a,c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function p(){x=!1;var a={"":[]},c=[""],d,l,s,t,u;s=g.$viewValue;t=N(e)||[];var z=F?Object.keys(t).sort():t,w,y,G,E,S={};u=k(s);var P=!1,U,W;R={};for(E=0;G=z.length,E<G;E++){w=E;if(F&&(w=z[E],"$"===w.charAt(0)))continue;y=t[w];d=h(I,w,y)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=u(w,y);P=P||d;y=h(D,w,y);
      y=A(y)?y:"";W=L?L(e,T):F?z[E]:E;L&&(R[W]=w);l.push({id:W,label:y,selected:d})}n||(v||null===s?a[""].unshift({id:"",label:"",selected:!P}):P||a[""].unshift({id:"?",label:"",selected:!0}));w=0;for(z=c.length;w<z;w++){d=c[w];l=a[d];Q.length<=w?(s={element:H.clone().attr("label",d),label:l.label},t=[s],Q.push(t),f.append(s.element)):(t=Q[w],s=t[0],s.label!=d&&s.element.attr("label",s.label=d));P=null;E=0;for(G=l.length;E<G;E++)d=l[E],(u=t[E+1])?(P=u.element,u.label!==d.label&&(m(S,u.label,!1),m(S,d.label,
      !0),P.text(u.label=d.label),P.prop("label",u.label)),u.id!==d.id&&P.val(u.id=d.id),P[0].selected!==d.selected&&(P.prop("selected",u.selected=d.selected),Ha&&P.prop("selected",u.selected))):(""===d.id&&v?U=v:(U=B.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),t.push(u={element:U,label:d.label,id:d.id,selected:d.selected}),m(S,d.label,!0),P?P.after(U):s.element.append(U),P=U);for(E++;t.length>E;)d=t.pop(),m(S,d.label,!1),d.element.remove();
      r(S,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}for(;Q.length>w;)Q.pop()[0].element.remove()}var u;if(!(u=s.match(d)))throw bg("iexp",s,ua(f));var D=c(u[2]||u[1]),z=u[4]||u[6],y=/ as /.test(u[0])&&u[1],w=y?c(y):null,F=u[5],I=c(u[3]||""),E=c(u[2]?u[1]:z),N=c(u[7]),L=u[8]?c(u[8]):null,R={},Q=[[{element:f,label:""}]],T={};v&&(a(v)(e),v.removeClass("ng-scope"),v.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=N(e)||[],c;if(n)c=[],r(f.val(),function(d){d=L?R[d]:d;c.push("?"===
      d?t:""===d?null:h(w?w:E,d,a[d]))});else{var d=L?R[f.val()]:f.val();c="?"===d?t:""===d?null:h(w?w:E,d,a[d])}g.$setViewValue(c);p()})});g.$render=p;e.$watchCollection(N,l);e.$watchCollection(function(){var a=N(e),c;if(a&&G(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(D,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(D,d,a[d]));return c},l);n&&e.$watchCollection(function(){return g.$modelValue},l)}if(k[1]){var q=k[0];k=k[1];var n=h.multiple,s=h.ngOptions,v=!1,u,x=!1,B=y(U.createElement("option")),
      H=y(U.createElement("optgroup")),z=B.clone();h=0;for(var F=g.children(),w=F.length;h<w;h++)if(""===F[h].value){u=v=F.eq(h);break}q.init(k,v,z);n&&(k.$isEmpty=function(a){return!a||0===a.length});s?p(e,g,k):n?m(e,g,k):l(e,g,k,q)}}}}],Wd=["$interpolate",function(a){var c={addOption:w,removeOption:w};return{restrict:"E",priority:100,compile:function(d,e){if(D(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var l=d.parent(),m=l.data("$selectController")||l.parent().data("$selectController");
      m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,d)}):m.addOption(e.value,d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Vd=ba({restrict:"E",terminal:!1});T.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Ld(),Nd(va),y(U).ready(function(){Hd(U,sc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
      
      
  this["angular"] = angular;
  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, "angular");
});

System.register("github:angular/bower-angular-animate@1.3.3/angular-animate", ["angular"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["angular"]);
  (function() {  /* */
      "format global";"deps angular";!function(n,t,e){"use strict";t.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){var n="$$ngAnimateChildren";return function(e,a,i){var r=i.ngAnimateChildren;t.isString(r)&&0===r.length?a.data(n,!0):e.$watch(r,function(t){a.data(n,!!t)})}}).factory("$$animateReflow",["$$rAF","$document",function(n,t){var e=t[0].body;return function(t){return n(function(){e.offsetWidth+1;t()})}}]).config(["$provide","$animateProvider",function(a,i){function r(n){for(var t=0;t<n.length;t++){var e=n[t];if(e.nodeType==g)return e}}function s(n){return n&&t.element(n)}function o(n){return t.element(r(n))}function u(n,t){return r(n)==r(t)}var l=t.noop,c=t.forEach,f=i.$$selectors,v=t.isArray,d=t.isString,m=t.isObject,g=1,p="$$ngAnimateState",C="$$ngAnimateChildren",h="ng-animate",$={running:!0};a.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest",function(n,e,a,g,b,y,D,A,w){function k(n,t){var e=n.data(p)||{};return t&&(e.running=!0,e.structural=!0,n.data(p,e)),e.disabled||e.running&&e.structural}function x(n){var t,a=e.defer();return a.promise.$$cancelFn=function(){t&&t()},D.$$postDigest(function(){t=n(function(){a.resolve()})}),a.promise}function S(n){return m(n)?(n.tempClasses&&d(n.tempClasses)&&(n.tempClasses=n.tempClasses.split(/\s+/)),n):void 0}function B(n,t,e){e=e||{};var a={};c(e,function(n,t){c(t.split(" "),function(t){a[t]=n})});var i=Object.create(null);c((n.attr("class")||"").split(/\s+/),function(n){i[n]=!0});var r=[],s=[];return c(t&&t.classes||[],function(n,t){var e=i[t],o=a[t]||{};n===!1?(e||"addClass"==o.event)&&s.push(t):n===!0&&(e&&"removeClass"!=o.event||r.push(t))}),r.length+s.length>0&&[r.join(" "),s.join(" ")]}function F(n){if(n){var t=[],e={},i=n.substr(1).split(".");(g.transitions||g.animations)&&t.push(a.get(f[""]));for(var r=0;r<i.length;r++){var s=i[r],o=f[s];o&&!e[s]&&(t.push(a.get(o)),e[s]=!0)}return t}}function M(n,e,a,i){function r(n,t){var e=n[t],a=n["before"+t.charAt(0).toUpperCase()+t.substr(1)];return e||a?("leave"==t&&(a=e,e=null),D.push({event:t,fn:e}),$.push({event:t,fn:a}),!0):void 0}function s(t,e,r){function s(n){if(e){if((e[n]||l)(),++v<o.length)return;e=null}r()}var o=[];c(t,function(n){n.fn&&o.push(n)});var v=0;c(o,function(t,r){var o=function(){s(r)};switch(t.event){case"setClass":e.push(t.fn(n,u,f,o,i));break;case"animate":e.push(t.fn(n,a,i.from,i.to,o));break;case"addClass":e.push(t.fn(n,u||a,o,i));break;case"removeClass":e.push(t.fn(n,f||a,o,i));break;default:e.push(t.fn(n,o,i))}}),e&&0===e.length&&r()}var o=n[0];if(o){i&&(i.to=i.to||{},i.from=i.from||{});var u,f;v(a)&&(u=a[0],f=a[1],u?f?a=u+" "+f:(a=u,e="addClass"):(a=f,e="removeClass"));var d="setClass"==e,m=d||"addClass"==e||"removeClass"==e||"animate"==e,g=n.attr("class"),p=g+" "+a;if(j(p)){var C=l,h=[],$=[],b=l,y=[],D=[],A=(" "+p).replace(/\s+/g,".");return c(F(A),function(n){var t=r(n,e);!t&&d&&(r(n,"addClass"),r(n,"removeClass"))}),{node:o,event:e,className:a,isClassBased:m,isSetClassOperation:d,applyStyles:function(){i&&n.css(t.extend(i.from||{},i.to||{}))},before:function(n){C=n,s($,h,function(){C=l,n()})},after:function(n){b=n,s(D,y,function(){b=l,n()})},cancel:function(){h&&(c(h,function(n){(n||l)(!0)}),C(!0)),y&&(c(y,function(n){(n||l)(!0)}),b(!0))}}}}}function E(n,e,a,i,r,s,o,u){function f(t){var i="$animate:"+t;D&&D[i]&&D[i].length>0&&y(function(){a.triggerHandler(i,{event:n,className:e})})}function v(){f("before")}function d(){f("after")}function m(){f("close"),u()}function g(){g.hasBeenRun||(g.hasBeenRun=!0,s())}function C(){if(!C.hasBeenRun){b&&b.applyStyles(),C.hasBeenRun=!0,o&&o.tempClasses&&c(o.tempClasses,function(n){a.removeClass(n)});var t=a.data(p);t&&(b&&b.isClassBased?N(a,e):(y(function(){var t=a.data(p)||{};R==t.index&&N(a,e,n)}),a.data(p,t))),m()}}var $=l,b=M(a,n,e,o);if(!b)return g(),v(),d(),C(),$;n=b.event,e=b.className;var D=t.element._data(b.node);if(D=D&&D.events,i||(i=r?r.parent():a.parent()),O(a,i))return g(),v(),d(),C(),$;var A=a.data(p)||{},w=A.active||{},k=A.totalActive||0,x=A.last,S=!1;if(k>0){var B=[];if(b.isClassBased){if("setClass"==x.event)B.push(x),N(a,e);else if(w[e]){var F=w[e];F.event==n?S=!0:(B.push(F),N(a,e))}}else if("leave"==n&&w["ng-leave"])S=!0;else{for(var E in w)B.push(w[E]);A={},N(a,!0)}B.length>0&&c(B,function(n){n.cancel()})}if(!b.isClassBased||b.isSetClassOperation||"animate"==n||S||(S="addClass"==n==a.hasClass(e)),S)return g(),v(),d(),m(),$;w=A.active||{},k=A.totalActive||0,"leave"==n&&a.one("$destroy",function(){var n=t.element(this),e=n.data(p);if(e){var a=e.active["ng-leave"];a&&(a.cancel(),N(n,"ng-leave"))}}),a.addClass(h),o&&o.tempClasses&&c(o.tempClasses,function(n){a.addClass(n)});var R=I++;return k++,w[e]=b,a.data(p,{last:b,active:w,index:R,totalActive:k}),v(),b.before(function(t){var i=a.data(p);t=t||!i||!i.active[e]||b.isClassBased&&i.active[e].event!=n,g(),t===!0?C():(d(),b.after(C))}),b.cancel}function R(n){var e=r(n);if(e){var a=t.isFunction(e.getElementsByClassName)?e.getElementsByClassName(h):e.querySelectorAll("."+h);c(a,function(n){n=t.element(n);var e=n.data(p);e&&e.active&&c(e.active,function(n){n.cancel()})})}}function N(n,t){if(u(n,b))$.disabled||($.running=!1,$.structural=!1);else if(t){var e=n.data(p)||{},a=t===!0;!a&&e.active&&e.active[t]&&(e.totalActive--,delete e.active[t]),(a||!e.totalActive)&&(n.removeClass(h),n.removeData(p))}}function O(n,e){if($.disabled)return!0;if(u(n,b))return $.running;var a,i,r;do{if(0===e.length)break;var s=u(e,b),o=s?$:e.data(p)||{};if(o.disabled)return!0;if(s&&(r=!0),a!==!1){var l=e.data(C);t.isDefined(l)&&(a=l)}i=i||o.running||o.last&&!o.last.isClassBased}while(e=e.parent());return!r||!a&&i}b.data(p,$);var T=D.$watch(function(){return w.totalPendingRequests},function(n){0===n&&(T(),D.$$postDigest(function(){D.$$postDigest(function(){$.running=!1})}))}),I=0,P=i.classNameFilter(),j=P?function(n){return P.test(n)}:function(){return!0};return{animate:function(n,t,e,a,i){return a=a||"ng-inline-animate",i=S(i)||{},i.from=e?t:null,i.to=e?e:t,x(function(t){return E("animate",a,o(n),null,null,l,i,t)})},enter:function(e,a,i,r){return r=S(r),e=t.element(e),a=s(a),i=s(i),k(e,!0),n.enter(e,a,i),x(function(n){return E("enter","ng-enter",o(e),a,i,l,r,n)})},leave:function(e,a){return a=S(a),e=t.element(e),R(e),k(e,!0),x(function(t){return E("leave","ng-leave",o(e),null,null,function(){n.leave(e)},a,t)})},move:function(e,a,i,r){return r=S(r),e=t.element(e),a=s(a),i=s(i),R(e),k(e,!0),n.move(e,a,i),x(function(n){return E("move","ng-move",o(e),a,i,l,r,n)})},addClass:function(n,t,e){return this.setClass(n,t,[],e)},removeClass:function(n,t,e){return this.setClass(n,[],t,e)},setClass:function(e,a,i,s){s=S(s);var u="$$animateClasses";if(e=t.element(e),e=o(e),k(e))return n.$$setClassImmediately(e,a,i,s);var l,f=e.data(u),d=!!f;return f||(f={},f.classes={}),l=f.classes,a=v(a)?a:a.split(" "),c(a,function(n){n&&n.length&&(l[n]=!0)}),i=v(i)?i:i.split(" "),c(i,function(n){n&&n.length&&(l[n]=!1)}),d?(s&&f.options&&(f.options=t.extend(f.options||{},s)),f.promise):(e.data(u,f={classes:l,options:s}),f.promise=x(function(t){var a=e.parent(),i=r(e),s=i.parentNode;if(!s||s.$$NG_REMOVED||i.$$NG_REMOVED)return void t();var o=e.data(u);e.removeData(u);var l=e.data(p)||{},c=B(e,o,l.active);return c?E("setClass",c,e,a,null,function(){c[0]&&n.$$addClassImmediately(e,c[0]),c[1]&&n.$$removeClassImmediately(e,c[1])},o.options,t):t()}))},cancel:function(n){n.$$cancelFn()},enabled:function(n,t){switch(arguments.length){case 2:if(n)N(t);else{var e=t.data(p)||{};e.disabled=!0,t.data(p,e)}break;case 1:$.disabled=!n;break;default:n=!$.disabled}return!!n}}}]),i.register("",["$window","$sniffer","$timeout","$$animateReflow",function(a,i,s,o){function u(){O||(O=o(function(){z=[],O=null,H={}}))}function f(n,t){O&&O(),z.push(t),O=o(function(){c(z,function(n){n()}),z=[],O=null,H={}})}function m(n,e){var a=r(n);n=t.element(a),Q.push(n);var i=Date.now()+e;L>=i||(s.cancel(J),L=i,J=s(function(){p(Q),Q=[]},e,!1))}function p(n){c(n,function(n){var t=n.data(W);t&&c(t.closeAnimationFns,function(n){n()})})}function C(n,t){var e=t?H[t]:null;if(!e){var i=0,r=0,s=0,o=0;c(n,function(n){if(n.nodeType==g){var t=a.getComputedStyle(n)||{},e=t[F+T];i=Math.max(h(e),i);var u=t[F+P];r=Math.max(h(u),r);{t[E+P]}o=Math.max(h(t[E+P]),o);var l=h(t[E+T]);l>0&&(l*=parseInt(t[E+j],10)||1),s=Math.max(l,s)}}),e={total:0,transitionDelay:r,transitionDuration:i,animationDelay:o,animationDuration:s},t&&(H[t]=e)}return e}function h(n){var t=0,e=d(n)?n.split(/\s*,\s*/):[];return c(e,function(n){t=Math.max(parseFloat(n)||0,t)}),t}function $(n){var t=n.parent(),e=t.data(K);return e||(t.data(K,++U),e=U),e+"-"+r(n).getAttribute("class")}function b(n,t,e,a){var i=["ng-enter","ng-leave","ng-move"].indexOf(e)>=0,s=$(t),o=s+" "+e,u=H[o]?++H[o].total:0,l={};if(u>0){var c=e+"-stagger",f=s+" "+c,v=!H[f];v&&t.addClass(c),l=C(t,f),v&&t.removeClass(c)}t.addClass(e);var d=t.data(W)||{},m=C(t,o),g=m.transitionDuration,p=m.animationDuration;if(i&&0===g&&0===p)return t.removeClass(e),!1;var h=a||i&&g>0,b=p>0&&l.animationDelay>0&&0===l.animationDuration,y=d.closeAnimationFns||[];t.data(W,{stagger:l,cacheKey:o,running:d.running||0,itemIndex:u,blockTransition:h,closeAnimationFns:y});var w=r(t);return h&&(D(w,!0),a&&t.css(a)),b&&A(w,!0),!0}function y(n,t,e,a,i){function o(){t.off(P,u),t.removeClass(v),t.removeClass(d),T&&s.cancel(T),S(t,e);var n=r(t);for(var a in p)n.style.removeProperty(p[a])}function u(n){n.stopPropagation();var t=n.originalEvent||n,e=t.$manualTimeStamp||t.timeStamp||Date.now(),i=parseFloat(t.elapsedTime.toFixed(_));Math.max(e-I,0)>=E&&i>=B&&a()}var l=r(t),f=t.data(W);if(-1==l.getAttribute("class").indexOf(e)||!f)return void a();var v="",d="";c(e.split(" "),function(n,t){var e=(t>0?" ":"")+n;v+=e+"-active",d+=e+"-pending"});var g="",p=[],h=f.itemIndex,$=f.stagger,b=0;if(h>0){var y=0;$.transitionDelay>0&&0===$.transitionDuration&&(y=$.transitionDelay*h);var w=0;$.animationDelay>0&&0===$.animationDuration&&(w=$.animationDelay*h,p.push(N+"animation-play-state")),b=Math.round(100*Math.max(y,w))/100}b||(t.addClass(v),f.blockTransition&&D(l,!1));var k=f.cacheKey+" "+v,x=C(t,k),B=Math.max(x.transitionDuration,x.animationDuration);if(0===B)return t.removeClass(v),S(t,e),void a();!b&&i&&(x.transitionDuration||(t.css("transition",x.animationDuration+"s linear all"),p.push("transition")),t.css(i));var F=Math.max(x.transitionDelay,x.animationDelay),E=F*V;if(p.length>0){var O=l.getAttribute("style")||"";";"!==O.charAt(O.length-1)&&(O+=";"),l.setAttribute("style",O+" "+g)}var T,I=Date.now(),P=R+" "+M,j=(F+B)*G,q=(b+j)*V;return b>0&&(t.addClass(d),T=s(function(){T=null,x.transitionDuration>0&&D(l,!1),x.animationDuration>0&&A(l,!1),t.addClass(v),t.removeClass(d),i&&(0===x.transitionDuration&&t.css("transition",x.animationDuration+"s linear all"),t.css(i),p.push("transition"))},b*V,!1)),t.on(P,u),f.closeAnimationFns.push(function(){o(),a()}),f.running++,m(t,q),o}function D(n,t){n.style[F+I]=t?"none":""}function A(n,t){n.style[E+q]=t?"paused":""}function w(n,t,e,a){return b(n,t,e,a)?function(n){n&&S(t,e)}:void 0}function k(n,t,e,a,i){return t.data(W)?y(n,t,e,a,i):(S(t,e),void a())}function x(n,t,e,a,i){var r=w(n,t,e,i.from);if(!r)return u(),void a();var s=r;return f(t,function(){s=k(n,t,e,a,i.to)}),function(n){(s||l)(n)}}function S(n,t){n.removeClass(t);var e=n.data(W);e&&(e.running&&e.running--,e.running&&0!==e.running||n.removeData(W))}function B(n,t){var e="";return n=v(n)?n:n.split(/\s+/),c(n,function(n,a){n&&n.length>0&&(e+=(a>0?" ":"")+n+t)}),e}var F,M,E,R,N="";n.ontransitionend===e&&n.onwebkittransitionend!==e?(N="-webkit-",F="WebkitTransition",M="webkitTransitionEnd transitionend"):(F="transition",M="transitionend"),n.onanimationend===e&&n.onwebkitanimationend!==e?(N="-webkit-",E="WebkitAnimation",R="webkitAnimationEnd animationend"):(E="animation",R="animationend");var O,T="Duration",I="Property",P="Delay",j="IterationCount",q="PlayState",K="$$ngAnimateKey",W="$$ngAnimateCSS3Data",_=3,G=1.5,V=1e3,H={},U=0,z=[],J=null,L=0,Q=[];return{animate:function(n,t,e,a,i,r){return r=r||{},r.from=e,r.to=a,x("animate",n,t,i,r)},enter:function(n,t,e){return e=e||{},x("enter",n,"ng-enter",t,e)},leave:function(n,t,e){return e=e||{},x("leave",n,"ng-leave",t,e)},move:function(n,t,e){return e=e||{},x("move",n,"ng-move",t,e)},beforeSetClass:function(n,t,e,a,i){i=i||{};var r=B(e,"-remove")+" "+B(t,"-add"),s=w("setClass",n,r,i.from);return s?(f(n,a),s):(u(),void a())},beforeAddClass:function(n,t,e,a){a=a||{};var i=w("addClass",n,B(t,"-add"),a.from);return i?(f(n,e),i):(u(),void e())},beforeRemoveClass:function(n,t,e,a){a=a||{};var i=w("removeClass",n,B(t,"-remove"),a.from);return i?(f(n,e),i):(u(),void e())},setClass:function(n,t,e,a,i){i=i||{},e=B(e,"-remove"),t=B(t,"-add");var r=e+" "+t;return k("setClass",n,r,a,i.to)},addClass:function(n,t,e,a){return a=a||{},k("addClass",n,B(t,"-add"),e,a.to)},removeClass:function(n,t,e,a){return a=a||{},k("removeClass",n,B(t,"-remove"),e,a.to)}}}])}])}(window,window.angular);
      
  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("github:angular/bower-angular-sanitize@1.3.3/angular-sanitize", ["angular"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["angular"]);
  (function() {  /* */
      "format global";"deps angular";!function(e,t){"use strict";function r(){this.$get=["$$sanitizeUri",function(e){return function(t){var r=[];return i(t,l(r,function(t,r){return!/^unsafe/.test(e(t,r))})),r.join("")}}]}function n(e){var r=[],n=l(r,t.noop);return n.chars(e),r.join("")}function a(e){var t,r={},n=e.split(",");for(t=0;t<n.length;t++)r[n[t]]=!0;return r}function i(e,r){function n(e,n,i,o){if(n=t.lowercase(n),$[n])for(;k.last()&&C[k.last()];)a("",k.last());z[n]&&k.last()==n&&a("",n),o=y[n]||!!o,o||k.push(n);var l={};i.replace(p,function(e,t,r,n,a){var i=r||n||a||"";l[t]=s(i)}),r.start&&r.start(n,l,o)}function a(e,n){var a,i=0;if(n=t.lowercase(n))for(i=k.length-1;i>=0&&k[i]!=n;i--);if(i>=0){for(a=k.length-1;a>=i;a--)r.end&&r.end(k[a]);k.length=i}}"string"!=typeof e&&(e=null===e||"undefined"==typeof e?"":""+e);var i,o,l,x,k=[],v=e;for(k.last=function(){return k[k.length-1]};e;){if(x="",o=!0,k.last()&&D[k.last()]?(e=e.replace(new RegExp("(.*)<\\s*\\/\\s*"+k.last()+"[^>]*>","i"),function(e,t){return t=t.replace(g,"$1").replace(b,"$1"),r.chars&&r.chars(s(t)),""}),a("",k.last())):(0===e.indexOf("<!--")?(i=e.indexOf("--",4),i>=0&&e.lastIndexOf("-->",i)===i&&(r.comment&&r.comment(e.substring(4,i)),e=e.substring(i+3),o=!1)):m.test(e)?(l=e.match(m),l&&(e=e.replace(l[0],""),o=!1)):d.test(e)?(l=e.match(h),l&&(e=e.substring(l[0].length),l[0].replace(h,a),o=!1)):f.test(e)&&(l=e.match(u),l?(l[4]&&(e=e.substring(l[0].length),l[0].replace(u,n)),o=!1):(x+="<",e=e.substring(1))),o&&(i=e.indexOf("<"),x+=0>i?e:e.substring(0,i),e=0>i?"":e.substring(i),r.chars&&r.chars(s(x)))),e==v)throw c("badparse","The sanitizer was unable to parse the following block of html: {0}",e);v=e}a()}function s(e){if(!e)return"";var t=q.exec(e),r=t[1],n=t[3],a=t[2];return a&&(j.innerHTML=a.replace(/</g,"&lt;"),a="textContent"in j?j.textContent:j.innerText),r+a+n}function o(e){return e.replace(/&/g,"&amp;").replace(x,function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1);return"&#"+(1024*(t-55296)+(r-56320)+65536)+";"}).replace(k,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function l(e,r){var n=!1,a=t.bind(e,e.push);return{start:function(e,i,s){e=t.lowercase(e),!n&&D[e]&&(n=e),n||T[e]!==!0||(a("<"),a(e),t.forEach(i,function(n,i){var s=t.lowercase(i),l="img"===e&&"src"===s||"background"===s;S[s]!==!0||E[s]===!0&&!r(n,l)||(a(" "),a(i),a('="'),a(o(n)),a('"'))}),a(s?"/>":">"))},end:function(e){e=t.lowercase(e),n||T[e]!==!0||(a("</"),a(e),a(">")),e==n&&(n=!1)},chars:function(e){n||a(o(e))}}}var c=t.$$minErr("$sanitize"),u=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,h=/^<\/\s*([\w:-]+)[^>]*>/,p=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,f=/^</,d=/^<\//,g=/<!--(.*?)-->/g,m=/<!DOCTYPE([^>]*?)>/i,b=/<!\[CDATA\[(.*?)]]>/g,x=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,k=/([^\#-~| |!])/g,y=a("area,br,col,hr,img,wbr"),v=a("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),w=a("rp,rt"),z=t.extend({},w,v),$=t.extend({},v,a("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),C=t.extend({},w,a("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),A=a("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use"),D=a("script,style"),T=t.extend({},y,$,C,z,A),E=a("background,cite,href,longdesc,src,usemap,xlink:href"),F=a("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"),O=a("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan"),S=t.extend({},E,O,F),j=document.createElement("pre"),q=/^(\s*)([\s\S]*?)(\s*)$/;t.module("ngSanitize",[]).provider("$sanitize",r),t.module("ngSanitize").filter("linky",["$sanitize",function(e){var r=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,a=/^mailto:/;return function(i,s){function o(e){e&&f.push(n(e))}function l(e,r){f.push("<a "),t.isDefined(s)&&(f.push('target="'),f.push(s),f.push('" ')),f.push('href="'),f.push(e),f.push('">'),o(r),f.push("</a>")}if(!i)return i;for(var c,u,h,p=i,f=[];c=p.match(r);)u=c[0],c[2]==c[3]&&(u="mailto:"+u),h=c.index,o(p.substr(0,h)),l(u,c[0].replace(a,"")),p=p.substring(h+c[0].length);return o(p),e(f.join(""))}}])}(window,window.angular);
      
  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular", ["../css/ionic.css!","./ionic","angular","angular-animate","angular-sanitize","angular-ui-router"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["../css/ionic.css!","./ionic","angular","angular-animate","angular-sanitize","angular-ui-router"]);
  (function() {  /* */ 
      "format global";
      "deps ../css/ionic.css!";
      "deps ./ionic";
      "deps angular";
      "deps angular-animate";
      "deps angular-sanitize";
      "deps angular-ui-router";
      /*!
       * Copyright 2014 Drifty Co.
       * http://drifty.com/
       *
       * Ionic, v1.0.0-beta.13
       * A powerful HTML5 mobile app framework.
       * http://ionicframework.com/
       *
       * By @maxlynch, @benjsperry, @adamdbradley <3
       *
       * Licensed under the MIT license. Please see LICENSE for more information.
       *
       */
      
      (function() {
      /*
       * deprecated.js
       * https://github.com/wearefractal/deprecated/
       * Copyright (c) 2014 Fractal <contact@wearefractal.com>
       * License MIT
       */
      //Interval object
      var deprecated = {
        method: function(msg, log, fn) {
          var called = false;
          return function deprecatedMethod(){
            if (!called) {
              called = true;
              log(msg);
            }
            return fn.apply(this, arguments);
          };
        },
      
        field: function(msg, log, parent, field, val) {
          var called = false;
          var getter = function(){
            if (!called) {
              called = true;
              log(msg);
            }
            return val;
          };
          var setter = function(v) {
            if (!called) {
              called = true;
              log(msg);
            }
            val = v;
            return v;
          };
          Object.defineProperty(parent, field, {
            get: getter,
            set: setter,
            enumerable: true
          });
          return;
        }
      };
      
      
      var IonicModule = angular.module('ionic', ['ngAnimate', 'ngSanitize', 'ui.router']),
        extend = angular.extend,
        forEach = angular.forEach,
        isDefined = angular.isDefined,
        isString = angular.isString,
        jqLite = angular.element;
      
      
      /**
       * @ngdoc service
       * @name $ionicActionSheet
       * @module ionic
       * @description
       * The Action Sheet is a slide-up pane that lets the user choose from a set of options.
       * Dangerous options are highlighted in red and made obvious.
       *
       * There are easy ways to cancel out of the action sheet, such as tapping the backdrop or even
       * hitting escape on the keyboard for desktop testing.
       *
       * ![Action Sheet](http://ionicframework.com.s3.amazonaws.com/docs/controllers/actionSheet.gif)
       *
       * @usage
       * To trigger an Action Sheet in your code, use the $ionicActionSheet service in your angular controllers:
       *
       * ```js
       * angular.module('mySuperApp', ['ionic'])
       * .controller(function($scope, $ionicActionSheet, $timeout) {
       *
       *  // Triggered on a button click, or some other target
       *  $scope.show = function() {
       *
       *    // Show the action sheet
       *    var hideSheet = $ionicActionSheet.show({
       *      buttons: [
       *        { text: '<b>Share</b> This' },
       *        { text: 'Move' }
       *      ],
       *      destructiveText: 'Delete',
       *      titleText: 'Modify your album',
       *      cancelText: 'Cancel',
       *      cancel: function() {
                // add cancel code..
              },
       *      buttonClicked: function(index) {
       *        return true;
       *      }
       *    });
       *
       *    // For example's sake, hide the sheet after two seconds
       *    $timeout(function() {
       *      hideSheet();
       *    }, 2000);
       *
       *  };
       * });
       * ```
       *
       */
      IonicModule
      .factory('$ionicActionSheet', [
        '$rootScope',
        '$compile',
        '$animate',
        '$timeout',
        '$ionicTemplateLoader',
        '$ionicPlatform',
        '$ionicBody',
      function($rootScope, $compile, $animate, $timeout, $ionicTemplateLoader, $ionicPlatform, $ionicBody) {
      
        return {
          show: actionSheet
        };
      
        /**
         * @ngdoc method
         * @name $ionicActionSheet#show
         * @description
         * Load and return a new action sheet.
         *
         * A new isolated scope will be created for the
         * action sheet and the new element will be appended into the body.
         *
         * @param {object} options The options for this ActionSheet. Properties:
         *
         *  - `[Object]` `buttons` Which buttons to show.  Each button is an object with a `text` field.
         *  - `{string}` `titleText` The title to show on the action sheet.
         *  - `{string=}` `cancelText` the text for a 'cancel' button on the action sheet.
         *  - `{string=}` `destructiveText` The text for a 'danger' on the action sheet.
         *  - `{function=}` `cancel` Called if the cancel button is pressed, the backdrop is tapped or
         *     the hardware back button is pressed.
         *  - `{function=}` `buttonClicked` Called when one of the non-destructive buttons is clicked,
         *     with the index of the button that was clicked and the button object. Return true to close
         *     the action sheet, or false to keep it opened.
         *  - `{function=}` `destructiveButtonClicked` Called when the destructive button is clicked.
         *     Return true to close the action sheet, or false to keep it opened.
         *  -  `{boolean=}` `cancelOnStateChange` Whether to cancel the actionSheet when navigating
         *     to a new state.  Default true.
         *
         * @returns {function} `hideSheet` A function which, when called, hides & cancels the action sheet.
         */
        function actionSheet(opts) {
          var scope = $rootScope.$new(true);
      
          angular.extend(scope, {
            cancel: angular.noop,
            destructiveButtonClicked: angular.noop,
            buttonClicked: angular.noop,
            $deregisterBackButton: angular.noop,
            buttons: [],
            cancelOnStateChange: true
          }, opts || {});
      
      
          // Compile the template
          var element = scope.element = $compile('<ion-action-sheet buttons="buttons"></ion-action-sheet>')(scope);
      
          // Grab the sheet element for animation
          var sheetEl = jqLite(element[0].querySelector('.action-sheet-wrapper'));
      
          var stateChangeListenDone = scope.cancelOnStateChange ?
            $rootScope.$on('$stateChangeSuccess', function() { scope.cancel(); }) :
            angular.noop;
      
          // removes the actionSheet from the screen
          scope.removeSheet = function(done) {
            if (scope.removed) return;
      
            scope.removed = true;
            sheetEl.removeClass('action-sheet-up');
            $timeout(function(){
              // wait to remove this due to a 300ms delay native
              // click which would trigging whatever was underneath this
              $ionicBody.removeClass('action-sheet-open');
            }, 400);
            scope.$deregisterBackButton();
            stateChangeListenDone();
      
            $animate.removeClass(element, 'active', function() {
              scope.$destroy();
              element.remove();
              // scope.cancel.$scope is defined near the bottom
              scope.cancel.$scope = null;
              (done || angular.noop)();
            });
          };
      
          scope.showSheet = function(done) {
            if (scope.removed) return;
      
            $ionicBody.append(element)
                      .addClass('action-sheet-open');
      
            $animate.addClass(element, 'active', function() {
              if (scope.removed) return;
              (done || angular.noop)();
            });
            $timeout(function(){
              if (scope.removed) return;
              sheetEl.addClass('action-sheet-up');
            }, 20, false);
          };
      
          // registerBackButtonAction returns a callback to deregister the action
          scope.$deregisterBackButton = $ionicPlatform.registerBackButtonAction(
            function() {
              $timeout(scope.cancel);
            },
            PLATFORM_BACK_BUTTON_PRIORITY_ACTION_SHEET
          );
      
          // called when the user presses the cancel button
          scope.cancel = function() {
            // after the animation is out, call the cancel callback
            scope.removeSheet(opts.cancel);
          };
      
          scope.buttonClicked = function(index) {
            // Check if the button click event returned true, which means
            // we can close the action sheet
            if (opts.buttonClicked(index, opts.buttons[index]) === true) {
              scope.removeSheet();
            }
          };
      
          scope.destructiveButtonClicked = function() {
            // Check if the destructive button click event returned true, which means
            // we can close the action sheet
            if (opts.destructiveButtonClicked() === true) {
              scope.removeSheet();
            }
          };
      
          scope.showSheet();
      
          // Expose the scope on $ionicActionSheet's return value for the sake
          // of testing it.
          scope.cancel.$scope = scope;
      
          return scope.cancel;
        }
      }]);
      
      
      jqLite.prototype.addClass = function(cssClasses) {
        var x, y, cssClass, el, splitClasses, existingClasses;
        if (cssClasses && cssClasses != 'ng-scope' && cssClasses != 'ng-isolate-scope') {
          for(x=0; x<this.length; x++) {
            el = this[x];
            if(el.setAttribute) {
      
              if(cssClasses.indexOf(' ') < 0 && el.classList.add) {
                el.classList.add(cssClasses);
              } else {
                existingClasses = (' ' + (el.getAttribute('class') || '') + ' ')
                  .replace(/[\n\t]/g, " ");
                splitClasses = cssClasses.split(' ');
      
                for (y=0; y<splitClasses.length; y++) {
                  cssClass = splitClasses[y].trim();
                  if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
                    existingClasses += cssClass + ' ';
                  }
                }
                el.setAttribute('class', existingClasses.trim());
              }
            }
          }
        }
        return this;
      };
      
      jqLite.prototype.removeClass = function(cssClasses) {
        var x, y, splitClasses, cssClass, el;
        if (cssClasses) {
          for(x=0; x<this.length; x++) {
            el = this[x];
            if(el.getAttribute) {
              if(cssClasses.indexOf(' ') < 0 && el.classList.remove) {
                el.classList.remove(cssClasses);
              } else {
                splitClasses = cssClasses.split(' ');
      
                for (y=0; y<splitClasses.length; y++) {
                  cssClass = splitClasses[y];
                  el.setAttribute('class', (
                      (" " + (el.getAttribute('class') || '') + " ")
                      .replace(/[\n\t]/g, " ")
                      .replace(" " + cssClass.trim() + " ", " ")).trim()
                  );
                }
              }
            }
          }
        }
        return this;
      };
      
      /**
       * @ngdoc service
       * @name $ionicBackdrop
       * @module ionic
       * @description
       * Shows and hides a backdrop over the UI.  Appears behind popups, loading,
       * and other overlays.
       *
       * Often, multiple UI components require a backdrop, but only one backdrop is
       * ever needed in the DOM at a time.
       *
       * Therefore, each component that requires the backdrop to be shown calls
       * `$ionicBackdrop.retain()` when it wants the backdrop, then `$ionicBackdrop.release()`
       * when it is done with the backdrop.
       *
       * For each time `retain` is called, the backdrop will be shown until `release` is called.
       *
       * For example, if `retain` is called three times, the backdrop will be shown until `release`
       * is called three times.
       *
       * @usage
       *
       * ```js
       * function MyController($scope, $ionicBackdrop, $timeout) {
       *   //Show a backdrop for one second
       *   $scope.action = function() {
       *     $ionicBackdrop.retain();
       *     $timeout(function() {
       *       $ionicBackdrop.release();
       *     }, 1000);
       *   };
       * }
       * ```
       */
      IonicModule
      .factory('$ionicBackdrop', [
        '$document', '$timeout',
      function($document, $timeout) {
      
        var el = jqLite('<div class="backdrop">');
        var backdropHolds = 0;
      
        $document[0].body.appendChild(el[0]);
      
        return {
          /**
           * @ngdoc method
           * @name $ionicBackdrop#retain
           * @description Retains the backdrop.
           */
          retain: retain,
          /**
           * @ngdoc method
           * @name $ionicBackdrop#release
           * @description
           * Releases the backdrop.
           */
          release: release,
      
          getElement: getElement,
      
          // exposed for testing
          _element: el
        };
      
        function retain() {
          if ( (++backdropHolds) === 1 ) {
            el.addClass('visible');
            ionic.requestAnimationFrame(function() {
              backdropHolds && el.addClass('active');
            });
          }
        }
        function release() {
          if ( (--backdropHolds) === 0 ) {
            el.removeClass('active');
            $timeout(function() {
              !backdropHolds && el.removeClass('visible');
            }, 400, false);
          }
        }
      
        function getElement() {
          return el;
        }
      
      }]);
      
      /**
       * @private
       */
      IonicModule
      .factory('$ionicBind', ['$parse', '$interpolate', function($parse, $interpolate) {
        var LOCAL_REGEXP = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
        return function(scope, attrs, bindDefinition) {
          forEach(bindDefinition || {}, function (definition, scopeName) {
            //Adapted from angular.js $compile
            var match = definition.match(LOCAL_REGEXP) || [],
              attrName = match[3] || scopeName,
              mode = match[1], // @, =, or &
              parentGet,
              unwatch;
      
            switch(mode) {
              case '@':
                if (!attrs[attrName]) {
                  return;
                }
                attrs.$observe(attrName, function(value) {
                  scope[scopeName] = value;
                });
                // we trigger an interpolation to ensure
                // the value is there for use immediately
                if (attrs[attrName]) {
                  scope[scopeName] = $interpolate(attrs[attrName])(scope);
                }
                break;
      
              case '=':
                if (!attrs[attrName]) {
                  return;
                }
                unwatch = scope.$watch(attrs[attrName], function(value) {
                  scope[scopeName] = value;
                });
                //Destroy parent scope watcher when this scope is destroyed
                scope.$on('$destroy', unwatch);
                break;
      
              case '&':
                /* jshint -W044 */
                if (attrs[attrName] && attrs[attrName].match(RegExp(scopeName + '\(.*?\)'))) {
                  throw new Error('& expression binding "' + scopeName + '" looks like it will recursively call "' +
                                attrs[attrName] + '" and cause a stack overflow! Please choose a different scopeName.');
                }
                parentGet = $parse(attrs[attrName]);
                scope[scopeName] = function(locals) {
                  return parentGet(scope, locals);
                };
                break;
            }
          });
        };
      }]);
      
      /**
       * @ngdoc service
       * @name $ionicBody
       * @module ionic
       * @description An angular utility service to easily and efficiently
       * add and remove CSS classes from the document's body element.
       */
      IonicModule
      .factory('$ionicBody', ['$document', function($document) {
        return {
          /**
           * @ngdoc method
           * @name $ionicBody#add
           * @description Add a class to the document's body element.
           * @param {string} class Each argument will be added to the body element.
           * @returns {$ionicBody} The $ionicBody service so methods can be chained.
           */
          addClass: function() {
            for(var x=0; x<arguments.length; x++) {
              $document[0].body.classList.add(arguments[x]);
            }
            return this;
          },
          /**
           * @ngdoc method
           * @name $ionicBody#removeClass
           * @description Remove a class from the document's body element.
           * @param {string} class Each argument will be removed from the body element.
           * @returns {$ionicBody} The $ionicBody service so methods can be chained.
           */
          removeClass: function() {
            for(var x=0; x<arguments.length; x++) {
              $document[0].body.classList.remove(arguments[x]);
            }
            return this;
          },
          /**
           * @ngdoc method
           * @name $ionicBody#enableClass
           * @description Similar to the `add` method, except the first parameter accepts a boolean
           * value determining if the class should be added or removed. Rather than writing user code,
           * such as "if true then add the class, else then remove the class", this method can be
           * given a true or false value which reduces redundant code.
           * @param {boolean} shouldEnableClass A true/false value if the class should be added or removed.
           * @param {string} class Each remaining argument would be added or removed depending on
           * the first argument.
           * @returns {$ionicBody} The $ionicBody service so methods can be chained.
           */
          enableClass: function(shouldEnableClass) {
            var args = Array.prototype.slice.call(arguments).slice(1);
            if(shouldEnableClass) {
              this.addClass.apply(this, args);
            } else {
              this.removeClass.apply(this, args);
            }
            return this;
          },
          /**
           * @ngdoc method
           * @name $ionicBody#append
           * @description Append a child to the document's body.
           * @param {element} element The element to be appended to the body. The passed in element
           * can be either a jqLite element, or a DOM element.
           * @returns {$ionicBody} The $ionicBody service so methods can be chained.
           */
          append: function(ele) {
            $document[0].body.appendChild( ele.length ? ele[0] : ele );
            return this;
          },
          /**
           * @ngdoc method
           * @name $ionicBody#get
           * @description Get the document's body element.
           * @returns {element} Returns the document's body element.
           */
          get: function() {
            return $document[0].body;
          }
        };
      }]);
      
      IonicModule
      .factory('$ionicClickBlock', [
        '$document',
        '$ionicBody',
        '$timeout',
      function($document, $ionicBody, $timeout) {
        var cb = $document[0].createElement('div');
        cb.className = 'click-block';
        return {
          show: function() {
            if(cb.parentElement) {
              cb.classList.remove('hide');
            } else {
              $ionicBody.append(cb);
            }
            $timeout(function(){
              cb.classList.add('hide');
            }, 500);
          },
          hide: function() {
            cb.classList.add('hide');
          }
        };
      }]);
      
      IonicModule
      .factory('$collectionDataSource', [
        '$cacheFactory',
        '$parse',
        '$rootScope',
      function($cacheFactory, $parse, $rootScope) {
        function hideWithTransform(element) {
          element.css(ionic.CSS.TRANSFORM, 'translate3d(-2000px,-2000px,0)');
        }
      
        function CollectionRepeatDataSource(options) {
          var self = this;
          this.scope = options.scope;
          this.transcludeFn = options.transcludeFn;
          this.transcludeParent = options.transcludeParent;
          this.element = options.element;
      
          this.keyExpr = options.keyExpr;
          this.listExpr = options.listExpr;
          this.trackByExpr = options.trackByExpr;
      
          this.heightGetter = options.heightGetter;
          this.widthGetter = options.widthGetter;
      
          this.dimensions = [];
          this.data = [];
      
          this.attachedItems = {};
          this.BACKUP_ITEMS_LENGTH = 20;
          this.backupItemsArray = [];
        }
        CollectionRepeatDataSource.prototype = {
          setup: function() {
            if (this.isSetup) return;
            this.isSetup = true;
            for (var i = 0; i < this.BACKUP_ITEMS_LENGTH; i++) {
              this.detachItem(this.createItem());
            }
          },
          destroy: function() {
            this.dimensions.length = 0;
            this.data = null;
            this.backupItemsArray.length = 0;
            this.attachedItems = {};
          },
          calculateDataDimensions: function() {
            var locals = {};
            this.dimensions = this.data.map(function(value, index) {
              locals[this.keyExpr] = value;
              locals.$index = index;
              return {
                width: this.widthGetter(this.scope, locals),
                height: this.heightGetter(this.scope, locals)
              };
            }, this);
            this.dimensions = this.beforeSiblings.concat(this.dimensions).concat(this.afterSiblings);
            this.dataStartIndex = this.beforeSiblings.length;
          },
          createItem: function() {
            var item = {};
      
            item.scope = this.scope.$new();
            this.transcludeFn(item.scope, function(clone) {
              clone.css('position', 'absolute');
              item.element = clone;
            });
            this.transcludeParent.append(item.element);
      
            return item;
          },
          getItem: function(index) {
            if ( (item = this.attachedItems[index]) ) {
              //do nothing, the item is good
            } else if ( (item = this.backupItemsArray.pop()) ) {
              reconnectScope(item.scope);
            } else {
              item = this.createItem();
            }
            return item;
          },
          attachItemAtIndex: function(index) {
            if (index < this.dataStartIndex) {
              return this.beforeSiblings[index];
            }
            // Subtract so we start at the beginning of this.data, after
            // this.beforeSiblings.
            index -= this.dataStartIndex;
      
            if (index > this.data.length - 1) {
              return this.afterSiblings[index - this.dataStartIndex];
            }
      
            var item = this.getItem(index);
            var value = this.data[index];
      
            if (item.index !== index || item.scope[this.keyExpr] !== value) {
              item.index = item.scope.$index = index;
              item.scope[this.keyExpr] = value;
              item.scope.$first = (index === 0);
              item.scope.$last = (index === (this.getLength() - 1));
              item.scope.$middle = !(item.scope.$first || item.scope.$last);
              item.scope.$odd = !(item.scope.$even = (index&1) === 0);
      
              //We changed the scope, so digest if needed
              if (!$rootScope.$$phase) {
                item.scope.$digest();
              }
            }
            this.attachedItems[index] = item;
      
            return item;
          },
          destroyItem: function(item) {
            item.element.remove();
            item.scope.$destroy();
            item.scope = null;
            item.element = null;
          },
          detachItem: function(item) {
            delete this.attachedItems[item.index];
      
            //If it's an outside item, only hide it. These items aren't part of collection
            //repeat's list, only sit outside
            if (item.isOutside) {
              hideWithTransform(item.element);
            // If we are at the limit of backup items, just get rid of the this element
            } else if (this.backupItemsArray.length >= this.BACKUP_ITEMS_LENGTH) {
              this.destroyItem(item);
            // Otherwise, add it to our backup items
            } else {
              this.backupItemsArray.push(item);
              hideWithTransform(item.element);
              //Don't .$destroy(), just stop watchers and events firing
              disconnectScope(item.scope);
            }
      
          },
          getLength: function() {
            return this.dimensions && this.dimensions.length || 0;
          },
          setData: function(value, beforeSiblings, afterSiblings) {
            this.data = value || [];
            this.beforeSiblings = beforeSiblings || [];
            this.afterSiblings = afterSiblings || [];
            this.calculateDataDimensions();
      
            this.afterSiblings.forEach(function(item) {
              item.element.css({position: 'absolute', top: '0', left: '0' });
              hideWithTransform(item.element);
            });
          },
        };
      
        return CollectionRepeatDataSource;
      }]);
      
      function disconnectScope(scope) {
        if (scope.$root === scope) {
          return; // we can't disconnect the root node;
        }
        var parent = scope.$parent;
        scope.$$disconnected = true;
        // See Scope.$destroy
        if (parent.$$childHead === scope) {
          parent.$$childHead = scope.$$nextSibling;
        }
        if (parent.$$childTail === scope) {
          parent.$$childTail = scope.$$prevSibling;
        }
        if (scope.$$prevSibling) {
          scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
        }
        if (scope.$$nextSibling) {
          scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;
        }
        scope.$$nextSibling = scope.$$prevSibling = null;
      }
      
      function reconnectScope(scope) {
        if (scope.$root === scope) {
          return; // we can't disconnect the root node;
        }
        if (!scope.$$disconnected) {
          return;
        }
        var parent = scope.$parent;
        scope.$$disconnected = false;
        // See Scope.$new for this logic...
        scope.$$prevSibling = parent.$$childTail;
        if (parent.$$childHead) {
          parent.$$childTail.$$nextSibling = scope;
          parent.$$childTail = scope;
        } else {
          parent.$$childHead = parent.$$childTail = scope;
        }
      }
      
      
      IonicModule
      .factory('$collectionRepeatManager', [
        '$rootScope',
        '$timeout',
      function($rootScope, $timeout) {
        /**
         * Vocabulary: "primary" and "secondary" size/direction/position mean
         * "y" and "x" for vertical scrolling, or "x" and "y" for horizontal scrolling.
         */
        function CollectionRepeatManager(options) {
          var self = this;
          this.dataSource = options.dataSource;
          this.element = options.element;
          this.scrollView = options.scrollView;
      
          this.isVertical = !!this.scrollView.options.scrollingY;
          this.renderedItems = {};
          this.dimensions = [];
          this.setCurrentIndex(0);
      
          //Override scrollview's render callback
          this.scrollView.__$callback = this.scrollView.__callback;
          this.scrollView.__callback = angular.bind(this, this.renderScroll);
      
          function getViewportSize() { return self.viewportSize; }
          //Set getters and setters to match whether this scrollview is vertical or not
          if (this.isVertical) {
            this.scrollView.options.getContentHeight = getViewportSize;
      
            this.scrollValue = function() {
              return this.scrollView.__scrollTop;
            };
            this.scrollMaxValue = function() {
              return this.scrollView.__maxScrollTop;
            };
            this.scrollSize = function() {
              return this.scrollView.__clientHeight;
            };
            this.secondaryScrollSize = function() {
              return this.scrollView.__clientWidth;
            };
            this.transformString = function(y, x) {
              return 'translate3d('+x+'px,'+y+'px,0)';
            };
            this.primaryDimension = function(dim) {
              return dim.height;
            };
            this.secondaryDimension = function(dim) {
              return dim.width;
            };
          } else {
            this.scrollView.options.getContentWidth = getViewportSize;
      
            this.scrollValue = function() {
              return this.scrollView.__scrollLeft;
            };
            this.scrollMaxValue = function() {
              return this.scrollView.__maxScrollLeft;
            };
            this.scrollSize = function() {
              return this.scrollView.__clientWidth;
            };
            this.secondaryScrollSize = function() {
              return this.scrollView.__clientHeight;
            };
            this.transformString = function(x, y) {
              return 'translate3d('+x+'px,'+y+'px,0)';
            };
            this.primaryDimension = function(dim) {
              return dim.width;
            };
            this.secondaryDimension = function(dim) {
              return dim.height;
            };
          }
        }
      
        CollectionRepeatManager.prototype = {
          destroy: function() {
            this.renderedItems = {};
            this.render = angular.noop;
            this.calculateDimensions = angular.noop;
            this.dimensions = [];
          },
      
          /*
           * Pre-calculate the position of all items in the data list.
           * Do this using the provided width and height (primarySize and secondarySize)
           * provided by the dataSource.
           */
          calculateDimensions: function() {
            /*
             * For the sake of explanations below, we're going to pretend we are scrolling
             * vertically: Items are laid out with primarySize being height,
             * secondarySize being width.
             */
            var primaryPos = 0;
            var secondaryPos = 0;
            var secondaryScrollSize = this.secondaryScrollSize();
            var previousItem;
      
            this.dataSource.beforeSiblings && this.dataSource.beforeSiblings.forEach(calculateSize, this);
            var beforeSize = primaryPos + (previousItem ? previousItem.primarySize : 0);
      
            primaryPos = secondaryPos = 0;
            previousItem = null;
      
            var dimensions = this.dataSource.dimensions.map(calculateSize, this);
            var totalSize = primaryPos + (previousItem ? previousItem.primarySize : 0);
      
            return {
              beforeSize: beforeSize,
              totalSize: totalSize,
              dimensions: dimensions
            };
      
            function calculateSize(dim) {
      
              //Each dimension is an object {width: Number, height: Number} provided by
              //the dataSource
              var rect = {
                //Get the height out of the dimension object
                primarySize: this.primaryDimension(dim),
                //Max out the item's width to the width of the scrollview
                secondarySize: Math.min(this.secondaryDimension(dim), secondaryScrollSize)
              };
      
              //If this isn't the first item
              if (previousItem) {
                //Move the item's x position over by the width of the previous item
                secondaryPos += previousItem.secondarySize;
                //If the y position is the same as the previous item and
                //the x position is bigger than the scroller's width
                if (previousItem.primaryPos === primaryPos &&
                    secondaryPos + rect.secondarySize > secondaryScrollSize) {
                  //Then go to the next row, with x position 0
                  secondaryPos = 0;
                  primaryPos += previousItem.primarySize;
                }
              }
      
              rect.primaryPos = primaryPos;
              rect.secondaryPos = secondaryPos;
      
              previousItem = rect;
              return rect;
            }
          },
          resize: function() {
            var result = this.calculateDimensions();
            this.dimensions = result.dimensions;
            this.viewportSize = result.totalSize;
            this.beforeSize = result.beforeSize;
            this.setCurrentIndex(0);
            this.render(true);
            this.dataSource.setup();
          },
          /*
           * setCurrentIndex sets the index in the list that matches the scroller's position.
           * Also save the position in the scroller for next and previous items (if they exist)
           */
          setCurrentIndex: function(index, height) {
            var currentPos = (this.dimensions[index] || {}).primaryPos || 0;
            this.currentIndex = index;
      
            this.hasPrevIndex = index > 0;
            if (this.hasPrevIndex) {
              this.previousPos = Math.max(
                currentPos - this.dimensions[index - 1].primarySize,
                this.dimensions[index - 1].primaryPos
              );
            }
            this.hasNextIndex = index + 1 < this.dataSource.getLength();
            if (this.hasNextIndex) {
              this.nextPos = Math.min(
                currentPos + this.dimensions[index + 1].primarySize,
                this.dimensions[index + 1].primaryPos
              );
            }
          },
          /**
           * override the scroller's render callback to check if we need to
           * re-render our collection
           */
          renderScroll: ionic.animationFrameThrottle(function(transformLeft, transformTop, zoom, wasResize) {
            if (this.isVertical) {
              this.renderIfNeeded(transformTop);
            } else {
              this.renderIfNeeded(transformLeft);
            }
            return this.scrollView.__$callback(transformLeft, transformTop, zoom, wasResize);
          }),
      
          renderIfNeeded: function(scrollPos) {
            if ((this.hasNextIndex && scrollPos >= this.nextPos) ||
                (this.hasPrevIndex && scrollPos < this.previousPos)) {
                 // Math.abs(transformPos - this.lastRenderScrollValue) > 100) {
              this.render();
            }
          },
          /*
           * getIndexForScrollValue: Given the most recent data index and a new scrollValue,
           * find the data index that matches that scrollValue.
           *
           * Strategy (if we are scrolling down): keep going forward in the dimensions list,
           * starting at the given index, until an item with height matching the new scrollValue
           * is found.
           *
           * This is a while loop. In the worst case it will have to go through the whole list
           * (eg to scroll from top to bottom).  The most common case is to scroll
           * down 1-3 items at a time.
           *
           * While this is not as efficient as it could be, optimizing it gives no noticeable
           * benefit.  We would have to use a new memory-intensive data structure for dimensions
           * to fully optimize it.
           */
          getIndexForScrollValue: function(i, scrollValue) {
            var rect;
            //Scrolling up
            if (scrollValue <= this.dimensions[i].primaryPos) {
              while ( (rect = this.dimensions[i - 1]) && rect.primaryPos > scrollValue) {
                i--;
              }
            //Scrolling down
            } else {
              while ( (rect = this.dimensions[i + 1]) && rect.primaryPos < scrollValue) {
                i++;
              }
            }
            return i;
          },
          /*
           * render: Figure out the scroll position, the index matching it, and then tell
           * the data source to render the correct items into the DOM.
           */
          render: function(shouldRedrawAll) {
            var self = this;
            var i;
            var isOutOfBounds = ( this.currentIndex >= this.dataSource.getLength() );
            // We want to remove all the items and redraw everything if we're out of bounds
            // or a flag is passed in.
            if (isOutOfBounds || shouldRedrawAll) {
              for (i in this.renderedItems) {
                this.removeItem(i);
              }
              // Just don't render anything if we're out of bounds
              if (isOutOfBounds) return;
            }
      
            var rect;
            var scrollValue = this.scrollValue();
            // Scroll size = how many pixels are visible in the scroller at one time
            var scrollSize = this.scrollSize();
            // We take the current scroll value and add it to the scrollSize to get
            // what scrollValue the current visible scroll area ends at.
            var scrollSizeEnd = scrollSize + scrollValue;
            // Get the new start index for scrolling, based on the current scrollValue and
            // the most recent known index
            var startIndex = this.getIndexForScrollValue(this.currentIndex, scrollValue);
      
            // If we aren't on the first item, add one row of items before so that when the user is
            // scrolling up he sees the previous item
            var renderStartIndex = Math.max(startIndex - 1, 0);
            // Keep adding items to the 'extra row above' until we get to a new row.
            // This is for the case where there are multiple items on one row above
            // the current item; we want to keep adding items above until
            // a new row is reached.
            while (renderStartIndex > 0 &&
               (rect = this.dimensions[renderStartIndex]) &&
               rect.primaryPos === this.dimensions[startIndex - 1].primaryPos) {
              renderStartIndex--;
            }
      
            // Keep rendering items, adding them until we are past the end of the visible scroll area
            i = renderStartIndex;
            while ((rect = this.dimensions[i]) && (rect.primaryPos - rect.primarySize < scrollSizeEnd)) {
              doRender(i, rect);
              i++;
            }
      
            // Render two extra items at the end as a buffer
            if (self.dimensions[i]) {
              doRender(i, self.dimensions[i]);
              i++;
            }
            if (self.dimensions[i]) {
              doRender(i, self.dimensions[i]);
            }
            var renderEndIndex = i;
      
            // Remove any items that were rendered and aren't visible anymore
            for (var renderIndex in this.renderedItems) {
              if (renderIndex < renderStartIndex || renderIndex > renderEndIndex) {
                this.removeItem(renderIndex);
              }
            }
      
            this.setCurrentIndex(startIndex);
      
            function doRender(dataIndex, rect) {
              if (dataIndex < self.dataSource.dataStartIndex) {
                // do nothing
              } else {
                self.renderItem(dataIndex, rect.primaryPos - self.beforeSize, rect.secondaryPos);
              }
            }
          },
          renderItem: function(dataIndex, primaryPos, secondaryPos) {
            // Attach an item, and set its transform position to the required value
            var item = this.dataSource.attachItemAtIndex(dataIndex);
            //console.log(dataIndex, item);
            if (item && item.element) {
              if (item.primaryPos !== primaryPos || item.secondaryPos !== secondaryPos) {
                item.element.css(ionic.CSS.TRANSFORM, this.transformString(
                  primaryPos, secondaryPos
                ));
                item.primaryPos = primaryPos;
                item.secondaryPos = secondaryPos;
              }
              // Save the item in rendered items
              this.renderedItems[dataIndex] = item;
            } else {
              // If an item at this index doesn't exist anymore, be sure to delete
              // it from rendered items
              delete this.renderedItems[dataIndex];
            }
          },
          removeItem: function(dataIndex) {
            // Detach a given item
            var item = this.renderedItems[dataIndex];
            if (item) {
              item.primaryPos = item.secondaryPos = null;
              this.dataSource.detachItem(item);
              delete this.renderedItems[dataIndex];
            }
          }
        };
      
        return CollectionRepeatManager;
      }]);
      
      
      function delegateService(methodNames) {
        return ['$log', function($log) {
          var delegate = this;
      
          var instances = this._instances = [];
          this._registerInstance = function(instance, handle) {
            instance.$$delegateHandle = handle;
            instances.push(instance);
      
            return function deregister() {
              var index = instances.indexOf(instance);
              if (index !== -1) {
                instances.splice(index, 1);
              }
            };
          };
      
          this.$getByHandle = function(handle) {
            if (!handle) {
              return delegate;
            }
            return new InstanceForHandle(handle);
          };
      
          /*
           * Creates a new object that will have all the methodNames given,
           * and call them on the given the controller instance matching given
           * handle.
           * The reason we don't just let $getByHandle return the controller instance
           * itself is that the controller instance might not exist yet.
           *
           * We want people to be able to do
           * `var instance = $ionicScrollDelegate.$getByHandle('foo')` on controller
           * instantiation, but on controller instantiation a child directive
           * may not have been compiled yet!
           *
           * So this is our way of solving this problem: we create an object
           * that will only try to fetch the controller with given handle
           * once the methods are actually called.
           */
          function InstanceForHandle(handle) {
            this.handle = handle;
          }
          methodNames.forEach(function(methodName) {
            InstanceForHandle.prototype[methodName] = function() {
              var handle = this.handle;
              var args = arguments;
              var matchingInstancesFound = 0;
              var finalResult;
              var result;
      
              //This logic is repeated below; we could factor some of it out to a function
              //but don't because it lets this method be more performant (one loop versus 2)
              instances.forEach(function(instance) {
                if (instance.$$delegateHandle === handle) {
                  matchingInstancesFound++;
                  result = instance[methodName].apply(instance, args);
                  //Only return the value from the first call
                  if (matchingInstancesFound === 1) {
                    finalResult = result;
                  }
                }
              });
      
              if (!matchingInstancesFound) {
                return $log.warn(
                  'Delegate for handle "'+this.handle+'" could not find a ' +
                  'corresponding element with delegate-handle="'+this.handle+'"! ' +
                  methodName + '() was not called!\n' +
                  'Possible cause: If you are calling ' + methodName + '() immediately, and ' +
                  'your element with delegate-handle="' + this.handle + '" is a child of your ' +
                  'controller, then your element may not be compiled yet. Put a $timeout ' +
                  'around your call to ' + methodName + '() and try again.'
                );
              }
      
              return finalResult;
            };
            delegate[methodName] = function() {
              var args = arguments;
              var finalResult;
              var result;
      
              //This logic is repeated above
              instances.forEach(function(instance, index) {
                result = instance[methodName].apply(instance, args);
                //Only return the value from the first call
                if (index === 0) {
                  finalResult = result;
                }
              });
      
              return finalResult;
            };
      
            function callMethod(instancesToUse, methodName, args) {
              var finalResult;
              var result;
              instancesToUse.forEach(function(instance, index) {
                result = instance[methodName].apply(instance, args);
                //Make it so the first result is the one returned
                if (index === 0) {
                  finalResult = result;
                }
              });
              return finalResult;
            }
          });
        }];
      }
      
      /**
       * @ngdoc service
       * @name $ionicGesture
       * @module ionic
       * @description An angular service exposing ionic
       * {@link ionic.utility:ionic.EventController}'s gestures.
       */
      IonicModule
      .factory('$ionicGesture', [function() {
        return {
          /**
           * @ngdoc method
           * @name $ionicGesture#on
           * @description Add an event listener for a gesture on an element. See {@link ionic.utility:ionic.EventController#onGesture}.
           * @param {string} eventType The gesture event to listen for.
           * @param {function(e)} callback The function to call when the gesture
           * happens.
           * @param {element} $element The angular element to listen for the event on.
           * @returns {ionic.Gesture} The gesture object (use this to remove the gesture later on).
           */
          on: function(eventType, cb, $element, options) {
            return window.ionic.onGesture(eventType, cb, $element[0], options);
          },
          /**
           * @ngdoc method
           * @name $ionicGesture#off
           * @description Remove an event listener for a gesture on an element. See {@link ionic.utility:ionic.EventController#offGesture}.
           * @param {ionic.Gesture} gesture The gesture that should be removed.
           * @param {string} eventType The gesture event to remove the listener for.
           * @param {function(e)} callback The listener to remove.
           */
          off: function(gesture, eventType, cb) {
            return window.ionic.offGesture(gesture, eventType, cb);
          }
        };
      }]);
      
      /**
       * @ngdoc provider
       * @name $ionicConfigProvider
       * @module ionic
       * @description $ionicConfigProvider can be used during the configuration phase of your app
       * to change how Ionic works.
       *
       * @usage
       * ```js
       * var myApp = angular.module('reallyCoolApp', ['ionic']);
       *
       * myApp.config(function($ionicConfigProvider) {
       *   $ionicConfigProvider.prefetchTemplates(false);
       * });
       * ```
       */
      IonicModule
      .provider('$ionicConfig', function() {
      
        var provider = this;
        var config = {
          prefetchTemplates: true
        };
      
        /**
         * @ngdoc method
         * @name $ionicConfigProvider#prefetchTemplates
         * @description Set whether Ionic should prefetch all templateUrls defined in
         * $stateProvider.state. Default true. If set to false, the user will have to wait
         * for a template to be fetched the first time he/she is going to a a new page.
         * @param shouldPrefetch Whether Ionic should prefetch templateUrls defined in
         * `$stateProvider.state()`. Default true.
         * @returns {boolean} Whether Ionic will prefetch templateUrls defined in $stateProvider.state.
         */
        this.prefetchTemplates = function(newValue) {
          if (arguments.length) {
            config.prefetchTemplates = newValue;
          }
          return config.prefetchTemplates;
        };
      
        // private: Service definition for internal Ionic use
        /**
         * @ngdoc service
         * @name $ionicConfig
         * @module ionic
         * @private
         */
        this.$get = function() {
          return config;
        };
      });
      
      
      var LOADING_TPL =
        '<div class="loading-container">' +
          '<div class="loading">' +
          '</div>' +
        '</div>';
      
      var LOADING_HIDE_DEPRECATED = '$ionicLoading instance.hide() has been deprecated. Use $ionicLoading.hide().';
      var LOADING_SHOW_DEPRECATED = '$ionicLoading instance.show() has been deprecated. Use $ionicLoading.show().';
      var LOADING_SET_DEPRECATED = '$ionicLoading instance.setContent() has been deprecated. Use $ionicLoading.show({ template: \'my content\' }).';
      
      /**
       * @ngdoc service
       * @name $ionicLoading
       * @module ionic
       * @description
       * An overlay that can be used to indicate activity while blocking user
       * interaction.
       *
       * @usage
       * ```js
       * angular.module('LoadingApp', ['ionic'])
       * .controller('LoadingCtrl', function($scope, $ionicLoading) {
       *   $scope.show = function() {
       *     $ionicLoading.show({
       *       template: 'Loading...'
       *     });
       *   };
       *   $scope.hide = function(){
       *     $ionicLoading.hide();
       *   };
       * });
       * ```
       */
      /**
       * @ngdoc object
       * @name $ionicLoadingConfig
       * @module ionic
       * @description
       * Set the default options to be passed to the {@link ionic.service:$ionicLoading} service.
       *
       * @usage
       * ```js
       * var app = angular.module('myApp', ['ionic'])
       * app.constant('$ionicLoadingConfig', {
       *   template: 'Default Loading Template...'
       * });
       * app.controller('AppCtrl', function($scope, $ionicLoading) {
       *   $scope.showLoading = function() {
       *     $ionicLoading.show(); //options default to values in $ionicLoadingConfig
       *   };
       * });
       * ```
       */
      IonicModule
      .constant('$ionicLoadingConfig', {
        template: '<i class="icon ion-loading-d"></i>'
      })
      .factory('$ionicLoading', [
        '$ionicLoadingConfig',
        '$ionicBody',
        '$ionicTemplateLoader',
        '$ionicBackdrop',
        '$timeout',
        '$q',
        '$log',
        '$compile',
        '$ionicPlatform',
      function($ionicLoadingConfig, $ionicBody, $ionicTemplateLoader, $ionicBackdrop, $timeout, $q, $log, $compile, $ionicPlatform) {
      
        var loaderInstance;
        //default values
        var deregisterBackAction = angular.noop;
        var loadingShowDelay = $q.when();
      
        return {
          /**
           * @ngdoc method
           * @name $ionicLoading#show
           * @description Shows a loading indicator. If the indicator is already shown,
           * it will set the options given and keep the indicator shown.
           * @param {object} opts The options for the loading indicator. Available properties:
           *  - `{string=}` `template` The html content of the indicator.
           *  - `{string=}` `templateUrl` The url of an html template to load as the content of the indicator.
           *  - `{boolean=}` `noBackdrop` Whether to hide the backdrop. By default it will be shown.
           *  - `{number=}` `delay` How many milliseconds to delay showing the indicator. By default there is no delay.
           *  - `{number=}` `duration` How many milliseconds to wait until automatically
           *  hiding the indicator. By default, the indicator will be shown until `.hide()` is called.
           */
          show: showLoader,
          /**
           * @ngdoc method
           * @name $ionicLoading#hide
           * @description Hides the loading indicator, if shown.
           */
          hide: hideLoader,
          /**
           * @private for testing
           */
          _getLoader: getLoader
        };
      
        function getLoader() {
          if (!loaderInstance) {
            loaderInstance = $ionicTemplateLoader.compile({
              template: LOADING_TPL,
              appendTo: $ionicBody.get()
            })
            .then(function(loader) {
              var self = loader;
      
              loader.show = function(options) {
                var templatePromise = options.templateUrl ?
                  $ionicTemplateLoader.load(options.templateUrl) :
                  //options.content: deprecated
                  $q.when(options.template || options.content || '');
      
      
                if (!this.isShown) {
                  //options.showBackdrop: deprecated
                  this.hasBackdrop = !options.noBackdrop && options.showBackdrop !== false;
                  if (this.hasBackdrop) {
                    $ionicBackdrop.retain();
                    $ionicBackdrop.getElement().addClass('backdrop-loading');
                  }
                }
      
                if (options.duration) {
                  $timeout.cancel(this.durationTimeout);
                  this.durationTimeout = $timeout(
                    angular.bind(this, this.hide),
                    +options.duration
                  );
                }
      
                templatePromise.then(function(html) {
                  if (html) {
                    var loading = self.element.children();
                    loading.html(html);
                    $compile(loading.contents())(self.scope);
                  }
      
                  //Don't show until template changes
                  if (self.isShown) {
                    self.element.addClass('visible');
                    ionic.requestAnimationFrame(function() {
                      if(self.isShown) {
                        self.element.addClass('active');
                        $ionicBody.addClass('loading-active');
                      }
                    });
                  }
                });
      
                this.isShown = true;
              };
              loader.hide = function() {
                if (this.isShown) {
                  if (this.hasBackdrop) {
                    $ionicBackdrop.release();
                    $ionicBackdrop.getElement().removeClass('backdrop-loading');
                  }
                  self.element.removeClass('active');
                  $ionicBody.removeClass('loading-active');
                  setTimeout(function() {
                    !self.isShown && self.element.removeClass('visible');
                  }, 200);
                }
                $timeout.cancel(this.durationTimeout);
                this.isShown = false;
              };
      
              return loader;
            });
          }
          return loaderInstance;
        }
      
        function showLoader(options) {
          options = extend($ionicLoadingConfig || {}, options || {});
          var delay = options.delay || options.showDelay || 0;
      
          //If loading.show() was called previously, cancel it and show with our new options
          loadingShowDelay && $timeout.cancel(loadingShowDelay);
          loadingShowDelay = $timeout(angular.noop, delay);
      
          loadingShowDelay.then(getLoader).then(function(loader) {
            deregisterBackAction();
            //Disable hardware back button while loading
            deregisterBackAction = $ionicPlatform.registerBackButtonAction(
              angular.noop,
              PLATFORM_BACK_BUTTON_PRIORITY_LOADING
            );
            return loader.show(options);
          });
      
          return {
            hide: deprecated.method(LOADING_HIDE_DEPRECATED, $log.error, hideLoader),
            show: deprecated.method(LOADING_SHOW_DEPRECATED, $log.error, function() {
              showLoader(options);
            }),
            setContent: deprecated.method(LOADING_SET_DEPRECATED, $log.error, function(content) {
              getLoader().then(function(loader) {
                loader.show({ template: content });
              });
            })
          };
        }
      
        function hideLoader() {
          deregisterBackAction();
          $timeout.cancel(loadingShowDelay);
          getLoader().then(function(loader) {
            loader.hide();
          });
        }
      }]);
      
      /**
       * @ngdoc service
       * @name $ionicModal
       * @module ionic
       * @description
       *
       * Related: {@link ionic.controller:ionicModal ionicModal controller}.
       *
       * The Modal is a content pane that can go over the user's main view
       * temporarily.  Usually used for making a choice or editing an item.
       *
       * Put the content of the modal inside of an `<ion-modal-view>` element.
       *
       * **Notes:**
       * - A modal will broadcast 'modal.shown', 'modal.hidden', and 'modal.removed' events from its originating
       * scope, passing in itself as an event argument. Both the modal.removed and modal.hidden events are
       * called when the modal is removed.
       *
       * - This example assumes your modal is in your main index file or another template file. If it is in its own
       * template file, remove the script tags and call it by file name.
       * 
       * @usage
       * ```html
       * <script id="my-modal.html" type="text/ng-template">
       *   <ion-modal-view>
       *     <ion-header-bar>
       *       <h1 class="title">My Modal title</h1>
       *     </ion-header-bar>
       *     <ion-content>
       *       Hello!
       *     </ion-content>
       *   </ion-modal-view>
       * </script>
       * ```
       * ```js
       * angular.module('testApp', ['ionic'])
       * .controller('MyController', function($scope, $ionicModal) {
       *   $ionicModal.fromTemplateUrl('my-modal.html', {
       *     scope: $scope,
       *     animation: 'slide-in-up'
       *   }).then(function(modal) {
       *     $scope.modal = modal;
       *   });
       *   $scope.openModal = function() {
       *     $scope.modal.show();
       *   };
       *   $scope.closeModal = function() {
       *     $scope.modal.hide();
       *   };
       *   //Cleanup the modal when we're done with it!
       *   $scope.$on('$destroy', function() {
       *     $scope.modal.remove();
       *   });
       *   // Execute action on hide modal
       *   $scope.$on('modal.hidden', function() {
       *     // Execute action
       *   });
       *   // Execute action on remove modal
       *   $scope.$on('modal.removed', function() {
       *     // Execute action
       *   });
       * });
       * ```
       */
      IonicModule
      .factory('$ionicModal', [
        '$rootScope',
        '$ionicBody',
        '$compile',
        '$timeout',
        '$ionicPlatform',
        '$ionicTemplateLoader',
        '$q',
        '$log',
      function($rootScope, $ionicBody, $compile, $timeout, $ionicPlatform, $ionicTemplateLoader, $q, $log) {
      
        /**
         * @ngdoc controller
         * @name ionicModal
         * @module ionic
         * @description
         * Instantiated by the {@link ionic.service:$ionicModal} service.
         *
         * Be sure to call [remove()](#remove) when you are done with each modal
         * to clean it up and avoid memory leaks.
         *
         * Note: a modal will broadcast 'modal.shown', 'modal.hidden', and 'modal.removed' events from its originating
         * scope, passing in itself as an event argument. Note: both modal.removed and modal.hidden are
         * called when the modal is removed.
         */
        var ModalView = ionic.views.Modal.inherit({
          /**
           * @ngdoc method
           * @name ionicModal#initialize
           * @description Creates a new modal controller instance.
           * @param {object} options An options object with the following properties:
           *  - `{object=}` `scope` The scope to be a child of.
           *    Default: creates a child of $rootScope.
           *  - `{string=}` `animation` The animation to show & hide with.
           *    Default: 'slide-in-up'
           *  - `{boolean=}` `focusFirstInput` Whether to autofocus the first input of
           *    the modal when shown.  Default: false.
           *  - `{boolean=}` `backdropClickToClose` Whether to close the modal on clicking the backdrop.
           *    Default: true.
           *  - `{boolean=}` `hardwareBackButtonClose` Whether the modal can be closed using the hardware
           *    back button on Android and similar devices.  Default: true.
           */
          initialize: function(opts) {
            ionic.views.Modal.prototype.initialize.call(this, opts);
            this.animation = opts.animation || 'slide-in-up';
          },
      
          /**
           * @ngdoc method
           * @name ionicModal#show
           * @description Show this modal instance.
           * @returns {promise} A promise which is resolved when the modal is finished animating in.
           */
          show: function(target) {
            var self = this;
      
            if(self.scope.$$destroyed) {
              $log.error('Cannot call ' +  self.viewType + '.show() after remove(). Please create a new ' +  self.viewType + ' instance.');
              return;
            }
      
            var modalEl = jqLite(self.modalEl);
      
            self.el.classList.remove('hide');
            $timeout(function(){
              $ionicBody.addClass(self.viewType + '-open');
            }, 400);
      
            if(!self.el.parentElement) {
              modalEl.addClass(self.animation);
              $ionicBody.append(self.el);
            }
      
            if(target && self.positionView) {
              self.positionView(target, modalEl);
            }
      
            modalEl.addClass('ng-enter active')
                   .removeClass('ng-leave ng-leave-active');
      
            self._isShown = true;
            self._deregisterBackButton = $ionicPlatform.registerBackButtonAction(
              self.hardwareBackButtonClose ? angular.bind(self, self.hide) : angular.noop,
              PLATFORM_BACK_BUTTON_PRIORITY_MODAL
            );
      
            self._isOpenPromise = $q.defer();
      
            ionic.views.Modal.prototype.show.call(self);
      
            $timeout(function(){
              modalEl.addClass('ng-enter-active');
              ionic.trigger('resize');
              self.scope.$parent && self.scope.$parent.$broadcast(self.viewType + '.shown', self);
              self.el.classList.add('active');
            }, 20);
      
            return $timeout(function() {
              //After animating in, allow hide on backdrop click
              self.$el.on('click', function(e) {
                if (self.backdropClickToClose && e.target === self.el) {
                  self.hide();
                }
              });
            }, 400);
          },
      
          /**
           * @ngdoc method
           * @name ionicModal#hide
           * @description Hide this modal instance.
           * @returns {promise} A promise which is resolved when the modal is finished animating out.
           */
          hide: function() {
            var self = this;
            var modalEl = jqLite(self.modalEl);
      
            self.el.classList.remove('active');
            modalEl.addClass('ng-leave');
      
            $timeout(function(){
              modalEl.addClass('ng-leave-active')
                     .removeClass('ng-enter ng-enter-active active');
            }, 20);
      
            self.$el.off('click');
            self._isShown = false;
            self.scope.$parent && self.scope.$parent.$broadcast(self.viewType + '.hidden', self);
            self._deregisterBackButton && self._deregisterBackButton();
      
            ionic.views.Modal.prototype.hide.call(self);
      
            return $timeout(function(){
              $ionicBody.removeClass(self.viewType + '-open');
              self.el.classList.add('hide');
            }, self.hideDelay || 320);
          },
      
          /**
           * @ngdoc method
           * @name ionicModal#remove
           * @description Remove this modal instance from the DOM and clean up.
           * @returns {promise} A promise which is resolved when the modal is finished animating out.
           */
          remove: function() {
            var self = this;
            self.scope.$parent && self.scope.$parent.$broadcast(self.viewType + '.removed', self);
      
            return self.hide().then(function() {
              self.scope.$destroy();
              self.$el.remove();
            });
          },
      
          /**
           * @ngdoc method
           * @name ionicModal#isShown
           * @returns boolean Whether this modal is currently shown.
           */
          isShown: function() {
            return !!this._isShown;
          }
        });
      
        var createModal = function(templateString, options) {
          // Create a new scope for the modal
          var scope = options.scope && options.scope.$new() || $rootScope.$new(true);
      
          options.viewType = options.viewType || 'modal';
      
          extend(scope, {
            $hasHeader: false,
            $hasSubheader: false,
            $hasFooter: false,
            $hasSubfooter: false,
            $hasTabs: false,
            $hasTabsTop: false
          });
      
          // Compile the template
          var element = $compile('<ion-' + options.viewType + '>' + templateString + '</ion-' + options.viewType + '>')(scope);
      
          options.$el = element;
          options.el = element[0];
          options.modalEl = options.el.querySelector('.' + options.viewType);
          var modal = new ModalView(options);
      
          modal.scope = scope;
      
          // If this wasn't a defined scope, we can assign the viewType to the isolated scope
          // we created
          if(!options.scope) {
            scope[ options.viewType ] = modal;
          }
      
          return modal;
        };
      
        return {
          /**
           * @ngdoc method
           * @name $ionicModal#fromTemplate
           * @param {string} templateString The template string to use as the modal's
           * content.
           * @param {object} options Options to be passed {@link ionic.controller:ionicModal#initialize ionicModal#initialize} method.
           * @returns {object} An instance of an {@link ionic.controller:ionicModal}
           * controller.
           */
          fromTemplate: function(templateString, options) {
            var modal = createModal(templateString, options || {});
            return modal;
          },
          /**
           * @ngdoc method
           * @name $ionicModal#fromTemplateUrl
           * @param {string} templateUrl The url to load the template from.
           * @param {object} options Options to be passed {@link ionic.controller:ionicModal#initialize ionicModal#initialize} method.
           * options object.
           * @returns {promise} A promise that will be resolved with an instance of
           * an {@link ionic.controller:ionicModal} controller.
           */
          fromTemplateUrl: function(url, options, _) {
            var cb;
            //Deprecated: allow a callback as second parameter. Now we return a promise.
            if (angular.isFunction(options)) {
              cb = options;
              options = _;
            }
            return $ionicTemplateLoader.load(url).then(function(templateString) {
              var modal = createModal(templateString, options || {});
              cb && cb(modal);
              return modal;
            });
          }
        };
      }]);
      
      
      /**
       * @ngdoc service
       * @name $ionicNavBarDelegate
       * @module ionic
       * @description
       * Delegate for controlling the {@link ionic.directive:ionNavBar} directive.
       *
       * @usage
       *
       * ```html
       * <body ng-controller="MyCtrl">
       *   <ion-nav-bar>
       *     <button ng-click="setNavTitle('banana')">
       *       Set title to banana!
       *     </button>
       *   </ion-nav-bar>
       * </body>
       * ```
       * ```js
       * function MyCtrl($scope, $ionicNavBarDelegate) {
       *   $scope.setNavTitle = function(title) {
       *     $ionicNavBarDelegate.setTitle(title);
       *   }
       * }
       * ```
       */
      IonicModule
      .service('$ionicNavBarDelegate', delegateService([
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#back
         * @description Goes back in the view history.
         * @param {DOMEvent=} event The event object (eg from a tap event)
         */
        'back',
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#align
         * @description Aligns the title with the buttons in a given direction.
         * @param {string=} direction The direction to the align the title text towards.
         * Available: 'left', 'right', 'center'. Default: 'center'.
         */
        'align',
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#showBackButton
         * @description
         * Set/get whether the {@link ionic.directive:ionNavBackButton} is shown
         * (if it exists).
         * @param {boolean=} show Whether to show the back button.
         * @returns {boolean} Whether the back button is shown.
         */
        'showBackButton',
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#showBar
         * @description
         * Set/get whether the {@link ionic.directive:ionNavBar} is shown.
         * @param {boolean} show Whether to show the bar.
         * @returns {boolean} Whether the bar is shown.
         */
        'showBar',
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#setTitle
         * @description
         * Set the title for the {@link ionic.directive:ionNavBar}.
         * @param {string} title The new title to show.
         */
        'setTitle',
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#changeTitle
         * @description
         * Change the title, transitioning the new title in and the old one out in a given direction.
         * @param {string} title The new title to show.
         * @param {string} direction The direction to transition the new title in.
         * Available: 'forward', 'back'.
         */
        'changeTitle',
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#getTitle
         * @returns {string} The current title of the navbar.
         */
        'getTitle',
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#getPreviousTitle
         * @returns {string} The previous title of the navbar.
         */
        'getPreviousTitle'
        /**
         * @ngdoc method
         * @name $ionicNavBarDelegate#$getByHandle
         * @param {string} handle
         * @returns `delegateInstance` A delegate instance that controls only the
         * navBars with delegate-handle matching the given handle.
         *
         * Example: `$ionicNavBarDelegate.$getByHandle('myHandle').setTitle('newTitle')`
         */
      ]));
      
      var PLATFORM_BACK_BUTTON_PRIORITY_VIEW = 100;
      var PLATFORM_BACK_BUTTON_PRIORITY_SIDE_MENU = 150;
      var PLATFORM_BACK_BUTTON_PRIORITY_MODAL = 200;
      var PLATFORM_BACK_BUTTON_PRIORITY_ACTION_SHEET = 300;
      var PLATFORM_BACK_BUTTON_PRIORITY_POPUP = 400;
      var PLATFORM_BACK_BUTTON_PRIORITY_LOADING = 500;
      
      function componentConfig(defaults) {
        defaults.$get = function() { return defaults; };
        return defaults;
      }
      
      IonicModule
      .constant('$ionicPlatformDefaults', {
        'ios': {
          '$ionicNavBarConfig': {
            transition: 'nav-title-slide-ios',//nav-title-slide-ios7',
            alignTitle: 'center',
            backButtonIcon: 'ion-ios7-arrow-back'
          },
          '$ionicNavViewConfig': {
            //transition: 'slide-left-right-ios'
            transition: 'slide-ios'
          },
          '$ionicTabsConfig': {
            type: '',
            position: ''
          }
        },
        'android': {
          '$ionicNavBarConfig': {
            transition: 'nav-title-slide-full',
            alignTitle: 'center',
            backButtonIcon: 'ion-ios7-arrow-back'
          },
          '$ionicNavViewConfig': {
            transition: 'slide-full'
          },
          '$ionicTabsConfig': {
            type: 'tabs-striped',
            position: ''
          }
        }
      });
      
      
      IonicModule.config([
        '$ionicPlatformDefaults',
      
        '$injector',
      
      function($ionicPlatformDefaults, $injector) {
        var platform = ionic.Platform.platform();
      
        var applyConfig = function(platformDefaults) {
          forEach(platformDefaults, function(defaults, constantName) {
            extend($injector.get(constantName), defaults);
          });
        };
      
        switch(platform) {
          case 'ios':
            applyConfig($ionicPlatformDefaults.ios);
            break;
          case 'android':
            applyConfig($ionicPlatformDefaults.android);
            break;
        }
      }]);
      
      /**
       * @ngdoc service
       * @name $ionicPlatform
       * @module ionic
       * @description
       * An angular abstraction of {@link ionic.utility:ionic.Platform}.
       *
       * Used to detect the current platform, as well as do things like override the
       * Android back button in PhoneGap/Cordova.
       */
      IonicModule
      .provider('$ionicPlatform', function() {
        return {
          $get: ['$q', '$rootScope', function($q, $rootScope) {
            var self = {
      
              /**
               * @ngdoc method
               * @name $ionicPlatform#onHardwareBackButton
               * @description
               * Some platforms have a hardware back button, so this is one way to
               * bind to it.
               * @param {function} callback the callback to trigger when this event occurs
               */
              onHardwareBackButton: function(cb) {
                ionic.Platform.ready(function() {
                  document.addEventListener('backbutton', cb, false);
                });
              },
      
              /**
               * @ngdoc method
               * @name $ionicPlatform#offHardwareBackButton
               * @description
               * Remove an event listener for the backbutton.
               * @param {function} callback The listener function that was
               * originally bound.
               */
              offHardwareBackButton: function(fn) {
                ionic.Platform.ready(function() {
                  document.removeEventListener('backbutton', fn);
                });
              },
      
              /**
               * @ngdoc method
               * @name $ionicPlatform#registerBackButtonAction
               * @description
               * Register a hardware back button action. Only one action will execute
               * when the back button is clicked, so this method decides which of
               * the registered back button actions has the highest priority.
               *
               * For example, if an actionsheet is showing, the back button should
               * close the actionsheet, but it should not also go back a page view
               * or close a modal which may be open.
               *
               * @param {function} callback Called when the back button is pressed,
               * if this listener is the highest priority.
               * @param {number} priority Only the highest priority will execute.
               * @param {*=} actionId The id to assign this action. Default: a
               * random unique id.
               * @returns {function} A function that, when called, will deregister
               * this backButtonAction.
               */
              $backButtonActions: {},
              registerBackButtonAction: function(fn, priority, actionId) {
      
                if(!self._hasBackButtonHandler) {
                  // add a back button listener if one hasn't been setup yet
                  self.$backButtonActions = {};
                  self.onHardwareBackButton(self.hardwareBackButtonClick);
                  self._hasBackButtonHandler = true;
                }
      
                var action = {
                  id: (actionId ? actionId : ionic.Utils.nextUid()),
                  priority: (priority ? priority : 0),
                  fn: fn
                };
                self.$backButtonActions[action.id] = action;
      
                // return a function to de-register this back button action
                return function() {
                  delete self.$backButtonActions[action.id];
                };
              },
      
              /**
               * @private
               */
              hardwareBackButtonClick: function(e){
                // loop through all the registered back button actions
                // and only run the last one of the highest priority
                var priorityAction, actionId;
                for(actionId in self.$backButtonActions) {
                  if(!priorityAction || self.$backButtonActions[actionId].priority >= priorityAction.priority) {
                    priorityAction = self.$backButtonActions[actionId];
                  }
                }
                if(priorityAction) {
                  priorityAction.fn(e);
                  return priorityAction;
                }
              },
      
              is: function(type) {
                return ionic.Platform.is(type);
              },
      
              /**
               * @ngdoc method
               * @name $ionicPlatform#on
               * @description
               * Add Cordova event listeners, such as `pause`, `resume`, `volumedownbutton`, `batterylow`,
               * `offline`, etc. More information about available event types can be found in
               * [Cordova's event documentation](https://cordova.apache.org/docs/en/edge/cordova_events_events.md.html#Events).
               * @param {string} type Cordova [event type](https://cordova.apache.org/docs/en/edge/cordova_events_events.md.html#Events).
               * @param {function} callback Called when the Cordova event is fired.
               * @returns {function} Returns a deregistration function to remove the event listener.
               */
              on: function(type, cb) {
                ionic.Platform.ready(function(){
                  document.addEventListener(type, cb, false);
                });
                return function() {
                  ionic.Platform.ready(function(){
                    document.removeEventListener(type, cb);
                  });
                };
              },
      
              /**
               * @ngdoc method
               * @name $ionicPlatform#ready
               * @description
               * Trigger a callback once the device is ready,
               * or immediately if the device is already ready.
               * @param {function=} callback The function to call.
               * @returns {promise} A promise which is resolved when the device is ready.
               */
              ready: function(cb) {
                var q = $q.defer();
      
                ionic.Platform.ready(function(){
                  q.resolve();
                  cb && cb();
                });
      
                return q.promise;
              }
            };
            return self;
          }]
        };
      
      });
      
      
      /**
       * @ngdoc service
       * @name $ionicPopover
       * @module ionic
       * @description
       *
       * Related: {@link ionic.controller:ionicPopover ionicPopover controller}.
       *
       * The Popover is a view that floats above an app’s content. Popovers provide an
       * easy way to present or gather information from the user and are
       * commonly used in the following situations:
       *
       * - Show more info about the current view
       * - Select a commonly used tool or configuration
       * - Present a list of actions to perform inside one of your views
       *
       * Put the content of the popover inside of an `<ion-popover-view>` element.
       *
       * @usage
       * ```html
       * <p>
       *   <button ng-click="openPopover($event)">Open Popover</button>
       * </p>
       *
       * <script id="my-popover.html" type="text/ng-template">
       *   <ion-popover-view>
       *     <ion-header-bar>
       *       <h1 class="title">My Popover Title</h1>
       *     </ion-header-bar>
       *     <ion-content>
       *       Hello!
       *     </ion-content>
       *   </ion-popover-view>
       * </script>
       * ```
       * ```js
       * angular.module('testApp', ['ionic'])
       * .controller('MyController', function($scope, $ionicPopover) {
       *   $ionicPopover.fromTemplateUrl('my-popover.html', {
       *     scope: $scope,
       *   }).then(function(popover) {
       *     $scope.popover = popover;
       *   });
       *   $scope.openPopover = function($event) {
       *     $scope.popover.show($event);
       *   };
       *   $scope.closePopover = function() {
       *     $scope.popover.hide();
       *   };
       *   //Cleanup the popover when we're done with it!
       *   $scope.$on('$destroy', function() {
       *     $scope.popover.remove();
       *   });
       *   // Execute action on hide popover
       *   $scope.$on('popover.hidden', function() {
       *     // Execute action
       *   });
       *   // Execute action on remove popover
       *   $scope.$on('popover.removed', function() {
       *     // Execute action
       *   });
       * });
       * ```
       */
      
      
      IonicModule
      .factory('$ionicPopover', ['$ionicModal', '$ionicPosition', '$document', '$window',
      function($ionicModal, $ionicPosition, $document, $window) {
      
        var POPOVER_BODY_PADDING = 6;
      
        var POPOVER_OPTIONS = {
          viewType: 'popover',
          hideDelay: 1,
          animation: 'none',
          positionView: positionView
        };
      
        function positionView(target, popoverEle) {
          var targetEle = angular.element(target.target || target);
          var buttonOffset = $ionicPosition.offset( targetEle );
          var popoverWidth = popoverEle.prop('offsetWidth');
          var popoverHeight = popoverEle.prop('offsetHeight');
          var bodyWidth = $document[0].body.clientWidth;
          // clientHeight doesn't work on all platforms for body
          var bodyHeight = $window.innerHeight;
      
          var popoverCSS = {
            left: buttonOffset.left + buttonOffset.width / 2 - popoverWidth / 2
          };
          var arrowEle = jqLite(popoverEle[0].querySelector('.popover-arrow'));
      
          if (popoverCSS.left < POPOVER_BODY_PADDING) {
            popoverCSS.left = POPOVER_BODY_PADDING;
          } else if(popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
          }
      
          // If the popover when popped down stretches past bottom of screen,
          // make it pop up
          if (buttonOffset.top + buttonOffset.height + popoverHeight > bodyHeight) {
            popoverCSS.top = buttonOffset.top - popoverHeight;
            popoverEle.addClass('popover-bottom');
          } else {
            popoverCSS.top = buttonOffset.top + buttonOffset.height;
            popoverEle.removeClass('popover-bottom');
          }
      
          arrowEle.css({
            left: buttonOffset.left + buttonOffset.width / 2 -
              arrowEle.prop('offsetWidth') / 2 - popoverCSS.left + 'px'
          });
      
          popoverEle.css({
            top: popoverCSS.top + 'px',
            left: popoverCSS.left + 'px',
            marginLeft: '0',
            opacity: '1'
          });
      
        }
      
        /**
         * @ngdoc controller
         * @name ionicPopover
         * @module ionic
         * @description
         * Instantiated by the {@link ionic.service:$ionicPopover} service.
         *
         * Be sure to call [remove()](#remove) when you are done with each popover
         * to clean it up and avoid memory leaks.
         *
         * Note: a popover will broadcast 'popover.shown', 'popover.hidden', and 'popover.removed' events from its originating
         * scope, passing in itself as an event argument. Both the popover.removed and popover.hidden events are
         * called when the popover is removed.
         */
      
        /**
         * @ngdoc method
         * @name ionicPopover#initialize
         * @description Creates a new popover controller instance.
         * @param {object} options An options object with the following properties:
         *  - `{object=}` `scope` The scope to be a child of.
         *    Default: creates a child of $rootScope.
         *  - `{boolean=}` `focusFirstInput` Whether to autofocus the first input of
         *    the popover when shown.  Default: false.
         *  - `{boolean=}` `backdropClickToClose` Whether to close the popover on clicking the backdrop.
         *    Default: true.
         *  - `{boolean=}` `hardwareBackButtonClose` Whether the popover can be closed using the hardware
         *    back button on Android and similar devices.  Default: true.
         */
      
        /**
         * @ngdoc method
         * @name ionicPopover#show
         * @description Show this popover instance.
         * @param {$event} $event The $event or target element which the popover should align
         * itself next to.
         * @returns {promise} A promise which is resolved when the popover is finished animating in.
         */
      
        /**
         * @ngdoc method
         * @name ionicPopover#hide
         * @description Hide this popover instance.
         * @returns {promise} A promise which is resolved when the popover is finished animating out.
         */
      
        /**
         * @ngdoc method
         * @name ionicPopover#remove
         * @description Remove this popover instance from the DOM and clean up.
         * @returns {promise} A promise which is resolved when the popover is finished animating out.
         */
      
        /**
         * @ngdoc method
         * @name ionicPopover#isShown
         * @returns boolean Whether this popover is currently shown.
         */
      
        return {
          /**
           * @ngdoc method
           * @name $ionicPopover#fromTemplate
           * @param {string} templateString The template string to use as the popovers's
           * content.
           * @param {object} options Options to be passed to the initialize method.
           * @returns {object} An instance of an {@link ionic.controller:ionicPopover}
           * controller ($ionicPopover is built on top of $ionicPopover).
           */
          fromTemplate: function(templateString, options) {
            return $ionicModal.fromTemplate(templateString, ionic.Utils.extend(options || {}, POPOVER_OPTIONS) );
          },
          /**
           * @ngdoc method
           * @name $ionicPopover#fromTemplateUrl
           * @param {string} templateUrl The url to load the template from.
           * @param {object} options Options to be passed to the initialize method.
           * @returns {promise} A promise that will be resolved with an instance of
           * an {@link ionic.controller:ionicPopover} controller ($ionicPopover is built on top of $ionicPopover).
           */
          fromTemplateUrl: function(url, options, _) {
            return $ionicModal.fromTemplateUrl(url, options, ionic.Utils.extend(options || {}, POPOVER_OPTIONS) );
          }
        };
      
      }]);
      
      
      var POPUP_TPL =
        '<div class="popup-container">' +
          '<div class="popup">' +
            '<div class="popup-head">' +
              '<h3 class="popup-title" ng-bind-html="title"></h3>' +
              '<h5 class="popup-sub-title" ng-bind-html="subTitle" ng-if="subTitle"></h5>' +
            '</div>' +
            '<div class="popup-body">' +
            '</div>' +
            '<div class="popup-buttons">' +
              '<button ng-repeat="button in buttons" ng-click="$buttonTapped(button, $event)" class="button" ng-class="button.type || \'button-default\'" ng-bind-html="button.text"></button>' +
            '</div>' +
          '</div>' +
        '</div>';
      
      /**
       * @ngdoc service
       * @name $ionicPopup
       * @module ionic
       * @restrict E
       * @codepen zkmhJ
       * @description
       *
       * The Ionic Popup service allows programmatically creating and showing popup
       * windows that require the user to respond in order to continue.
       *
       * The popup system has support for more flexible versions of the built in `alert()`, `prompt()`,
       * and `confirm()` functions that users are used to, in addition to allowing popups with completely
       * custom content and look.
       *
       * An input can be given an `autofocus` attribute so it automatically receives focus when
       * the popup first shows. However, depending on certain use-cases this can cause issues with
       * the tap/click system, which is why Ionic prefers using the `autofocus` attribute as
       * an opt-in feature and not the default.
       *
       * @usage
       * A few basic examples, see below for details about all of the options available.
       *
       * ```js
       *angular.module('mySuperApp', ['ionic'])
       *.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
       *
       * // Triggered on a button click, or some other target
       * $scope.showPopup = function() {
       *   $scope.data = {}
       *
       *   // An elaborate, custom popup
       *   var myPopup = $ionicPopup.show({
       *     template: '<input type="password" ng-model="data.wifi">',
       *     title: 'Enter Wi-Fi Password',
       *     subTitle: 'Please use normal things',
       *     scope: $scope,
       *     buttons: [
       *       { text: 'Cancel' },
       *       {
       *         text: '<b>Save</b>',
       *         type: 'button-positive',
       *         onTap: function(e) {
       *           if (!$scope.data.wifi) {
       *             //don't allow the user to close unless he enters wifi password
       *             e.preventDefault();
       *           } else {
       *             return $scope.data.wifi;
       *           }
       *         }
       *       },
       *     ]
       *   });
       *   myPopup.then(function(res) {
       *     console.log('Tapped!', res);
       *   });
       *   $timeout(function() {
       *      myPopup.close(); //close the popup after 3 seconds for some reason
       *   }, 3000);
       *  };
       *  // A confirm dialog
       *  $scope.showConfirm = function() {
       *    var confirmPopup = $ionicPopup.confirm({
       *      title: 'Consume Ice Cream',
       *      template: 'Are you sure you want to eat this ice cream?'
       *    });
       *    confirmPopup.then(function(res) {
       *      if(res) {
       *        console.log('You are sure');
       *      } else {
       *        console.log('You are not sure');
       *      }
       *    });
       *  };
       *
       *  // An alert dialog
       *  $scope.showAlert = function() {
       *    var alertPopup = $ionicPopup.alert({
       *      title: 'Don\'t eat that!',
       *      template: 'It might taste good'
       *    });
       *    alertPopup.then(function(res) {
       *      console.log('Thank you for not eating my delicious ice cream cone');
       *    });
       *  };
       *});
       *```
       */
      
      IonicModule
      .factory('$ionicPopup', [
        '$ionicTemplateLoader',
        '$ionicBackdrop',
        '$q',
        '$timeout',
        '$rootScope',
        '$ionicBody',
        '$compile',
        '$ionicPlatform',
      function($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $ionicBody, $compile, $ionicPlatform) {
        //TODO allow this to be configured
        var config = {
          stackPushDelay: 75
        };
        var popupStack = [];
        var $ionicPopup = {
          /**
           * @ngdoc method
           * @description
           * Show a complex popup. This is the master show function for all popups.
           *
           * A complex popup has a `buttons` array, with each button having a `text` and `type`
           * field, in addition to an `onTap` function.  The `onTap` function, called when
           * the correspondingbutton on the popup is tapped, will by default close the popup
           * and resolve the popup promise with its return value.  If you wish to prevent the
           * default and keep the popup open on button tap, call `event.preventDefault()` on the
           * passed in tap event.  Details below.
           *
           * @name $ionicPopup#show
           * @param {object} options The options for the new popup, of the form:
           *
           * ```
           * {
           *   title: '', // String. The title of the popup.
           *   subTitle: '', // String (optional). The sub-title of the popup.
           *   template: '', // String (optional). The html template to place in the popup body.
           *   templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
           *   scope: null, // Scope (optional). A scope to link to the popup content.
           *   buttons: [{ //Array[Object] (optional). Buttons to place in the popup footer.
           *     text: 'Cancel',
           *     type: 'button-default',
           *     onTap: function(e) {
           *       // e.preventDefault() will stop the popup from closing when tapped.
           *       e.preventDefault();
           *     }
           *   }, {
           *     text: 'OK',
           *     type: 'button-positive',
           *     onTap: function(e) {
           *       // Returning a value will cause the promise to resolve with the given value.
           *       return scope.data.response;
           *     }
           *   }]
           * }
           * ```
           *
           * @returns {object} A promise which is resolved when the popup is closed. Has an additional
           * `close` function, which can be used to programmatically close the popup.
           */
          show: showPopup,
      
          /**
           * @ngdoc method
           * @name $ionicPopup#alert
           * @description Show a simple alert popup with a message and one button that the user can
           * tap to close the popup.
           *
           * @param {object} options The options for showing the alert, of the form:
           *
           * ```
           * {
           *   title: '', // String. The title of the popup.
           *   subTitle: '', // String (optional). The sub-title of the popup.
           *   template: '', // String (optional). The html template to place in the popup body.
           *   templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
           *   okText: '', // String (default: 'OK'). The text of the OK button.
           *   okType: '', // String (default: 'button-positive'). The type of the OK button.
           * }
           * ```
           *
           * @returns {object} A promise which is resolved when the popup is closed. Has one additional
           * function `close`, which can be called with any value to programmatically close the popup
           * with the given value.
           */
          alert: showAlert,
      
          /**
           * @ngdoc method
           * @name $ionicPopup#confirm
           * @description
           * Show a simple confirm popup with a Cancel and OK button.
           *
           * Resolves the promise with true if the user presses the OK button, and false if the
           * user presses the Cancel button.
           *
           * @param {object} options The options for showing the confirm popup, of the form:
           *
           * ```
           * {
           *   title: '', // String. The title of the popup.
           *   subTitle: '', // String (optional). The sub-title of the popup.
           *   template: '', // String (optional). The html template to place in the popup body.
           *   templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
           *   cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
           *   cancelType: '', // String (default: 'button-default'). The type of the Cancel button.
           *   okText: '', // String (default: 'OK'). The text of the OK button.
           *   okType: '', // String (default: 'button-positive'). The type of the OK button.
           * }
           * ```
           *
           * @returns {object} A promise which is resolved when the popup is closed. Has one additional
           * function `close`, which can be called with any value to programmatically close the popup
           * with the given value.
           */
          confirm: showConfirm,
      
          /**
           * @ngdoc method
           * @name $ionicPopup#prompt
           * @description Show a simple prompt popup, which has an input, OK button, and Cancel button.
           * Resolves the promise with the value of the input if the user presses OK, and with undefined
           * if the user presses Cancel.
           *
           * ```javascript
           *  $ionicPopup.prompt({
           *    title: 'Password Check',
           *    template: 'Enter your secret password',
           *    inputType: 'password',
           *    inputPlaceholder: 'Your password'
           *  }).then(function(res) {
           *    console.log('Your password is', res);
           *  });
           * ```
           * @param {object} options The options for showing the prompt popup, of the form:
           *
           * ```
           * {
           *   title: '', // String. The title of the popup.
           *   subTitle: '', // String (optional). The sub-title of the popup.
           *   template: '', // String (optional). The html template to place in the popup body.
           *   templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
           *   inputType: // String (default: 'text'). The type of input to use
           *   inputPlaceholder: // String (default: ''). A placeholder to use for the input.
           *   cancelText: // String (default: 'Cancel'. The text of the Cancel button.
           *   cancelType: // String (default: 'button-default'). The type of the Cancel button.
           *   okText: // String (default: 'OK'). The text of the OK button.
           *   okType: // String (default: 'button-positive'). The type of the OK button.
           * }
           * ```
           *
           * @returns {object} A promise which is resolved when the popup is closed. Has one additional
           * function `close`, which can be called with any value to programmatically close the popup
           * with the given value.
           */
          prompt: showPrompt,
          /**
           * @private for testing
           */
          _createPopup: createPopup,
          _popupStack: popupStack
        };
      
        return $ionicPopup;
      
        function createPopup(options) {
          options = extend({
            scope: null,
            title: '',
            buttons: [],
          }, options || {});
      
          var popupPromise = $ionicTemplateLoader.compile({
            template: POPUP_TPL,
            scope: options.scope && options.scope.$new(),
            appendTo: $ionicBody.get()
          });
          var contentPromise = options.templateUrl ?
            $ionicTemplateLoader.load(options.templateUrl) :
            $q.when(options.template || options.content || '');
      
          return $q.all([popupPromise, contentPromise])
          .then(function(results) {
            var self = results[0];
            var content = results[1];
            var responseDeferred = $q.defer();
      
            self.responseDeferred = responseDeferred;
      
            //Can't ng-bind-html for popup-body because it can be insecure html
            //(eg an input in case of prompt)
            var body = jqLite(self.element[0].querySelector('.popup-body'));
            if (content) {
              body.html(content);
              $compile(body.contents())(self.scope);
            } else {
              body.remove();
            }
      
            extend(self.scope, {
              title: options.title,
              buttons: options.buttons,
              subTitle: options.subTitle,
              $buttonTapped: function(button, event) {
                var result = (button.onTap || angular.noop)(event);
                event = event.originalEvent || event; //jquery events
      
                if (!event.defaultPrevented) {
                  responseDeferred.resolve(result);
                }
              }
            });
      
            self.show = function() {
              if (self.isShown) return;
      
              self.isShown = true;
              ionic.requestAnimationFrame(function() {
                //if hidden while waiting for raf, don't show
                if (!self.isShown) return;
      
                self.element.removeClass('popup-hidden');
                self.element.addClass('popup-showing active');
                focusInput(self.element);
              });
            };
            self.hide = function(callback) {
              callback = callback || angular.noop;
              if (!self.isShown) return callback();
      
              self.isShown = false;
              self.element.removeClass('active');
              self.element.addClass('popup-hidden');
              $timeout(callback, 250);
            };
            self.remove = function() {
              if (self.removed) return;
      
              self.hide(function() {
                self.element.remove();
                self.scope.$destroy();
              });
      
              self.removed = true;
            };
      
            return self;
          });
        }
      
        function onHardwareBackButton(e) {
          popupStack[0] && popupStack[0].responseDeferred.resolve();
        }
      
        function showPopup(options) {
          var popupPromise = $ionicPopup._createPopup(options);
          var previousPopup = popupStack[0];
      
          if (previousPopup) {
            previousPopup.hide();
          }
      
          var resultPromise = $timeout(angular.noop, previousPopup ? config.stackPushDelay : 0)
          .then(function() { return popupPromise; })
          .then(function(popup) {
            if (!previousPopup) {
              //Add popup-open & backdrop if this is first popup
              $ionicBody.addClass('popup-open');
              $ionicBackdrop.retain();
              //only show the backdrop on the first popup
              $ionicPopup._backButtonActionDone = $ionicPlatform.registerBackButtonAction(
                onHardwareBackButton,
                PLATFORM_BACK_BUTTON_PRIORITY_POPUP
              );
            }
            popupStack.unshift(popup);
            popup.show();
      
            //DEPRECATED: notify the promise with an object with a close method
            popup.responseDeferred.notify({
              close: resultPromise.close
            });
      
            return popup.responseDeferred.promise.then(function(result) {
              var index = popupStack.indexOf(popup);
              if (index !== -1) {
                popupStack.splice(index, 1);
              }
              popup.remove();
      
              var previousPopup = popupStack[0];
              if (previousPopup) {
                previousPopup.show();
              } else {
                //Remove popup-open & backdrop if this is last popup
                $timeout(function(){
                  // wait to remove this due to a 300ms delay native
                  // click which would trigging whatever was underneath this
                  $ionicBody.removeClass('popup-open');
                }, 400);
                $ionicBackdrop.release();
                ($ionicPopup._backButtonActionDone || angular.noop)();
              }
              return result;
            });
          });
      
          function close(result) {
            popupPromise.then(function(popup) {
              if (!popup.removed) {
                popup.responseDeferred.resolve(result);
              }
            });
          }
          resultPromise.close = close;
      
          return resultPromise;
        }
      
        function focusInput(element) {
          var focusOn = element[0].querySelector('[autofocus]');
          if (focusOn) {
            focusOn.focus();
          }
        }
      
        function showAlert(opts) {
          return showPopup( extend({
            buttons: [{
              text: opts.okText || 'OK',
              type: opts.okType || 'button-positive',
              onTap: function(e) {
                return true;
              }
            }]
          }, opts || {}) );
        }
      
        function showConfirm(opts) {
          return showPopup( extend({
            buttons: [{
              text: opts.cancelText || 'Cancel' ,
              type: opts.cancelType || 'button-default',
              onTap: function(e) { return false; }
            }, {
              text: opts.okText || 'OK',
              type: opts.okType || 'button-positive',
              onTap: function(e) { return true; }
            }]
          }, opts || {}) );
        }
      
        function showPrompt(opts) {
          var scope = $rootScope.$new(true);
          scope.data = {};
          var text = '';
          if(opts.template && /<[a-z][\s\S]*>/i.test(opts.template) === false){
            text = '<span>'+opts.template+'</span>';
            delete opts.template;
          }
          return showPopup( extend({
            template: text+'<input ng-model="data.response" type="' + (opts.inputType || 'text') +
              '" placeholder="' + (opts.inputPlaceholder || '') + '">',
            scope: scope,
            buttons: [{
              text: opts.cancelText || 'Cancel',
              type: opts.cancelType|| 'button-default',
              onTap: function(e) {}
            }, {
              text: opts.okText || 'OK',
              type: opts.okType || 'button-positive',
              onTap: function(e) {
                return scope.data.response || '';
              }
            }]
          }, opts || {}) );
        }
      }]);
      
      
      /**
       * @ngdoc service
       * @name $ionicPosition
       * @module ionic
       * @description
       * A set of utility methods that can be use to retrieve position of DOM elements.
       * It is meant to be used where we need to absolute-position DOM elements in
       * relation to other, existing elements (this is the case for tooltips, popovers, etc.).
       *
       * Adapted from [AngularUI Bootstrap](https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js),
       * ([license](https://github.com/angular-ui/bootstrap/blob/master/LICENSE))
       */
      IonicModule
      .factory('$ionicPosition', ['$document', '$window', function ($document, $window) {
      
        function getStyle(el, cssprop) {
          if (el.currentStyle) { //IE
            return el.currentStyle[cssprop];
          } else if ($window.getComputedStyle) {
            return $window.getComputedStyle(el)[cssprop];
          }
          // finally try and get inline style
          return el.style[cssprop];
        }
      
        /**
         * Checks if a given element is statically positioned
         * @param element - raw DOM element
         */
        function isStaticPositioned(element) {
          return (getStyle(element, 'position') || 'static' ) === 'static';
        }
      
        /**
         * returns the closest, non-statically positioned parentOffset of a given element
         * @param element
         */
        var parentOffsetEl = function (element) {
          var docDomEl = $document[0];
          var offsetParent = element.offsetParent || docDomEl;
          while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
            offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || docDomEl;
        };
      
        return {
          /**
           * @ngdoc method
           * @name $ionicPosition#position
           * @description Get the current coordinates of the element, relative to the offset parent.
           * Read-only equivalent of [jQuery's position function](http://api.jquery.com/position/).
           * @param {element} element The element to get the position of.
           * @returns {object} Returns an object containing the properties top, left, width and height.
           */
          position: function (element) {
            var elBCR = this.offset(element);
            var offsetParentBCR = { top: 0, left: 0 };
            var offsetParentEl = parentOffsetEl(element[0]);
            if (offsetParentEl != $document[0]) {
              offsetParentBCR = this.offset(angular.element(offsetParentEl));
              offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
              offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
            }
      
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
              width: boundingClientRect.width || element.prop('offsetWidth'),
              height: boundingClientRect.height || element.prop('offsetHeight'),
              top: elBCR.top - offsetParentBCR.top,
              left: elBCR.left - offsetParentBCR.left
            };
          },
      
          /**
           * @ngdoc method
           * @name $ionicPosition#offset
           * @description Get the current coordinates of the element, relative to the document.
           * Read-only equivalent of [jQuery's offset function](http://api.jquery.com/offset/).
           * @param {element} element The element to get the offset of.
           * @returns {object} Returns an object containing the properties top, left, width and height.
           */
          offset: function (element) {
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
              width: boundingClientRect.width || element.prop('offsetWidth'),
              height: boundingClientRect.height || element.prop('offsetHeight'),
              top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
              left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
            };
          }
      
        };
      }]);
      
      
      /**
       * @ngdoc service
       * @name $ionicScrollDelegate
       * @module ionic
       * @description
       * Delegate for controlling scrollViews (created by
       * {@link ionic.directive:ionContent} and
       * {@link ionic.directive:ionScroll} directives).
       *
       * Methods called directly on the $ionicScrollDelegate service will control all scroll
       * views.  Use the {@link ionic.service:$ionicScrollDelegate#$getByHandle $getByHandle}
       * method to control specific scrollViews.
       *
       * @usage
       *
       * ```html
       * <body ng-controller="MainCtrl">
       *   <ion-content>
       *     <button ng-click="scrollTop()">Scroll to Top!</button>
       *   </ion-content>
       * </body>
       * ```
       * ```js
       * function MainCtrl($scope, $ionicScrollDelegate) {
       *   $scope.scrollTop = function() {
       *     $ionicScrollDelegate.scrollTop();
       *   };
       * }
       * ```
       *
       * Example of advanced usage, with two scroll areas using `delegate-handle`
       * for fine control.
       *
       * ```html
       * <body ng-controller="MainCtrl">
       *   <ion-content delegate-handle="mainScroll">
       *     <button ng-click="scrollMainToTop()">
       *       Scroll content to top!
       *     </button>
       *     <ion-scroll delegate-handle="small" style="height: 100px;">
       *       <button ng-click="scrollSmallToTop()">
       *         Scroll small area to top!
       *       </button>
       *     </ion-scroll>
       *   </ion-content>
       * </body>
       * ```
       * ```js
       * function MainCtrl($scope, $ionicScrollDelegate) {
       *   $scope.scrollMainToTop = function() {
       *     $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
       *   };
       *   $scope.scrollSmallToTop = function() {
       *     $ionicScrollDelegate.$getByHandle('small').scrollTop();
       *   };
       * }
       * ```
       */
      IonicModule
      .service('$ionicScrollDelegate', delegateService([
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#resize
         * @description Tell the scrollView to recalculate the size of its container.
         */
        'resize',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#scrollTop
         * @param {boolean=} shouldAnimate Whether the scroll should animate.
         */
        'scrollTop',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#scrollBottom
         * @param {boolean=} shouldAnimate Whether the scroll should animate.
         */
        'scrollBottom',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#scrollTo
         * @param {number} left The x-value to scroll to.
         * @param {number} top The y-value to scroll to.
         * @param {boolean=} shouldAnimate Whether the scroll should animate.
         */
        'scrollTo',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#scrollBy
         * @param {number} left The x-offset to scroll by.
         * @param {number} top The y-offset to scroll by.
         * @param {boolean=} shouldAnimate Whether the scroll should animate.
         */
        'scrollBy',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#zoomTo
         * @param {number} level Level to zoom to.
         * @param {boolean=} animate Whether to animate the zoom.
         * @param {number=} originLeft Zoom in at given left coordinate.
         * @param {number=} originTop Zoom in at given top coordinate.
         */
        'zoomTo',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#zoomBy
         * @param {number} factor The factor to zoom by.
         * @param {boolean=} animate Whether to animate the zoom.
         * @param {number=} originLeft Zoom in at given left coordinate.
         * @param {number=} originTop Zoom in at given top coordinate.
         */
        'zoomBy',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#getScrollPosition
         * @returns {object} The scroll position of this view, with the following properties:
         *  - `{number}` `left` The distance the user has scrolled from the left (starts at 0).
         *  - `{number}` `top` The distance the user has scrolled from the top (starts at 0).
         */
        'getScrollPosition',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#anchorScroll
         * @description Tell the scrollView to scroll to the element with an id
         * matching window.location.hash.
         *
         * If no matching element is found, it will scroll to top.
         *
         * @param {boolean=} shouldAnimate Whether the scroll should animate.
         */
        'anchorScroll',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#getScrollView
         * @returns {object} The scrollView associated with this delegate.
         */
        'getScrollView',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#rememberScrollPosition
         * @description
         * Will make it so, when this scrollView is destroyed (user leaves the page),
         * the last scroll position the page was on will be saved, indexed by the
         * given id.
         *
         * Note: for pages associated with a view under an ion-nav-view,
         * rememberScrollPosition automatically saves their scroll.
         *
         * Related methods: scrollToRememberedPosition, forgetScrollPosition (below).
         *
         * In the following example, the scroll position of the ion-scroll element
         * will persist, even when the user changes the toggle switch.
         *
         * ```html
         * <ion-toggle ng-model="shouldShowScrollView"></ion-toggle>
         * <ion-scroll delegate-handle="myScroll" ng-if="shouldShowScrollView">
         *   <div ng-controller="ScrollCtrl">
         *     <ion-list>
         *       {% raw %}<ion-item ng-repeat="i in items">{{i}}</ion-item>{% endraw %}
         *     </ion-list>
         *   </div>
         * </ion-scroll>
         * ```
         * ```js
         * function ScrollCtrl($scope, $ionicScrollDelegate) {
         *   var delegate = $ionicScrollDelegate.$getByHandle('myScroll');
         *
         *   // Put any unique ID here.  The point of this is: every time the controller is recreated
         *   // we want to load the correct remembered scroll values.
         *   delegate.rememberScrollPosition('my-scroll-id');
         *   delegate.scrollToRememberedPosition();
         *   $scope.items = [];
         *   for (var i=0; i<100; i++) {
         *     $scope.items.push(i);
         *   }
         * }
         * ```
         *
         * @param {string} id The id to remember the scroll position of this
         * scrollView by.
         */
        'rememberScrollPosition',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#forgetScrollPosition
         * @description
         * Stop remembering the scroll position for this scrollView.
         */
        'forgetScrollPosition',
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#scrollToRememberedPosition
         * @description
         * If this scrollView has an id associated with its scroll position,
         * (through calling rememberScrollPosition), and that position is remembered,
         * load the position and scroll to it.
         * @param {boolean=} shouldAnimate Whether to animate the scroll.
         */
        'scrollToRememberedPosition'
        /**
         * @ngdoc method
         * @name $ionicScrollDelegate#$getByHandle
         * @param {string} handle
         * @returns `delegateInstance` A delegate instance that controls only the
         * scrollViews with `delegate-handle` matching the given handle.
         *
         * Example: `$ionicScrollDelegate.$getByHandle('my-handle').scrollTop();`
         */
      ]));
      
      
      /**
       * @ngdoc service
       * @name $ionicSideMenuDelegate
       * @module ionic
       *
       * @description
       * Delegate for controlling the {@link ionic.directive:ionSideMenus} directive.
       *
       * Methods called directly on the $ionicSideMenuDelegate service will control all side
       * menus.  Use the {@link ionic.service:$ionicSideMenuDelegate#$getByHandle $getByHandle}
       * method to control specific ionSideMenus instances.
       *
       * @usage
       *
       * ```html
       * <body ng-controller="MainCtrl">
       *   <ion-side-menus>
       *     <ion-side-menu-content>
       *       Content!
       *       <button ng-click="toggleLeftSideMenu()">
       *         Toggle Left Side Menu
       *       </button>
       *     </ion-side-menu-content>
       *     <ion-side-menu side="left">
       *       Left Menu!
       *     <ion-side-menu>
       *   </ion-side-menus>
       * </body>
       * ```
       * ```js
       * function MainCtrl($scope, $ionicSideMenuDelegate) {
       *   $scope.toggleLeftSideMenu = function() {
       *     $ionicSideMenuDelegate.toggleLeft();
       *   };
       * }
       * ```
       */
      IonicModule
      .service('$ionicSideMenuDelegate', delegateService([
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#toggleLeft
         * @description Toggle the left side menu (if it exists).
         * @param {boolean=} isOpen Whether to open or close the menu.
         * Default: Toggles the menu.
         */
        'toggleLeft',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#toggleRight
         * @description Toggle the right side menu (if it exists).
         * @param {boolean=} isOpen Whether to open or close the menu.
         * Default: Toggles the menu.
         */
        'toggleRight',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#getOpenRatio
         * @description Gets the ratio of open amount over menu width. For example, a
         * menu of width 100 that is opened by 50 pixels is 50% opened, and would return
         * a ratio of 0.5.
         *
         * @returns {float} 0 if nothing is open, between 0 and 1 if left menu is
         * opened/opening, and between 0 and -1 if right menu is opened/opening.
         */
        'getOpenRatio',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#isOpen
         * @returns {boolean} Whether either the left or right menu is currently opened.
         */
        'isOpen',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#isOpenLeft
         * @returns {boolean} Whether the left menu is currently opened.
         */
        'isOpenLeft',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#isOpenRight
         * @returns {boolean} Whether the right menu is currently opened.
         */
        'isOpenRight',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#canDragContent
         * @param {boolean=} canDrag Set whether the content can or cannot be dragged to open
         * side menus.
         * @returns {boolean} Whether the content can be dragged to open side menus.
         */
        'canDragContent',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#edgeDragThreshold
         * @param {boolean|number=} value Set whether the content drag can only start if it is below a certain threshold distance from the edge of the screen. Accepts three different values:
         *  - If a non-zero number is given, that many pixels is used as the maximum allowed distance from the edge that starts dragging the side menu.
         *  - If true is given, the default number of pixels (25) is used as the maximum allowed distance.
         *  - If false or 0 is given, the edge drag threshold is disabled, and dragging from anywhere on the content is allowed.
         * @returns {boolean} Whether the drag can start only from within the edge of screen threshold.
         */
        'edgeDragThreshold',
        /**
         * @ngdoc method
         * @name $ionicSideMenuDelegate#$getByHandle
         * @param {string} handle
         * @returns `delegateInstance` A delegate instance that controls only the
         * {@link ionic.directive:ionSideMenus} directives with `delegate-handle` matching
         * the given handle.
         *
         * Example: `$ionicSideMenuDelegate.$getByHandle('my-handle').toggleLeft();`
         */
      ]));
      
      
      /**
       * @ngdoc service
       * @name $ionicSlideBoxDelegate
       * @module ionic
       * @description
       * Delegate that controls the {@link ionic.directive:ionSlideBox} directive.
       *
       * Methods called directly on the $ionicSlideBoxDelegate service will control all slide boxes.  Use the {@link ionic.service:$ionicSlideBoxDelegate#$getByHandle $getByHandle}
       * method to control specific slide box instances.
       *
       * @usage
       *
       * ```html
       * <body ng-controller="MyCtrl">
       *   <ion-slide-box>
       *     <ion-slide>
       *       <div class="box blue">
       *         <button ng-click="nextSlide()">Next slide!</button>
       *       </div>
       *     </ion-slide>
       *     <ion-slide>
       *       <div class="box red">
       *         Slide 2!
       *       </div>
       *     </ion-slide>
       *   </ion-slide-box>
       * </body>
       * ```
       * ```js
       * function MyCtrl($scope, $ionicSlideBoxDelegate) {
       *   $scope.nextSlide = function() {
       *     $ionicSlideBoxDelegate.next();
       *   }
       * }
       * ```
       */
      IonicModule
      .service('$ionicSlideBoxDelegate', delegateService([
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#update
         * @description
         * Update the slidebox (for example if using Angular with ng-repeat,
         * resize it for the elements inside).
         */
        'update',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#slide
         * @param {number} to The index to slide to.
         * @param {number=} speed The number of milliseconds for the change to take.
         */
        'slide',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#enableSlide
         * @param {boolean=} shouldEnable Whether to enable sliding the slidebox.
         * @returns {boolean} Whether sliding is enabled.
         */
        'enableSlide',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#previous
         * @description Go to the previous slide. Wraps around if at the beginning.
         */
        'previous',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#next
         * @description Go to the next slide. Wraps around if at the end.
         */
        'next',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#stop
         * @description Stop sliding. The slideBox will not move again until
         * explicitly told to do so.
         */
        'stop',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#start
         * @description Start sliding again if the slideBox was stopped. 
         */
        'start',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#currentIndex
         * @returns number The index of the current slide.
         */
        'currentIndex',
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#slidesCount
         * @returns number The number of slides there are currently.
         */
        'slidesCount'
        /**
         * @ngdoc method
         * @name $ionicSlideBoxDelegate#$getByHandle
         * @param {string} handle
         * @returns `delegateInstance` A delegate instance that controls only the
         * {@link ionic.directive:ionSlideBox} directives with `delegate-handle` matching
         * the given handle.
         *
         * Example: `$ionicSlideBoxDelegate.$getByHandle('my-handle').stop();`
         */
      ]));
      
      
      /**
       * @ngdoc service
       * @name $ionicTabsDelegate
       * @module ionic
       *
       * @description
       * Delegate for controlling the {@link ionic.directive:ionTabs} directive.
       *
       * Methods called directly on the $ionicTabsDelegate service will control all ionTabs
       * directives. Use the {@link ionic.service:$ionicTabsDelegate#$getByHandle $getByHandle}
       * method to control specific ionTabs instances.
       *
       * @usage
       *
       * ```html
       * <body ng-controller="MyCtrl">
       *   <ion-tabs>
       *
       *     <ion-tab title="Tab 1">
       *       Hello tab 1!
       *       <button ng-click="selectTabWithIndex(1)">Select tab 2!</button>
       *     </ion-tab>
       *     <ion-tab title="Tab 2">Hello tab 2!</ion-tab>
       *
       *   </ion-tabs>
       * </body>
       * ```
       * ```js
       * function MyCtrl($scope, $ionicTabsDelegate) {
       *   $scope.selectTabWithIndex = function(index) {
       *     $ionicTabsDelegate.select(index);
       *   }
       * }
       * ```
       */
      IonicModule
      .service('$ionicTabsDelegate', delegateService([
        /**
         * @ngdoc method
         * @name $ionicTabsDelegate#select
         * @description Select the tab matching the given index.
         *
         * @param {number} index Index of the tab to select.
         */
        'select',
        /**
         * @ngdoc method
         * @name $ionicTabsDelegate#selectedIndex
         * @returns `number` The index of the selected tab, or -1.
         */
        'selectedIndex'
        /**
         * @ngdoc method
         * @name $ionicTabsDelegate#$getByHandle
         * @param {string} handle
         * @returns `delegateInstance` A delegate instance that controls only the
         * {@link ionic.directive:ionTabs} directives with `delegate-handle` matching
         * the given handle.
         *
         * Example: `$ionicTabsDelegate.$getByHandle('my-handle').select(0);`
         */
      ]));
      
      
      // closure to keep things neat
      (function() {
        var templatesToCache = [];
      
      /**
       * @ngdoc service
       * @name $ionicTemplateCache
       * @module ionic
       * @description A service that preemptively caches template files to eliminate transition flicker and boost performance.
       * @usage
       * State templates are cached automatically, but you can optionally cache other templates.
       *
       * ```js
       * $ionicTemplateCache('myNgIncludeTemplate.html');
       * ```
       *
       * Optionally disable all preemptive caching with the `$ionicConfigProvider` or individual states by setting `prefetchTemplate`
       * in the `$state` definition
       *
       * ```js
       *   angular.module('myApp', ['ionic'])
       *   .config(function($stateProvider, $ionicConfigProvider) {
       *
       *     // disable preemptive template caching globally
       *     $ionicConfigProvider.prefetchTemplates(false);
       *
       *     // disable individual states
       *     $stateProvider
       *       .state('tabs', {
       *         url: "/tab",
       *         abstract: true,
       *         prefetchTemplate: false,
       *         templateUrl: "tabs-templates/tabs.html"
       *       })
       *       .state('tabs.home', {
       *         url: "/home",
       *         views: {
       *           'home-tab': {
       *             prefetchTemplate: false,
       *             templateUrl: "tabs-templates/home.html",
       *             controller: 'HomeTabCtrl'
       *           }
       *         }
       *       });
       *   });
       * ```
       */
      IonicModule
      .factory('$ionicTemplateCache', [
      '$http',
      '$templateCache',
      '$timeout',
      '$ionicConfig',
      function($http, $templateCache, $timeout, $ionicConfig) {
        var toCache = templatesToCache,
            hasRun = false;
      
        function $ionicTemplateCache(templates){
          if(toCache.length > 500) return false;
          if(typeof templates === 'undefined')return run();
          if(isString(templates))templates = [templates];
          forEach(templates, function(template){
            toCache.push(template);
          });
          // is this is being called after the initial IonicModule.run()
          if(hasRun) run();
        }
      
        // run through methods - internal method
        var run = function(){
          if($ionicConfig.prefetchTemplates === false)return;
          //console.log('prefetching', toCache);
          //for testing
          $ionicTemplateCache._runCount++;
      
          hasRun = true;
          // ignore if race condition already zeroed out array
          if(toCache.length === 0)return;
          //console.log(toCache);
          var i = 0;
          while ( i < 5 && (template = toCache.pop()) ) {
            // note that inline templates are ignored by this request
            if (isString(template)) $http.get(template, { cache: $templateCache });
            i++;
          }
          // only preload 5 templates a second
          if(toCache.length)$timeout(function(){run();}, 1000);
        };
      
        // exposing for testing
        $ionicTemplateCache._runCount = 0;
        // default method
        return $ionicTemplateCache;
      }])
      
      // Intercepts the $stateprovider.state() command to look for templateUrls that can be cached
      .config([
      '$stateProvider',
      '$ionicConfigProvider',
      function($stateProvider, $ionicConfigProvider) {
        var stateProviderState = $stateProvider.state;
        $stateProvider.state = function(stateName, definition) {
          // don't even bother if it's disabled. note, another config may run after this, so it's not a catch-all
          if(typeof definition === 'object' && $ionicConfigProvider.prefetchTemplates() !== false){
            var enabled = definition.prefetchTemplate !== false;
            if(enabled && isString(definition.templateUrl))templatesToCache.push(definition.templateUrl);
            if(angular.isObject(definition.views)){
              for (var key in definition.views){
                enabled = definition.views[key].prefetchTemplate !== false;
                if(enabled && isString(definition.views[key].templateUrl)) templatesToCache.push(definition.views[key].templateUrl);
              }
            }
          }
          return stateProviderState.call($stateProvider, stateName, definition);
        };
      }])
      
      // process the templateUrls collected by the $stateProvider, adding them to the cache
      .run([
      '$ionicTemplateCache',
      function($ionicTemplateCache) {
        $ionicTemplateCache();
      }]);
      
      })();
      
      IonicModule
      .factory('$ionicTemplateLoader', [
        '$compile',
        '$controller',
        '$http',
        '$q',
        '$rootScope',
        '$templateCache',
      function($compile, $controller, $http, $q, $rootScope, $templateCache) {
      
        return {
          load: fetchTemplate,
          compile: loadAndCompile
        };
      
        function fetchTemplate(url) {
          return $http.get(url, {cache: $templateCache})
          .then(function(response) {
            return response.data && response.data.trim();
          });
        }
      
        function loadAndCompile(options) {
          options = extend({
            template: '',
            templateUrl: '',
            scope: null,
            controller: null,
            locals: {},
            appendTo: null
          }, options || {});
      
          var templatePromise = options.templateUrl ?
            this.load(options.templateUrl) :
            $q.when(options.template);
      
          return templatePromise.then(function(template) {
            var controller;
            var scope = options.scope || $rootScope.$new();
      
            //Incase template doesn't have just one root element, do this
            var element = jqLite('<div>').html(template).contents();
      
            if (options.controller) {
              controller = $controller(
                options.controller,
                extend(options.locals, {
                  $scope: scope
                })
              );
              element.children().data('$ngControllerController', controller);
            }
            if (options.appendTo) {
              jqLite(options.appendTo).append(element);
            }
      
            $compile(element)(scope);
      
            return {
              element: element,
              scope: scope
            };
          });
        }
      
      }]);
      
      /**
       * @private
       * TODO document
       */
      IonicModule
      .run([
        '$rootScope',
        '$state',
        '$location',
        '$document',
        '$animate',
        '$ionicPlatform',
        '$ionicViewService',
      function($rootScope, $state, $location, $document, $animate, $ionicPlatform, $ionicViewService) {
      
        // init the variables that keep track of the view history
        $rootScope.$viewHistory = {
          histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
          views: {},
          backView: null,
          forwardView: null,
          currentView: null,
          disabledRegistrableTagNames: []
        };
      
        // set that these directives should not animate when transitioning
        // to it. Instead, the children <tab> directives would animate
        if ($ionicViewService.disableRegisterByTagName) {
          $ionicViewService.disableRegisterByTagName('ion-tabs');
          $ionicViewService.disableRegisterByTagName('ion-side-menus');
        }
      
        // always reset the keyboard state when change stage
        $rootScope.$on('$stateChangeStart', function(){
          ionic.keyboard.hide();
        });
      
        $rootScope.$on('viewState.changeHistory', function(e, data) {
          if(!data) return;
      
          var hist = (data.historyId ? $rootScope.$viewHistory.histories[ data.historyId ] : null );
          if(hist && hist.cursor > -1 && hist.cursor < hist.stack.length) {
            // the history they're going to already exists
            // go to it's last view in its stack
            var view = hist.stack[ hist.cursor ];
            return view.go(data);
          }
      
          // this history does not have a URL, but it does have a uiSref
          // figure out its URL from the uiSref
          if(!data.url && data.uiSref) {
            data.url = $state.href(data.uiSref);
          }
      
          if(data.url) {
            // don't let it start with a #, messes with $location.url()
            if(data.url.indexOf('#') === 0) {
              data.url = data.url.replace('#', '');
            }
            if(data.url !== $location.url()) {
              // we've got a good URL, ready GO!
              $location.url(data.url);
            }
          }
        });
      
        // Set the document title when a new view is shown
        $rootScope.$on('viewState.viewEnter', function(e, data) {
          if(data && data.title) {
            $document[0].title = data.title;
          }
        });
      
        // Triggered when devices with a hardware back button (Android) is clicked by the user
        // This is a Cordova/Phonegap platform specifc method
        function onHardwareBackButton(e) {
          if($rootScope.$viewHistory.backView) {
            // there is a back view, go to it
            $rootScope.$viewHistory.backView.go();
          } else {
            // there is no back view, so close the app instead
            ionic.Platform.exitApp();
          }
          e.preventDefault();
          return false;
        }
        $ionicPlatform.registerBackButtonAction(
          onHardwareBackButton,
          PLATFORM_BACK_BUTTON_PRIORITY_VIEW
        );
      
      }])
      
      .factory('$ionicViewService', [
        '$rootScope',
        '$state',
        '$location',
        '$window',
        '$injector',
        '$animate',
        '$ionicNavViewConfig',
        '$ionicClickBlock',
      function($rootScope, $state, $location, $window, $injector, $animate, $ionicNavViewConfig, $ionicClickBlock) {
      
        var View = function(){};
        View.prototype.initialize = function(data) {
          if(data) {
            for(var name in data) this[name] = data[name];
            return this;
          }
          return null;
        };
        View.prototype.go = function() {
      
          if(this.stateName) {
            return $state.go(this.stateName, this.stateParams);
          }
      
          if(this.url && this.url !== $location.url()) {
      
            if($rootScope.$viewHistory.backView === this) {
              return $window.history.go(-1);
            } else if($rootScope.$viewHistory.forwardView === this) {
              return $window.history.go(1);
            }
      
            $location.url(this.url);
            return;
          }
      
          return null;
        };
        View.prototype.destroy = function() {
          if(this.scope) {
            this.scope.$destroy && this.scope.$destroy();
            this.scope = null;
          }
        };
      
        function createViewId(stateId) {
          return ionic.Utils.nextUid();
        }
      
        return {
      
          register: function(containerScope, element) {
      
            var viewHistory = $rootScope.$viewHistory,
                currentStateId = this.getCurrentStateId(),
                hist = this._getHistory(containerScope),
                currentView = viewHistory.currentView,
                backView = viewHistory.backView,
                forwardView = viewHistory.forwardView,
                nextViewOptions = this.nextViewOptions(),
                rsp = {
                  viewId: null,
                  navAction: null,
                  navDirection: null,
                  historyId: hist.historyId
                };
      
            if(element && !this.isTagNameRegistrable(element)) {
              // first check to see if this element can even be registered as a view.
              // Certain tags are only containers for views, but are not views themselves.
              // For example, the <ion-tabs> directive contains a <ion-tab> and the <ion-tab> is the
              // view, but the <ion-tabs> directive itself should not be registered as a view.
              rsp.navAction = 'disabledByTagName';
              return rsp;
            }
      
            if(currentView &&
               currentView.stateId === currentStateId &&
               currentView.historyId === hist.historyId) {
              // do nothing if its the same stateId in the same history
              rsp.navAction = 'noChange';
              return rsp;
            }
      
            if(viewHistory.forcedNav) {
              // we've previously set exactly what to do
              ionic.Utils.extend(rsp, viewHistory.forcedNav);
              $rootScope.$viewHistory.forcedNav = null;
      
            } else if(backView && backView.stateId === currentStateId) {
              // they went back one, set the old current view as a forward view
              rsp.viewId = backView.viewId;
              rsp.navAction = 'moveBack';
              rsp.viewId = backView.viewId;
              if(backView.historyId === currentView.historyId) {
                // went back in the same history
                rsp.navDirection = 'back';
              }
      
            } else if(forwardView && forwardView.stateId === currentStateId) {
              // they went to the forward one, set the forward view to no longer a forward view
              rsp.viewId = forwardView.viewId;
              rsp.navAction = 'moveForward';
              if(forwardView.historyId === currentView.historyId) {
                rsp.navDirection = 'forward';
              }
      
              var parentHistory = this._getParentHistoryObj(containerScope);
              if(forwardView.historyId && parentHistory.scope) {
                // if a history has already been created by the forward view then make sure it stays the same
                parentHistory.scope.$historyId = forwardView.historyId;
                rsp.historyId = forwardView.historyId;
              }
      
            } else if(currentView && currentView.historyId !== hist.historyId &&
                      hist.cursor > -1 && hist.stack.length > 0 && hist.cursor < hist.stack.length &&
                      hist.stack[hist.cursor].stateId === currentStateId) {
              // they just changed to a different history and the history already has views in it
              var switchToView = hist.stack[hist.cursor];
              rsp.viewId = switchToView.viewId;
              rsp.navAction = 'moveBack';
      
              // if switching to a different history, and the history of the view we're switching
              // to has an existing back view from a different history than itself, then
              // it's back view would be better represented using the current view as its back view
              var switchToViewBackView = this._getViewById(switchToView.backViewId);
              if(switchToViewBackView && switchToView.historyId !== switchToViewBackView.historyId) {
                hist.stack[hist.cursor].backViewId = currentView.viewId;
              }
      
            } else {
      
              // set a new unique viewId
              rsp.viewId = createViewId(currentStateId);
      
              if(currentView) {
                // set the forward view if there is a current view (ie: if its not the first view)
                currentView.forwardViewId = rsp.viewId;
      
                // its only moving forward if its in the same history
                if(hist.historyId === currentView.historyId) {
                  rsp.navDirection = 'forward';
                }
                rsp.navAction = 'newView';
      
                // check if there is a new forward view within the same history
                if(forwardView && currentView.stateId !== forwardView.stateId &&
                   currentView.historyId === forwardView.historyId) {
                  // they navigated to a new view but the stack already has a forward view
                  // since its a new view remove any forwards that existed
                  var forwardsHistory = this._getHistoryById(forwardView.historyId);
                  if(forwardsHistory) {
                    // the forward has a history
                    for(var x=forwardsHistory.stack.length - 1; x >= forwardView.index; x--) {
                      // starting from the end destroy all forwards in this history from this point
                      forwardsHistory.stack[x].destroy();
                      forwardsHistory.stack.splice(x);
                    }
                  }
                }
      
              } else {
                // there's no current view, so this must be the initial view
                rsp.navAction = 'initialView';
              }
      
              // add the new view
              viewHistory.views[rsp.viewId] = this.createView({
                viewId: rsp.viewId,
                index: hist.stack.length,
                historyId: hist.historyId,
                backViewId: (currentView && currentView.viewId ? currentView.viewId : null),
                forwardViewId: null,
                stateId: currentStateId,
                stateName: this.getCurrentStateName(),
                stateParams: this.getCurrentStateParams(),
                url: $location.url(),
              });
      
              if (rsp.navAction == 'moveBack') {
                //moveBack(from, to);
                $rootScope.$emit('$viewHistory.viewBack', currentView.viewId, rsp.viewId);
              }
      
              // add the new view to this history's stack
              hist.stack.push(viewHistory.views[rsp.viewId]);
            }
      
            if(nextViewOptions) {
              if(nextViewOptions.disableAnimate) rsp.navDirection = null;
              if(nextViewOptions.disableBack) viewHistory.views[rsp.viewId].backViewId = null;
              this.nextViewOptions(null);
            }
      
            this.setNavViews(rsp.viewId);
      
            hist.cursor = viewHistory.currentView.index;
      
            return rsp;
          },
      
          setNavViews: function(viewId) {
            var viewHistory = $rootScope.$viewHistory;
      
            viewHistory.currentView = this._getViewById(viewId);
            viewHistory.backView = this._getBackView(viewHistory.currentView);
            viewHistory.forwardView = this._getForwardView(viewHistory.currentView);
      
            $rootScope.$broadcast('$viewHistory.historyChange', {
              showBack: (viewHistory.backView && viewHistory.backView.historyId === viewHistory.currentView.historyId)
            });
          },
      
          registerHistory: function(scope) {
            scope.$historyId = ionic.Utils.nextUid();
          },
      
          createView: function(data) {
            var newView = new View();
            return newView.initialize(data);
          },
      
          getCurrentView: function() {
            return $rootScope.$viewHistory.currentView;
          },
      
          getBackView: function() {
            return $rootScope.$viewHistory.backView;
          },
      
          getForwardView: function() {
            return $rootScope.$viewHistory.forwardView;
          },
      
          getNavDirection: function() {
            return $rootScope.$viewHistory.navDirection;
          },
      
          getCurrentStateName: function() {
            return ($state && $state.current ? $state.current.name : null);
          },
      
          isCurrentStateNavView: function(navView) {
            return ($state &&
                    $state.current &&
                    $state.current.views &&
                    $state.current.views[navView] ? true : false);
          },
      
          getCurrentStateParams: function() {
            var rtn;
            if ($state && $state.params) {
              for(var key in $state.params) {
                if($state.params.hasOwnProperty(key)) {
                  rtn = rtn || {};
                  rtn[key] = $state.params[key];
                }
              }
            }
            return rtn;
          },
      
          getCurrentStateId: function() {
            var id;
            if($state && $state.current && $state.current.name) {
              id = $state.current.name;
              if($state.params) {
                for(var key in $state.params) {
                  if($state.params.hasOwnProperty(key) && $state.params[key]) {
                    id += "_" + key + "=" + $state.params[key];
                  }
                }
              }
              return id;
            }
            // if something goes wrong make sure its got a unique stateId
            return ionic.Utils.nextUid();
          },
      
          goToHistoryRoot: function(historyId) {
            if(historyId) {
              var hist = $rootScope.$viewHistory.histories[ historyId ];
              if(hist && hist.stack.length) {
                if($rootScope.$viewHistory.currentView && $rootScope.$viewHistory.currentView.viewId === hist.stack[0].viewId) {
                  return;
                }
                $rootScope.$viewHistory.forcedNav = {
                  viewId: hist.stack[0].viewId,
                  navAction: 'moveBack',
                  navDirection: 'back'
                };
                hist.stack[0].go();
              }
            }
          },
      
          _getViewById: function(viewId) {
            return (viewId ? $rootScope.$viewHistory.views[ viewId ] : null );
          },
      
          _getBackView: function(view) {
            return (view ? this._getViewById(view.backViewId) : null );
          },
      
          _getForwardView: function(view) {
            return (view ? this._getViewById(view.forwardViewId) : null );
          },
      
          _getHistoryById: function(historyId) {
            return (historyId ? $rootScope.$viewHistory.histories[ historyId ] : null );
          },
      
          _getHistory: function(scope) {
            var histObj = this._getParentHistoryObj(scope);
      
            if( !$rootScope.$viewHistory.histories[ histObj.historyId ] ) {
              // this history object exists in parent scope, but doesn't
              // exist in the history data yet
              $rootScope.$viewHistory.histories[ histObj.historyId ] = {
                historyId: histObj.historyId,
                parentHistoryId: this._getParentHistoryObj(histObj.scope.$parent).historyId,
                stack: [],
                cursor: -1
              };
            }
      
            return $rootScope.$viewHistory.histories[ histObj.historyId ];
          },
      
          _getParentHistoryObj: function(scope) {
            var parentScope = scope;
            while(parentScope) {
              if(parentScope.hasOwnProperty('$historyId')) {
                // this parent scope has a historyId
                return { historyId: parentScope.$historyId, scope: parentScope };
              }
              // nothing found keep climbing up
              parentScope = parentScope.$parent;
            }
            // no history for for the parent, use the root
            return { historyId: 'root', scope: $rootScope };
          },
      
          nextViewOptions: function(opts) {
            if(arguments.length) {
              this._nextOpts = opts;
            } else {
              return this._nextOpts;
            }
          },
      
          getRenderer: function(navViewElement, navViewAttrs, navViewScope) {
            var service = this;
            var registerData;
            var doAnimation;
      
            // climb up the DOM and see which animation classname to use, if any
            var animationClass = getParentAnimationClass(navViewElement[0]);
      
            function getParentAnimationClass(el) {
              var className = '';
              while(!className && el) {
                className = el.getAttribute('animation');
                el = el.parentElement;
              }
      
              // If they don't have an animation set explicitly, use the value in the config
              if(!className) {
                return $ionicNavViewConfig.transition;
              }
      
              return className;
            }
      
            function setAnimationClass() {
              // add the animation CSS class we're gonna use to transition between views
              if (animationClass) {
                navViewElement[0].classList.add(animationClass);
              }
      
              if(registerData.navDirection === 'back') {
                // animate like we're moving backward
                navViewElement[0].classList.add('reverse');
              } else {
                // defaults to animate forward
                // make sure the reverse class isn't already added
                navViewElement[0].classList.remove('reverse');
              }
            }
      
            return function(shouldAnimate) {
      
              return {
      
                enter: function(element) {
      
                  if(doAnimation && shouldAnimate) {
                    // enter with an animation
                    setAnimationClass();
      
                    element.addClass('ng-enter');
                    $ionicClickBlock.show();
      
                    $animate.enter(element, navViewElement, null, function() {
                      $ionicClickBlock.hide();
                      if (animationClass) {
                        navViewElement[0].classList.remove(animationClass);
                      }
                    });
                    return;
                  } else if(!doAnimation) {
                    $ionicClickBlock.hide();
                  }
      
                  // no animation
                  navViewElement.append(element);
                },
      
                leave: function() {
                  var element = navViewElement.contents();
      
                  if(doAnimation && shouldAnimate) {
                    // leave with an animation
                    setAnimationClass();
      
                    $animate.leave(element, function() {
                      element.remove();
                    });
                    return;
                  }
      
                  // no animation
                  element.remove();
                },
      
                register: function(element) {
                  // register a new view
                  registerData = service.register(navViewScope, element);
                  doAnimation = (animationClass !== null && registerData.navDirection !== null);
                  return registerData;
                }
      
              };
            };
          },
      
          disableRegisterByTagName: function(tagName) {
            // not every element should animate betwee transitions
            // For example, the <ion-tabs> directive should not animate when it enters,
            // but instead the <ion-tabs> directve would just show, and its children
            // <ion-tab> directives would do the animating, but <ion-tabs> itself is not a view
            $rootScope.$viewHistory.disabledRegistrableTagNames.push(tagName.toUpperCase());
          },
      
          isTagNameRegistrable: function(element) {
            // check if this element has a tagName (at its root, not recursively)
            // that shouldn't be animated, like <ion-tabs> or <ion-side-menu>
            var x, y, disabledTags = $rootScope.$viewHistory.disabledRegistrableTagNames;
            for(x=0; x<element.length; x++) {
              if(element[x].nodeType !== 1) continue;
              for(y=0; y<disabledTags.length; y++) {
                if(element[x].tagName === disabledTags[y]) {
                  return false;
                }
              }
            }
            return true;
          },
      
          clearHistory: function() {
            var
            histories = $rootScope.$viewHistory.histories,
            currentView = $rootScope.$viewHistory.currentView;
      
            if(histories) {
              for(var historyId in histories) {
      
                if(histories[historyId].stack) {
                  histories[historyId].stack = [];
                  histories[historyId].cursor = -1;
                }
      
                if(currentView && currentView.historyId === historyId) {
                  currentView.backViewId = null;
                  currentView.forwardViewId = null;
                  histories[historyId].stack.push(currentView);
                } else if(histories[historyId].destroy) {
                  histories[historyId].destroy();
                }
      
              }
            }
      
            for(var viewId in $rootScope.$viewHistory.views) {
              if(viewId !== currentView.viewId) {
                delete $rootScope.$viewHistory.views[viewId];
              }
            }
      
            if(currentView) {
              this.setNavViews(currentView.viewId);
            }
          }
      
        };
      
      }]);
      
      /**
       * @private
       */
      IonicModule.config([
        '$provide',
      function($provide) {
        function $LocationDecorator($location, $timeout) {
      
          $location.__hash = $location.hash;
          //Fix: when window.location.hash is set, the scrollable area
          //found nearest to body's scrollTop is set to scroll to an element
          //with that ID.
          $location.hash = function(value) {
            if (angular.isDefined(value)) {
              $timeout(function() {
                var scroll = document.querySelector('.scroll-content');
                if (scroll)
                  scroll.scrollTop = 0;
              }, 0, false);
            }
            return $location.__hash(value);
          };
      
          return $location;
        }
      
        $provide.decorator('$location', ['$delegate', '$timeout', $LocationDecorator]);
      }]);
      
      
      /**
       * @ngdoc service
       * @name $ionicListDelegate
       * @module ionic
       *
       * @description
       * Delegate for controlling the {@link ionic.directive:ionList} directive.
       *
       * Methods called directly on the $ionicListDelegate service will control all lists.
       * Use the {@link ionic.service:$ionicListDelegate#$getByHandle $getByHandle}
       * method to control specific ionList instances.
       *
       * @usage
       *
       * ````html
       * <ion-content ng-controller="MyCtrl">
       *   <button class="button" ng-click="showDeleteButtons()"></button>
       *   <ion-list>
       *     <ion-item ng-repeat="i in items">
       *       {% raw %}Hello, {{i}}!{% endraw %}
       *       <ion-delete-button class="ion-minus-circled"></ion-delete-button>
       *     </ion-item>
       *   </ion-list>
       * </ion-content>
       * ```
       * ```js
       * function MyCtrl($scope, $ionicListDelegate) {
       *   $scope.showDeleteButtons = function() {
       *     $ionicListDelegate.showDelete(true);
       *   };
       * }
       * ```
       */
      IonicModule
      .service('$ionicListDelegate', delegateService([
        /**
         * @ngdoc method
         * @name $ionicListDelegate#showReorder
         * @param {boolean=} showReorder Set whether or not this list is showing its reorder buttons.
         * @returns {boolean} Whether the reorder buttons are shown.
         */
        'showReorder',
        /**
         * @ngdoc method
         * @name $ionicListDelegate#showDelete
         * @param {boolean=} showDelete Set whether or not this list is showing its delete buttons.
         * @returns {boolean} Whether the delete buttons are shown.
         */
        'showDelete',
        /**
         * @ngdoc method
         * @name $ionicListDelegate#canSwipeItems
         * @param {boolean=} canSwipeItems Set whether or not this list is able to swipe to show
         * option buttons.
         * @returns {boolean} Whether the list is able to swipe to show option buttons.
         */
        'canSwipeItems',
        /**
         * @ngdoc method
         * @name $ionicListDelegate#closeOptionButtons
         * @description Closes any option buttons on the list that are swiped open.
         */
        'closeOptionButtons',
        /**
         * @ngdoc method
         * @name $ionicListDelegate#$getByHandle
         * @param {string} handle
         * @returns `delegateInstance` A delegate instance that controls only the
         * {@link ionic.directive:ionList} directives with `delegate-handle` matching
         * the given handle.
         *
         * Example: `$ionicListDelegate.$getByHandle('my-handle').showReorder(true);`
         */
      ]))
      
      .controller('$ionicList', [
        '$scope',
        '$attrs',
        '$parse',
        '$ionicListDelegate',
      function($scope, $attrs, $parse, $ionicListDelegate) {
      
        var isSwipeable = true;
        var isReorderShown = false;
        var isDeleteShown = false;
      
        var deregisterInstance = $ionicListDelegate._registerInstance(this, $attrs.delegateHandle);
        $scope.$on('$destroy', deregisterInstance);
      
        this.showReorder = function(show) {
          if (arguments.length) {
            isReorderShown = !!show;
          }
          return isReorderShown;
        };
      
        this.showDelete = function(show) {
          if (arguments.length) {
            isDeleteShown = !!show;
          }
          return isDeleteShown;
        };
      
        this.canSwipeItems = function(can) {
          if (arguments.length) {
            isSwipeable = !!can;
          }
          return isSwipeable;
        };
      
        this.closeOptionButtons = function() {
          this.listView && this.listView.clearDragEffects();
        };
      }]);
      
      IonicModule
      .controller('$ionicNavBar', [
        '$scope',
        '$element',
        '$attrs',
        '$ionicViewService',
        '$animate',
        '$compile',
        '$ionicNavBarDelegate',
      function($scope, $element, $attrs, $ionicViewService, $animate, $compile, $ionicNavBarDelegate) {
        //Let the parent know about our controller too so that children of
        //sibling content elements can know about us
        $element.parent().data('$ionNavBarController', this);
      
        var deregisterInstance = $ionicNavBarDelegate._registerInstance(this, $attrs.delegateHandle);
      
        $scope.$on('$destroy', deregisterInstance);
      
        $scope.$on('$viewHistory.historyChange', function(e, data) {
          backIsShown = !!data.showBack;
        });
      
        var self = this;
      
        this.leftButtonsElement = jqLite(
          $element[0].querySelector('.buttons.left-buttons')
        );
        this.rightButtonsElement = jqLite(
          $element[0].querySelector('.buttons.right-buttons')
        );
      
        this.back = function() {
          var backView = $ionicViewService.getBackView();
          backView && backView.go();
          return false;
        };
      
        this.align = function(direction) {
          this._headerBarView.align(direction);
        };
      
        this.showBackButton = function(show) {
          if (arguments.length) {
            $scope.backButtonShown = !!show;
          }
          return !!($scope.hasBackButton && $scope.backButtonShown);
        };
      
        this.showBar = function(show) {
          if (arguments.length) {
            $scope.isInvisible = !show;
            $scope.$parent.$hasHeader = !!show;
          }
          return !$scope.isInvisible;
        };
      
        this.setTitle = function(title) {
          if ($scope.title === title) {
            return;
          }
          $scope.oldTitle = $scope.title;
          $scope.title = title || '';
        };
      
        this.changeTitle = function(title, direction) {
          if ($scope.title === title) {
            // if we're not animating the title, but the back button becomes invisible
            if(typeof backIsShown != 'undefined' && !backIsShown && $scope.backButtonShown){
              jqLite($element[0].querySelector('.back-button')).addClass('ng-hide');
            }
            return false;
          }
          this.setTitle(title);
          $scope.isReverse = direction == 'back';
          $scope.shouldAnimate = !!direction;
      
          if (!$scope.shouldAnimate) {
            //We're done!
            this._headerBarView.align();
          } else {
            this._animateTitles();
          }
          return true;
        };
      
        this.getTitle = function() {
          return $scope.title || '';
        };
      
        this.getPreviousTitle = function() {
          return $scope.oldTitle || '';
        };
      
        /**
         * Exposed for testing
         */
        this._animateTitles = function() {
          var oldTitleEl, newTitleEl, currentTitles;
      
          //If we have any title right now
          //(or more than one, they could be transitioning on switch),
          //replace the first one with an oldTitle element
          currentTitles = $element[0].querySelectorAll('.title');
          if (currentTitles.length) {
            oldTitleEl = $compile('<h1 class="title" ng-bind-html="oldTitle"></h1>')($scope);
            jqLite(currentTitles[currentTitles.length-1]).replaceWith(oldTitleEl);
          }
          //Compile new title
          newTitleEl = $compile('<h1 class="title invisible" ng-bind-html="title"></h1>')($scope);
      
          //Animate in on next frame
          ionic.requestAnimationFrame(function() {
      
            oldTitleEl && $animate.leave(jqLite(oldTitleEl));
      
            var insert = oldTitleEl && jqLite(oldTitleEl) || null;
            $animate.enter(newTitleEl, $element, insert, function() {
              self._headerBarView.align();
            });
      
            //Cleanup any old titles leftover (besides the one we already did replaceWith on)
            forEach(currentTitles, function(el) {
              if (el && el.parentNode) {
                //Use .remove() to cleanup things like .data()
                jqLite(el).remove();
              }
            });
      
            //$apply so bindings fire
            $scope.$digest();
      
            //Stop flicker of new title on ios7
            ionic.requestAnimationFrame(function() {
              newTitleEl[0].classList.remove('invisible');
            });
          });
        };
      }]);
      
      
      /**
       * @private
       */
      IonicModule
      
      .factory('$$scrollValueCache', function() {
        return {};
      })
      
      .controller('$ionicScroll', [
        '$scope',
        'scrollViewOptions',
        '$timeout',
        '$window',
        '$$scrollValueCache',
        '$location',
        '$rootScope',
        '$document',
        '$ionicScrollDelegate',
      function($scope, scrollViewOptions, $timeout, $window, $$scrollValueCache, $location, $rootScope, $document, $ionicScrollDelegate) {
      
        var self = this;
        // for testing
        this.__timeout = $timeout;
      
        this._scrollViewOptions = scrollViewOptions; //for testing
      
        var element = this.element = scrollViewOptions.el;
        var $element = this.$element = jqLite(element);
        var scrollView = this.scrollView = new ionic.views.Scroll(scrollViewOptions);
      
        //Attach self to element as a controller so other directives can require this controller
        //through `require: '$ionicScroll'
        //Also attach to parent so that sibling elements can require this
        ($element.parent().length ? $element.parent() : $element)
          .data('$$ionicScrollController', this);
      
        var deregisterInstance = $ionicScrollDelegate._registerInstance(
          this, scrollViewOptions.delegateHandle
        );
      
        if (!angular.isDefined(scrollViewOptions.bouncing)) {
          ionic.Platform.ready(function() {
            scrollView.options.bouncing = true;
      
            if(ionic.Platform.isAndroid()) {
              // No bouncing by default on Android
              scrollView.options.bouncing = false;
              // Faster scroll decel
              scrollView.options.deceleration = 0.95;
            } else {
            }
          });
        }
      
        var resize = angular.bind(scrollView, scrollView.resize);
        ionic.on('resize', resize, $window);
      
        // set by rootScope listener if needed
        var backListenDone = angular.noop;
        var viewContentLoaded = angular.noop;
      
        var scrollFunc = function(e) {
          var detail = (e.originalEvent || e).detail || {};
          $scope.$onScroll && $scope.$onScroll({
            event: e,
            scrollTop: detail.scrollTop || 0,
            scrollLeft: detail.scrollLeft || 0
          });
        };
      
        $element.on('scroll', scrollFunc );
      
        $scope.$on('$destroy', function() {
          deregisterInstance();
          scrollView.__cleanup();
          ionic.off('resize', resize, $window);
          $window.removeEventListener('resize', resize);
          viewContentLoaded();
          backListenDone();
          if (self._rememberScrollId) {
            $$scrollValueCache[self._rememberScrollId] = scrollView.getValues();
          }
          scrollViewOptions = null;
          self._scrollViewOptions = null;
          self.element = null;
          $element.off('scroll', scrollFunc);
          $element = null;
          self.$element = null;
          self.scrollView = null;
          scrollView = null;
        });
      
        viewContentLoaded = $scope.$on('$viewContentLoaded', function(e, historyData) {
          //only the top-most scroll area under a view should remember that view's
          //scroll position
          if (e.defaultPrevented) { return; }
          e.preventDefault();
      
          var viewId = historyData && historyData.viewId || $scope.$historyId;
          if (viewId) {
            $timeout(function() {
              self.rememberScrollPosition(viewId);
              self.scrollToRememberedPosition();
      
              backListenDone = $rootScope.$on('$viewHistory.viewBack', function(e, fromViewId, toViewId) {
                //When going back from this view, forget its saved scroll position
                if (viewId === fromViewId) {
                  self.forgetScrollPosition();
                }
              });
            }, 0, false);
          }
        });
      
        $timeout(function() {
          scrollView && scrollView.run && scrollView.run();
        });
      
        this._rememberScrollId = null;
      
        this.getScrollView = function() {
          return this.scrollView;
        };
      
        this.getScrollPosition = function() {
          return this.scrollView.getValues();
        };
      
        this.resize = function() {
          return $timeout(resize).then(function() {
            $element && $element.triggerHandler('scroll.resize');
          });
        };
      
        this.scrollTop = function(shouldAnimate) {
          this.resize().then(function() {
            scrollView.scrollTo(0, 0, !!shouldAnimate);
          });
        };
      
        this.scrollBottom = function(shouldAnimate) {
          this.resize().then(function() {
            var max = scrollView.getScrollMax();
            scrollView.scrollTo(max.left, max.top, !!shouldAnimate);
          });
        };
      
        this.scrollTo = function(left, top, shouldAnimate) {
          this.resize().then(function() {
            scrollView.scrollTo(left, top, !!shouldAnimate);
          });
        };
      
        this.zoomTo = function(zoom, shouldAnimate, originLeft, originTop) {
          this.resize().then(function() {
            scrollView.zoomTo(zoom, !!shouldAnimate, originLeft, originTop);
          });
        };
      
        this.zoomBy = function(zoom, shouldAnimate, originLeft, originTop) {
          this.resize().then(function() {
            scrollView.zoomBy(zoom, !!shouldAnimate, originLeft, originTop);
          });
        };
      
        this.scrollBy = function(left, top, shouldAnimate) {
          this.resize().then(function() {
            scrollView.scrollBy(left, top, !!shouldAnimate);
          });
        };
      
        this.anchorScroll = function(shouldAnimate) {
          this.resize().then(function() {
            var hash = $location.hash();
            var elm = hash && $document[0].getElementById(hash);
            if (!(hash && elm)) {
              scrollView.scrollTo(0,0, !!shouldAnimate);
              return;
            }
            var curElm = elm;
            var scrollLeft = 0, scrollTop = 0, levelsClimbed = 0;
            do {
              if(curElm !== null)scrollLeft += curElm.offsetLeft;
              if(curElm !== null)scrollTop += curElm.offsetTop;
              curElm = curElm.offsetParent;
              levelsClimbed++;
            } while (curElm.attributes != self.element.attributes && curElm.offsetParent);
            scrollView.scrollTo(scrollLeft, scrollTop, !!shouldAnimate);
          });
        };
      
        this.rememberScrollPosition = function(id) {
          if (!id) {
            throw new Error("Must supply an id to remember the scroll by!");
          }
          this._rememberScrollId = id;
        };
        this.forgetScrollPosition = function() {
          delete $$scrollValueCache[this._rememberScrollId];
          this._rememberScrollId = null;
        };
        this.scrollToRememberedPosition = function(shouldAnimate) {
          var values = $$scrollValueCache[this._rememberScrollId];
          if (values) {
            this.resize().then(function() {
              scrollView && scrollView.scrollTo && scrollView.scrollTo(+values.left, +values.top, shouldAnimate);
            });
          }
        };
      
        /**
         * @private
         */
        this._setRefresher = function(refresherScope, refresherElement) {
          var refresher = this.refresher = refresherElement;
          var refresherHeight = self.refresher.clientHeight || 60;
          scrollView.activatePullToRefresh(refresherHeight, function() {
            // activateCallback
            refresher.classList.add('active');
            refresherScope.$onPulling();
          }, function() {
            // deactivateCallback
            $timeout(function(){
              refresher.classList.remove('active');
              refresher.classList.remove('refreshing');
              refresher.classList.remove('refreshing-tail');
              refresher.classList.add('invisible');
            },300);
          }, function() {
            // startCallback
            refresher.classList.add('refreshing');
            refresherScope.$onRefresh();
          },function(){
            // showCallback
            refresher.classList.remove('invisible');
          },function(){
            // hideCallback
            refresher.classList.add('invisible');
          },function(){
            // tailCallback
            refresher.classList.add('refreshing-tail');
          });
        };
      }]);
      
      
      IonicModule
      .controller('$ionicSideMenus', [
        '$scope',
        '$attrs',
        '$ionicSideMenuDelegate',
        '$ionicPlatform',
        '$ionicBody',
      function($scope, $attrs, $ionicSideMenuDelegate, $ionicPlatform, $ionicBody) {
        var self = this;
        var rightShowing, leftShowing, isDragging;
        var startX, lastX, offsetX, isAsideExposed;
      
        self.$scope = $scope;
      
        self.initialize = function(options) {
          self.left = options.left;
          self.right = options.right;
          self.setContent(options.content);
          self.dragThresholdX = options.dragThresholdX || 10;
        };
      
        /**
         * Set the content view controller if not passed in the constructor options.
         *
         * @param {object} content
         */
        self.setContent = function(content) {
          if(content) {
            self.content = content;
      
            self.content.onDrag = function(e) {
              self._handleDrag(e);
            };
      
            self.content.endDrag = function(e) {
              self._endDrag(e);
            };
          }
        };
      
        self.isOpenLeft = function() {
          return self.getOpenAmount() > 0;
        };
      
        self.isOpenRight = function() {
          return self.getOpenAmount() < 0;
        };
      
        /**
         * Toggle the left menu to open 100%
         */
        self.toggleLeft = function(shouldOpen) {
          if(isAsideExposed || !self.left.isEnabled) return;
          var openAmount = self.getOpenAmount();
          if (arguments.length === 0) {
            shouldOpen = openAmount <= 0;
          }
          self.content.enableAnimation();
          if(!shouldOpen) {
            self.openPercentage(0);
          } else {
            self.openPercentage(100);
          }
        };
      
        /**
         * Toggle the right menu to open 100%
         */
        self.toggleRight = function(shouldOpen) {
          if(isAsideExposed || !self.right.isEnabled) return;
          var openAmount = self.getOpenAmount();
          if (arguments.length === 0) {
            shouldOpen = openAmount >= 0;
          }
          self.content.enableAnimation();
          if(!shouldOpen) {
            self.openPercentage(0);
          } else {
            self.openPercentage(-100);
          }
        };
      
        /**
         * Close all menus.
         */
        self.close = function() {
          self.openPercentage(0);
        };
      
        /**
         * @return {float} The amount the side menu is open, either positive or negative for left (positive), or right (negative)
         */
        self.getOpenAmount = function() {
          return self.content && self.content.getTranslateX() || 0;
        };
      
        /**
         * @return {float} The ratio of open amount over menu width. For example, a
         * menu of width 100 open 50 pixels would be open 50% or a ratio of 0.5. Value is negative
         * for right menu.
         */
        self.getOpenRatio = function() {
          var amount = self.getOpenAmount();
          if(amount >= 0) {
            return amount / self.left.width;
          }
          return amount / self.right.width;
        };
      
        self.isOpen = function() {
          return self.getOpenAmount() !== 0;
        };
      
        /**
         * @return {float} The percentage of open amount over menu width. For example, a
         * menu of width 100 open 50 pixels would be open 50%. Value is negative
         * for right menu.
         */
        self.getOpenPercentage = function() {
          return self.getOpenRatio() * 100;
        };
      
        /**
         * Open the menu with a given percentage amount.
         * @param {float} percentage The percentage (positive or negative for left/right) to open the menu.
         */
        self.openPercentage = function(percentage) {
          var p = percentage / 100;
      
          if(self.left && percentage >= 0) {
            self.openAmount(self.left.width * p);
          } else if(self.right && percentage < 0) {
            var maxRight = self.right.width;
            self.openAmount(self.right.width * p);
          }
      
          // add the CSS class "menu-open" if the percentage does not
          // equal 0, otherwise remove the class from the body element
          $ionicBody.enableClass( (percentage !== 0), 'menu-open');
        };
      
        /**
         * Open the menu the given pixel amount.
         * @param {float} amount the pixel amount to open the menu. Positive value for left menu,
         * negative value for right menu (only one menu will be visible at a time).
         */
        self.openAmount = function(amount) {
          var maxLeft = self.left && self.left.width || 0;
          var maxRight = self.right && self.right.width || 0;
      
          // Check if we can move to that side, depending if the left/right panel is enabled
          if(!(self.left && self.left.isEnabled) && amount > 0) {
            self.content.setTranslateX(0);
            return;
          }
      
          if(!(self.right && self.right.isEnabled) && amount < 0) {
            self.content.setTranslateX(0);
            return;
          }
      
          if(leftShowing && amount > maxLeft) {
            self.content.setTranslateX(maxLeft);
            return;
          }
      
          if(rightShowing && amount < -maxRight) {
            self.content.setTranslateX(-maxRight);
            return;
          }
      
          self.content.setTranslateX(amount);
      
          if(amount >= 0) {
            leftShowing = true;
            rightShowing = false;
      
            if(amount > 0) {
              // Push the z-index of the right menu down
              self.right && self.right.pushDown && self.right.pushDown();
              // Bring the z-index of the left menu up
              self.left && self.left.bringUp && self.left.bringUp();
            }
          } else {
            rightShowing = true;
            leftShowing = false;
      
            // Bring the z-index of the right menu up
            self.right && self.right.bringUp && self.right.bringUp();
            // Push the z-index of the left menu down
            self.left && self.left.pushDown && self.left.pushDown();
          }
        };
      
        /**
         * Given an event object, find the final resting position of this side
         * menu. For example, if the user "throws" the content to the right and
         * releases the touch, the left menu should snap open (animated, of course).
         *
         * @param {Event} e the gesture event to use for snapping
         */
        self.snapToRest = function(e) {
          // We want to animate at the end of this
          self.content.enableAnimation();
          isDragging = false;
      
          // Check how much the panel is open after the drag, and
          // what the drag velocity is
          var ratio = self.getOpenRatio();
      
          if(ratio === 0) {
            // Just to be safe
            self.openPercentage(0);
            return;
          }
      
          var velocityThreshold = 0.3;
          var velocityX = e.gesture.velocityX;
          var direction = e.gesture.direction;
      
          // Going right, less than half, too slow (snap back)
          if(ratio > 0 && ratio < 0.5 && direction == 'right' && velocityX < velocityThreshold) {
            self.openPercentage(0);
          }
      
          // Going left, more than half, too slow (snap back)
          else if(ratio > 0.5 && direction == 'left' && velocityX < velocityThreshold) {
            self.openPercentage(100);
          }
      
          // Going left, less than half, too slow (snap back)
          else if(ratio < 0 && ratio > -0.5 && direction == 'left' && velocityX < velocityThreshold) {
            self.openPercentage(0);
          }
      
          // Going right, more than half, too slow (snap back)
          else if(ratio < 0.5 && direction == 'right' && velocityX < velocityThreshold) {
            self.openPercentage(-100);
          }
      
          // Going right, more than half, or quickly (snap open)
          else if(direction == 'right' && ratio >= 0 && (ratio >= 0.5 || velocityX > velocityThreshold)) {
            self.openPercentage(100);
          }
      
          // Going left, more than half, or quickly (span open)
          else if(direction == 'left' && ratio <= 0 && (ratio <= -0.5 || velocityX > velocityThreshold)) {
            self.openPercentage(-100);
          }
      
          // Snap back for safety
          else {
            self.openPercentage(0);
          }
        };
      
        self.isAsideExposed = function() {
          return !!isAsideExposed;
        };
      
        self.exposeAside = function(shouldExposeAside) {
          if(!self.left || !self.left.isEnabled) return;
      
          self.close();
          isAsideExposed = shouldExposeAside;
      
          // set the left marget width if it should be exposed
          // otherwise set false so there's no left margin
          self.content.setMarginLeft( isAsideExposed ? self.left.width : 0 );
      
          self.$scope.$emit('$ionicExposeAside', isAsideExposed);
        };
      
        self.activeAsideResizing = function(isResizing) {
          $ionicBody.enableClass(isResizing, 'aside-resizing');
        };
      
        // End a drag with the given event
        self._endDrag = function(e) {
          if(isAsideExposed) return;
      
          if(isDragging) {
            self.snapToRest(e);
          }
          startX = null;
          lastX = null;
          offsetX = null;
        };
      
        // Handle a drag event
        self._handleDrag = function(e) {
          if(isAsideExposed) return;
      
          // If we don't have start coords, grab and store them
          if(!startX) {
            startX = e.gesture.touches[0].pageX;
            lastX = startX;
          } else {
            // Grab the current tap coords
            lastX = e.gesture.touches[0].pageX;
          }
      
          // Calculate difference from the tap points
          if(!isDragging && Math.abs(lastX - startX) > self.dragThresholdX) {
            // if the difference is greater than threshold, start dragging using the current
            // point as the starting point
            startX = lastX;
      
            isDragging = true;
            // Initialize dragging
            self.content.disableAnimation();
            offsetX = self.getOpenAmount();
          }
      
          if(isDragging) {
            self.openAmount(offsetX + (lastX - startX));
          }
        };
      
        self.canDragContent = function(canDrag) {
          if (arguments.length) {
            $scope.dragContent = !!canDrag;
          }
          return $scope.dragContent;
        };
      
        self.edgeThreshold = 25;
        self.edgeThresholdEnabled = false;
        self.edgeDragThreshold = function(value) {
          if (arguments.length) {
            if (angular.isNumber(value) && value > 0) {
              self.edgeThreshold = value;
              self.edgeThresholdEnabled = true;
            } else {
              self.edgeThresholdEnabled = !!value;
            }
          }
          return self.edgeThresholdEnabled;
        };
      
        self.isDraggableTarget = function(e) {
          //Only restrict edge when sidemenu is closed and restriction is enabled
          var shouldOnlyAllowEdgeDrag = self.edgeThresholdEnabled && !self.isOpen();
          var startX = e.gesture.startEvent && e.gesture.startEvent.center &&
            e.gesture.startEvent.center.pageX;
      
          var dragIsWithinBounds = !shouldOnlyAllowEdgeDrag ||
            startX <= self.edgeThreshold ||
            startX >= self.content.element.offsetWidth - self.edgeThreshold;
      
          return ($scope.dragContent || self.isOpen()) &&
                 dragIsWithinBounds &&
                 !e.gesture.srcEvent.defaultPrevented &&
                 !e.target.tagName.match(/input|textarea|select|object|embed/i) &&
                 !e.target.isContentEditable &&
                 !(e.target.dataset ? e.target.dataset.preventScroll : e.target.getAttribute('data-prevent-scroll') == 'true');
        };
      
        $scope.sideMenuContentTranslateX = 0;
      
        var deregisterBackButtonAction = angular.noop;
        var closeSideMenu = angular.bind(self, self.close);
      
        $scope.$watch(function() {
          return self.getOpenAmount() !== 0;
        }, function(isOpen) {
          deregisterBackButtonAction();
          if (isOpen) {
            deregisterBackButtonAction = $ionicPlatform.registerBackButtonAction(
              closeSideMenu,
              PLATFORM_BACK_BUTTON_PRIORITY_SIDE_MENU
            );
          }
        });
      
        var deregisterInstance = $ionicSideMenuDelegate._registerInstance(
          self, $attrs.delegateHandle
        );
      
        $scope.$on('$destroy', function() {
          deregisterInstance();
          deregisterBackButtonAction();
        });
      
        self.initialize({
          left: { width: 275 },
          right: { width: 275 }
        });
      
      }]);
      
      IonicModule
      .controller('$ionicTab', [
        '$scope',
        '$ionicViewService',
        '$attrs',
        '$location',
        '$state',
      function($scope, $ionicViewService, $attrs, $location, $state) {
        this.$scope = $scope;
      
        //All of these exposed for testing
        this.hrefMatchesState = function() {
          return $attrs.href && $location.path().indexOf(
            $attrs.href.replace(/^#/, '').replace(/\/$/, '')
          ) === 0;
        };
        this.srefMatchesState = function() {
          return $attrs.uiSref && $state.includes( $attrs.uiSref.split('(')[0] );
        };
        this.navNameMatchesState = function() {
          return this.navViewName && $ionicViewService.isCurrentStateNavView(this.navViewName);
        };
      
        this.tabMatchesState = function() {
          return this.hrefMatchesState() || this.srefMatchesState() || this.navNameMatchesState();
        };
      }]);
      
      IonicModule
      .controller('$ionicTabs', [
        '$scope',
        '$ionicViewService',
        '$element',
      function($scope, $ionicViewService, $element) {
        var _selectedTab = null;
        var self = this;
        self.tabs = [];
      
        self.selectedIndex = function() {
          return self.tabs.indexOf(_selectedTab);
        };
        self.selectedTab = function() {
          return _selectedTab;
        };
      
        self.add = function(tab) {
          $ionicViewService.registerHistory(tab);
          self.tabs.push(tab);
          if(self.tabs.length === 1) {
            self.select(tab);
          }
        };
      
        self.remove = function(tab) {
          var tabIndex = self.tabs.indexOf(tab);
          if (tabIndex === -1) {
            return;
          }
          //Use a field like '$tabSelected' so developers won't accidentally set it in controllers etc
          if (tab.$tabSelected) {
            self.deselect(tab);
            //Try to select a new tab if we're removing a tab
            if (self.tabs.length === 1) {
              //do nothing if there are no other tabs to select
            } else {
              //Select previous tab if it's the last tab, else select next tab
              var newTabIndex = tabIndex === self.tabs.length - 1 ? tabIndex - 1 : tabIndex + 1;
              self.select(self.tabs[newTabIndex]);
            }
          }
          self.tabs.splice(tabIndex, 1);
        };
      
        self.deselect = function(tab) {
          if (tab.$tabSelected) {
            _selectedTab = null;
            tab.$tabSelected = false;
            (tab.onDeselect || angular.noop)();
          }
        };
      
        self.select = function(tab, shouldEmitEvent) {
          var tabIndex;
          if (angular.isNumber(tab)) {
            tabIndex = tab;
            tab = self.tabs[tabIndex];
          } else {
            tabIndex = self.tabs.indexOf(tab);
          }
      
          if (arguments.length === 1) {
            shouldEmitEvent = !!(tab.navViewName || tab.uiSref);
          }
      
          if (_selectedTab && _selectedTab.$historyId == tab.$historyId) {
            if (shouldEmitEvent) {
              $ionicViewService.goToHistoryRoot(tab.$historyId);
            }
          } else {
            forEach(self.tabs, function(tab) {
              self.deselect(tab);
            });
      
            _selectedTab = tab;
            //Use a funny name like $tabSelected so the developer doesn't overwrite the var in a child scope
            tab.$tabSelected = true;
            (tab.onSelect || angular.noop)();
      
            if (shouldEmitEvent) {
              var viewData = {
                type: 'tab',
                tabIndex: tabIndex,
                historyId: tab.$historyId,
                navViewName: tab.navViewName,
                hasNavView: !!tab.navViewName,
                title: tab.title,
                url: tab.href,
                uiSref: tab.uiSref
              };
              $scope.$emit('viewState.changeHistory', viewData);
            }
          }
        };
      }]);
      
      
      /*
       * We don't document the ionActionSheet directive, we instead document
       * the $ionicActionSheet service
       */
      IonicModule
      .directive('ionActionSheet', ['$document', function($document) {
        return {
          restrict: 'E',
          scope: true,
          replace: true,
          link: function($scope, $element){
            var keyUp = function(e) {
              if(e.which == 27) {
                $scope.cancel();
                $scope.$apply();
              }
            };
      
            var backdropClick = function(e) {
              if(e.target == $element[0]) {
                $scope.cancel();
                $scope.$apply();
              }
            };
            $scope.$on('$destroy', function() {
              $element.remove();
              $document.unbind('keyup', keyUp);
            });
      
            $document.bind('keyup', keyUp);
            $element.bind('click', backdropClick);
          },
          template: '<div class="action-sheet-backdrop">' +
                      '<div class="action-sheet-wrapper">' +
                        '<div class="action-sheet">' +
                          '<div class="action-sheet-group">' +
                            '<div class="action-sheet-title" ng-if="titleText" ng-bind-html="titleText"></div>' +
                            '<button class="button" ng-click="buttonClicked($index)" ng-repeat="button in buttons" ng-bind-html="button.text"></button>' +
                          '</div>' +
                          '<div class="action-sheet-group" ng-if="destructiveText">' +
                            '<button class="button destructive" ng-click="destructiveButtonClicked()" ng-bind-html="destructiveText"></button>' +
                          '</div>' +
                          '<div class="action-sheet-group" ng-if="cancelText">' +
                            '<button class="button" ng-click="cancel()" ng-bind-html="cancelText"></button>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>'
        };
      }]);
      
      
      /**
       * @ngdoc directive
       * @name ionCheckbox
       * @module ionic
       * @restrict E
       * @codepen hqcju
       * @description
       * The checkbox is no different than the HTML checkbox input, except it's styled differently.
       *
       * The checkbox behaves like any [AngularJS checkbox](http://docs.angularjs.org/api/ng/input/input[checkbox]).
       *
       * @usage
       * ```html
       * <ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox>
       * ```
       */
      
      IonicModule
      .directive('ionCheckbox', function() {
        return {
          restrict: 'E',
          replace: true,
          require: '?ngModel',
          transclude: true,
          template:
            '<label class="item item-checkbox">' +
              '<div class="checkbox checkbox-input-hidden disable-pointer-events">' +
                '<input type="checkbox">' +
                '<i class="checkbox-icon"></i>' +
              '</div>' +
              '<div class="item-content disable-pointer-events" ng-transclude></div>' +
            '</label>',
          compile: function(element, attr) {
            var input = element.find('input');
            forEach({
              'name': attr.name,
              'ng-value': attr.ngValue,
              'ng-model': attr.ngModel,
              'ng-checked': attr.ngChecked,
              'ng-disabled': attr.ngDisabled,
              'ng-true-value': attr.ngTrueValue,
              'ng-false-value': attr.ngFalseValue,
              'ng-change': attr.ngChange
            }, function(value, name) {
              if (isDefined(value)) {
                input.attr(name, value);
              }
            });
          }
      
        };
      });
      
      /**
       * @ngdoc directive
       * @module ionic
       * @name collectionRepeat
       * @restrict A
       * @codepen mFygh
       * @description
       * `collection-repeat` is a directive that allows you to render lists with
       * thousands of items in them, and experience little to no performance penalty.
       *
       * Demo:
       *
       * The directive renders onto the screen only the items that should be currently visible.
       * So if you have 1,000 items in your list but only ten fit on your screen,
       * collection-repeat will only render into the DOM the ten that are in the current
       * scroll position.
       *
       * Here are a few things to keep in mind while using collection-repeat:
       *
       * 1. The data supplied to collection-repeat must be an array.
       * 2. You must explicitly tell the directive what size your items will be in the DOM, using directive attributes.
       * Pixel amounts or percentages are allowed (see below).
       * 3. The elements rendered will be absolutely positioned: be sure to let your CSS work with
       * this (see below).
       * 4. Each collection-repeat list will take up all of its parent scrollView's space.
       * If you wish to have multiple lists on one page, put each list within its own
       * {@link ionic.directive:ionScroll ionScroll} container.
       * 5. You should not use the ng-show and ng-hide directives on your ion-content/ion-scroll elements that
       * have a collection-repeat inside.  ng-show and ng-hide apply the `display: none` css rule to the content's
       * style, causing the scrollView to read the width and height of the content as 0.  Resultingly,
       * collection-repeat will render elements that have just been un-hidden incorrectly.
       *
       *
       * @usage
       *
       * #### Basic Usage (single rows of items)
       *
       * Notice two things here: we use ng-style to set the height of the item to match
       * what the repeater thinks our item height is.  Additionally, we add a css rule
       * to make our item stretch to fit the full screen (since it will be absolutely
       * positioned).
       *
       * ```html
       * <ion-content ng-controller="ContentCtrl">
       *   <div class="list">
       *     <div class="item my-item"
       *       collection-repeat="item in items"
       *       collection-item-width="'100%'"
       *       collection-item-height="getItemHeight(item, $index)"
       *       ng-style="{height: getItemHeight(item, $index)}">
       *       {% raw %}{{item}}{% endraw %}
       *     </div>
       *   </div>
       * </div>
       * ```
       * ```js
       * function ContentCtrl($scope) {
       *   $scope.items = [];
       *   for (var i = 0; i < 1000; i++) {
       *     $scope.items.push('Item ' + i);
       *   }
       *
       *   $scope.getItemHeight = function(item, index) {
       *     //Make evenly indexed items be 10px taller, for the sake of example
       *     return (index % 2) === 0 ? 50 : 60;
       *   };
       * }
       * ```
       * ```css
       * .my-item {
       *   left: 0;
       *   right: 0;
       * }
       * ```
       *
       * #### Grid Usage (three items per row)
       *
       * ```html
       * <ion-content>
       *   <div class="item item-avatar my-image-item"
       *     collection-repeat="image in images"
       *     collection-item-width="'33%'"
       *     collection-item-height="'33%'">
       *     <img ng-src="{{image.src}}">
       *   </div>
       * </ion-content>
       * ```
       * Percentage of total visible list dimensions. This example shows a 3 by 3 matrix that fits on the screen (3 rows and 3 colums). Note that dimensions are used in the creation of the element and therefore a measurement of the item cannnot be used as an input dimension.
       * ```css
       * .my-image-item img {
       *   height: 33%;
       *   width: 33%;
       * }
       * ```
       *
       * @param {expression} collection-repeat The expression indicating how to enumerate a collection. These
       *   formats are currently supported:
       *
       *   * `variable in expression` – where variable is the user defined loop variable and `expression`
       *     is a scope expression giving the collection to enumerate.
       *
       *     For example: `album in artist.albums`.
       *
       *   * `variable in expression track by tracking_expression` – You can also provide an optional tracking function
       *     which can be used to associate the objects in the collection with the DOM elements. If no tracking function
       *     is specified the collection-repeat associates elements by identity in the collection. It is an error to have
       *     more than one tracking function to resolve to the same key. (This would mean that two distinct objects are
       *     mapped to the same DOM element, which is not possible.)  Filters should be applied to the expression,
       *     before specifying a tracking expression.
       *
       *     For example: `item in items` is equivalent to `item in items track by $id(item)'. This implies that the DOM elements
       *     will be associated by item identity in the array.
       *
       *     For example: `item in items track by $id(item)`. A built in `$id()` function can be used to assign a unique
       *     `$$hashKey` property to each item in the array. This property is then used as a key to associated DOM elements
       *     with the corresponding item in the array by identity. Moving the same object in array would move the DOM
       *     element in the same way in the DOM.
       *
       *     For example: `item in items track by item.id` is a typical pattern when the items come from the database. In this
       *     case the object identity does not matter. Two objects are considered equivalent as long as their `id`
       *     property is same.
       *
       *     For example: `item in items | filter:searchText track by item.id` is a pattern that might be used to apply a filter
       *     to items in conjunction with a tracking expression.
       *
       * @param {expression} collection-item-width The width of the repeated element.  Can be a number (in pixels) or a percentage.
       * @param {expression} collection-item-height The height of the repeated element.  Can be a number (in pixels), or a percentage.
       *
       */
      var COLLECTION_REPEAT_SCROLLVIEW_XY_ERROR = "Cannot create a collection-repeat within a scrollView that is scrollable on both x and y axis.  Choose either x direction or y direction.";
      var COLLECTION_REPEAT_ATTR_HEIGHT_ERROR = "collection-repeat expected attribute collection-item-height to be a an expression that returns a number (in pixels) or percentage.";
      var COLLECTION_REPEAT_ATTR_WIDTH_ERROR = "collection-repeat expected attribute collection-item-width to be a an expression that returns a number (in pixels) or percentage.";
      var COLLECTION_REPEAT_ATTR_REPEAT_ERROR = "collection-repeat expected expression in form of '_item_ in _collection_[ track by _id_]' but got '%'";
      
      IonicModule
      .directive('collectionRepeat', [
        '$collectionRepeatManager',
        '$collectionDataSource',
        '$parse',
      function($collectionRepeatManager, $collectionDataSource, $parse) {
        return {
          priority: 1000,
          transclude: 'element',
          terminal: true,
          $$tlb: true,
          require: '^$ionicScroll',
          controller: [function(){}],
          link: function($scope, $element, $attr, scrollCtrl, $transclude) {
            var wrap = jqLite('<div style="position:relative;">');
            $element.parent()[0].insertBefore(wrap[0], $element[0]);
            wrap.append($element);
      
            var scrollView = scrollCtrl.scrollView;
            if (scrollView.options.scrollingX && scrollView.options.scrollingY) {
              throw new Error(COLLECTION_REPEAT_SCROLLVIEW_XY_ERROR);
            }
      
            var isVertical = !!scrollView.options.scrollingY;
            if (isVertical && !$attr.collectionItemHeight) {
              throw new Error(COLLECTION_REPEAT_ATTR_HEIGHT_ERROR);
            } else if (!isVertical && !$attr.collectionItemWidth) {
              throw new Error(COLLECTION_REPEAT_ATTR_WIDTH_ERROR);
            }
      
            var heightParsed = $parse($attr.collectionItemHeight || '"100%"');
            var widthParsed = $parse($attr.collectionItemWidth || '"100%"');
      
            var heightGetter = function(scope, locals) {
              var result = heightParsed(scope, locals);
              if (isString(result) && result.indexOf('%') > -1) {
                return Math.floor(parseInt(result, 10) / 100 * scrollView.__clientHeight);
              }
              return result;
            };
            var widthGetter = function(scope, locals) {
              var result = widthParsed(scope, locals);
              if (isString(result) && result.indexOf('%') > -1) {
                return Math.floor(parseInt(result, 10) / 100 * scrollView.__clientWidth);
              }
              return result;
            };
      
            var match = $attr.collectionRepeat.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
            if (!match) {
              throw new Error(COLLECTION_REPEAT_ATTR_REPEAT_ERROR
                              .replace('%', $attr.collectionRepeat));
            }
            var keyExpr = match[1];
            var listExpr = match[2];
            var trackByExpr = match[3];
      
            var dataSource = new $collectionDataSource({
              scope: $scope,
              transcludeFn: $transclude,
              transcludeParent: $element.parent(),
              keyExpr: keyExpr,
              listExpr: listExpr,
              trackByExpr: trackByExpr,
              heightGetter: heightGetter,
              widthGetter: widthGetter
            });
            var collectionRepeatManager = new $collectionRepeatManager({
              dataSource: dataSource,
              element: scrollCtrl.$element,
              scrollView: scrollCtrl.scrollView,
            });
      
            $scope.$watchCollection(listExpr, function(value) {
              if (value && !angular.isArray(value)) {
                throw new Error("collection-repeat expects an array to repeat over, but instead got '" + typeof value + "'.");
              }
              rerender(value);
            });
      
            // Find every sibling before and after the repeated items, and pass them
            // to the dataSource
            var scrollViewContent = scrollCtrl.scrollView.__content;
            function rerender(value) {
              var beforeSiblings = [];
              var afterSiblings = [];
              var before = true;
      
              forEach(scrollViewContent.children, function(node, i) {
                if ( ionic.DomUtil.elementIsDescendant($element[0], node, scrollViewContent) ) {
                  before = false;
                } else {
                  if (node.hasAttribute('collection-repeat-ignore')) return;
                  var width = node.offsetWidth;
                  var height = node.offsetHeight;
                  if (width && height) {
                    var element = jqLite(node);
                    (before ? beforeSiblings : afterSiblings).push({
                      width: node.offsetWidth,
                      height: node.offsetHeight,
                      element: element,
                      scope: element.isolateScope() || element.scope(),
                      isOutside: true
                    });
                  }
                }
              });
      
              scrollView.resize();
              dataSource.setData(value, beforeSiblings, afterSiblings);
              collectionRepeatManager.resize();
            }
            function rerenderOnResize() {
              rerender($scope.$eval(listExpr));
            }
      
            scrollCtrl.$element.on('scroll.resize', rerenderOnResize);
            ionic.on('resize', rerenderOnResize, window);
      
            $scope.$on('$destroy', function() {
              collectionRepeatManager.destroy();
              dataSource.destroy();
              ionic.off('resize', rerenderOnResize, window);
            });
          }
        };
      }])
      .directive({
        ngSrc: collectionRepeatSrcDirective('ngSrc', 'src'),
        ngSrcset: collectionRepeatSrcDirective('ngSrcset', 'srcset'),
        ngHref: collectionRepeatSrcDirective('ngHref', 'href')
      });
      
      // Fix for #1674
      // Problem: if an ngSrc or ngHref expression evaluates to a falsy value, it will
      // not erase the previous truthy value of the href.
      // In collectionRepeat, we re-use elements from before. So if the ngHref expression
      // evaluates to truthy for item 1 and then falsy for item 2, if an element changes
      // from representing item 1 to representing item 2, item 2 will still have
      // item 1's href value.
      // Solution:  erase the href or src attribute if ngHref/ngSrc are falsy.
      function collectionRepeatSrcDirective(ngAttrName, attrName) {
        return [function() {
          return {
            priority: '99', // it needs to run after the attributes are interpolated
            link: function(scope, element, attr) {
              attr.$observe(ngAttrName, function(value) {
                if (!value) {
                  element[0].removeAttribute(attrName);
                }
              });
            }
          };
        }];
      }
      
      /**
       * @ngdoc directive
       * @name ionContent
       * @module ionic
       * @delegate ionic.service:$ionicScrollDelegate
       * @restrict E
       *
       * @description
       * The ionContent directive provides an easy to use content area that can be configured
       * to use Ionic's custom Scroll View, or the built in overflow scrolling of the browser.
       *
       * While we recommend using the custom Scroll features in Ionic in most cases, sometimes
       * (for performance reasons) only the browser's native overflow scrolling will suffice,
       * and so we've made it easy to toggle between the Ionic scroll implementation and
       * overflow scrolling.
       *
       * You can implement pull-to-refresh with the {@link ionic.directive:ionRefresher}
       * directive, and infinite scrolling with the {@link ionic.directive:ionInfiniteScroll}
       * directive.
       *
       * Be aware that this directive gets its own child scope. If you do not understand why this
       * is important, you can read [https://docs.angularjs.org/guide/scope](https://docs.angularjs.org/guide/scope).
       *
       * @param {string=} delegate-handle The handle used to identify this scrollView
       * with {@link ionic.service:$ionicScrollDelegate}.
       * @param {string=} direction Which way to scroll. 'x' or 'y' or 'xy'. Default 'y'.
       * @param {boolean=} locking Whether to lock scrolling in one direction at a time. Useful to set to false when zoomed in or scrolling in two directions. Default true.
       * @param {boolean=} padding Whether to add padding to the content.
       * of the content.  Defaults to true on iOS, false on Android.
       * @param {boolean=} scroll Whether to allow scrolling of content.  Defaults to true.
       * @param {boolean=} overflow-scroll Whether to use overflow-scrolling instead of
       * Ionic scroll.
       * @param {boolean=} scrollbar-x Whether to show the horizontal scrollbar. Default true.
       * @param {boolean=} scrollbar-y Whether to show the vertical scrollbar. Default true.
       * @param {string=} start-y Initial vertical scroll position. Default 0.
       * of the content.  Defaults to true on iOS, false on Android.
       * @param {expression=} on-scroll Expression to evaluate when the content is scrolled.
       * @param {expression=} on-scroll-complete Expression to evaluate when a scroll action completes.
       * @param {boolean=} has-bouncing Whether to allow scrolling to bounce past the edges
       * of the content.  Defaults to true on iOS, false on Android.
       */
      IonicModule
      .directive('ionContent', [
        '$timeout',
        '$controller',
        '$ionicBind',
      function($timeout, $controller, $ionicBind) {
        return {
          restrict: 'E',
          require: '^?ionNavView',
          scope: true,
          priority: 800,
          compile: function(element, attr) {
            var innerElement;
      
            element.addClass('scroll-content ionic-scroll');
      
            if (attr.scroll != 'false') {
              //We cannot use normal transclude here because it breaks element.data()
              //inheritance on compile
              innerElement = jqLite('<div class="scroll"></div>');
              innerElement.append(element.contents());
              element.append(innerElement);
            } else {
              element.addClass('scroll-content-false');
            }
      
            return { pre: prelink };
            function prelink($scope, $element, $attr, navViewCtrl) {
              var parentScope = $scope.$parent;
              $scope.$watch(function() {
                return (parentScope.$hasHeader ? ' has-header' : '')  +
                  (parentScope.$hasSubheader ? ' has-subheader' : '') +
                  (parentScope.$hasFooter ? ' has-footer' : '') +
                  (parentScope.$hasSubfooter ? ' has-subfooter' : '') +
                  (parentScope.$hasTabs ? ' has-tabs' : '') +
                  (parentScope.$hasTabsTop ? ' has-tabs-top' : '');
              }, function(className, oldClassName) {
                $element.removeClass(oldClassName);
                $element.addClass(className);
              });
      
              //Only this ionContent should use these variables from parent scopes
              $scope.$hasHeader = $scope.$hasSubheader =
                $scope.$hasFooter = $scope.$hasSubfooter =
                $scope.$hasTabs = $scope.$hasTabsTop =
                false;
              $ionicBind($scope, $attr, {
                $onScroll: '&onScroll',
                $onScrollComplete: '&onScrollComplete',
                hasBouncing: '@',
                padding: '@',
                direction: '@',
                scrollbarX: '@',
                scrollbarY: '@',
                startX: '@',
                startY: '@',
                scrollEventInterval: '@'
              });
              $scope.direction = $scope.direction || 'y';
      
              if (angular.isDefined($attr.padding)) {
                $scope.$watch($attr.padding, function(newVal) {
                    (innerElement || $element).toggleClass('padding', !!newVal);
                });
              }
      
              if ($attr.scroll === "false") {
                //do nothing
              } else if(attr.overflowScroll === "true") {
                $element.addClass('overflow-scroll');
              } else {
                var scrollViewOptions = {
                  el: $element[0],
                  delegateHandle: attr.delegateHandle,
                  locking: (attr.locking || 'true') === 'true',
                  bouncing: $scope.$eval($scope.hasBouncing),
                  startX: $scope.$eval($scope.startX) || 0,
                  startY: $scope.$eval($scope.startY) || 0,
                  scrollbarX: $scope.$eval($scope.scrollbarX) !== false,
                  scrollbarY: $scope.$eval($scope.scrollbarY) !== false,
                  scrollingX: $scope.direction.indexOf('x') >= 0,
                  scrollingY: $scope.direction.indexOf('y') >= 0,
                  scrollEventInterval: parseInt($scope.scrollEventInterval, 10) || 10,
                  scrollingComplete: function() {
                    $scope.$onScrollComplete({
                      scrollTop: this.__scrollTop,
                      scrollLeft: this.__scrollLeft
                    });
                  }
                };
                $controller('$ionicScroll', {
                  $scope: $scope,
                  scrollViewOptions: scrollViewOptions
                });
      
                $scope.$on('$destroy', function() {
                  scrollViewOptions.scrollingComplete = angular.noop;
                  delete scrollViewOptions.el;
                  innerElement = null;
                  $element = null;
                  attr.$$element = null;
                });
              }
      
            }
          }
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name exposeAsideWhen
       * @module ionic
       * @restrict A
       * @parent ionic.directive:ionSideMenus
       *
       * @description
       * It is common for a tablet application to hide a menu when in portrait mode, but to show the
       * same menu on the left side when the tablet is in landscape mode. The `exposeAsideWhen` attribute
       * directive can be used to accomplish a similar interface.
       *
       * By default, side menus are hidden underneath its side menu content, and can be opened by either
       * swiping the content left or right, or toggling a button to show the side menu. However, by adding the
       * `exposeAsideWhen` attribute directive to an {@link ionic.directive:ionSideMenu} element directive,
       * a side menu can be given instructions on "when" the menu should be exposed (always viewable). For
       * example, the `expose-aside-when="large"` attribute will keep the side menu hidden when the viewport's
       * width is less than `768px`, but when the viewport's width is `768px` or greater, the menu will then
       * always be shown and can no longer be opened or closed like it could when it was hidden for smaller
       * viewports.
       *
       * Using `large` as the attribute's value is a shortcut value to `(min-width:768px)` since it is
       * the most common use-case. However, for added flexibility, any valid media query could be added
       * as the value, such as `(min-width:600px)` or even multiple queries such as
       * `(min-width:750px) and (max-width:1200px)`.
      
       * @usage
       * ```html
       * <ion-side-menus>
       *   <!-- Center content -->
       *   <ion-side-menu-content>
       *   </ion-side-menu-content>
       *
       *   <!-- Left menu -->
       *   <ion-side-menu expose-aside-when="large">
       *   </ion-side-menu>
       * </ion-side-menus>
       * ```
       * For a complete side menu example, see the
       * {@link ionic.directive:ionSideMenus} documentation.
       */
      IonicModule
      .directive('exposeAsideWhen', ['$window', function($window) {
        return {
          restrict: 'A',
          require: '^ionSideMenus',
          link: function($scope, $element, $attr, sideMenuCtrl) {
      
            function checkAsideExpose() {
              var mq = $attr.exposeAsideWhen == 'large' ? '(min-width:768px)' : $attr.exposeAsideWhen;
              sideMenuCtrl.exposeAside( $window.matchMedia(mq).matches );
              sideMenuCtrl.activeAsideResizing(false);
            }
      
            function onResize() {
              sideMenuCtrl.activeAsideResizing(true);
              debouncedCheck();
            }
      
            var debouncedCheck = ionic.debounce(function() {
              $scope.$apply(function(){
                checkAsideExpose();
              });
            }, 300, false);
      
            checkAsideExpose();
      
            ionic.on('resize', onResize, $window);
      
            $scope.$on('$destroy', function(){
              ionic.off('resize', onResize, $window);
            });
      
          }
        };
      }]);
      
      
      var GESTURE_DIRECTIVES = 'onHold onTap onTouch onRelease onDrag onDragUp onDragRight onDragDown onDragLeft onSwipe onSwipeUp onSwipeRight onSwipeDown onSwipeLeft'.split(' ');
      
      GESTURE_DIRECTIVES.forEach(function(name) {
        IonicModule.directive(name, gestureDirective(name));
      });
      
      
      /**
       * @ngdoc directive
       * @name onHold
       * @module ionic
       * @restrict A
       *
       * @description
       * Touch stays at the same location for 500ms. Similar to long touch events available for AngularJS and jQuery.
       *
       * @usage
       * ```html
       * <button on-hold="onHold()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onTap
       * @module ionic
       * @restrict A
       *
       * @description
       * Quick touch at a location. If the duration of the touch goes
       * longer than 250ms it is no longer a tap gesture.
       *
       * @usage
       * ```html
       * <button on-tap="onTap()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onTouch
       * @module ionic
       * @restrict A
       *
       * @description
       * Called immediately when the user first begins a touch. This
       * gesture does not wait for a touchend/mouseup.
       *
       * @usage
       * ```html
       * <button on-touch="onTouch()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onRelease
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when the user ends a touch.
       *
       * @usage
       * ```html
       * <button on-release="onRelease()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onDrag
       * @module ionic
       * @restrict A
       *
       * @description
       * Move with one touch around on the page. Blocking the scrolling when
       * moving left and right is a good practice. When all the drag events are
       * blocking you disable scrolling on that area.
       *
       * @usage
       * ```html
       * <button on-drag="onDrag()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onDragUp
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when the element is dragged up.
       *
       * @usage
       * ```html
       * <button on-drag-up="onDragUp()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onDragRight
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when the element is dragged to the right.
       *
       * @usage
       * ```html
       * <button on-drag-right="onDragRight()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onDragDown
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when the element is dragged down.
       *
       * @usage
       * ```html
       * <button on-drag-down="onDragDown()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onDragLeft
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when the element is dragged to the left.
       *
       * @usage
       * ```html
       * <button on-drag-left="onDragLeft()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onSwipe
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when a moving touch has a high velocity in any direction.
       *
       * @usage
       * ```html
       * <button on-swipe="onSwipe()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onSwipeUp
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when a moving touch has a high velocity moving up.
       *
       * @usage
       * ```html
       * <button on-swipe-up="onSwipeUp()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onSwipeRight
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when a moving touch has a high velocity moving to the right.
       *
       * @usage
       * ```html
       * <button on-swipe-right="onSwipeRight()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onSwipeDown
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when a moving touch has a high velocity moving down.
       *
       * @usage
       * ```html
       * <button on-swipe-down="onSwipeDown()" class="button">Test</button>
       * ```
       */
      
      
      /**
       * @ngdoc directive
       * @name onSwipeLeft
       * @module ionic
       * @restrict A
       *
       * @description
       * Called when a moving touch has a high velocity moving to the left.
       *
       * @usage
       * ```html
       * <button on-swipe-left="onSwipeLeft()" class="button">Test</button>
       * ```
       */
      
      
      function gestureDirective(directiveName) {
        return ['$ionicGesture', '$parse', function($ionicGesture, $parse) {
          var eventType = directiveName.substr(2).toLowerCase();
      
          return function(scope, element, attr) {
            var fn = $parse( attr[directiveName] );
      
            var listener = function(ev) {
              scope.$apply(function() {
                fn(scope, {
                  $event: ev
                });
              });
            };
      
            var gesture = $ionicGesture.on(eventType, listener, element);
      
            scope.$on('$destroy', function() {
              $ionicGesture.off(gesture, eventType, listener);
            });
          };
        }];
      }
      
      
      IonicModule
      .directive('ionNavBar', tapScrollToTopDirective())
      .directive('ionHeaderBar', tapScrollToTopDirective())
      
      /**
       * @ngdoc directive
       * @name ionHeaderBar
       * @module ionic
       * @restrict E
       *
       * @description
       * Adds a fixed header bar above some content.
       *
       * Can also be a subheader (lower down) if the 'bar-subheader' class is applied.
       * See [the header CSS docs](/docs/components/#subheader).
       *
       * Note: If you use ionHeaderBar in combination with ng-if, the surrounding content
       * will not align correctly.  This will be fixed soon.
       *
       * @param {string=} align-title Where to align the title. 
       * Available: 'left', 'right', or 'center'.  Defaults to 'center'.
       * @param {boolean=} no-tap-scroll By default, the header bar will scroll the
       * content to the top when tapped.  Set no-tap-scroll to true to disable this 
       * behavior.
       * Available: true or false.  Defaults to false.
       *
       * @usage
       * ```html
       * <ion-header-bar align-title="left" class="bar-positive">
       *   <div class="buttons">
       *     <button class="button" ng-click="doSomething()">Left Button</button>
       *   </div>
       *   <h1 class="title">Title!</h1>
       *   <div class="buttons">
       *     <button class="button">Right Button</button>
       *   </div>
       * </ion-header-bar>
       * <ion-content>
       *   Some content!
       * </ion-content>
       * ```
       */
      .directive('ionHeaderBar', headerFooterBarDirective(true))
      
      /**
       * @ngdoc directive
       * @name ionFooterBar
       * @module ionic
       * @restrict E
       *
       * @description
       * Adds a fixed footer bar below some content.
       *
       * Can also be a subfooter (higher up) if the 'bar-subfooter' class is applied.
       * See [the footer CSS docs](/docs/components/#footer).
       *
       * Note: If you use ionFooterBar in combination with ng-if, the surrounding content
       * will not align correctly.  This will be fixed soon.
       *
       * @param {string=} align-title Where to align the title.
       * Available: 'left', 'right', or 'center'.  Defaults to 'center'.
       *
       * @usage
       * ```html
       * <ion-content>
       *   Some content!
       * </ion-content>
       * <ion-footer-bar align-title="left" class="bar-assertive">
       *   <div class="buttons">
       *     <button class="button">Left Button</button>
       *   </div>
       *   <h1 class="title">Title!</h1>
       *   <div class="buttons" ng-click="doSomething()">
       *     <button class="button">Right Button</button>
       *   </div>
       * </ion-footer-bar>
       * ```
       */
      .directive('ionFooterBar', headerFooterBarDirective(false));
      
      function tapScrollToTopDirective() {
        return ['$ionicScrollDelegate', function($ionicScrollDelegate) {
          return {
            restrict: 'E',
            link: function($scope, $element, $attr) {
              if ($attr.noTapScroll == 'true') {
                return;
              }
              ionic.on('tap', onTap, $element[0]);
              $scope.$on('$destroy', function() {
                ionic.off('tap', onTap, $element[0]);
              });
      
              function onTap(e) {
                var depth = 3;
                var current = e.target;
                //Don't scroll to top in certain cases
                while (depth-- && current) {
                  if (current.classList.contains('button') ||
                      current.tagName.match(/input|textarea|select/i) ||
                      current.isContentEditable) {
                    return;
                  }
                  current = current.parentNode;
                }
                var touch = e.gesture && e.gesture.touches[0] || e.detail.touches[0];
                var bounds = $element[0].getBoundingClientRect();
                if (ionic.DomUtil.rectContains(
                  touch.pageX, touch.pageY,
                  bounds.left, bounds.top - 20,
                  bounds.left + bounds.width, bounds.top + bounds.height
                )) {
                  $ionicScrollDelegate.scrollTop(true);
                }
              }
            }
          };
        }];
      }
      
      function headerFooterBarDirective(isHeader) {
        return [function() {
          return {
            restrict: 'E',
            compile: function($element, $attr) {
              $element.addClass(isHeader ? 'bar bar-header' : 'bar bar-footer');
              var parent = $element[0].parentNode;
              if(parent.querySelector('.tabs-top'))$element.addClass('has-tabs-top');
              return { pre: prelink };
              function prelink($scope, $element, $attr) {
                var hb = new ionic.views.HeaderBar({
                  el: $element[0],
                  alignTitle: $attr.alignTitle || 'center'
                });
      
                var el = $element[0];
      
                if (isHeader) {
                  $scope.$watch(function() { return el.className; }, function(value) {
                    var isShown = value.indexOf('ng-hide') === -1;
                    var isSubheader = value.indexOf('bar-subheader') !== -1;
                    $scope.$hasHeader = isShown && !isSubheader;
                    $scope.$hasSubheader = isShown && isSubheader;
                  });
                  $scope.$on('$destroy', function() {
                    delete $scope.$hasHeader;
                    delete $scope.$hasSubheader;
                  });
                } else {
                  $scope.$watch(function() { return el.className; }, function(value) {
                    var isShown = value.indexOf('ng-hide') === -1;
                    var isSubfooter = value.indexOf('bar-subfooter') !== -1;
                    $scope.$hasFooter = isShown && !isSubfooter;
                    $scope.$hasSubfooter = isShown && isSubfooter;
                  });
                  $scope.$on('$destroy', function() {
                    delete $scope.$hasFooter;
                    delete $scope.$hasSubfooter;
                  });
                  $scope.$watch('$hasTabs', function(val) {
                    $element.toggleClass('has-tabs', !!val);
                  });
                }
              }
            }
          };
        }];
      }
      
      /**
       * @ngdoc directive
       * @name ionInfiniteScroll
       * @module ionic
       * @parent ionic.directive:ionContent, ionic.directive:ionScroll
       * @restrict E
       *
       * @description
       * The ionInfiniteScroll directive allows you to call a function whenever
       * the user gets to the bottom of the page or near the bottom of the page.
       *
       * The expression you pass in for `on-infinite` is called when the user scrolls
       * greater than `distance` away from the bottom of the content.  Once `on-infinite`
       * is done loading new data, it should broadcast the `scroll.infiniteScrollComplete`
       * event from your controller (see below example).
       *
       * @param {expression} on-infinite What to call when the scroller reaches the
       * bottom.
       * @param {string=} distance The distance from the bottom that the scroll must
       * reach to trigger the on-infinite expression. Default: 1%.
       * @param {string=} icon The icon to show while loading. Default: 'ion-loading-d'.
       *
       * @usage
       * ```html
       * <ion-content ng-controller="MyController">
       *   <ion-list>
       *   ....
       *   ....
       *   </ion-list>
       *
       *   <ion-infinite-scroll
       *     on-infinite="loadMore()"
       *     distance="1%">
       *   </ion-infinite-scroll>
       * </ion-content>
       * ```
       * ```js
       * function MyController($scope, $http) {
       *   $scope.items = [];
       *   $scope.loadMore = function() {
       *     $http.get('/more-items').success(function(items) {
       *       useItems(items);
       *       $scope.$broadcast('scroll.infiniteScrollComplete');
       *     });
       *   };
       *
       *   $scope.$on('$stateChangeSuccess', function() {
       *     $scope.loadMore();
       *   });
       * }
       * ```
       *
       * An easy to way to stop infinite scroll once there is no more data to load
       * is to use angular's `ng-if` directive:
       *
       * ```html
       * <ion-infinite-scroll
       *   ng-if="moreDataCanBeLoaded()"
       *   icon="ion-loading-c"
       *   on-infinite="loadMoreData()">
       * </ion-infinite-scroll>
       * ```
       */
      IonicModule
      .directive('ionInfiniteScroll', ['$timeout', function($timeout) {
        function calculateMaxValue(distance, maximum, isPercent) {
          return isPercent ?
            maximum * (1 - parseFloat(distance,10) / 100) :
            maximum - parseFloat(distance, 10);
        }
        return {
          restrict: 'E',
          require: ['^$ionicScroll', 'ionInfiniteScroll'],
          template: '<i class="icon {{icon()}} icon-refreshing"></i>',
          scope: true,
          controller: ['$scope', '$attrs', function($scope, $attrs) {
            this.isLoading = false;
            this.scrollView = null; //given by link function
            this.getMaxScroll = function() {
              var distance = ($attrs.distance || '2.5%').trim();
              var isPercent = distance.indexOf('%') !== -1;
              var maxValues = this.scrollView.getScrollMax();
              return {
                left: this.scrollView.options.scrollingX ?
                  calculateMaxValue(distance, maxValues.left, isPercent) :
                  -1,
                top: this.scrollView.options.scrollingY ?
                  calculateMaxValue(distance, maxValues.top, isPercent) :
                  -1
              };
            };
          }],
          link: function($scope, $element, $attrs, ctrls) {
            var scrollCtrl = ctrls[0];
            var infiniteScrollCtrl = ctrls[1];
            var scrollView = infiniteScrollCtrl.scrollView = scrollCtrl.scrollView;
      
            $scope.icon = function() {
              return angular.isDefined($attrs.icon) ? $attrs.icon : 'ion-loading-d';
            };
      
            var onInfinite = function() {
              $element[0].classList.add('active');
              infiniteScrollCtrl.isLoading = true;
              $scope.$parent && $scope.$parent.$apply($attrs.onInfinite || '');
            };
      
            var finishInfiniteScroll = function() {
              $element[0].classList.remove('active');
              $timeout(function() {
                scrollView.resize();
                checkBounds();
              }, 0, false);
              infiniteScrollCtrl.isLoading = false;
            };
      
            $scope.$on('scroll.infiniteScrollComplete', function() {
              finishInfiniteScroll();
            });
      
            $scope.$on('$destroy', function() {
              void 0;
              if(scrollCtrl && scrollCtrl.$element)scrollCtrl.$element.off('scroll', checkBounds);
            });
      
            var checkBounds = ionic.animationFrameThrottle(checkInfiniteBounds);
      
            //Check bounds on start, after scrollView is fully rendered
            setTimeout(checkBounds);
            scrollCtrl.$element.on('scroll', checkBounds);
      
            function checkInfiniteBounds() {
              if (infiniteScrollCtrl.isLoading) return;
      
              var scrollValues = scrollView.getValues();
              var maxScroll = infiniteScrollCtrl.getMaxScroll();
      
              if ((maxScroll.left !== -1 && scrollValues.left >= maxScroll.left) ||
                  (maxScroll.top !== -1 && scrollValues.top >= maxScroll.top)) {
                onInfinite();
              }
            }
          }
        };
      }]);
      
      var ITEM_TPL_CONTENT_ANCHOR =
        '<a class="item-content" ng-href="{{$href()}}" target="{{$target()}}"></a>';
      var ITEM_TPL_CONTENT =
        '<div class="item-content"></div>';
      /**
      * @ngdoc directive
      * @name ionItem
      * @parent ionic.directive:ionList
      * @module ionic
      * @restrict E
      * Creates a list-item that can easily be swiped,
      * deleted, reordered, edited, and more.
      *
      * See {@link ionic.directive:ionList} for a complete example & explanation.
      *
      * Can be assigned any item class name. See the
      * [list CSS documentation](/docs/components/#list).
      *
      * @usage
      *
      * ```html
      * <ion-list>
      *   <ion-item>Hello!</ion-item>
      *   <ion-item href="#/detail">
      *     Link to detail page
      *   <ion-item>
      * </ion-list>
      * ```
      */
      IonicModule
      .directive('ionItem', [
        '$animate',
        '$compile',
      function($animate, $compile) {
        return {
          restrict: 'E',
          controller: ['$scope', '$element', function($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
          }],
          scope: true,
          compile: function($element, $attrs) {
            var isAnchor = angular.isDefined($attrs.href) ||
              angular.isDefined($attrs.ngHref) ||
              angular.isDefined($attrs.uiSref);
            var isComplexItem = isAnchor ||
              //Lame way of testing, but we have to know at compile what to do with the element
              /ion-(delete|option|reorder)-button/i.test($element.html());
      
              if (isComplexItem) {
                var innerElement = jqLite(isAnchor ? ITEM_TPL_CONTENT_ANCHOR : ITEM_TPL_CONTENT);
                innerElement.append($element.contents());
      
                $element.append(innerElement);
                $element.addClass('item item-complex');
              } else {
                $element.addClass('item');
              }
      
              return function link($scope, $element, $attrs) {
                $scope.$href = function() {
                  return $attrs.href || $attrs.ngHref;
                };
                $scope.$target = function() {
                  return $attrs.target || '_self';
                };
              };
          }
        };
      }]);
      
      var ITEM_TPL_DELETE_BUTTON =
        '<div class="item-left-edit item-delete enable-pointer-events">' +
        '</div>';
      /**
      * @ngdoc directive
      * @name ionDeleteButton
      * @parent ionic.directive:ionItem
      * @module ionic
      * @restrict E
      * Creates a delete button inside a list item, that is visible when the
      * {@link ionic.directive:ionList ionList parent's} `show-delete` evaluates to true or
      * `$ionicListDelegate.showDelete(true)` is called.
      *
      * Takes any ionicon as a class.
      *
      * See {@link ionic.directive:ionList} for a complete example & explanation.
      *
      * @usage
      *
      * ```html
      * <ion-list show-delete="shouldShowDelete">
      *   <ion-item>
      *     <ion-delete-button class="ion-minus-circled"></ion-delete-button>
      *     Hello, list item!
      *   </ion-item>
      * </ion-list>
      * <ion-toggle ng-model="shouldShowDelete">
      *   Show Delete?
      * </ion-toggle>
      * ```
      */
      IonicModule
      .directive('ionDeleteButton', ['$animate', function($animate) {
        return {
          restrict: 'E',
          require: ['^ionItem', '^?ionList'],
          //Run before anything else, so we can move it before other directives process
          //its location (eg ngIf relies on the location of the directive in the dom)
          priority: Number.MAX_VALUE,
          compile: function($element, $attr) {
            //Add the classes we need during the compile phase, so that they stay
            //even if something else like ngIf removes the element and re-addss it
            $attr.$set('class', ($attr['class'] || '') + ' button icon button-icon', true);
            return function($scope, $element, $attr, ctrls) {
              var itemCtrl = ctrls[0];
              var listCtrl = ctrls[1];
              var container = jqLite(ITEM_TPL_DELETE_BUTTON);
              container.append($element);
              itemCtrl.$element.append(container).addClass('item-left-editable');
      
              if (listCtrl && listCtrl.showDelete()) {
                container.addClass('visible active');
              }
            };
          }
        };
      }]);
      
      
      IonicModule
      .directive('itemFloatingLabel', function() {
        return {
          restrict: 'C',
          link: function(scope, element) {
            var el = element[0];
            var input = el.querySelector('input, textarea');
            var inputLabel = el.querySelector('.input-label');
      
            if ( !input || !inputLabel ) return;
      
            var onInput = function() {
              if ( input.value ) {
                inputLabel.classList.add('has-input');
              } else {
                inputLabel.classList.remove('has-input');
              }
            };
      
            input.addEventListener('input', onInput);
      
            var ngModelCtrl = angular.element(input).controller('ngModel');
            if ( ngModelCtrl ) {
              ngModelCtrl.$render = function() {
                input.value = ngModelCtrl.$viewValue || '';
                onInput();
              };
            }
      
            scope.$on('$destroy', function() {
              input.removeEventListener('input', onInput);
            });
          }
        };
      });
      
      var ITEM_TPL_OPTION_BUTTONS =
        '<div class="item-options invisible">' +
        '</div>';
      /**
      * @ngdoc directive
      * @name ionOptionButton
      * @parent ionic.directive:ionItem
      * @module ionic
      * @restrict E
      * Creates an option button inside a list item, that is visible when the item is swiped
      * to the left by the user.  Swiped open option buttons can be hidden with
      * {@link ionic.service:$ionicListDelegate#closeOptionButtons $ionicListDelegate#closeOptionButtons}.
      *
      * Can be assigned any button class.
      *
      * See {@link ionic.directive:ionList} for a complete example & explanation.
      *
      * @usage
      *
      * ```html
      * <ion-list>
      *   <ion-item>
      *     I love kittens!
      *     <ion-option-button class="button-positive">Share</ion-option-button>
      *     <ion-option-button class="button-assertive">Edit</ion-option-button>
      *   </ion-item>
      * </ion-list>
      * ```
      */
      IonicModule
      .directive('ionOptionButton', ['$compile', function($compile) {
        function stopPropagation(e) {
          e.stopPropagation();
        }
        return {
          restrict: 'E',
          require: '^ionItem',
          priority: Number.MAX_VALUE,
          compile: function($element, $attr) {
            $attr.$set('class', ($attr['class'] || '') + ' button', true);
            return function($scope, $element, $attr, itemCtrl) {
              if (!itemCtrl.optionsContainer) {
                itemCtrl.optionsContainer = jqLite(ITEM_TPL_OPTION_BUTTONS);
                itemCtrl.$element.append(itemCtrl.optionsContainer);
              }
              itemCtrl.optionsContainer.append($element);
      
              //Don't bubble click up to main .item
              $element.on('click', stopPropagation);
            };
          }
        };
      }]);
      
      var ITEM_TPL_REORDER_BUTTON =
        '<div data-prevent-scroll="true" class="item-right-edit item-reorder enable-pointer-events">' +
        '</div>';
      
      /**
      * @ngdoc directive
      * @name ionReorderButton
      * @parent ionic.directive:ionItem
      * @module ionic
      * @restrict E
      * Creates a reorder button inside a list item, that is visible when the
      * {@link ionic.directive:ionList ionList parent's} `show-reorder` evaluates to true or
      * `$ionicListDelegate.showReorder(true)` is called.
      *
      * Can be dragged to reorder items in the list. Takes any ionicon class.
      *
      * Note: Reordering works best when used with `ng-repeat`.  Be sure that all `ion-item` children of an `ion-list` are part of the same `ng-repeat` expression.
      *
      * When an item reorder is complete, the expression given in the `on-reorder` attribute is called. The `on-reorder` expression is given two locals that can be used: `$fromIndex` and `$toIndex`.  See below for an example.
      *
      * Look at {@link ionic.directive:ionList} for more examples.
      *
      * @usage
      *
      * ```html
      * <ion-list ng-controller="MyCtrl" show-reorder="true">
      *   <ion-item ng-repeat="item in items">
      *     Item {{item}}
      *     <ion-reorder-button class="ion-navicon"
      *                         on-reorder="moveItem(item, $fromIndex, $toIndex)">
      *     </ion-reorder-button>
      *   </ion-item>
      * </ion-list>
      * ```
      * ```js
      * function MyCtrl($scope) {
      *   $scope.items = [1, 2, 3, 4];
      *   $scope.moveItem = function(item, fromIndex, toIndex) {
      *     //Move the item in the array
      *     $scope.items.splice(fromIndex, 1);
      *     $scope.items.splice(toIndex, 0, item);
      *   };
      * }
      * ```
      *
      * @param {expression=} on-reorder Expression to call when an item is reordered.
      * Parameters given: $fromIndex, $toIndex.
      */
      IonicModule
      .directive('ionReorderButton', ['$animate', '$parse', function($animate, $parse) {
        return {
          restrict: 'E',
          require: ['^ionItem', '^?ionList'],
          priority: Number.MAX_VALUE,
          compile: function($element, $attr) {
            $attr.$set('class', ($attr['class'] || '') + ' button icon button-icon', true);
            $element[0].setAttribute('data-prevent-scroll', true);
            return function($scope, $element, $attr, ctrls) {
              var itemCtrl = ctrls[0];
              var listCtrl = ctrls[1];
              var onReorderFn = $parse($attr.onReorder);
      
              $scope.$onReorder = function(oldIndex, newIndex) {
                onReorderFn($scope, {
                  $fromIndex: oldIndex,
                  $toIndex: newIndex
                });
              };
      
              // prevent clicks from bubbling up to the item
              if(!$attr.ngClick && !$attr.onClick && !$attr.onclick){
                $element[0].onclick = function(e){e.stopPropagation(); return false;};
              }
      
              var container = jqLite(ITEM_TPL_REORDER_BUTTON);
              container.append($element);
              itemCtrl.$element.append(container).addClass('item-right-editable');
      
              if (listCtrl && listCtrl.showReorder()) {
                container.addClass('visible active');
              }
            };
          }
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name keyboardAttach
       * @module ionic
       * @restrict A
       *
       * @description
       * keyboard-attach is an attribute directive which will cause an element to float above
       * the keyboard when the keyboard shows. Currently only supports the
       * [ion-footer-bar]({{ page.versionHref }}/api/directive/ionFooterBar/) directive.
       *
       * ### Notes
       * - This directive requires the
       * [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugins-keyboard).
       * - On Android not in fullscreen mode, i.e. you have
       *   `<preference name="Fullscreen" value="false" />` or no preference in your `config.xml` file,
       *   this directive is unnecessary since it is the default behavior.
       * - On iOS, if there is an input in your footer, you will need to set
       *   `cordova.plugins.Keyboard.disableScroll(true)`.
       *
       * @usage
       *
       * ```html
       *  <ion-footer-bar align-title="left" keyboard-attach class="bar-assertive">
       *    <h1 class="title">Title!</h1>
       *  </ion-footer-bar>
       * ```
       */
      
      IonicModule
      .directive('keyboardAttach', function() {
        return function(scope, element, attrs) {
          ionic.on('native.keyboardshow', onShow, window);
          ionic.on('native.keyboardhide', onHide, window);
      
          //deprecated
          ionic.on('native.showkeyboard', onShow, window);
          ionic.on('native.hidekeyboard', onHide, window);
      
      
          var scrollCtrl;
      
          function onShow(e) {
            if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
              return;
            }
      
            //for testing
            var keyboardHeight = e.keyboardHeight || e.detail.keyboardHeight;
            element.css('bottom', keyboardHeight + "px");
            scrollCtrl = element.controller('$ionicScroll');
            if ( scrollCtrl ) {
              scrollCtrl.scrollView.__container.style.bottom = keyboardHeight + keyboardAttachGetClientHeight(element[0]) + "px";
            }
          }
      
          function onHide() {
            if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
              return;
            }
      
            element.css('bottom', '');
            if ( scrollCtrl ) {
              scrollCtrl.scrollView.__container.style.bottom = '';
            }
          }
      
          scope.$on('$destroy', function() {
            ionic.off('native.keyboardshow', onShow, window);
            ionic.off('native.keyboardhide', onHide, window);
      
            //deprecated
            ionic.off('native.showkeyboard', onShow, window);
            ionic.off('native.hidekeyboard', onHide, window);
          });
        };
      });
      
      function keyboardAttachGetClientHeight(element) {
        return element.clientHeight;
      }
      
      /**
      * @ngdoc directive
      * @name ionList
      * @module ionic
      * @delegate ionic.service:$ionicListDelegate
      * @codepen JsHjf
      * @restrict E
      * @description
      * The List is a widely used interface element in almost any mobile app, and can include
      * content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.
      *
      * Both the list, which contains items, and the list items themselves can be any HTML
      * element. The containing element requires the `list` class and each list item requires
      * the `item` class.
      *
      * However, using the ionList and ionItem directives make it easy to support various
      * interaction modes such as swipe to edit, drag to reorder, and removing items.
      *
      * Related: {@link ionic.directive:ionItem}, {@link ionic.directive:ionOptionButton}
      * {@link ionic.directive:ionReorderButton}, {@link ionic.directive:ionDeleteButton}, [`list CSS documentation`](/docs/components/#list).
      *
      * @usage
      *
      * Basic Usage:
      *
      * ```html
      * <ion-list>
      *   <ion-item ng-repeat="item in items">
      *     {% raw %}Hello, {{item}}!{% endraw %}
      *   </ion-item>
      * </ion-list>
      * ```
      *
      * Advanced Usage: Thumbnails, Delete buttons, Reordering, Swiping
      *
      * ```html
      * <ion-list ng-controller="MyCtrl"
      *           show-delete="shouldShowDelete"
      *           show-reorder="shouldShowReorder"
      *           can-swipe="listCanSwipe">
      *   <ion-item ng-repeat="item in items"
      *             class="item-thumbnail-left">
      *
      *     {% raw %}<img ng-src="{{item.img}}">
      *     <h2>{{item.title}}</h2>
      *     <p>{{item.description}}</p>{% endraw %}
      *     <ion-option-button class="button-positive"
      *                        ng-click="share(item)">
      *       Share
      *     </ion-option-button>
      *     <ion-option-button class="button-info"
      *                        ng-click="edit(item)">
      *       Edit
      *     </ion-option-button>
      *     <ion-delete-button class="ion-minus-circled"
      *                        ng-click="items.splice($index, 1)">
      *     </ion-delete-button>
      *     <ion-reorder-button class="ion-navicon"
      *                         on-reorder="reorderItem(item, $fromIndex, $toIndex)">
      *     </ion-reorder-button>
      *
      *   </ion-item>
      * </ion-list>
      * ```
      *
      * @param {string=} delegate-handle The handle used to identify this list with
      * {@link ionic.service:$ionicListDelegate}.
      * @param type {string=} The type of list to use (list-inset or card)
      * @param show-delete {boolean=} Whether the delete buttons for the items in the list are
      * currently shown or hidden.
      * @param show-reorder {boolean=} Whether the reorder buttons for the items in the list are
      * currently shown or hidden.
      * @param can-swipe {boolean=} Whether the items in the list are allowed to be swiped to reveal
      * option buttons. Default: true.
      */
      IonicModule
      .directive('ionList', [
        '$animate',
        '$timeout',
      function($animate, $timeout) {
        return {
          restrict: 'E',
          require: ['ionList', '^?$ionicScroll'],
          controller: '$ionicList',
          compile: function($element, $attr) {
            var listEl = jqLite('<div class="list">')
            .append( $element.contents() )
            .addClass($attr.type);
            $element.append(listEl);
      
            return function($scope, $element, $attrs, ctrls) {
              var listCtrl = ctrls[0];
              var scrollCtrl = ctrls[1];
      
              //Wait for child elements to render...
              $timeout(init);
      
              function init() {
                var listView = listCtrl.listView = new ionic.views.ListView({
                  el: $element[0],
                  listEl: $element.children()[0],
                  scrollEl: scrollCtrl && scrollCtrl.element,
                  scrollView: scrollCtrl && scrollCtrl.scrollView,
                  onReorder: function(el, oldIndex, newIndex) {
                    var itemScope = jqLite(el).scope();
                    if (itemScope && itemScope.$onReorder) {
                      //Make sure onReorder is called in apply cycle,
                      //but also make sure it has no conflicts by doing
                      //$evalAsync
                      $timeout(function() {
                        itemScope.$onReorder(oldIndex, newIndex);
                      });
                    }
                  },
                  canSwipe: function() {
                    return listCtrl.canSwipeItems();
                  }
                });
      
                if (isDefined($attr.canSwipe)) {
                  $scope.$watch('!!(' + $attr.canSwipe + ')', function(value) {
                    listCtrl.canSwipeItems(value);
                  });
                }
                if (isDefined($attr.showDelete)) {
                  $scope.$watch('!!(' + $attr.showDelete + ')', function(value) {
                    listCtrl.showDelete(value);
                  });
                }
                if (isDefined($attr.showReorder)) {
                  $scope.$watch('!!(' + $attr.showReorder + ')', function(value) {
                    listCtrl.showReorder(value);
                  });
                }
      
                $scope.$watch(function() {
                  return listCtrl.showDelete();
                }, function(isShown, wasShown) {
                  //Only use isShown=false if it was already shown
                  if (!isShown && !wasShown) { return; }
      
                  if (isShown) listCtrl.closeOptionButtons();
                  listCtrl.canSwipeItems(!isShown);
      
                  $element.children().toggleClass('list-left-editing', isShown);
                  $element.toggleClass('disable-pointer-events', isShown);
      
                  var deleteButton = jqLite($element[0].getElementsByClassName('item-delete'));
                  setButtonShown(deleteButton, listCtrl.showDelete);
                });
      
                $scope.$watch(function() {
                  return listCtrl.showReorder();
                }, function(isShown, wasShown) {
                  //Only use isShown=false if it was already shown
                  if (!isShown && !wasShown) { return; }
      
                  if (isShown) listCtrl.closeOptionButtons();
                  listCtrl.canSwipeItems(!isShown);
      
                  $element.children().toggleClass('list-right-editing', isShown);
                  $element.toggleClass('disable-pointer-events', isShown);
      
                  var reorderButton = jqLite($element[0].getElementsByClassName('item-reorder'));
                  setButtonShown(reorderButton, listCtrl.showReorder);
                });
      
                function setButtonShown(el, shown) {
                  shown() && el.addClass('visible') || el.removeClass('active');
                  ionic.requestAnimationFrame(function() {
                    shown() && el.addClass('active') || el.removeClass('visible');
                  });
                }
              }
      
            };
          }
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name menuClose
       * @module ionic
       * @restrict AC
       *
       * @description
       * Closes a side menu which is currently opened.
       *
       * @usage
       * Below is an example of a link within a side menu. Tapping this link would
       * automatically close the currently opened menu.
       *
       * ```html
       * <a menu-close href="#/home" class="item">Home</a>
       * ```
       */
      IonicModule
      .directive('menuClose', ['$ionicViewService', function($ionicViewService) {
        return {
          restrict: 'AC',
          require: '^ionSideMenus',
          link: function($scope, $element, $attr, sideMenuCtrl) {
            $element.bind('click', function(){
              sideMenuCtrl.close();
            });
          }
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name menuToggle
       * @module ionic
       * @restrict AC
       *
       * @description
       * Toggle a side menu on the given side
       *
       * @usage
       * Below is an example of a link within a nav bar. Tapping this link would
       * automatically open the given side menu
       *
       * ```html
       * <ion-view>
       *   <ion-nav-buttons side="left">
       *    <button menu-toggle="left" class="button button-icon icon ion-navicon"></button>
       *   </ion-nav-buttons>
       *  ...
       * </ion-view>
       * ```
       */
      IonicModule
      .directive('menuToggle', ['$ionicViewService', function($ionicViewService) {
        return {
          restrict: 'AC',
          require: '^ionSideMenus',
          link: function($scope, $element, $attr, sideMenuCtrl) {
            var side = $attr.menuToggle || 'left';
            $element.bind('click', function(){
              if(side === 'left') {
                sideMenuCtrl.toggleLeft();
              } else if(side === 'right') {
                sideMenuCtrl.toggleRight();
              }
            });
          }
        };
      }]);
      
      
      /*
       * We don't document the ionModal directive, we instead document
       * the $ionicModal service
       */
      IonicModule
      .directive('ionModal', [function() {
        return {
          restrict: 'E',
          transclude: true,
          replace: true,
          controller: [function(){}],
          template: '<div class="modal-backdrop">' +
                      '<div class="modal-wrapper" ng-transclude></div>' +
                      '</div>'
        };
      }]);
      
      IonicModule
      .directive('ionModalView', function() {
        return {
          restrict: 'E',
          compile: function(element, attr) {
            element.addClass('modal');
          }
        };
      });
      
      /**
       * @ngdoc directive
       * @name ionNavBackButton
       * @module ionic
       * @restrict E
       * @parent ionNavBar
       * @description
       * Creates a back button inside an {@link ionic.directive:ionNavBar}.
       *
       * Will show up when the user is able to go back in the current navigation stack.
       *
       * By default, will go back when clicked.  If you wish for more advanced behavior, see the
       * examples below.
       *
       * @usage
       *
       * With default click action:
       *
       * ```html
       * <ion-nav-bar>
       *   <ion-nav-back-button class="button-clear">
       *     <i class="ion-arrow-left-c"></i> Back
       *   </ion-nav-back-button>
       * </ion-nav-bar>
       * ```
       *
       * With custom click action, using {@link ionic.service:$ionicNavBarDelegate}:
       *
       * ```html
       * <ion-nav-bar ng-controller="MyCtrl">
       *   <ion-nav-back-button class="button-clear"
       *     ng-click="goBack()">
       *     <i class="ion-arrow-left-c"></i> Back
       *   </ion-nav-back-button>
       * </ion-nav-bar>
       * ```
       * ```js
       * function MyCtrl($scope, $ionicNavBarDelegate) {
       *   $scope.goBack = function() {
       *     $ionicNavBarDelegate.back();
       *   };
       * }
       * ```
       *
       * Displaying the previous title on the back button, again using
       * {@link ionic.service:$ionicNavBarDelegate}.
       *
       * ```html
       * <ion-nav-bar ng-controller="MyCtrl">
       *   <ion-nav-back-button class="button-icon">
       *     <i class="icon ion-arrow-left-c"></i>{% raw %}{{getPreviousTitle() || 'Back'}}{% endraw %}
       *   </ion-nav-back-button>
       * </ion-nav-bar>
       * ```
       * ```js
       * function MyCtrl($scope, $ionicNavBarDelegate) {
       *   $scope.getPreviousTitle = function() {
       *     return $ionicNavBarDelegate.getPreviousTitle();
       *   };
       * }
       * ```
       */
      IonicModule
      .directive('ionNavBackButton', [
        '$animate',
        '$rootScope',
        '$sanitize',
        '$ionicNavBarConfig',
        '$ionicNgClick',
      function($animate, $rootScope, $sanitize, $ionicNavBarConfig, $ionicNgClick) {
        var backIsShown = false;
        //If the current viewstate does not allow a back button,
        //always hide it.
        $rootScope.$on('$viewHistory.historyChange', function(e, data) {
          backIsShown = !!data.showBack;
        });
        return {
          restrict: 'E',
          require: '^ionNavBar',
          compile: function(tElement, tAttrs) {
            tElement.addClass('button back-button ng-hide');
      
            var hasIconChild = !!(tElement.html() || '').match(/class=.*?ion-/);
      
            return function($scope, $element, $attr, navBarCtrl) {
      
              // Add a default back button icon based on the nav config, unless one is set
              if (!hasIconChild && $element[0].className.indexOf('ion-') === -1) {
                $element.addClass($ionicNavBarConfig.backButtonIcon);
              }
      
              //Default to ngClick going back, but don't override a custom one
              if (!isDefined($attr.ngClick)) {
                $ionicNgClick($scope, $element, navBarCtrl.back);
              }
      
              //Make sure both that a backButton is allowed in the first place,
              //and that it is shown by the current view.
              $scope.$watch(function() {
                if(isDefined($attr.fromTitle)) {
                  $element[0].innerHTML = '<span class="back-button-title">' + $sanitize($scope.oldTitle) + '</span>';
                }
                return !!(backIsShown && $scope.backButtonShown);
              }, ionic.animationFrameThrottle(function(show) {
                if (show) $animate.removeClass($element, 'ng-hide');
                else $animate.addClass($element, 'ng-hide');
              }));
            };
          }
        };
      }]);
      
      
      IonicModule.constant('$ionicNavBarConfig', {
        transition: 'nav-title-slide-ios7',
        alignTitle: 'center',
        backButtonIcon: 'ion-ios7-arrow-back'
      });
      
      /**
       * @ngdoc directive
       * @name ionNavBar
       * @module ionic
       * @delegate ionic.service:$ionicNavBarDelegate
       * @restrict E
       *
       * @description
       * If we have an {@link ionic.directive:ionNavView} directive, we can also create an
       * `<ion-nav-bar>`, which will create a topbar that updates as the application state changes.
       *
       * We can add a back button by putting an {@link ionic.directive:ionNavBackButton} inside.
       *
       * We can add buttons depending on the currently visible view using
       * {@link ionic.directive:ionNavButtons}.
       *
       * Add an [animation class](/docs/components#animations) to the element via the
       * `animation` attribute to enable animated changing of titles 
       * (recommended: 'nav-title-slide-ios7').
       *
       * Note that the ion-nav-bar element will only work correctly if your content has an
       * ionView around it.
       *
       * @usage
       *
       * ```html
       * <body ng-app="starter">
       *   <!-- The nav bar that will be updated as we navigate -->
       *   <ion-nav-bar class="bar-positive" animation="nav-title-slide-ios7">
       *   </ion-nav-bar>
       *
       *   <!-- where the initial view template will be rendered -->
       *   <ion-nav-view>
       *     <ion-view>
       *       <ion-content>Hello!</ion-content>
       *     </ion-view>
       *   </ion-nav-view>
       * </body>
       * ```
       *
       * @param {string=} delegate-handle The handle used to identify this navBar
       * with {@link ionic.service:$ionicNavBarDelegate}.
       * @param align-title {string=} Where to align the title of the navbar.
       * Available: 'left', 'right', 'center'. Defaults to 'center'.
       * @param {boolean=} no-tap-scroll By default, the navbar will scroll the content
       * to the top when tapped.  Set no-tap-scroll to true to disable this behavior.
       *
       * </table><br/>
       *
       * ### Alternative Usage
       *
       * Alternatively, you may put ion-nav-bar inside of each individual view's ion-view element.
       * This will allow you to have the whole navbar, not just its contents, transition every view change.
       *
       * This is similar to using a header bar inside your ion-view, except it will have all the power of a navbar.
       *
       * If you do this, simply put nav buttons inside the navbar itself; do not use `<ion-nav-buttons>`.
       *
       *
       * ```html
       * <ion-view title="myTitle">
       *   <ion-nav-bar class="bar-positive">
       *     <ion-nav-back-button>
       *       Back
       *     </ion-nav-back-button>
       *     <div class="buttons right-buttons">
       *       <button class="button">
       *         Right Button
       *       </button>
       *     </div>
       *   </ion-nav-bar>
       * </ion-view>
       * ```
       */
      IonicModule
      .directive('ionNavBar', [
        '$ionicViewService',
        '$rootScope',
        '$animate',
        '$compile',
        '$ionicNavBarConfig',
      function($ionicViewService, $rootScope, $animate, $compile, $ionicNavBarConfig) {
      
        return {
          restrict: 'E',
          controller: '$ionicNavBar',
          scope: true,
          compile: function(tElement, tAttrs) {
            //We cannot transclude here because it breaks element.data() inheritance on compile
            tElement
              .addClass('bar bar-header nav-bar')
              .append(
                '<div class="buttons left-buttons"> ' +
                '</div>' +
                '<h1 ng-bind-html="title" class="title"></h1>' +
                '<div class="buttons right-buttons"> ' +
                '</div>'
              );
      
            if (isDefined(tAttrs.animation)) {
              tElement.addClass(tAttrs.animation);
            } else {
              tElement.addClass($ionicNavBarConfig.transition);
            }
      
            return { pre: prelink };
            function prelink($scope, $element, $attr, navBarCtrl) {
              navBarCtrl._headerBarView = new ionic.views.HeaderBar({
                el: $element[0],
                alignTitle: $attr.alignTitle || $ionicNavBarConfig.alignTitle || 'center'
              });
      
              //defaults
              $scope.backButtonShown = false;
              $scope.shouldAnimate = true;
              $scope.isReverse = false;
              $scope.isInvisible = true;
      
              $scope.$on('$destroy', function() {
                $scope.$parent.$hasHeader = false;
              });
      
              $scope.$watch(function() {
                return ($scope.isReverse ? ' reverse' : '') +
                  ($scope.isInvisible ? ' invisible' : '') +
                  (!$scope.shouldAnimate ? ' no-animation' : '');
              }, function(className, oldClassName) {
                $element.removeClass(oldClassName);
                $element.addClass(className);
              });
      
            }
          }
        };
      }]);
      
      
      /**
       * @ngdoc directive
       * @name ionNavButtons
       * @module ionic
       * @restrict E
       * @parent ionNavView
       *
       * @description
       * Use ionNavButtons to set the buttons on your {@link ionic.directive:ionNavBar}
       * from within an {@link ionic.directive:ionView}.
       *
       * Any buttons you declare will be placed onto the navbar's corresponding side,
       * and then destroyed when the user leaves their parent view.
       *
       * @usage
       * ```html
       * <ion-nav-bar>
       * </ion-nav-bar>
       * <ion-nav-view>
       *   <ion-view>
       *     <ion-nav-buttons side="left">
       *       <button class="button" ng-click="doSomething()">
       *         I'm a button on the left of the navbar!
       *       </button>
       *     </ion-nav-buttons>
       *     <ion-content>
       *       Some super content here!
       *     </ion-content>
       *   </ion-view>
       * </ion-nav-view>
       * ```
       *
       * @param {string} side The side to place the buttons on in the parent
       * {@link ionic.directive:ionNavBar}. Available: 'left' or 'right'.
       */
      IonicModule
      .directive('ionNavButtons', ['$compile', '$animate', function($compile, $animate) {
        return {
          require: '^ionNavBar',
          restrict: 'E',
          compile: function($element, $attrs) {
            var content = $element.contents().remove();
            return function($scope, $element, $attrs, navBarCtrl) {
              var navElement = $attrs.side === 'right' ?
                navBarCtrl.rightButtonsElement :
                navBarCtrl.leftButtonsElement;
      
              //Put all of our inside buttons into their own span,
              //so we can remove them all when this element dies -
              //even if the buttons have changed through an ng-repeat or the like,
              //we just remove their div parent and they are gone.
              var buttons = jqLite('<span>').append(content);
      
              //Compile buttons inside content so they have access to everything
              //something inside content does (eg parent ionicScroll)
              $element.append(buttons);
              $compile(buttons)($scope);
      
              //Append buttons to navbar
              ionic.requestAnimationFrame(function() {
                //If the scope is destroyed before raf runs, be sure not to enter
                if (!$scope.$$destroyed) {
                  $animate.enter(buttons, navElement);
                }
              });
      
              //When our ion-nav-buttons container is destroyed,
              //destroy everything in the navbar
              $scope.$on('$destroy', function() {
                $animate.leave(buttons);
              });
      
              // The original element is just a completely empty <ion-nav-buttons> element.
              // make it invisible just to be sure it doesn't change any layout
              $element.css('display', 'none');
            };
          }
        };
      }]);
      
      
      /**
       * @ngdoc directive
       * @name navClear
       * @module ionic
       * @restrict AC
       *
       * @description
       * nav-clear is an attribute directive which should be used with an element that changes
       * the view on click, for example an `<a href>` or a `<button ui-sref>`.
       *
       * nav-clear will cause the given element, when clicked, to disable the next view transition.
       * This directive is useful, for example, for links within a sideMenu.
       *
       * @usage
       * Below is a link in a side menu, with the nav-clear directive added to it.
       * Tapping this link will disable any animations that would normally occur
       * between views.
       *
       * ```html
       * <a nav-clear menu-close href="#/home" class="item">Home</a>
       * ```
       */
      IonicModule
      .directive('navClear', [
        '$ionicViewService',
        '$state',
        '$location',
        '$window',
        '$rootScope',
      function($ionicViewService, $location, $state, $window, $rootScope) {
        $rootScope.$on('$stateChangeError', function() {
          $ionicViewService.nextViewOptions(null);
        });
        return {
          priority: 100,
          restrict: 'AC',
          compile: function($element) {
            return { pre: prelink };
            function prelink($scope, $element, $attrs) {
              var unregisterListener;
              function listenForStateChange() {
                unregisterListener = $scope.$on('$stateChangeStart', function() {
                  $ionicViewService.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                  });
                  unregisterListener();
                });
                $window.setTimeout(unregisterListener, 300);
              }
      
              $element.on('click', listenForStateChange);
            }
          }
        };
      }]);
      
      IonicModule.constant('$ionicNavViewConfig', {
        transition: 'slide-left-right-ios7'
      });
      
      /**
       * @ngdoc directive
       * @name ionNavView
       * @module ionic
       * @restrict E
       * @codepen odqCz
       *
       * @description
       * As a user navigates throughout your app, Ionic is able to keep track of their
       * navigation history. By knowing their history, transitions between views
       * correctly slide either left or right, or no transition at all. An additional
       * benefit to Ionic's navigation system is its ability to manage multiple
       * histories.
       *
       * Ionic uses the AngularUI Router module so app interfaces can be organized
       * into various "states". Like Angular's core $route service, URLs can be used
       * to control the views. However, the AngularUI Router provides a more powerful
       * state manager in that states are bound to named, nested, and parallel views,
       * allowing more than one template to be rendered on the same page.
       * Additionally, each state is not required to be bound to a URL, and data can
       * be pushed to each state which allows much flexibility.
       *
       * The ionNavView directive is used to render templates in your application. Each template
       * is part of a state. States are usually mapped to a url, and are defined programatically
       * using angular-ui-router (see [their docs](https://github.com/angular-ui/ui-router/wiki),
       * and remember to replace ui-view with ion-nav-view in examples).
       *
       * @usage
       * In this example, we will create a navigation view that contains our different states for the app.
       *
       * To do this, in our markup we use ionNavView top level directive. To display a header bar we use
       * the {@link ionic.directive:ionNavBar} directive that updates as we navigate through the
       * navigation stack.
       *
       * You can use any [animation class](/docs/components#animations) on the navView's `animation` attribute
       * to have its pages animate.
       *
       * Recommended for page transitions: 'slide-left-right', 'slide-left-right-ios7', 'slide-in-up'.
       *
       * ```html
       * <ion-nav-bar></ion-nav-bar>
       * <ion-nav-view animation="slide-left-right">
       *   <!-- Center content -->
       * </ion-nav-view>
       * ```
       *
       * Next, we need to setup our states that will be rendered.
       *
       * ```js
       * var app = angular.module('myApp', ['ionic']);
       * app.config(function($stateProvider) {
       *   $stateProvider
       *   .state('index', {
       *     url: '/',
       *     templateUrl: 'home.html'
       *   })
       *   .state('music', {
       *     url: '/music',
       *     templateUrl: 'music.html'
       *   });
       * });
       * ```
       * Then on app start, $stateProvider will look at the url, see it matches the index state,
       * and then try to load home.html into the `<ion-nav-view>`.
       *
       * Pages are loaded by the URLs given. One simple way to create templates in Angular is to put
       * them directly into your HTML file and use the `<script type="text/ng-template">` syntax.
       * So here is one way to put home.html into our app:
       *
       * ```html
       * <script id="home" type="text/ng-template">
       *   <!-- The title of the ion-view will be shown on the navbar -->
       *   <ion-view title="'Home'">
       *     <ion-content ng-controller="HomeCtrl">
       *       <!-- The content of the page -->
       *       <a href="#/music">Go to music page!</a>
       *     </ion-content>
       *   </ion-view>
       * </script>
       * ```
       *
       * This is good to do because the template will be cached for very fast loading, instead of
       * having to fetch them from the network.
       *
       * Please visit [AngularUI Router's docs](https://github.com/angular-ui/ui-router/wiki) for
       * more info. Below is a great video by the AngularUI Router guys that may help to explain
       * how it all works:
       *
       * <iframe width="560" height="315" src="//www.youtube.com/embed/dqJRoh8MnBo"
       * frameborder="0" allowfullscreen></iframe>
       *
       * @param {string=} name A view name. The name should be unique amongst the other views in the
       * same state. You can have views of the same name that live in different states. For more
       * information, see ui-router's [ui-view documentation](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-view).
       */
      IonicModule
      .directive('ionNavView', [
        '$ionicViewService',
        '$state',
        '$compile',
        '$controller',
        '$animate',
      function( $ionicViewService,   $state,   $compile,   $controller,   $animate) {
        // IONIC's fork of Angular UI Router, v0.2.7
        // the navView handles registering views in the history, which animation to use, and which
        var viewIsUpdating = false;
      
        var directive = {
          restrict: 'E',
          terminal: true,
          priority: 2000,
          transclude: true,
          controller: function(){},
          compile: function (element, attr, transclude) {
            return function(scope, element, attr, navViewCtrl) {
              var viewScope, viewLocals,
                name = attr[directive.name] || attr.name || '',
                onloadExp = attr.onload || '',
                initialView = transclude(scope);
      
              // Put back the compiled initial view
              element.append(initialView);
      
              // Find the details of the parent view directive (if any) and use it
              // to derive our own qualified view name, then hang our own details
              // off the DOM so child directives can find it.
              var parent = element.parent().inheritedData('$uiView');
              if (name.indexOf('@') < 0) name  = name + '@' + ((parent && parent.state) ? parent.state.name : '');
              var view = { name: name, state: null };
              element.data('$uiView', view);
      
              var eventHook = function() {
                if (viewIsUpdating) return;
                viewIsUpdating = true;
      
                try { updateView(true); } catch (e) {
                  viewIsUpdating = false;
                  throw e;
                }
                viewIsUpdating = false;
              };
      
              scope.$on('$stateChangeSuccess', eventHook);
              // scope.$on('$viewContentLoading', eventHook);
              updateView(false);
      
              function updateView(doAnimate) {
                //===false because $animate.enabled() is a noop without angular-animate included
                if ($animate.enabled() === false) {
                  doAnimate = false;
                }
      
                var locals = $state.$current && $state.$current.locals[name];
                if (locals === viewLocals) return; // nothing to do
                var renderer = $ionicViewService.getRenderer(element, attr, scope);
      
                // Destroy previous view scope
                if (viewScope) {
                  viewScope.$destroy();
                  viewScope = null;
                }
      
                if (!locals) {
                  viewLocals = null;
                  view.state = null;
      
                  // Restore the initial view
                  return element.append(initialView);
                }
      
                var newElement = jqLite('<div></div>').html(locals.$template).contents();
                var viewRegisterData = renderer().register(newElement);
      
                // Remove existing content
                renderer(doAnimate).leave();
      
                viewLocals = locals;
                view.state = locals.$$state;
      
                renderer(doAnimate).enter(newElement);
      
                var link = $compile(newElement);
                viewScope = scope.$new();
      
                viewScope.$navDirection = viewRegisterData.navDirection;
      
                if (locals.$$controller) {
                  locals.$scope = viewScope;
                  var controller = $controller(locals.$$controller, locals);
                  element.children().data('$ngControllerController', controller);
                }
                link(viewScope);
      
                var viewHistoryData = $ionicViewService._getViewById(viewRegisterData.viewId) || {};
                viewScope.$broadcast('$viewContentLoaded', viewHistoryData);
      
                if (onloadExp) viewScope.$eval(onloadExp);
      
                newElement = null;
              }
            };
          }
        };
        return directive;
      }]);
      
      
      IonicModule
      
      .config(['$provide', function($provide) {
        $provide.decorator('ngClickDirective', ['$delegate', function($delegate) {
          // drop the default ngClick directive
          $delegate.shift();
          return $delegate;
        }]);
      }])
      
      /**
       * @private
       */
      .factory('$ionicNgClick', ['$parse', function($parse) {
        return function(scope, element, clickExpr) {
          var clickHandler = angular.isFunction(clickExpr) ?
            clickExpr :
            $parse(clickExpr);
      
          element.on('click', function(event) {
            scope.$apply(function() {
              clickHandler(scope, {$event: (event)});
            });
          });
      
          // Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
          // something else nearby.
          element.onclick = function(event) { };
        };
      }])
      
      .directive('ngClick', ['$ionicNgClick', function($ionicNgClick) {
        return function(scope, element, attr) {
          $ionicNgClick(scope, element, attr.ngClick);
        };
      }])
      
      .directive('ionStopEvent', function () {
        return {
          restrict: 'A',
          link: function (scope, element, attr) {
            element.bind(attr.ionStopEvent, eventStopPropagation);
          }
        };
      });
      function eventStopPropagation(e) {
        e.stopPropagation();
      }
      
      
      /**
       * @ngdoc directive
       * @name ionPane
       * @module ionic
       * @restrict E
       *
       * @description A simple container that fits content, with no side effects.  Adds the 'pane' class to the element.
       */
      IonicModule
      .directive('ionPane', function() {
        return {
          restrict: 'E',
          link: function(scope, element, attr) {
            element.addClass('pane');
          }
        };
      });
      
      /*
       * We don't document the ionPopover directive, we instead document
       * the $ionicPopover service
       */
      IonicModule
      .directive('ionPopover', [function() {
        return {
          restrict: 'E',
          transclude: true,
          replace: true,
          controller: [function(){}],
          template: '<div class="popover-backdrop">' +
                      '<div class="popover-wrapper" ng-transclude></div>' +
                    '</div>'
        };
      }]);
      
      IonicModule
      .directive('ionPopoverView', function() {
        return {
          restrict: 'E',
          compile: function(element) {
            element.append( angular.element('<div class="popover-arrow"></div>') );
            element.addClass('popover');
          }
        };
      });
      
      /**
       * @ngdoc directive
       * @name ionRadio
       * @module ionic
       * @restrict E
       * @codepen saoBG
       * @description
       * The radio directive is no different than the HTML radio input, except it's styled differently.
       *
       * Radio behaves like any [AngularJS radio](http://docs.angularjs.org/api/ng/input/input[radio]).
       *
       * @usage
       * ```html
       * <ion-radio ng-model="choice" ng-value="'A'">Choose A</ion-radio>
       * <ion-radio ng-model="choice" ng-value="'B'">Choose B</ion-radio>
       * <ion-radio ng-model="choice" ng-value="'C'">Choose C</ion-radio>
       * ```
       * 
       * @param {string=} name The name of the radio input.
       * @param {expression=} value The value of the radio input.
       * @param {boolean=} disabled The state of the radio input.
       * @param {string=} icon The icon to use when the radio input is selected.
       * @param {expression=} ng-value Angular equivalent of the value attribute.
       * @param {expression=} ng-model The angular model for the radio input.
       * @param {boolean=} ng-disabled Angular equivalent of the disabled attribute.
       * @param {expression=} ng-change Triggers given expression when radio input's model changes
       */
      IonicModule
      .directive('ionRadio', function() {
        return {
          restrict: 'E',
          replace: true,
          require: '?ngModel',
          transclude: true,
          template:
            '<label class="item item-radio">' +
              '<input type="radio" name="radio-group">' +
              '<div class="item-content disable-pointer-events" ng-transclude></div>' +
              '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>' +
            '</label>',
      
          compile: function(element, attr) {
            if(attr.icon) element.children().eq(2).removeClass('ion-checkmark').addClass(attr.icon);
            var input = element.find('input');
            forEach({
                'name': attr.name,
                'value': attr.value,
                'disabled': attr.disabled,
                'ng-value': attr.ngValue,
                'ng-model': attr.ngModel,
                'ng-disabled': attr.ngDisabled,
                'ng-change': attr.ngChange
            }, function(value, name) {
              if (isDefined(value)) {
                  input.attr(name, value);
                }
            });
      
            return function(scope, element, attr) {
              scope.getValue = function() {
                return scope.ngValue || attr.value;
              };
            };
          }
        };
      });
      
      
      /**
       * @ngdoc directive
       * @name ionRefresher
       * @module ionic
       * @restrict E
       * @parent ionic.directive:ionContent, ionic.directive:ionScroll
       * @description
       * Allows you to add pull-to-refresh to a scrollView.
       *
       * Place it as the first child of your {@link ionic.directive:ionContent} or
       * {@link ionic.directive:ionScroll} element.
       *
       * When refreshing is complete, $broadcast the 'scroll.refreshComplete' event
       * from your controller.
       *
       * @usage
       *
       * ```html
       * <ion-content ng-controller="MyController">
       *   <ion-refresher
       *     pulling-text="Pull to refresh..."
       *     on-refresh="doRefresh()">
       *   </ion-refresher>
       *   <ion-list>
       *     <ion-item ng-repeat="item in items"></ion-item>
       *   </ion-list>
       * </ion-content>
       * ```
       * ```js
       * angular.module('testApp', ['ionic'])
       * .controller('MyController', function($scope, $http) {
       *   $scope.items = [1,2,3];
       *   $scope.doRefresh = function() {
       *     $http.get('/new-items')
       *      .success(function(newItems) {
       *        $scope.items = newItems;
       *      })
       *      .finally(function() {
       *        // Stop the ion-refresher from spinning
       *        $scope.$broadcast('scroll.refreshComplete');
       *      });
       *   };
       * });
       * ```
       *
       * @param {expression=} on-refresh Called when the user pulls down enough and lets go
       * of the refresher.
       * @param {expression=} on-pulling Called when the user starts to pull down
       * on the refresher.
       * @param {string=} pulling-icon The icon to display while the user is pulling down.
       * Default: 'ion-arrow-down-c'.
       * @param {string=} pulling-text The text to display while the user is pulling down.
       * @param {string=} refreshing-icon The icon to display after user lets go of the
       * refresher.
       * @param {string=} refreshing-text The text to display after the user lets go of
       * the refresher.
       * @param {boolean=} disable-pulling-rotation Disables the rotation animation of the pulling
       * icon when it reaches its activated threshold. To be used with a custom `pulling-icon`.
       *
       */
      IonicModule
      .directive('ionRefresher', ['$ionicBind', function($ionicBind) {
        return {
          restrict: 'E',
          replace: true,
          require: '^$ionicScroll',
          template:
          '<div class="scroll-refresher" collection-repeat-ignore>' +
            '<div class="ionic-refresher-content" ' +
            'ng-class="{\'ionic-refresher-with-text\': pullingText || refreshingText}">' +
              '<div class="icon-pulling" ng-class="{\'pulling-rotation-disabled\':disablePullingRotation}">' +
                '<i class="icon {{pullingIcon}}"></i>' +
              '</div>' +
              '<div class="text-pulling" ng-bind-html="pullingText"></div>' +
              '<i class="icon {{refreshingIcon}} icon-refreshing"></i>' +
              '<div class="text-refreshing" ng-bind-html="refreshingText"></div>' +
            '</div>' +
          '</div>',
          compile: function($element, $attrs) {
            if (angular.isUndefined($attrs.pullingIcon)) {
              $attrs.$set('pullingIcon', 'ion-ios7-arrow-down');
            }
            if (angular.isUndefined($attrs.refreshingIcon)) {
              $attrs.$set('refreshingIcon', 'ion-loading-d');
            }
            return function($scope, $element, $attrs, scrollCtrl) {
              $ionicBind($scope, $attrs, {
                pullingIcon: '@',
                pullingText: '@',
                refreshingIcon: '@',
                refreshingText: '@',
                disablePullingRotation: '@',
                $onRefresh: '&onRefresh',
                $onPulling: '&onPulling'
              });
      
              scrollCtrl._setRefresher($scope, $element[0]);
              $scope.$on('scroll.refreshComplete', function() {
                $scope.$evalAsync(function() {
                  scrollCtrl.scrollView.finishPullToRefresh();
                });
              });
            };
          }
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name ionScroll
       * @module ionic
       * @delegate ionic.service:$ionicScrollDelegate
       * @codepen mwFuh
       * @restrict E
       *
       * @description
       * Creates a scrollable container for all content inside.
       *
       * @usage
       *
       * Basic usage:
       *
       * ```html
       * <ion-scroll zooming="true" direction="xy" style="width: 500px; height: 500px">
       *   <div style="width: 5000px; height: 5000px; background: url('https://upload.wikimedia.org/wikipedia/commons/a/ad/Europe_geological_map-en.jpg') repeat"></div>
       *  </ion-scroll>
       * ```
       *
       * Note that it's important to set the height of the scroll box as well as the height of the inner
       * content to enable scrolling. This makes it possible to have full control over scrollable areas.
       *
       * If you'd just like to have a center content scrolling area, use {@link ionic.directive:ionContent} instead.
       *
       * @param {string=} delegate-handle The handle used to identify this scrollView
       * with {@link ionic.service:$ionicScrollDelegate}.
       * @param {string=} direction Which way to scroll. 'x' or 'y' or 'xy'. Default 'y'.
       * @param {boolean=} locking Whether to lock scrolling in one direction at a time. Useful to set to false when zoomed in or scrolling in two directions. Default true.
       * @param {boolean=} paging Whether to scroll with paging.
       * @param {expression=} on-refresh Called on pull-to-refresh, triggered by an {@link ionic.directive:ionRefresher}.
       * @param {expression=} on-scroll Called whenever the user scrolls.
       * @param {boolean=} scrollbar-x Whether to show the horizontal scrollbar. Default true.
       * @param {boolean=} scrollbar-y Whether to show the vertical scrollbar. Default true.
       * @param {boolean=} zooming Whether to support pinch-to-zoom
       * @param {integer=} min-zoom The smallest zoom amount allowed (default is 0.5)
       * @param {integer=} max-zoom The largest zoom amount allowed (default is 3)
       * @param {boolean=} has-bouncing Whether to allow scrolling to bounce past the edges
       * of the content.  Defaults to true on iOS, false on Android.
       */
      IonicModule
      .directive('ionScroll', [
        '$timeout',
        '$controller',
        '$ionicBind',
      function($timeout, $controller, $ionicBind) {
        return {
          restrict: 'E',
          scope: true,
          controller: function() {},
          compile: function(element, attr) {
            element.addClass('scroll-view ionic-scroll');
      
            //We cannot transclude here because it breaks element.data() inheritance on compile
            var innerElement = jqLite('<div class="scroll"></div>');
            innerElement.append(element.contents());
            element.append(innerElement);
      
            return { pre: prelink };
            function prelink($scope, $element, $attr) {
              var scrollView, scrollCtrl;
      
              $ionicBind($scope, $attr, {
                direction: '@',
                paging: '@',
                $onScroll: '&onScroll',
                scroll: '@',
                scrollbarX: '@',
                scrollbarY: '@',
                zooming: '@',
                minZoom: '@',
                maxZoom: '@'
              });
              $scope.direction = $scope.direction || 'y';
      
              if (angular.isDefined($attr.padding)) {
                $scope.$watch($attr.padding, function(newVal) {
                  innerElement.toggleClass('padding', !!newVal);
                });
              }
              if($scope.$eval($scope.paging) === true) {
                innerElement.addClass('scroll-paging');
              }
      
              if(!$scope.direction) { $scope.direction = 'y'; }
              var isPaging = $scope.$eval($scope.paging) === true;
      
              var scrollViewOptions= {
                el: $element[0],
                delegateHandle: $attr.delegateHandle,
                locking: ($attr.locking || 'true') === 'true',
                bouncing: $scope.$eval($attr.hasBouncing),
                paging: isPaging,
                scrollbarX: $scope.$eval($scope.scrollbarX) !== false,
                scrollbarY: $scope.$eval($scope.scrollbarY) !== false,
                scrollingX: $scope.direction.indexOf('x') >= 0,
                scrollingY: $scope.direction.indexOf('y') >= 0,
                zooming: $scope.$eval($scope.zooming) === true,
                maxZoom: $scope.$eval($scope.maxZoom) || 3,
                minZoom: $scope.$eval($scope.minZoom) || 0.5
              };
              if (isPaging) {
                scrollViewOptions.speedMultiplier = 0.8;
                scrollViewOptions.bouncing = false;
              }
      
              scrollCtrl = $controller('$ionicScroll', {
                $scope: $scope,
                scrollViewOptions: scrollViewOptions
              });
              scrollView = $scope.$parent.scrollView = scrollCtrl.scrollView;
            }
          }
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name ionSideMenu
       * @module ionic
       * @restrict E
       * @parent ionic.directive:ionSideMenus
       *
       * @description
       * A container for a side menu, sibling to an {@link ionic.directive:ionSideMenuContent} directive.
       *
       * @usage
       * ```html
       * <ion-side-menu
       *   side="left"
       *   width="myWidthValue + 20"
       *   is-enabled="shouldLeftSideMenuBeEnabled()">
       * </ion-side-menu>
       * ```
       * For a complete side menu example, see the
       * {@link ionic.directive:ionSideMenus} documentation.
       *
       * @param {string} side Which side the side menu is currently on.  Allowed values: 'left' or 'right'.
       * @param {boolean=} is-enabled Whether this side menu is enabled.
       * @param {number=} width How many pixels wide the side menu should be.  Defaults to 275.
       */
      IonicModule
      .directive('ionSideMenu', function() {
        return {
          restrict: 'E',
          require: '^ionSideMenus',
          scope: true,
          compile: function(element, attr) {
            angular.isUndefined(attr.isEnabled) && attr.$set('isEnabled', 'true');
            angular.isUndefined(attr.width) && attr.$set('width', '275');
      
            element.addClass('menu menu-' + attr.side);
      
            return function($scope, $element, $attr, sideMenuCtrl) {
              $scope.side = $attr.side || 'left';
      
              var sideMenu = sideMenuCtrl[$scope.side] = new ionic.views.SideMenu({
                width: attr.width,
                el: $element[0],
                isEnabled: true
              });
      
              $scope.$watch($attr.width, function(val) {
                var numberVal = +val;
                if (numberVal && numberVal == val) {
                  sideMenu.setWidth(+val);
                }
              });
              $scope.$watch($attr.isEnabled, function(val) {
                sideMenu.setIsEnabled(!!val);
              });
            };
          }
        };
      });
      
      
      /**
       * @ngdoc directive
       * @name ionSideMenuContent
       * @module ionic
       * @restrict E
       * @parent ionic.directive:ionSideMenus
       *
       * @description
       * A container for the main visible content, sibling to one or more
       * {@link ionic.directive:ionSideMenu} directives.
       *
       * @usage
       * ```html
       * <ion-side-menu-content
       *   edge-drag-threshold="true"
       *   drag-content="true">
       * </ion-side-menu-content>
       * ```
       * For a complete side menu example, see the
       * {@link ionic.directive:ionSideMenus} documentation.
       *
       * @param {boolean=} drag-content Whether the content can be dragged. Default true.
       * @param {boolean|number=} edge-drag-threshold Whether the content drag can only start if it is below a certain threshold distance from the edge of the screen.  Default false. Accepts three types of values:
         *  - If a non-zero number is given, that many pixels is used as the maximum allowed distance from the edge that starts dragging the side menu.
         *  - If true is given, the default number of pixels (25) is used as the maximum allowed distance.
         *  - If false or 0 is given, the edge drag threshold is disabled, and dragging from anywhere on the content is allowed.
       *
       */
      IonicModule
      .directive('ionSideMenuContent', [
        '$timeout',
        '$ionicGesture',
        '$window',
      function($timeout, $ionicGesture, $window) {
      
        return {
          restrict: 'EA', //DEPRECATED 'A'
          require: '^ionSideMenus',
          scope: true,
          compile: function(element, attr) {
            return { pre: prelink };
            function prelink($scope, $element, $attr, sideMenuCtrl) {
              var startCoord = null;
              var primaryScrollAxis = null;
      
              $element.addClass('menu-content pane');
      
              if (isDefined(attr.dragContent)) {
                $scope.$watch(attr.dragContent, function(value) {
                  sideMenuCtrl.canDragContent(value);
                });
              } else {
                sideMenuCtrl.canDragContent(true);
              }
      
              if (isDefined(attr.edgeDragThreshold)) {
                $scope.$watch(attr.edgeDragThreshold, function(value) {
                  sideMenuCtrl.edgeDragThreshold(value);
                });
              }
      
              // Listen for taps on the content to close the menu
              function onContentTap(gestureEvt) {
                if(sideMenuCtrl.getOpenAmount() !== 0) {
                  sideMenuCtrl.close();
                  gestureEvt.gesture.srcEvent.preventDefault();
                  startCoord = null;
                  primaryScrollAxis = null;
                } else if(!startCoord) {
                  startCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
                }
              }
      
              function onDragX(e) {
                if(!sideMenuCtrl.isDraggableTarget(e)) return;
      
                if( getPrimaryScrollAxis(e) == 'x') {
                  sideMenuCtrl._handleDrag(e);
                  e.gesture.srcEvent.preventDefault();
                }
              }
      
              function onDragY(e) {
                if( getPrimaryScrollAxis(e) == 'x' ) {
                  e.gesture.srcEvent.preventDefault();
                }
              }
      
              function onDragRelease(e) {
                sideMenuCtrl._endDrag(e);
                startCoord = null;
                primaryScrollAxis = null;
              }
      
              function getPrimaryScrollAxis(gestureEvt) {
                // gets whether the user is primarily scrolling on the X or Y
                // If a majority of the drag has been on the Y since the start of
                // the drag, but the X has moved a little bit, it's still a Y drag
      
                if(primaryScrollAxis) {
                  // we already figured out which way they're scrolling
                  return primaryScrollAxis;
                }
      
                if(gestureEvt && gestureEvt.gesture) {
      
                  if(!startCoord) {
                    // get the starting point
                    startCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
      
                  } else {
                    // we already have a starting point, figure out which direction they're going
                    var endCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
      
                    var xDistance = Math.abs(endCoord.x - startCoord.x);
                    var yDistance = Math.abs(endCoord.y - startCoord.y);
      
                    var scrollAxis = ( xDistance < yDistance ? 'y' : 'x' );
      
                    if( Math.max(xDistance, yDistance) > 30 ) {
                      // ok, we pretty much know which way they're going
                      // let's lock it in
                      primaryScrollAxis = scrollAxis;
                    }
      
                    return scrollAxis;
                  }
                }
                return 'x';
              }
      
              var content = {
                element: element[0],
                onDrag: function(e) {},
                endDrag: function(e) {},
                getTranslateX: function() {
                  return $scope.sideMenuContentTranslateX || 0;
                },
                setTranslateX: ionic.animationFrameThrottle(function(amount) {
                  var xTransform = content.offsetX + amount;
                  $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + xTransform + 'px,0,0)';
                  $timeout(function() {
                    $scope.sideMenuContentTranslateX = amount;
                  });
                }),
                setMarginLeft: ionic.animationFrameThrottle(function(amount) {
                  if(amount) {
                    amount = parseInt(amount, 10);
                    $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + amount + 'px,0,0)';
                    $element[0].style.width = ($window.innerWidth - amount) + 'px';
                    content.offsetX = amount;
                  } else {
                    $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
                    $element[0].style.width = '';
                    content.offsetX = 0;
                  }
                }),
                enableAnimation: function() {
                  $scope.animationEnabled = true;
                  $element[0].classList.add('menu-animated');
                },
                disableAnimation: function() {
                  $scope.animationEnabled = false;
                  $element[0].classList.remove('menu-animated');
                },
                offsetX: 0
              };
      
              sideMenuCtrl.setContent(content);
      
              // add gesture handlers
              var gestureOpts = { stop_browser_behavior: false };
              var contentTapGesture = $ionicGesture.on('tap', onContentTap, $element, gestureOpts);
              var dragRightGesture = $ionicGesture.on('dragright', onDragX, $element, gestureOpts);
              var dragLeftGesture = $ionicGesture.on('dragleft', onDragX, $element, gestureOpts);
              var dragUpGesture = $ionicGesture.on('dragup', onDragY, $element, gestureOpts);
              var dragDownGesture = $ionicGesture.on('dragdown', onDragY, $element, gestureOpts);
              var releaseGesture = $ionicGesture.on('release', onDragRelease, $element, gestureOpts);
      
              // Cleanup
              $scope.$on('$destroy', function() {
                $ionicGesture.off(dragLeftGesture, 'dragleft', onDragX);
                $ionicGesture.off(dragRightGesture, 'dragright', onDragX);
                $ionicGesture.off(dragUpGesture, 'dragup', onDragY);
                $ionicGesture.off(dragDownGesture, 'dragdown', onDragY);
                $ionicGesture.off(releaseGesture, 'release', onDragRelease);
                $ionicGesture.off(contentTapGesture, 'tap', onContentTap);
              });
            }
          }
        };
      }]);
      
      IonicModule
      
      /**
       * @ngdoc directive
       * @name ionSideMenus
       * @module ionic
       * @delegate ionic.service:$ionicSideMenuDelegate
       * @restrict E
       *
       * @description
       * A container element for side menu(s) and the main content. Allows the left
       * and/or right side menu to be toggled by dragging the main content area side
       * to side.
       *
       * To automatically close an opened menu you can add the {@link ionic.directive:menuClose}
       * attribute directive. Including the `menu-close` attribute is usually added to
       * links and buttons within `ion-side-menu` content, so that when the element is
       * clicked then the opened side menu will automatically close.
       *
       * By default, side menus are hidden underneath its side menu content, and can be opened by
       * either swiping the content left or right, or toggling a button to show the side menu. However,
       * by adding the {@link ionic.directive:exposeAsideWhen} attribute directive to an
       * {@link ionic.directive:ionSideMenu} element directive, a side menu can be given instructions
       * on "when" the menu should be exposed (always viewable).
       *
       * ![Side Menu](http://ionicframework.com.s3.amazonaws.com/docs/controllers/sidemenu.gif)
       *
       * For more information on side menus, check out:
       *
       * - {@link ionic.directive:ionSideMenuContent}
       * - {@link ionic.directive:ionSideMenu}
       * - {@link ionic.directive:menuClose}
       * - {@link ionic.directive:exposeAsideWhen}
       *
       * @usage
       * To use side menus, add an `<ion-side-menus>` parent element,
       * an `<ion-side-menu-content>` for the center content,
       * and one or more `<ion-side-menu>` directives.
       *
       * ```html
       * <ion-side-menus>
       *   <!-- Center content -->
       *   <ion-side-menu-content ng-controller="ContentController">
       *   </ion-side-menu-content>
       *
       *   <!-- Left menu -->
       *   <ion-side-menu side="left">
       *   </ion-side-menu>
       *
       *   <!-- Right menu -->
       *   <ion-side-menu side="right">
       *   </ion-side-menu>
       * </ion-side-menus>
       * ```
       * ```js
       * function ContentController($scope, $ionicSideMenuDelegate) {
       *   $scope.toggleLeft = function() {
       *     $ionicSideMenuDelegate.toggleLeft();
       *   };
       * }
       * ```
       *
       * @param {string=} delegate-handle The handle used to identify this side menu
       * with {@link ionic.service:$ionicSideMenuDelegate}.
       *
       */
      .directive('ionSideMenus', ['$ionicBody', function($ionicBody) {
        return {
          restrict: 'ECA',
          controller: '$ionicSideMenus',
          compile: function(element, attr) {
            attr.$set('class', (attr['class'] || '') + ' view');
      
            return { pre: prelink };
            function prelink($scope) {
      
              $scope.$on('$ionicExposeAside', function(evt, isAsideExposed){
                if(!$scope.$exposeAside) $scope.$exposeAside = {};
                $scope.$exposeAside.active = isAsideExposed;
                $ionicBody.enableClass(isAsideExposed, 'aside-open');
              });
      
              $scope.$on('$destroy', function(){
                $ionicBody.removeClass('menu-open', 'aside-open');
              });
      
            }
          }
        };
      }]);
      
      
      /**
       * @ngdoc directive
       * @name ionSlideBox
       * @module ionic
       * @delegate ionic.service:$ionicSlideBoxDelegate
       * @restrict E
       * @description
       * The Slide Box is a multi-page container where each page can be swiped or dragged between:
       *
       * ![SlideBox](http://ionicframework.com.s3.amazonaws.com/docs/controllers/slideBox.gif)
       *
       * @usage
       * ```html
       * <ion-slide-box on-slide-changed="slideHasChanged($index)">
       *   <ion-slide>
       *     <div class="box blue"><h1>BLUE</h1></div>
       *   </ion-slide>
       *   <ion-slide>
       *     <div class="box yellow"><h1>YELLOW</h1></div>
       *   </ion-slide>
       *   <ion-slide>
       *     <div class="box pink"><h1>PINK</h1></div>
       *   </ion-slide>
       * </ion-slide-box>
       * ```
       *
       * @param {string=} delegate-handle The handle used to identify this slideBox
       * with {@link ionic.service:$ionicSlideBoxDelegate}.
       * @param {boolean=} does-continue Whether the slide box should loop.
       * @param {boolean=} auto-play Whether the slide box should automatically slide. Default true if does-continue is true.
       * @param {number=} slide-interval How many milliseconds to wait to change slides (if does-continue is true). Defaults to 4000.
       * @param {boolean=} show-pager Whether a pager should be shown for this slide box.
       * @param {expression=} pager-click Expression to call when a pager is clicked (if show-pager is true). Is passed the 'index' variable.
       * @param {expression=} on-slide-changed Expression called whenever the slide is changed.  Is passed an '$index' variable.
       * @param {expression=} active-slide Model to bind the current slide to.
       */
      IonicModule
      .directive('ionSlideBox', [
        '$timeout',
        '$compile',
        '$ionicSlideBoxDelegate',
      function($timeout, $compile, $ionicSlideBoxDelegate) {
        return {
          restrict: 'E',
          replace: true,
          transclude: true,
          scope: {
            autoPlay: '=',
            doesContinue: '@',
            slideInterval: '@',
            showPager: '@',
            pagerClick: '&',
            disableScroll: '@',
            onSlideChanged: '&',
            activeSlide: '=?'
          },
          controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
            var _this = this;
      
            var continuous = $scope.$eval($scope.doesContinue) === true;
            var shouldAutoPlay = isDefined($attrs.autoPlay) ? !!$scope.autoPlay : false;
            var slideInterval = shouldAutoPlay ? $scope.$eval($scope.slideInterval) || 4000 : 0;
      
            var slider = new ionic.views.Slider({
              el: $element[0],
              auto: slideInterval,
              continuous: continuous,
              startSlide: $scope.activeSlide,
              slidesChanged: function() {
                $scope.currentSlide = slider.currentIndex();
      
                // Try to trigger a digest
                $timeout(function() {});
              },
              callback: function(slideIndex) {
                $scope.currentSlide = slideIndex;
                $scope.onSlideChanged({ index: $scope.currentSlide, $index: $scope.currentSlide});
                $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
                $scope.activeSlide = slideIndex;
                // Try to trigger a digest
                $timeout(function() {});
              }
            });
      
            slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);
      
            $scope.$watch('activeSlide', function(nv) {
              if(angular.isDefined(nv)){
                slider.slide(nv);
              }
            });
      
            $scope.$on('slideBox.nextSlide', function() {
              slider.next();
            });
      
            $scope.$on('slideBox.prevSlide', function() {
              slider.prev();
            });
      
            $scope.$on('slideBox.setSlide', function(e, index) {
              slider.slide(index);
            });
      
            //Exposed for testing
            this.__slider = slider;
      
            var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(slider, $attrs.delegateHandle);
            $scope.$on('$destroy', deregisterInstance);
      
            this.slidesCount = function() {
              return slider.slidesCount();
            };
      
            this.onPagerClick = function(index) {
              void 0;
              $scope.pagerClick({index: index});
            };
      
            $timeout(function() {
              slider.load();
            });
          }],
          template: '<div class="slider">' +
            '<div class="slider-slides" ng-transclude>' +
            '</div>' +
          '</div>',
      
          link: function($scope, $element, $attr, slideBoxCtrl) {
            // If the pager should show, append it to the slide box
            if($scope.$eval($scope.showPager) !== false) {
              var childScope = $scope.$new();
              var pager = jqLite('<ion-pager></ion-pager>');
              $element.append(pager);
              $compile(pager)(childScope);
            }
          }
        };
      }])
      .directive('ionSlide', function() {
        return {
          restrict: 'E',
          require: '^ionSlideBox',
          compile: function(element, attr) {
            element.addClass('slider-slide');
            return function($scope, $element, $attr) {
            };
          },
        };
      })
      
      .directive('ionPager', function() {
        return {
          restrict: 'E',
          replace: true,
          require: '^ionSlideBox',
          template: '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>',
          link: function($scope, $element, $attr, slideBox) {
            var selectPage = function(index) {
              var children = $element[0].children;
              var length = children.length;
              for(var i = 0; i < length; i++) {
                if(i == index) {
                  children[i].classList.add('active');
                } else {
                  children[i].classList.remove('active');
                }
              }
            };
      
            $scope.pagerClick = function(index) {
              slideBox.onPagerClick(index);
            };
      
            $scope.numSlides = function() {
              return new Array(slideBox.slidesCount());
            };
      
            $scope.$watch('currentSlide', function(v) {
              selectPage(v);
            });
          }
        };
      
      });
      
      IonicModule.constant('$ionicTabConfig', {
        type: ''
      });
      
      /**
       * @ngdoc directive
       * @name ionTab
       * @module ionic
       * @restrict E
       * @parent ionic.directive:ionTabs
       *
       * @description
       * Contains a tab's content.  The content only exists while the given tab is selected.
       *
       * Each ionTab has its own view history.
       *
       * @usage
       * ```html
       * <ion-tab
       *   title="Tab!"
       *   icon="my-icon"
       *   href="#/tab/tab-link"
       *   on-select="onTabSelected()"
       *   on-deselect="onTabDeselected()">
       * </ion-tab>
       * ```
       * For a complete, working tab bar example, see the {@link ionic.directive:ionTabs} documentation.
       *
       * @param {string} title The title of the tab.
       * @param {string=} href The link that this tab will navigate to when tapped.
       * @param {string=} icon The icon of the tab. If given, this will become the default for icon-on and icon-off.
       * @param {string=} icon-on The icon of the tab while it is selected.
       * @param {string=} icon-off The icon of the tab while it is not selected.
       * @param {expression=} badge The badge to put on this tab (usually a number).
       * @param {expression=} badge-style The style of badge to put on this tab (eg tabs-positive).
       * @param {expression=} on-select Called when this tab is selected.
       * @param {expression=} on-deselect Called when this tab is deselected.
       * @param {expression=} ng-click By default, the tab will be selected on click. If ngClick is set, it will not.  You can explicitly switch tabs using {@link ionic.service:$ionicTabsDelegate#select $ionicTabsDelegate.select()}.
       */
      IonicModule
      .directive('ionTab', [
        '$rootScope',
        '$animate',
        '$ionicBind',
        '$compile',
      function($rootScope, $animate, $ionicBind, $compile) {
      
        //Returns ' key="value"' if value exists
        function attrStr(k,v) {
          return angular.isDefined(v) ? ' ' + k + '="' + v + '"' : '';
        }
        return {
          restrict: 'E',
          require: ['^ionTabs', 'ionTab'],
          replace: true,
          controller: '$ionicTab',
          scope: true,
          compile: function(element, attr) {
      
            //We create the tabNavTemplate in the compile phase so that the
            //attributes we pass down won't be interpolated yet - we want
            //to pass down the 'raw' versions of the attributes
            var tabNavTemplate = '<ion-tab-nav' +
              attrStr('ng-click', attr.ngClick) +
              attrStr('title', attr.title) +
              attrStr('icon', attr.icon) +
              attrStr('icon-on', attr.iconOn) +
              attrStr('icon-off', attr.iconOff) +
              attrStr('badge', attr.badge) +
              attrStr('badge-style', attr.badgeStyle) +
              attrStr('hidden', attr.hidden) +
              attrStr('class', attr['class']) +
              '></ion-tab-nav>';
      
            //Remove the contents of the element so we can compile them later, if tab is selected
            //We don't use regular transclusion because it breaks element inheritance
            var tabContent = jqLite('<div class="pane">')
              .append( element.contents().remove() );
      
            return function link($scope, $element, $attr, ctrls) {
              var childScope;
              var childElement;
              var tabsCtrl = ctrls[0];
              var tabCtrl = ctrls[1];
      
              var navView = tabContent[0].querySelector('ion-nav-view') ||
                tabContent[0].querySelector('data-ion-nav-view');
              var navViewName = navView && navView.getAttribute('name');
      
              $ionicBind($scope, $attr, {
                animate: '=',
                onSelect: '&',
                onDeselect: '&',
                title: '@',
                uiSref: '@',
                href: '@',
              });
      
              tabsCtrl.add($scope);
              $scope.$on('$destroy', function() {
                if(!$scope.$tabsDestroy) {
                  // if the containing ionTabs directive is being destroyed
                  // then don't bother going through the controllers remove
                  // method, since remove will reset the active tab as each tab
                  // is being destroyed, causing unnecessary view loads and transitions
                  tabsCtrl.remove($scope);
                }
                tabNavElement.isolateScope().$destroy();
                tabNavElement.remove();
              });
      
              //Remove title attribute so browser-tooltip does not apear
              $element[0].removeAttribute('title');
      
              if (navViewName) {
                tabCtrl.navViewName = $scope.navViewName = navViewName;
              }
              $scope.$on('$stateChangeSuccess', selectIfMatchesState);
              selectIfMatchesState();
              function selectIfMatchesState() {
                if (tabCtrl.tabMatchesState()) {
                  tabsCtrl.select($scope, false);
                }
              }
      
              var tabNavElement = jqLite(tabNavTemplate);
              tabNavElement.data('$ionTabsController', tabsCtrl);
              tabNavElement.data('$ionTabController', tabCtrl);
              tabsCtrl.$tabsElement.append($compile(tabNavElement)($scope));
      
              $scope.$watch('$tabSelected', function(value) {
                childScope && childScope.$destroy();
                childScope = null;
                childElement && $animate.leave(childElement);
                childElement = null;
                if (value) {
                  childScope = $scope.$new();
                  childElement = tabContent.clone();
                  $animate.enter(childElement, tabsCtrl.$element);
                  $compile(childElement)(childScope);
                }
              });
      
            };
          }
        };
      }]);
      
      IonicModule
      .directive('ionTabNav', [function() {
        return {
          restrict: 'E',
          replace: true,
          require: ['^ionTabs', '^ionTab'],
          template:
          '<a ng-class="{\'tab-item-active\': isTabActive(), \'has-badge\':badge, \'tab-hidden\':isHidden()}" ' +
            ' class="tab-item">' +
            '<span class="badge {{badgeStyle}}" ng-if="badge">{{badge}}</span>' +
            '<i class="icon {{getIconOn()}}" ng-if="getIconOn() && isTabActive()"></i>' +
            '<i class="icon {{getIconOff()}}" ng-if="getIconOff() && !isTabActive()"></i>' +
            '<span class="tab-title" ng-bind-html="title"></span>' +
          '</a>',
          scope: {
            title: '@',
            icon: '@',
            iconOn: '@',
            iconOff: '@',
            badge: '=',
            hidden: '@',
            badgeStyle: '@',
            'class': '@'
          },
          compile: function(element, attr, transclude) {
            return function link($scope, $element, $attrs, ctrls) {
              var tabsCtrl = ctrls[0],
                tabCtrl = ctrls[1];
      
              //Remove title attribute so browser-tooltip does not apear
              $element[0].removeAttribute('title');
      
              $scope.selectTab = function(e) {
                e.preventDefault();
                tabsCtrl.select(tabCtrl.$scope, true);
              };
              if (!$attrs.ngClick) {
                $element.on('click', function(event) {
                  $scope.$apply(function() {
                    $scope.selectTab(event);
                  });
                });
              }
      
              $scope.isHidden = function() {
                if($attrs.hidden === 'true' || $attrs.hidden === true)return true;
                return false;
              };
      
              $scope.getIconOn = function() {
                return $scope.iconOn || $scope.icon;
              };
              $scope.getIconOff = function() {
                return $scope.iconOff || $scope.icon;
              };
      
              $scope.isTabActive = function() {
                return tabsCtrl.selectedTab() === tabCtrl.$scope;
              };
            };
          }
        };
      }]);
      
      IonicModule.constant('$ionicTabsConfig', {
        position: '',
        type: ''
      });
      
      /**
       * @ngdoc directive
       * @name ionTabs
       * @module ionic
       * @delegate ionic.service:$ionicTabsDelegate
       * @restrict E
       * @codepen KbrzJ
       *
       * @description
       * Powers a multi-tabbed interface with a Tab Bar and a set of "pages" that can be tabbed
       * through.
       *
       * Assign any [tabs class](/docs/components#tabs) or
       * [animation class](/docs/components#animation) to the element to define
       * its look and feel.
       *
       * See the {@link ionic.directive:ionTab} directive's documentation for more details on
       * individual tabs.
       *
       * Note: do not place ion-tabs inside of an ion-content element; it has been known to cause a
       * certain CSS bug.
       *
       * @usage
       * ```html
       * <ion-tabs class="tabs-positive tabs-icon-only">
       *
       *   <ion-tab title="Home" icon-on="ion-ios7-filing" icon-off="ion-ios7-filing-outline">
       *     <!-- Tab 1 content -->
       *   </ion-tab>
       *
       *   <ion-tab title="About" icon-on="ion-ios7-clock" icon-off="ion-ios7-clock-outline">
       *     <!-- Tab 2 content -->
       *   </ion-tab>
       *
       *   <ion-tab title="Settings" icon-on="ion-ios7-gear" icon-off="ion-ios7-gear-outline">
       *     <!-- Tab 3 content -->
       *   </ion-tab>
       *
       * </ion-tabs>
       * ```
       *
       * @param {string=} delegate-handle The handle used to identify these tabs
       * with {@link ionic.service:$ionicTabsDelegate}.
       */
      
      IonicModule
      .directive('ionTabs', [
        '$ionicViewService',
        '$ionicTabsDelegate',
        '$ionicTabsConfig',
      function($ionicViewService, $ionicTabsDelegate, $ionicTabsConfig) {
        return {
          restrict: 'E',
          scope: true,
          controller: '$ionicTabs',
          compile: function(element, attr) {
            element.addClass('view');
            //We cannot use regular transclude here because it breaks element.data()
            //inheritance on compile
            var innerElement = jqLite('<div class="tabs"></div>');
            innerElement.append(element.contents());
            element.append(innerElement);
            element.addClass($ionicTabsConfig.position);
            element.addClass($ionicTabsConfig.type);
      
            return { pre: prelink };
            function prelink($scope, $element, $attr, tabsCtrl) {
              var deregisterInstance = $ionicTabsDelegate._registerInstance(
                tabsCtrl, $attr.delegateHandle
              );
      
              $scope.$on('$destroy', function(){
                // variable to inform child tabs that they're all being blown away
                // used so that while destorying an individual tab, each one
                // doesn't select the next tab as the active one, which causes unnecessary
                // loading of tab views when each will eventually all go away anyway
                $scope.$tabsDestroy = true;
                deregisterInstance();
              });
      
              tabsCtrl.$scope = $scope;
              tabsCtrl.$element = $element;
              tabsCtrl.$tabsElement = jqLite($element[0].querySelector('.tabs'));
      
              var el = $element[0];
              $scope.$watch(function() { return el.className; }, function(value) {
                var isTabsTop = value.indexOf('tabs-top') !== -1;
                var isHidden = value.indexOf('tabs-item-hide') !== -1;
                $scope.$hasTabs = !isTabsTop && !isHidden;
                $scope.$hasTabsTop = isTabsTop && !isHidden;
              });
              $scope.$on('$destroy', function() {
                delete $scope.$hasTabs;
                delete $scope.$hasTabsTop;
              });
            }
          }
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name ionToggle
       * @module ionic
       * @codepen tfAzj
       * @restrict E
       *
       * @description
       * A toggle is an animated switch which binds a given model to a boolean.
       *
       * Allows dragging of the switch's nub.
       *
       * The toggle behaves like any [AngularJS checkbox](http://docs.angularjs.org/api/ng/input/input[checkbox]) otherwise.
       *
       * @param toggle-class {string=} Sets the CSS class on the inner `label.toggle` element created by the directive.
       *
       * @usage
       * Below is an example of a toggle directive which is wired up to the `airplaneMode` model
       * and has the `toggle-calm` CSS class assigned to the inner element.
       *
       * ```html
       * <ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">Airplane Mode</ion-toggle>
       * ```
       */
      IonicModule
      .directive('ionToggle', [
        '$ionicGesture',
        '$timeout',
      function($ionicGesture, $timeout) {
      
        return {
          restrict: 'E',
          replace: true,
          require: '?ngModel',
          transclude: true,
          template:
            '<div class="item item-toggle">' +
              '<div ng-transclude></div>' +
              '<label class="toggle">' +
                '<input type="checkbox">' +
                '<div class="track">' +
                  '<div class="handle"></div>' +
                '</div>' +
              '</label>' +
            '</div>',
      
          compile: function(element, attr) {
            var input = element.find('input');
            forEach({
              'name': attr.name,
              'ng-value': attr.ngValue,
              'ng-model': attr.ngModel,
              'ng-checked': attr.ngChecked,
              'ng-disabled': attr.ngDisabled,
              'ng-true-value': attr.ngTrueValue,
              'ng-false-value': attr.ngFalseValue,
              'ng-change': attr.ngChange
            }, function(value, name) {
              if (isDefined(value)) {
                input.attr(name, value);
              }
            });
      
            if(attr.toggleClass) {
              element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
            }
      
            return function($scope, $element, $attr) {
               var el, checkbox, track, handle;
      
               el = $element[0].getElementsByTagName('label')[0];
               checkbox = el.children[0];
               track = el.children[1];
               handle = track.children[0];
      
               var ngModelController = jqLite(checkbox).controller('ngModel');
      
               $scope.toggle = new ionic.views.Toggle({
                 el: el,
                 track: track,
                 checkbox: checkbox,
                 handle: handle,
                 onChange: function() {
                   if(checkbox.checked) {
                     ngModelController.$setViewValue(true);
                   } else {
                     ngModelController.$setViewValue(false);
                   }
                   $scope.$apply();
                 }
               });
      
               $scope.$on('$destroy', function() {
                 $scope.toggle.destroy();
               });
            };
          }
      
        };
      }]);
      
      /**
       * @ngdoc directive
       * @name ionView
       * @module ionic
       * @restrict E
       * @parent ionNavView
       *
       * @description
       * A container for content, used to tell a parent {@link ionic.directive:ionNavBar}
       * about the current view.
       *
       * @usage
       * Below is an example where our page will load with a navbar containing "My Page" as the title.
       *
       * ```html
       * <ion-nav-bar></ion-nav-bar>
       * <ion-nav-view class="slide-left-right">
       *   <ion-view title="My Page">
       *     <ion-content>
       *       Hello!
       *     </ion-content>
       *   </ion-view>
       * </ion-nav-view>
       * ```
       *
       * @param {string=} title The title to display on the parent {@link ionic.directive:ionNavBar}.
       * @param {boolean=} hide-back-button Whether to hide the back button on the parent
       * {@link ionic.directive:ionNavBar} by default.
       * @param {boolean=} hide-nav-bar Whether to hide the parent
       * {@link ionic.directive:ionNavBar} by default.
       */
      IonicModule
      .directive('ionView', ['$ionicViewService', '$rootScope', '$animate',
                 function( $ionicViewService,   $rootScope,   $animate) {
        return {
          restrict: 'EA',
          priority: 1000,
          require: ['^?ionNavBar', '^?ionModal'],
          compile: function(tElement, tAttrs, transclude) {
            tElement.addClass('pane');
            tElement[0].removeAttribute('title');
      
            return function link($scope, $element, $attr, ctrls) {
              var navBarCtrl = ctrls[0];
              var modalCtrl = ctrls[1];
      
              //Don't use the ionView if we're inside a modal or there's no navbar
              if (!navBarCtrl || modalCtrl) {
                return;
              }
      
              if (angular.isDefined($attr.title)) {
      
                var initialTitle = $attr.title;
                navBarCtrl.changeTitle(initialTitle, $scope.$navDirection);
      
                // watch for changes in the title, don't set initial value as changeTitle does that
                $attr.$observe('title', function(val, oldVal) {
                  navBarCtrl.setTitle(val);
                });
              }
      
              var hideBackAttr = angular.isDefined($attr.hideBackButton) ?
                $attr.hideBackButton :
                'false';
              $scope.$watch(hideBackAttr, function(value) {
                // Should we hide a back button when this tab is shown
                navBarCtrl.showBackButton(!value);
              });
      
              var hideNavAttr = angular.isDefined($attr.hideNavBar) ?
                $attr.hideNavBar :
                'false';
              $scope.$watch(hideNavAttr, function(value) {
                // Should the nav bar be hidden for this view or not?
                navBarCtrl.showBar(!value);
              });
      
            };
          }
        };
      }]);
      
      })();
  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("src/main", ["ionic", "angular"], function($__export) {
  "use strict";
  var __moduleName = "src/main";
  function require(path) {
    return $traceurRuntime.require("src/main", path);
  }
  var angular;
  return {
    setters: [function(m) {}, function(m) {
      angular = m.default;
    }],
    execute: function() {
      angular.module('ionicApp', ['ionic']).controller('MyController', ['$scope', function($scope) {
        $scope.greetMe = 'World';
      }]);
      angular.element(document).ready(function() {
        angular.bootstrap(document, ["ionicApp"]);
      });
    }
  };
});

System.register("github:systemjs/plugin-css@0.1.0/css", [], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/systemjs/plugin-css@0.1.0/css.js";
  var __dirname = "jspm_packages/github/systemjs/plugin-css@0.1.0";
  if (typeof window !== 'undefined') {
    var waitSeconds = 100;
    
    var head = document.getElementsByTagName('head')[0];
    
    // get all link tags in the page
    var links = document.getElementsByTagName('link');
    var linkHrefs = [];
    for (var i = 0; i < links.length; i++) {
      linkHrefs.push(links[i].href);
    }
    
    var isWebkit = !!window.navigator.userAgent.match(/AppleWebKit\/([^ ;]*)/);
    var webkitLoadCheck = function(link, callback) {
      setTimeout(function() {
        for (var i = 0; i < document.styleSheets.length; i++) {
          var sheet = document.styleSheets[i];
          if (sheet.href == link.href)
            return callback();
        }
        webkitLoadCheck(link, callback);
      }, 10);
    }
    
    var noop = function() {}
    
    var loadCSS = function(url) {
      return new Promise(function(resolve, reject) {
        var timeout = setTimeout(function() {
          reject('Unable to load CSS');
        }, waitSeconds * 1000);
        var _callback = function() {
          clearTimeout(timeout);
          link.onload = noop;
          setTimeout(function() {
            resolve('');
          }, 7);
        }
        var link = document.createElement('link')  ;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
    
        if (!isWebkit)
          link.onload = _callback;
        else
          webkitLoadCheck(link, _callback);
    
        head.appendChild(link);
      });
    }
    
    exports.fetch = function(load) {
      // dont reload styles loaded in the head
      for (var i = 0; i < linkHrefs.length; i++)
        if (load.address == linkHrefs[i])
          return '';
      return loadCSS(load.address);
    }
  }
  else {
    exports.build = false;
  }
  
  global.define = __define;
  return module.exports;
});

System.register("github:angular-ui/ui-router@0.2.10/release/angular-ui-router", [], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular-ui/ui-router@0.2.10/release/angular-ui-router.js";
  var __dirname = "jspm_packages/github/angular-ui/ui-router@0.2.10/release";
  /**
   * State-based routing for AngularJS
   * @version v0.2.10
   * @link http://angular-ui.github.com/
   * @license MIT License, http://www.opensource.org/licenses/MIT
   */
  
  /* commonjs package manager support (eg componentjs) */
  if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
    module.exports = 'ui.router';
  }
  
  (function (window, angular, undefined) {
  /*jshint globalstrict:true*/
  /*global angular:false*/
  'use strict';
  
  var isDefined = angular.isDefined,
      isFunction = angular.isFunction,
      isString = angular.isString,
      isObject = angular.isObject,
      isArray = angular.isArray,
      forEach = angular.forEach,
      extend = angular.extend,
      copy = angular.copy;
  
  function inherit(parent, extra) {
    return extend(new (extend(function() {}, { prototype: parent }))(), extra);
  }
  
  function merge(dst) {
    forEach(arguments, function(obj) {
      if (obj !== dst) {
        forEach(obj, function(value, key) {
          if (!dst.hasOwnProperty(key)) dst[key] = value;
        });
      }
    });
    return dst;
  }
  
  /**
   * Finds the common ancestor path between two states.
   *
   * @param {Object} first The first state.
   * @param {Object} second The second state.
   * @return {Array} Returns an array of state names in descending order, not including the root.
   */
  function ancestors(first, second) {
    var path = [];
  
    for (var n in first.path) {
      if (first.path[n] !== second.path[n]) break;
      path.push(first.path[n]);
    }
    return path;
  }
  
  /**
   * IE8-safe wrapper for `Object.keys()`.
   *
   * @param {Object} object A JavaScript object.
   * @return {Array} Returns the keys of the object as an array.
   */
  function keys(object) {
    if (Object.keys) {
      return Object.keys(object);
    }
    var result = [];
  
    angular.forEach(object, function(val, key) {
      result.push(key);
    });
    return result;
  }
  
  /**
   * IE8-safe wrapper for `Array.prototype.indexOf()`.
   *
   * @param {Array} array A JavaScript array.
   * @param {*} value A value to search the array for.
   * @return {Number} Returns the array index value of `value`, or `-1` if not present.
   */
  function arraySearch(array, value) {
    if (Array.prototype.indexOf) {
      return array.indexOf(value, Number(arguments[2]) || 0);
    }
    var len = array.length >>> 0, from = Number(arguments[2]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
  
    if (from < 0) from += len;
  
    for (; from < len; from++) {
      if (from in array && array[from] === value) return from;
    }
    return -1;
  }
  
  /**
   * Merges a set of parameters with all parameters inherited between the common parents of the
   * current state and a given destination state.
   *
   * @param {Object} currentParams The value of the current state parameters ($stateParams).
   * @param {Object} newParams The set of parameters which will be composited with inherited params.
   * @param {Object} $current Internal definition of object representing the current state.
   * @param {Object} $to Internal definition of object representing state to transition to.
   */
  function inheritParams(currentParams, newParams, $current, $to) {
    var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];
  
    for (var i in parents) {
      if (!parents[i].params || !parents[i].params.length) continue;
      parentParams = parents[i].params;
  
      for (var j in parentParams) {
        if (arraySearch(inheritList, parentParams[j]) >= 0) continue;
        inheritList.push(parentParams[j]);
        inherited[parentParams[j]] = currentParams[parentParams[j]];
      }
    }
    return extend({}, inherited, newParams);
  }
  
  /**
   * Normalizes a set of values to string or `null`, filtering them by a list of keys.
   *
   * @param {Array} keys The list of keys to normalize/return.
   * @param {Object} values An object hash of values to normalize.
   * @return {Object} Returns an object hash of normalized string values.
   */
  function normalize(keys, values) {
    var normalized = {};
  
    forEach(keys, function (name) {
      var value = values[name];
      normalized[name] = (value != null) ? String(value) : null;
    });
    return normalized;
  }
  
  /**
   * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
   *
   * @param {Object} a The first object.
   * @param {Object} b The second object.
   * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
   *                     it defaults to the list of keys in `a`.
   * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
   */
  function equalForKeys(a, b, keys) {
    if (!keys) {
      keys = [];
      for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
    }
  
    for (var i=0; i<keys.length; i++) {
      var k = keys[i];
      if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
    }
    return true;
  }
  
  /**
   * Returns the subset of an object, based on a list of keys.
   *
   * @param {Array} keys
   * @param {Object} values
   * @return {Boolean} Returns a subset of `values`.
   */
  function filterByKeys(keys, values) {
    var filtered = {};
  
    forEach(keys, function (name) {
      filtered[name] = values[name];
    });
    return filtered;
  }
  /**
   * @ngdoc overview
   * @name ui.router.util
   *
   * @description
   * # ui.router.util sub-module
   *
   * This module is a dependency of other sub-modules. Do not include this module as a dependency
   * in your angular app (use {@link ui.router} module instead).
   *
   */
  angular.module('ui.router.util', ['ng']);
  
  /**
   * @ngdoc overview
   * @name ui.router.router
   * 
   * @requires ui.router.util
   *
   * @description
   * # ui.router.router sub-module
   *
   * This module is a dependency of other sub-modules. Do not include this module as a dependency
   * in your angular app (use {@link ui.router} module instead).
   */
  angular.module('ui.router.router', ['ui.router.util']);
  
  /**
   * @ngdoc overview
   * @name ui.router.state
   * 
   * @requires ui.router.router
   * @requires ui.router.util
   *
   * @description
   * # ui.router.state sub-module
   *
   * This module is a dependency of the main ui.router module. Do not include this module as a dependency
   * in your angular app (use {@link ui.router} module instead).
   * 
   */
  angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);
  
  /**
   * @ngdoc overview
   * @name ui.router
   *
   * @requires ui.router.state
   *
   * @description
   * # ui.router
   * 
   * ## The main module for ui.router 
   * There are several sub-modules included with the ui.router module, however only this module is needed
   * as a dependency within your angular app. The other modules are for organization purposes. 
   *
   * The modules are:
   * * ui.router - the main "umbrella" module
   * * ui.router.router - 
   * 
   * *You'll need to include **only** this module as the dependency within your angular app.*
   * 
   * <pre>
   * <!doctype html>
   * <html ng-app="myApp">
   * <head>
   *   <script src="js/angular.js"></script>
   *   <!-- Include the ui-router script -->
   *   <script src="js/angular-ui-router.min.js"></script>
   *   <script>
   *     // ...and add 'ui.router' as a dependency
   *     var myApp = angular.module('myApp', ['ui.router']);
   *   </script>
   * </head>
   * <body>
   * </body>
   * </html>
   * </pre>
   */
  angular.module('ui.router', ['ui.router.state']);
  
  angular.module('ui.router.compat', ['ui.router']);
  
  /**
   * @ngdoc object
   * @name ui.router.util.$resolve
   *
   * @requires $q
   * @requires $injector
   *
   * @description
   * Manages resolution of (acyclic) graphs of promises.
   */
  $Resolve.$inject = ['$q', '$injector'];
  function $Resolve(  $q,    $injector) {
    
    var VISIT_IN_PROGRESS = 1,
        VISIT_DONE = 2,
        NOTHING = {},
        NO_DEPENDENCIES = [],
        NO_LOCALS = NOTHING,
        NO_PARENT = extend($q.when(NOTHING), { $$promises: NOTHING, $$values: NOTHING });
    
  
    /**
     * @ngdoc function
     * @name ui.router.util.$resolve#study
     * @methodOf ui.router.util.$resolve
     *
     * @description
     * Studies a set of invocables that are likely to be used multiple times.
     * <pre>
     * $resolve.study(invocables)(locals, parent, self)
     * </pre>
     * is equivalent to
     * <pre>
     * $resolve.resolve(invocables, locals, parent, self)
     * </pre>
     * but the former is more efficient (in fact `resolve` just calls `study` 
     * internally).
     *
     * @param {object} invocables Invocable objects
     * @return {function} a function to pass in locals, parent and self
     */
    this.study = function (invocables) {
      if (!isObject(invocables)) throw new Error("'invocables' must be an object");
      
      // Perform a topological sort of invocables to build an ordered plan
      var plan = [], cycle = [], visited = {};
      function visit(value, key) {
        if (visited[key] === VISIT_DONE) return;
        
        cycle.push(key);
        if (visited[key] === VISIT_IN_PROGRESS) {
          cycle.splice(0, cycle.indexOf(key));
          throw new Error("Cyclic dependency: " + cycle.join(" -> "));
        }
        visited[key] = VISIT_IN_PROGRESS;
        
        if (isString(value)) {
          plan.push(key, [ function() { return $injector.get(value); }], NO_DEPENDENCIES);
        } else {
          var params = $injector.annotate(value);
          forEach(params, function (param) {
            if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
          });
          plan.push(key, value, params);
        }
        
        cycle.pop();
        visited[key] = VISIT_DONE;
      }
      forEach(invocables, visit);
      invocables = cycle = visited = null; // plan is all that's required
      
      function isResolve(value) {
        return isObject(value) && value.then && value.$$promises;
      }
      
      return function (locals, parent, self) {
        if (isResolve(locals) && self === undefined) {
          self = parent; parent = locals; locals = null;
        }
        if (!locals) locals = NO_LOCALS;
        else if (!isObject(locals)) {
          throw new Error("'locals' must be an object");
        }       
        if (!parent) parent = NO_PARENT;
        else if (!isResolve(parent)) {
          throw new Error("'parent' must be a promise returned by $resolve.resolve()");
        }
        
        // To complete the overall resolution, we have to wait for the parent
        // promise and for the promise for each invokable in our plan.
        var resolution = $q.defer(),
            result = resolution.promise,
            promises = result.$$promises = {},
            values = extend({}, locals),
            wait = 1 + plan.length/3,
            merged = false;
            
        function done() {
          // Merge parent values we haven't got yet and publish our own $$values
          if (!--wait) {
            if (!merged) merge(values, parent.$$values); 
            result.$$values = values;
            result.$$promises = true; // keep for isResolve()
            resolution.resolve(values);
          }
        }
        
        function fail(reason) {
          result.$$failure = reason;
          resolution.reject(reason);
        }
        
        // Short-circuit if parent has already failed
        if (isDefined(parent.$$failure)) {
          fail(parent.$$failure);
          return result;
        }
        
        // Merge parent values if the parent has already resolved, or merge
        // parent promises and wait if the parent resolve is still in progress.
        if (parent.$$values) {
          merged = merge(values, parent.$$values);
          done();
        } else {
          extend(promises, parent.$$promises);
          parent.then(done, fail);
        }
        
        // Process each invocable in the plan, but ignore any where a local of the same name exists.
        for (var i=0, ii=plan.length; i<ii; i+=3) {
          if (locals.hasOwnProperty(plan[i])) done();
          else invoke(plan[i], plan[i+1], plan[i+2]);
        }
        
        function invoke(key, invocable, params) {
          // Create a deferred for this invocation. Failures will propagate to the resolution as well.
          var invocation = $q.defer(), waitParams = 0;
          function onfailure(reason) {
            invocation.reject(reason);
            fail(reason);
          }
          // Wait for any parameter that we have a promise for (either from parent or from this
          // resolve; in that case study() will have made sure it's ordered before us in the plan).
          forEach(params, function (dep) {
            if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
              waitParams++;
              promises[dep].then(function (result) {
                values[dep] = result;
                if (!(--waitParams)) proceed();
              }, onfailure);
            }
          });
          if (!waitParams) proceed();
          function proceed() {
            if (isDefined(result.$$failure)) return;
            try {
              invocation.resolve($injector.invoke(invocable, self, values));
              invocation.promise.then(function (result) {
                values[key] = result;
                done();
              }, onfailure);
            } catch (e) {
              onfailure(e);
            }
          }
          // Publish promise synchronously; invocations further down in the plan may depend on it.
          promises[key] = invocation.promise;
        }
        
        return result;
      };
    };
    
    /**
     * @ngdoc function
     * @name ui.router.util.$resolve#resolve
     * @methodOf ui.router.util.$resolve
     *
     * @description
     * Resolves a set of invocables. An invocable is a function to be invoked via 
     * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
     * An invocable can either return a value directly,
     * or a `$q` promise. If a promise is returned it will be resolved and the 
     * resulting value will be used instead. Dependencies of invocables are resolved 
     * (in this order of precedence)
     *
     * - from the specified `locals`
     * - from another invocable that is part of this `$resolve` call
     * - from an invocable that is inherited from a `parent` call to `$resolve` 
     *   (or recursively
     * - from any ancestor `$resolve` of that parent).
     *
     * The return value of `$resolve` is a promise for an object that contains 
     * (in this order of precedence)
     *
     * - any `locals` (if specified)
     * - the resolved return values of all injectables
     * - any values inherited from a `parent` call to `$resolve` (if specified)
     *
     * The promise will resolve after the `parent` promise (if any) and all promises 
     * returned by injectables have been resolved. If any invocable 
     * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
     * invocable is rejected, the `$resolve` promise is immediately rejected with the 
     * same error. A rejection of a `parent` promise (if specified) will likewise be 
     * propagated immediately. Once the `$resolve` promise has been rejected, no 
     * further invocables will be called.
     * 
     * Cyclic dependencies between invocables are not permitted and will caues `$resolve`
     * to throw an error. As a special case, an injectable can depend on a parameter 
     * with the same name as the injectable, which will be fulfilled from the `parent` 
     * injectable of the same name. This allows inherited values to be decorated. 
     * Note that in this case any other injectable in the same `$resolve` with the same
     * dependency would see the decorated value, not the inherited value.
     *
     * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
     * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
     * exception.
     *
     * Invocables are invoked eagerly as soon as all dependencies are available. 
     * This is true even for dependencies inherited from a `parent` call to `$resolve`.
     *
     * As a special case, an invocable can be a string, in which case it is taken to 
     * be a service name to be passed to `$injector.get()`. This is supported primarily 
     * for backwards-compatibility with the `resolve` property of `$routeProvider` 
     * routes.
     *
     * @param {object} invocables functions to invoke or 
     * `$injector` services to fetch.
     * @param {object} locals  values to make available to the injectables
     * @param {object} parent  a promise returned by another call to `$resolve`.
     * @param {object} self  the `this` for the invoked methods
     * @return {object} Promise for an object that contains the resolved return value
     * of all invocables, as well as any inherited and local values.
     */
    this.resolve = function (invocables, locals, parent, self) {
      return this.study(invocables)(locals, parent, self);
    };
  }
  
  angular.module('ui.router.util').service('$resolve', $Resolve);
  
  
  /**
   * @ngdoc object
   * @name ui.router.util.$templateFactory
   *
   * @requires $http
   * @requires $templateCache
   * @requires $injector
   *
   * @description
   * Service. Manages loading of templates.
   */
  $TemplateFactory.$inject = ['$http', '$templateCache', '$injector'];
  function $TemplateFactory(  $http,   $templateCache,   $injector) {
  
    /**
     * @ngdoc function
     * @name ui.router.util.$templateFactory#fromConfig
     * @methodOf ui.router.util.$templateFactory
     *
     * @description
     * Creates a template from a configuration object. 
     *
     * @param {object} config Configuration object for which to load a template. 
     * The following properties are search in the specified order, and the first one 
     * that is defined is used to create the template:
     *
     * @param {string|object} config.template html string template or function to 
     * load via {@link ui.router.util.$templateFactory#fromString fromString}.
     * @param {string|object} config.templateUrl url to load or a function returning 
     * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
     * @param {Function} config.templateProvider function to invoke via 
     * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
     * @param {object} params  Parameters to pass to the template function.
     * @param {object} locals Locals to pass to `invoke` if the template is loaded 
     * via a `templateProvider`. Defaults to `{ params: params }`.
     *
     * @return {string|object}  The template html as a string, or a promise for 
     * that string,or `null` if no template is configured.
     */
    this.fromConfig = function (config, params, locals) {
      return (
        isDefined(config.template) ? this.fromString(config.template, params) :
        isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
        isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :
        null
      );
    };
  
    /**
     * @ngdoc function
     * @name ui.router.util.$templateFactory#fromString
     * @methodOf ui.router.util.$templateFactory
     *
     * @description
     * Creates a template from a string or a function returning a string.
     *
     * @param {string|object} template html template as a string or function that 
     * returns an html template as a string.
     * @param {object} params Parameters to pass to the template function.
     *
     * @return {string|object} The template html as a string, or a promise for that 
     * string.
     */
    this.fromString = function (template, params) {
      return isFunction(template) ? template(params) : template;
    };
  
    /**
     * @ngdoc function
     * @name ui.router.util.$templateFactory#fromUrl
     * @methodOf ui.router.util.$templateFactory
     * 
     * @description
     * Loads a template from the a URL via `$http` and `$templateCache`.
     *
     * @param {string|Function} url url of the template to load, or a function 
     * that returns a url.
     * @param {Object} params Parameters to pass to the url function.
     * @return {string|Promise.<string>} The template html as a string, or a promise 
     * for that string.
     */
    this.fromUrl = function (url, params) {
      if (isFunction(url)) url = url(params);
      if (url == null) return null;
      else return $http
          .get(url, { cache: $templateCache })
          .then(function(response) { return response.data; });
    };
  
    /**
     * @ngdoc function
     * @name ui.router.util.$templateFactory#fromUrl
     * @methodOf ui.router.util.$templateFactory
     *
     * @description
     * Creates a template by invoking an injectable provider function.
     *
     * @param {Function} provider Function to invoke via `$injector.invoke`
     * @param {Object} params Parameters for the template.
     * @param {Object} locals Locals to pass to `invoke`. Defaults to 
     * `{ params: params }`.
     * @return {string|Promise.<string>} The template html as a string, or a promise 
     * for that string.
     */
    this.fromProvider = function (provider, params, locals) {
      return $injector.invoke(provider, null, locals || { params: params });
    };
  }
  
  angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);
  
  /**
   * @ngdoc object
   * @name ui.router.util.type:UrlMatcher
   *
   * @description
   * Matches URLs against patterns and extracts named parameters from the path or the search
   * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
   * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
   * do not influence whether or not a URL is matched, but their values are passed through into
   * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
   * 
   * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
   * syntax, which optionally allows a regular expression for the parameter to be specified:
   *
   * * `':'` name - colon placeholder
   * * `'*'` name - catch-all placeholder
   * * `'{' name '}'` - curly placeholder
   * * `'{' name ':' regexp '}'` - curly placeholder with regexp. Should the regexp itself contain
   *   curly braces, they must be in matched pairs or escaped with a backslash.
   *
   * Parameter names may contain only word characters (latin letters, digits, and underscore) and
   * must be unique within the pattern (across both path and search parameters). For colon 
   * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
   * number of characters other than '/'. For catch-all placeholders the path parameter matches
   * any number of characters.
   * 
   * Examples:
   * 
   * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
   *   trailing slashes, and patterns have to match the entire path, not just a prefix.
   * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
   *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
   * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
   * * `'/user/{id:[^/]*}'` - Same as the previous example.
   * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
   *   parameter consists of 1 to 8 hex digits.
   * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
   *   path into the parameter 'path'.
   * * `'/files/*path'` - ditto.
   *
   * @param {string} pattern  the pattern to compile into a matcher.
   *
   * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
   *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
   *   non-null) will start with this prefix.
   *
   * @property {string} source  The pattern that was passed into the contructor
   *
   * @property {string} sourcePath  The path portion of the source property
   *
   * @property {string} sourceSearch  The search portion of the source property
   *
   * @property {string} regex  The constructed regex that will be used to match against the url when 
   *   it is time to determine which url will match.
   *
   * @returns {Object}  New UrlMatcher object
   */
  function UrlMatcher(pattern) {
  
    // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
    //   '*' name
    //   ':' name
    //   '{' name '}'
    //   '{' name ':' regexp '}'
    // The regular expression is somewhat complicated due to the need to allow curly braces
    // inside the regular expression. The placeholder regexp breaks down as follows:
    //    ([:*])(\w+)               classic placeholder ($1 / $2)
    //    \{(\w+)(?:\:( ... ))?\}   curly brace placeholder ($3) with optional regexp ... ($4)
    //    (?: ... | ... | ... )+    the regexp consists of any number of atoms, an atom being either
    //    [^{}\\]+                  - anything other than curly braces or backslash
    //    \\.                       - a backslash escape
    //    \{(?:[^{}\\]+|\\.)*\}     - a matched set of curly braces containing other atoms
    var placeholder = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
        names = {}, compiled = '^', last = 0, m,
        segments = this.segments = [],
        params = this.params = [];
  
    function addParameter(id) {
      if (!/^\w+(-+\w+)*$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
      if (names[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
      names[id] = true;
      params.push(id);
    }
  
    function quoteRegExp(string) {
      return string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
    }
  
    this.source = pattern;
  
    // Split into static segments separated by path parameter placeholders.
    // The number of segments is always 1 more than the number of parameters.
    var id, regexp, segment;
    while ((m = placeholder.exec(pattern))) {
      id = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
      regexp = m[4] || (m[1] == '*' ? '.*' : '[^/]*');
      segment = pattern.substring(last, m.index);
      if (segment.indexOf('?') >= 0) break; // we're into the search part
      compiled += quoteRegExp(segment) + '(' + regexp + ')';
      addParameter(id);
      segments.push(segment);
      last = placeholder.lastIndex;
    }
    segment = pattern.substring(last);
  
    // Find any search parameter names and remove them from the last segment
    var i = segment.indexOf('?');
    if (i >= 0) {
      var search = this.sourceSearch = segment.substring(i);
      segment = segment.substring(0, i);
      this.sourcePath = pattern.substring(0, last+i);
  
      // Allow parameters to be separated by '?' as well as '&' to make concat() easier
      forEach(search.substring(1).split(/[&?]/), addParameter);
    } else {
      this.sourcePath = pattern;
      this.sourceSearch = '';
    }
  
    compiled += quoteRegExp(segment) + '$';
    segments.push(segment);
    this.regexp = new RegExp(compiled);
    this.prefix = segments[0];
  }
  
  /**
   * @ngdoc function
   * @name ui.router.util.type:UrlMatcher#concat
   * @methodOf ui.router.util.type:UrlMatcher
   *
   * @description
   * Returns a new matcher for a pattern constructed by appending the path part and adding the
   * search parameters of the specified pattern to this pattern. The current pattern is not
   * modified. This can be understood as creating a pattern for URLs that are relative to (or
   * suffixes of) the current pattern.
   *
   * @example
   * The following two matchers are equivalent:
   * ```
   * new UrlMatcher('/user/{id}?q').concat('/details?date');
   * new UrlMatcher('/user/{id}/details?q&date');
   * ```
   *
   * @param {string} pattern  The pattern to append.
   * @returns {ui.router.util.type:UrlMatcher}  A matcher for the concatenated pattern.
   */
  UrlMatcher.prototype.concat = function (pattern) {
    // Because order of search parameters is irrelevant, we can add our own search
    // parameters to the end of the new pattern. Parse the new pattern by itself
    // and then join the bits together, but it's much easier to do this on a string level.
    return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch);
  };
  
  UrlMatcher.prototype.toString = function () {
    return this.source;
  };
  
  /**
   * @ngdoc function
   * @name ui.router.util.type:UrlMatcher#exec
   * @methodOf ui.router.util.type:UrlMatcher
   *
   * @description
   * Tests the specified path against this matcher, and returns an object containing the captured
   * parameter values, or null if the path does not match. The returned object contains the values
   * of any search parameters that are mentioned in the pattern, but their value may be null if
   * they are not present in `searchParams`. This means that search parameters are always treated
   * as optional.
   *
   * @example
   * ```
   * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', { x:'1', q:'hello' });
   * // returns { id:'bob', q:'hello', r:null }
   * ```
   *
   * @param {string} path  The URL path to match, e.g. `$location.path()`.
   * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
   * @returns {Object}  The captured parameter values.
   */
  UrlMatcher.prototype.exec = function (path, searchParams) {
    var m = this.regexp.exec(path);
    if (!m) return null;
  
    var params = this.params, nTotal = params.length,
      nPath = this.segments.length-1,
      values = {}, i;
  
    if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
  
    for (i=0; i<nPath; i++) values[params[i]] = m[i+1];
    for (/**/; i<nTotal; i++) values[params[i]] = searchParams[params[i]];
  
    return values;
  };
  
  /**
   * @ngdoc function
   * @name ui.router.util.type:UrlMatcher#parameters
   * @methodOf ui.router.util.type:UrlMatcher
   *
   * @description
   * Returns the names of all path and search parameters of this pattern in an unspecified order.
   * 
   * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
   *    pattern has no parameters, an empty array is returned.
   */
  UrlMatcher.prototype.parameters = function () {
    return this.params;
  };
  
  /**
   * @ngdoc function
   * @name ui.router.util.type:UrlMatcher#format
   * @methodOf ui.router.util.type:UrlMatcher
   *
   * @description
   * Creates a URL that matches this pattern by substituting the specified values
   * for the path and search parameters. Null values for path parameters are
   * treated as empty strings.
   *
   * @example
   * ```
   * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
   * // returns '/user/bob?q=yes'
   * ```
   *
   * @param {Object} values  the values to substitute for the parameters in this pattern.
   * @returns {string}  the formatted URL (path and optionally search part).
   */
  UrlMatcher.prototype.format = function (values) {
    var segments = this.segments, params = this.params;
    if (!values) return segments.join('');
  
    var nPath = segments.length-1, nTotal = params.length,
      result = segments[0], i, search, value;
  
    for (i=0; i<nPath; i++) {
      value = values[params[i]];
      // TODO: Maybe we should throw on null here? It's not really good style to use '' and null interchangeabley
      if (value != null) result += encodeURIComponent(value);
      result += segments[i+1];
    }
    for (/**/; i<nTotal; i++) {
      value = values[params[i]];
      if (value != null) {
        result += (search ? '&' : '?') + params[i] + '=' + encodeURIComponent(value);
        search = true;
      }
    }
  
    return result;
  };
  
  
  
  /**
   * @ngdoc object
   * @name ui.router.util.$urlMatcherFactory
   *
   * @description
   * Factory for {@link ui.router.util.type:UrlMatcher} instances. The factory is also available to providers
   * under the name `$urlMatcherFactoryProvider`.
   */
  function $UrlMatcherFactory() {
  
    /**
     * @ngdoc function
     * @name ui.router.util.$urlMatcherFactory#compile
     * @methodOf ui.router.util.$urlMatcherFactory
     *
     * @description
     * Creates a {@link ui.router.util.type:UrlMatcher} for the specified pattern.
     *   
     * @param {string} pattern  The URL pattern.
     * @returns {ui.router.util.type:UrlMatcher}  The UrlMatcher.
     */
    this.compile = function (pattern) {
      return new UrlMatcher(pattern);
    };
  
    /**
     * @ngdoc function
     * @name ui.router.util.$urlMatcherFactory#isMatcher
     * @methodOf ui.router.util.$urlMatcherFactory
     *
     * @description
     * Returns true if the specified object is a UrlMatcher, or false otherwise.
     *
     * @param {Object} object  The object to perform the type check against.
     * @returns {Boolean}  Returns `true` if the object has the following functions: `exec`, `format`, and `concat`.
     */
    this.isMatcher = function (o) {
      return isObject(o) && isFunction(o.exec) && isFunction(o.format) && isFunction(o.concat);
    };
    
    /* No need to document $get, since it returns this */
    this.$get = function () {
      return this;
    };
  }
  
  // Register as a provider so it's available to other providers
  angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
  
  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouterProvider
   *
   * @requires ui.router.util.$urlMatcherFactoryProvider
   *
   * @description
   * `$urlRouterProvider` has the responsibility of watching `$location`. 
   * When `$location` changes it runs through a list of rules one by one until a 
   * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
   * a url in a state configuration. All urls are compiled into a UrlMatcher object.
   *
   * There are several methods on `$urlRouterProvider` that make it useful to use directly
   * in your module config.
   */
  $UrlRouterProvider.$inject = ['$urlMatcherFactoryProvider'];
  function $UrlRouterProvider(  $urlMatcherFactory) {
    var rules = [], 
        otherwise = null;
  
    // Returns a string that is a prefix of all strings matching the RegExp
    function regExpPrefix(re) {
      var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
      return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
    }
  
    // Interpolates matched values into a String.replace()-style pattern
    function interpolate(pattern, match) {
      return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
        return match[what === '$' ? 0 : Number(what)];
      });
    }
  
    /**
     * @ngdoc function
     * @name ui.router.router.$urlRouterProvider#rule
     * @methodOf ui.router.router.$urlRouterProvider
     *
     * @description
     * Defines rules that are used by `$urlRouterProvider to find matches for
     * specific URLs.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router.router']);
     *
     * app.config(function ($urlRouterProvider) {
     *   // Here's an example of how you might allow case insensitive urls
     *   $urlRouterProvider.rule(function ($injector, $location) {
     *     var path = $location.path(),
     *         normalized = path.toLowerCase();
     *
     *     if (path !== normalized) {
     *       return normalized;
     *     }
     *   });
     * });
     * </pre>
     *
     * @param {object} rule Handler function that takes `$injector` and `$location`
     * services as arguments. You can use them to return a valid path as a string.
     *
     * @return {object} $urlRouterProvider - $urlRouterProvider instance
     */
    this.rule =
      function (rule) {
        if (!isFunction(rule)) throw new Error("'rule' must be a function");
        rules.push(rule);
        return this;
      };
  
    /**
     * @ngdoc object
     * @name ui.router.router.$urlRouterProvider#otherwise
     * @methodOf ui.router.router.$urlRouterProvider
     *
     * @description
     * Defines a path that is used when an invalied route is requested.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router.router']);
     *
     * app.config(function ($urlRouterProvider) {
     *   // if the path doesn't match any of the urls you configured
     *   // otherwise will take care of routing the user to the
     *   // specified url
     *   $urlRouterProvider.otherwise('/index');
     *
     *   // Example of using function rule as param
     *   $urlRouterProvider.otherwise(function ($injector, $location) {
     *     ...
     *   });
     * });
     * </pre>
     *
     * @param {string|object} rule The url path you want to redirect to or a function 
     * rule that returns the url path. The function version is passed two params: 
     * `$injector` and `$location` services.
     *
     * @return {object} $urlRouterProvider - $urlRouterProvider instance
     */
    this.otherwise =
      function (rule) {
        if (isString(rule)) {
          var redirect = rule;
          rule = function () { return redirect; };
        }
        else if (!isFunction(rule)) throw new Error("'rule' must be a function");
        otherwise = rule;
        return this;
      };
  
  
    function handleIfMatch($injector, handler, match) {
      if (!match) return false;
      var result = $injector.invoke(handler, handler, { $match: match });
      return isDefined(result) ? result : true;
    }
  
    /**
     * @ngdoc function
     * @name ui.router.router.$urlRouterProvider#when
     * @methodOf ui.router.router.$urlRouterProvider
     *
     * @description
     * Registers a handler for a given url matching. if handle is a string, it is
     * treated as a redirect, and is interpolated according to the syyntax of match
     * (i.e. like String.replace() for RegExp, or like a UrlMatcher pattern otherwise).
     *
     * If the handler is a function, it is injectable. It gets invoked if `$location`
     * matches. You have the option of inject the match object as `$match`.
     *
     * The handler can return
     *
     * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
     *   will continue trying to find another one that matches.
     * - **string** which is treated as a redirect and passed to `$location.url()`
     * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router.router']);
     *
     * app.config(function ($urlRouterProvider) {
     *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
     *     if ($state.$current.navigable !== state ||
     *         !equalForKeys($match, $stateParams) {
     *      $state.transitionTo(state, $match, false);
     *     }
     *   });
     * });
     * </pre>
     *
     * @param {string|object} what The incoming path that you want to redirect.
     * @param {string|object} handler The path you want to redirect your user to.
     */
    this.when =
      function (what, handler) {
        var redirect, handlerIsString = isString(handler);
        if (isString(what)) what = $urlMatcherFactory.compile(what);
  
        if (!handlerIsString && !isFunction(handler) && !isArray(handler))
          throw new Error("invalid 'handler' in when()");
  
        var strategies = {
          matcher: function (what, handler) {
            if (handlerIsString) {
              redirect = $urlMatcherFactory.compile(handler);
              handler = ['$match', function ($match) { return redirect.format($match); }];
            }
            return extend(function ($injector, $location) {
              return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
            }, {
              prefix: isString(what.prefix) ? what.prefix : ''
            });
          },
          regex: function (what, handler) {
            if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");
  
            if (handlerIsString) {
              redirect = handler;
              handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
            }
            return extend(function ($injector, $location) {
              return handleIfMatch($injector, handler, what.exec($location.path()));
            }, {
              prefix: regExpPrefix(what)
            });
          }
        };
  
        var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };
  
        for (var n in check) {
          if (check[n]) {
            return this.rule(strategies[n](what, handler));
          }
        }
  
        throw new Error("invalid 'what' in when()");
      };
  
    /**
     * @ngdoc object
     * @name ui.router.router.$urlRouter
     *
     * @requires $location
     * @requires $rootScope
     * @requires $injector
     *
     * @description
     *
     */
    this.$get =
      [        '$location', '$rootScope', '$injector',
      function ($location,   $rootScope,   $injector) {
        // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
        function update(evt) {
          if (evt && evt.defaultPrevented) return;
          function check(rule) {
            var handled = rule($injector, $location);
            if (handled) {
              if (isString(handled)) $location.replace().url(handled);
              return true;
            }
            return false;
          }
          var n=rules.length, i;
          for (i=0; i<n; i++) {
            if (check(rules[i])) return;
          }
          // always check otherwise last to allow dynamic updates to the set of rules
          if (otherwise) check(otherwise);
        }
  
        $rootScope.$on('$locationChangeSuccess', update);
  
        return {
          /**
           * @ngdoc function
           * @name ui.router.router.$urlRouter#sync
           * @methodOf ui.router.router.$urlRouter
           *
           * @description
           * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
           * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event, 
           * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed 
           * with the transition by calling `$urlRouter.sync()`.
           *
           * @example
           * <pre>
           * angular.module('app', ['ui.router']);
           *   .run(function($rootScope, $urlRouter) {
           *     $rootScope.$on('$locationChangeSuccess', function(evt) {
           *       // Halt state change from even starting
           *       evt.preventDefault();
           *       // Perform custom logic
           *       var meetsRequirement = ...
           *       // Continue with the update and state transition if logic allows
           *       if (meetsRequirement) $urlRouter.sync();
           *     });
           * });
           * </pre>
           */
          sync: function () {
            update();
          }
        };
      }];
  }
  
  angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);
  
  /**
   * @ngdoc object
   * @name ui.router.state.$stateProvider
   *
   * @requires ui.router.router.$urlRouterProvider
   * @requires ui.router.util.$urlMatcherFactoryProvider
   * @requires $locationProvider
   *
   * @description
   * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
   * on state.
   *
   * A state corresponds to a "place" in the application in terms of the overall UI and
   * navigation. A state describes (via the controller / template / view properties) what
   * the UI looks like and does at that place.
   *
   * States often have things in common, and the primary way of factoring out these
   * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
   * nested states.
   *
   * The `$stateProvider` provides interfaces to declare these states for your app.
   */
  $StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider'];
  function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory,           $locationProvider) {
  
    var root, states = {}, $state, queue = {}, abstractKey = 'abstract';
  
    // Builds state properties from definition passed to registerState()
    var stateBuilder = {
  
      // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
      // state.children = [];
      // if (parent) parent.children.push(state);
      parent: function(state) {
        if (isDefined(state.parent) && state.parent) return findState(state.parent);
        // regex matches any valid composite state name
        // would match "contact.list" but not "contacts"
        var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
        return compositeName ? findState(compositeName[1]) : root;
      },
  
      // inherit 'data' from parent and override by own values (if any)
      data: function(state) {
        if (state.parent && state.parent.data) {
          state.data = state.self.data = extend({}, state.parent.data, state.data);
        }
        return state.data;
      },
  
      // Build a URLMatcher if necessary, either via a relative or absolute URL
      url: function(state) {
        var url = state.url;
  
        if (isString(url)) {
          if (url.charAt(0) == '^') {
            return $urlMatcherFactory.compile(url.substring(1));
          }
          return (state.parent.navigable || root).url.concat(url);
        }
  
        if ($urlMatcherFactory.isMatcher(url) || url == null) {
          return url;
        }
        throw new Error("Invalid url '" + url + "' in state '" + state + "'");
      },
  
      // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
      navigable: function(state) {
        return state.url ? state : (state.parent ? state.parent.navigable : null);
      },
  
      // Derive parameters for this state and ensure they're a super-set of parent's parameters
      params: function(state) {
        if (!state.params) {
          return state.url ? state.url.parameters() : state.parent.params;
        }
        if (!isArray(state.params)) throw new Error("Invalid params in state '" + state + "'");
        if (state.url) throw new Error("Both params and url specicified in state '" + state + "'");
        return state.params;
      },
  
      // If there is no explicit multi-view configuration, make one up so we don't have
      // to handle both cases in the view directive later. Note that having an explicit
      // 'views' property will mean the default unnamed view properties are ignored. This
      // is also a good time to resolve view names to absolute names, so everything is a
      // straight lookup at link time.
      views: function(state) {
        var views = {};
  
        forEach(isDefined(state.views) ? state.views : { '': state }, function (view, name) {
          if (name.indexOf('@') < 0) name += '@' + state.parent.name;
          views[name] = view;
        });
        return views;
      },
  
      ownParams: function(state) {
        if (!state.parent) {
          return state.params;
        }
        var paramNames = {}; forEach(state.params, function (p) { paramNames[p] = true; });
  
        forEach(state.parent.params, function (p) {
          if (!paramNames[p]) {
            throw new Error("Missing required parameter '" + p + "' in state '" + state.name + "'");
          }
          paramNames[p] = false;
        });
        var ownParams = [];
  
        forEach(paramNames, function (own, p) {
          if (own) ownParams.push(p);
        });
        return ownParams;
      },
  
      // Keep a full path from the root down to this state as this is needed for state activation.
      path: function(state) {
        return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
      },
  
      // Speed up $state.contains() as it's used a lot
      includes: function(state) {
        var includes = state.parent ? extend({}, state.parent.includes) : {};
        includes[state.name] = true;
        return includes;
      },
  
      $delegates: {}
    };
  
    function isRelative(stateName) {
      return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
    }
  
    function findState(stateOrName, base) {
      var isStr = isString(stateOrName),
          name  = isStr ? stateOrName : stateOrName.name,
          path  = isRelative(name);
  
      if (path) {
        if (!base) throw new Error("No reference point given for path '"  + name + "'");
        var rel = name.split("."), i = 0, pathLength = rel.length, current = base;
  
        for (; i < pathLength; i++) {
          if (rel[i] === "" && i === 0) {
            current = base;
            continue;
          }
          if (rel[i] === "^") {
            if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
            current = current.parent;
            continue;
          }
          break;
        }
        rel = rel.slice(i).join(".");
        name = current.name + (current.name && rel ? "." : "") + rel;
      }
      var state = states[name];
  
      if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
        return state;
      }
      return undefined;
    }
  
    function queueState(parentName, state) {
      if (!queue[parentName]) {
        queue[parentName] = [];
      }
      queue[parentName].push(state);
    }
  
    function registerState(state) {
      // Wrap a new object around the state so we can store our private details easily.
      state = inherit(state, {
        self: state,
        resolve: state.resolve || {},
        toString: function() { return this.name; }
      });
  
      var name = state.name;
      if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");
      if (states.hasOwnProperty(name)) throw new Error("State '" + name + "'' is already defined");
  
      // Get parent name
      var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
          : (isString(state.parent)) ? state.parent
          : '';
  
      // If parent is not registered yet, add state to queue and register later
      if (parentName && !states[parentName]) {
        return queueState(parentName, state.self);
      }
  
      for (var key in stateBuilder) {
        if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
      }
      states[name] = state;
  
      // Register the state in the global state list and with $urlRouter if necessary.
      if (!state[abstractKey] && state.url) {
        $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
          if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
            $state.transitionTo(state, $match, { location: false });
          }
        }]);
      }
  
      // Register any queued children
      if (queue[name]) {
        for (var i = 0; i < queue[name].length; i++) {
          registerState(queue[name][i]);
        }
      }
  
      return state;
    }
  
    // Checks text to see if it looks like a glob.
    function isGlob (text) {
      return text.indexOf('*') > -1;
    }
  
    // Returns true if glob matches current $state name.
    function doesStateMatchGlob (glob) {
      var globSegments = glob.split('.'),
          segments = $state.$current.name.split('.');
  
      //match greedy starts
      if (globSegments[0] === '**') {
         segments = segments.slice(segments.indexOf(globSegments[1]));
         segments.unshift('**');
      }
      //match greedy ends
      if (globSegments[globSegments.length - 1] === '**') {
         segments.splice(segments.indexOf(globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
         segments.push('**');
      }
  
      if (globSegments.length != segments.length) {
        return false;
      }
  
      //match single stars
      for (var i = 0, l = globSegments.length; i < l; i++) {
        if (globSegments[i] === '*') {
          segments[i] = '*';
        }
      }
  
      return segments.join('') === globSegments.join('');
    }
  
  
    // Implicit root state that is always active
    root = registerState({
      name: '',
      url: '^',
      views: null,
      'abstract': true
    });
    root.navigable = null;
  
  
    /**
     * @ngdoc function
     * @name ui.router.state.$stateProvider#decorator
     * @methodOf ui.router.state.$stateProvider
     *
     * @description
     * Allows you to extend (carefully) or override (at your own peril) the 
     * `stateBuilder` object used internally by `$stateProvider`. This can be used 
     * to add custom functionality to ui-router, for example inferring templateUrl 
     * based on the state name.
     *
     * When passing only a name, it returns the current (original or decorated) builder
     * function that matches `name`.
     *
     * The builder functions that can be decorated are listed below. Though not all
     * necessarily have a good use case for decoration, that is up to you to decide.
     *
     * In addition, users can attach custom decorators, which will generate new 
     * properties within the state's internal definition. There is currently no clear 
     * use-case for this beyond accessing internal states (i.e. $state.$current), 
     * however, expect this to become increasingly relevant as we introduce additional 
     * meta-programming features.
     *
     * **Warning**: Decorators should not be interdependent because the order of 
     * execution of the builder functions in non-deterministic. Builder functions 
     * should only be dependent on the state definition object and super function.
     *
     *
     * Existing builder functions and current return values:
     *
     * - **parent** `{object}` - returns the parent state object.
     * - **data** `{object}` - returns state data, including any inherited data that is not
     *   overridden by own values (if any).
     * - **url** `{object}` - returns a {link ui.router.util.type:UrlMatcher} or null.
     * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
     *   navigable).
     * - **params** `{object}` - returns an array of state params that are ensured to 
     *   be a super-set of parent's params.
     * - **views** `{object}` - returns a views object where each key is an absolute view 
     *   name (i.e. "viewName@stateName") and each value is the config object 
     *   (template, controller) for the view. Even when you don't use the views object 
     *   explicitly on a state config, one is still created for you internally.
     *   So by decorating this builder function you have access to decorating template 
     *   and controller properties.
     * - **ownParams** `{object}` - returns an array of params that belong to the state, 
     *   not including any params defined by ancestor states.
     * - **path** `{string}` - returns the full path from the root down to this state. 
     *   Needed for state activation.
     * - **includes** `{object}` - returns an object that includes every state that 
     *   would pass a '$state.includes()' test.
     *
     * @example
     * <pre>
     * // Override the internal 'views' builder with a function that takes the state
     * // definition, and a reference to the internal function being overridden:
     * $stateProvider.decorator('views', function ($state, parent) {
     *   var result = {},
     *       views = parent(state);
     *
     *   angular.forEach(view, function (config, name) {
     *     var autoName = (state.name + '.' + name).replace('.', '/');
     *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
     *     result[name] = config;
     *   });
     *   return result;
     * });
     *
     * $stateProvider.state('home', {
     *   views: {
     *     'contact.list': { controller: 'ListController' },
     *     'contact.item': { controller: 'ItemController' }
     *   }
     * });
     *
     * // ...
     *
     * $state.go('home');
     * // Auto-populates list and item views with /partials/home/contact/list.html,
     * // and /partials/home/contact/item.html, respectively.
     * </pre>
     *
     * @param {string} name The name of the builder function to decorate. 
     * @param {object} func A function that is responsible for decorating the original 
     * builder function. The function receives two parameters:
     *
     *   - `{object}` - state - The state config object.
     *   - `{object}` - super - The original builder function.
     *
     * @return {object} $stateProvider - $stateProvider instance
     */
    this.decorator = decorator;
    function decorator(name, func) {
      /*jshint validthis: true */
      if (isString(name) && !isDefined(func)) {
        return stateBuilder[name];
      }
      if (!isFunction(func) || !isString(name)) {
        return this;
      }
      if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
        stateBuilder.$delegates[name] = stateBuilder[name];
      }
      stateBuilder[name] = func;
      return this;
    }
  
    /**
     * @ngdoc function
     * @name ui.router.state.$stateProvider#state
     * @methodOf ui.router.state.$stateProvider
     *
     * @description
     * Registers a state configuration under a given state name. The stateConfig object
     * has the following acceptable properties.
     *
     * <a id='template'></a>
     *
     * - **`template`** - {string|function=} - html template as a string or a function that returns
     *   an html template as a string which should be used by the uiView directives. This property 
     *   takes precedence over templateUrl.
     *   
     *   If `template` is a function, it will be called with the following parameters:
     *
     *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
     *     applying the current state
     *
     * <a id='templateUrl'></a>
     *
     * - **`templateUrl`** - {string|function=} - path or function that returns a path to an html 
     *   template that should be used by uiView.
     *   
     *   If `templateUrl` is a function, it will be called with the following parameters:
     *
     *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
     *     applying the current state
     *
     * <a id='templateProvider'></a>
     *
     * - **`templateProvider`** - {function=} - Provider function that returns HTML content
     *   string.
     *
     * <a id='controller'></a>
     *
     * - **`controller`** - {string|function=} -  Controller fn that should be associated with newly 
     *   related scope or the name of a registered controller if passed as a string.
     *
     * <a id='controllerProvider'></a>
     *
     * - **`controllerProvider`** - {function=} - Injectable provider function that returns
     *   the actual controller or string.
     *
     * <a id='controllerAs'></a>
     * 
     * - **`controllerAs`** – {string=} – A controller alias name. If present the controller will be 
     *   published to scope under the controllerAs name.
     *
     * <a id='resolve'></a>
     *
     * - **`resolve`** - {object.&lt;string, function&gt;=} - An optional map of dependencies which 
     *   should be injected into the controller. If any of these dependencies are promises, 
     *   the router will wait for them all to be resolved or one to be rejected before the 
     *   controller is instantiated. If all the promises are resolved successfully, the values 
     *   of the resolved promises are injected and $stateChangeSuccess event is fired. If any 
     *   of the promises are rejected the $stateChangeError event is fired. The map object is:
     *   
     *   - key - {string}: name of dependency to be injected into controller
     *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
     *     it is injected and return value it treated as dependency. If result is a promise, it is 
     *     resolved before its value is injected into controller.
     *
     * <a id='url'></a>
     *
     * - **`url`** - {string=} - A url with optional parameters. When a state is navigated or
     *   transitioned to, the `$stateParams` service will be populated with any 
     *   parameters that were passed.
     *
     * <a id='params'></a>
     *
     * - **`params`** - {object=} - An array of parameter names or regular expressions. Only 
     *   use this within a state if you are not using url. Otherwise you can specify your
     *   parameters within the url. When a state is navigated or transitioned to, the 
     *   $stateParams service will be populated with any parameters that were passed.
     *
     * <a id='views'></a>
     *
     * - **`views`** - {object=} - Use the views property to set up multiple views or to target views
     *   manually/explicitly.
     *
     * <a id='abstract'></a>
     *
     * - **`abstract`** - {boolean=} - An abstract state will never be directly activated, 
     *   but can provide inherited properties to its common children states.
     *
     * <a id='onEnter'></a>
     *
     * - **`onEnter`** - {object=} - Callback function for when a state is entered. Good way
     *   to trigger an action or dispatch an event, such as opening a dialog.
     *
     * <a id='onExit'></a>
     *
     * - **`onExit`** - {object=} - Callback function for when a state is exited. Good way to
     *   trigger an action or dispatch an event, such as opening a dialog.
     *
     * <a id='reloadOnSearch'></a>
     *
     * - **`reloadOnSearch = true`** - {boolean=} - If `false`, will not retrigger the same state 
     *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
     *   Useful for when you'd like to modify $location.search() without triggering a reload.
     *
     * <a id='data'></a>
     *
     * - **`data`** - {object=} - Arbitrary data object, useful for custom configuration.
     *
     * @example
     * <pre>
     * // Some state name examples
     *
     * // stateName can be a single top-level name (must be unique).
     * $stateProvider.state("home", {});
     *
     * // Or it can be a nested state name. This state is a child of the 
     * // above "home" state.
     * $stateProvider.state("home.newest", {});
     *
     * // Nest states as deeply as needed.
     * $stateProvider.state("home.newest.abc.xyz.inception", {});
     *
     * // state() returns $stateProvider, so you can chain state declarations.
     * $stateProvider
     *   .state("home", {})
     *   .state("about", {})
     *   .state("contacts", {});
     * </pre>
     *
     * @param {string} name A unique state name, e.g. "home", "about", "contacts". 
     * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
     * @param {object} definition State configuration object.
     */
    this.state = state;
    function state(name, definition) {
      /*jshint validthis: true */
      if (isObject(name)) definition = name;
      else definition.name = name;
      registerState(definition);
      return this;
    }
  
    /**
     * @ngdoc object
     * @name ui.router.state.$state
     *
     * @requires $rootScope
     * @requires $q
     * @requires ui.router.state.$view
     * @requires $injector
     * @requires ui.router.util.$resolve
     * @requires ui.router.state.$stateParams
     *
     * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
     * you'd like to test against the current active state.
     * @property {object} current A reference to the state's config object. However 
     * you passed it in. Useful for accessing custom data.
     * @property {object} transition Currently pending transition. A promise that'll 
     * resolve or reject.
     *
     * @description
     * `$state` service is responsible for representing states as well as transitioning
     * between them. It also provides interfaces to ask for current state or even states
     * you're coming from.
     */
    // $urlRouter is injected just to ensure it gets instantiated
    this.$get = $get;
    $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$location', '$urlRouter', '$browser'];
    function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $location,   $urlRouter,   $browser) {
  
      var TransitionSuperseded = $q.reject(new Error('transition superseded'));
      var TransitionPrevented = $q.reject(new Error('transition prevented'));
      var TransitionAborted = $q.reject(new Error('transition aborted'));
      var TransitionFailed = $q.reject(new Error('transition failed'));
      var currentLocation = $location.url();
      var baseHref = $browser.baseHref();
  
      function syncUrl() {
        if ($location.url() !== currentLocation) {
          $location.url(currentLocation);
          $location.replace();
        }
      }
  
      root.locals = { resolve: null, globals: { $stateParams: {} } };
      $state = {
        params: {},
        current: root.self,
        $current: root,
        transition: null
      };
  
      /**
       * @ngdoc function
       * @name ui.router.state.$state#reload
       * @methodOf ui.router.state.$state
       *
       * @description
       * A method that force reloads the current state. All resolves are re-resolved, events are not re-fired, 
       * and controllers reinstantiated (bug with controllers reinstantiating right now, fixing soon).
       *
       * @example
       * <pre>
       * var app angular.module('app', ['ui.router']);
       *
       * app.controller('ctrl', function ($scope, $state) {
       *   $scope.reload = function(){
       *     $state.reload();
       *   }
       * });
       * </pre>
       *
       * `reload()` is just an alias for:
       * <pre>
       * $state.transitionTo($state.current, $stateParams, { 
       *   reload: true, inherit: false, notify: false 
       * });
       * </pre>
       */
      $state.reload = function reload() {
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: false });
      };
  
      /**
       * @ngdoc function
       * @name ui.router.state.$state#go
       * @methodOf ui.router.state.$state
       *
       * @description
       * Convenience method for transitioning to a new state. `$state.go` calls 
       * `$state.transitionTo` internally but automatically sets options to 
       * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
       * This allows you to easily use an absolute or relative to path and specify 
       * only the parameters you'd like to update (while letting unspecified parameters 
       * inherit from the currently active ancestor states).
       *
       * @example
       * <pre>
       * var app = angular.module('app', ['ui.router']);
       *
       * app.controller('ctrl', function ($scope, $state) {
       *   $scope.changeState = function () {
       *     $state.go('contact.detail');
       *   };
       * });
       * </pre>
       * <img src='../ngdoc_assets/StateGoExamples.png'/>
       *
       * @param {string} to Absolute state name or relative state path. Some examples:
       *
       * - `$state.go('contact.detail')` - will go to the `contact.detail` state
       * - `$state.go('^')` - will go to a parent state
       * - `$state.go('^.sibling')` - will go to a sibling state
       * - `$state.go('.child.grandchild')` - will go to grandchild state
       *
       * @param {object=} params A map of the parameters that will be sent to the state, 
       * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
       * defined parameters. This allows, for example, going to a sibling state that shares parameters
       * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
       * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
       * will get you all current parameters, etc.
       * @param {object=} options Options object. The options are:
       *
       * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
       *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
       * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
       * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
       *    defines which state to be relative from.
       * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
       * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params 
       *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
       *    use this when you want to force a reload when *everything* is the same, including search params.
       *
       * @returns {promise} A promise representing the state of the new transition.
       *
       * Possible success values:
       *
       * - $state.current
       *
       * <br/>Possible rejection values:
       *
       * - 'transition superseded' - when a newer transition has been started after this one
       * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
       * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
       *   when a `$stateNotFound` `event.retry` promise errors.
       * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
       * - *resolve error* - when an error has occurred with a `resolve`
       *
       */
      $state.go = function go(to, params, options) {
        return this.transitionTo(to, params, extend({ inherit: true, relative: $state.$current }, options));
      };
  
      /**
       * @ngdoc function
       * @name ui.router.state.$state#transitionTo
       * @methodOf ui.router.state.$state
       *
       * @description
       * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
       * uses `transitionTo` internally. `$state.go` is recommended in most situations.
       *
       * @example
       * <pre>
       * var app = angular.module('app', ['ui.router']);
       *
       * app.controller('ctrl', function ($scope, $state) {
       *   $scope.changeState = function () {
       *     $state.transitionTo('contact.detail');
       *   };
       * });
       * </pre>
       *
       * @param {string} to State name.
       * @param {object=} toParams A map of the parameters that will be sent to the state,
       * will populate $stateParams.
       * @param {object=} options Options object. The options are:
       *
       * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
       *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
       * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
       * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
       *    defines which state to be relative from.
       * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
       * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params 
       *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
       *    use this when you want to force a reload when *everything* is the same, including search params.
       *
       * @returns {promise} A promise representing the state of the new transition. See
       * {@link ui.router.state.$state#methods_go $state.go}.
       */
      $state.transitionTo = function transitionTo(to, toParams, options) {
        toParams = toParams || {};
        options = extend({
          location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
        }, options || {});
  
        var from = $state.$current, fromParams = $state.params, fromPath = from.path;
        var evt, toState = findState(to, options.relative);
  
        if (!isDefined(toState)) {
          // Broadcast not found event and abort the transition if prevented
          var redirect = { to: to, toParams: toParams, options: options };
  
          /**
           * @ngdoc event
           * @name ui.router.state.$state#$stateNotFound
           * @eventOf ui.router.state.$state
           * @eventType broadcast on root scope
           * @description
           * Fired when a requested state **cannot be found** using the provided state name during transition.
           * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
           * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
           * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
           * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
           *
           * @param {Object} event Event object.
           * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
           * @param {State} fromState Current state object.
           * @param {Object} fromParams Current state params.
           *
           * @example
           *
           * <pre>
           * // somewhere, assume lazy.state has not been defined
           * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
           *
           * // somewhere else
           * $scope.$on('$stateNotFound',
           * function(event, unfoundState, fromState, fromParams){
           *     console.log(unfoundState.to); // "lazy.state"
           *     console.log(unfoundState.toParams); // {a:1, b:2}
           *     console.log(unfoundState.options); // {inherit:false} + default options
           * })
           * </pre>
           */
          evt = $rootScope.$broadcast('$stateNotFound', redirect, from.self, fromParams);
          if (evt.defaultPrevented) {
            syncUrl();
            return TransitionAborted;
          }
  
          // Allow the handler to return a promise to defer state lookup retry
          if (evt.retry) {
            if (options.$retry) {
              syncUrl();
              return TransitionFailed;
            }
            var retryTransition = $state.transition = $q.when(evt.retry);
            retryTransition.then(function() {
              if (retryTransition !== $state.transition) return TransitionSuperseded;
              redirect.options.$retry = true;
              return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
            }, function() {
              return TransitionAborted;
            });
            syncUrl();
            return retryTransition;
          }
  
          // Always retry once if the $stateNotFound was not prevented
          // (handles either redirect changed or state lazy-definition)
          to = redirect.to;
          toParams = redirect.toParams;
          options = redirect.options;
          toState = findState(to, options.relative);
          if (!isDefined(toState)) {
            if (options.relative) throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
            throw new Error("No such state '" + to + "'");
          }
        }
        if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
        if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
        to = toState;
  
        var toPath = to.path;
  
        // Starting from the root of the path, keep all levels that haven't changed
        var keep, state, locals = root.locals, toLocals = [];
        for (keep = 0, state = toPath[keep];
             state && state === fromPath[keep] && equalForKeys(toParams, fromParams, state.ownParams) && !options.reload;
             keep++, state = toPath[keep]) {
          locals = toLocals[keep] = state.locals;
        }
  
        // If we're going to the same state and all locals are kept, we've got nothing to do.
        // But clear 'transition', as we still want to cancel any other pending transitions.
        // TODO: We may not want to bump 'transition' if we're called from a location change that we've initiated ourselves,
        // because we might accidentally abort a legitimate transition initiated from code?
        if (shouldTriggerReload(to, from, locals, options) ) {
          if ( to.self.reloadOnSearch !== false )
            syncUrl();
          $state.transition = null;
          return $q.when($state.current);
        }
  
        // Normalize/filter parameters before we pass them to event handlers etc.
        toParams = normalize(to.params, toParams || {});
  
        // Broadcast start event and cancel the transition if requested
        if (options.notify) {
          /**
           * @ngdoc event
           * @name ui.router.state.$state#$stateChangeStart
           * @eventOf ui.router.state.$state
           * @eventType broadcast on root scope
           * @description
           * Fired when the state transition **begins**. You can use `event.preventDefault()`
           * to prevent the transition from happening and then the transition promise will be
           * rejected with a `'transition prevented'` value.
           *
           * @param {Object} event Event object.
           * @param {State} toState The state being transitioned to.
           * @param {Object} toParams The params supplied to the `toState`.
           * @param {State} fromState The current state, pre-transition.
           * @param {Object} fromParams The params supplied to the `fromState`.
           *
           * @example
           *
           * <pre>
           * $rootScope.$on('$stateChangeStart',
           * function(event, toState, toParams, fromState, fromParams){
           *     event.preventDefault();
           *     // transitionTo() promise will be rejected with
           *     // a 'transition prevented' error
           * })
           * </pre>
           */
          evt = $rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams);
          if (evt.defaultPrevented) {
            syncUrl();
            return TransitionPrevented;
          }
        }
  
        // Resolve locals for the remaining states, but don't update any global state just
        // yet -- if anything fails to resolve the current state needs to remain untouched.
        // We also set up an inheritance chain for the locals here. This allows the view directive
        // to quickly look up the correct definition for each view in the current state. Even
        // though we create the locals object itself outside resolveState(), it is initially
        // empty and gets filled asynchronously. We need to keep track of the promise for the
        // (fully resolved) current locals, and pass this down the chain.
        var resolved = $q.when(locals);
        for (var l=keep; l<toPath.length; l++, state=toPath[l]) {
          locals = toLocals[l] = inherit(locals);
          resolved = resolveState(state, toParams, state===to, resolved, locals);
        }
  
        // Once everything is resolved, we are ready to perform the actual transition
        // and return a promise for the new state. We also keep track of what the
        // current promise is, so that we can detect overlapping transitions and
        // keep only the outcome of the last transition.
        var transition = $state.transition = resolved.then(function () {
          var l, entering, exiting;
  
          if ($state.transition !== transition) return TransitionSuperseded;
  
          // Exit 'from' states not kept
          for (l=fromPath.length-1; l>=keep; l--) {
            exiting = fromPath[l];
            if (exiting.self.onExit) {
              $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
            }
            exiting.locals = null;
          }
  
          // Enter 'to' states not kept
          for (l=keep; l<toPath.length; l++) {
            entering = toPath[l];
            entering.locals = toLocals[l];
            if (entering.self.onEnter) {
              $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
            }
          }
  
          // Run it again, to catch any transitions in callbacks
          if ($state.transition !== transition) return TransitionSuperseded;
  
          // Update globals in $state
          $state.$current = to;
          $state.current = to.self;
          $state.params = toParams;
          copy($state.params, $stateParams);
          $state.transition = null;
  
          // Update $location
          var toNav = to.navigable;
          if (options.location && toNav) {
            $location.url(toNav.url.format(toNav.locals.globals.$stateParams));
  
            if (options.location === 'replace') {
              $location.replace();
            }
          }
  
          if (options.notify) {
          /**
           * @ngdoc event
           * @name ui.router.state.$state#$stateChangeSuccess
           * @eventOf ui.router.state.$state
           * @eventType broadcast on root scope
           * @description
           * Fired once the state transition is **complete**.
           *
           * @param {Object} event Event object.
           * @param {State} toState The state being transitioned to.
           * @param {Object} toParams The params supplied to the `toState`.
           * @param {State} fromState The current state, pre-transition.
           * @param {Object} fromParams The params supplied to the `fromState`.
           */
            $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
          }
          currentLocation = $location.url();
  
          return $state.current;
        }, function (error) {
          if ($state.transition !== transition) return TransitionSuperseded;
  
          $state.transition = null;
          /**
           * @ngdoc event
           * @name ui.router.state.$state#$stateChangeError
           * @eventOf ui.router.state.$state
           * @eventType broadcast on root scope
           * @description
           * Fired when an **error occurs** during transition. It's important to note that if you
           * have any errors in your resolve functions (javascript errors, non-existent services, etc)
           * they will not throw traditionally. You must listen for this $stateChangeError event to
           * catch **ALL** errors.
           *
           * @param {Object} event Event object.
           * @param {State} toState The state being transitioned to.
           * @param {Object} toParams The params supplied to the `toState`.
           * @param {State} fromState The current state, pre-transition.
           * @param {Object} fromParams The params supplied to the `fromState`.
           * @param {Error} error The resolve error object.
           */
          $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);
          syncUrl();
  
          return $q.reject(error);
        });
  
        return transition;
      };
  
      /**
       * @ngdoc function
       * @name ui.router.state.$state#is
       * @methodOf ui.router.state.$state
       *
       * @description
       * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
       * but only checks for the full state name. If params is supplied then it will be 
       * tested for strict equality against the current active params object, so all params 
       * must match with none missing and no extras.
       *
       * @example
       * <pre>
       * $state.is('contact.details.item'); // returns true
       * $state.is(contactDetailItemStateObject); // returns true
       *
       * // everything else would return false
       * </pre>
       *
       * @param {string|object} stateName The state name or state object you'd like to check.
       * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like 
       * to test against the current active state.
       * @returns {boolean} Returns true if it is the state.
       */
      $state.is = function is(stateOrName, params) {
        var state = findState(stateOrName);
  
        if (!isDefined(state)) {
          return undefined;
        }
  
        if ($state.$current !== state) {
          return false;
        }
  
        return isDefined(params) && params !== null ? angular.equals($stateParams, params) : true;
      };
  
      /**
       * @ngdoc function
       * @name ui.router.state.$state#includes
       * @methodOf ui.router.state.$state
       *
       * @description
       * A method to determine if the current active state is equal to or is the child of the 
       * state stateName. If any params are passed then they will be tested for a match as well.
       * Not all the parameters need to be passed, just the ones you'd like to test for equality.
       *
       * @example
       * <pre>
       * $state.$current.name = 'contacts.details.item';
       *
       * $state.includes("contacts"); // returns true
       * $state.includes("contacts.details"); // returns true
       * $state.includes("contacts.details.item"); // returns true
       * $state.includes("contacts.list"); // returns false
       * $state.includes("about"); // returns false
       * </pre>
       *
       * @description
       * Basic globing patterns will also work.
       *
       * @example
       * <pre>
       * $state.$current.name = 'contacts.details.item.url';
       *
       * $state.includes("*.details.*.*"); // returns true
       * $state.includes("*.details.**"); // returns true
       * $state.includes("**.item.**"); // returns true
       * $state.includes("*.details.item.url"); // returns true
       * $state.includes("*.details.*.url"); // returns true
       * $state.includes("*.details.*"); // returns false
       * $state.includes("item.**"); // returns false
       * </pre>
       *
       * @param {string} stateOrName A partial name to be searched for within the current state name.
       * @param {object} params A param object, e.g. `{sectionId: section.id}`, 
       * that you'd like to test against the current active state.
       * @returns {boolean} Returns true if it does include the state
       */
  
      $state.includes = function includes(stateOrName, params) {
        if (isString(stateOrName) && isGlob(stateOrName)) {
          if (doesStateMatchGlob(stateOrName)) {
            stateOrName = $state.$current.name;
          } else {
            return false;
          }
        }
  
        var state = findState(stateOrName);
        if (!isDefined(state)) {
          return undefined;
        }
  
        if (!isDefined($state.$current.includes[state.name])) {
          return false;
        }
  
        var validParams = true;
        angular.forEach(params, function(value, key) {
          if (!isDefined($stateParams[key]) || $stateParams[key] !== value) {
            validParams = false;
          }
        });
        return validParams;
      };
  
  
      /**
       * @ngdoc function
       * @name ui.router.state.$state#href
       * @methodOf ui.router.state.$state
       *
       * @description
       * A url generation method that returns the compiled url for the given state populated with the given params.
       *
       * @example
       * <pre>
       * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
       * </pre>
       *
       * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
       * @param {object=} params An object of parameter values to fill the state's required parameters.
       * @param {object=} options Options object. The options are:
       *
       * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
       *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
       *    ancestor with a valid url).
       * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
       * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
       *    defines which state to be relative from.
       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       * 
       * @returns {string} compiled state url
       */
      $state.href = function href(stateOrName, params, options) {
        options = extend({ lossy: true, inherit: false, absolute: false, relative: $state.$current }, options || {});
        var state = findState(stateOrName, options.relative);
        if (!isDefined(state)) return null;
  
        params = inheritParams($stateParams, params || {}, $state.$current, state);
        var nav = (state && options.lossy) ? state.navigable : state;
        var url = (nav && nav.url) ? nav.url.format(normalize(state.params, params || {})) : null;
        if (!$locationProvider.html5Mode() && url) {
          url = "#" + $locationProvider.hashPrefix() + url;
        }
  
        if (baseHref !== '/') {
          if ($locationProvider.html5Mode()) {
            url = baseHref.slice(0, -1) + url;
          } else if (options.absolute){
            url = baseHref.slice(1) + url;
          }
        }
  
        if (options.absolute && url) {
          url = $location.protocol() + '://' + 
                $location.host() + 
                ($location.port() == 80 || $location.port() == 443 ? '' : ':' + $location.port()) + 
                (!$locationProvider.html5Mode() && url ? '/' : '') + 
                url;
        }
        return url;
      };
  
      /**
       * @ngdoc function
       * @name ui.router.state.$state#get
       * @methodOf ui.router.state.$state
       *
       * @description
       * Returns the state configuration object for any specific state or all states.
       *
       * @param {string|object=} stateOrName If provided, will only get the config for
       * the requested state. If not provided, returns an array of ALL state configs.
       * @returns {object|array} State configuration object or array of all objects.
       */
      $state.get = function (stateOrName, context) {
        if (!isDefined(stateOrName)) {
          var list = [];
          forEach(states, function(state) { list.push(state.self); });
          return list;
        }
        var state = findState(stateOrName, context);
        return (state && state.self) ? state.self : null;
      };
  
      function resolveState(state, params, paramsAreFiltered, inherited, dst) {
        // Make a restricted $stateParams with only the parameters that apply to this state if
        // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
        // we also need $stateParams to be available for any $injector calls we make during the
        // dependency resolution process.
        var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params, params);
        var locals = { $stateParams: $stateParams };
  
        // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
        // We're also including $stateParams in this; that way the parameters are restricted
        // to the set that should be visible to the state, and are independent of when we update
        // the global $state and $stateParams values.
        dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
        var promises = [ dst.resolve.then(function (globals) {
          dst.globals = globals;
        }) ];
        if (inherited) promises.push(inherited);
  
        // Resolve template and dependencies for all views.
        forEach(state.views, function (view, name) {
          var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
          injectables.$template = [ function () {
            return $view.load(name, { view: view, locals: locals, params: $stateParams, notify: false }) || '';
          }];
  
          promises.push($resolve.resolve(injectables, locals, dst.resolve, state).then(function (result) {
            // References to the controller (only instantiated at link time)
            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
              var injectLocals = angular.extend({}, injectables, locals);
              result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
            } else {
              result.$$controller = view.controller;
            }
            // Provide access to the state itself for internal use
            result.$$state = state;
            result.$$controllerAs = view.controllerAs;
            dst[name] = result;
          }));
        });
  
        // Wait for all the promises and then return the activation object
        return $q.all(promises).then(function (values) {
          return dst;
        });
      }
  
      return $state;
    }
  
    function shouldTriggerReload(to, from, locals, options) {
      if ( to === from && ((locals === from.locals && !options.reload) || (to.self.reloadOnSearch === false)) ) {
        return true;
      }
    }
  }
  
  angular.module('ui.router.state')
    .value('$stateParams', {})
    .provider('$state', $StateProvider);
  
  
  $ViewProvider.$inject = [];
  function $ViewProvider() {
  
    this.$get = $get;
    /**
     * @ngdoc object
     * @name ui.router.state.$view
     *
     * @requires ui.router.util.$templateFactory
     * @requires $rootScope
     *
     * @description
     *
     */
    $get.$inject = ['$rootScope', '$templateFactory'];
    function $get(   $rootScope,   $templateFactory) {
      return {
        // $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
        /**
         * @ngdoc function
         * @name ui.router.state.$view#load
         * @methodOf ui.router.state.$view
         *
         * @description
         *
         * @param {string} name name
         * @param {object} options option object.
         */
        load: function load(name, options) {
          var result, defaults = {
            template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {}
          };
          options = extend(defaults, options);
  
          if (options.view) {
            result = $templateFactory.fromConfig(options.view, options.params, options.locals);
          }
          if (result && options.notify) {
          /**
           * @ngdoc event
           * @name ui.router.state.$state#$viewContentLoading
           * @eventOf ui.router.state.$view
           * @eventType broadcast on root scope
           * @description
           *
           * Fired once the view **begins loading**, *before* the DOM is rendered.
           *
           * @param {Object} event Event object.
           * @param {Object} viewConfig The view config properties (template, controller, etc).
           *
           * @example
           *
           * <pre>
           * $scope.$on('$viewContentLoading',
           * function(event, viewConfig){
           *     // Access to all the view config properties.
           *     // and one special property 'targetView'
           *     // viewConfig.targetView
           * });
           * </pre>
           */
            $rootScope.$broadcast('$viewContentLoading', options);
          }
          return result;
        }
      };
    }
  }
  
  angular.module('ui.router.state').provider('$view', $ViewProvider);
  
  /**
   * @ngdoc object
   * @name ui.router.state.$uiViewScrollProvider
   *
   * @description
   * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
   */
  function $ViewScrollProvider() {
  
    var useAnchorScroll = false;
  
    /**
     * @ngdoc function
     * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
     * @methodOf ui.router.state.$uiViewScrollProvider
     *
     * @description
     * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
     * scrolling based on the url anchor.
     */
    this.useAnchorScroll = function () {
      useAnchorScroll = true;
    };
  
    /**
     * @ngdoc object
     * @name ui.router.state.$uiViewScroll
     *
     * @requires $anchorScroll
     * @requires $timeout
     *
     * @description
     * When called with a jqLite element, it scrolls the element into view (after a
     * `$timeout` so the DOM has time to refresh).
     *
     * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
     * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
     */
    this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
      if (useAnchorScroll) {
        return $anchorScroll;
      }
  
      return function ($element) {
        $timeout(function () {
          $element[0].scrollIntoView();
        }, 0, false);
      };
    }];
  }
  
  angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);
  
  /**
   * @ngdoc directive
   * @name ui.router.state.directive:ui-view
   *
   * @requires ui.router.state.$state
   * @requires $compile
   * @requires $controller
   * @requires $injector
   * @requires ui.router.state.$uiViewScroll
   * @requires $document
   *
   * @restrict ECA
   *
   * @description
   * The ui-view directive tells $state where to place your templates.
   *
   * @param {string=} ui-view A view name. The name should be unique amongst the other views in the
   * same state. You can have views of the same name that live in different states.
   *
   * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
   * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
   * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
   * scroll ui-view elements into view when they are populated during a state activation.
   *
   * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
   * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
   *
   * @param {string=} onload Expression to evaluate whenever the view updates.
   * 
   * @example
   * A view can be unnamed or named. 
   * <pre>
   * <!-- Unnamed -->
   * <div ui-view></div> 
   * 
   * <!-- Named -->
   * <div ui-view="viewName"></div>
   * </pre>
   *
   * You can only have one unnamed view within any template (or root html). If you are only using a 
   * single view and it is unnamed then you can populate it like so:
   * <pre>
   * <div ui-view></div> 
   * $stateProvider.state("home", {
   *   template: "<h1>HELLO!</h1>"
   * })
   * </pre>
   * 
   * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
   * config property, by name, in this case an empty name:
   * <pre>
   * $stateProvider.state("home", {
   *   views: {
   *     "": {
   *       template: "<h1>HELLO!</h1>"
   *     }
   *   }    
   * })
   * </pre>
   * 
   * But typically you'll only use the views property if you name your view or have more than one view 
   * in the same template. There's not really a compelling reason to name a view if its the only one, 
   * but you could if you wanted, like so:
   * <pre>
   * <div ui-view="main"></div>
   * </pre> 
   * <pre>
   * $stateProvider.state("home", {
   *   views: {
   *     "main": {
   *       template: "<h1>HELLO!</h1>"
   *     }
   *   }    
   * })
   * </pre>
   * 
   * Really though, you'll use views to set up multiple views:
   * <pre>
   * <div ui-view></div>
   * <div ui-view="chart"></div> 
   * <div ui-view="data"></div> 
   * </pre>
   * 
   * <pre>
   * $stateProvider.state("home", {
   *   views: {
   *     "": {
   *       template: "<h1>HELLO!</h1>"
   *     },
   *     "chart": {
   *       template: "<chart_thing/>"
   *     },
   *     "data": {
   *       template: "<data_thing/>"
   *     }
   *   }    
   * })
   * </pre>
   *
   * Examples for `autoscroll`:
   *
   * <pre>
   * <!-- If autoscroll present with no expression,
   *      then scroll ui-view into view -->
   * <ui-view autoscroll/>
   *
   * <!-- If autoscroll present with valid expression,
   *      then scroll ui-view into view if expression evaluates to true -->
   * <ui-view autoscroll='true'/>
   * <ui-view autoscroll='false'/>
   * <ui-view autoscroll='scopeVariable'/>
   * </pre>
   */
  $ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll'];
  function $ViewDirective(   $state,   $injector,   $uiViewScroll) {
  
    function getService() {
      return ($injector.has) ? function(service) {
        return $injector.has(service) ? $injector.get(service) : null;
      } : function(service) {
        try {
          return $injector.get(service);
        } catch (e) {
          return null;
        }
      };
    }
  
    var service = getService(),
        $animator = service('$animator'),
        $animate = service('$animate');
  
    // Returns a set of DOM manipulation functions based on which Angular version
    // it should use
    function getRenderer(attrs, scope) {
      var statics = function() {
        return {
          enter: function (element, target, cb) { target.after(element); cb(); },
          leave: function (element, cb) { element.remove(); cb(); }
        };
      };
  
      if ($animate) {
        return {
          enter: function(element, target, cb) { $animate.enter(element, null, target, cb); },
          leave: function(element, cb) { $animate.leave(element, cb); }
        };
      }
  
      if ($animator) {
        var animate = $animator && $animator(scope, attrs);
  
        return {
          enter: function(element, target, cb) {animate.enter(element, null, target); cb(); },
          leave: function(element, cb) { animate.leave(element); cb(); }
        };
      }
  
      return statics();
    }
  
    var directive = {
      restrict: 'ECA',
      terminal: true,
      priority: 400,
      transclude: 'element',
      compile: function (tElement, tAttrs, $transclude) {
        return function (scope, $element, attrs) {
          var previousEl, currentEl, currentScope, latestLocals,
              onloadExp     = attrs.onload || '',
              autoScrollExp = attrs.autoscroll,
              renderer      = getRenderer(attrs, scope);
  
          scope.$on('$stateChangeSuccess', function() {
            updateView(false);
          });
          scope.$on('$viewContentLoading', function() {
            updateView(false);
          });
  
          updateView(true);
  
          function cleanupLastView() {
            if (previousEl) {
              previousEl.remove();
              previousEl = null;
            }
  
            if (currentScope) {
              currentScope.$destroy();
              currentScope = null;
            }
  
            if (currentEl) {
              renderer.leave(currentEl, function() {
                previousEl = null;
              });
  
              previousEl = currentEl;
              currentEl = null;
            }
          }
  
          function updateView(firstTime) {
            var newScope        = scope.$new(),
                name            = currentEl && currentEl.data('$uiViewName'),
                previousLocals  = name && $state.$current && $state.$current.locals[name];
  
            if (!firstTime && previousLocals === latestLocals) return; // nothing to do
  
            var clone = $transclude(newScope, function(clone) {
              renderer.enter(clone, $element, function onUiViewEnter() {
                if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                  $uiViewScroll(clone);
                }
              });
              cleanupLastView();
            });
  
            latestLocals = $state.$current.locals[clone.data('$uiViewName')];
  
            currentEl = clone;
            currentScope = newScope;
            /**
             * @ngdoc event
             * @name ui.router.state.directive:ui-view#$viewContentLoaded
             * @eventOf ui.router.state.directive:ui-view
             * @eventType emits on ui-view directive scope
             * @description           *
             * Fired once the view is **loaded**, *after* the DOM is rendered.
             *
             * @param {Object} event Event object.
             */
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          }
        };
      }
    };
  
    return directive;
  }
  
  $ViewDirectiveFill.$inject = ['$compile', '$controller', '$state'];
  function $ViewDirectiveFill ($compile, $controller, $state) {
    return {
      restrict: 'ECA',
      priority: -400,
      compile: function (tElement) {
        var initial = tElement.html();
        return function (scope, $element, attrs) {
          var name      = attrs.uiView || attrs.name || '',
              inherited = $element.inheritedData('$uiView');
  
          if (name.indexOf('@') < 0) {
            name = name + '@' + (inherited ? inherited.state.name : '');
          }
  
          $element.data('$uiViewName', name);
  
          var current = $state.$current,
              locals  = current && current.locals[name];
  
          if (! locals) {
            return;
          }
  
          $element.data('$uiView', { name: name, state: locals.$$state });
          $element.html(locals.$template ? locals.$template : initial);
  
          var link = $compile($element.contents());
  
          if (locals.$$controller) {
            locals.$scope = scope;
            var controller = $controller(locals.$$controller, locals);
            if (locals.$$controllerAs) {
              scope[locals.$$controllerAs] = controller;
            }
            $element.data('$ngControllerController', controller);
            $element.children().data('$ngControllerController', controller);
          }
  
          link(scope);
        };
      }
    };
  }
  
  angular.module('ui.router.state').directive('uiView', $ViewDirective);
  angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);
  
  function parseStateRef(ref) {
    var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
    if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
    return { state: parsed[1], paramExpr: parsed[3] || null };
  }
  
  function stateContext(el) {
    var stateData = el.parent().inheritedData('$uiView');
  
    if (stateData && stateData.state && stateData.state.name) {
      return stateData.state;
    }
  }
  
  /**
   * @ngdoc directive
   * @name ui.router.state.directive:ui-sref
   *
   * @requires ui.router.state.$state
   * @requires $timeout
   *
   * @restrict A
   *
   * @description
   * A directive that binds a link (`<a>` tag) to a state. If the state has an associated 
   * URL, the directive will automatically generate & update the `href` attribute via 
   * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking 
   * the link will trigger a state transition with optional parameters. 
   *
   * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be 
   * handled natively by the browser.
   *
   * You can also use relative state paths within ui-sref, just like the relative 
   * paths passed to `$state.go()`. You just need to be aware that the path is relative
   * to the state that the link lives in, in other words the state that loaded the 
   * template containing the link.
   *
   * You can specify options to pass to {@link ui.router.state.$state#go $state.go()}
   * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
   * and `reload`.
   *
   * @example
   * Here's an example of how you'd use ui-sref and how it would compile. If you have the 
   * following template:
   * <pre>
   * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a>
   * 
   * <ul>
   *     <li ng-repeat="contact in contacts">
   *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
   *     </li>
   * </ul>
   * </pre>
   * 
   * Then the compiled html would be (assuming Html5Mode is off):
   * <pre>
   * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a>
   * 
   * <ul>
   *     <li ng-repeat="contact in contacts">
   *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
   *     </li>
   *     <li ng-repeat="contact in contacts">
   *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
   *     </li>
   *     <li ng-repeat="contact in contacts">
   *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
   *     </li>
   * </ul>
   *
   * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
   * </pre>
   *
   * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
   * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#go $state.go()}
   */
  $StateRefDirective.$inject = ['$state', '$timeout'];
  function $StateRefDirective($state, $timeout) {
    var allowedOptions = ['location', 'inherit', 'reload'];
  
    return {
      restrict: 'A',
      require: '?^uiSrefActive',
      link: function(scope, element, attrs, uiSrefActive) {
        var ref = parseStateRef(attrs.uiSref);
        var params = null, url = null, base = stateContext(element) || $state.$current;
        var isForm = element[0].nodeName === "FORM";
        var attr = isForm ? "action" : "href", nav = true;
  
        var options = {
          relative: base
        };
        var optionsOverride = scope.$eval(attrs.uiSrefOpts) || {};
        angular.forEach(allowedOptions, function(option) {
          if (option in optionsOverride) {
            options[option] = optionsOverride[option];
          }
        });
  
        var update = function(newVal) {
          if (newVal) params = newVal;
          if (!nav) return;
  
          var newHref = $state.href(ref.state, params, options);
  
          if (uiSrefActive) {
            uiSrefActive.$$setStateInfo(ref.state, params);
          }
          if (!newHref) {
            nav = false;
            return false;
          }
          element[0][attr] = newHref;
        };
  
        if (ref.paramExpr) {
          scope.$watch(ref.paramExpr, function(newVal, oldVal) {
            if (newVal !== params) update(newVal);
          }, true);
          params = scope.$eval(ref.paramExpr);
        }
        update();
  
        if (isForm) return;
  
        element.bind("click", function(e) {
          var button = e.which || e.button;
          if ( !(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr('target')) ) {
            // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
            $timeout(function() {
              $state.go(ref.state, params, options);
            });
            e.preventDefault();
          }
        });
      }
    };
  }
  
  /**
   * @ngdoc directive
   * @name ui.router.state.directive:ui-sref-active
   *
   * @requires ui.router.state.$state
   * @requires ui.router.state.$stateParams
   * @requires $interpolate
   *
   * @restrict A
   *
   * @description
   * A directive working alongside ui-sref to add classes to an element when the 
   * related ui-sref directive's state is active, and removing them when it is inactive.
   * The primary use-case is to simplify the special appearance of navigation menus 
   * relying on `ui-sref`, by having the "active" state's menu button appear different,
   * distinguishing it from the inactive menu items.
   *
   * @example
   * Given the following template:
   * <pre>
   * <ul>
   *   <li ui-sref-active="active" class="item">
   *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
   *   </li>
   * </ul>
   * </pre>
   * 
   * When the app state is "app.user", and contains the state parameter "user" with value "bilbobaggins", 
   * the resulting HTML will appear as (note the 'active' class):
   * <pre>
   * <ul>
   *   <li ui-sref-active="active" class="item active">
   *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
   *   </li>
   * </ul>
   * </pre>
   * 
   * The class name is interpolated **once** during the directives link time (any further changes to the 
   * interpolated value are ignored). 
   * 
   * Multiple classes may be specified in a space-separated format:
   * <pre>
   * <ul>
   *   <li ui-sref-active='class1 class2 class3'>
   *     <a ui-sref="app.user">link</a>
   *   </li>
   * </ul>
   * </pre>
   */
  $StateActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
  function $StateActiveDirective($state, $stateParams, $interpolate) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var state, params, activeClass;
  
        // There probably isn't much point in $observing this
        activeClass = $interpolate($attrs.uiSrefActive || '', false)($scope);
  
        // Allow uiSref to communicate with uiSrefActive
        this.$$setStateInfo = function(newState, newParams) {
          state = $state.get(newState, stateContext($element));
          params = newParams;
          update();
        };
  
        $scope.$on('$stateChangeSuccess', update);
  
        // Update route state
        function update() {
          if ($state.$current.self === state && matchesParams()) {
            $element.addClass(activeClass);
          } else {
            $element.removeClass(activeClass);
          }
        }
  
        function matchesParams() {
          return !params || equalForKeys(params, $stateParams);
        }
      }]
    };
  }
  
  angular.module('ui.router.state')
    .directive('uiSref', $StateRefDirective)
    .directive('uiSrefActive', $StateActiveDirective);
  
  /**
   * @ngdoc filter
   * @name ui.router.state.filter:isState
   *
   * @requires ui.router.state.$state
   *
   * @description
   * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
   */
  $IsStateFilter.$inject = ['$state'];
  function $IsStateFilter($state) {
    return function(state) {
      return $state.is(state);
    };
  }
  
  /**
   * @ngdoc filter
   * @name ui.router.state.filter:includedByState
   *
   * @requires ui.router.state.$state
   *
   * @description
   * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
   */
  $IncludedByStateFilter.$inject = ['$state'];
  function $IncludedByStateFilter($state) {
    return function(state) {
      return $state.includes(state);
    };
  }
  
  angular.module('ui.router.state')
    .filter('isState', $IsStateFilter)
    .filter('includedByState', $IncludedByStateFilter);
  
  /*
   * @ngdoc object
   * @name ui.router.compat.$routeProvider
   *
   * @requires ui.router.state.$stateProvider
   * @requires ui.router.router.$urlRouterProvider
   *
   * @description
   * `$routeProvider` of the `ui.router.compat` module overwrites the existing
   * `routeProvider` from the core. This is done to provide compatibility between
   * the UI Router and the core router.
   *
   * It also provides a `when()` method to register routes that map to certain urls.
   * Behind the scenes it actually delegates either to 
   * {@link ui.router.router.$urlRouterProvider $urlRouterProvider} or to the 
   * {@link ui.router.state.$stateProvider $stateProvider} to postprocess the given 
   * router definition object.
   */
  $RouteProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
  function $RouteProvider(  $stateProvider,    $urlRouterProvider) {
  
    var routes = [];
  
    onEnterRoute.$inject = ['$$state'];
    function onEnterRoute(   $$state) {
      /*jshint validthis: true */
      this.locals = $$state.locals.globals;
      this.params = this.locals.$stateParams;
    }
  
    function onExitRoute() {
      /*jshint validthis: true */
      this.locals = null;
      this.params = null;
    }
  
    this.when = when;
    /*
     * @ngdoc function
     * @name ui.router.compat.$routeProvider#when
     * @methodOf ui.router.compat.$routeProvider
     *
     * @description
     * Registers a route with a given route definition object. The route definition
     * object has the same interface the angular core route definition object has.
     * 
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router.compat']);
     *
     * app.config(function ($routeProvider) {
     *   $routeProvider.when('home', {
     *     controller: function () { ... },
     *     templateUrl: 'path/to/template'
     *   });
     * });
     * </pre>
     *
     * @param {string} url URL as string
     * @param {object} route Route definition object
     *
     * @return {object} $routeProvider - $routeProvider instance
     */
    function when(url, route) {
      /*jshint validthis: true */
      if (route.redirectTo != null) {
        // Redirect, configure directly on $urlRouterProvider
        var redirect = route.redirectTo, handler;
        if (isString(redirect)) {
          handler = redirect; // leave $urlRouterProvider to handle
        } else if (isFunction(redirect)) {
          // Adapt to $urlRouterProvider API
          handler = function (params, $location) {
            return redirect(params, $location.path(), $location.search());
          };
        } else {
          throw new Error("Invalid 'redirectTo' in when()");
        }
        $urlRouterProvider.when(url, handler);
      } else {
        // Regular route, configure as state
        $stateProvider.state(inherit(route, {
          parent: null,
          name: 'route:' + encodeURIComponent(url),
          url: url,
          onEnter: onEnterRoute,
          onExit: onExitRoute
        }));
      }
      routes.push(route);
      return this;
    }
  
    /*
     * @ngdoc object
     * @name ui.router.compat.$route
     *
     * @requires ui.router.state.$state
     * @requires $rootScope
     * @requires $routeParams
     *
     * @property {object} routes - Array of registered routes.
     * @property {object} params - Current route params as object.
     * @property {string} current - Name of the current route.
     *
     * @description
     * The `$route` service provides interfaces to access defined routes. It also let's
     * you access route params through `$routeParams` service, so you have fully
     * control over all the stuff you would actually get from angular's core `$route`
     * service.
     */
    this.$get = $get;
    $get.$inject = ['$state', '$rootScope', '$routeParams'];
    function $get(   $state,   $rootScope,   $routeParams) {
  
      var $route = {
        routes: routes,
        params: $routeParams,
        current: undefined
      };
  
      function stateAsRoute(state) {
        return (state.name !== '') ? state : undefined;
      }
  
      $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        $rootScope.$broadcast('$routeChangeStart', stateAsRoute(to), stateAsRoute(from));
      });
  
      $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        $route.current = stateAsRoute(to);
        $rootScope.$broadcast('$routeChangeSuccess', stateAsRoute(to), stateAsRoute(from));
        copy(toParams, $route.params);
      });
  
      $rootScope.$on('$stateChangeError', function (ev, to, toParams, from, fromParams, error) {
        $rootScope.$broadcast('$routeChangeError', stateAsRoute(to), stateAsRoute(from), error);
      });
  
      return $route;
    }
  }
  
  angular.module('ui.router.compat')
    .provider('$route', $RouteProvider)
    .directive('ngView', $ViewDirective);
  })(window, window.angular);
  global.define = __define;
  return module.exports;
});

System.register("github:systemjs/plugin-css@0.1.0", ["github:systemjs/plugin-css@0.1.0/css"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/systemjs/plugin-css@0.1.0.js";
  var __dirname = "jspm_packages/github/systemjs";
  module.exports = require("github:systemjs/plugin-css@0.1.0/css");
  global.define = __define;
  return module.exports;
});

System.register("github:angular/bower-angular@1.3.3", ["github:angular/bower-angular@1.3.3/angular.min"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular/bower-angular@1.3.3.js";
  var __dirname = "jspm_packages/github/angular";
  module.exports = require("github:angular/bower-angular@1.3.3/angular.min");
  global.define = __define;
  return module.exports;
});

System.register("github:angular/bower-angular-animate@1.3.3", ["github:angular/bower-angular-animate@1.3.3/angular-animate"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular/bower-angular-animate@1.3.3.js";
  var __dirname = "jspm_packages/github/angular";
  module.exports = require("github:angular/bower-angular-animate@1.3.3/angular-animate");
  global.define = __define;
  return module.exports;
});

System.register("github:angular/bower-angular-sanitize@1.3.3", ["github:angular/bower-angular-sanitize@1.3.3/angular-sanitize"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular/bower-angular-sanitize@1.3.3.js";
  var __dirname = "jspm_packages/github/angular";
  module.exports = require("github:angular/bower-angular-sanitize@1.3.3/angular-sanitize");
  global.define = __define;
  return module.exports;
});

System.register("github:angular-ui/ui-router@0.2.10", ["github:angular-ui/ui-router@0.2.10/release/angular-ui-router"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular-ui/ui-router@0.2.10.js";
  var __dirname = "jspm_packages/github/angular-ui";
  module.exports = require("github:angular-ui/ui-router@0.2.10/release/angular-ui-router");
  global.define = __define;
  return module.exports;
});

System.register("github:driftyco/ionic-bower@1.0.0-beta.13", ["github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/driftyco/ionic-bower@1.0.0-beta.13.js";
  var __dirname = "jspm_packages/github/driftyco";
  module.exports = require("github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular");
  global.define = __define;
  return module.exports;
});
