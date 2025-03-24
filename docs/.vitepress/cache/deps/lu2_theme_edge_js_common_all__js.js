// node_modules/.pnpm/lu2@2024.9.2/node_modules/lu2/theme/edge/js/common/all.js
(function(doc, win) {
  if (win.isKeyEventBind || !doc.addEventListener) {
    return {};
  }
  var ua = navigator.platform || navigator.userAgent;
  var system = "windows";
  if (/mac/i.test(ua)) {
    system = "mac";
  }
  var browser = "chrome";
  if (typeof doc.mozFullScreen != "undefined") {
    browser = "moz";
  } else if (typeof doc.msHidden != "undefined" || typeof doc.hidden == "undefined") {
    browser = "ie";
  }
  var keyPrefix = {
    windows: {
      ctrlKey: false,
      altKey: true,
      shiftKey: false
    },
    mac: {
      ctrlKey: true,
      altKey: true,
      shiftKey: false
    }
  }[system];
  var U = function(a, b) {
    if (!a) {
      return "";
    }
    b = b || "x";
    var c = "";
    var d = 0;
    var e;
    for (d; d < a.length; d += 1) a.charCodeAt(d) >= 55296 && a.charCodeAt(d) <= 56319 ? (e = (65536 + 1024 * (Number(a.charCodeAt(d)) - 55296) + Number(a.charCodeAt(d + 1)) - 56320).toString(16), d += 1) : e = a.charCodeAt(d).toString(16), c += b + e;
    return c.substr(b.length);
  };
  var timerTips = null;
  var tips = function(arrEles) {
    if (doc.hasTipsShow) {
      return;
    }
    var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
    var scrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
    arrEles.forEach(function(ele) {
      if (ele.clientHeight * ele.clientWidth == 0) {
        return;
      }
      var accesskey = ele.getAttribute("accesskey");
      var arrAccesskey = [];
      for (var key in keyPrefix) {
        if (keyPrefix[key]) {
          arrAccesskey.push(key);
        }
      }
      arrAccesskey.push(accesskey);
      var bounding = ele.getBoundingClientRect();
      var div = doc.createElement("div");
      div.className = "ui-kbd-tips AK_Tips";
      div.setAttribute("style", "top:" + (bounding.top + scrollTop) + "px;left:" + (bounding.left + scrollLeft) + "px;");
      div.innerHTML = arrAccesskey.map(function(key2) {
        return "<kbd>" + key2.replace("Key", "") + "</kbd>";
      }).join("+");
      doc.body.appendChild(div);
      div.fromTarget = ele;
    });
    doc.hasTipsShow = true;
    timerTips = setTimeout(function() {
      removeTips();
    }, 3e3);
  };
  var removeTips = function() {
    clearTimeout(timerTips);
    var elesTips = doc.querySelectorAll(".AK_Tips");
    [].slice.call(elesTips).forEach(function(ele) {
      if (ele.fromTarget) {
        ele.fromTarget.hasTipsShow = null;
      }
      doc.body.removeChild(ele);
    });
    doc.hasTipsShow = null;
  };
  doc.addEventListener("keydown", function(event) {
    var isTargetInputable = false;
    var eleTarget = event.target || doc.activeElement;
    var tagName = eleTarget.tagName.toLowerCase();
    if (tagName == "textarea" || tagName == "input" && /checkbox|radio|select|file|button|image|hidden/i.test(eleTarget.type) == false) {
      isTargetInputable = true;
    }
    var elesOwnAccesskey = doc.querySelectorAll("a[accesskey],area[accesskey],button[accesskey],input[accesskey],label[accesskey],legend[accesskey],textarea[accesskey]");
    if (elesOwnAccesskey.length == 0) {
      return;
    }
    var arrElesOwnAccesskey = [].slice.call(elesOwnAccesskey);
    var arrAcceeekey = arrElesOwnAccesskey.map(function(ele) {
      return ele.getAttribute("accesskey");
    });
    var indexMatch = -1;
    arrAcceeekey.forEach(function(accesskey, index) {
      if (event.key && event.key == accesskey || event.keyIdentifier && parseInt(event.keyIdentifier.toLowerCase().replace("u+", ""), 16) == parseInt(U(accesskey), 16)) {
        indexMatch = index;
        return false;
      }
    });
    if (event.altKey == false && event.shiftKey == false && event.ctrlKey == false) {
      if (isTargetInputable) {
        return;
      }
      if (arrElesOwnAccesskey[indexMatch]) {
        setTimeout(function() {
          arrElesOwnAccesskey[indexMatch].focus();
        }, 1);
        event.preventDefault();
      }
    } else if (event.altKey == false && event.shiftKey == true && event.ctrlKey == false) {
      if (event.keyCode == 191 && !isTargetInputable) {
        doc.hasTipsShow ? removeTips() : tips(arrElesOwnAccesskey);
      }
    } else if (arrElesOwnAccesskey[indexMatch] && !isTargetInputable && (browser == "ie" || browser == "moz") && event.altKey && !event.shiftKey && !event.ctrlKey) {
      arrElesOwnAccesskey[indexMatch].click();
    }
  });
  doc.addEventListener("mousedown", function() {
    removeTips();
  });
  var keycode = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    13: "enter",
    9: "tab",
    27: "esc"
  };
  var className = "ui-outline";
  var classList = {
    add: function(ele) {
      ele.classList.add(className);
    },
    remove: function(ele) {
      ele.classList.remove(className);
    },
    removeAll: function() {
      [].slice.call(doc.querySelectorAll("." + className)).forEach(function(ele) {
        classList.remove(ele);
      });
    },
    has: function(ele) {
      ele.classList.contains(className);
    }
  };
  var timerKeyEvent = null;
  win.isKeyEvent = false;
  doc.addEventListener("keydown", function(event) {
    win.isKeyEvent = true;
    clearTimeout(timerKeyEvent);
    timerKeyEvent = setTimeout(function() {
      win.isKeyEvent = false;
    }, 100);
    var keyName = keycode[event.keyCode];
    if (!keyName) {
      return;
    }
    var trigger = doc.activeElement;
    if (!trigger || /body/i.test(trigger.tagName)) {
      return;
    }
    if (keyName == "enter" && (/^radio|checkbox$/i.test(trigger.type) || trigger.getAttribute("tabindex") == "0")) {
      trigger.click();
      event.preventDefault();
      return;
    }
    var eleFirstMatchAttrTarget = null;
    var eleEscAll = doc.querySelectorAll(".ESC");
    if (keyName == "esc" && eleEscAll.length) {
      [].slice.call(eleEscAll).forEach(function(eleEsc) {
        var idEsc = eleEsc.id;
        eleFirstMatchAttrTarget = idEsc && doc.querySelector('[data-target="' + idEsc + '"],[data-target2="' + idEsc + '"],ui-drop[target="' + idEsc + '"]');
        if (eleFirstMatchAttrTarget && eleEsc.style.display !== "none" && eleEsc.clientHeight > 0) {
          if (eleFirstMatchAttrTarget.hide) {
            eleFirstMatchAttrTarget.hide();
          } else if (eleFirstMatchAttrTarget["ui-drop"]) {
            eleFirstMatchAttrTarget["ui-drop"].hide();
          } else {
            eleFirstMatchAttrTarget.click();
          }
        } else if (eleEsc == document.activeElement && eleEsc.click) {
          eleEsc.click();
        }
      });
    }
    var attrFocus = trigger.getAttribute("data-focus");
    var attrTarget = trigger.getAttribute("data-target");
    var target = null;
    if (!attrFocus && !attrTarget) {
      return;
    }
    if (attrFocus) {
      target = doc.getElementById(attrFocus);
    } else if (attrTarget) {
      target = doc.getElementById(attrTarget);
    }
    if (!target || target.clientWidth == 0 && target.clientHeight == 0) {
      return;
    }
    if (keyName == "tab") {
      classList.removeAll();
      var eleFirstFocusable = target;
      if (!target.getAttribute("tabindex")) {
        eleFirstFocusable = target.querySelector("a[href], button:not(:disabled), input:not(:disabled)");
      }
      if (eleFirstFocusable) {
        eleFirstFocusable.focus();
      }
      return;
    }
    if (keyName == "enter") {
      var eleFocus = target.querySelector("." + className);
      if (eleFocus && attrFocus) {
        event.preventDefault();
        eleFocus.click();
        return;
      }
      if (attrTarget) {
        return;
      }
    }
    if (keyName == "esc") {
      eleFirstMatchAttrTarget = doc.querySelector('a[data-target="' + attrTarget + '"],input[data-target="' + attrTarget + '"]');
      if (attrFocus) {
        trigger.blur();
      } else if (eleFirstMatchAttrTarget && /ESC/.test(eleFirstMatchAttrTarget.className) == false) {
        eleFirstMatchAttrTarget.click();
      }
      return;
    }
    var arrEleFocusable = [].slice.call(target.querySelectorAll("a[href], button:not(:disabled), input:not(:disabled)"));
    var index = -1;
    if (arrEleFocusable.length == 0) {
      return;
    }
    arrEleFocusable.forEach(function(ele, indexFocus) {
      if (attrFocus) {
        if (classList.has(ele)) {
          index = indexFocus;
        }
      } else if (trigger == ele) {
        index = indexFocus;
      }
      classList.remove(ele);
    });
    event.preventDefault();
    if (keyName == "left" || keyName == "up") {
      index--;
      if (index < 0) {
        index = -1;
      }
    } else if (keyName == "right" || keyName == "down") {
      index++;
      if (index > arrEleFocusable.length - 1) {
        index = arrEleFocusable.length;
      }
    }
    if (arrEleFocusable[index]) {
      if (attrFocus) {
        classList.add(arrEleFocusable[index]);
      } else {
        arrEleFocusable[index].focus();
      }
    }
  });
  doc.addEventListener("mousedown", function(event) {
    var target = event.target;
    if (target && !classList.has(target)) {
      classList.removeAll();
    }
  });
  doc.addEventListener("click", function(event) {
    var target = event.target;
    var eleActive = doc.activeElement;
    var tabindex = target.getAttribute("tabindex") || "-1";
    if (target && target == eleActive && (/^radio|checkbox$/i.test(eleActive.type) || tabindex >= 0) && win.isKeyEvent == false && /none/.test(getComputedStyle(target).outline) == false) {
      eleActive.blur();
    }
  });
  doc.addEventListener("focusin", function(event) {
    var target = event.target;
    if (!target) {
      return;
    }
    if (/^javascript/.test(target.href) && !target.getAttribute("role")) {
      target.setAttribute("role", "button");
    }
    if (!win.isKeyEvent) {
      return;
    }
    var objStyleTarget = window.getComputedStyle(target);
    if (/none|auto/.test(objStyleTarget.outlineStyle) && (!event.path || event.path[0] === target)) {
      classList.add(target);
    }
  });
  doc.addEventListener("focusout", function(event) {
    var target = event.target;
    if (target) {
      classList.remove(target);
    }
  });
  win.isKeyEventBind = true;
  return {};
})(document, window);
HTMLElement.prototype.follow = function(eleTarget, options) {
  let defaults = {
    offsets: {
      x: 0,
      y: 0
    },
    safeArea: [0, 0, 0, 0],
    // eleTrigger-eleTarget
    position: "4-1",
    // 边缘位置自动调整
    edgeAdjust: true
  };
  if (eleTarget && Object.prototype.toString.call(eleTarget) === "[object Object]") {
    options = eleTarget;
    eleTarget = null;
  }
  for (var keyOption in options || (options = {})) {
    if (typeof options[keyOption] == "undefined") {
      delete options[keyOption];
    }
  }
  let objParams = Object.assign({}, defaults, options);
  if (!eleTarget) {
    let strTarget = this.getAttribute("is-follow") || this.dataset.target;
    if (!strTarget) {
      return;
    }
    eleTarget = document.getElementById(strTarget) || document.querySelector("." + strTarget) || document.querySelector(strTarget);
    if (!eleTarget) {
      return;
    }
  }
  let arrLegalPosition = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"];
  let dataOffsets = this.dataset.offsets;
  let arrOffsets = [];
  if (objParams.offsets.map && objParams.offsets.length) {
    arrOffsets = objParams.offsets;
  } else if (typeof objParams.offsets == "string") {
    arrOffsets = objParams.offsets.trim().split(/,\s*|\s+/);
  }
  if (dataOffsets && !options.offsets) {
    arrOffsets = dataOffsets.trim().split(/,\s*|\s+/);
  }
  if (arrOffsets.length) {
    objParams.offsets = {};
    objParams.offsets.x = arrOffsets[0];
    objParams.offsets.y = arrOffsets[1] || arrOffsets[0];
  }
  let dataOffsetX = this.dataset.offsetX;
  let dataOffsetY = this.dataset.offsetY;
  if (dataOffsetX) {
    objParams.offsets.x = dataOffsetX;
  }
  if (dataOffsetY) {
    objParams.offsets.y = dataOffsetY;
  }
  objParams.offsets.x *= 1;
  objParams.offsets.y *= 1;
  let dataPosition = this.dataset.position;
  let dataAlign = this.dataset.align;
  let isDataAlignMatch = arrLegalPosition.some((strLegalPosition) => {
    return strLegalPosition === dataAlign;
  });
  if (!dataPosition && dataAlign && isDataAlignMatch) {
    dataPosition = dataAlign;
  }
  if (dataPosition && (!options || !options.position)) {
    objParams.position = dataPosition;
  }
  let dataEdgeAdjust = this.dataset.edgeAdjust || objParams.edgeAdjust;
  let isEdgeAdjust = !(dataEdgeAdjust === "0" || dataEdgeAdjust === "none" || dataEdgeAdjust === "false" || dataEdgeAdjust === false);
  if (typeof dataEdgeAdjust == "string" && typeof objParams.edgeAdjust != "boolean") {
    objParams.edgeAdjust = isEdgeAdjust;
  }
  let strOriginPosition = eleTarget.style.position;
  if (strOriginPosition != "absolute") {
    eleTarget.style.position = "absolute";
  }
  let objBoundTrigger = this.getBoundingClientRect();
  let objBoundTarget = eleTarget.getBoundingClientRect();
  if (objBoundTarget.width * objBoundTarget.height === 0) {
    eleTarget.style.position = strOriginPosition || "";
    window.console.warn((eleTarget.id ? "id为" + eleTarget.id + "的" : "") + "目前元素尺寸为0，无法定位");
    return;
  }
  const selectorScroller = this.dataset.scroller;
  let scroller;
  if (selectorScroller) {
    scroller = this.closest(selectorScroller) || this.closest("#" + selectorScroller);
  }
  if (!scroller) {
    scroller = document.scrollingElement || document.documentElement;
  }
  let numScrollTop = scroller.scrollTop;
  let numScrollLeft = scroller.scrollLeft;
  let numWinWidth = window.innerWidth;
  let numWinHeight = window.innerHeight;
  if (objBoundTrigger.left < 0 && objBoundTrigger.right < 0 || objBoundTrigger.top < 0 && objBoundTrigger.bottom < 0 || objBoundTrigger.left > numWinWidth && objBoundTrigger.right > numWinWidth || objBoundTrigger.top > numWinHeight && objBoundTrigger.bottom > numWinHeight) {
    objParams.edgeAdjust = isEdgeAdjust = false;
  }
  let eleOffsetParent = eleTarget.offsetParent;
  let objBoundOffsetParent = eleOffsetParent.getBoundingClientRect();
  const element = {
    follow: eleTarget
  };
  this.element = this.element ? Object.assign(this.element, element) : element;
  this.params = this.params ? Object.assign(this.params, objParams) : objParams;
  let objOffsets = objParams.offsets;
  let numOffsetTop = objBoundOffsetParent.top + numScrollTop;
  let numOffsetLeft = objBoundOffsetParent.left + numScrollLeft;
  if (eleOffsetParent === document.body && window.getComputedStyle(eleOffsetParent).position === "static") {
    numOffsetTop = 0;
    numOffsetLeft = 0;
  }
  let strPosition = objParams.position;
  let numTargetLeft, numTargetTop;
  let zIndex = function() {
    let objStyleTarget = window.getComputedStyle(eleTarget);
    let numZIndexTarget = Number(objStyleTarget.zIndex);
    let numZIndexNew = 19;
    eleOffsetParent.childNodes.forEach((eleChild) => {
      if (eleChild.nodeType !== 1) return;
      let objStyleChild = window.getComputedStyle(eleChild);
      let numZIndexChild = objStyleChild.zIndex * 1;
      if (numZIndexChild && eleTarget !== eleChild && objStyleChild.display !== "none") {
        numZIndexNew = Math.max(numZIndexChild + 1, numZIndexNew);
      }
    });
    if (numZIndexNew !== numZIndexTarget) {
      eleTarget.style.zIndex = numZIndexNew;
    }
  };
  if (typeof strPosition !== "string" && strPosition.length === 2) {
    let arrPosition = strPosition;
    numTargetLeft = arrPosition[0] + objOffsets.x;
    numTargetTop = arrPosition[1] + objOffsets.y;
    if (objParams.edgeAdjust === true) {
      if (numTargetLeft + objBoundTarget.width > numWinWidth + numScrollLeft) {
        numTargetLeft = numWinWidth + numScrollLeft - objBoundTarget.width - objOffsets.x;
      }
      if (numTargetTop + objBoundTarget.height > numWinHeight + numScrollTop) {
        numTargetTop = numWinHeight + numScrollTop - objBoundTarget.height - objOffsets.y;
      }
    }
    eleTarget.style.left = `${numTargetLeft}px`;
    eleTarget.style.top = `${numTargetTop}px`;
    eleTarget.dataset.align = "3-1";
    zIndex();
    return;
  }
  let isAlignMatch = arrLegalPosition.some((strLegalPosition) => {
    return strLegalPosition === strPosition;
  });
  if (isAlignMatch === false) {
    strPosition = defaults.position;
  }
  let arrSafeArea = this.dataset.safeArea || getComputedStyle(eleTarget).getPropertyValue("--safe-area") || objParams.safeArea;
  if (typeof arrSafeArea == "string") {
    arrSafeArea = arrSafeArea.trim().split(/(?:,\s*|\s+)/);
  }
  arrSafeArea = arrSafeArea.map(function(val) {
    return parseFloat(val) || 0;
  });
  if (arrSafeArea.length == 1) {
    arrSafeArea = arrSafeArea.concat(arrSafeArea[0], arrSafeArea[0], arrSafeArea[0]);
  } else if (arrSafeArea.length == 2) {
    arrSafeArea.push(arrSafeArea[0]);
    arrSafeArea.push(arrSafeArea[1]);
  } else if (arrSafeArea.length == 3) {
    arrSafeArea.push(arrSafeArea[1]);
  }
  const objIsOverflow = {
    // 键使用trigger-target方位表示
    // 例如'left-right'表示trigger元素的左边缘和target元素右边缘对齐时候是否溢出
    "left-right": objBoundTarget.width + objOffsets.x + arrSafeArea[3] > objBoundTrigger.left,
    "top-bottom": objBoundTrigger.top - (objBoundTarget.height + objOffsets.y + arrSafeArea[0]) < 0,
    "right-left": objBoundTrigger.right + objBoundTarget.width + objOffsets.x + arrSafeArea[1] > numWinWidth,
    "bottom-top": objBoundTrigger.bottom + objBoundTarget.height + objOffsets.y + arrSafeArea[2] > numWinHeight,
    // 新增4个方位
    "right-right": objBoundTarget.width + objOffsets.x + arrSafeArea[3] > objBoundTrigger.right,
    "left-left": objBoundTrigger.left + objBoundTarget.width + objOffsets.x + arrSafeArea[1] > numWinWidth,
    "bottom-bottom": objBoundTarget.height + objOffsets.y + arrSafeArea[0] > objBoundTrigger.bottom,
    "top-top": objBoundTrigger.top + objBoundTarget.height + objOffsets.y + arrSafeArea[2] > numWinHeight
  };
  let strDirection = "bottom";
  var funGetPosition = () => {
    switch (strPosition) {
      case "1-4":
      case "5-7":
      case "2-3": {
        numTargetTop = objBoundTrigger.top - objBoundTarget.height;
        if (strPosition === "1-4") {
          numTargetLeft = objBoundTrigger.left;
        } else if (strPosition === "5-7") {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width) / 2;
        } else {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width);
        }
        strDirection = "top";
        if (isEdgeAdjust && objIsOverflow["top-bottom"]) {
          if (!objIsOverflow["bottom-top"]) {
            strPosition = {
              "1-4": "4-1",
              "5-7": "7-5",
              "2-3": "3-2"
            }[strPosition];
            funGetPosition();
          } else if (!objIsOverflow["left-right"] || !objIsOverflow["right-left"]) {
            strPosition = {
              "1-4": "2-1",
              "5-7": "6-8",
              "2-3": "3-4"
            }[strPosition];
            funGetPosition();
          }
        }
        break;
      }
      case "2-1":
      case "6-8":
      case "3-4": {
        numTargetLeft = objBoundTrigger.right;
        if (strPosition === "2-1") {
          numTargetTop = objBoundTrigger.top;
        } else if (strPosition === "6-8") {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height) / 2;
        } else {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height);
        }
        strDirection = "right";
        if (isEdgeAdjust && objIsOverflow["right-left"]) {
          if (!objIsOverflow["left-right"]) {
            strPosition = {
              "2-1": "1-2",
              "6-8": "8-6",
              "3-4": "4-3"
            }[strPosition];
            funGetPosition();
          } else if (!objIsOverflow["top-bottom"] || !objIsOverflow["bottom-top"]) {
            strPosition = {
              "2-1": "1-4",
              "6-8": "5-7",
              "3-4": "2-3"
            }[strPosition];
            funGetPosition();
          }
        }
        break;
      }
      case "4-1":
      case "7-5":
      case "3-2": {
        numTargetTop = objBoundTrigger.bottom;
        if (strPosition === "4-1") {
          numTargetLeft = objBoundTrigger.left;
        } else if (strPosition === "7-5") {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width) / 2;
        } else {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width);
        }
        strDirection = "bottom";
        if (isEdgeAdjust && objIsOverflow["bottom-top"]) {
          if (!objIsOverflow["top-bottom"]) {
            strPosition = {
              "4-1": "1-4",
              "7-5": "5-7",
              "3-2": "2-3"
            }[strPosition];
            funGetPosition();
          } else if (!objIsOverflow["left-right"] || !objIsOverflow["right-left"]) {
            strPosition = {
              "4-1": "2-1",
              "7-5": "6-8",
              "3-2": "3-4"
            }[strPosition];
            funGetPosition();
          }
        }
        break;
      }
      case "1-2":
      case "8-6":
      case "4-3": {
        numTargetLeft = objBoundTrigger.left - objBoundTarget.width;
        if (strPosition === "1-2") {
          numTargetTop = objBoundTrigger.top;
        } else if (strPosition === "8-6") {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height) / 2;
        } else {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height);
        }
        strDirection = "left";
        if (isEdgeAdjust && objIsOverflow["left-right"]) {
          if (!objIsOverflow["right-left"]) {
            strPosition = {
              "1-2": "2-1",
              "8-6": "6-8",
              "4-3": "3-4"
            }[strPosition];
            funGetPosition();
          } else if (!objIsOverflow["top-bottom"] || !objIsOverflow["bottom-top"]) {
            strPosition = {
              "1-2": "1-4",
              "8-6": "5-7",
              "4-3": "2-3"
            }[strPosition];
            funGetPosition();
          }
        }
        break;
      }
    }
  };
  funGetPosition();
  numTargetLeft = numTargetLeft + objOffsets.x - numOffsetLeft;
  numTargetTop = numTargetTop + objOffsets.y - numOffsetTop;
  if (isEdgeAdjust) {
    if (strDirection == "top") {
      numTargetTop = numTargetTop - arrSafeArea[2];
    } else if (strDirection == "bottom") {
      numTargetTop = numTargetTop + arrSafeArea[0];
    } else if (strDirection == "left") {
      numTargetLeft = numTargetLeft - arrSafeArea[1];
    } else {
      numTargetLeft = numTargetLeft + arrSafeArea[3];
    }
  }
  numTargetTop += numScrollTop;
  numTargetLeft += numScrollLeft;
  eleTarget.style.left = `${Math.round(numTargetLeft)}px`;
  eleTarget.style.top = `${Math.round(numTargetTop)}px`;
  objBoundTarget = eleTarget.getBoundingClientRect();
  if (isEdgeAdjust) {
    if (strDirection == "top" || strDirection == "bottom") {
      if (objBoundTarget.left < arrSafeArea[3]) {
        numTargetLeft = numTargetLeft + (arrSafeArea[3] - objBoundTarget.left);
      } else if (objBoundTarget.right + arrSafeArea[1] > numWinWidth) {
        numTargetLeft = numTargetLeft - (objBoundTarget.right + arrSafeArea[1] - numWinWidth);
      }
    } else if (objBoundTarget.top < arrSafeArea[0]) {
      numTargetTop += arrSafeArea[0] - objBoundTarget.top;
    } else if (objBoundTarget.bottom + arrSafeArea[2] > numWinHeight) {
      numTargetTop -= objBoundTarget.bottom + arrSafeArea[2] - numWinHeight;
    }
    eleTarget.style.left = `${Math.round(numTargetLeft)}px`;
    eleTarget.style.top = `${Math.round(numTargetTop)}px`;
  }
  eleTarget.dataset.align = strPosition;
  eleTarget.dataset.direction = strDirection;
  zIndex();
  if (!eleTarget.zIndex) {
    eleTarget.zIndex = zIndex;
  }
};
[NodeList.prototype, HTMLCollection.prototype].forEach((prop) => {
  prop.follow = function() {
    [...this].forEach((node) => {
      if (node.nodeType === 1) {
        node.follow.apply(node, this.arguments);
      }
    });
  };
});
var Tab = class _Tab extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }
  static get defaults() {
    return {
      eventType: "click",
      history: false,
      autoplay: 3e3
    };
  }
  constructor(trigger, options) {
    super();
    let eleTrigger = null;
    if (typeof trigger == "string") {
      eleTrigger = document.getElementById(trigger);
    } else if (typeof trigger == "object") {
      if (trigger.tagName) {
        eleTrigger = trigger;
      } else if (!options) {
        options = trigger;
      }
    }
    options = options || {};
    if (eleTrigger) {
      let strIsTab = eleTrigger.getAttribute("is-tab");
      const strName = eleTrigger.dataset.name;
      if (strName && (strIsTab == "prev" || strIsTab == "next")) {
        eleTrigger.addEventListener("click", () => {
          const eleTabGroup = document.querySelectorAll('ui-tab[name="' + strName + '"]');
          const indexOpen = [...eleTabGroup].findIndex((eleTab) => {
            return eleTab.open;
          });
          if (strIsTab == "prev") {
            (eleTabGroup[indexOpen - 1] || eleTabGroup[eleTabGroup.length - 1]).switch();
          } else {
            (eleTabGroup[indexOpen + 1] || eleTabGroup[0]).switch();
          }
        });
        eleTrigger.addEventListener("mouseenter", () => {
          document.querySelectorAll('ui-tab[name="' + strName + '"][autoplay]').forEach((eleTab) => {
            clearTimeout(eleTab.timer);
          });
        });
        eleTrigger.addEventListener("mouseout", () => {
          [...document.querySelectorAll('ui-tab[name="' + strName + '"][autoplay]')].some((eleTab) => {
            if (eleTab.open) {
              eleTab.autoSwitch();
              return true;
            }
          });
        });
        return;
      }
      let strTriggerId = eleTrigger.id;
      if (!strTriggerId) {
        strTriggerId = ("lulu_" + Math.random()).replace("0.", "");
        eleTrigger.id = strTriggerId;
        this.htmlFor = strTriggerId;
      }
      if (eleTrigger.getAttribute("name")) {
        this.name = eleTrigger.getAttribute("name");
      }
      if (eleTrigger.hasAttribute("open")) {
        this.open = true;
      }
      for (let paramsKey in _Tab.defaults) {
        if (typeof eleTrigger.dataset[paramsKey.toLowerCase()] != "undefined") {
          this[paramsKey] = eleTrigger.dataset[paramsKey.toLowerCase()];
        } else if (typeof options[paramsKey] != "undefined") {
          this[paramsKey] = eleTrigger.dataset[paramsKey.toLowerCase()] = options[paramsKey];
        }
      }
      if (strIsTab && !eleTrigger.dataset.target) {
        eleTrigger.dataset.target = strIsTab;
      }
      if (eleTrigger.tabIndex == -1) {
        eleTrigger.setAttribute("tabindex", 0);
      }
    }
    let objElement = this.element || {};
    this.element = new Proxy(objElement, {
      get: (target, prop) => {
        if (prop == "target") {
          let strIdTarget = this.target;
          let eleTarget = null;
          let eleTrigger2 = this.element.trigger;
          if (!strIdTarget && eleTrigger2) {
            strIdTarget = eleTrigger2.dataset.target || eleTrigger2.getAttribute("href");
            if (strIdTarget && /#/.test(strIdTarget)) {
              strIdTarget = strIdTarget.split("#")[1];
            }
          }
          if (strIdTarget) {
            eleTarget = document.getElementById(strIdTarget);
          }
          return eleTarget;
        }
        if (prop == "trigger") {
          return this.htmlFor && document.getElementById(this.htmlFor) || this;
        }
        return target[prop];
      },
      set: (target, prop, value) => {
        if (typeof value == "string") {
          value = document.getElementById(value) || document.querySelector(value);
        }
        if (value && typeof value.nodeType != "number") {
          return false;
        }
        target[prop] = value;
        if (prop == "target" && value) {
          let eleTarget = value;
          let strId = eleTarget.id;
          if (!strId) {
            strId = ("lulu_" + Math.random()).replace("0.", "");
            eleTarget.id = strId;
          }
          if (this.element.trigger == this) {
            if (this.target != strId) {
              this.target = strId;
            }
          } else if (this.element.trigger) {
            this.element.trigger.setAttribute("data-target", strId);
          }
        }
        return true;
      }
    });
    this.setParams(options);
    if (eleTrigger && !this.parentElement && eleTrigger != this) {
      let eleHidden = document.querySelector('body > div[hidden="tab"]');
      if (!eleHidden) {
        eleHidden = document.createElement("div");
        eleHidden.setAttribute("hidden", "tab");
        document.body.append(eleHidden);
      }
      eleHidden.append(this);
    }
  }
  get eventType() {
    let strEventType = this.getAttribute("eventtype") || _Tab.defaults.eventType;
    if (strEventType == "hover") {
      strEventType = "mouseenter";
    }
    return strEventType;
  }
  set eventType(value) {
    this.setAttribute("eventtype", value);
  }
  get history() {
    return this.hasAttribute("history") || _Tab.defaults.history;
  }
  set history(value) {
    this.toggleAttribute("history", value);
  }
  get autoplay() {
    let strAttrAutoplay = this.getAttribute("autoplay");
    if (typeof strAttrAutoplay !== "string") {
      return false;
    }
    if (/^\d+$/.test(strAttrAutoplay)) {
      return strAttrAutoplay * 1;
    }
    return _Tab.defaults.autoplay;
  }
  set autoplay(value) {
    if (!value && value !== "") {
      this.removeAttribute("autoplay");
    } else {
      this.setAttribute("autoplay", value);
    }
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    this.setAttribute("name", value);
  }
  get htmlFor() {
    return this.getAttribute("for");
  }
  set htmlFor(v) {
    this.setAttribute("for", v);
  }
  // 目标元素的设置与获取
  get target() {
    return this.getAttribute("target");
  }
  set target(value) {
    this.setAttribute("target", value);
  }
  get open() {
    return this.hasAttribute("open");
  }
  set open(value) {
    this.toggleAttribute("open", value);
  }
  // 参数批量设置
  setParams(options) {
    this.params = this.params || {};
    options = options || {};
    Object.assign(this.params, options);
  }
  switch() {
    let strName = this.name;
    let eleTabGroup = [];
    if (strName) {
      eleTabGroup = document.querySelectorAll('ui-tab[name="' + strName + '"]');
      if (!this.open) {
        eleTabGroup.forEach((tab) => {
          if (tab.open) {
            tab.open = false;
          }
        });
        this.open = true;
      }
    } else {
      this.open = !this.open;
    }
    const location2 = window.location;
    if (this.history == true && strName && /tab\d{10,16}/.test(strName) == false) {
      if (!this.element.target) {
        return;
      }
      let strId = this.element.target.id;
      const objURLParams = new URLSearchParams(location2.search);
      objURLParams.set(strName, strId);
      let strHash = location2.hash;
      if (strId == strHash) {
        location2.hash = strHash = "";
      }
      window.history.replaceState(null, document.title, location2.href.split("?")[0] + "?" + objURLParams.toString() + strHash);
    }
  }
  // 自动切换
  autoSwitch() {
    let numTimeAutoplay = this.autoplay;
    let strName = this.name;
    if (numTimeAutoplay && strName) {
      let eleTabGroup = document.querySelectorAll('ui-tab[name="' + strName + '"]');
      clearTimeout(this.timer);
      if (numTimeAutoplay && strName && eleTabGroup.length > 1) {
        let indexTab = [].slice.call(eleTabGroup).findIndex((tab) => {
          return tab == this;
        });
        indexTab++;
        if (indexTab >= eleTabGroup.length) {
          indexTab = 0;
        }
        this.timer = setTimeout(() => {
          eleTabGroup[indexTab].switch();
          eleTabGroup[indexTab].autoSwitch();
        }, numTimeAutoplay);
      }
    }
  }
  // 初始化tab事件
  events() {
    if (this.eventType == "mouseover" || this.eventType == "mouseenter") {
      this.element.trigger.addEventListener(this.eventType, () => {
        _Tab.hoverTimer = setTimeout(() => {
          this.switch();
        }, 150);
      }, false);
      this.element.trigger.addEventListener(this.eventType.replace("over", "out").replace("enter", "leave"), () => {
        clearTimeout(_Tab.hoverTimer);
      });
    }
    this.element.trigger.addEventListener("click", (event) => {
      if (/^(:?javas|#)/.test(event.target.getAttribute("href"))) {
        event.preventDefault();
      }
      this.switch();
    }, false);
    if (this.autoplay && this.name) {
      [this.element.trigger, this.element.target].forEach((ele) => {
        ele.addEventListener("mouseenter", () => {
          clearTimeout(this.timer);
        });
        ele.addEventListener("mouseleave", () => {
          this.autoSwitch();
        });
      });
      let eleFirstOpenTab = document.querySelector('ui-tab[name="' + this.name + '"][open]');
      if (eleFirstOpenTab) {
        eleFirstOpenTab.autoSwitch();
      }
    }
  }
  // ui-tab元素在页面出现的时候
  connectedCallback() {
    if (!this.closest("a, button") && !this.querySelector("a, button")) {
      this.setAttribute("tabindex", "0");
    }
    let eleTarget = this.element.target;
    let eleTrigger = this.element.trigger;
    if (eleTrigger) {
      eleTrigger.setAttribute("role", "tab");
    }
    if (eleTarget) {
      eleTarget.setAttribute("role", "tabpanel");
    }
    this.events();
    let objURLParams = new URLSearchParams(window.location.search);
    objURLParams.forEach((value, key) => {
      if (eleTrigger && eleTarget && this.name == key && eleTarget.id == value && !eleTrigger.hasAttribute("open")) {
        eleTrigger.click();
      }
    });
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-tab"
      }
    }));
    this.isConnectedCallback = true;
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    if (eleTrigger != this) {
      eleTrigger.dispatchEvent(new CustomEvent("DOMContentLoaded"));
      if (eleTrigger.hasAttribute("is-tab")) {
        eleTrigger.dispatchEvent(new CustomEvent("connected", {
          detail: {
            type: "ui-tab"
          }
        }));
        eleTrigger.setAttribute("defined", "");
      }
    }
  }
  /**
   * open属性变化时候的变化
   * @param {*} name
   * @param {*} newValue
   * @param {*} oldValue
   */
  attributeChangedCallback(name, newValue, oldValue) {
    if (this.element && name === "open" && typeof newValue != typeof oldValue) {
      const elePanel = this.element.target;
      if (!elePanel) {
        return;
      }
      if (this.open) {
        elePanel.classList.add("active");
        this.setAttribute("aria-selected", "true");
        this.dispatchEvent(new CustomEvent("show", {
          detail: {
            type: "ui-tab"
          }
        }));
      } else {
        elePanel.classList.remove("active");
        this.setAttribute("aria-selected", "false");
        this.dispatchEvent(new CustomEvent("hide", {
          detail: {
            type: "ui-tab"
          }
        }));
      }
      let eleTrigger = this.element.trigger;
      if (eleTrigger && eleTrigger != this) {
        eleTrigger.toggleAttribute("open", this.open);
      }
      if (eleTrigger && this.name && /ui-tab/.test(eleTrigger.className)) {
        eleTrigger.parentElement.style.setProperty("--ui-tab-width", eleTrigger.clientWidth);
        eleTrigger.parentElement.style.setProperty("--ui-tab-left", eleTrigger.offsetLeft);
      }
      this.dispatchEvent(new CustomEvent("switch"));
    }
  }
};
NodeList.prototype.tab = function(options = {}) {
  const eleTabs = this;
  let strName = options.name || "";
  for (var eleTab of eleTabs) {
    if (!strName && eleTab.getAttribute("name")) {
      strName = eleTab.getAttribute("name");
    }
  }
  if (!strName) {
    strName = ("tab" + Math.random()).replace("0.", "");
  }
  for (let eleTab2 of eleTabs) {
    eleTab2.setAttribute("name", strName);
    eleTab2["ui-tab"] = new Tab(eleTab2, options);
  }
};
if (!customElements.get("ui-tab")) {
  customElements.define("ui-tab", Tab);
}
window.Tab = Tab;
(function() {
  function funAutoInitAndWatching() {
    document.querySelectorAll("[is-tab]").forEach(function(eleTab) {
      if (!eleTab["ui-tab"]) {
        eleTab["ui-tab"] = new Tab(eleTab);
      }
    });
    var observerTab = new MutationObserver(function(mutationsList) {
      mutationsList.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(eleAdd) {
          if (!eleAdd.tagName) {
            return;
          }
          if (eleAdd.hasAttribute("is-tab")) {
            if (!eleAdd["ui-tab"]) {
              eleAdd["ui-tab"] = new Tab(eleAdd);
            }
          } else {
            eleAdd.querySelectorAll("[is-tab]").forEach(function(eleTab) {
              if (!eleTab["ui-tab"]) {
                eleTab["ui-tab"] = new Tab(eleTab);
              }
            });
          }
        });
      });
    });
    observerTab.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  if (document.readyState != "loading") {
    funAutoInitAndWatching();
  } else {
    window.addEventListener("DOMContentLoaded", funAutoInitAndWatching);
  }
})();
var isSupportPopover = HTMLElement.prototype.hasOwnProperty("popover");
var isSupportAnchor = CSS.supports("justify-self", "anchor-center");
var Select = class _Select extends HTMLSelectElement {
  static get observedAttributes() {
    return ["multiple", "disabled", "width"];
  }
  constructor() {
    super();
    if (!this.element) {
      this.element = {
        button: null,
        combobox: null,
        datalist: null
      };
    }
    this.observer = null;
    this.resizeObserver = null;
    this.setProperty();
  }
  static addClass() {
    return ["ui", "select"].concat([].slice.call(arguments)).join("-");
  }
  set multiple(value) {
    return this.toggleAttribute("multiple", Boolean(value));
  }
  get multiple() {
    return this.hasAttribute("multiple");
  }
  render() {
    this.create();
    this.refresh();
    this.events();
  }
  remove() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
    if (this.element.combobox) {
      this.element.combobox.remove();
    }
  }
  getData() {
    if (!this.options.length) {
      return [{
        html: ""
      }];
    }
    let eleOptgroups = this.querySelectorAll("optgroup");
    let isIntent = !!this.querySelector("optgroup[label]");
    if (eleOptgroups.length) {
      let arrData = [];
      eleOptgroups.forEach((optgroup) => {
        arrData.push({
          html: optgroup.label,
          disabled: optgroup.disabled,
          className: optgroup.className,
          divide: !isIntent
        });
        optgroup.querySelectorAll("option").forEach((option) => {
          arrData.push({
            html: option.innerHTML,
            value: option.value,
            selected: option.selected,
            disabled: optgroup.disabled || option.disabled,
            className: option.className,
            intent: isIntent
          });
        });
      });
      return arrData;
    }
    return [].slice.call(this.options).map((option) => {
      return {
        html: option.innerHTML,
        value: option.value,
        selected: option.selected,
        disabled: option.disabled,
        className: option.className
      };
    });
  }
  // 获取<select>元素原始状态下的尺寸
  get width() {
    let strAttrWidth = this.getAttribute("width");
    if (strAttrWidth && Number(strAttrWidth) === parseFloat(strAttrWidth)) {
      strAttrWidth = strAttrWidth + "px";
    }
    return strAttrWidth;
  }
  set width(value) {
    if (/\d/.test(value) == false) {
      return;
    }
    this.setAttribute("width", value);
  }
  getWidth() {
    return this.style.width || this.width || this.offsetWidth + "px";
  }
  setWidth() {
    if (this.element.combobox) {
      const width = this.getWidth();
      this.element.combobox.style.width = width;
      this.style.transform = "";
      if (width.lastIndexOf("%") !== -1 && this.originPosition != "absolute" && this.originPosition != "fixed") {
        this.style.transform = `scaleX(${this.parentElement.clientWidth * parseFloat(width) * 0.01 / this.offsetWidth})`;
      }
    }
  }
  create() {
    if (this.element && this.element.combobox) {
      return;
    }
    const strId = ("lulu_" + (this.id || Math.random())).replace("0.", "");
    const BUTTON_CLASS = _Select.addClass("button");
    const DATALIST_CLASS = _Select.addClass("datalist");
    const strOriginPosition = window.getComputedStyle(this).position;
    this.originPosition = strOriginPosition;
    const isCSSPosition = this.dataset.cssPosition || this.hasAttribute("is-css-position");
    const isCustomScroll = /windows/i.test(navigator.userAgent);
    const isPopover = !isCSSPosition && isSupportPopover;
    const isAnchor = isSupportAnchor && !isCSSPosition && (this.hasAttribute("is-anchor") || this.dataset.anchor);
    this.insertAdjacentHTML("afterend", `<div style="width: ${this.getWidth()}">
           ${!this.multiple ? `<button
                type="button"
                class="${BUTTON_CLASS}"
                ${isPopover ? "popovertarget" : "data-target"}="${strId}"
                aria-owns="${strId}"
                aria-expanded="false"
                style="display: ${this.multiple ? "none" : "block"};anchor-name: --${strId}"
                ${this.disabled ? "disabled " : ""}
            /></button>` : ""}
                <ui-select-list 
                id="${strId}" ${isPopover ? "popover" : ""} 
                role="listbox" 
                aria-expanded="false" 
                class="${DATALIST_CLASS}" 
                ${!this.multiple ? 'aria-hidden="true"' : ""} 
                data-custom-scroll="${isCustomScroll}"
                ${isAnchor ? 'data-anchor="true"' : ""}
                style="position-anchor:--${strId};"
            ></ui-select-list>
        </div>`);
    let eleCombobox = this.nextElementSibling;
    Object.assign(this.element, {
      combobox: eleCombobox,
      button: eleCombobox.querySelector(`.${BUTTON_CLASS}`),
      datalist: eleCombobox.querySelector(`.${DATALIST_CLASS}`)
    });
    if (strOriginPosition != "fixed") {
      this.style.position = "absolute";
    }
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
  }
  /**
   * 下拉内容的刷新
   * @param {Array} data 刷新列表数组项，可选
   */
  refresh(data) {
    const isMultiple = this.multiple;
    const eleSelect = this;
    const eleCombobox = this.element.combobox;
    const eleButton = this.element.button;
    const eleDatalist = this.element.datalist;
    if (!eleDatalist) {
      return;
    }
    const strId = eleDatalist.id;
    data = data || this.getData();
    eleCombobox.className = `${eleSelect.className} ${_Select.addClass()}`.trim();
    if (isMultiple) {
      eleCombobox.style.height = eleSelect.style.height || eleSelect.offsetHeight + "px";
    } else if (eleSelect[eleSelect.selectedIndex]) {
      const strHtmlSelected = eleSelect[eleSelect.selectedIndex].innerHTML;
      eleButton.innerHTML = `<span class="${_Select.addClass("text")}">${strHtmlSelected}</span><i class="${_Select.addClass("icon")}" aria-hidden="true"></i>`;
      eleButton.dataset.value = eleSelect[eleSelect.selectedIndex].value;
    }
    let index = -1;
    eleDatalist.innerHTML = data.map((obj) => {
      let arrCl = [_Select.addClass("datalist", "li"), obj.className];
      if (obj.selected) arrCl.push("selected");
      if (obj.disabled) arrCl.push("disabled");
      if (typeof obj.divide != "undefined") {
        if (obj.divide) {
          arrCl = [_Select.addClass("datalist", "hr"), obj.className];
          return `<div class="${arrCl.join(" ")}"></div>`;
        }
        return `<div class="${arrCl.join(" ")}" role="heading">${obj.html}</div>`;
      }
      index++;
      if (obj.intent) {
        arrCl.push(_Select.addClass("intent"));
      }
      if (!obj.html) {
        return `<span class="${arrCl.join(" ")} disabled"></span>`;
      }
      if (isMultiple) {
        return `<a class="${arrCl.join(" ")}" data-index=${index}>${obj.html}</a>`;
      }
      return `<a
                ${obj.disabled ? "" : ' href="javascript:" '}
                class="${arrCl.join(" ")}"
                data-index=${index}
                data-target="${strId}"
                role="option"
                aria-selected="${obj.selected}"
            >${obj.html}</a>`;
    }).join("");
  }
  /**
   * 下拉的事件处理
   */
  events() {
    if (this.multiple) {
      this.createMultipleEvent();
    } else {
      this.createNormalEvent();
    }
  }
  /**
   * 下拉的层级处理
   */
  zIndex() {
    let eleTarget = this.element.datalist;
    let objStyleTarget = window.getComputedStyle(eleTarget);
    let numZIndexTarget = Number(objStyleTarget.zIndex);
    let numZIndexNew = 19;
    document.body.childNodes.forEach((eleChild) => {
      if (eleChild.nodeType !== 1) return;
      let objStyleChild = window.getComputedStyle(eleChild);
      let numZIndexChild = objStyleChild.zIndex * 1;
      if (numZIndexChild && eleTarget !== eleChild && objStyleChild.display !== "none") {
        numZIndexNew = Math.max(numZIndexChild + 1, numZIndexNew);
      }
    });
    if (numZIndexNew !== numZIndexTarget) {
      eleTarget.style.zIndex = numZIndexNew;
    }
  }
  /**
   * 定位
   */
  position() {
    const objElement = this.element;
    let eleCombobox = objElement.combobox;
    let eleButton = objElement.button;
    let eleDatalist = objElement.datalist;
    if (!eleCombobox.classList.contains("active")) {
      return;
    }
    let objBoundButton = eleButton.getBoundingClientRect();
    if (!eleCombobox.contains(eleDatalist) || eleButton.popoverTargetElement) {
      eleDatalist.style.left = objBoundButton.left + document.scrollingElement.scrollLeft + "px";
      eleDatalist.style.top = objBoundButton.bottom + document.scrollingElement.scrollTop - 1 + "px";
      eleDatalist.style.width = eleCombobox.getBoundingClientRect().width + "px";
      eleDatalist.classList.add("active");
      this.zIndex();
    }
    let objBoundDatalist = eleDatalist.getBoundingClientRect();
    var isOverflow = objBoundDatalist.bottom + window.pageYOffset > Math.max(document.body.clientHeight, window.innerHeight);
    eleCombobox.classList[isOverflow ? "add" : "remove"]("reverse");
    if (isOverflow && !this.dataset.cssPosition && !this.hasAttribute("is-css-position")) {
      eleDatalist.style.top = objBoundButton.top + document.scrollingElement.scrollTop - objBoundDatalist.height + 1 + "px";
    }
  }
  /**
   * 单选下拉框的事件
   */
  createNormalEvent() {
    const objElement = this.element;
    let eleCombobox = objElement.combobox;
    let eleButton = objElement.button;
    let eleDatalist = objElement.datalist;
    eleButton.addEventListener("click", () => {
      if (this.disabled) {
        return false;
      }
      eleCombobox.classList.toggle("active");
      if (eleCombobox.classList.contains("active")) {
        if (this.dataset.cssPosition || this.hasAttribute("is-css-position") || isSupportPopover) {
          eleCombobox.appendChild(eleDatalist);
        } else {
          document.body.appendChild(eleDatalist);
        }
        this.position();
        eleButton.setAttribute("aria-expanded", "true");
        eleDatalist.removeAttribute("aria-hidden");
        var arrDataScrollTop = eleCombobox.dataScrollTop;
        var eleDatalistSelected = eleDatalist.querySelector(".selected");
        if (arrDataScrollTop && eleDatalistSelected && arrDataScrollTop[1] === eleDatalistSelected.getAttribute("data-index") && arrDataScrollTop[2] === eleDatalistSelected.innerText) {
          eleDatalist.scrollTop = arrDataScrollTop[0];
          delete eleCombobox.dataScrollTop;
        }
      } else {
        eleCombobox.classList.remove("reverse");
        eleButton.setAttribute("aria-expanded", "false");
        eleDatalist.remove();
      }
    });
    eleDatalist.addEventListener("click", (event) => {
      var target = event.target;
      if (!target || !target.closest) {
        return;
      }
      var eleList = target;
      var eleOption = null;
      var isDisabled = eleList.classList.contains("disabled");
      var indexOption = eleList.getAttribute("data-index");
      var scrollTop = eleDatalist.scrollTop;
      eleCombobox.dataScrollTop = [scrollTop, indexOption, eleList.innerText];
      if (!isDisabled) {
        eleOption = this[indexOption];
        if (eleOption) {
          eleOption.selected = true;
        }
      }
      eleCombobox.classList.remove("active");
      eleButton.setAttribute("aria-expanded", "false");
      eleDatalist.remove();
      eleButton.focus();
      eleButton.blur();
      if (!isDisabled) {
        this.refresh();
        this.dispatchEvent(new CustomEvent("change", {
          "bubbles": true
        }));
      }
    });
    const eleScrollable = [];
    const funWalk = (ele) => {
      if (ele == document.body) {
        return;
      }
      if (window.getComputedStyle(ele).overflow == "auto") {
        eleScrollable.push(ele);
      }
      funWalk(ele.parentElement);
    };
    if (!this.dataset.cssPosition && !this.hasAttribute("is-css-position") && !isSupportPopover) {
      funWalk(eleButton.parentElement);
      eleScrollable.forEach((ele) => {
        ele.addEventListener("scroll", () => {
          this.position();
        });
      });
    }
    if (!document.isSelectMouseEvent) {
      document.addEventListener("mouseup", (event) => {
        var target = event.target;
        if (!target) {
          return;
        }
        const eleCombobox2 = document.querySelector("select+.ui-select.active");
        if (!eleCombobox2) {
          return;
        }
        const eleSelect = eleCombobox2.previousElementSibling;
        const eleDatalist2 = eleSelect.element && eleSelect.element.datalist;
        if (!eleDatalist2.contains(target) && !eleCombobox2.contains(target)) {
          eleCombobox2.classList.remove("active");
          eleCombobox2.classList.remove("reverse");
          eleDatalist2.remove();
        }
      });
      document.isSelectMouseEvent = true;
    }
  }
  /**
   * 多选下拉的事件处理
   */
  createMultipleEvent() {
    const eleDatalist = this.element.datalist;
    this.addEventListener("change", () => {
      this.refresh();
    });
    this.addEventListener("scroll", () => {
      eleDatalist.scrollTop = this.scrollTop;
    });
    this.addEventListener("mousedown", () => {
      this.setAttribute("data-active", "true");
    });
    this.addEventListener("mousemove", (event) => {
      if (this.getAttribute("data-active")) {
        this.refresh();
        return;
      }
      var clientY = event.clientY;
      var clientX = event.clientX;
      var elesFromPoint = document.elementsFromPoint(clientX, clientY);
      var eleListAll = eleDatalist.querySelectorAll("a");
      for (var indexList = 0; indexList < eleListAll.length; indexList++) {
        var eleList = eleListAll[indexList];
        eleList.removeAttribute("href");
        if ([...elesFromPoint].includes(eleList)) {
          if (!eleList.classList.contains("selected") && !eleList.classList.contains("disabled")) {
            eleList.href = "javascript:";
          }
          break;
        }
      }
    });
    this.addEventListener("mouseout", () => {
      var eleListAllWithHref = eleDatalist.querySelectorAll("a[href]");
      eleListAllWithHref.forEach(function(eleList) {
        eleList.removeAttribute("href");
      });
    });
    document.addEventListener("mouseup", () => {
      this.removeAttribute("data-active");
    });
  }
  /**
   * 重置原生的属性
   */
  setProperty() {
    Object.defineProperty(this, "value", {
      configurable: true,
      enumerable: true,
      writeable: true,
      get: () => {
        return [...this.selectedOptions].map((option) => option.value).join();
      },
      set: (value) => {
        [...this.options].some((option) => {
          if (value.split(",").includes(option.value)) {
            option.selected = true;
            if (!this.multiple) {
              return true;
            }
          } else if (this.multiple) {
            option.selected = false;
          }
        });
      }
    });
    const props2 = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "selectedIndex");
    Object.defineProperty(HTMLSelectElement.prototype, "selectedIndex", {
      ...props2,
      set(v) {
        if (this.options[v]) {
          this.options[v].selected = true;
        }
      }
    });
  }
  /**
   * <select>属性变化时候的处理
   * @param {String} name 变化的属性名称
   */
  attributeChangedCallback(name) {
    const eleButton = this.element.button;
    if (name === "disabled") {
      if (!eleButton) return;
      eleButton.disabled = this.disabled;
    } else if (name === "multiple") {
      if (this.element.combobox) {
        this.element.combobox.remove();
        this.render();
      }
    } else if (name == "width") {
      this.setWidth();
    }
  }
  /**
   * is="ui-select" 元素载入到页面后
   */
  connectedCallback() {
    console.log("connectedCallback");
    this.observer = new MutationObserver((mutationsList) => {
      let isRefresh = true;
      mutationsList.forEach((mutation) => {
        if (mutation.type == "attributes" && mutation.target.hasAttribute("selected")) {
          mutation.target.selected = true;
          isRefresh = false;
        }
      });
      if (isRefresh) {
        this.refresh();
      }
    });
    this.resizeObserver = new ResizeObserver(() => {
      this.setWidth();
      this.position();
    });
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["selected"]
    });
    this.resizeObserver.observe(this);
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-select"
      }
    }));
    this.isConnectedCallback = true;
    this.render();
  }
  /**
   * is="ui-select" 元素从页面移除后
   */
  disconnectedCallback() {
    if (!this.observer || !this.resizeObserver) {
      return;
    }
    this.remove();
    this.observer.disconnect();
    this.resizeObserver.disconnect();
  }
};
var propOptionSelected = Object.getOwnPropertyDescriptor(HTMLOptionElement.prototype, "selected");
Object.defineProperty(HTMLOptionElement.prototype, "selected", {
  ...propOptionSelected,
  set(value) {
    propOptionSelected.set.call(this, value);
    if (this.parentElement && this.parentElement.refresh) {
      this.parentElement.refresh();
    }
  }
});
if (!customElements.get("ui-select")) {
  customElements.define("ui-select", Select, {
    extends: "select"
  });
}
var Drop = class _Drop extends HTMLElement {
  static get observedAttributes() {
    return ["open", "target"];
  }
  static get defaults() {
    return {
      eventtype: "click",
      position: "7-5"
    };
  }
  /**
   * @param {Object} trigger 触发元素
   * @param {Object} target  显示的浮动定位元素
   * @param {Object} options 可选参数
   */
  constructor(eleTrigger, eleTarget, options) {
    super();
    options = options || {};
    this.params = this.params || {};
    this.params = new Proxy(this.params, {
      get: (params, prop) => {
        if (!prop) {
          return;
        }
        prop = prop.toLowerCase();
        let value = params[prop];
        let eleTrigger2 = this.element.trigger;
        if (typeof value == "undefined") {
          value = eleTrigger2.getAttribute(prop) || eleTrigger2.dataset[prop];
          if (prop == "width") {
            if (eleTrigger2 !== this) {
              value = eleTrigger2.dataset[prop];
            } else {
              value = eleTrigger2.getAttribute(prop);
            }
          }
          if (typeof value == "undefined" && _Drop.defaults[prop]) {
            value = _Drop.defaults[prop];
          }
        }
        return value;
      },
      set: (params, prop, value) => {
        params[prop.toLowerCase()] = value;
        return true;
      }
    });
    let objElement = this.element || {};
    this.element = new Proxy(objElement, {
      get: (target, prop) => {
        if (prop == "target") {
          let strIdTarget = this.getAttribute("target");
          let eleTarget2 = target[prop];
          if (!eleTarget2 && strIdTarget) {
            eleTarget2 = document.getElementById(strIdTarget);
          }
          return eleTarget2;
        }
        if (prop == "trigger") {
          return target[prop] || this;
        }
        return target[prop];
      },
      set: (target, prop, value) => {
        if (typeof value == "string") {
          value = document.getElementById(value) || document.querySelector(value);
        }
        if (value && typeof value.nodeType != "number") {
          return false;
        }
        target[prop] = value;
        if (prop == "target" && value) {
          let eleTarget2 = value;
          let strId = eleTarget2.id;
          if (!strId) {
            strId = ("lulu_" + Math.random()).replace("0.", "");
            eleTarget2.id = strId;
          }
          let eleTrigger2 = this.element.trigger;
          if (eleTrigger2 == this) {
            if (this.target != strId) {
              this.target = strId;
            }
          } else if (eleTrigger2) {
            let strAttrTarget = eleTrigger2.dataset.target;
            if (strAttrTarget && document.querySelector('datalist[id="' + strAttrTarget + '"]')) {
              eleTrigger2.setAttribute("data-target2", strId);
            } else {
              eleTrigger2.setAttribute("data-target", strId);
            }
          }
        }
        return true;
      }
    });
    [...arguments].forEach(function(argument) {
      if (typeof argument == "object" && argument && !argument.tagName) {
        options = argument;
      }
    });
    if (eleTrigger) {
      this.element.trigger = eleTrigger;
    }
    eleTrigger = this.element.trigger;
    if (eleTrigger) {
      if (eleTarget && eleTarget !== options) {
        this.element.target = eleTarget;
      } else if (!eleTarget && eleTrigger.dataset && eleTrigger.dataset.target) {
        this.element.target = eleTrigger.dataset.target;
      }
    }
    this.setParams(options);
    if (this.open) {
      if (document.readyState != "loading") {
        this.show();
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          this.show();
        });
      }
    }
    if (eleTrigger !== this) {
      this.addEventListener("connected", function() {
        this.remove();
      });
      eleTrigger["ui-drop"] = this;
      document.body.append(this);
    }
  }
  get htmlFor() {
    return this.getAttribute("for");
  }
  set htmlFor(v) {
    this.setAttribute("for", v);
  }
  // 目标元素的设置与获取
  get target() {
    return this.getAttribute("target");
  }
  set target(value) {
    this.setAttribute("target", value);
  }
  get eventType() {
    return this.getAttribute("eventtype") || "click";
  }
  set eventType(value) {
    this.setAttribute("eventtype", value);
  }
  get open() {
    return this.hasAttribute("open");
  }
  set open(value) {
    this.toggleAttribute("open", value);
  }
  // 设置参数方法
  setParams(options) {
    options = options || {};
    let funCallShow = options.onShow;
    let funCallHide = options.onHide;
    if (typeof funCallShow == "function") {
      this.addEventListener("show", function(event) {
        funCallShow.call(this, event);
        this.position();
      });
      delete options.onShow;
    }
    if (typeof funCallHide == "function") {
      this.addEventListener("hide", function(event) {
        funCallHide.call(this, event);
      });
      delete options.onHide;
    }
    Object.assign(this.params, options || {});
  }
  /**
   * 下拉定位的事件处理
   * @return {[type]} [description]
   */
  events(isIgnoreTarget) {
    let eleTrigger = this.element.trigger;
    let eleTarget = this.element.target;
    if (!eleTarget && !isIgnoreTarget) {
      return;
    }
    if (eleTarget && eleTarget.matches("datalist")) {
      return;
    }
    const objParams = this.params;
    const funGetClosestChild = (element) => {
      if (!objParams.selector) {
        return null;
      }
      const eleClosestSelector = element.closest(objParams.selector);
      if (eleTrigger.contains(eleClosestSelector) == false) {
        return null;
      }
      return eleClosestSelector;
    };
    switch (objParams.eventType) {
      case "null": {
        break;
      }
      case "hover":
      case "mouseover":
      case "mouseenter": {
        if (!eleTarget) {
          setTimeout(() => {
            if (this.element.target) {
              this.events();
            }
          }, 1);
          return;
        }
        eleTarget.timerHover = null;
        eleTarget.timerHold = null;
        if (!eleTrigger.isBindDropEvents) {
          eleTrigger.addEventListener("mouseover", (event) => {
            if (event.relatedTarget !== event.target) {
              const eleClosestSelector = funGetClosestChild(event.target);
              if (eleClosestSelector) {
                this.element.trigger = eleClosestSelector;
              }
              if (!objParams.selector || eleClosestSelector) {
                eleTarget.timerHover = setTimeout(() => {
                  this.show();
                }, 150);
                clearTimeout(eleTarget.timerHold);
              }
            }
          });
          eleTrigger.addEventListener("mouseout", (event) => {
            if (this.element.trigger == event.target || this.element.trigger.contains(event.target)) {
              clearTimeout(eleTarget.timerHover);
              eleTarget.timerHold = setTimeout(() => {
                this.hide();
              }, 200);
            }
          });
          if (eleTarget && !eleTarget.isBindDropHover) {
            eleTarget.addEventListener("mouseenter", () => {
              clearTimeout(eleTarget.timerHold);
            });
            eleTarget.addEventListener("mouseleave", () => {
              eleTarget.timerHold = setTimeout(() => {
                let eleRelatedTrigger = eleTarget.element.trigger;
                if (eleRelatedTrigger && eleRelatedTrigger.eventType == "hover") {
                  eleRelatedTrigger.hide();
                }
              }, 100);
            });
            eleTarget.isBindDropHover = true;
          }
          eleTrigger.addEventListener("click", (event) => {
            if (!window.isKeyEvent) {
              return;
            }
            event.preventDefault();
            const eleClosestSelector = funGetClosestChild(event.target);
            if (eleClosestSelector) {
              this.element.trigger = eleClosestSelector;
            }
            if (!objParams.selector || eleClosestSelector) {
              if (!this.open) {
                this.show();
              } else {
                this.hide();
              }
            }
          });
          if (this.eventType != "hover") {
            this.eventType = "hover";
          }
        }
        break;
      }
      case "click":
      case "contextmenu": {
        if (!eleTrigger.isBindDropEvents || eleTrigger.isBindDropEvents !== objParams.eventType) {
          eleTrigger.addEventListener(objParams.eventType, (event) => {
            event.preventDefault();
            const eleClosestSelector = funGetClosestChild(event.target);
            if (eleClosestSelector) {
              this.element.trigger = eleClosestSelector;
            }
            if (!objParams.selector || eleClosestSelector) {
              if (objParams.eventType == "contextmenu") {
                objParams.position = [event.pageX, event.pageY];
                this.show();
                return;
              }
              if (!this.open) {
                this.show();
              } else {
                this.hide();
              }
            }
          });
        }
        break;
      }
      default: {
        break;
      }
    }
    if (objParams.eventType != "null" && !eleTrigger.isBindDocMouseUp) {
      document.addEventListener("mouseup", (event) => {
        let eleClicked = event && event.target;
        if (!eleClicked || !this.open) {
          return;
        }
        let eleTrigger2 = this.element.trigger;
        let eleTarget2 = this.element.target;
        if (eleTrigger2.contains(eleClicked) == false && (!eleTarget2 || eleTarget2.contains(eleClicked) == false)) {
          this.hide();
        }
      });
      eleTrigger.isBindDocMouseUp = true;
    }
    eleTrigger.isBindDropEvents = objParams.eventType || true;
    window.addEventListener("resize", () => {
      this.position();
    });
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    if (eleTrigger != this) {
      eleTrigger.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    }
  }
  /**
   * 下拉定位处理
   * @return {Object} 返回当前自定义元素
   */
  position() {
    let eleTrigger = this.element.trigger;
    let eleTarget = this.element.target;
    if (this.open && eleTarget && window.getComputedStyle(eleTrigger).display != "none") {
      eleTrigger.follow(eleTarget, {
        offsets: this.params.offsets,
        position: this.params.position,
        edgeAdjust: this.params.edgeAdjust
      });
    }
    return this;
  }
  /**
   * 下拉的显示处理
   * @return {Object} 返回当前自定义元素
   */
  show() {
    let eleTrigger = this.element.trigger;
    let eleTarget = this.element.target;
    if (eleTarget && document.body.contains(eleTarget) == false) {
      document.body.appendChild(eleTarget);
    }
    if (eleTarget) {
      eleTarget.style.position = "absolute";
      eleTarget.style.display = "inline";
      eleTarget.classList.add("ESC");
      eleTarget.tabIndex = -1;
      eleTarget.focus({
        preventScroll: true
      });
      eleTarget.element = eleTarget.element || {};
      eleTarget.element.trigger = this;
    }
    eleTrigger.setAttribute("aria-expanded", "true");
    if (!this.open) {
      this.open = true;
    }
    this.position();
    this.dispatchEvent(new CustomEvent("show"));
    if (eleTrigger != this) {
      eleTrigger.dispatchEvent(new CustomEvent("show", {
        detail: {
          type: "ui-drop"
        }
      }));
    }
    return this;
  }
  /**
   * 下拉的隐藏处理
   * @return {Object} 返回当前自定义元素
   */
  hide() {
    let eleTrigger = this.element.trigger;
    let eleTarget = this.element.target;
    if (eleTarget) {
      eleTarget.style.display = "none";
      eleTarget.classList.remove("ESC");
      if (eleTarget.element) {
        delete eleTarget.element.trigger;
      }
    }
    eleTrigger.setAttribute("aria-expanded", "false");
    if (window.isKeyEvent) {
      eleTrigger.focus();
    }
    if (this.open) {
      this.open = false;
    }
    this.dispatchEvent(new CustomEvent("hide"));
    if (eleTrigger != this) {
      eleTrigger.dispatchEvent(new CustomEvent("hide", {
        detail: {
          type: "ui-drop"
        }
      }));
    }
    return this;
  }
  /**
   * drop 拓展list
   * @date 2019-11-01
   * @returns {object} 返回当前自定义元素
   * 兼容以下几种语法
   * new Drop().list(eleTrigger, data);
   * new Drop().list(eleTrigger, data, options);
   * new Drop(eleTrigger).list(data, options);
   * new Drop(eleTrigger, options).list(data);
   */
  list(eleTrigger, data, options) {
    const funGetDataByOption = function(option) {
      let obj = {
        id: option.id || option.value,
        value: option.innerHTML || option.value,
        className: option.className,
        disabled: option.disabled,
        label: option.label,
        accessKey: option.accessKey
      };
      let eleOptgroup = option.closest("optgroup");
      if (eleOptgroup && eleOptgroup.disabled) {
        obj.disabled = true;
      }
      if (option.hasAttribute("href")) {
        obj.href = option.getAttribute("href");
      }
      return obj;
    };
    [...arguments].forEach((argument) => {
      const strTypeArgument = typeof argument;
      if (strTypeArgument === "string") {
        eleTrigger = document.getElementById(argument) || document.querySelector(argument);
      } else if (strTypeArgument === "function") {
        data = argument;
      } else if (strTypeArgument === "object") {
        if (typeof argument.nodeType === "number") {
          if (argument.matches("datalist")) {
            data = function() {
              let eleOptgroups = argument.querySelectorAll("optgroup");
              let isSubTitle = !!argument.querySelector("optgroup[label]");
              if (eleOptgroups.length) {
                let arrData = [];
                eleOptgroups.forEach((optgroup) => {
                  if (isSubTitle) {
                    arrData.push({
                      id: "-1",
                      value: optgroup.label,
                      disabled: optgroup.disabled,
                      className: optgroup.className,
                      heading: true
                    });
                  } else {
                    arrData.push({});
                  }
                  optgroup.querySelectorAll("option").forEach((option) => {
                    arrData.push(funGetDataByOption(option));
                  });
                });
                return arrData;
              }
              return [...argument.querySelectorAll("option")].map((option, index) => {
                let objOption = funGetDataByOption(option);
                if (!objOption.value) {
                  return {};
                }
                if (!objOption.id) {
                  objOption.id = index;
                }
                return objOption;
              });
            };
            if (eleTrigger == argument) {
              eleTrigger = null;
            }
          } else {
            eleTrigger = argument;
          }
        } else if (argument.map) {
          data = argument;
        } else {
          options = argument;
        }
      }
    });
    if (eleTrigger && typeof eleTrigger.nodeType !== "number") {
      eleTrigger = null;
    }
    eleTrigger = eleTrigger || this.element.trigger;
    if (!eleTrigger) {
      return this;
    }
    if (!data) {
      data = [];
    }
    const defaults = {
      // 触发元素显示的事件，‘null’直接显示；‘hover’是hover方法；‘click’是点击显示；其他为手动显示与隐藏。
      eventType: "click",
      offsets: {
        x: 0,
        y: 0
      },
      position: "4-1",
      selector: "",
      width: "",
      onShow: () => {
      },
      onHide: () => {
      },
      // this为当前点击的列表元素，支持两个参数，第一个参数为列表元素对应的数据(纯对象)，第二个是当前实例对象
      onSelect: () => {
      }
    };
    const objParams = {};
    options = options || {};
    Object.keys(defaults).forEach((prop) => {
      objParams[prop] = options[prop] || this.params[prop] || defaults[prop];
    });
    const SELECTED = "selected";
    const DISABLED = "disabled";
    const CL = {
      add: function() {
        return ["ui-droplist"].concat([].slice.call(arguments)).join("-");
      },
      toString: () => {
        return "ui-droplist";
      }
    };
    let strMethod = "innerHTML";
    if (eleTrigger.matches("input")) {
      strMethod = "value";
    }
    let eleTarget = document.createElement("div");
    eleTarget.setAttribute("role", "listbox");
    eleTarget.setAttribute("tabindex", "-1");
    if (/^\d+$/.test(objParams.width)) {
      eleTarget.style.width = objParams.width + "px";
    } else {
      eleTarget.style.width = objParams.width;
    }
    eleTarget.className = CL.add("x");
    this.data = data;
    let arrListData = data;
    let funGetMatchIndex = (arr) => {
      let strMatchIndex2 = "-1";
      let isSomeItemSelected = false;
      let funRecursion = (arrData, arrIndex) => {
        if (!arrData || !arrData.length) {
          return;
        }
        arrData.forEach((objData, numIndex) => {
          const arrCurrentIndex = arrIndex.concat(numIndex);
          if (objData && objData.data) {
            funRecursion(objData.data, arrCurrentIndex);
            return;
          }
          if (objData && objData[SELECTED] && !objData[DISABLED] && objData.value) {
            eleTrigger[strMethod] = objData.value;
            strMatchIndex2 = arrCurrentIndex.join("-");
          }
          if (objData && objData[SELECTED]) {
            isSomeItemSelected = true;
          }
        });
      };
      funRecursion(arr, []);
      const strTrigger = (eleTrigger[strMethod] || "").trim();
      if (isSomeItemSelected == false && strTrigger) {
        funRecursion = (arrData, arrIndex) => {
          if (!arrData || !arrData.length) {
            return;
          }
          arrData.forEach((objData, numIndex) => {
            const arrCurrentIndex = arrIndex.concat(numIndex);
            if (objData && objData.data) {
              funRecursion(objData.data, arrCurrentIndex);
              return;
            }
            if (typeof objData.value === "string" && objData.value.trim() == strTrigger) {
              strMatchIndex2 = arrCurrentIndex.join("-");
              objData[SELECTED] = true;
            }
          });
        };
        funRecursion(arr, []);
      }
      return strMatchIndex2;
    };
    let strMatchIndex = -1;
    if (typeof data !== "function" && data.length && data.map) {
      strMatchIndex = funGetMatchIndex(arrListData);
    }
    const funRender = (eleTarget2, arrListData2) => {
      if (typeof arrListData2 === "function") {
        arrListData2 = arrListData2();
        strMatchIndex = funGetMatchIndex(arrListData2);
      }
      if (!arrListData2 || !arrListData2.length) {
        arrListData2 = [{
          value: "没有数据",
          disabled: true
        }];
      } else {
        arrListData2 = arrListData2.map((arrData) => {
          if (typeof arrData == "string" && arrData !== "-") {
            return {
              value: arrData
            };
          }
          return arrData;
        });
      }
      let isSomeItemSelected = arrListData2.some((objData) => {
        return objData && objData[SELECTED];
      });
      eleTarget2.innerHTML = (() => {
        let strHtml = "";
        const funStep = (arrData, arrIndex) => {
          let strHtmlStep = "";
          arrData.forEach((objData, numIndex) => {
            if (objData == "-" || objData === null || JSON.stringify(objData) == "{}") {
              strHtmlStep += '<hr class="' + CL.add("hr") + '">';
              return;
            }
            const arrCurrentIndex = arrIndex.concat(numIndex);
            let strAttrHref = objData.href;
            if (typeof strAttrHref != "string") {
              strAttrHref = "javascript:";
            } else if (!strAttrHref) {
              strAttrHref = location.href.split("#")[0];
            }
            let strAttrTarget = "";
            if (objData.target) {
              strAttrTarget = ' target="' + objData.target + '"';
            }
            let strAttrSublist = "";
            if (objData.data) {
              strAttrSublist = " data-sublist";
            }
            let strAttrLabel = "";
            if (objData.label) {
              strAttrLabel = ' aria-label="' + objData.label + '"';
            }
            let strAttrAccess = "";
            if (objData.accessKey) {
              strAttrAccess = ` accesskey="${objData.accessKey}"`;
            }
            if (isSomeItemSelected == false && strMatchIndex == arrCurrentIndex.join("-")) {
              objData[SELECTED] = true;
            }
            let strAttrClass = CL.add("li") + " " + objData.className;
            if (objData[SELECTED]) {
              strAttrClass = strAttrClass + " " + SELECTED;
            }
            strAttrClass = strAttrClass.trim();
            if (objData.heading == true) {
              if (objData.disabled) {
                strAttrClass += " disabled";
              }
              strHtmlStep += '<div class="' + strAttrClass + '"' + strAttrLabel + ' role="heading">' + objData.value + "</div>";
              return;
            }
            if (objData[DISABLED] != true) {
              strHtmlStep += '<a href="' + strAttrHref + '"' + strAttrTarget + strAttrLabel + strAttrAccess + ' class="' + strAttrClass + '" data-index="' + arrCurrentIndex.join("-") + '" role="option" aria-selected="' + (objData[SELECTED] || "false") + '" ' + strAttrSublist + ">" + objData.value + "</a>";
              if (objData.data) {
                strHtmlStep += '<div class="' + CL.add("xx") + '"><div class="' + CL.add("x") + '" role="listbox">' + funStep(objData.data, arrCurrentIndex) + "</div></div>";
              }
            } else {
              strHtmlStep += '<span class="' + strAttrClass + '"' + strAttrLabel + strAttrAccess + ">" + objData.value + "</span>";
            }
          });
          return strHtmlStep;
        };
        strHtml += funStep(arrListData2, []);
        return strHtml;
      })();
      eleTarget2.listData = arrListData2;
    };
    this.setParams({
      eventType: objParams.eventType,
      offsets: objParams.offsets,
      selector: objParams.selector,
      position: objParams.position,
      onShow: function() {
        funRender.call(this, eleTarget, this.data);
        objParams.onShow.apply(this, arguments);
      },
      onHide: objParams.onHide
    });
    this.element.trigger = eleTrigger;
    this.element.target = eleTarget;
    this.events();
    eleTarget.addEventListener("click", (event) => {
      if (event.target.nodeType != 1 || !event.target.closest) {
        return;
      }
      const eleClicked = event.target.closest("a");
      if (!eleClicked) {
        return;
      }
      const arrListData2 = eleTarget.listData;
      const strIndex = eleClicked.getAttribute("data-index");
      if (!strIndex) {
        return;
      }
      let objItemData = null;
      strIndex.split("-").forEach((numIndex) => {
        if (objItemData === null) {
          objItemData = arrListData2[numIndex];
        } else if (objItemData.data) {
          objItemData = objItemData.data[numIndex];
        } else {
          objItemData = objItemData[numIndex];
        }
      });
      if (!objItemData) {
        return;
      }
      if (typeof eleClicked.getAttribute("data-sublist") === "string") {
        eleClicked.classList.add(SELECTED);
        const eleSubTarget = eleClicked.nextElementSibling.querySelector("." + CL.add("x"));
        if (!eleSubTarget) {
          return;
        }
        eleSubTarget.style.transform = "";
        eleSubTarget.classList.remove("reverse");
        const objBounding = eleSubTarget.getBoundingClientRect();
        if (objBounding.right > document.documentElement.clientWidth) {
          eleSubTarget.classList.add("reverse");
        }
        let offsetTop = 0;
        if (objBounding.bottom > window.innerHeight) {
          offsetTop = window.innerHeight - objBounding.bottom;
        }
        eleSubTarget.style.transform = "translateY(" + offsetTop + "px)";
        return;
      }
      if (strIndex != strMatchIndex) {
        let objLastItemData = null;
        if (strMatchIndex != "-1") {
          strMatchIndex.split("-").forEach((numIndex) => {
            if (objLastItemData === null) {
              objLastItemData = arrListData2[numIndex];
            } else if (objLastItemData.data) {
              objLastItemData = objLastItemData.data[numIndex];
            } else {
              objLastItemData = objLastItemData[numIndex];
            }
          });
          if (objLastItemData) {
            delete objLastItemData[SELECTED];
          }
        }
        objItemData[SELECTED] = true;
        strMatchIndex = strIndex;
      }
      (this.params.onSelect || objParams.onSelect).call(this, objItemData, eleClicked);
      this.dispatchEvent(new CustomEvent("select", {
        detail: {
          data: objItemData,
          target: eleClicked
        }
      }));
      if (eleTrigger != this) {
        eleTrigger.dispatchEvent(new CustomEvent("select", {
          detail: {
            type: "ui-drop",
            data: objItemData,
            target: eleClicked
          }
        }));
      }
      if (objParams.eventType != "contextmenu" && objParams.selector == "" && !objItemData.href) {
        eleTrigger[strMethod] = objItemData.value;
      }
      this.hide();
    });
    eleTarget.addEventListener("mouseover", (event) => {
      if (event.target.nodeType != 1 || !event.target.closest) {
        return;
      }
      const eleHovered = event.target.closest("a");
      if (!eleHovered) {
        return;
      }
      const eleItemSublist = eleHovered.parentElement.querySelector("." + SELECTED + "[data-sublist]");
      if (eleItemSublist && eleItemSublist != eleHovered) {
        eleItemSublist.classList.remove(SELECTED);
      }
      if (eleHovered.classList.contains(SELECTED) == false && typeof eleHovered.getAttribute("data-sublist") === "string") {
        eleHovered.click();
      }
    });
    return this;
  }
  /**
   * drop 拓展panel
   * @date 2019-11-01
   * 兼容以下两种语法
   * new Drop().panel(eleTrigger, options);
   * new Drop(eleTrigger).panel(options);
   * new Drop(eleTrigger).panel(eleTarget);
   * @returns {object} 返回当前自定义元素
   */
  panel(eleTrigger, options) {
    if (arguments.length === 2) {
      eleTrigger = arguments[0];
      options = arguments[1];
    } else if (arguments.length === 1) {
      options = arguments[0];
      if (options.matches && options.matches("dialog")) {
        let eleTarget = options;
        let strButtons = eleTarget.dataset.buttons;
        var arrButtons = [];
        if (strButtons !== "" && strButtons !== "null" && strButtons !== "false") {
          strButtons = strButtons || "";
          arrButtons = [{
            value: strButtons.split(",")[0].trim(),
            events: () => {
              eleTarget.dispatchEvent(new CustomEvent("ensure", {
                detail: {
                  drop: this
                }
              }));
            }
          }, {
            value: (strButtons.split(",")[1] || "").trim(),
            events: () => {
              eleTarget.dispatchEvent(new CustomEvent("cancel", {
                detail: {
                  drop: this
                }
              }));
              this.hide();
            }
          }];
        }
        options = {
          content: eleTarget.innerHTML,
          title: eleTarget.title,
          buttons: arrButtons
        };
      }
      eleTrigger = null;
    }
    if (typeof eleTrigger === "string") {
      eleTrigger = document.querySelector(eleTrigger);
    }
    eleTrigger = eleTrigger || this.element.trigger;
    if (!eleTrigger) {
      return this;
    }
    options = options || {};
    ["width", "eventType", "selector", "offsets", "position"].forEach(function(strKey) {
      const strAttrKey = eleTrigger.getAttribute(strKey) || eleTrigger.dataset[strKey.toLowerCase()];
      if (strAttrKey && typeof options[strKey] == "undefined") {
        options[strKey] = strAttrKey;
      }
    });
    const defaults = {
      title: "",
      content: "",
      buttons: [{}, {}],
      width: "auto",
      eventType: "click",
      selector: "",
      offsets: {
        x: 0,
        y: 0
      },
      position: "4-1",
      onShow: () => {
      },
      onHide: () => {
      }
    };
    const objParams = Object.assign({}, defaults, options);
    const CL = {
      add: function() {
        return ["ui-dropanel"].concat([].slice.call(arguments)).join("-");
      },
      toString: () => {
        return "ui-dropanel";
      }
    };
    const elePanel = document.createElement("div");
    elePanel.className = CL.add("x");
    if (/^\d+$/.test(objParams.width)) {
      elePanel.style.width = objParams.width + "px";
    } else if (/^\d+\D+$/.test(objParams.width)) {
      elePanel.style.width = objParams.width;
    }
    const eleTitle = document.createElement("h5");
    eleTitle.className = CL.add("title");
    eleTitle.innerHTML = objParams.title;
    const eleClose = document.createElement("button");
    eleClose.setAttribute("aria-label", "关闭");
    eleClose.className = CL.add("close");
    const eleContent = document.createElement("content");
    eleContent.className = CL.add("content");
    eleContent.innerHTML = objParams.content;
    const eleFooter = document.createElement("div");
    eleFooter.className = CL.add("footer");
    elePanel.appendChild(eleTitle);
    elePanel.appendChild(eleClose);
    elePanel.appendChild(eleContent);
    elePanel.appendChild(eleFooter);
    this.setParams({
      eventType: objParams.eventType,
      offsets: objParams.offsets,
      // 实现点击或hover事件的委托实现
      selector: objParams.selector,
      position: objParams.position,
      onShow: objParams.onShow,
      onHide: objParams.onHide
    });
    Object.assign(this.element, {
      trigger: eleTrigger,
      target: elePanel,
      panel: elePanel,
      title: eleTitle,
      close: eleClose,
      content: eleContent,
      footer: eleFooter
    });
    this.events();
    eleClose.addEventListener("click", () => {
      this.hide();
    }, false);
    objParams.buttons.forEach((objBtn, numIndex) => {
      objBtn = objBtn || {};
      let strType = objBtn.type || "";
      if (!strType && numIndex == 0) {
        strType = objParams.buttons.length > 1 ? "danger" : "primary";
      }
      let strValue = objBtn.value;
      if (!strValue) {
        strValue = ["确定", "取消"][numIndex];
      }
      let objEvents = objBtn.events || {
        click: () => {
          this.hide();
        }
      };
      if (typeof objEvents === "function") {
        objEvents = {
          click: objEvents
        };
      }
      let eleBtn = null;
      if (objBtn["for"]) {
        eleBtn = document.createElement("label");
        eleBtn.setAttribute("for", objBtn["for"]);
        eleBtn.setAttribute("role", "button");
      } else if (objBtn.form) {
        eleBtn.setAttribute("form", objBtn.form);
        eleBtn.type = "submit";
      } else {
        eleBtn = document.createElement("button");
        this.element["button" + numIndex] = eleBtn;
      }
      eleBtn.innerHTML = strValue;
      eleBtn.className = String(CL).replace("dropanel", "button") + " " + CL.add("button") + " " + (objBtn.className || "");
      eleBtn.setAttribute("data-type", strType || "normal");
      this.element["button" + numIndex] = eleBtn;
      for (let strEventType in objEvents) {
        eleBtn.addEventListener(strEventType, (event) => {
          event.drop = this;
          objEvents[strEventType](event);
        }, false);
      }
      this.element.footer.appendChild(eleBtn);
    });
    return this;
  }
  /**
   * <ui-drop>元素进入页面中的时候
  **/
  connectedCallback() {
    let eleTarget = this.element.target;
    let eleTrigger = this.element.trigger;
    if (eleTrigger.open) {
      eleTrigger.setAttribute("aria-expanded", "true");
    } else {
      eleTrigger.setAttribute("aria-expanded", "false");
    }
    if (!eleTarget) {
      this.events(eleTrigger === this);
    } else if (eleTarget.matches("datalist")) {
      this.list(eleTarget);
    } else if (eleTarget.matches("dialog")) {
      this.panel(eleTarget);
    } else {
      this.events();
    }
    if (!this.querySelector("a, button") && !this.closest("a, button")) {
      this.tabIndex = 0;
      this.role = "button";
    }
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-drop"
      }
    }));
    if (eleTrigger != this && eleTrigger.hasAttribute("is-drop")) {
      eleTrigger.dispatchEvent(new CustomEvent("connected", {
        detail: {
          type: "ui-drop"
        }
      }));
      eleTrigger.setAttribute("defined", "");
    }
    this.isConnectedCallback = true;
  }
  // open属性变化的时候
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "target") {
      let eleTarget = document.getElementById(newValue);
      if (eleTarget) {
        this.element.target = eleTarget;
      }
    } else if (name == "open") {
      let strAriaExpanded = this.element.trigger.getAttribute("aria-expanded");
      if (this.open && strAriaExpanded == "false") {
        this.show();
      } else if (!this.open && strAriaExpanded == "true") {
        this.hide();
      }
    }
  }
};
window.Drop = Drop;
if (!customElements.get("ui-drop")) {
  customElements.define("ui-drop", Drop);
}
HTMLElement.prototype.drop = function(eleTarget, options) {
  if (!this.matches("ui-drop, [is-drop]") && !this["ui-drop"]) {
    this["ui-drop"] = new Drop(this, eleTarget, options);
  }
  return this;
};
var initAllIsDropAttrAction = (ele) => {
  const eleDrops = ele || document.querySelectorAll("[is-drop]");
  eleDrops.forEach((eleTrigger) => {
    let eleTargetId = eleTrigger.getAttribute("is-drop");
    if (eleTargetId && !eleTrigger.dataset.target) {
      eleTrigger.dataset.target = eleTargetId;
    }
    eleTargetId = eleTrigger.dataset.target;
    let eleTarget = eleTargetId && document.getElementById(eleTargetId);
    if (eleTarget && !eleTrigger["ui-drop"]) {
      eleTrigger["ui-drop"] = new Drop(eleTrigger, eleTarget);
    }
  });
};
var autoInitAndWatchingIsDropAttr = () => {
  initAllIsDropAttrAction();
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes && mutation.addedNodes.forEach((eleAdd) => {
        if (!eleAdd.tagName) {
          return;
        }
        if (eleAdd.hasAttribute("is-drop")) {
          initAllIsDropAttrAction([eleAdd]);
        } else {
          initAllIsDropAttrAction(eleAdd.querySelectorAll("[is-drop]"));
        }
      });
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};
if (document.readyState != "loading") {
  autoInitAndWatchingIsDropAttr();
} else {
  window.addEventListener("DOMContentLoaded", autoInitAndWatchingIsDropAttr);
}
var Tips = class extends HTMLElement {
  static get observedAttributes() {
    return ["title", "reverse", "for", "eventType", "align"];
  }
  constructor(trigger, content, options) {
    super();
    if (typeof trigger == "string" && /^#?\w+(?:[-_]\w+)*$/.test(trigger)) {
      trigger = document.getElementById(trigger.replace("#", ""));
    }
    if (trigger && trigger.tips) {
      trigger.tips(content, options);
      return trigger["ui-tips"];
    }
    this.target = null;
  }
  get title() {
    let strTitle = this.getAttribute("title");
    if (strTitle) {
      this.setAttribute("data-title", strTitle);
      this.removeAttribute("title");
    } else {
      strTitle = this.getAttribute("data-title") || "";
    }
    return strTitle;
  }
  set title(value) {
    this.setAttribute("data-title", value);
    this.setAttribute("aria-label", value);
  }
  get reverse() {
    return this.getAttribute("reverse") !== null || this.classList.contains("reverse");
  }
  set reverse(value) {
    if (value) {
      this.setAttribute("reverse", "");
    } else {
      this.removeAttribute("reverse");
    }
  }
  get htmlFor() {
    return this.getAttribute("for");
  }
  set htmlFor(v) {
    this.setAttribute("for", v);
  }
  get align() {
    return this.getAttribute("align") || "auto";
  }
  set align(v) {
    this.setAttribute("align", v);
  }
  get eventType() {
    return this.getAttribute("eventtype") || "hover";
  }
  set eventType(v) {
    this.setAttribute("eventtype", v);
  }
  get trigger() {
    const htmlFor = this.htmlFor;
    let eleTrigger;
    if (htmlFor) {
      eleTrigger = document.getElementById(htmlFor);
    }
    return eleTrigger || this;
  }
  create() {
    let eleTrigger = this.trigger;
    let strContent = this.title;
    let eleTips = document.createElement("div");
    eleTips.classList.add("ui-tips-x");
    eleTips.innerHTML = strContent;
    if (!eleTrigger.getAttribute("aria-label")) {
      const strRandomId = "lulu_" + (Math.random() + "").replace("0.", "");
      eleTrigger.setAttribute("aria-labelledby", strRandomId);
    }
    document.body.appendChild(eleTips);
    this.target = eleTips;
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    if (eleTrigger != this) {
      eleTrigger.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    }
  }
  show() {
    let eleTrigger = this.trigger;
    let strContent = this.title;
    if (this.target) {
      this.target.innerHTML = strContent;
    } else {
      this.create();
    }
    this.target.style.display = "block";
    let strPosition = "5-7";
    let strAlign = this.align;
    const isReverse = this.reverse;
    if (strAlign === "auto") {
      strAlign = eleTrigger.dataset.align || eleTrigger.dataset.position || "center";
    }
    if (strAlign === "center") {
      strPosition = !isReverse ? "5-7" : "7-5";
    } else if (strAlign === "left") {
      strPosition = !isReverse ? "1-4" : "4-1";
    } else if (strAlign === "right") {
      strPosition = !isReverse ? "2-3" : "3-2";
    } else if (/^\d-\d$/.test(strAlign)) {
      strPosition = strAlign;
    }
    eleTrigger.follow(this.target, {
      // trigger-target
      position: strPosition,
      // 边界溢出不自动修正
      edgeAdjust: false
    });
    this.target.style.setProperty("--ui-width", eleTrigger.offsetWidth);
    this.target.style.setProperty("--ui-height", eleTrigger.offsetHeight);
    eleTrigger.dispatchEvent(new CustomEvent("show", {
      detail: {
        type: "ui-tips"
      }
    }));
  }
  hide() {
    if (!this.target) {
      return;
    }
    this.target.style.display = "none";
    this.trigger.dispatchEvent(new CustomEvent("hide", {
      detail: {
        type: "ui-tips"
      }
    }));
  }
  events() {
    let eleTrigger = this.trigger;
    const numDelay = 100;
    this.timerTips = null;
    this.handleMouseEnter = () => {
      this.timerTips = setTimeout(() => {
        this.show();
      }, numDelay);
    };
    this.handleMouseLeave = () => {
      clearTimeout(this.timerTips);
      this.hide();
    };
    this.handleFocus = () => {
      if (window.isKeyEvent) {
        this.show();
      }
    };
    this.handleMouseUp = (event) => {
      const eleTarget = event.target;
      if (!eleTrigger.contains(eleTarget) && !this.target.contains(eleTarget)) {
        this.hide();
      }
    };
    if (this.eventType === "hover") {
      eleTrigger.addEventListener("mouseenter", this.handleMouseEnter);
      eleTrigger.addEventListener("mouseleave", this.handleMouseLeave);
      eleTrigger.addEventListener("focus", this.handleFocus);
      eleTrigger.addEventListener("blur", this.hide);
    } else if (this.eventType === "click") {
      eleTrigger.addEventListener("click", this.show);
      document.addEventListener("mouseup", this.handleMouseUp);
    } else {
      this.show();
    }
  }
  connectedCallback() {
    let eleTrigger = this.trigger;
    eleTrigger.originTitle = this.title;
    if (this.isConnectedCallback) {
      return;
    }
    if (!/^a|input|button|area$/i.test(eleTrigger.tagName)) {
      eleTrigger.setAttribute("tabindex", "0");
      eleTrigger.setAttribute("role", "tooltip");
    }
    this.events();
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-tips"
      }
    }));
    if (eleTrigger != this && eleTrigger.hasAttribute("is-tips")) {
      eleTrigger.dispatchEvent(new CustomEvent("connected", {
        detail: {
          type: "ui-tips"
        }
      }));
      eleTrigger.setAttribute("defined", "");
    }
    this.isConnectedCallback = true;
  }
};
if (!customElements.get("ui-tips")) {
  customElements.define("ui-tips", Tips);
}
window.Tips = Tips;
HTMLElement.prototype.tips = function(content, options = {}) {
  if (this.getAttribute("is-tips") === "css" || this.classList.contains("ui-tips")) {
    if (this.title) {
      this.setAttribute("data-title", this.title);
      this.setAttribute("aria-label", this.title);
      this.removeAttribute("title");
    }
    return;
  }
  if (typeof content != "string") {
    options = content || {};
  }
  const isReverse = this.hasAttribute("reverse") || this.classList.contains("reverse");
  if (this["ui-tips"]) {
    this["ui-tips"].toggleAttribute("reverse", isReverse);
    if (typeof options.eventType != "undefined" && options.eventType != "hover" && options.eventType != "click") {
      this["ui-tips"].show();
    }
    return;
  }
  let eleTips = document.createElement("ui-tips");
  if (typeof content == "string") {
    eleTips.title = content;
  } else {
    eleTips.title = this.getAttribute("title") || options.content || "";
  }
  eleTips.toggleAttribute("reverse", isReverse);
  this.removeAttribute("title");
  if (!this.id) {
    this.id = "lulu_" + (Math.random() + "").replace("0.", "");
  }
  eleTips.htmlFor = this.id;
  if (options.eventType) {
    eleTips.eventType = options.eventType;
  }
  if (options.align) {
    eleTips.align = options.align;
  }
  this["ui-tips"] = eleTips;
  eleTips.addEventListener("connected", function() {
    this.remove();
  });
  document.body.appendChild(eleTips);
};
(function() {
  let funTipsInitAndWatching = function() {
    const strSelector = ".ui-tips, [is-tips]";
    document.querySelectorAll(strSelector).forEach((item) => {
      if (item.tips) {
        item.tips();
      }
    });
    var observerTips = new MutationObserver(function(mutationsList) {
      mutationsList.forEach(function(mutation) {
        var nodeAdded = mutation.addedNodes;
        var nodeRemoved = mutation.removedNodes;
        if (nodeAdded.length) {
          nodeAdded.forEach(function(eleAdd) {
            if (!eleAdd.matches) {
              return;
            }
            if (eleAdd.matches(strSelector)) {
              eleAdd.tips();
            } else {
              eleAdd.querySelectorAll(strSelector).forEach((item) => {
                item.tips();
              });
            }
          });
        }
        if (nodeRemoved.length) {
          nodeRemoved.forEach(function(eleRemove) {
            if (!eleRemove.matches) {
              return;
            }
            if (eleRemove["ui-tips"] && eleRemove["ui-tips"].target) {
              eleRemove["ui-tips"].target.remove();
            } else {
              eleRemove.querySelectorAll(strSelector).forEach(function(item) {
                if (item["ui-tips"] && item["ui-tips"].target) {
                  item["ui-tips"].target.remove();
                }
              });
            }
          });
        }
      });
    });
    observerTips.observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  if (document.readyState != "loading") {
    funTipsInitAndWatching();
  } else {
    window.addEventListener("DOMContentLoaded", funTipsInitAndWatching);
  }
})();
var LightTip = class _LightTip extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }
  constructor() {
    super();
    if (arguments.length) {
      _LightTip.custom.apply(this, arguments);
    }
  }
  get type() {
    return this.getAttribute("type");
  }
  get time() {
    let strTime = this.getAttribute("time");
    if (!isNaN(strTime) && !isNaN(parseFloat(strTime))) {
      return Number(strTime);
    }
    return 3e3;
  }
  set type(value) {
    this.setAttribute("type", value);
  }
  set time(value) {
    this.setAttribute("time", value);
  }
  get open() {
    return this.hasAttribute("open");
  }
  set open(value) {
    this.toggleAttribute("open", value);
  }
  connectedCallback() {
    this.setAttribute("tabIndex", 0);
    this.setAttribute("role", "tooltip");
    if (!this.closeMode) {
      this.closeMode = "hide";
    }
    this.addEventListener("click", () => {
      this[this.closeMode]();
    });
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-lighttip"
      }
    }));
    this.isConnectedCallback = true;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "open" && typeof oldValue !== typeof newValue) {
      if (typeof newValue === "string") {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.isTimeHide = true;
          this[this.closeMode]();
          this.position();
        }, this.time);
        this.setAttribute("data-tid", this.timer);
        this.classList.add("ESC");
        this.zIndex();
        this.position();
      } else {
        this.classList.remove("ESC");
      }
      this.tabIndex();
      this.isTimeHide = null;
    }
  }
  zIndex() {
    var numZIndexNew = 19;
    this.parentElement && [...this.parentElement.childNodes].forEach(function(eleChild) {
      if (eleChild.nodeType != 1) {
        return;
      }
      var objStyleChild = window.getComputedStyle(eleChild);
      var numZIndexChild = objStyleChild.zIndex * 1;
      if (numZIndexChild && objStyleChild.display != "none") {
        numZIndexNew = Math.max(numZIndexChild + 1, numZIndexNew);
      }
    });
    this.style.zIndex = numZIndexNew;
  }
  // 定位处理
  position() {
    var elesOpen = [...document.querySelectorAll('ui-lighttip[open]:not([type="loading"])')];
    var elesOpenSort = elesOpen.sort(function(eleA, eleB) {
      return (eleA.getAttribute("data-tid") || 0) - (eleB.getAttribute("data-tid") || 0);
    });
    var objMatchText = {};
    var numIndex = -1;
    elesOpenSort.forEach((ele) => {
      let strText = ele.textContent;
      if (typeof objMatchText[strText] == "undefined") {
        numIndex++;
        objMatchText[strText] = numIndex;
      }
      ele.style.setProperty("--ui-sort-index", objMatchText[strText]);
    });
  }
  // 新的元素层级总是最高
  tabIndex() {
    var eleContainer = this;
    var eleLastActive = _LightTip.lastActiveElement;
    if (this.open == true) {
      var eleActiveElement = document.activeElement;
      if (eleActiveElement && !eleActiveElement.closest("[keepfocus]")) {
        if (eleContainer !== eleActiveElement) {
          _LightTip.lastActiveElement = eleActiveElement;
        }
        eleContainer.focus();
      }
    } else if (eleLastActive && !eleLastActive.matches("body")) {
      eleLastActive.focus({
        preventScroll: true
      });
      if (!window.isKeyEvent && !this.isTimeHide) {
        eleLastActive.blur();
      }
      _LightTip.lastActiveElement = null;
    }
    return this;
  }
  // success
  static success(text, time = 3e3) {
    return this.custom(text, "success", time);
  }
  // error
  static error(text, time = 3e3) {
    return this.custom(text, "error", time);
  }
  // normal
  static normal(text, time = 3e3) {
    return this.custom(text, "normal", time);
  }
  // loading
  static loading(text) {
    text = text || "正在加载中...";
    return this.custom(text, "loading");
  }
  // 调用方法处理
  static custom(text = "", type, time) {
    if (!this.matches || !this.matches("ui-lighttip")) {
      return _LightTip.custom.apply(document.createElement("ui-lighttip"), arguments);
    }
    if (typeof text == "object") {
      type = text;
      text = "";
    }
    if (typeof text != "string") {
      return this;
    }
    this.closeMode = "remove";
    if (type && typeof type === "object") {
      _LightTip.custom.call(this, text, type.type, type.time);
      return;
    }
    if (typeof type === "number") {
      _LightTip.custom.call(this, text, time, type);
      return;
    }
    if (type == "loading") {
      if (!text) {
        text = "正在加载中...";
      }
      time = 999999;
    }
    if (time) {
      this.time = time;
    }
    if (type) {
      this.type = type;
    }
    this.innerHTML = text;
    if (type == "success") {
      this.setAttribute("aria-lable", "操作成功");
    } else if (type == "error") {
      this.setAttribute("aria-lable", "操作失败");
    }
    if (!this.parentElement) {
      document.body.appendChild(this);
      this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    }
    this.show();
    return this;
  }
  remove() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
    this.open = false;
  }
  show() {
    if (this.time > 0) {
      this.open = true;
    }
  }
  hide() {
    this.open = false;
  }
};
if (!customElements.get("ui-lighttip")) {
  customElements.define("ui-lighttip", LightTip);
}
window.LightTip = LightTip;
var ErrorTip = class _ErrorTip {
  static allHide(exclude) {
    _ErrorTip.collectionErrorTip.forEach((obj) => {
      if (exclude != obj) {
        obj.hide();
      }
    });
  }
  constructor(element, content, options) {
    const defaults = {
      unique: true,
      scroller: null,
      onShow: () => {
      },
      onHide: () => {
      }
    };
    const objParams = {
      ...defaults,
      ...options
    };
    let strContent = content;
    if (typeof strContent == "function") {
      strContent = strContent();
    }
    if (typeof strContent != "string") {
      return this;
    }
    this.callback = {
      show: objParams.onShow,
      hide: objParams.onHide
    };
    this.params = {
      unique: objParams.unique,
      scroller: objParams.scroller
    };
    const eleTrigger = element;
    let objErrorTip = eleTrigger.data && eleTrigger.data.errorTip;
    if (objErrorTip) {
      objErrorTip.content = strContent;
      objErrorTip.callback = {
        show: objParams.onShow,
        hide: objParams.onHide
      };
      objErrorTip.element.tips.trigger = eleTrigger;
      objErrorTip.show();
      return this;
    }
    let eleTips;
    let collectionErrorTip = _ErrorTip.collectionErrorTip;
    const objUniqueErrorTip = collectionErrorTip[collectionErrorTip.length - 1];
    if (objParams.unique == true && objUniqueErrorTip) {
      eleTips = objUniqueErrorTip.element.tips;
    } else if (objParams.unique == false && eleTrigger.data && eleTrigger.data.errorTip) {
      eleTips = eleTrigger.data.errorTip.element.tips;
    } else {
      eleTips = this.create(eleTrigger);
    }
    if (objParams.unique == true && collectionErrorTip.includes(this) == false) {
      collectionErrorTip.push(this);
    }
    eleTips.trigger = eleTrigger;
    let scroller = this.params.scroller;
    if (!scroller && eleTrigger) {
      const selector = eleTrigger.dataset.scroller;
      if (selector) {
        scroller = eleTrigger.closest(selector) || eleTrigger.closest("#" + selector);
      }
    }
    if (scroller && scroller != document.scrollingElement && !eleTrigger.errorTipScroller) {
      scroller.addEventListener("scroll", () => {
        if (this.display) {
          this.position();
        }
      });
      eleTrigger.errorTipScroller = scroller;
    }
    this.element = {
      trigger: eleTrigger,
      tips: eleTips
    };
    this.content = strContent;
    if (!eleTrigger.data) {
      eleTrigger.data = {};
    }
    eleTrigger.data.errorTip = this;
    this.show();
  }
  /**
   * 红色出错提示元素的创建
   */
  create() {
    const eleTips = document.createElement("div");
    eleTips.className = "ui-tips-x ui-tips-error";
    document.body.appendChild(eleTips);
    this.events(eleTips);
    return eleTips;
  }
  /**
   * 无论是键盘操作，还是按下，都隐藏出错提示
   * @param {Element} eleTips 表示创建的红色提示元素
   */
  events(eleTips) {
    document.addEventListener("keydown", (event) => {
      if (!/Control|Shift/i.test(event.code)) {
        _ErrorTip.allHide(this);
        this.hide();
      }
    });
    document.addEventListener("mousedown", (event) => {
      const eleActiveElement = document.activeElement;
      const eleActiveTrigger = eleTips.trigger;
      const eleTarget = event.target;
      if (eleActiveElement && eleActiveTrigger && eleActiveElement == eleTarget && eleActiveElement == eleActiveTrigger && // 这个与Datalist.js关联
      !eleActiveTrigger.getAttribute("data-focus")) {
        return;
      }
      _ErrorTip.allHide(this);
      this.hide();
    });
    window.addEventListener("resize", () => {
      _ErrorTip.allHide(this);
      this.hide();
    });
  }
  /**
   * 定位方法
   */
  position() {
    const objElement = this.element;
    const eleTips = objElement.tips;
    const eleTrigger = objElement.trigger;
    eleTrigger.follow(eleTips, {
      // trigger-target
      position: "5-7",
      // 边界溢出不自动修正
      edgeAdjust: false
    });
  }
  /**
   * 错误tips提示显示方法
   */
  show() {
    const objElement = this.element;
    const eleTips = objElement.tips;
    const eleTrigger = objElement.trigger;
    eleTips.innerHTML = this.content;
    eleTips.style.display = "";
    this.position();
    eleTrigger.setAttribute("aria-label", "错误提示：" + this.content);
    eleTrigger.toggleAttribute("is-error", true);
    eleTrigger.classList.add("valided");
    this.display = true;
    if (this.callback && this.callback.show) {
      this.callback.show.call(this, eleTrigger, eleTips);
    }
    eleTrigger.dispatchEvent(new CustomEvent("show", {
      detail: {
        type: "ui-errortip",
        content: this.content
      }
    }));
  }
  /**
     * 错误tips提示隐藏方法
     * @return {Object}  返回当前实例对象
     */
  hide() {
    if (!this.display) {
      return;
    }
    const eleTips = this.element.tips;
    const eleTrigger = this.element.trigger;
    eleTrigger.removeAttribute("aria-label");
    eleTrigger.removeAttribute("is-error");
    eleTips.style.display = "none";
    this.display = false;
    if (this.callback && this.callback.hide) {
      this.callback.hide.call(this, eleTrigger, eleTips);
    }
    eleTrigger.dispatchEvent(new CustomEvent("hide", {
      detail: {
        type: "ui-errortip"
      }
    }));
  }
};
ErrorTip.collectionErrorTip = [];
window.ErrorTip = ErrorTip;
HTMLElement.prototype.errorTip = function(content, options = {}) {
  new ErrorTip(this, content, options);
  return this;
};
(() => {
  if ("loading" in HTMLElement.prototype) {
    return;
  }
  let LOADING = "loading";
  let CL = "ui-" + LOADING;
  Object.defineProperty(HTMLElement.prototype, "loading", {
    configurable: true,
    enumerable: true,
    get() {
      return !!(this.classList.contains(CL) || this.matches(CL));
    },
    set(flag) {
      let action = "remove";
      if (flag) {
        action = "add";
        if (this.loading) {
          return flag;
        }
      }
      let strClassButton = CL.replace(LOADING, "button");
      if (this.classList.contains(strClassButton) || this.getAttribute("is") == strClassButton) {
        this.classList[action](LOADING);
      } else {
        this.classList[action](CL);
      }
    }
  });
  let eleLightLoading = null;
  let timerLoading = null;
  Object.defineProperty(document, "loading", {
    get() {
      return Boolean(eleLightLoading && document.querySelector("ui-lighttip[type=loading]"));
    },
    set(newValue) {
      if (newValue) {
        if (eleLightLoading) {
          document.body.append(eleLightLoading);
          eleLightLoading.open = true;
        } else {
          eleLightLoading = new LightTip({
            type: "loading"
          });
        }
        let numIndex = 0;
        let arrTips = ["正在加载中<ui-dot>...</ui-dot>", "仍在加载中<ui-dot>...</ui-dot>", "请再稍等片刻<ui-dot>...</ui-dot>"];
        if (typeof newValue == "string") {
          arrTips = [newValue];
        } else if (Array.isArray(newValue)) {
          arrTips = newValue;
        }
        eleLightLoading.innerHTML = arrTips[numIndex];
        clearInterval(timerLoading);
        timerLoading = setInterval(() => {
          numIndex++;
          eleLightLoading.innerHTML = arrTips[numIndex] || arrTips[numIndex - 1];
          if (numIndex >= arrTips.length - 1) {
            clearInterval(timerLoading);
          }
        }, 6e3);
      } else {
        eleLightLoading && eleLightLoading.remove();
        clearInterval(timerLoading);
      }
    }
  });
})();
var Loading = class extends HTMLElement {
  constructor() {
    super();
  }
  get size() {
    return this.getAttribute("size") || 2;
  }
  set size(value) {
    this.setAttribute("size", value);
  }
  get rows() {
    return this.getAttribute("rows");
  }
  set rows(value) {
    this.setAttribute("rows", value);
  }
};
if (!customElements.get("ui-loading")) {
  customElements.define("ui-loading", Loading);
}
var XRange = class extends HTMLInputElement {
  static get observedAttributes() {
    return ["max", "min", "step", "disabled"];
  }
  get defaultrange() {
    return this.getAttribute("range") || `${this.getAttribute("from") || this.min || 0},${this.getAttribute("to") || this.max || 100}`;
  }
  set multiple(value) {
    return this.toggleAttribute("multiple", value);
  }
  get multiple() {
    return this.getAttribute("multiple") !== null;
  }
  get from() {
    if (this.element && this.element.otherRange) {
      return Math.min(this.value, this.element.otherRange.value);
    }
    return "";
  }
  get to() {
    if (this.element && this.element.otherRange) {
      return Math.max(this.value, this.element.otherRange.value);
    }
    return "";
  }
  get range() {
    if (this.multiple) {
      return this.from + "," + this.to;
    }
    return "";
  }
  get isFrom() {
    if (this.element && this.element.otherRange) {
      return this.value - this.element.otherRange.value < 0;
    }
    return false;
  }
  set from(v) {
    if (this.element && this.element.otherRange) {
      if (this.isFrom) {
        this.value = v;
      } else {
        this.element.otherRange.value = v;
      }
    }
  }
  set to(v) {
    if (this.element && this.element.otherRange) {
      if (!this.isFrom) {
        this.value = v;
      } else {
        this.element.otherRange.value = v;
      }
    }
  }
  set range(v) {
    if (this.multiple) {
      const [from, to] = v.split(",");
      this.to = to;
      this.from = from;
    }
  }
  connectedCallback() {
    this.tips = this.dataset.tips;
    this.addEventListener("input", this.render);
    this.addEventListener("change", this.change);
    this.addEventListener("touchstart", this.stopPropagation);
    if (this.form) {
      this.form.addEventListener("reset", () => {
        setTimeout(() => {
          this.render();
        }, 1);
      });
    }
    this.element = this.element || {};
    if (this.multiple && !this.element.otherRange) {
      if (getComputedStyle(this.parentNode).position === "static") {
        this.parentNode.style.position = "relative";
      }
      Object.assign(this.element, {
        otherRange: this.cloneNode(false)
      });
      this.element.otherRange.tips = this.tips;
      this.element.otherRange.element = {
        otherRange: this
      };
      this.before(this.element.otherRange);
      this.setAttribute("data-range", "to");
      this.element.otherRange.setAttribute("data-range", "from");
      this.range = this.defaultrange;
    }
    if (this.getAttribute("is") === null) {
      this.setAttribute("is", "ui-range");
    }
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-range"
      }
    }));
    this.isConnectedCallback = true;
    this.render();
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
  }
  disconnectedCallback() {
    this.removeEventListener("input", this.render);
    this.removeEventListener("change", this.change);
    this.removeEventListener("touchstart", this.stopPropagation);
    if (this.element && this.element.otherRange && !this.exchange) {
      this.element.otherRange.remove();
    }
  }
  stopPropagation(ev) {
    ev.stopPropagation();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "disabled" && this.element && this.element.otherRange) {
        this.element.otherRange.disabled = newValue !== null;
      } else {
        this.render();
      }
    }
  }
  change() {
    const eleOtherRange = this.element && this.element.otherRange;
    if (!eleOtherRange) {
      return;
    }
    const isLeft = !this.isFrom && this.nextElementSibling === eleOtherRange;
    const isRight = this.isFrom && this.nextElementSibling !== eleOtherRange;
    const isTop = !this.isFrom && this.nextElementSibling !== eleOtherRange;
    const isBottom = this.isFrom && this.nextElementSibling === eleOtherRange;
    if (isTop || isRight || isBottom || isLeft) {
      this.exchange = true;
      if (isTop || isRight) {
        eleOtherRange.before(this);
        this.setAttribute("data-range", "from");
        eleOtherRange.setAttribute("data-range", "to");
      } else {
        eleOtherRange.after(this);
        this.setAttribute("data-range", "to");
        eleOtherRange.setAttribute("data-range", "from");
      }
      this.exchange = false;
      this.focus();
    }
  }
  render() {
    const max = this.max || 100;
    const min = this.min || 0;
    this.style.setProperty("--percent", (this.value - min) / (max - min));
    if (typeof this.tips == "string") {
      if (/^\d+$/.test(this.tips)) {
        this.dataset.tips = this.value;
      } else if (/^\${value}/.test(this.tips)) {
        this.dataset.tips = this.tips.replace(/\${value}/g, this.value);
      } else {
        this.dataset.tips = this.tips.replace(/\d+/, this.value);
      }
    }
    this.style.setProperty("--from", this.from);
    this.style.setProperty("--to", this.to);
    const eleOtherRange = this.element && this.element.otherRange;
    if (eleOtherRange) {
      eleOtherRange.style.setProperty("--from", this.from);
      eleOtherRange.style.setProperty("--to", this.to);
    }
  }
  addEventListener(...par) {
    document.addEventListener.apply(this, par);
    const eleOtherRange = this.element && this.element.otherRange;
    if (eleOtherRange) {
      document.addEventListener.apply(eleOtherRange, par);
    }
  }
};
var props = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
Object.defineProperty(XRange.prototype, "value", {
  ...props,
  set(v) {
    props.set.call(this, v);
    this.render();
  }
});
if (!customElements.get("ui-range")) {
  customElements.define("ui-range", XRange, {
    extends: "input"
  });
}
var BG_COLOR = "background-color";
var Color = class _Color extends HTMLInputElement {
  // 指定观察的属性，这样attributeChangedCallback才会起作用
  static get observedAttributes() {
    return ["disabled"];
  }
  constructor() {
    super();
    this.setProperty();
  }
  static addClass(...arg) {
    return ["ui", "color", ...arg].join("-");
  }
  // hsl颜色转换成十六进制颜色
  static funHslToHex(h, s, l, a) {
    let r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      const hue2rgb = function(p2, q2, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
        if (t < 1 / 2) return q2;
        if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
        return p2;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const arrRgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    if (a) {
      arrRgb.push(Math.round(a * 255));
    }
    return arrRgb.map((rgb) => {
      rgb = rgb.toString(16);
      if (rgb.length == 1) {
        return "0" + rgb;
      }
      return rgb;
    }).join("");
  }
  // 16进制颜色转换成hsl颜色表示
  static funHexToHsl(hex) {
    hex = (hex || "").replace("#", "");
    if (hex.length == 3 || hex.length == 4) {
      hex = hex.split("").map(function(char) {
        return char + char;
      }).join("");
    }
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    if (hex.length == 8) {
      const a = parseInt(hex.slice(6, 8), 16) / 255;
      return [h, s, l, a];
    }
    return [h, s, l];
  }
  // rgb/rgba颜色转hex
  static funRgbToHex(rgb) {
    if (!rgb) {
      return _Color.defaultValue;
    }
    let arr = [];
    let arrA = [];
    rgb = rgb.replace("#", "").toLowerCase();
    if (/^[0-9A-F]{1,6}$/i.test(rgb)) {
      return "#" + rgb.repeat(Math.ceil(6 / rgb.length)).slice(0, 6);
    }
    if (/^[0-9A-F]{1,8}$/i.test(rgb)) {
      return "#" + rgb.repeat(Math.ceil(8 / rgb.length)).slice(0, 8);
    }
    arr = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/i);
    arrA = rgb.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0|1]?\.?\d+)/i);
    const hex = (x) => ("0" + parseInt(x, 10).toString(16)).slice(-2);
    if (arr && arr.length == 4) {
      return `#${hex(arr[1])}${hex(arr[2])}${hex(arr[3])}`;
    }
    if (arrA && arrA.length == 5) {
      return `#${hex(arrA[1])}${hex(arrA[2])}${hex(arrA[3])}${Math.round(arrA[4] * 255).toString(16).padStart(2, "0")}`;
    }
    return _Color.defaultValue;
  }
  get type() {
    return this.getAttribute("type") || "color";
  }
  set type(v) {
    return this.setAttribute("type", v || "color");
  }
  /**
   * container内的一些事件
   * @return {Object} 返回当前DOM元素对象
   */
  events() {
    const objElement = this.element;
    const eleContainer = objElement.target;
    const eleCircle = objElement.circle;
    const eleFill = objElement.fill;
    const eleArrow = objElement.arrow;
    const eleField = objElement.field;
    const eleOpacity = objElement.opacity;
    eleContainer.addEventListener("click", (event) => {
      const eleTarget = event.target;
      let strValue = "";
      const strCl = eleTarget.className;
      if (/cancel/.test(strCl)) {
        this.hide();
      } else if (/lump/.test(strCl)) {
        strValue = eleTarget.getAttribute("data-color");
        this.value = "#" + strValue;
      } else if (/switch/.test(strCl)) {
        if (eleTarget.textContent === "更多") {
          objElement.more.style.display = "block";
          objElement.basic.style.display = "none";
          eleTarget.textContent = "基本";
          objElement.mode.setAttribute("data-mode", "basic");
        } else {
          objElement.more.style.display = "none";
          objElement.basic.style.display = "block";
          eleTarget.textContent = "更多";
          objElement.mode.setAttribute("data-mode", "more");
        }
        this.match();
      }
    });
    eleField.addEventListener("input", () => {
      const value = this.value;
      if (/^[0-9A-F]{6}$/i.test(value) || /^[0-9A-F]{8}$/i.test(value)) {
        this.match();
      } else if (/^[0-9A-F]{3, 4}$/i.test(value)) {
        this.match(_Color.funRgbToHex("#" + value).replace("#", ""));
      }
    });
    eleField.addEventListener("keyup", (event) => {
      if (event.keyCode == 13) {
        let strValue = eleField.value;
        if (strValue) {
          if (eleOpacity) {
            strValue = _Color.funRgbToHex("#" + strValue).replace("#", "");
          } else {
            strValue = _Color.funRgbToHex("#" + strValue.slice(0, 6)).replace("#", "");
          }
          this.value = "#" + strValue;
        }
        this.hide();
      }
    });
    if (eleOpacity) {
      eleOpacity.addEventListener("input", () => {
        let strValue = eleField.value;
        let curOpacity = Math.round(eleOpacity.value / 100 * 255).toString(16).padStart(2, "0");
        if (strValue) {
          let strValueColor = strValue.slice(0, 6) + curOpacity;
          this.value = strValueColor;
        }
      });
    }
    const objPosArrow = {};
    const objPosCircle = {};
    eleArrow.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      objPosArrow.pageY = event.pageY;
      objPosArrow.top = parseFloat(window.getComputedStyle(eleArrow).top);
    });
    eleFill.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      let eleTarget = event.target;
      const objRect = eleTarget.getBoundingClientRect();
      const numOffsetTop = event.pageY - window.pageYOffset - objRect.top;
      eleArrow.style.top = numOffsetTop + "px";
      this.isTrustedEvent = true;
      this.value = this.getValueByStyle();
      objPosArrow.pageY = event.pageY;
      objPosArrow.top = parseFloat(window.getComputedStyle(eleArrow).top);
    });
    eleCircle.parentElement.querySelectorAll("a").forEach((eleRegion) => {
      eleRegion.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        objPosCircle.pageY = event.pageY;
        objPosCircle.pageX = event.pageX;
        eleCircle.style.left = event.offsetX + "px";
        eleCircle.style.top = event.offsetY + "px";
        objPosCircle.top = parseFloat(event.offsetY);
        objPosCircle.left = parseFloat(event.offsetX);
        this.isTrustedEvent = true;
        this.value = this.getValueByStyle();
      });
    });
    document.addEventListener("pointermove", (event) => {
      if (typeof objPosArrow.top == "number") {
        event.preventDefault();
        let numTop = objPosArrow.top + (event.pageY - objPosArrow.pageY);
        const numMaxTop = eleArrow.parentElement.clientHeight;
        if (numTop < 0) {
          numTop = 0;
        } else if (numTop > numMaxTop) {
          numTop = numMaxTop;
        }
        eleArrow.style.top = numTop + "px";
        this.isTrustedEvent = true;
        this.value = this.getValueByStyle();
      } else if (typeof objPosCircle.top == "number") {
        event.preventDefault();
        const objPos = {
          top: event.pageY - objPosCircle.pageY + objPosCircle.top,
          left: event.pageX - objPosCircle.pageX + objPosCircle.left
        };
        const objMaxPos = {
          top: eleCircle.parentElement.clientHeight,
          left: eleCircle.parentElement.clientWidth
        };
        if (objPos.left < 0) {
          objPos.left = 0;
        } else if (objPos.left > objMaxPos.left) {
          objPos.left = objMaxPos.left;
        }
        if (objPos.top < 0) {
          objPos.top = 0;
        } else if (objPos.top > objMaxPos.top) {
          objPos.top = objMaxPos.top;
        }
        const numColorH = objPos.left / objMaxPos.left;
        const strColorS = 1 - objPos.top / objMaxPos.top;
        eleCircle.style.left = objPos.left + "px";
        eleCircle.style.top = objPos.top + "px";
        const strHsl = `hsl('${[360 * numColorH, 100 * strColorS + "%", "50%"].join()})`;
        eleCircle.style[BG_COLOR] = strHsl;
        this.isTrustedEvent = true;
        this.value = this.getValueByStyle();
      }
    }, {
      passive: false
    });
    document.addEventListener("pointerup", () => {
      objPosArrow.top = null;
      objPosCircle.top = null;
    });
    eleFill.parentElement.querySelectorAll("a").forEach((eleButton) => {
      eleButton.addEventListener("keydown", (event) => {
        if (event.keyCode == 38 || event.keyCode == 40) {
          event.preventDefault();
          let numTop = parseFloat(window.getComputedStyle(eleArrow).top);
          const numMaxTop = eleFill.clientHeight;
          if (event.keyCode == 38) {
            numTop--;
            if (numTop < 0) {
              numTop = 0;
            }
          } else {
            numTop++;
            if (numTop > numMaxTop) {
              numTop = numMaxTop;
            }
          }
          const ariaLabel = eleArrow.getAttribute("aria-label");
          eleArrow.style.top = numTop + "px";
          eleArrow.setAttribute("aria-label", ariaLabel.replace(/\d+/, Math.round(100 * numTop / numMaxTop)));
          this.isTrustedEvent = true;
          this.value = this.getValueByStyle();
        }
      });
    });
    eleCircle.parentElement.querySelectorAll("a").forEach((eleRegion) => {
      eleRegion.addEventListener("keydown", (event) => {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          event.preventDefault();
          const objStyleCircle = window.getComputedStyle(eleCircle);
          let numTop = parseFloat(objStyleCircle.top);
          let numLeft = parseFloat(objStyleCircle.left);
          const numMaxTop = eleRegion.clientHeight;
          const numMaxLeft = eleRegion.clientWidth;
          if (event.keyCode == 38) {
            numTop--;
            if (numTop < 0) {
              numTop = 0;
            }
          } else if (event.keyCode == 40) {
            numTop++;
            if (numTop > numMaxTop) {
              numTop = numMaxTop;
            }
          } else if (event.keyCode == 37) {
            numLeft--;
            if (numLeft < 0) {
              numLeft = 0;
            }
          } else if (event.keyCode == 39) {
            numLeft++;
            if (numLeft > numMaxLeft) {
              numLeft = numMaxLeft;
            }
          }
          eleCircle.style.left = numLeft + "px";
          eleCircle.style.top = numTop + "px";
          this.isTrustedEvent = true;
          this.value = this.getValueByStyle();
        }
      });
    });
    return this;
  }
  /**
   * container内HTML的创建
   * @return {Object} 返回当前DOM元素对象
   */
  create() {
    const eleContainer = this.element.target;
    const isSupportOpacity = this.type === "color-opacity";
    const strHtmlConvert = `<button class="${_Color.addClass("switch")} colorMode" data-mode="more" role="button">更多</button>`;
    const strHtmlCurrent = `<div class="${_Color.addClass("current")}">
            <i class="${isSupportOpacity ? _Color.addClass("current", "square", "opacity") : _Color.addClass("current", "square")} colorCurrent"></i>
            #<input class="${_Color.addClass("current", "input")}" value="${this.value.replace("#", "")}">
        </div>`;
    const arrBasicColorPreset = this.params.color.basicPreset;
    const arrFixedColor = this.params.color.fixed;
    const strHtmlBody = `<div class="${_Color.addClass("body")}">` + function() {
      let strHtml = `<div class="${_Color.addClass("basic")} colorBasicX" role="listbox">`;
      let arrCommonColors = (localStorage.commonColors || "").split(",");
      strHtml += `<aside class="${_Color.addClass("basic", "l")}">` + function() {
        return arrFixedColor.concat(arrCommonColors[0] || "0ff", arrCommonColors[1] || "800180").map(function(color) {
          const strColor = _Color.funRgbToHex(color).replace("#", "");
          return `<a href="javascript:" class="${_Color.addClass("lump")}" data-color="${strColor}" aria-label="${strColor}" style="${BG_COLOR}:#${strColor}" role="option"></a>`;
        }).join("");
      }() + "</aside>";
      strHtml = strHtml + `<div class="${_Color.addClass("basic", "r")}">` + function() {
        let strHtmlRG = "";
        arrBasicColorPreset.forEach((colorItem) => {
          strHtmlRG += `<a href="javascript:" title="#${colorItem}${isSupportOpacity ? "ff" : ""}" class="${_Color.addClass("lump", "preset")}" data-color="${colorItem}${isSupportOpacity ? "ff" : ""}" style="${BG_COLOR}:#${colorItem}${isSupportOpacity ? "ff" : ""}" aria-label="${colorItem}${isSupportOpacity ? "ff" : ""}" role="option"></a>`;
        });
        return strHtmlRG;
      }() + "</div>";
      return strHtml + "</div>";
    }() + function() {
      let html = `<div class="${_Color.addClass("more")} colorMoreX">`;
      html += `<div class="${_Color.addClass("more", "l")}">
                <a href="javascript:" class="${_Color.addClass("cover", "white")}" aria-label="色域背景块" role="region"></a><div class="${_Color.addClass("circle")} colorCircle"></div>
                <div class="${_Color.addClass("gradient")}">
                </div>
                </div><div class="${_Color.addClass("more", "r")}">
                    <div class="${_Color.addClass("more", "fill")} colorFill">
                        <a href="javascript:" class="${_Color.addClass("more", "cover")}" aria-label="明度控制背景条" role="region"></a>
                        <div class="${_Color.addClass("gradient")}" style="background: linear-gradient(#ffffff 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0) 50%, ${_Color.defaultValue} 100%);">
                        </div>
                    </div>
                    <a href="javascript:" class="${_Color.addClass("more", "arrow")} colorArrow" role="slider" aria-label="明度控制按钮：100%"></a>
                </div>`;
      return html + "</div>";
    }() + function() {
      if (isSupportOpacity) {
        let opacityHtml = `<div class="${_Color.addClass("opacity")}">透明度：<input class="${_Color.addClass("opacity", "range")} colorOpacity"type="range"  value="100" min="0" max="100" step="1" data-tips="\${value}%" is="ui-range"></div>`;
        return opacityHtml;
      }
      return "";
    }() + "</div>";
    const strHtmlFooter = "";
    eleContainer.innerHTML = strHtmlConvert + strHtmlCurrent + strHtmlBody + strHtmlFooter;
    Object.assign(this.element, {
      field: eleContainer.querySelector("input"),
      basic: eleContainer.querySelector(".colorBasicX"),
      more: eleContainer.querySelector(".colorMoreX"),
      mode: eleContainer.querySelector(".colorMode"),
      opacity: eleContainer.querySelector(".colorOpacity"),
      circle: eleContainer.querySelector(".colorCircle"),
      fill: eleContainer.querySelector(".colorFill"),
      arrow: eleContainer.querySelector(".colorArrow"),
      current: eleContainer.querySelector(".colorCurrent")
    });
    const propValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    let eleField = this.element.field;
    Object.defineProperty(eleField, "value", {
      ...propValue,
      set(value) {
        propValue.set.call(this, value);
        eleField.dispatchEvent(new CustomEvent("change"));
      }
    });
    if (document.body.contains(eleContainer) == false) {
      document.body.appendChild(eleContainer);
    }
    this.events();
    return this;
  }
  /**
   * 面板的色块啊，圆和尖角位置匹配
   * @param  {String} value 面板UI相匹配的色值，可缺省，表示使用当前输入框的颜色值进行UI变化
   * @return {Object}       返回当前DOM元素对象
   */
  match(value) {
    if (this.display != true) {
      return this;
    }
    const objElement = this.element;
    const eleContainer = objElement.target;
    const eleCurrent = objElement.current;
    const eleMore = objElement.more;
    const eleCircle = objElement.circle;
    const eleFill = objElement.fill;
    const eleArrow = objElement.arrow;
    const eleField = objElement.field;
    const eleOpacity = objElement.opacity;
    let isRePosition = true;
    if (value === false) {
      isRePosition = false;
    }
    let strValue = value || eleField.value;
    if (strValue == "") {
      strValue = _Color.funRgbToHex(getComputedStyle(eleCurrent)[BG_COLOR]).replace("#", "");
      eleField.value = strValue;
    }
    strValue = strValue.replace("#", "");
    if (eleOpacity) {
      if (/^[0-9A-F]{8}$/i.test(strValue)) {
        eleOpacity.value = parseInt(strValue.slice(6, 8), 16) / 255 * 100;
      }
      if (/^[0-9A-F]{6}$/i.test(strValue)) {
        eleField.value += Math.round(eleOpacity.value / 100 * 255).toString(16).padStart(2, "0");
      }
    } else {
      eleCurrent.style[BG_COLOR] = "#" + strValue;
    }
    if (window.getComputedStyle(eleMore).display == "none") {
      const eleActive = eleContainer.querySelector(".active");
      if (eleActive) {
        eleActive.classList.remove("active");
      }
      const eleColorMatch = eleContainer.querySelector(`a[data-color="${strValue.toUpperCase()}"]`);
      if (eleColorMatch) {
        eleColorMatch.classList.add("active");
      }
    } else {
      let numWidth = eleCircle.parentElement.clientWidth;
      let numHeight = eleCircle.parentElement.clientHeight;
      let numColorH = 0;
      let numColorS = 1;
      let numColorL = 0.5;
      if (isRePosition == true) {
        let arrHSL = _Color.funHexToHsl(strValue);
        numColorH = arrHSL[0];
        numColorS = arrHSL[1];
        numColorL = arrHSL[2];
        eleCircle.style.left = numWidth * numColorH + "px";
        eleCircle.style.top = numHeight * (1 - numColorS) + "px";
        eleArrow.style.top = eleArrow.parentElement.clientHeight * (1 - numColorL) + "px";
      } else {
        numColorH = parseFloat(eleCircle.style.left || 0) / numWidth;
        numColorS = 1 - parseFloat(eleCircle.style.top || 0) / numHeight;
      }
      let strColor = `hsl(${[360 * numColorH, Math.round(100 * numColorS) + "%", "50%"].join()}`;
      eleFill.style[BG_COLOR] = strColor;
      eleCircle.style[BG_COLOR] = strColor;
    }
    return this;
  }
  /**
   * 浮层定位方法
   * @return undefined
   */
  position() {
    this.follow();
    return this;
  }
  /**
  * 颜色面板显示
  * @return undefined
  */
  show() {
    let eleContainer = this.element.target;
    if (eleContainer.innerHTML.trim() == "") {
      this.create();
    }
    this.display = true;
    eleContainer.style.display = "inline";
    eleContainer.classList.add("ESC");
    this.setAttribute("aria-expanded", "true");
    this.position();
    const eleCurrent = this.element.current;
    if (!eleCurrent.getAttribute("style")) {
      eleCurrent.style[BG_COLOR] = this.value;
    }
    this.match();
    this.dispatchEvent(new CustomEvent("show", {
      detail: {
        type: "ui-color"
      }
    }));
    return this;
  }
  /**
   * 颜色面板隐藏
   * @return undefined
   */
  hide() {
    let eleContainer = this.element.target;
    eleContainer.style.display = "none";
    eleContainer.classList.remove("ESC");
    this.setAttribute("aria-expanded", "false");
    this.display = false;
    this.focus();
    this.dispatchEvent(new CustomEvent("hide", {
      detail: {
        type: "ui-color"
      }
    }));
    return this;
  }
  /**
   * 给当前元素对象扩展方法、重置原生value属性
   */
  setProperty() {
    Object.defineProperty(this, "getValueByStyle", {
      value: () => {
        const eleCircle = this.element.circle;
        const eleArrow = this.element.arrow;
        const eleOpacity = this.element.opacity;
        if (eleCircle.length * eleArrow.length == 0) {
          return _Color.defaultValue;
        }
        let numColorH, numColorS, numColorL;
        if (eleCircle.style.left) {
          numColorH = parseFloat(window.getComputedStyle(eleCircle).left) / eleCircle.parentElement.clientWidth;
        } else {
          numColorH = 0;
        }
        if (eleCircle.style.top) {
          numColorS = 1 - parseFloat(window.getComputedStyle(eleCircle).top) / eleCircle.parentElement.clientHeight;
        } else {
          numColorS = 1;
        }
        if (eleArrow.style.top) {
          numColorL = 1 - parseFloat(window.getComputedStyle(eleArrow).top) / eleArrow.parentElement.clientHeight;
        } else {
          numColorL = 0;
        }
        if (eleOpacity && eleOpacity.value) {
          return "#" + _Color.funHslToHex(numColorH, numColorS, numColorL, eleOpacity.value / 100);
        }
        return "#" + _Color.funHslToHex(numColorH, numColorS, numColorL);
      }
    });
    const props2 = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    Object.defineProperty(_Color.prototype, "value", {
      ...props2,
      set(value) {
        let strValue = value;
        let strOldValue = this.value;
        if (typeof value == "string") {
          if (/^[a-z]{3,}$/.test(strValue)) {
            document.head.style.backgroundColor = strValue;
            strValue = window.getComputedStyle(document.head).backgroundColor;
            document.head.style.backgroundColor = "";
          }
          strValue = _Color.funRgbToHex(strValue);
          props2.set.call(this, strValue);
          if (!this.params) {
            return;
          }
          const strCommonColors = localStorage.commonColors || "";
          let arrCommonColors = strCommonColors.split(",");
          const arrFixedColor = this.params.color.fixed;
          if (arrFixedColor.some((strFixedColor) => {
            return _Color.funRgbToHex(strFixedColor) == strValue;
          }) == false) {
            arrCommonColors = arrCommonColors.filter((strValueWithSharp) => {
              return strValueWithSharp && strValueWithSharp != strValue.replace("#", "");
            });
            arrCommonColors.unshift(strValue.replace("#", ""));
            localStorage.commonColors = arrCommonColors.join();
            const eleBasic = this.element.basic;
            if (eleBasic) {
              const eleAsideColors = eleBasic.querySelectorAll("aside a");
              const eleBasicColorLast = eleAsideColors[eleAsideColors.length - 2];
              const eleBasicColorSecond = eleAsideColors[eleAsideColors.length - 1];
              eleBasicColorLast.setAttribute("data-color", arrCommonColors[0]);
              eleBasicColorLast.setAttribute("aria-label", arrCommonColors[0]);
              eleBasicColorLast.style[BG_COLOR] = strValue;
              const strColorSecond = arrCommonColors[1] || "0ff";
              eleBasicColorSecond.setAttribute("data-color", strColorSecond);
              eleBasicColorSecond.setAttribute("aria-label", strColorSecond);
              eleBasicColorSecond.style[BG_COLOR] = "#" + strColorSecond;
            }
          }
          this.style.setProperty("--ui-color-opacity", strValue);
          this.element.target.style.setProperty("--ui-color-opacity", strValue);
          if (this.element.field) {
            this.element.field.value = strValue.replace("#", "");
          }
          if (this.isTrustedEvent) {
            this.match(false);
            this.isTrustedEvent = null;
          } else {
            this.match();
          }
        } else if (!strOldValue) {
          strOldValue = _Color.defaultValue;
          props2.set.call(this, strOldValue);
        }
        if (strOldValue && strValue != strOldValue) {
          this.dispatchEvent(new CustomEvent("change", {
            "bubbles": true
          }));
          this.dispatchEvent(new CustomEvent("input", {
            "bubbles": true
          }));
        }
      }
    });
    if (!this.title) {
      this.title = (this.disabled ? "禁止" : "") + "颜色选择";
    }
  }
  attributeChangedCallback(name) {
    if (name == "disabled") {
      if (this.title == "颜色选择" && this.disabled) {
        this.title = "禁止颜色选择";
      } else if (this.title == "禁止颜色选择" && !this.disabled) {
        this.title = "颜色选择";
      }
    }
  }
  connectedCallback() {
    if (!this.id) {
      this.id = "lulu_" + (Math.random() + "").split(".")[1];
    }
    this.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.display != true) {
        this.show();
      }
    });
    if (!this.dataset.position) {
      this.dataset.position = "7-5";
    }
    const eleContainer = document.createElement("div");
    eleContainer.classList.add(_Color.addClass("container"));
    eleContainer.id = ("lulu_" + Math.random()).replace("0.", "");
    this.dataset.target = eleContainer.id;
    this.element = {
      target: eleContainer
    };
    if (this.getAttribute("type") === "color-opacity") {
      this.style.setProperty("--ui-color-opacity", this.value);
      eleContainer.style.setProperty("--ui-color-opacity", this.value);
    }
    const arrBasicColor = ["0", "3", "6", "9", "c", "f"];
    const arrBasicColorPreset = ["2a80eb", "0057c3", "7fdbff", "f7f9fa", "1cad70", "3d9970", "39cccc", "dddddd", "eb4646", "ab2526", "ef8a5e", "a2a9b6", "f59b00", "de6d00", "ffdc00", "4c5161"];
    const arrFixedColor = arrBasicColor.concat("eb4646", "1cad70", "2a80eb", "f59b00");
    this.params = this.params || {};
    this.params.color = {
      basic: arrBasicColor,
      basicPreset: arrBasicColorPreset,
      fixed: arrFixedColor
    };
    document.addEventListener("click", (event) => {
      const eleClicked = event && event.target;
      if (!eleClicked || !this.display) {
        return;
      }
      if (eleClicked != this && eleContainer.contains(eleClicked) == false) {
        this.hide();
      }
    });
    window.addEventListener("resize", () => {
      if (this.display) {
        this.position();
      }
    });
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-color"
      }
    }));
    this.isConnectedCallback = true;
  }
};
Color.defaultValue = "#000000";
if (!customElements.get("ui-color")) {
  customElements.define("ui-color", Color, {
    extends: "input"
  });
}
var Dialog = (() => {
  const DIALOG = "dialog";
  const CL = {
    add: (...arg) => `ui-${DIALOG}-${arg.join("-")}`,
    toString: (value) => `ui-${value || DIALOG}`
  };
  class Component {
    constructor(options = {}) {
      const objParams = {
        title: "",
        // 不同类别的内容类型
        content: "",
        // 弹框的宽度
        width: "auto",
        // 弹框高度
        height: "auto",
        // 不同类别的默认按钮
        buttons: [],
        // 关闭按钮
        closable: true,
        // 弹框显示、隐藏、移除的回调
        onShow: function() {
        },
        onHide: function() {
        },
        onRemove: function() {
        },
        ...options
      };
      const dialog = document.createElement(DIALOG);
      dialog.setAttribute("is", "ui-dialog");
      dialog.addEventListener("DOMContentLoaded", () => {
        if (JSON.stringify(options) != '"{}"') {
          dialog.setParams({
            ...objParams
          });
        }
        if (dialog.hasAttribute("modal")) {
          dialog.showModal();
        } else {
          dialog.show();
        }
      });
      const eleExistDialog = document.querySelector("body > " + DIALOG);
      if (eleExistDialog) {
        eleExistDialog.insertAdjacentElement("beforebegin", dialog);
      } else {
        document.body.appendChild(dialog);
      }
      funDialogRegist(dialog);
      return dialog;
    }
  }
  const DialogPolyfill = function(dialog) {
    this.element = {
      dialog
    };
    if (!dialog.hasAttribute("role")) {
      dialog.setAttribute("role", "dialog");
    }
    dialog.show = this.show.bind(this);
    dialog.showModal = this.showModal.bind(this);
    dialog.close = this.close.bind(this);
    dialog.zIndex = this.zIndex.bind(this);
    Object.defineProperty(dialog, "open", {
      set: this.setOpen.bind(this),
      get: dialog.hasAttribute.bind(dialog, "open")
    });
  };
  DialogPolyfill.prototype = {
    get dialog() {
      return this.element.dialog;
    },
    show() {
      this.setOpen(true);
      this.zIndex();
    },
    showModal() {
      this.setOpen(true);
    },
    close() {
      this.setOpen(false);
      this.dialog.dispatchEvent(new CustomEvent("close", {
        bubbles: false,
        cancelable: false
      }));
    },
    setOpen(value) {
      if (value) {
        this.dialog.setAttribute("open", "");
      } else {
        this.dialog.removeAttribute("open");
      }
    },
    /**
     * 弹框元素zIndex实时最大化
     * 原生dialog无需此能力（更正，浏览器变化，现在也需要了）
     * @return {[type]} [description]
     */
    zIndex() {
      var dialog = this.dialog;
      if (this.matches && this.matches("dialog")) {
        dialog = this;
      }
      const objStyleTarget = window.getComputedStyle(dialog);
      const numZIndexTarget = objStyleTarget.zIndex;
      let numZIndexNew = 19;
      [...document.body.children].forEach(function(eleChild) {
        const objStyleChild = window.getComputedStyle(eleChild);
        const numZIndexChild = objStyleChild.zIndex * 1;
        if (numZIndexChild && (dialog !== eleChild && objStyleChild.display !== "none")) {
          numZIndexNew = Math.max(numZIndexChild + 1, numZIndexNew);
        }
      });
      if (numZIndexNew !== numZIndexTarget) {
        dialog.style.zIndex = numZIndexNew;
      }
    }
  };
  const funDialogRegist = function(dialog) {
    if (dialog.hide && dialog.button) {
      return;
    }
    if ("open" in document.createElement("dialog") == false) {
      new DialogPolyfill(dialog);
    }
    if (dialog.getAttribute("is") == "ui-dialog") {
      Object.defineProperties(dialog, {
        // 劫持原生的open属性
        open: {
          get() {
            return this.hasAttribute("open");
          },
          set(value) {
            this.toggleAttribute("open", value);
          }
        },
        setParams: {
          value: function(options) {
            Object.assign(this.params, options || {});
            if (typeof options.onShow == "function") {
              this.addEventListener("show", function(event) {
                options.onShow.call(this, event);
              });
            }
            if (typeof options.onHide == "function") {
              this.addEventListener("hide", function(event) {
                options.onHide.call(this, event);
              });
            }
            if (typeof options.onRemove == "function") {
              this.addEventListener("remove", function(event) {
                options.onRemove.call(this, event);
              });
            }
            return this.params;
          }
        },
        /**
         * 弹框按钮的处理
         * @returns {Object}  返回当前<dialog>元素
         */
        button: {
          value: function() {
            const objParams = this.params;
            const objElement = this.element;
            objElement.footer.innerHTML = "";
            for (const keyElement in objElement) {
              if (/^button/.test(keyElement)) {
                delete objElement[keyElement];
              }
            }
            objParams.buttons.forEach(function(objButton, numIndex) {
              objButton = objButton || {
                type: "normal"
              };
              let strType = objButton.type;
              let strValue = objButton.value;
              if (strType === "remind" || !strType && numIndex === 0) {
                strType = "primary";
              } else if (!strType && numIndex === 1) {
                strType = "normal";
              }
              if (!strValue) {
                strValue = ["确定", "取消"][numIndex];
              }
              let eleButton = document.createElement("button");
              if (objButton["for"]) {
                eleButton = document.createElement("label");
                eleButton.setAttribute("for", objButton["for"]);
              } else if (objButton.form) {
                eleButton.setAttribute("form", objButton.form);
                eleButton.type = "submit";
              }
              if (objButton.className) {
                eleButton.className = objButton.className;
              }
              eleButton.classList.add(CL.toString("button"));
              if (strType) {
                eleButton.setAttribute("data-type", strType);
              }
              eleButton.disabled = Boolean(objButton.disabled);
              eleButton.innerHTML = strValue;
              objElement.footer.appendChild(eleButton);
              objElement["button" + numIndex] = eleButton;
            });
            objParams.buttons.forEach((objButton, numIndex) => {
              objButton = objButton || {};
              const eleButton = objElement["button" + numIndex];
              if (!eleButton || objButton["for"] || objButton.form) {
                return;
              }
              let objEvents = objButton.events || {
                click: () => {
                  this[this.closeMode]();
                }
              };
              if (typeof objEvents === "function") {
                objEvents = {
                  click: objEvents
                };
              }
              for (const strEventType in objEvents) {
                eleButton.addEventListener(strEventType, (event) => {
                  event.dialog = this;
                  objEvents[strEventType](event);
                });
              }
              eleButton.addEventListener("focus", function() {
                if (window.isKeyEvent) {
                  this.style.outline = "";
                } else {
                  this.style.outline = "none";
                }
              });
            });
            return this;
          }
        },
        /**
         * 固定结构元素的事件绑定
         * @returns {Object}    返回当前<dialog>元素对象
         */
        events: {
          value: function() {
            const objElement = this.element;
            this.addEventListener("animationend", function(event) {
              if (event.target.tagName.toLowerCase() === DIALOG) {
                this.classList.remove(CL.add("animation"));
              }
            });
            const eleClose2 = objElement.close;
            if (eleClose2) {
              eleClose2.addEventListener("click", () => {
                const eleActiveElement = document.activeElement;
                const attrActiveElement = eleActiveElement.getAttribute("data-target");
                let eleTargetElement = null;
                if (attrActiveElement) {
                  eleTargetElement = document.getElementById(attrActiveElement);
                }
                if (window.isKeyEvent && eleTargetElement && eleActiveElement !== eleClose2 && document.querySelector('a[data-target="' + attrActiveElement + '"],input[data-target="' + attrActiveElement + '"],button[data-target="' + attrActiveElement + '"]') && eleTargetElement.clientWidth > 0) {
                  return;
                }
                this[this.closeMode]();
              });
            }
            this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
            return this;
          }
        },
        /**
         * alert类型的弹框，默认仅一个“确定”按钮
         * @param  {String} content    提示文字或者提示HTML片段
         * @param  {Object} options    提示可选参数
         * @return {Object}            返回当前<dialog>元素对象
         */
        alert: {
          value: function(content, options) {
            if (!content) {
              return;
            }
            let strContent = content;
            const defaults = {
              title: "",
              // 类型, 'remind', 'success', 'warning', danger', 或者任意 'custom'
              type: "remind",
              buttons: [{}]
            };
            const objParams = {
              ...defaults,
              ...options
            };
            if (objParams.type === "error" || objParams.type === "fail") {
              objParams.type = "danger";
            } else if (objParams.type === "primary") {
              objParams.type = "remind";
            }
            if (objParams.buttons.length && !objParams.buttons[0].type) {
              objParams.buttons[0].type = objParams.type;
              if (/^remind|success|warning|danger$/.test(objParams.type) === false) {
                objParams.buttons[0].type = defaults.type;
              }
            }
            let nodes = new DOMParser().parseFromString(strContent, "text/html").body.childNodes;
            if (nodes.length == 1) {
              if (nodes[0].nodeType === 3) {
                strContent = '<p class="' + CL.add("wrap") + '">' + strContent + "</p>";
              }
            } else {
              strContent = '<div class="' + CL.add("wrap") + '">' + strContent + "</div>";
            }
            strContent = '<div class="' + CL.add(objParams.type) + " " + CL.add("alert") + '">' + strContent + "</div>";
            this.setParams({
              width: "auto",
              title: objParams.title,
              buttons: objParams.buttons,
              content: strContent
            });
            this.type = "alert";
            this.showModal();
            return this;
          }
        },
        /**
         * confirm类型的弹框，默认有一个“确定”和一个“取消”按钮
         * @param  {String} content    提示文字或者提示HTML片段
         * @param  {Object} options    提示可选参数
         * @return {Object}            返回当前<dialog>元素对象
         */
        confirm: {
          value: function(content, options) {
            if (!content) {
              return;
            }
            let strContent = content;
            const defaults = {
              title: "",
              type: "danger",
              buttons: [{}, {}]
            };
            const objParams = {
              ...defaults,
              ...options
            };
            if (objParams.type === "error" || objParams.type === "fail") {
              objParams.type = "danger";
            }
            if (objParams.type === "primary") {
              objParams.type = "remind";
            }
            if (objParams.buttons.length && !objParams.buttons[0].type) {
              objParams.buttons[0].type = objParams.type;
              if (/^remind|success|warning|danger$/.test(objParams.type) === false) {
                objParams.buttons[0].type = defaults.type;
              }
            }
            let nodes = new DOMParser().parseFromString(strContent, "text/html").body.childNodes;
            if (nodes.length == 1) {
              if (nodes[0].nodeType === 3) {
                strContent = '<p class="' + CL.add("wrap") + '">' + strContent + "</p>";
              }
            } else {
              strContent = '<div class="' + CL.add("wrap") + '">' + strContent + "</div>";
            }
            strContent = '<div class="' + CL.add(objParams.type) + " " + CL.add("confirm") + '">' + strContent + "</div>";
            this.setParams({
              width: "auto",
              title: objParams.title,
              buttons: objParams.buttons,
              content: strContent
            });
            this.type = "confirm";
            this.showModal();
            return this;
          }
        },
        /**
         * loading弹框，通常用在ajax请求之前使用
         * loading结束后可以直接调用弹框实例的open()方法显示
         * @return {Object} 返回当前实例对象
         */
        loading: {
          value: function() {
            const objElement = this.element;
            this.params.content = '<ui-loading rows="10" size="3"></ui-loading>';
            objElement.dialog.classList.add(CL.add("loading"));
            this.showModal();
            return this;
          }
        },
        /**
         * 内容赋值
         */
        content: {
          get() {
            return this.params.content;
          },
          set(content) {
            if (content != this.params.content) {
              this.params.content = content;
              return;
            }
            let eleBody2 = this.element.body;
            let eleDialog2 = this.element.dialog;
            eleDialog2.classList.remove(CL.add("loading"));
            if (typeof content == "function") {
              content = content();
            } else if (typeof content == "string" && /^#?\w+(?:[-_]\w+)*$/i.test(content)) {
              let eleMatch = document.querySelector(content);
              if (eleMatch) {
                if (eleMatch.matches("textarea")) {
                  content = eleMatch.value;
                } else if (eleMatch.matches("script")) {
                  content = eleMatch.innerHTML;
                } else {
                  content = eleMatch;
                }
              }
            }
            this.closeMode = typeof content == "string" ? "remove" : "hide";
            if (this.closeMode == "hide" && eleBody2.innerHTML) {
              let eleProtect = document.createElement("div");
              eleProtect.setAttribute("hidden", "");
              eleBody2.childNodes.forEach((node) => {
                eleProtect.appendChild(node);
              });
              document.body.appendChild(eleProtect);
            }
            eleBody2.innerHTML = "";
            if (this.closeMode == "remove") {
              eleBody2.innerHTML = content;
            } else {
              let eleContentParent = content.parentElement;
              let isParentHidden = eleContentParent && eleContentParent.matches("div[hidden]");
              eleBody2.appendChild(content);
              if (isParentHidden && eleContentParent.innerHTML.trim() === "") {
                eleContentParent.remove();
              }
              if (content.nodeType === 1 && getComputedStyle(content).display == "none") {
                content.removeAttribute("hidden");
                content.style.display = "";
                if (getComputedStyle(content).display == "none") {
                  content.style.display = "revert";
                }
              }
            }
          }
        },
        /**
         * 背景滚动锁定带来的
         * @returns    当前<dialog>元素
         */
        scrollbar: {
          value: function() {
            const eleAllDialog = document.querySelectorAll('dialog[is="ui-dialog"]');
            const isDisplayed = [].slice.call(eleAllDialog).some(function(eleDialog2) {
              return window.getComputedStyle(eleDialog2).display !== "none" && eleDialog2.clientWidth > 0;
            });
            document.documentElement.style.overflow = "";
            document.body.style.borderRight = "";
            const widthScrollbar = window.innerWidth - document.documentElement.clientWidth;
            if (isDisplayed && widthScrollbar) {
              document.documentElement.style.overflow = "hidden";
              document.body.style.borderRight = widthScrollbar + "px solid transparent";
            }
            return this;
          }
        },
        /**
         * 弹框显示
         * @returns    当前<dialog>元素
         */
        show: {
          value: function() {
            if (!this.open) {
              this.classList.add(CL.add("animation"));
              if (typeof HTMLDialogElement == "function") {
                HTMLDialogElement.prototype.show.call(this);
              }
            }
            if (!this.zIndex) {
              this.zIndex = DialogPolyfill.prototype.zIndex.bind(this);
            }
            if (this.zIndex) {
              this.zIndex();
            }
            this.dispatchEvent(new CustomEvent("show", {
              detail: {
                type: "ui-dialog"
              }
            }));
            return this;
          }
        },
        /**
         * 弹框隐藏
         * @returns    当前<dialog>元素
         */
        hide: {
          value: function() {
            this.close();
            this.dispatchEvent(new CustomEvent("hide", {
              detail: {
                type: "ui-dialog"
              }
            }));
            return this;
          }
        },
        /**
         * 弹框移除
         * @returns    当前<dialog>元素
         */
        remove: {
          value: function() {
            this.open = false;
            this.parentElement.removeChild(this);
            this.dispatchEvent(new CustomEvent("remove", {
              detail: {
                type: "ui-dialog"
              }
            }));
            return this;
          }
        }
      });
      dialog.removeAttribute = function(name) {
        if (name == "open") {
          dialog.hide();
          return;
        }
        HTMLElement.prototype.removeAttribute.call(this, name);
      };
      dialog.setAttribute = function(name, value) {
        if (name == "open") {
          dialog.toggleAttribute("open", true);
          return;
        }
        HTMLElement.prototype.setAttribute.call(this, name, value);
      };
      dialog.toggleAttribute = function(name, force) {
        if (name == "open") {
          const value = force !== void 0 ? force : !dialog.open;
          if (value) {
            if (this.hasAttribute("modal")) {
              this.showModal();
            } else {
              this.show();
            }
          } else {
            this.hide();
          }
          return;
        }
        HTMLElement.prototype.toggleAttribute.call(this, name, force);
      };
      dialog.params = new Proxy(dialog.params || {}, {
        get(target, prop) {
          return target[prop];
        },
        set(target, prop, value) {
          if (!dialog.element) {
            return false;
          }
          target[prop] = value;
          if (prop == "title" && dialog.element.title) {
            dialog.element.title.innerHTML = value;
          } else if (prop == "content") {
            dialog.content = value;
          } else if (prop == "buttons") {
            dialog.button();
          } else if (prop == "closable" && dialog.element.close) {
            dialog.element.close.style.display = value ? "" : "none";
          } else if (dialog.element.dialog && (prop == "width" || prop == "height")) {
            let eleDialog2 = dialog.element.dialog;
            eleDialog2.classList.remove(CL.add("stretch"));
            if (value !== "" && Number(value) == value) {
              eleDialog2.style[prop] = value + "px";
            } else if (prop == "height" && value == "stretch") {
              eleDialog2.classList.add(CL.add(value));
            } else {
              if (value == "auto") {
                value = "";
              }
              eleDialog2.style[prop] = value;
            }
          }
          return true;
        }
      });
      const eleDialog = dialog;
      eleDialog.classList.add(CL);
      const eleTitle = document.createElement("h4");
      eleTitle.classList.add(CL.add("title"));
      eleTitle.innerHTML = dialog.title;
      dialog.removeAttribute("title");
      const strIdClose = ("lulu_" + Math.random()).replace("0.", "");
      const eleClose = document.createElement("button");
      eleClose.textContent = "关闭";
      eleClose.classList.add(CL.add("close"), "ESC");
      eleClose.id = strIdClose;
      eleClose.setAttribute("data-target", strIdClose);
      const eleBody = document.createElement("div");
      eleBody.classList.add(CL.add("body"));
      const eleFooter = document.createElement("div");
      eleFooter.classList.add(CL.add("footer"));
      dialog.element = Object.assign(dialog.element || {}, {
        dialog: eleDialog,
        close: eleClose,
        title: eleTitle,
        body: eleBody,
        footer: eleFooter
      });
      let nodesOriginDialog = [...dialog.childNodes].filter((node) => node.nodeType == 1 || node.nodeType == 3);
      if (!nodesOriginDialog.length) {
        eleDialog.append(eleClose, eleTitle, eleBody, eleFooter);
      } else {
        eleDialog.prepend(eleClose);
        if (eleTitle.innerHTML) {
          eleDialog.prepend(eleTitle);
        }
      }
      const strParams = dialog.dataset.params || dialog.getAttribute("params");
      if (strParams && /{/.test(strParams)) {
        try {
          const objParams = new Function("return " + strParams)();
          if (nodesOriginDialog.length) {
            if (objParams.buttons) {
              eleDialog.append(eleFooter);
            }
            if (objParams.title && !eleDialog.contains(eleTitle)) {
              eleDialog.prepend(eleTitle);
            }
          }
          dialog.setParams(objParams);
        } catch (e) {
          console.error(e);
        }
      }
      const moDialogOpen = new MutationObserver(function(mutationsList) {
        mutationsList.forEach((mutation) => {
          let eleDialog2 = mutation.target;
          if (mutation.type == "attributes") {
            eleDialog2.scrollbar();
          }
        });
      });
      moDialogOpen.observe(dialog, {
        attributes: true,
        attributeFilter: ["open"]
      });
      dialog.closeMode = "hide";
      dialog.events();
    }
    dialog.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-dialog"
      }
    }));
    dialog.setAttribute("defined", "");
    dialog.isConnectedCallback = true;
  };
  const funDialogInitAndWatching = function() {
    const elesDialog = document.querySelectorAll("dialog");
    elesDialog.forEach((item) => {
      funDialogRegist(item);
    });
    var observerTips = new MutationObserver(function(mutationsList) {
      mutationsList.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(eleAdd) {
          if (eleAdd.matches && eleAdd.matches("dialog")) {
            funDialogRegist(eleAdd);
          } else if (eleAdd.querySelector) {
            eleAdd.querySelectorAll("dialog").forEach((item) => {
              funDialogRegist(item);
            });
          }
        });
      });
    });
    observerTips.observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  if (document.readyState != "loading") {
    funDialogInitAndWatching();
  } else {
    window.addEventListener("DOMContentLoaded", funDialogInitAndWatching);
  }
  return Component;
})();
window.Dialog = Dialog;
var Datalist = (() => {
  const DATALIST = "datalist";
  const SELECTED = "selected";
  const DISABLED = "disabled";
  const ACTIVE = "active";
  const REVERSE = "reverse";
  const CL = {
    add: (props2) => ["ui", DATALIST].concat([props2]).join("-"),
    toString: () => `ui-${DATALIST}`
  };
  let objEventType = {
    end: "mouseup"
  };
  if ("ontouchstart" in document) {
    objEventType = {
      end: "touchend"
    };
  }
  class Datalist2 extends HTMLInputElement {
    constructor() {
      super();
      if (!this.params) {
        this.params = {};
      }
      if (!this.element) {
        this.element = {};
      }
    }
    /**
     * 过滤HTML标签的方法
     * @param  {String} str 需要过滤的HTML字符串
     * @return {String}     返回过滤后的HTML字符串
     */
    static stripHTML(str) {
      if (typeof str == "string") {
        return str.replace(/<\/?[^<>]*>/g, "").replace(/<\/?[^<>]*>/g, "");
      }
      return "";
    }
    /**
     * 转义HTML标签的方法
     * @param  {String} str 需要转义的HTML字符串
     * @return {String}     转义后的字符串
     */
    static encodeHTML(str) {
      if (typeof str == "string") {
        return str.replace(/<|&|>/g, function(matches) {
          return {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;"
          }[matches];
        });
      }
      return "";
    }
    /**
     * 反转义HTML标签的方法
     * @param  {String} str 需要反转义的字符串
     * @return {String}     反转义后的字符串
     */
    static decodeHTML(str) {
      if (typeof str == "string") {
        return str.replace(/&lt;|&gt;|&amp;/gi, (matches) => {
          return {
            "&lt;": "<",
            "&gt;": ">",
            "&amp;": "&"
          }[matches.toLowerCase()];
        });
      }
      return "";
    }
    // 多个参数快捷设置方法
    setParams(options) {
      Object.assign(this.params, options || {});
    }
    /**
     * @param {Object} value 不同的数据类型统一为function类型
     */
    convertData(value) {
      this.params.data = value || this.params.data;
      if (this.params.data == "auto") {
        let strAttrList = this.getAttribute("list");
        if (strAttrList) {
          let eleDatalist = document.getElementById(strAttrList);
          if (!eleDatalist) {
            setTimeout(() => {
              if (document.getElementById(strAttrList)) {
                this.convertData();
              }
            }, 1);
            return;
          }
          this.removeAttribute("list");
          this.params.data = function() {
            return [].slice.call(eleDatalist.querySelectorAll("option")).map(function(eleOption) {
              let objAttr = {};
              [].slice.call(eleOption.attributes).forEach(function(objNameValue) {
                objAttr[objNameValue.name] = objNameValue.value;
              });
              objAttr.value = objAttr.value || "";
              if (!eleOption.hasAttribute("value")) {
                objAttr.value = eleOption.textContent || "";
              }
              objAttr.label = objAttr.label || "";
              let objDataset = eleOption.dataset;
              for (let strKey in objDataset) {
                if (strKey != "value" && strKey != "label") {
                  objAttr[strKey] = objDataset[strKey];
                } else {
                  objAttr[strKey + "2"] = objDataset[strKey];
                }
              }
              return objAttr;
            });
          };
          this.element.datalist = eleDatalist;
        } else if (this.name && (this.autocomplete === "" || this.autocomplete == "on")) {
          this.params.twice = true;
          this.params.placeholder = false;
          this.params.data = () => {
            let data = [];
            let strList = localStorage[DATALIST + "-" + this.name];
            if (strList) {
              strList.split(",").forEach(function(value2) {
                if (value2 && value2.trim()) {
                  data.push({
                    label: "",
                    value: value2
                  });
                }
              });
            }
            return data;
          };
        } else {
          this.params.data = function() {
            return [];
          };
        }
      } else if (this.params.data instanceof Array) {
        let array = this.params.data;
        this.params.data = function() {
          return array;
        };
      } else if (typeof this.params.data == "function") {
      } else if (typeof this.params.data == "object" && this.params.data.url) {
        let timerAjaxDatalist = null;
        let objParams = {
          ...this.params.data
        };
        this.params.data = () => {
          clearTimeout(timerAjaxDatalist);
          let strName = objParams.name || this.name || "k";
          let strValue = this.value.trim();
          if (strValue == "") {
            this.datalist = [];
            return [];
          }
          let objAjaxParams = new URLSearchParams(objParams.data);
          objAjaxParams.append(strName, strValue);
          let strUrlAjax = objParams.url.split("#")[0];
          if (strUrlAjax.split("?").length > 1) {
            strUrlAjax = strUrlAjax + "&" + objAjaxParams.toString();
          } else {
            strUrlAjax = strUrlAjax + "?" + objAjaxParams.toString();
          }
          let funAjax = async () => {
            const response = await fetch(strUrlAjax);
            this.setAttribute("aria-busy", "true");
            const json = await response.json();
            this.removeAttribute("aria-busy");
            if (json && json.data) {
              let jsonData = json.data;
              if (this.params.encode && jsonData.map) {
                jsonData = jsonData.map((obj) => {
                  if (obj.value) {
                    obj.value = Datalist2.encodeHTML(obj.value);
                  }
                  return obj;
                });
              }
              this.refresh(this.params.filter.call(this, jsonData, strValue));
              if (objParams.success) {
                objParams.success(json);
              }
            } else if (objParams.error) {
              objParams.error(json);
            }
          };
          timerAjaxDatalist = setTimeout(funAjax, 200);
        };
        this.params.placeholder = false;
        if (!this.dataset.edgeAdjust) {
          this.dataset.edgeAdjust = "false";
        }
      }
    }
    /**
     * 本地存储输入框的值
     * @return {Object} 返回当前输入框元素
     */
    store() {
      const strValue = this.val();
      const {
        name: strName
      } = this;
      if (strValue && strName) {
        let arrList = (localStorage[`${DATALIST}-${strName}`] || "").split(",");
        const numIndexMatch = arrList.indexOf(strValue);
        if (numIndexMatch == -1) {
          arrList.unshift(strValue);
        } else if (numIndexMatch != 0) {
          let arrSplice = arrList.splice(numIndexMatch, 1);
          arrList = [arrSplice, ...arrList];
        }
        localStorage[`${DATALIST}-${strName}`] = arrList.join();
      }
      return this;
    }
    /**
     * 清除本地存储的值
     * @param  {String} value value参数存在3种逻辑，具体参见方法内注释
     * @return {Object}       返回当前输入框元素
     */
    removeStore(value) {
      const strName = this.name;
      const strValue = value || this.val();
      if (strValue && strName) {
        if (strValue === true) {
          localStorage.removeItem(`${DATALIST}-${strName}`);
        } else if (typeof strValue == "string") {
          let arrList = (localStorage[`${DATALIST}-${strName}`] || "").split(",");
          const numIndexMatch = arrList.indexOf(strValue);
          if (numIndexMatch != -1) {
            arrList.splice(numIndexMatch, 1);
            localStorage[`${DATALIST}-${strName}`] = arrList.join();
          }
        }
      }
      return this;
    }
    /**
     * 刷新列表
     * @param  {Array} data 刷新列表的数据，可缺省，缺省则调用API中的data()方法获取
     * @return {Object}     返回当前输入框元素
     */
    refresh(data) {
      let eleTarget = this.element.target;
      if (!eleTarget) {
        this.create();
        eleTarget = this.element.target;
      }
      const strValue = this.val();
      let arrData = data;
      if (typeof arrData == "undefined") {
        if (typeof this.params.data != "function") {
          this.convertData();
        }
        if (typeof this.params.data != "function") {
          return this;
        }
        arrData = this.params.data();
        if (!arrData) {
          return this;
        }
        if (this.params.encode && arrData.map) {
          arrData = arrData.map((obj) => {
            if (obj.value) {
              obj.value = Datalist2.encodeHTML(obj.value);
            }
            return obj;
          });
        }
        arrData = this.params.filter.call(this, arrData, strValue);
        if (arrData instanceof Array == false) {
          return this;
        }
      }
      const strResults = this.getAttribute("results");
      const numResults = Number(strResults);
      if (strResults) {
        arrData = arrData.slice(0, numResults);
      }
      this.datalist = arrData;
      let strHtmlList = "";
      if (arrData && arrData.length) {
        this.params.index = -1;
        const strAttrPlaceholder = this.getAttribute("placeholder");
        const strParamPlaceholder = this.params.placeholder;
        arrData.forEach((objData, numIndex) => {
          let strValueEncode = objData.value || "";
          let strValueStrip = Datalist2.stripHTML(strValueEncode).trim().replace(/\n/g, "");
          let strLabelStrip = Datalist2.stripHTML(objData.label || "").trim().replace(/\n/g, "");
          let strClassList = "";
          if (strValue && strValueStrip == strValue || !strValue && strValueStrip == strAttrPlaceholder && strValueStrip != strParamPlaceholder) {
            strClassList = ` ${SELECTED}`;
            this.params.index = numIndex;
          }
          if (objData[DISABLED] || typeof objData[DISABLED] == "string") {
            strClassList = " " + DISABLED;
          }
          if (objData.label) {
            strHtmlList = `${strHtmlList}<li class="${CL.add(
              "option"
            )}${strClassList}" data-value="${strValueStrip}" label="${strLabelStrip}" data-index="${numIndex}"><label class="${CL.add(
              "label"
            )}">${objData.label}</label><span class="${CL.add(
              "value"
            )}">${strValueEncode}</span></li>`;
          } else {
            strHtmlList = `${strHtmlList}<li class="${CL.add(
              "option"
            )}${strClassList}" data-value="${strValueStrip}" data-index="${numIndex}"><span class="${CL.add(
              "value"
            )}">${strValueEncode}</span></li>`;
          }
        });
      }
      if (strHtmlList != "") {
        strHtmlList = `<ul class="${CL.add(
          DATALIST
        )}">${strHtmlList}</ul>`;
      }
      eleTarget.innerHTML = strHtmlList;
      const eleSelected = eleTarget.querySelector("." + SELECTED);
      if (this.display == true && eleSelected) {
        const numOffsetTop = eleSelected.offsetTop - (eleTarget.lastScrollTop || 0);
        if (numOffsetTop < 0 || numOffsetTop >= eleSelected.parentElement.clientHeight) {
          eleSelected.parentElement.scrollTop = eleSelected.offsetTop;
          eleTarget.lastScrollTop = eleSelected.offsetTop;
        } else {
          eleSelected.parentElement.scrollTop = eleTarget.lastScrollTop || 0;
        }
      }
      if (strHtmlList) {
        if (this.display == false) {
          this.show();
        }
        this.position();
      } else if (this.display == true) {
        this.hide();
      }
    }
    /**
     * 创建下拉面板
     * 方法私有
     * @return {Object} 返回当前输入框元素
     */
    create() {
      if (!this.element.target) {
        let strId = this.element.datalist && this.element.datalist.id;
        if (!strId) {
          strId = `lulu_${Math.random()}`.replace("0.", "");
          this.setAttribute("data-target", strId);
        }
        const eleTarget = document.createElement("div");
        eleTarget.classList.add(CL);
        eleTarget.addEventListener("click", (event) => {
          if (event.touches && event.touches.length) {
            event = event.touches[0];
          }
          if (!event.target) {
            return;
          }
          const eleClicked = event.target.closest("li");
          if (eleClicked && eleClicked.classList.contains(DISABLED) == false) {
            const strIndex = eleClicked.getAttribute("data-index");
            this.params.index = Number(strIndex);
            this.val(this.datalist[this.params.index]);
            this.hide();
            this.dispatchEvent(new CustomEvent("select", {
              detail: this.datalist[this.params.index]
            }));
          }
        });
        if (this.id) {
          eleTarget.classList.add(
            CL.add(
              this.id.replace(
                /[A-Z]/g,
                (matches) => `-${matches.toLowerCase()}`
              ).replace(/^-+|-+$/g, "")
            )
          );
        }
        document.body.appendChild(eleTarget);
        this.element.target = eleTarget;
        this.display = false;
        this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
      }
      return this;
    }
    /**
     * 输入框赋值或者取值
     * @param  {String} value 赋予输入框的值，如果缺省，则表示取值
     * @param  {String} label 赋予输入框的值，如果缺省，则表示取值
     * @return {Object}       返回当前输入框元素
     */
    val(props2 = {}) {
      const { value } = props2;
      if (typeof value == "undefined") {
        return Datalist2.encodeHTML(this.value.trim());
      }
      const strValue = value.toString();
      this.value = Datalist2.decodeHTML(Datalist2.stripHTML(strValue.trim()));
      if (strValue != this.oldValue) {
        this.dispatchEvent(
          new CustomEvent("change", {
            bubbles: true,
            detail: { ...props2 }
          })
        );
        this.dispatchEvent(
          new CustomEvent("input", {
            bubbles: true,
            detail: { ...props2 }
          })
        );
      }
      this.oldValue = strValue;
      return this;
    }
    /**
     * 一些事件
     * @return {Object} 返回当前输入框元素
     */
    events() {
      if (document.activeElement != this) {
        this.isFocus = false;
      }
      this.addEventListener("blur", function() {
        this.isFocus = false;
      });
      this.addEventListener("focus", function() {
        if (window.isKeyEvent) {
          this.click();
        }
      });
      this.addEventListener("click", () => {
        if (this.display == false) {
          if (this.params.placeholder === true) {
            this.focusValue = this.value.trim();
            if (this.focusValue) {
              this.setAttribute("placeholder", this.focusValue);
            }
            this.value = "";
          }
          if (this.params.twice == true && this.isFocus == true) {
            this.refresh();
          } else if (!this.params.twice) {
            this.refresh();
          }
        }
        this.isFocus = true;
      });
      this.addEventListener("input", (event) => {
        if (event.isTrusted === false) {
          return;
        }
        if (this.params.placeholder == true || this.value.trim()) {
          this.refresh();
        } else {
          this.hide();
        }
      });
      this.addEventListener("keydown", (event) => {
        let arrData = this.datalist;
        let numIndex = this.params.index;
        const eleTarget = this.element.target;
        if (!eleTarget) return;
        const eleSelected = eleTarget.querySelector(`.${SELECTED}`);
        switch (event.code) {
          case "Escape":
          case "Enter": {
            if (this.display == true) {
              this.hide();
              event.preventDefault();
              if (eleSelected) {
                eleSelected.click();
                event.preventDefault();
                setTimeout(function() {
                  const eleInput = this;
                  if (this.setSelectionRange) {
                    try {
                      eleInput.setSelectionRange(
                        eleInput.value.length,
                        eleInput.value.length
                      );
                    } catch (e) {
                      eleInput.value = eleInput.value;
                    }
                  } else {
                    eleInput.value = eleInput.value;
                  }
                  eleInput.dispatchEvent(
                    new CustomEvent("input", {
                      bubbles: true,
                      detail: arrData[numIndex]
                    })
                  );
                }, 17);
              }
            }
            break;
          }
          case "ArrowUp":
          case "ArrowDown": {
            if (this.display == true && arrData && arrData.length) {
              event.preventDefault();
              const arrIndexMatchAble = [];
              arrData.forEach((objData, numIndexMatch) => {
                if (!objData[DISABLED] && objData[DISABLED] !== "") {
                  arrIndexMatchAble.push(numIndexMatch);
                }
              });
              if (arrIndexMatchAble.length == 0) return;
              let numIndexFilterMatch = arrIndexMatchAble.indexOf(
                numIndex
              );
              if (event.code == "ArrowUp") {
                numIndexFilterMatch--;
              } else {
                numIndexFilterMatch++;
              }
              if (numIndexFilterMatch < 0) {
                numIndex = arrIndexMatchAble[arrIndexMatchAble.length - 1];
              } else if (numIndexFilterMatch > arrIndexMatchAble.length - 1) {
                numIndex = arrIndexMatchAble[0];
              } else {
                numIndex = arrIndexMatchAble[numIndexFilterMatch];
              }
            }
            if (arrData[numIndex]) {
              const curValue = arrData[numIndex];
              this.val(curValue);
            }
            this.select();
            this.refresh(arrData);
            break;
          }
          case "Delete": {
            if (this.display == true && this.params.twice == true && eleSelected) {
              let strValueSelected = eleSelected.getAttribute(
                "data-value"
              );
              this.removeStore(strValueSelected);
              arrData = arrData.filter(
                (objData) => objData.value != strValueSelected
              );
              event.preventDefault();
              const objDataLeave = arrData[numIndex] || arrData[numIndex - 1];
              if (objDataLeave) {
                this.val(objDataLeave.value);
                this.refresh(arrData);
              } else {
                this.value = "";
                this.hide();
              }
            }
            break;
          }
        }
      });
      if (this.form && this.params.data == "auto" && this.name && (this.autocomplete == "" || this.autocomplete == "on")) {
        this.form.addEventListener("submit", () => {
          this.store();
        });
      }
      document.addEventListener(objEventType.end, (event) => {
        if (event.touches && event.touches.length) {
          event = event.touches[0];
        }
        const eleClicked = event.target;
        const eleTarget = this.element.target;
        if (eleTarget && eleClicked.nodeType == 1 && eleTarget.contains(eleClicked) == false) {
          this.hide();
        }
        if (eleClicked != this && this.value.trim() == "") {
          if (this.focusValue) {
            this.value = this.focusValue;
          } else if (typeof this.params.placeholder == "string" && this.params.placeholder !== "auto") {
            this.setAttribute("placeholder", this.params.placeholder);
          }
        }
      });
      window.addEventListener("resize", () => {
        if (this.display == true) {
          this.position();
        }
      });
      return this;
    }
    /**
     * 下拉面板的定位
     * @return {Object} 返回当前实例
     */
    position() {
      const eleTarget = this.element.target;
      if (this && eleTarget) {
        this.follow(eleTarget);
        if (this.display == true) {
          this.classList.add(ACTIVE);
        }
      }
      return this;
    }
    /**
     * 下拉面板显示
     * @return {Object} 返回当前实例
     */
    show() {
      let eleTarget = this.element.target;
      if (!eleTarget) {
        this.create();
        eleTarget = this.element.target;
      }
      const isDisplay = this.display;
      let numWidthTarget = this.params.width;
      const numWidthTrigger = this.getBoundingClientRect().width || this.clientWidth;
      if (numWidthTarget == "auto") {
        numWidthTarget = numWidthTrigger;
      } else if (typeof numWidthTarget == "function") {
        numWidthTarget = numWidthTarget.call(
          this,
          eleTarget
        );
      }
      if (numWidthTarget != "auto" && typeof numWidthTarget != "number") {
        numWidthTarget = numWidthTrigger;
      }
      eleTarget.style.display = "block";
      eleTarget.style.width = numWidthTarget + "px";
      if (typeof eleTarget.lastScrollTop == "number" && eleTarget.querySelector("ul")) {
        eleTarget.querySelector("ul").scrollTop = eleTarget.lastScrollTop;
      }
      this.display = true;
      this.position();
      if (isDisplay == false) {
        this.dispatchEvent(new CustomEvent("show", {
          detail: {
            type: "ui-datalist"
          }
        }));
      }
    }
    /**
     * 下拉面板隐藏
     * @return {Object} 返回当前实例
     */
    hide() {
      const eleTarget = this.element.target;
      if (eleTarget && this.display == true) {
        if (eleTarget.querySelector("ul")) {
          eleTarget.lastScrollTop = eleTarget.querySelector(
            "ul"
          ).scrollTop;
        }
        eleTarget.style.display = "none";
        eleTarget.classList.remove(REVERSE);
        this.dispatchEvent(new CustomEvent("hide", {
          detail: {
            type: "ui-datalist"
          }
        }));
      }
      this.classList.remove(ACTIVE);
      this.classList.remove(REVERSE);
      this.display = false;
    }
    // 元素进入页面时候的生命周期函数执行
    connectedCallback() {
      if (this.isConnectedCallback) {
        return;
      }
      this.params = Object.assign(this.params, {
        filter(data, value) {
          const arr = [];
          if (!data || !data.forEach) {
            return arr;
          }
          if (this.getAttribute("filter") == "none") {
            return data;
          }
          data.forEach(function(obj) {
            if (!value || obj.value.indexOf(value) == 0) {
              arr.push(obj);
            }
          });
          return arr;
        },
        encode: true,
        index: -1,
        data: "auto",
        // 默认值是'auto'，还支持true/和false
        placeholder: "auto",
        width: "auto"
      });
      const strAttrPlaceholder = this.getAttribute("placeholder");
      if (strAttrPlaceholder) {
        this.params.placeholder = strAttrPlaceholder;
      }
      this.display = false;
      if (this.params.placeholder == "auto") {
        this.params.placeholder = true;
      }
      this.events();
      this.convertData();
      if (this.form) {
        this.setAttribute("autocomplete", "off");
      } else {
        this.setAttribute("autocomplete", "new-password");
      }
      this.dispatchEvent(new CustomEvent("connected", {
        detail: {
          type: "ui-datalist"
        }
      }));
      this.isConnectedCallback = true;
      setTimeout(() => {
        if (this.element.datalist) {
          new MutationObserver(() => {
            if (this.display == true) {
              this.refresh();
            }
          }).observe(this.element.datalist, {
            childList: true,
            subtree: true
          });
        }
      }, 20);
    }
  }
  return Datalist2;
})();
if (!customElements.get("ui-datalist")) {
  customElements.define("ui-datalist", Datalist, {
    extends: "input"
  });
}
var DateTime = (() => {
  const CL = {
    toString: () => "ui-datetime"
  };
  ["date", "range", "day", "year", "month", "hour", "minute", "time", "datetime"].forEach((key) => {
    CL[key] = (...args) => ["ui", key, ...args].join("-");
  });
  const SELECTED = "selected";
  const ACTIVE = "active";
  const regDate = /-|\//g;
  String.prototype.toDate = function() {
    let year, month, day;
    const arrDate = this.replace(/年|月|日/g, "-").split(regDate);
    year = arrDate[0] * 1;
    month = arrDate[1] || 1;
    day = arrDate[2] || 1;
    if (!year) {
      return /* @__PURE__ */ new Date();
    }
    return new Date(year, month - 1, day);
  };
  String.prototype.toTime = function() {
    let arrTime = this.trim().split(":").map((hm, index) => {
      if (!hm || /\D/.test(hm)) {
        return "";
      }
      if (hm < 0) {
        return "00";
      } else if (index === 0) {
        if (hm > 23) {
          hm = "23";
        }
      } else if (hm > 59) {
        hm = "59";
      }
      return hm.padStart(2, "0");
    }).filter((_) => _).slice(0, 3);
    if (arrTime.length == 1) {
      arrTime.push("00");
    }
    return arrTime;
  };
  Date.prototype.toArray = function() {
    let year = this.getFullYear();
    let month = this.getMonth() + 1;
    let date = this.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (date < 10) {
      date = `0${date}`;
    }
    return [year, month, date];
  };
  class Component extends HTMLInputElement {
    constructor() {
      super();
    }
    minMaxConvert(value) {
      if (typeof value == "number" && Number.isInteger(value)) {
        if (value > 1e7) {
          value = new Date(value);
        } else if (value < 9999) {
          value = String(value);
        }
      }
      let arrDate = [];
      let arrHourMin = [];
      if (value.toArray) {
        arrDate = value.toArray();
        arrHourMin = (value.getHours() + ":" + value.getMinutes()).toTime();
      } else if (value && typeof value == "string") {
        const arrDateTime = value.split(/\s+|T/);
        arrDate = arrDateTime[0].toDate().toArray();
        if (arrDateTime[1] && arrDateTime[1].includes(":")) {
          arrHourMin = arrDateTime[1].toTime();
        }
      }
      let strType = this.getAttribute("type") || "date";
      if (strType == "date" || strType == "date-range") {
        value = arrDate.join("-");
      } else if (strType == "year") {
        value = arrDate[0];
      } else if (strType == "month" || strType == "month-range") {
        value = arrDate.slice(0, 2).join("-");
      } else if (/^datetime/.test(strType)) {
        value = arrDate.join("-") + " " + arrHourMin.join(":");
      } else {
        if (value.toArray) {
          value = value.getHours() + ":" + value.getMinutes();
        }
        let arrHourMin2 = value.toTime();
        if (!arrHourMin2[0]) {
          return "";
        }
        value = arrHourMin2.join(":");
      }
      return value;
    }
    get min() {
      let strAttrMin = this.getAttribute("min") || "";
      if (strAttrMin) {
        return this.minMaxConvert(strAttrMin).toString();
      }
      return strAttrMin;
    }
    set min(value) {
      if (!value) {
        this.removeAttribute("min");
        return;
      }
      this.setAttribute("min", this.minMaxConvert(value));
    }
    get max() {
      let strAttrMax = this.getAttribute("max") || "";
      if (strAttrMax) {
        return this.minMaxConvert(strAttrMax).toString();
      }
      return strAttrMax;
    }
    set max(value) {
      if (!value) {
        this.removeAttribute("max");
        return;
      }
      this.setAttribute("max", this.minMaxConvert(value));
    }
    get step() {
      let strStep = this.getAttribute("step");
      let strType = this.params.type;
      let numStep = Number(strStep);
      if (strStep && /^\d+$/.test(strStep)) {
        if (strType == "time") {
          if (strStep > 60) {
            if (strStep % 60 != 0 || strStep / 60 > 30) {
              numStep = 1;
            }
          } else if (numStep > 30) {
            numStep = 1;
          }
        } else if (strType == "hour") {
          if (numStep > 12) {
            numStep = 1;
          }
        } else if (strType == "minute" && numStep > 30) {
          numStep = 1;
        }
        return numStep;
      }
      return "";
    }
    set step(value) {
      if (!value) {
        this.removeAttribute("step");
        return;
      }
      this.setAttribute("step", value);
    }
    /**
     * 事件
     * @return {[type]} [description]
     */
    events() {
      const eleContainer = this.element.target;
      eleContainer.addEventListener("click", (event) => {
        if (event.target.nodeType != 1 || !event.target.closest) {
          return;
        }
        const eleClicked = event.target.closest("a, button");
        if (!eleClicked) {
          return;
        }
        let numYear = 0;
        let numMonth = 0;
        let numHour = 0;
        let numDay = 0;
        let arrRange = [];
        let dataRange;
        let strTypeButton = "";
        const strType = eleContainer.dataset.type;
        switch (strType) {
          case "date": {
            if (/prev|next/.test(eleClicked.className)) {
              numMonth = eleClicked.dataset.month;
              this[SELECTED][1] = numMonth * 1;
              const arrMonthDay2 = this.getMonthDay(this[SELECTED]);
              const numDayMax = (() => {
                if (numMonth - 1 < 0) {
                  return arrMonthDay2[11];
                } else if (numMonth > arrMonthDay2.length) {
                  return arrMonthDay2[0];
                }
                return arrMonthDay2[numMonth - 1];
              })();
              numDay = this[SELECTED][2];
              const numDayOverflow = eleContainer.dataDayOverflow;
              if (numDayOverflow) {
                this[SELECTED][2] = Math.min(numDayOverflow, numDayMax);
              } else if (this[SELECTED][2] > numDayMax) {
                this[SELECTED][2] = numDayMax;
                eleContainer.dataDayOverflow = numDay;
              }
              this[SELECTED] = this[SELECTED].join("-").toDate().toArray();
              this.date();
              if (eleContainer.querySelector(`.${SELECTED}[href]`)) {
                this.setValue();
              }
            } else if (/item/.test(eleClicked.className)) {
              numDay = eleClicked.innerHTML;
              if (/\D/.test(numDay)) {
                this[SELECTED] = (/* @__PURE__ */ new Date()).toArray();
              } else {
                if (numDay < 10) {
                  numDay = `0${numDay}`;
                }
                this[SELECTED][2] = numDay;
              }
              this.setValue();
              this.hide();
              delete eleContainer.dataDayOverflow;
            } else if (eleClicked.dataset.type == "month") {
              this.month();
            }
            break;
          }
          case "date-range": {
            if (/prev|next/.test(eleClicked.className)) {
              numMonth = eleClicked.dataset.month * 1;
              arrRange = eleContainer.dataDate || this[SELECTED][0];
              eleContainer.dataDate = new Date(arrRange[0], numMonth - 1, 1).toArray();
              this["date-range"]();
            } else if (/item/.test(eleClicked.className)) {
              numYear = eleClicked.dataset.year;
              numMonth = eleClicked.dataset.month;
              numDay = eleClicked.innerHTML;
              if (numMonth < 10) {
                numMonth = `0${numMonth}`;
              }
              if (numDay < 10) {
                numDay = `0${numDay}`;
              }
              dataRange = this[SELECTED];
              if (dataRange[0].join() == dataRange[1].join()) {
                if (numYear + numMonth + numDay > dataRange[0].join("")) {
                  dataRange[1] = [numYear, numMonth, numDay];
                } else {
                  dataRange[0] = [numYear, numMonth, numDay];
                }
              } else {
                dataRange = [[numYear, numMonth, numDay], [numYear, numMonth, numDay]];
              }
              this[SELECTED] = dataRange;
              this["date-range"]();
            } else if (/button/.test(eleClicked.className)) {
              strTypeButton = eleClicked.dataset.type;
              if (strTypeButton == "primary") {
                this.setValue();
                this.dataRangeSelected = this[SELECTED];
                this.hide();
              } else if (strTypeButton == "normal") {
                if (this.dataRangeSelected) {
                  this[SELECTED] = this.dataRangeSelected;
                }
                this.hide();
              }
            }
            break;
          }
          case "month-range": {
            if (/prev|next/.test(eleClicked.className)) {
              numYear = eleClicked.dataset.year * 1;
              arrRange = eleContainer.dataDate || this[SELECTED][0];
              eleContainer.dataDate = new Date(numYear, arrRange[1], 1).toArray();
              this["month-range"]();
            } else if (/item/.test(eleClicked.className)) {
              numYear = eleClicked.dataset.year;
              numMonth = eleClicked.dataset.value;
              numDay = "01";
              dataRange = this[SELECTED];
              if (dataRange[0].join() == dataRange[1].join()) {
                if (numYear + numMonth + numDay > dataRange[0].join("")) {
                  dataRange[1] = [numYear, numMonth, numDay];
                } else {
                  dataRange[0] = [numYear, numMonth, numDay];
                }
              } else {
                dataRange = [[numYear, numMonth, numDay], [numYear, numMonth, numDay]];
              }
              this[SELECTED] = dataRange;
              this["month-range"]();
            } else if (/button/.test(eleClicked.className)) {
              strTypeButton = eleClicked.dataset.type;
              if (strTypeButton == "primary") {
                this.setValue();
                this.dataRangeSelected = this[SELECTED];
                this.hide();
              } else if (strTypeButton == "normal") {
                if (this.dataRangeSelected) {
                  this[SELECTED] = this.dataRangeSelected;
                }
                this.hide();
              }
            }
            break;
          }
          case "month": {
            if (/prev|next/.test(eleClicked.className)) {
              numYear = eleClicked.dataset.year;
              this[SELECTED][0] = numYear * 1;
              this.month();
              if (eleContainer.querySelector(`.${SELECTED}[href]`)) {
                this.setValue();
              }
            } else if (/item/.test(eleClicked.className)) {
              const value = eleClicked.dataset.value;
              if (value) {
                this[SELECTED][1] = value;
              } else {
                const arrToday = (/* @__PURE__ */ new Date()).toArray();
                this[SELECTED][0] = arrToday[0];
                this[SELECTED][1] = arrToday[1];
              }
              var day = this[SELECTED][2];
              var arrMonthDay = this.getMonthDay(this[SELECTED]);
              if (day > arrMonthDay[this[SELECTED][1] - 1]) {
                this[SELECTED][2] = arrMonthDay[this[SELECTED][1] - 1];
              }
              this.setValue();
              if (this.params.type == "month") {
                this.hide();
              } else {
                this.date();
              }
            } else if (eleClicked.dataset.type == "year") {
              this.year();
            }
            break;
          }
          case "year": {
            if (/prev|next/.test(eleClicked.className)) {
              numYear = eleClicked.dataset.year;
              this[SELECTED][0] = numYear * 1;
              this.year();
              if (eleContainer.querySelector(`.${SELECTED}[href]`)) {
                this.setValue();
              }
            } else if (/item/.test(eleClicked.className)) {
              if (eleClicked.innerHTML == "今年") {
                this[SELECTED][0] = (/* @__PURE__ */ new Date()).getFullYear();
              } else {
                this[SELECTED][0] = eleClicked.innerHTML * 1;
              }
              this.setValue();
              if (this.params.type == "year") {
                this.hide();
              } else {
                this.month();
              }
            }
            break;
          }
          case "time": {
            if (eleClicked.tagName == "BUTTON" && eleClicked.classList.contains(SELECTED) == false) {
              let strTypeButton2 = eleClicked.parentElement.dataset.type;
              let numIndexButton = eleClicked.dataset.index;
              if (strTypeButton2 == "ampm") {
                if (numIndexButton == "0") {
                  this[SELECTED][0] -= 12;
                } else {
                  this[SELECTED][0] = Number(this[SELECTED][0]) + 12;
                }
                this[SELECTED][0] = String(this[SELECTED][0]).padStart(2, "0");
              } else if (strTypeButton2 == "hour") {
                this[SELECTED][0] = numIndexButton.padStart(2, "0");
              } else if (strTypeButton2 == "minute") {
                this[SELECTED][1] = numIndexButton.padStart(2, "0");
              } else if (strTypeButton2 == "second") {
                this[SELECTED][2] = numIndexButton.padStart(2, "0");
              }
              this.setValue();
              this.time();
            }
            break;
          }
          case "minute": {
            if (/prev|next/.test(eleClicked.className)) {
              numHour = eleClicked.getAttribute("data-hour");
              if (numHour.length == 1) {
                numHour = `0${numHour}`;
              }
              this[SELECTED][0] = numHour;
              this.minute();
              if (eleContainer.querySelector(`.${SELECTED}[href]`)) {
                this.setValue();
              }
            } else if (/item/.test(eleClicked.className)) {
              this[SELECTED] = eleClicked.innerHTML.split(":");
              this.setValue();
              this.hide();
            } else if (eleClicked.dataset.type == "hour") {
              this.hour();
            }
            break;
          }
          case "hour": {
            if (/item/.test(eleClicked.className)) {
              this[SELECTED][0] = eleClicked.innerHTML.split(":")[0];
              this.setValue();
              if (this.params.type == "hour") {
                this.hide();
              } else {
                this.minute();
              }
            }
            break;
          }
          case "datetime": {
            const arrSelected = this[SELECTED];
            const eleContainerDate = eleClicked.closest('[data-type="date"]');
            const eleContainerMonth = eleClicked.closest('[data-type="month"]');
            const eleContainerYear = eleClicked.closest('[data-type="year"]');
            const eleContainerTime = eleContainer.querySelector('[data-type="time"]');
            if (eleContainerDate) {
              const arrDate = arrSelected[0];
              if (/prev|next/.test(eleClicked.className)) {
                numMonth = eleClicked.dataset.month;
                arrDate[1] = numMonth * 1;
                const arrMonthDay2 = this.getMonthDay(this[SELECTED]);
                const numDayMax = (() => {
                  if (numMonth - 1 < 0) {
                    return arrMonthDay2[11];
                  } else if (numMonth > arrMonthDay2.length) {
                    return arrMonthDay2[0];
                  }
                  return arrMonthDay2[numMonth - 1];
                })();
                numDay = arrDate[2];
                const numDayOverflow = eleContainer.dataDayOverflow;
                if (numDayOverflow) {
                  arrDate[2] = Math.min(numDayOverflow, numDayMax);
                } else if (arrDate[2] > numDayMax) {
                  arrDate[2] = numDayMax;
                  eleContainer.dataDayOverflow = numDay;
                }
                this[SELECTED][0] = arrDate.join("-").toDate().toArray();
                this.date(eleContainerDate);
                this.time(eleContainerTime);
                if (eleContainer.querySelector(`[data-type="date"] .${SELECTED}[href]`)) {
                  this.setValue();
                }
              } else if (/item/.test(eleClicked.className)) {
                numDay = eleClicked.innerHTML;
                if (/\D/.test(numDay)) {
                  this[SELECTED][0] = (/* @__PURE__ */ new Date()).toArray();
                } else {
                  if (numDay < 10) {
                    numDay = `0${numDay}`;
                  }
                  this[SELECTED][0][2] = numDay;
                }
                this.setValue();
                this.date(eleContainerDate);
                this.time(eleContainerTime);
                delete eleContainer.dataDayOverflow;
              } else if (eleClicked.dataset.type == "month") {
                this.month(eleContainerDate);
              }
            } else if (eleContainerMonth) {
              if (/prev|next/.test(eleClicked.className)) {
                numYear = eleClicked.dataset.year;
                this[SELECTED][0][0] = numYear * 1;
                this.month(eleContainerMonth);
                this.time(eleContainerTime);
                if (eleContainerMonth.querySelector(`.${SELECTED}[href]`)) {
                  this.setValue();
                }
              } else if (/item/.test(eleClicked.className)) {
                const value = eleClicked.dataset.value;
                if (value) {
                  this[SELECTED][0][1] = value;
                } else {
                  const arrToday = (/* @__PURE__ */ new Date()).toArray();
                  this[SELECTED][0][0] = arrToday[0];
                  this[SELECTED][0][1] = arrToday[1];
                }
                this.setValue();
                this.date(eleContainerMonth);
                this.time(eleContainerTime);
              } else if (eleClicked.dataset.type == "year") {
                this.year(eleContainerMonth);
              }
            } else if (eleContainerYear) {
              if (/prev|next/.test(eleClicked.className)) {
                numYear = eleClicked.dataset.year;
                this[SELECTED][0][0] = numYear * 1;
                this.year(eleContainerYear);
                this.time(eleContainerTime);
                if (eleContainerYear.querySelector(`.${SELECTED}[href]`)) {
                  this.setValue();
                }
              } else if (/item/.test(eleClicked.className)) {
                if (eleClicked.innerHTML == "今年") {
                  this[SELECTED][0][0] = (/* @__PURE__ */ new Date()).getFullYear();
                } else {
                  this[SELECTED][0][0] = eleClicked.innerHTML * 1;
                }
                this.setValue();
                this.month(eleContainerYear);
                this.time(eleContainerTime);
              }
            } else if (eleClicked.tagName == "BUTTON" && eleClicked.classList.contains(SELECTED) == false) {
              const arrTime = this[SELECTED][1];
              let strTypeButton2 = eleClicked.parentElement.dataset.type;
              let numIndexButton = eleClicked.dataset.index;
              if (strTypeButton2 == "ampm") {
                if (numIndexButton == "0") {
                  arrTime[0] -= 12;
                } else {
                  arrTime[0] = Number(arrTime[0]) + 12;
                }
                arrTime[0] = String(arrTime[0]).padStart(2, "0");
              } else if (strTypeButton2 == "hour") {
                arrTime[0] = numIndexButton.padStart(2, "0");
              } else if (strTypeButton2 == "minute") {
                arrTime[1] = numIndexButton.padStart(2, "0");
              } else if (strTypeButton2 == "second") {
                arrTime[2] = numIndexButton.padStart(2, "0");
              }
              this[SELECTED][1] = arrTime;
              this.setValue();
              this.time(eleContainerTime);
            }
          }
        }
      });
      this.addEventListener("click", (event) => {
        event.preventDefault();
        if (!this.display) {
          this.show();
        } else {
          this.hide();
        }
      });
      this.addEventListener("keydown", (event) => {
        if (event.code == "Enter") {
          event.preventDefault();
          this.click();
        }
      });
      document.addEventListener("mouseup", (event) => {
        const eleTarget = event.target;
        if (eleTarget && eleTarget != this && eleContainer.contains(eleTarget) == false) {
          if (this.display) {
            this.hide();
          }
        }
      });
      document.addEventListener("keydown", (event) => {
        const strType = eleContainer.dataset.type;
        if (!strType) {
          return;
        }
        if (strType.includes("time") && this.display == true && eleContainer.contains(document.activeElement)) {
          if (/^arrow/i.test(event.key)) {
            event.preventDefault();
            let eleButtonSelected = [...eleContainer.querySelectorAll("." + SELECTED)];
            if (strType.includes("datetime")) {
              eleButtonSelected = [...eleContainer.querySelectorAll('[data-type="time"] .' + SELECTED)];
            }
            let numIndexButton = eleButtonSelected.findIndex((item) => item == event.target);
            let eleButtonClickable = [...event.target.parentElement.querySelectorAll('button:enabled:not([data-visibility="false"])')];
            let numIndexButtonClickable = eleButtonClickable.findIndex((item) => item == event.target);
            if (event.key == "ArrowLeft") {
              numIndexButton--;
              if (eleButtonSelected[numIndexButton]) {
                eleButtonSelected[numIndexButton].focus();
              }
            } else if (event.key == "ArrowRight") {
              numIndexButton++;
              if (eleButtonSelected[numIndexButton]) {
                eleButtonSelected[numIndexButton].focus();
              }
            } else if (event.key == "ArrowUp") {
              let eleButtonPrev = eleButtonClickable[numIndexButtonClickable - 1];
              if (!eleButtonPrev) {
                eleButtonPrev = eleButtonClickable[eleButtonClickable.length - 1];
              }
              if (eleButtonPrev) {
                eleButtonPrev.click();
                eleButtonPrev.focus();
              }
            } else if (event.key == "ArrowDown") {
              let eleButtonNext = eleButtonClickable[numIndexButtonClickable + 1];
              if (!eleButtonNext) {
                eleButtonNext = eleButtonClickable[0];
              }
              if (eleButtonNext) {
                eleButtonNext.click();
                eleButtonNext.focus();
              }
            }
          }
          if (event.key == "Enter") {
            this.hide();
          }
        }
      });
      window.addEventListener("resize", () => {
        if (this.display) {
          this.position();
        }
      });
      return this;
    }
    /**
     * 输入框的值根据日期类型进行格式化
     * @return {Object} 返回当前DOM对象
     */
    format() {
      const strType = this.params.type;
      const strInitValue = this.value.trim();
      if (!strInitValue) {
        return this;
      }
      switch (strType) {
        case "date":
        case "year":
        case "month": {
          const objInitDate = strInitValue.toDate();
          const arrDate = objInitDate.toArray();
          this[SELECTED] = arrDate;
          break;
        }
        case "time":
        case "hour":
        case "minute": {
          const arrTime = strInitValue.toTime();
          if (arrTime.length > 1) {
            this[SELECTED] = [...arrTime];
          }
          break;
        }
        case "datetime":
        case "datetime-local": {
          const arrDateTime = strInitValue.split(/\s+|T/);
          const arrPart1 = arrDateTime[0].toDate().toArray();
          let arrPart2 = ["00", "00"];
          if (arrDateTime[1] && arrDateTime[1].includes(":")) {
            arrPart2 = arrDateTime[1].toTime();
          }
          this[SELECTED] = [arrPart1, arrPart2];
          break;
        }
        case "date-range":
        case "month-range": {
          let objBeginDate = /* @__PURE__ */ new Date();
          let objEndDate = /* @__PURE__ */ new Date();
          const arrRange = strInitValue.split(" ");
          if (arrRange.length == 3) {
            objBeginDate = arrRange[0].toDate();
            objEndDate = arrRange[arrRange.length - 1].toDate();
            this[SELECTED] = [objBeginDate.toArray(), objEndDate.toArray()];
          }
          break;
        }
      }
      return this;
    }
    /**
     * 赋值
     * @return {Object} 返回当前输入框的值
     */
    setValue() {
      const arrSelected = this[SELECTED];
      const strValue = this.value;
      switch (this.params.type) {
        case "date": {
          this.value = arrSelected.join("-");
          break;
        }
        case "month": {
          this.value = arrSelected.slice(0, 2).join("-");
          break;
        }
        case "year": {
          this.value = arrSelected[0];
          break;
        }
        case "date-range": {
          this.value = `${arrSelected[0].join("-")} 至 ${arrSelected[1].join("-")}`;
          break;
        }
        case "month-range": {
          this.value = `${arrSelected[0].slice(0, 2).join("-")} 至 ${arrSelected[1].slice(0, 2).join("-")}`;
          break;
        }
        case "time":
        case "minute": {
          this.value = arrSelected.join(":");
          break;
        }
        case "hour": {
          this.value = `${arrSelected[0]}:00`;
          break;
        }
        case "datetime":
        case "datetime-local": {
          this.value = arrSelected[0].join("-") + " " + arrSelected[1].join(":");
          break;
        }
      }
      if (this.value != strValue) {
        this.dispatchEvent(new CustomEvent("change", {
          "bubbles": true
        }));
      }
      return this.value;
    }
    /**
     * 返回日历HTML字符串等数据的私有方法
     * 因date和range浮层主结构类似，因此这里公用下
     * @param  {Array} arrDate 格式化为数组的日期
     * @return {Object}     返回包含需要的数据的对象，生成的HTML字符内容以及最大最小月份等
     */
    getCalendarData(arrDate) {
      let strHtml = "";
      let strMin = this.min;
      let strMax = this.max;
      const strType = this.params.type;
      if (strType.includes("datetime")) {
        if (strMin) {
          strMin = strMin.split(/\s+/)[0];
        }
        if (strMax) {
          strMax = this.max.split(/\s+/)[0];
        }
      }
      let numMin = (strMin || "0001-01-01").toDate();
      let numMax = (strMax || "9999-00-01").toDate();
      const arrChinese = ["日", "一", "二", "三", "四", "五", "六"];
      const arrMonthDay = this.getMonthDay(arrDate);
      const currentDate = arrDate.join("-").toDate();
      const getStrHtmlDay = () => {
        let strHtmlDay = "";
        arrChinese.forEach((strChineseDay, indexDay) => {
          strHtmlDay = `${strHtmlDay}<span class="${CL.day("item")} col${indexDay}">${strChineseDay}</span>`;
        });
        return strHtmlDay;
      };
      strHtml = `<div class="${CL.day("x")}">${getStrHtmlDay()}</div>`;
      const objNewDate = arrDate.join("-").toDate();
      let numDayFirst = 0;
      objNewDate.setDate(1);
      if (objNewDate.getDate() == 2) {
        objNewDate.setDate(0);
      }
      numDayFirst = objNewDate.getDay();
      let numLastMonth = objNewDate.getMonth() - 1;
      if (numLastMonth < 0) {
        numLastMonth = 11;
      }
      const strHtmlData = `data-year="${arrDate[0]}" data-month="${objNewDate.getMonth() + 1}"`;
      const strHtmlYearMonthData = "data-date=";
      let strHtmlFullData = "";
      const getStrHtmlDate = () => {
        let strHtmlDate = "";
        let strClass = "";
        for (let tr = 0; tr < 6; tr++) {
          strHtmlDate = `${strHtmlDate}<div class="${CL.date("tr")}">`;
          for (let td = 0; td < 7; td++) {
            strClass = `${CL.date("item")} col${td}`;
            const numYearNow = arrDate[0];
            const numMonthNow = objNewDate.getMonth() + 1;
            let numDayNow;
            let objDateNow;
            if (strType == "date" || strType.includes("datetime")) {
              if (tr == 0 && td < numDayFirst) {
                numDayNow = arrMonthDay[numLastMonth] - numDayFirst + td + 1;
                objDateNow = new Date(numYearNow, numLastMonth, numDayNow);
                strHtmlFullData = strHtmlYearMonthData + objDateNow.toArray().join("-");
                strHtmlDate = `${strHtmlDate}<span class="${strClass}" ${strHtmlFullData}>${numDayNow}</span>`;
              } else {
                numDayNow = tr * 7 + td - numDayFirst + 1;
                if (numDayNow <= arrMonthDay[objNewDate.getMonth()]) {
                  objDateNow = new Date(numYearNow, objNewDate.getMonth(), numDayNow);
                  strHtmlFullData = strHtmlYearMonthData + objDateNow.toArray().join("-");
                  if (currentDate.getDate() == numDayNow) {
                    strClass = `${strClass} ${SELECTED}`;
                  }
                  if (objDateNow >= numMin && objDateNow <= numMax) {
                    strHtmlDate = `${strHtmlDate}<a href="javascript:;" ${strHtmlData} class="${strClass}" ${strHtmlFullData}>${numDayNow}</a>`;
                  } else {
                    strHtmlDate = `${strHtmlDate}<span class="${strClass}" ${strHtmlFullData}>${numDayNow}</span>`;
                  }
                } else {
                  numDayNow = numDayNow - arrMonthDay[objNewDate.getMonth()];
                  strHtmlFullData = strHtmlYearMonthData + new Date(numYearNow, numMonthNow, numDayNow).toArray().join("-");
                  strHtmlDate = `${strHtmlDate}<span class="${strClass}" ${strHtmlFullData}>${numDayNow}</span>`;
                }
              }
            } else if (strType == "date-range") {
              if (tr == 0 && td < numDayFirst) {
                strHtmlDate = `${strHtmlDate}<span class="${strClass}"></span>`;
              } else {
                numDayNow = tr * 7 + td - numDayFirst + 1;
                if (numDayNow <= arrMonthDay[objNewDate.getMonth()]) {
                  objDateNow = new Date(numYearNow, objNewDate.getMonth(), numDayNow);
                  strHtmlFullData = strHtmlYearMonthData + objDateNow.toArray().join("-");
                  const dateBegin = this[SELECTED][0].join("-").toDate();
                  const dateEnd = this[SELECTED][1].join("-").toDate();
                  const timeNow = objDateNow.getTime();
                  const timeBegin = dateBegin.getTime();
                  const timeEnd = dateEnd.getTime();
                  if (timeNow >= timeBegin && timeNow <= timeEnd) {
                    strClass = `${strClass} ${SELECTED}`;
                    if (timeNow == timeBegin) {
                      strClass = `${strClass} ${CL.date("begin")}`;
                    }
                    if (timeNow == timeEnd) {
                      strClass = `${strClass} ${CL.date("end")}`;
                    }
                    if (numDayNow == 1) {
                      strClass = `${strClass} ${CL.date("first")}`;
                    } else if (numDayNow == arrMonthDay[objNewDate.getMonth()]) {
                      strClass = `${strClass} ${CL.date("last")}`;
                    }
                  }
                  if (objDateNow >= numMin && objDateNow <= numMax) {
                    strHtmlDate = `${strHtmlDate}<a href="javascript:;" ${strHtmlData} class="${strClass}" ${strHtmlFullData}>${numDayNow}</a>`;
                  } else {
                    strHtmlDate = `${strHtmlDate}<span class="${strClass}" ${strHtmlFullData}>${numDayNow}</span>`;
                  }
                } else {
                  strHtmlDate = `${strHtmlDate}<span class="${strClass}"></span>`;
                }
              }
            }
          }
          strHtmlDate += "</div>";
        }
        return strHtmlDate;
      };
      strHtml = `${strHtml}<div class="${CL.date("body")}">${getStrHtmlDate()}</div>`;
      return {
        monthDay: arrMonthDay,
        html: strHtml,
        min: numMin,
        max: numMax
      };
    }
    /**
     * 月份组装
     * @param  {Array} arrDate 数组化的日期表示值
     * @return {Object}        返回的是后续方法需要的数据的纯对象，包括组装的HTML字符数据，月份最大和最小值。
     */
    getMonthData(arrDate) {
      const strType = this.params.type;
      let strMin = this.min;
      let strMax = this.max;
      if (strType.includes("datetime")) {
        if (strMin) {
          strMin = strMin.split(/\s+/)[0];
        }
        if (strMax) {
          strMax = this.max.split(/\s+/)[0];
        }
      }
      let numMin = (strMin || "000000").replace(regDate, "").slice(0, 6);
      let numMax = (strMax || "999912").replace(regDate, "").slice(0, 6);
      const arrChinese = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
      const numYear = arrDate[0] * 1;
      const getStrHtmlDate = () => {
        let strHtmlDate = "";
        let strClass = "";
        let strMonth = "";
        for (let i = 1; i <= 12; i += 1) {
          if (i < 10) {
            strMonth = `0${i}`;
          } else {
            strMonth = `${i}`;
          }
          strClass = CL.date("item");
          if (strType == "month" || strType.includes("datetime")) {
            if (i == arrDate[1]) {
              strClass = `${strClass} ${SELECTED}`;
            }
          } else if (strType == "month-range") {
            const strBegin = this[SELECTED][0].slice(0, 2).join("");
            const strEnd = this[SELECTED][1].slice(0, 2).join("");
            const strNow = numYear + strMonth;
            if (strNow >= strBegin && strNow <= strEnd) {
              strClass = `${strClass} ${SELECTED}`;
            }
          }
          if (numYear + strMonth >= numMin && numYear + strMonth <= numMax) {
            strHtmlDate = `${strHtmlDate}<a href="javascript:" class="${strClass}" data-year="${numYear}" data-value="${strMonth}">${arrChinese[i - 1]}月</a>`;
          } else {
            strHtmlDate = `${strHtmlDate}<span class="${strClass}" data-value="${strMonth}">${arrChinese[i - 1]}月</span>`;
          }
        }
        return strHtmlDate;
      };
      const strHtml = `<div class="${CL.month("body")}">${getStrHtmlDate()}</div>`;
      return {
        html: strHtml,
        min: numMin,
        max: numMax
      };
    }
    /**
     * 当前日期下这一年每月最大的日期数目
     * @param  {Array} date 格式化为数组的日期
     * @return {Array}      返回这一年每月最大的日期数目
     */
    getMonthDay(date) {
      let arrDate = date;
      if (typeof date != "object" && !date.map) {
        arrDate = date.toArray();
      }
      const arrMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (arrDate[0] % 4 == 0 && arrDate[0] % 100 != 0 || arrDate[0] % 400 == 0) {
        arrMonthDay[1] = 29;
      }
      return arrMonthDay;
    }
    /**
     * 上个月同日期
     * @param  {Array} date 格式化为数组的日期
     * @return {Object}     返回Date类型对象
     */
    getDatePrevMonth(date) {
      let arrDate = date;
      if (typeof date != "object" && !date.map) {
        arrDate = date.toArray();
      }
      const numMonth = arrDate[1] * 1;
      const arrMonthDay = this.getMonthDay(arrDate);
      if (numMonth == 1) {
        return [arrDate[0] - 1, 12, arrDate[2]].join("-").toDate();
      }
      if (arrMonthDay[numMonth - 2] < arrDate[2]) {
        return [arrDate[0], numMonth - 1, arrMonthDay[numMonth - 2]].join("-").toDate();
      }
      return [arrDate[0], numMonth - 1, arrDate[2]].join("-").toDate();
    }
    /**
     * 下个月同日期
     * @param  {Array} date 格式化为数组的日期
     * @return {Object}     返回Date类型对象
     */
    getDateNextMonth(date) {
      let arrDate = date;
      if (typeof date != "object" && !date.map) {
        arrDate = date.toArray();
      }
      const numMonth = arrDate[1] * 1;
      const arrMonthDay = this.getMonthDay(arrDate);
      if (numMonth == 12) {
        return [arrDate[0] + 1, 1, arrDate[2]].join("-").toDate();
      }
      if (arrMonthDay[numMonth] < arrDate[2]) {
        return [arrDate[0], numMonth + 1, arrMonthDay[numMonth]].join("-").toDate();
      }
      return [arrDate[0], numMonth + 1, arrDate[2]].join("-").toDate();
    }
    /**
     * 选择日期
     * @return {Object} 返回当前DOM对象
     */
    date(container) {
      const eleContainer = container || this.element.target;
      let arrDate = this[SELECTED];
      if (this.params.type.includes("datetime")) {
        arrDate = arrDate[0];
      }
      const numPrevMonth = arrDate[1] - 1;
      const numNextMonth = arrDate[1] * 1 + 1;
      const objCalender = this.getCalendarData(arrDate);
      let strHtml = `<div class="${CL.date("x")}">`;
      strHtml = `${strHtml}<div class="${CL.date("head")}">`;
      const datePrevMonth = this.getDatePrevMonth(arrDate);
      const numPrevMonthGet = datePrevMonth.getMonth();
      const numPrevYearGet = datePrevMonth.getFullYear();
      const datePrevMonthLastDay = new Date(numPrevYearGet, numPrevMonthGet, objCalender.monthDay[numPrevMonthGet]);
      if (datePrevMonthLastDay >= objCalender.min) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("prev")}" data-month="${numPrevMonth}" role="button" aria-label="上一月"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("prev")}" aria-label="上一月"></span>`;
      }
      const objDateNextMonth = this.getDateNextMonth(arrDate);
      const numNextMonthGet = objDateNextMonth.getMonth();
      const numNextYearGet = objDateNextMonth.getFullYear();
      if (new Date(numNextYearGet, numNextMonthGet, 1) <= objCalender.max) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("next")}" data-month="${numNextMonth}" role="button" aria-label="下一月"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("next")}" aria-label="下一月"></span>`;
      }
      strHtml = `${strHtml}<a href="javascript:" class="${CL.date("switch")}" data-type="month" role="button" aria-label="快速切换月份">${arrDate.slice(0, 2).join("-")}</a></div>`;
      strHtml += objCalender.html;
      if (/* @__PURE__ */ new Date() >= objCalender.min && /* @__PURE__ */ new Date() <= objCalender.max) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("item")} ${CL.date("now")}" role="button">今天</a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("item")} ${CL.date("now")}">今天</span>`;
      }
      strHtml += "</div>";
      eleContainer.dataset.type = "date";
      eleContainer.innerHTML = strHtml;
      return this;
    }
    /**
     * 选择日期范围
     * @return {Object} 返回当前DOM对象
     */
    ["date-range"](container) {
      const eleContainer = container || this.element.target;
      const arrDates = this[SELECTED];
      const arrDate = eleContainer.dataDate || arrDates[0];
      eleContainer.dataDate = arrDate;
      const numPrevMonth = arrDate[1] - 1;
      const numNextMonth = arrDate[1] * 1 + 1;
      const objCalender = this.getCalendarData(arrDate);
      let strHtml = `<div class="${CL.range("x")}">`;
      strHtml = `${strHtml}<div class="${CL.date("head")}"><div class="${CL.date("half")}">`;
      const datePrevMonthLastDay = new Date(arrDate[0], numPrevMonth - 1, objCalender.monthDay[numPrevMonth]);
      if (datePrevMonthLastDay >= objCalender.min) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("prev")}" data-month="${numPrevMonth}" aria-label="上一个月，当前${arrDate[1]}月"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("prev")}"></span>`;
      }
      strHtml = `${strHtml}<span class="${CL.date("switch")}">${new Date(arrDate[0], numPrevMonth, arrDate[2]).toArray().slice(0, 2).join("-")}</span></div><div class="${CL.date("half")}">`;
      const objDateNextMonth = new Date(arrDate[0], arrDate[1], 1);
      const objDateAfterMonth = new Date(arrDate[0], numNextMonth, arrDate[2]);
      if (objDateAfterMonth <= objCalender.max) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("next")}" data-month="${numNextMonth}" aria-label="下一个月，当前${numNextMonth}月"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("next")}"></span>`;
      }
      strHtml = `${strHtml}<span class="${CL.date("switch")}">${objDateNextMonth.toArray().slice(0, 2).join("-")}</span></div>`;
      strHtml += "</div>";
      strHtml = `${strHtml}<div class="${CL.range("body")} ${CL.range("date", "body")}">            <div class="${CL.date("half")}">${objCalender.html}</div>            <div class="${CL.date("half")}">${this.getCalendarData(objDateNextMonth.toArray()).html}</div>            </div>`;
      strHtml = `${strHtml}<div class="${CL.range("footer")}">            <button class="ui-button" data-type="primary">确定</button>            <button class="ui-button" data-type="normal">取消</button>            </div>`;
      strHtml += "</div>";
      eleContainer.dataset.type = "date-range";
      eleContainer.innerHTML = strHtml;
      return this;
    }
    /**
     * 选择月份
     * @return {Object} 返回当前DOM对象
     */
    month(container) {
      const eleContainer = container || this.element.target;
      let arrDate = this[SELECTED];
      if (this.params.type.includes("datetime")) {
        arrDate = arrDate[0];
      }
      const objMonth = this.getMonthData(arrDate);
      const numMin = objMonth.min;
      const numMax = objMonth.max;
      let strHtml = `<div class="${CL.month("x")}">`;
      const numYear = arrDate[0] * 1;
      strHtml = `${strHtml}<div class="${CL.date("head")}">`;
      if (numYear - 1 >= Math.floor(numMin / 100) && numYear - 1 <= Math.floor(numMax / 100)) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("prev")}" data-year="${numYear - 1}" role="button" aria-label="上一年"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("prev")}" aria-label="上一年"></span>`;
      }
      if (numYear + 1 >= Math.floor(numMin / 100) && numYear + 1 <= Math.floor(numMax / 100)) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("next")}" data-year="${numYear + 1}" role="button" aria-label="下一年"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("next")}"></span>`;
      }
      strHtml = `${strHtml}<a href="javascript:" class="${CL.date("switch")}" data-type="year" role="button" title="快速切换年份" aria-label="快速切换年份">${numYear}</a>            </div>`;
      strHtml += objMonth.html;
      const objThisYearMonth = (/* @__PURE__ */ new Date()).toArray().slice(0, 2).join("");
      if (objThisYearMonth >= numMin && objThisYearMonth <= numMax) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("item")} ${CL.date("now")}">今月</a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("item")} ${CL.date("now")}">今月</span>`;
      }
      strHtml += "</div>";
      eleContainer.dataset.type = "month";
      eleContainer.innerHTML = strHtml;
      return this;
    }
    /**
     * 选择月份范围
     * @return {Object} 返回当前DOM对象
     */
    ["month-range"](container) {
      const eleContainer = container || this.element.target;
      const arrDates = this[SELECTED];
      const arrDate = eleContainer.dataDate || arrDates[0];
      eleContainer.dataDate = arrDate;
      const numPrevYear = arrDate[0] * 1 - 1;
      const numNextYear = arrDate[0] * 1 + 1;
      const objMonth = this.getMonthData(arrDate);
      const numMaxYear = objMonth.max.slice(0, 4);
      const numMinYear = objMonth.min.slice(0, 4);
      let strHtml = `<div class="${CL.range("x")}">`;
      strHtml = `${strHtml}<div class="${CL.date("head")}">            <div class="${CL.date("half")}">`;
      if (numPrevYear >= numMinYear && numPrevYear <= numMaxYear) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("prev")}" data-year="${numPrevYear}" role="button" aria-label="上一年"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("prev")}" aria-label="上一年"></span>`;
      }
      strHtml = `${strHtml}<span class="${CL.date("switch")}">${arrDate[0]}</span>            </div>            <div class="${CL.date("half")}">`;
      if (numNextYear >= numMinYear && numNextYear < numMaxYear) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("next")}" data-year="${numNextYear}" role="button" aria-label="下一年"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("next")}" aria-label="下一年"></span>`;
      }
      strHtml = `${strHtml}<span class="${CL.date("switch")}">${numNextYear}</span>            </div>`;
      strHtml += "</div>";
      strHtml = `${strHtml}<div class="${CL.range("body")} ${CL.range("month", "body")}">            <div class="${CL.date("half")}">${objMonth.html}</div>            <div class="${CL.date("half")}">${this.getMonthData([numNextYear, arrDate[1], arrDate[2]]).html}</div>            </div>`;
      strHtml = `${strHtml}<div class="${CL.range("footer")}">            <button class="ui-button" data-type="primary">确定</button>            <button class="ui-button" data-type="normal">取消</button>            </div>`;
      strHtml += "</div>";
      eleContainer.dataset.type = "month-range";
      eleContainer.innerHTML = strHtml;
      return this;
    }
    /**
     * 选择年份
     * @return {Object} 返回当前DOM对象
     */
    year(container) {
      const eleContainer = container || this.element.target;
      let strMin = this.min;
      let strMax = this.max;
      let numMin = 0;
      let numMax = 9999;
      const strType = this.params.type;
      let arrDate = this[SELECTED];
      if (strType.includes("datetime")) {
        arrDate = arrDate[0];
        if (strMin) {
          numMin = strMin.split(/\s+/)[0].toDate().getFullYear();
        }
        if (strMax) {
          numMax = strMax.split(/\s+/)[0].toDate().getFullYear();
        }
      }
      let strHtml = `<div class="${CL.year("x")}">`;
      const numYear = arrDate[0];
      strHtml = `${strHtml}<div class="${CL.date("head")}">`;
      if (numYear - 12 >= numMin && numYear - 12 <= numMax) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("prev")}" data-year="${numYear - 12}" role="button" aria-label="上一个12年"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("prev")}"></span>`;
      }
      if (numYear + 12 >= numMin && numYear + 12 <= numMax) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("next")}" data-year="${numYear + 12}" role="button" aria-label="下一个12年"></a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("next")}"></span>`;
      }
      strHtml = `${strHtml}<span class="${CL.date("switch")}">${[numYear - 6, numYear + 5].join("-")}</span></div>`;
      const getStrHtmlDate = () => {
        let strHtmlDate = "";
        let strClass = "";
        for (let indexYear = numYear - 6; indexYear < numYear + 6; indexYear += 1) {
          strClass = CL.date("item");
          if (indexYear == numYear) {
            strClass = `${strClass} ${SELECTED}`;
          }
          if (indexYear >= numMin && indexYear <= numMax) {
            strHtmlDate = `${strHtmlDate}<a href="javascript:" class="${strClass}">${indexYear}</a>`;
          } else {
            strHtmlDate = `${strHtmlDate}<span class="${strClass}">${indexYear}</span>`;
          }
        }
        return strHtmlDate;
      };
      strHtml = `${strHtml}<div class="${CL.year("body")}">${getStrHtmlDate()}</div>`;
      const numThisYear = (/* @__PURE__ */ new Date()).getFullYear();
      if (numThisYear >= numMin && numThisYear <= numMax) {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("item")} ${CL.date("now")}" role="button">今年</a>`;
      } else {
        strHtml = `${strHtml}<span class="${CL.date("item")} ${CL.date("now")}">今年</span>`;
      }
      strHtml += "</div>";
      strHtml += "</div>";
      eleContainer.dataset.type = "year";
      eleContainer.innerHTML = strHtml;
      return this;
    }
    /**
     * 选择小时
     * @return {Object} 返回当前DOM对象
     */
    hour(container) {
      const eleContainer = container || this.element.target;
      const arrTime = this[SELECTED];
      let numStep = this.step || 1;
      let numMin = Number(this.min.split(":")[0]) || 0;
      let numMax = Number(this.max.split(":")[0]);
      if (isNaN(numMax) || !this.max) {
        numMax = 24;
      }
      let strHtml = `<div class="${CL.hour("x")}">`;
      const getStrHtmlTime = () => {
        let strHtmlTime = "";
        let strHour = "";
        let strClass = "";
        for (let indexHour = 0; indexHour < 24; indexHour += numStep) {
          strHour = String(indexHour).padStart(2, "0");
          strClass = CL.date("item");
          if (strHour == arrTime[0]) {
            strClass = `${strClass} ${SELECTED}`;
          }
          if (indexHour >= numMin && indexHour <= numMax) {
            strHtmlTime = `${strHtmlTime}<a href="javascript:" class="${strClass}">${strHour}:00</a>`;
          } else {
            strHtmlTime = `${strHtmlTime}<span class="${strClass}">${strHour}:00</span>`;
          }
        }
        return strHtmlTime;
      };
      strHtml = `${strHtml}<div class="${CL.hour("body")}">${getStrHtmlTime()}</div>`;
      strHtml += "</div>";
      eleContainer.dataset.type = "hour";
      eleContainer.innerHTML = strHtml;
      return this;
    }
    /**
     * 选择时间，多垂直列表选择模式，支持到时分秒
     * step如果设置，则可以选择秒
     */
    time(container) {
      const eleContainer = container || this.element.target;
      let arrTime = this[SELECTED];
      let arrDate = null;
      const strType = this.params.type;
      if (strType.includes("datetime")) {
        arrDate = this[SELECTED][0];
        arrTime = this[SELECTED][1];
      }
      let numHourSelected = Number(arrTime[0]);
      let numMinuteSelected = Number(arrTime[1]);
      let numSecondSelected = Number(arrTime[2]);
      let numStep = this.step * 1 || 1;
      if (numStep > 60) {
        numStep = Math.floor(numStep / 60);
      }
      let strMin = this.min;
      let strMax = this.max;
      if (strType.includes("datetime") && arrDate && (strMin || strMax)) {
        let strMinDate = "";
        let strMinTime = "";
        if (strMin) {
          strMinDate = strMin.split(/\s+/)[0];
          strMinTime = strMin.split(/\s+/)[1];
        }
        let strMaxDate = "";
        let strMaxTime = "";
        if (strMax) {
          strMaxDate = strMax.split(/\s+/)[0];
          strMaxTime = strMax.split(/\s+/)[1];
        }
        if (strMinDate && arrDate.join("-").toDate() < strMinDate.toDate() || strMaxDate && arrDate.join("-").toDate() > strMaxDate.toDate()) {
          strMin = "24:60:60";
          strMax = "00:00:00";
        } else if (arrDate.join("-") == strMinDate) {
          strMin = strMinTime;
          strMax = "23:59:59";
        } else if (arrDate.join("-") == strMaxDate) {
          strMax = strMaxTime;
          strMin = "00:00:00";
        }
      }
      strMin = strMin || "00:00:00";
      strMax = strMax || "23:59:59";
      let numMinHour = Number(strMin.split(":")[0]) || 0;
      let numMinMinute = Number(strMin.split(":")[1]) || 0;
      let numMinSecond = Number(strMin.split(":")[2]) || 0;
      let numMaxHour = Number(strMax.split(":")[0]);
      if (isNaN(numMaxHour)) {
        numMaxHour = 23;
      }
      let numMaxMinute = Number(strMax.split(":")[1]);
      let numMaxSecond = Number(strMax.split(":")[2]);
      if (isNaN(numMaxMinute)) {
        numMaxMinute = 59;
      }
      if (isNaN(numMaxSecond)) {
        numMaxSecond = 59;
      }
      let arrAmpm = [];
      if (this.datetimeformat != "H:mm") {
        arrAmpm = [0, 1].map((index) => {
          if (index == 0) {
            return {
              value: "上午",
              selected: numHourSelected <= 11
            };
          }
          return {
            value: "下午",
            selected: numHourSelected > 11
          };
        });
      }
      let arrHours = Array(24).fill().map((empty, index) => {
        let disabled = false;
        if (index < numMinHour || index > numMaxHour) {
          disabled = true;
        }
        let visibility = true;
        let selected = false;
        let value = String(index).padStart(2, "0");
        if (this.datetimeformat != "H:mm") {
          if (index > 11 && arrAmpm[0].selected || index <= 11 && arrAmpm[1].selected) {
            visibility = false;
          }
          if (index >= 12) {
            value = String(index - 12).padStart(2, "0");
          }
          if (value == "00") {
            value = "12";
          }
        }
        if (index == numHourSelected) {
          selected = true;
        }
        return {
          value,
          disabled,
          selected,
          visibility
        };
      });
      let arrMinutes = Array(60).fill().map((empty, index) => {
        let disabled = false;
        let visibility = true;
        let selected = false;
        if (numHourSelected == numMinHour && index < numMinMinute) {
          disabled = true;
        } else if (numHourSelected == numMaxHour && index > numMaxMinute) {
          disabled = true;
        } else if (numHourSelected < numMinHour || numHourSelected > numMaxHour) {
          disabled = true;
        }
        if (arrTime.length == 2 && index % numStep != 0) {
          visibility = false;
        }
        if (index == numMinuteSelected) {
          selected = true;
        }
        return {
          value: String(index).padStart(2, "0"),
          disabled,
          visibility,
          selected
        };
      });
      let arrSeconds = Array(60).fill().map((empty, index) => {
        let disabled = false;
        let visibility = true;
        let selected = false;
        if (numHourSelected == numMinHour && numMinuteSelected == numMinMinute && index < numMinSecond) {
          disabled = true;
        } else if (numHourSelected == numMaxHour && numMinuteSelected == numMaxMinute && index > numMaxSecond) {
          disabled = true;
        }
        if (arrTime.length == 3 && index % numStep != 0) {
          visibility = false;
        }
        if (index == numSecondSelected) {
          selected = true;
        }
        return {
          value: String(index).padStart(2, "0"),
          disabled,
          visibility,
          selected
        };
      });
      if (eleContainer.innerHTML) {
        [...eleContainer.querySelectorAll("button")].forEach(function(button) {
          button.classList.remove(SELECTED);
          button.disabled = false;
          button.dataset.visibility = "true";
          let numIndexButton = button.dataset.index;
          let strButtonType = button.parentElement.dataset.type;
          if (strButtonType == "ampm") {
            if (arrAmpm[numIndexButton].selected) {
              button.classList.add(SELECTED);
            }
          } else {
            let objTypeData = {
              hour: arrHours,
              minute: arrMinutes,
              second: arrSeconds
            };
            let objDataMatch = objTypeData[strButtonType][numIndexButton];
            if (objDataMatch.selected) {
              button.classList.add(SELECTED);
            }
            if (objDataMatch.disabled) {
              button.disabled = true;
            }
            if (objDataMatch.visibility == false) {
              button.dataset.visibility = "false";
            }
          }
        });
        return this;
      }
      let strHtml = `<div class="${CL.time("x")}" data-step="${numStep}">`;
      if (this.datetimeformat != "H:mm") {
        strHtml = strHtml + `<div class="${CL.time("col")}" data-type="ampm">
                    ${arrAmpm.map((obj, index) => `<button class="${CL.time("item")}${obj.selected ? " selected" : ""}" data-index="${index}">${obj.value}</button>`).join("")}
                </div>`;
      }
      strHtml = strHtml + `<div class="${CL.time("col")}" data-type="hour">
                ${arrHours.map((obj, index) => `<button class="${CL.time("item")}${obj.selected ? " " + SELECTED : ""}" data-index="${index}"${obj.disabled ? " disabled" : ""} data-visibility="${obj.visibility}">${obj.value}</button>`).join("")}
            </div>`;
      strHtml = strHtml + `<div class="${CL.time("col")}" data-type="minute">
                ${arrMinutes.map((obj, index) => `<button class="${CL.time("item")}${obj.selected ? " " + SELECTED : ""}" data-index="${index}"${obj.disabled ? " disabled" : ""} data-visibility="${obj.visibility}">${obj.value}</button>`).join("")}
            </div>`;
      if (arrTime.length == 3) {
        strHtml = strHtml + `<div class="${CL.time("col")}" data-type="second">
                    ${arrSeconds.map((obj, index) => `<button class="${CL.time("item")}${obj.selected ? " " + SELECTED : ""}" data-index="${index}"${obj.disabled ? " disabled" : ""} data-visibility="${obj.visibility}">${obj.value}</button>`).join("")}
                </div>`;
      }
      strHtml += "</div>";
      eleContainer.dataset.type = "time";
      eleContainer.innerHTML = strHtml;
    }
    /**
     * 选择分钟
     * @return {Object} 返回当前DOM对象
     */
    minute(container) {
      const eleContainer = container || this.element.target;
      const arrTime = this[SELECTED];
      const numStep = this.step * 1 || 1;
      let numMin = (this.min || "0").replace(":", "") * 1;
      let numMax = (this.max || "2359").replace(":", "") * 1;
      let strHtml = `<div class="${CL.minute("x")}" data-step="${numStep}">`;
      const hour = arrTime[0] * 1;
      strHtml = `${strHtml}<div class="${CL.date("head")}">`;
      if (hour <= Math.floor(numMin / 100)) {
        strHtml = `${strHtml}<span class="${CL.date("prev")}"></span>`;
      } else {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("prev")}" data-hour="${hour - 1}" role="button" aria-label="上一个小时"></a>`;
      }
      if (hour >= Math.floor(numMax / 100)) {
        strHtml = `${strHtml}<span class="${CL.date("next")}"></span>`;
      } else {
        strHtml = `${strHtml}<a href="javascript:" class="${CL.date("next")}" data-hour="${hour + 1}" role="button" aria-label="下一个小时"></a>`;
      }
      strHtml = `${strHtml}<a href="javascript:" class="${CL.date("switch")}" data-type="hour">${arrTime[0]}:00</a></div>`;
      const getStrHtmlTime = () => {
        let strHtmlTime = "";
        let strMinute = "";
        let strClass = "";
        for (let indexMinute = 0; indexMinute < 60; indexMinute += numStep) {
          strMinute = `${indexMinute}`;
          if (strMinute.length == 1) {
            strMinute = `0${strMinute}`;
          }
          strClass = CL.date("item");
          if ((arrTime[0] + strMinute) * 1 >= numMin && (arrTime[0] + strMinute) * 1 <= numMax) {
            if (strMinute == arrTime[1]) {
              strClass = `${strClass} ${SELECTED}`;
            }
            strHtmlTime = `${strHtmlTime}<a href="javascript:" class="${strClass}">${[arrTime[0], strMinute].join(":")}</a>`;
          } else {
            strHtmlTime = `${strHtmlTime}<span class="${strClass}">${[arrTime[0], strMinute].join(":")}</span>`;
          }
        }
        return strHtmlTime;
      };
      strHtml = `${strHtml}<div class="${CL.minute("body")}">${getStrHtmlTime()}</div>`;
      strHtml += "</div>";
      eleContainer.dataset.type = "minute";
      eleContainer.innerHTML = strHtml;
      return this;
    }
    // 日期时间选择
    datetime(container) {
      const eleContainer = container || this.element.target;
      eleContainer.dataset.type = "datetime";
      eleContainer.innerHTML = `<div class="${CL.datetime("x")}"></div>`;
      const eleDateX = document.createElement("div");
      const eleTimeX = document.createElement("div");
      eleDateX.className = CL.datetime("date");
      eleTimeX.className = CL.datetime("time");
      eleContainer.querySelector("div").append(eleDateX, eleTimeX);
      this.date(eleDateX);
      this.time(eleTimeX);
      return this;
    }
    ["datetime-local"]() {
      return this.datetime();
    }
    /**
     * 面板的定位
     * @return 当前DOM元素对象
     */
    position() {
      this.follow();
      return this;
    }
    /**
     * 日期选择面板的显示
     * @return {Object} 当前DOM元素对象
     */
    show() {
      const eleContainer = this.element.target;
      if (this.disabled) {
        return this;
      }
      this.format();
      if (this.params.type == "date-range") {
        if (!this.dataRangeSelected) {
          this.dataRangeSelected = this[SELECTED];
        }
        this["date-range"]();
      } else if (this.params.type == "month-range") {
        if (!this.dataRangeSelected) {
          this.dataRangeSelected = this[SELECTED];
        }
        this["month-range"]();
      } else if (this[this.params.type]) {
        this[this.params.type]();
      } else {
        this.date();
      }
      if (document.body.contains(eleContainer) == false) {
        document.body.appendChild(eleContainer);
        this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
      }
      eleContainer.style.display = "inline-block";
      this.classList.add(ACTIVE);
      this.position();
      this.display = true;
      let eleTimeSelectedAll = null;
      if (this.params.type == "time") {
        eleTimeSelectedAll = eleContainer.querySelectorAll("." + SELECTED);
      } else if (this.params.type.includes("datetime")) {
        eleTimeSelectedAll = eleContainer.querySelectorAll('[data-type="time"] .' + SELECTED);
      }
      if (eleTimeSelectedAll) {
        eleTimeSelectedAll.forEach((item, index) => {
          if (item.scrollIntoViewIfNeeded) {
            item.scrollIntoViewIfNeeded();
          } else if (item.offsetTop - 5 > item.parentElement.scrollTop + item.parentElement.clientHeight || item.offsetTop - 5 < item.parentElement.scrollTop) {
            item.parentElement.scrollTop = item.offsetTop - 5;
          }
          if (index == 0) {
            item.focus({
              preventScroll: true
            });
          }
        });
      }
      this.dispatchEvent(new CustomEvent("show", {
        detail: {
          type: "ui-datetime"
        }
      }));
      return this;
    }
    /**
     * 日期选择面板的隐藏
     * @return {Object} 当前DOM元素对象
     */
    hide() {
      const eleContainer = this.element.target;
      if (this.display == true) {
        eleContainer.style.display = "none";
        this.classList.remove(ACTIVE);
        if (document.activeElement == document.body || eleContainer.contains(document.activeElement)) {
          this.focus();
          this.blur();
        }
      }
      this.display = false;
      this.dispatchEvent(new CustomEvent("hide", {
        detail: {
          type: "ui-datetime"
        }
      }));
      return this;
    }
    // 自定义组件进入页面时候
    connectedCallback() {
      if (this.isConnectedCallback) {
        return;
      }
      let strType = this.getAttribute("type");
      if (["date", "year", "month", "time", "hour", "minute", "datetime", "datetime-local", "date-range", "month-range"].includes(strType) == false) {
        strType = "date";
        if (strType) {
          this.removeAttribute("type");
        }
      }
      this.params = this.params || {};
      this.params.type = strType;
      let eleContainer = null;
      this.setAttribute("readonly", "readonly");
      this.toggleAttribute("required", true);
      let strId = this.id;
      if (!strId) {
        strId = `lulu_${String(Math.random()).replace("0.", "")}`;
        this.id = strId;
      }
      let strInitValue = this.getAttribute("value") || this.value;
      switch (strType) {
        case "date":
        case "year":
        case "month": {
          const objInitDate = strInitValue.toDate();
          const arrDate = objInitDate.toArray();
          if (strType == "date") {
            this.value = arrDate.join("-");
          } else if (strType == "year") {
            this.value = arrDate[0];
          } else if (strType == "month") {
            this.value = arrDate.slice(0, 2).join("-");
          }
          this[SELECTED] = arrDate;
          break;
        }
        case "time": {
          const arrTime = strInitValue.toTime();
          let dateCurrent = /* @__PURE__ */ new Date();
          let numHour = dateCurrent.getHours();
          let numMinute = dateCurrent.getMinutes();
          let numSecond = dateCurrent.getSeconds();
          let strHour = String(arrTime[0] || numHour).padStart(2, "0");
          let strMinute = String(arrTime[1] || numMinute).padStart(2, "0");
          let strSecond = String(arrTime[2] || numSecond).padStart(2, "0");
          let numStep = this.step;
          if (strType == "time" && (!numStep && arrTime[2] || numStep > 0 && numStep <= 30)) {
            this.value = [strHour, strMinute, strSecond].join(":");
          } else {
            this.value = [strHour, strMinute].join(":");
          }
          this[SELECTED] = [strHour, strMinute, strSecond];
          break;
        }
        case "hour":
        case "minute": {
          const arrTime = strInitValue.toTime();
          let dateCurrent = /* @__PURE__ */ new Date();
          let numHour = dateCurrent.getHours();
          let numMinute = dateCurrent.getMinutes();
          let strHour = String(arrTime[0] || numHour).padStart(2, "0");
          let strMinute = String(arrTime[1] || numMinute).padStart(2, "0");
          if (!arrTime[0] && strType == "hour") {
            strMinute = "00";
          }
          this.value = [strHour, strMinute].join(":");
          this[SELECTED] = [strHour, strMinute];
          break;
        }
        case "datetime":
        case "datetime-local": {
          const arrDateTime = strInitValue.split(/\s+|T/);
          const arrPart1 = arrDateTime[0].toDate().toArray();
          let dateCurrent = /* @__PURE__ */ new Date();
          let arrPart2 = [String(dateCurrent.getHours()).padStart(2, "0"), String(dateCurrent.getMinutes()).padStart(2, "0")];
          if (arrDateTime[1] && arrDateTime[1].includes(":")) {
            arrPart2 = arrDateTime[1].toTime();
          }
          this.value = arrPart1.join("-") + " " + arrPart2.join(":");
          this[SELECTED] = [arrPart1, arrPart2];
          break;
        }
        case "date-range":
        case "month-range": {
          let objBeginDate = /* @__PURE__ */ new Date();
          let objEndDate = /* @__PURE__ */ new Date();
          const arrRange = strInitValue.split(" ");
          if (strInitValue != "" && arrRange.length == 1) {
            const someDate = arrRange[0].toDate();
            if (someDate.getTime() > objBeginDate.getTime()) {
              objEndDate = someDate;
            } else {
              objBeginDate = someDate;
            }
          } else {
            objBeginDate = arrRange[0].toDate();
            objEndDate = arrRange[arrRange.length - 1].toDate();
          }
          const arrBegin = objBeginDate.toArray();
          const arrEnd = objEndDate.toArray();
          if (strType == "date-range") {
            this.value = `${arrBegin.join("-")} 至 ${arrEnd.join("-")}`;
          } else {
            this.value = `${arrBegin.slice(0, 2).join("-")} 至 ${arrEnd.slice(0, 2).join("-")}`;
          }
          this[SELECTED] = [arrBegin, arrEnd];
          break;
        }
      }
      if (/time/.test(strType)) {
        this.datetimeformat = "H:mm";
        if (!strType.includes("datetime")) {
          let eleInputTmp = document.createElement("input");
          eleInputTmp.setAttribute("type", "time");
          eleInputTmp.value = "00:00";
          document.body.append(eleInputTmp);
          eleInputTmp.style.position = "absolute";
          eleInputTmp.style.left = "-999px";
          eleInputTmp.style.fontFamily = "revert";
          if (eleInputTmp.type == "time") {
            eleInputTmp.style.fontSize = "20px";
            let numWidthOrigin = eleInputTmp.clientWidth;
            eleInputTmp.style.fontSize = "30px";
            let numDiffWidth = eleInputTmp.clientWidth - numWidthOrigin;
            let numLetters = Math.ceil(numDiffWidth / 10);
            if (numLetters >= 5) {
              this.datetimeformat = "ah:mm";
            }
            eleInputTmp.remove();
          }
        }
      }
      if (!eleContainer) {
        eleContainer = document.createElement("div");
        eleContainer.classList.add(CL.date("container"));
        const strRandId = `lulu_${String(Math.random()).replace("0.", "")}`;
        eleContainer.setAttribute("id", strRandId);
        eleContainer.classList.add("ESC");
        this.setAttribute("data-target", strRandId);
        eleContainer.setAttribute("data-id", strId);
      }
      this.element = this.element || {};
      this.element.target = eleContainer;
      this.events();
      this.dispatchEvent(new CustomEvent("connected", {
        detail: {
          type: "ui-datetime"
        }
      }));
      this.isConnectedCallback = true;
    }
  }
  return Component;
})();
if (!customElements.get("ui-datetime")) {
  customElements.define("ui-datetime", DateTime, {
    extends: "input"
  });
}
var Validate = (() => {
  window.DBC2SBC = (str) => {
    let result = "";
    let i, code;
    for (i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);
      if (code >= 65281 && code <= 65373) {
        result += String.fromCharCode(str.charCodeAt(i) - 65248);
      } else if (code == 12288) {
        result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
      } else {
        result += str.charAt(i);
      }
    }
    return result;
  };
  window.scrollTopTo = (top, callback) => {
    let scrollTop = document.scrollingElement.scrollTop;
    const rate = 2;
    const funTop = () => {
      scrollTop = scrollTop + (top - scrollTop) / rate;
      if (Math.abs(scrollTop - top) <= 1) {
        document.scrollingElement.scrollTop = top;
        callback && callback();
        return;
      }
      document.scrollingElement.scrollTop = scrollTop;
      requestAnimationFrame(funTop);
    };
    funTop();
  };
  document.validate = /* @__PURE__ */ function() {
    return {
      reg: {
        email: "^[a-z0-9._%-]+@([a-z0-9-]+\\.)+[a-z]{2,4}$",
        number: "^\\-?\\d+(\\.\\d+)?$",
        url: "^(http|https)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\:\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$",
        tel: "^1\\d{10}$",
        zipcode: "^\\d{6}$",
        date: "^\\d{4}\\-(0\\d|1[0-2])\\-([0-2]\\d|3[0-1])$",
        time: "^[0-2]\\d\\:[0-5]\\d$",
        hour: "^[0-2]\\d\\:00$",
        minute: "^[0-2]\\d\\:[0-5]\\d$",
        "date-range": "^\\d{4}(\\-\\d{2}){2}\\s至\\s\\d{4}(\\-\\d{2}){2}$",
        "month-range": "^\\d{4}\\-\\d{2}\\s至\\s\\d{4}\\-\\d{2}$"
      },
      name: {
        email: "邮箱",
        tel: "手机号码",
        url: "网址",
        zipcode: "邮编",
        password: "密码",
        number: "数值",
        range: "数值",
        date: "日期",
        year: "年份",
        month: "月份",
        hour: "小时",
        minute: "分钟",
        time: "时间",
        datetime: "日期时间",
        "date-range": "日期范围",
        "month-range": "月份范围"
      },
      // 选中某范围文字内容的拓展方法
      selectRange(element, start, end) {
        if (!element) {
          return;
        }
        if (element.createTextRange) {
          const objRange = element.createTextRange();
          objRange.collapse(true);
          objRange.moveEnd("character", end);
          objRange.moveStart("character", start);
          objRange.select();
        } else if (element.focus) {
          element.focus();
          element.setSelectionRange(start, end);
        }
      },
      // 电话号码过滤成符合要求的号码，省去用户自己处理
      // 例如我们从某个地方复制电话号码，可能是短横线相连
      // 或者前面带+86
      getTel(tel) {
        let strTel = tel || "";
        strTel = strTel.replace("+86", "");
        if (strTel.match(/\d/) && strTel.match(/\d/g).length == 11) {
          strTel = strTel.replace(/\D/g, "");
        }
        return strTel;
      },
      // 获得字符长度
      // @element  Object   input/textarea表单控件元素
      // @max  Number   返回满足最大值时候的真实字符长度
      getLength(element, max) {
        if (element.type == "password") {
          return max ? max : element.value.length;
        }
        const strAttrLang = element.getAttribute("lang");
        const strValue = element.value.trim();
        if (!strAttrLang) {
          return max ? max : strValue.length;
        }
        if (strValue == "") {
          return 0;
        }
        let numRatioCh = 1;
        let numRatioEn = 1;
        if (/zh/i.test(strAttrLang)) {
          numRatioEn = 0.5;
        } else if (/en/i.test(strAttrLang)) {
          numRatioCh = 2;
        }
        if (!max) {
          const lenOriginCh = strValue.replace(/[\x00-\xff]/g, "").length;
          const lenOriginEn = strValue.length - lenOriginCh;
          return Math.ceil(lenOriginEn * numRatioEn) + Math.ceil(lenOriginCh * numRatioCh);
        }
        let numStart = 0;
        let lenMatch = max;
        strValue.split("").forEach((letter, index) => {
          if (numStart >= max) {
            return;
          }
          if (/[\x00-\xff]/.test(letter)) {
            numStart += numRatioEn;
          } else {
            numStart += numRatioCh;
          }
          if (numStart >= max) {
            lenMatch = index + 1;
          }
        });
        return lenMatch;
      },
      // 获得并重置type
      getType(element) {
        const strAttrType = element.getAttribute("type");
        let strType = strAttrType || element.type || "";
        if (strType == "select-one") {
          strType = "select";
        }
        return strType;
      },
      /**
       * 返回对应的提示信息
       * @param  {[type]} element 提示元素
       * @return {String}         返回对应的提示信息
       */
      getReportText(element) {
        const defaultPrompt = {
          name: this.name,
          badInput: "值无效",
          customError: "包含错误",
          patternMismatch: {
            pattern: "内容格式不符合要求",
            multiple: "某项内容格式不符合要求"
          },
          valueMissing: {
            radio: "请选择一个选项",
            checkbox: "如果要继续，请选中此框",
            select: "请选择列表中的一项",
            "select-one": "请选择列表中的一项",
            empty: "请填写此字段"
          },
          rangeOverflow: "值偏大",
          rangeUnderflow: "值偏小",
          stepMismatch: "值不在间隔要求范围内",
          tooLong: "内容长度偏大",
          tooShort: "内容长度偏小",
          typeMismatch: "值和输入框类型不匹配"
        };
        if (!element) {
          return "";
        }
        const objValidateState = element.validity;
        if (objValidateState.valid == true) {
          return "";
        }
        let strFinalText = "";
        const strId = element.id;
        const strType = this.getType(element);
        const customValidate = element.customValidate || {};
        const optionPrompt = customValidate.report || {};
        const strName = defaultPrompt.name[strType] || function() {
          if (!customValidate.label || !strId || /checkbox|radio/.test(strType)) {
            return;
          }
          let strTextLabel = "";
          document.querySelectorAll('label[for="' + strId + '"]').forEach(function(eleLabel) {
            const eleLabelClone = eleLabel.cloneNode(true);
            [].slice.call(eleLabelClone.children).forEach(function(eleChild) {
              eleChild.remove();
            });
            const strLabelCloneText = eleLabelClone.innerHTML.trim().replace(/\d/g, "").replace("：", "");
            if (strLabelCloneText.length > strTextLabel.length) {
              strTextLabel = strLabelCloneText;
            }
          });
          if (strTextLabel.length >= 2) {
            return strTextLabel;
          }
        }();
        if (objValidateState.valueMissing) {
          strFinalText = optionPrompt.valueMissing;
          if (!strFinalText) {
            if (strType && strName) {
              if (strType != "select") {
                strFinalText = strName + "不能为空";
              } else {
                strFinalText = "您尚未选择" + strName;
              }
            } else {
              strFinalText = defaultPrompt.valueMissing[strType];
            }
            strFinalText = strFinalText || defaultPrompt.valueMissing.empty;
          }
        } else if (objValidateState.patternMismatch) {
          strFinalText = optionPrompt.patternMismatch;
          if (!strFinalText) {
            const isMultiple = element.hasAttribute("multiple") && element.value.split(",").length > 1;
            strFinalText = defaultPrompt.patternMismatch[isMultiple ? "multiple" : "pattern"];
            if (strType && strName) {
              strFinalText = strName + strFinalText;
            }
          }
        } else if (objValidateState.badInput) {
          strFinalText = optionPrompt.badInput;
          if (!strFinalText) {
            strFinalText = (strName || "") + defaultPrompt.badInput;
          }
        } else if (objValidateState.typeMismatch) {
          strFinalText = optionPrompt.typeMismatch;
          if (!strFinalText) {
            strFinalText = defaultPrompt.typeMismatch;
            if (strName) {
              strFinalText = strFinalText.replace("输入框", strName);
            }
          }
        } else if (objValidateState.rangeUnderflow || objValidateState.rangeOverflow) {
          strFinalText = optionPrompt.rangeUnderflow || optionPrompt.rangeOverflow;
          if (!strFinalText && strType && strName) {
            let strMin = element.getAttribute("min");
            let strMax = element.getAttribute("max");
            if (strType == "month-range") {
              strMin = strMin.slice(0, 7);
              strMax = strMax.slice(0, 7);
            }
            const strTextBigger = "必须要大于或等于" + strMin;
            const strTextSmall = "必须要小于或等于" + strMax;
            if (objValidateState.rangeUnderflow && objValidateState.rangeOverflow) {
              strFinalText = "起始日期" + strTextBigger + "，结束日期" + strTextSmall;
            } else if (objValidateState.rangeUnderflow) {
              strFinalText = strName + strTextBigger;
              if (strType.slice(-6) == "-range") {
                strFinalText = "起始日期" + strTextBigger;
              }
            } else {
              strFinalText = strName + strTextSmall;
              if (strType.slice(-6) == "-range") {
                strFinalText = "结束日期" + strTextSmall;
              }
            }
          }
          strFinalText = strFinalText || "值不在要求的范围内";
        } else if (objValidateState.stepMismatch) {
          strFinalText = optionPrompt.stepMismatch;
          if (!strFinalText) {
            const numMin = element.getAttribute("min") * 1;
            const numMax = element.getAttribute("max") * 1;
            const numStep = element.getAttribute("step") * 1 || 1;
            if (strType == "number" || strType == "range") {
              strFinalText = "请输入有效的值。两个最接近的有效值是" + function() {
                const numValue = element.value.trim() * 1;
                let numClosest = numMin;
                for (let start = numMin; start < numMax; start += numStep) {
                  if (start < numValue && start + numStep > numValue) {
                    numClosest = start;
                    break;
                  }
                }
                return [numClosest, numClosest + numStep].join("和");
              }();
            } else {
              strFinalText = "请" + (element.hasAttribute("readonly") ? "选择" : "输入") + "有效的值。" + (strName || "") + "间隔是" + numStep;
            }
          }
          strFinalText = strFinalText || defaultPrompt.stepMismatch;
        } else if (objValidateState.tooLong || objValidateState.tooShort) {
          const strAttrLang = element.getAttribute("lang");
          let strTextCharLength = "";
          if (/zh/i.test(strAttrLang)) {
            strTextCharLength = "个汉字(2字母=1汉字)";
          } else if (/en/i.test(strAttrLang)) {
            strTextCharLength = "个字符(1汉字=2字符)";
          }
          if (objValidateState.tooLong) {
            strFinalText = optionPrompt.tooLong;
            if (!strFinalText) {
              const strMaxLength = element.maxlength || element.getAttribute("maxlength");
              strFinalText = (strName || "") + "内容长度不能大于" + strMaxLength.replace(/\D/g, "") + strTextCharLength;
            }
          } else {
            strFinalText = optionPrompt.tooShort;
            if (!strFinalText) {
              const strMinLength = element.getAttribute("minlength");
              strFinalText = "内容长度不能小于" + strMinLength + strTextCharLength;
            }
          }
        } else if (objValidateState.customError) {
          strFinalText = optionPrompt.customError || defaultPrompt.customError;
        }
        if (typeof strFinalText == "function") {
          strFinalText = strFinalText.call(element, element);
        }
        return strFinalText;
      },
      /*
      ** 验证一般包括下面几个个方向：
      ** 1. 是否required同时值为空
      ** 2. 是否数据匹配错误(pattern, type)
      ** 3. 是否超出范围(min/max/step)
      ** 4. 内容超出限制(minlength, maxlength)
      ** 下面的这些方法就是上面3个方向判断
      ** 其中，参数element为DOM对象
      ** 返回数据规则如下：
      ** 如果没有把柄，返回false;
      ** 如果真的有误，则返回错误类别：{
            type: ''
         }
      */
      /**
       * 判断元素是否为空的验证
       * @param  Element  element 验证的DOM元素
       * @return Object           返回验证的状态对象
       */
      getMissingState(element) {
        const objValidateState = {
          valueMissing: false
        };
        if (!element || element.disabled) {
          return objValidateState;
        }
        const strType = this.getType(element);
        let strValue = element.value;
        if (element.hasAttribute("required")) {
          if (strType == "radio") {
            let eleRadios = [element];
            const eleForm = element.closest("form") || element.parentElement.parentElement;
            if (element.name && eleForm) {
              eleRadios = eleForm.querySelectorAll('input[type="radio"][name="' + element.name + '"]');
            }
            const isAtLeastOneRadioChecked = [].slice.call(eleRadios).some(function(eleRadio) {
              return eleRadio.checked;
            });
            if (isAtLeastOneRadioChecked == false) {
              objValidateState.valueMissing = true;
            }
            return objValidateState;
          } else if (strType == "checkbox") {
            if (element.checked == false) {
              objValidateState.valueMissing = true;
            }
            return objValidateState;
          } else if (strType != "password") {
            strValue = strValue.trim();
          }
          if (strValue == "") {
            element.value = "";
            objValidateState.valueMissing = true;
          }
        }
        return objValidateState;
      },
      /**
       * 判断元素是否为空的验证
       * @param  {Element}  element 验证的DOM元素
       * @return {Boolean|Object} 返回验证通过布尔值或者出错信息对象
       */
      isMissing(element) {
        return this.getMissingState(element).valueMissing;
      },
      /**
       * 返回元素值的合法状态
       * @param  {Element}  element 验证的DOM元素
       * @param  {RegExp}  regex 验证的正则
       * @return {Boolean|Object} 返回验证通过布尔值或者出错信息对象
       */
      getMismatchState(element, regex, params) {
        const objValidateState = {
          patternMismatch: false,
          typeMismatch: false
        };
        if (!element || element.disabled) {
          return false;
        }
        const strInputValue = element.value;
        let strDealValue = strInputValue;
        const strType = this.getType(element);
        if (/^radio|checkbox|select$/i.test(strType)) {
          return objValidateState;
        }
        if (strType != "password") {
          strDealValue = strInputValue.trim();
        }
        if (/^text|textarea|password$/i.test(strType) == false) {
          strDealValue = window.DBC2SBC(strDealValue);
        }
        if (strType == "tel") {
          strDealValue = this.getTel(strDealValue);
        }
        if (document.validate.focusable !== false && document.validate.focusable !== 0 && strDealValue != strInputValue) {
          element.value = strDealValue;
        }
        if (strDealValue == "") {
          return objValidateState;
        }
        regex = regex || function() {
          return element.getAttribute("pattern");
        }() || function() {
          return strType && strType.split("|").map(function(strTypeSplit) {
            const regMatch = document.validate.reg[strTypeSplit];
            if (regMatch) {
              return regMatch;
            }
          }).join("|");
        }();
        if (!regex) {
          return objValidateState;
        }
        const isMultiple = element.hasAttribute("multiple");
        const regNew = new RegExp(regex, params || "i");
        let isAllPass = true;
        if (isMultiple && /^number|range$/i.test(strType) == false) {
          strDealValue.split(",").forEach(function(partValue) {
            partValue = partValue.trim();
            if (isAllPass && !regNew.test(partValue)) {
              isAllPass = false;
            }
          });
        } else {
          isAllPass = regNew.test(strDealValue);
        }
        if (isAllPass == false) {
          if (element.hasAttribute("pattern")) {
            objValidateState.patternMismatch = true;
          } else {
            objValidateState.typeMismatch = true;
          }
        }
        return objValidateState;
      },
      /**
       * 判断元素值的合法性
       * @param  {Element}  element 验证的DOM元素
       * @param  {RegExp}  regex 验证的正则
       * @return {Boolean|Object} 返回验证通过布尔值或者出错信息对象
       */
      isMismatch(element, regex, params) {
        const objValidateState = this.getMismatchState(element, regex, params);
        return objValidateState.patternMismatch || objValidateState.typeMismatch;
      },
      /**
       * 判断数值或日期范围超出
       * @param  {Element}  element 验证的DOM元素
       * @return {Boolean|Object} 返回验证状态对象
       */
      getRangeState(element) {
        const objValidateState = {
          badInput: false,
          rangeOverflow: false,
          rangeUnderflow: false,
          stepMismatch: false
        };
        if (!element || element.disabled) {
          return objValidateState;
        }
        const strType = this.getType(element);
        let strValue = element.value.trim();
        if (/radio|checkbox|select|textarea/i.test(strType) || strValue == "") {
          return objValidateState;
        }
        let strAttrMin = element.getAttribute("min");
        let strAttrMax = element.getAttribute("max");
        const strAttrStep = Number(element.getAttribute("step")) || 1;
        if ((strType == "number" || strType == "range") && !/[-+]?[0-9]/.test(strValue)) {
          objValidateState.badInput = true;
        }
        if (strType.slice(-6) != "-range") {
          if (strValue == "0" || Number(strValue) == strValue) {
            strValue = strValue * 1;
          }
          if (strType.includes("datetime")) {
            strValue = strValue.replace("T", " ");
            if (strAttrMin) {
              strAttrMin.replaceAll("/", "-").replace("T", " ");
            }
            if (strAttrMax) {
              strAttrMax.replaceAll("/", "-").replace("T", " ");
            }
          }
          if (strAttrMin && strValue < strAttrMin) {
            objValidateState.rangeUnderflow = true;
          }
          if (strAttrMax && strValue > strAttrMax) {
            objValidateState.rangeOverflow = true;
          }
          if ((strType == "number" || strType == "range") && strAttrStep && strAttrMin && !/^\d+$/.test(Math.abs(strValue - strAttrMin) / strAttrStep)) {
            objValidateState.stepMismatch = true;
          }
          if ((strType == "hour" || strType == "minute" || strType == "time") && strAttrMin && strAttrStep) {
            const minuteValue = strValue.split(":")[1];
            const minuteMin = strAttrMin.split(":")[1];
            if (strType == "hour" && (minuteValue != minuteMin || (strValue.split(":")[0] - strAttrMin.split(":")[0]) % strAttrStep != 0)) {
              objValidateState.stepMismatch = true;
            } else if ((minuteValue - minuteMin) % strAttrStep !== 0) {
              objValidateState.stepMismatch = true;
            }
          }
        } else {
          const arrSplitValue = strValue.split(" ");
          if (strType == "month-range") {
            strAttrMin = strAttrMin && strAttrMin.slice(0, 7);
            strAttrMax = strAttrMax && strAttrMax.slice(0, 7);
          }
          if (arrSplitValue.length == 3) {
            if (strAttrMin && arrSplitValue[0] < strAttrMin) {
              objValidateState.rangeUnderflow = true;
            }
            if (strAttrMax && arrSplitValue[2] > strAttrMax) {
              objValidateState.rangeOverflow = true;
            }
          }
        }
        return objValidateState;
      },
      /**
       * 判断数值或日期范围超出
       * @param  {Element}  element 验证的DOM元素
       * @return {Boolean|Object} 返回验证通过布尔值或者出错信息对象
       */
      isOut(element) {
        const objValidateState = this.getRangeState(element);
        return objValidateState.badInput || objValidateState.rangeOverflow || objValidateState.rangeUnderflow || objValidateState.stepMismatch;
      },
      /**
       * 内容是否超出长度限制的判断
       * @param  {Element}  element   DOM元素对象
       * @return {Boolean|Object} 返回验证通过布尔值或者出错信息对象
       */
      getLengthState(element) {
        const objValidateState = {
          tooLong: false,
          tooShort: false
        };
        if (!element || element.disabled || /^radio|checkbox|select$/i.test(element.type)) {
          return objValidateState;
        }
        const strAttrMinLength = element.getAttribute("minlength");
        let strAttrMaxLength = element.maxlength || element.getAttribute("maxlength");
        const strValue = element.value;
        if (strValue == "") {
          return objValidateState;
        }
        const numLength = this.getLength(element);
        if (strAttrMinLength && numLength < strAttrMinLength) {
          objValidateState.tooShort = true;
        }
        if (strAttrMaxLength) {
          strAttrMaxLength = strAttrMaxLength.replace(/\D/g, "");
          if (numLength > strAttrMaxLength) {
            objValidateState.tooLong = true;
          }
        }
        return objValidateState;
      },
      /**
       * 是否范围超出
       * @param  {[type]}  element [description]
       * @return {Boolean}         [description]
       */
      isOverflow(element) {
        const objValidateState = this.getLengthState(element);
        return objValidateState.tooLong || objValidateState.tooShort;
      },
      /**
       * 自定义验证状态
       * @return {[type]} [description]
       */
      getCustomState(element) {
        const objValidateState = {
          customError: false
        };
        const customValidate = element.customValidate;
        if (customValidate && typeof customValidate.method == "function") {
          const dataResult = customValidate.method.call(customValidate.owner, element);
          if (dataResult) {
            objValidateState.customError = true;
            if (typeof dataResult == "object" && dataResult.customError) {
              this.setCustomValidity(element, dataResult.customError);
            } else {
              this.setCustomValidity(element, dataResult);
            }
          }
        }
        return objValidateState;
      },
      /**
       * 设置自定义提示内容
       */
      setCustomValidity(element, content) {
        if (!content) {
          return;
        }
        if (!element.customValidate) {
          element.customValidate = {
            report: {}
          };
        }
        if (!element.customValidate.report) {
          element.customValidate.report = {};
        }
        element.customValidate.report.customError = content;
      },
      /**
       * 判断元素验证通过与否
       * @param  Element  element 输入框元素或者表单元素
       * @return {[type]} [description]
       */
      checkValidity(element) {
        if (!element || element.disabled) {
          return true;
        }
        const strType = element.getAttribute("type") || element.type;
        const strTag = element.tagName.toLowerCase();
        if (/^button|submit|reset|file|image$/.test(strType) == true || strTag == "button") {
          return true;
        }
        if (element.matches("input, select, textarea") == false && element.children) {
          element = element.querySelectorAll("input, select, textarea");
        }
        if (element.nodeType == 1) {
          return this.getValidity(element).valid;
        }
        if (element.length) {
          return [].slice.call(element).every((function(ele) {
            return this.checkValidity(ele);
          }).bind(this));
        }
        return true;
      },
      /**
       * 获取元素的验证状态
       * @return {[type]} [description]
       */
      getValidity(element) {
        if (element.lastValidateState && element.lastValue === element.value && /radio|checkbox/.test(element.type) == false) {
          return element.lastValidateState;
        }
        let objValidateState = {
          badInput: false,
          customError: false,
          patternMismatch: false,
          rangeOverflow: false,
          rangeUnderflow: false,
          stepMismatch: false,
          tooLong: false,
          tooShort: false,
          typeMismatch: false,
          valid: true,
          valueMissing: false
        };
        objValidateState = Object.assign(
          {},
          objValidateState,
          this.getMissingState(element),
          this.getMismatchState(element),
          this.getRangeState(element),
          this.getLengthState(element),
          this.getCustomState(element)
        );
        let isSomeInvalid = false;
        for (let keyValidate in objValidateState) {
          if (keyValidate != "valid" && objValidateState[keyValidate] == true) {
            isSomeInvalid = true;
          }
        }
        objValidateState.valid = !isSomeInvalid;
        element.lastValue = element.value;
        element.lastValidateState = objValidateState;
        setTimeout(function() {
          delete element.lastValidateState;
        }, 1);
        return objValidateState;
      },
      /**
       * 验证并进行错误提示
       * @param  {Element} element 需要显示提示信息的元素
       * @param  {Object}  options 可选参数，主要包括label，以及自定义提示和验证方法
       * @return {[type]}         [description]
       */
      reportValidity(element, content) {
        content = content || this.getReportText(element);
        this.errorTip(element, content);
        if (content === "" && element.data && element.data.errorTip) {
          element.data.errorTip.hide();
        }
        const isPass = !content;
        this.styleError(element, isPass);
        return isPass;
      },
      /**
       * 出错还是成功的样式处理
       * @param  {[type]} element [description]
       * @param  {[type]} valid   [description]
       * @return {[type]}         [description]
       */
      styleError(element, valid) {
        if (!element) {
          return this;
        }
        if (typeof valid == "undefined") {
          valid = element.validity.valid;
        } else {
          element.dispatchEvent(new CustomEvent(valid ? "valid" : "invalid"));
        }
        const eleTarget = this.getTarget(element);
        if (!eleTarget) {
          return valid;
        }
        const eleForm = element.form || element.closest("form") || element.customValidate && element.customValidate.owner;
        if (element.type == "radio" && element.name && eleForm) {
          eleForm.querySelectorAll("input[type=radio][name=" + element.name + "]").forEach((function(eleRadio) {
            const eleTargetRadio = this.getTarget(eleRadio);
            if (valid) {
              eleTargetRadio.removeAttribute("is-error");
              eleTargetRadio.removeAttribute("aria-label");
            } else {
              eleTargetRadio.setAttribute("is-error", "");
            }
          }).bind(this));
        } else if (valid) {
          eleTarget.removeAttribute("is-error");
          eleTarget.removeAttribute("aria-label");
        } else {
          eleTarget.setAttribute("is-error", "");
        }
        return valid;
      },
      /**
       * 显示出错信息处理
       * @param  {Object} element 出错提示原始元素（这里可能会进行转移）
       * @param  {String} content 出错提示内容
       * @return {Object}         返回当前上下文
       */
      errorTip(element, content) {
        const eleTarget = this.getTarget(element);
        if (!eleTarget || !content) {
          return this;
        }
        const objStyle = window.getComputedStyle(eleTarget);
        if (objStyle.display == "none" || objStyle.visibility == "hidden") {
          return this;
        }
        const funShow = function() {
          const eleControl = document.validate.errorTip.control;
          const eleTipTarget = document.validate.errorTip.target;
          eleTipTarget.errorTip(content, {
            onShow(eleTrigger, eleTips) {
              const numOffsetX = 0.5 * (eleTips.clientWidth - eleTipTarget.clientWidth);
              if (numOffsetX < 0) {
                eleTips.style.marginLeft = 0.5 * (eleTips.clientWidth - eleTipTarget.clientWidth) + "px";
              } else {
                eleTips.style.marginLeft = 0;
              }
              if (document.validate.focusable === false) {
                eleTips.classList.add("none");
              } else {
                eleTips.classList.remove("none");
              }
            },
            onHide(eleTrigger, eleTips) {
              const eleForm = eleControl.form || eleControl.closest("form");
              if (!eleForm || !eleForm.isImmediated) {
                return;
              }
              eleTips.style.marginLeft = "";
              document.validate.styleError(eleControl);
            }
          });
          if (document.validate.focusable === false || document.validate.focusable === 0) {
            return;
          }
          document.validate.focusable = null;
          if (!document.validate.getType(eleControl)) {
            return;
          }
          if (content.indexOf("内容长度") != -1 && content.indexOf("大") != -1) {
            const strValue = eleControl.value;
            const numLength = strValue.length;
            const strAttrMaxLength = eleControl.maxlength || eleControl.getAttribute("maxlength").replace(/\D/g, "");
            if (numLength && strAttrMaxLength) {
              document.validate.selectRange(element, document.validate.getLength(element, strAttrMaxLength), numLength);
            }
          } else if (eleControl.focus && eleControl.select) {
            eleControl.focus();
            eleControl.select();
          }
        };
        document.validate.errorTip.control = element;
        document.validate.errorTip.target = eleTarget;
        const objRect = eleTarget.getBoundingClientRect();
        let numScrollTop = -1;
        if (objRect.top < 50) {
          numScrollTop = window.pageYOffset - (50 - objRect.top);
        } else if (objRect.bottom > window.innerHeight) {
          numScrollTop = window.pageYOffset + (objRect.bottom - window.innerHeight);
        }
        if (numScrollTop >= 0) {
          window.scrollTopTo(numScrollTop, funShow);
        } else {
          funShow();
        }
        return this;
      },
      /**
       * 获得对应展示的元素
       * @param  {Object} el 元素
       * @return {Object}    返回对应的展示元素（可能就是自身）
       */
      getTarget(element) {
        if (!element) {
          return null;
        }
        let eleTarget = element;
        const strType = element.getAttribute("type") || element.type;
        const strId = element.id;
        const strTag = element.tagName.toLowerCase();
        const objStyle = window.getComputedStyle(element);
        if (strType == "radio") {
          if (objStyle.opacity != "1") {
            eleTarget = element.parentElement.querySelector('label.ui-radio[for="' + strId + '"]');
          }
        } else if (strType == "checkbox") {
          if (objStyle.opacity != "1") {
            eleTarget = element.parentElement.querySelector('label.ui-checkbox[for="' + strId + '"]');
          }
        } else if (strType == "select" || strTag == "select") {
          if (objStyle.opacity != "1") {
            eleTarget = element.nextElementSibling;
          }
        } else if (strType == "range") {
          if (objStyle.display == "none") {
            eleTarget = element.nextElementSibling;
          }
        } else if (strType == "hidden" || objStyle.display == "none" || objStyle.visibility == "hidden") {
          const eleTargetRel = document.getElementById(eleTarget.getAttribute("data-target")) || element.dataTarget;
          if (eleTargetRel) {
            eleTarget = document.validate.getTarget(eleTargetRel);
          }
        } else if (strType == "textarea" || strTag == "textarea") {
          if (element.classList.contains("ui-textarea") == false && element.parentElement.querySelector(".ui-textarea")) {
            eleTarget = element.parentElement.querySelector(".ui-textarea");
          }
        } else if (strTag == "input") {
          if (element.classList.contains("ui-input") == false && element.parentElement.querySelector(".ui-input")) {
            eleTarget = element.parentElement.querySelector(".ui-input");
          }
        }
        return eleTarget;
      }
    };
  }();
  [HTMLInputElement.prototype, HTMLSelectElement.prototype, HTMLTextAreaElement.prototype].forEach(function(prop) {
    Object.defineProperty(prop, "validity", {
      get() {
        return document.validate.getValidity(this);
      },
      configurable: true
    });
    Object.defineProperty(prop, "validationMessage", {
      get() {
        return document.validate.getReportText(this);
      },
      configurable: true
    });
    Object.defineProperty(prop, "checkValidity", {
      value() {
        return this.validity.valid;
      },
      configurable: true
    });
    Object.defineProperty(prop, "reportValidity", {
      value(content) {
        return document.validate.reportValidity(this, content);
      },
      configurable: true
    });
    Object.defineProperty(prop, "setCustomValidity", {
      value(content) {
        if (!content) {
          return;
        }
        const arrValidateKey = [
          "badInput",
          "customError",
          "patternMismatch",
          "rangeOverflow",
          "rangeUnderflow",
          "stepMismatch",
          "tooLong",
          "tooShort",
          "typeMismatch",
          "valueMissing"
        ];
        if (!this.customValidate) {
          this.customValidate = {};
        }
        if (!this.customValidate.report) {
          this.customValidate.report = {};
        }
        if (typeof content == "string") {
          arrValidateKey.forEach(function(key) {
            this.customValidate.report[key] = content;
          });
        } else if (typeof content == "object") {
          Object.assign(this.customValidate.report, content);
        }
      },
      configurable: true
    });
  });
  Object.defineProperty(HTMLFormElement.prototype, "checkValidity", {
    value() {
      return document.validate.checkValidity(this);
    },
    configurable: true
  });
  class Component {
    /**
     * 验证实例方法主体
     * @param {Object}   el       通常值验证的表单元素
     * @param {Function} callback 可选，表示验证成功的回调，可以使用自定义 DOM 事件代替
     * @param {Object}   options  可选参数
     */
    constructor(element, callback, options) {
      if (typeof element == "string") {
        element = document.getElementById(element) || document.querySelector(element);
      }
      if (!element) {
        return this;
      }
      const eleForm = element;
      if (eleForm.data && eleForm.data.validate) {
        return eleForm.data.validate;
      }
      eleForm.setAttribute("novalidate", "novalidate");
      const defaults = {
        // 提交时候是全部出错红色高亮，还是仅第一个，默认是全部
        multiple: true,
        // 是否开启即时验证
        immediate: true,
        // 是否利用label关联元素的innerHTML作为提示关键字
        label: true,
        // 自定义验证提示与数据
        validate: [
          // 下面为结构示意
          /*{
              id: '',
              report: {
                  // 源自规范，详见：https://www.zhangxinxu.com/wordpress/?p=8895
                  badInput: '该错误类型对应的提示'
                  customError: '该错误类型对应的提示'
                  patternMismatch: '该错误类型对应的提示'
                  rangeOverflow: '该错误类型对应的提示'
                  rangeUnderflow: '该错误类型对应的提示'
                  stepMismatch: '该错误类型对应的提示'
                  tooLong: '该错误类型对应的提示'
                  tooShort: '该错误类型对应的提示'
                  typeMismatch: '该错误类型对应的提示'
                  valueMissing: '该错误类型对应的提示'
              },
              method: function () {}
          }*/
        ]
      };
      if (typeof callback == "object") {
        options = callback;
        callback = null;
      }
      const objParams = Object.assign({}, defaults, options || {});
      eleForm.querySelectorAll('[type="submit"]:disabled, [type="image"]:disabled').forEach(function(eleSubmit) {
        eleSubmit.disabled = false;
      });
      eleForm.addEventListener("submit", (event) => {
        if (this.stopValidate) {
          return;
        }
        event.preventDefault();
        if (this.checkValidity()) {
          if (typeof callback == "function") {
            callback.call(this, eleForm);
          }
          eleForm.dispatchEvent(new CustomEvent("valid"));
        }
        return false;
      });
      this.element = {
        form: eleForm
      };
      this.params = {
        multiple: objParams.multiple,
        immediate: objParams.immediate,
        label: objParams.label
      };
      this.setCustomValidity(objParams.validate);
      this.count();
      this.enhance();
      if (!eleForm.data) {
        eleForm.data = {};
      }
      eleForm.data.validate = this;
      return this;
    }
    /**
     * 设置自定义提示内容
     */
    setCustomValidity(validate) {
      let dataValidate = validate || this.dataValidate;
      if (!dataValidate || !this.element || !this.element.form) {
        return this;
      }
      if (typeof dataValidate == "function") {
        dataValidate = dataValidate();
      }
      if (dataValidate && !dataValidate.forEach && dataValidate.id) {
        dataValidate = [dataValidate];
      }
      const isLabel = this.params.label;
      let eleFormCollection = this.element.form.elements || this.element.form.querySelectorAll("input, textarea, select");
      if (!eleFormCollection.length) {
        return this;
      }
      [...eleFormCollection].forEach((eleInput) => {
        const strId = eleInput.id;
        let customValidate = {
          label: isLabel,
          owner: this
        };
        if (strId && dataValidate && dataValidate.length) {
          dataValidate.forEach((function(objValidate) {
            if (objValidate.id == strId) {
              objValidate.label = isLabel;
              objValidate.owner = this;
              customValidate = objValidate;
            }
          }).bind(this));
        }
        if (!this.element.form.data || !this.element.form.data.validate) {
          eleInput.lastValue = eleInput.value || "";
        }
        eleInput.customValidate = customValidate;
      });
      this.dataValidate = validate;
    }
    /**
     * 表单内有计数功能元素的处理
     * 私有
     * @return {Object} 返回当前实例
     */
    count() {
      const eleForm = this.element.form;
      const propsInput = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
      const propsTextarea = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value");
      eleForm.querySelectorAll("input, textarea").forEach(function(element) {
        let strAttrMaxLength = element.getAttribute("maxlength");
        if (strAttrMaxLength) {
          try {
            element.setAttribute("maxlength", "_" + strAttrMaxLength + "_");
          } catch (e) {
            element.removeAttribute("maxlength");
            element.maxlength = strAttrMaxLength;
          }
        }
        const strAttrMinLength = element.getAttribute("minlength");
        if (!strAttrMaxLength) {
          return;
        }
        if (strAttrMaxLength) {
          strAttrMaxLength = strAttrMaxLength.replace(/\D/g, "");
        }
        const strTag = element.tagName.toLowerCase();
        const CL = {
          add() {
            return ["ui", strTag].concat([].slice.call(arguments)).join("-");
          },
          toString() {
            return "ui-" + strTag;
          }
        };
        let eleLabel = element.parentElement.querySelector("." + CL.add("count")) || eleForm.querySelector("." + CL.add("count") + '[for="' + element.id + '"]');
        if (!eleLabel && !element.parentElement.classList.contains(CL.add("x"))) {
          return;
        }
        let strId = element.id;
        if (!strId) {
          strId = ("lulu_" + Math.random()).replace("0.", "");
          element.id = strId;
        }
        if (!eleLabel) {
          eleLabel = document.createElement("label");
          eleLabel.className = CL.add("count");
          eleLabel.setAttribute("for", strId);
          eleLabel.innerHTML = "<span>0</span><slash>/</slash><span>" + (strAttrMinLength ? strAttrMinLength + "-" : "") + strAttrMaxLength + "</span>";
          element.parentElement.appendChild(eleLabel);
        } else if (!eleLabel.hasAttribute("for")) {
          eleLabel.setAttribute("for", strId);
        }
        const eleMin = eleLabel.querySelector("span, output") || eleLabel;
        const funCount = function() {
          const length = document.validate.getLength(element);
          eleMin.innerHTML = length;
          if (length != 0 && (length > strAttrMaxLength || strAttrMinLength && length < strAttrMinLength)) {
            eleMin.classList.add("error");
            eleMin.toggleAttribute("is-error", true);
          } else {
            eleMin.classList.remove("error");
            eleMin.toggleAttribute("is-error", false);
          }
        };
        element.count = funCount;
        element.addEventListener("input", funCount);
        if (strTag == "input") {
          Object.defineProperty(element, "value", {
            ...propsInput,
            set(value) {
              propsInput.set.call(this, value);
              funCount();
            }
          });
        } else if (strTag == "textarea") {
          Object.defineProperty(element, "value", {
            ...propsTextarea,
            set(value) {
              propsTextarea.set.call(this, value);
              funCount();
            }
          });
        }
        funCount();
      });
      eleForm.addEventListener("reset", function() {
        this.querySelectorAll("input, textarea").forEach(function(element) {
          if (element.count) {
            setTimeout(() => {
              element.count();
            }, 1);
          }
        });
      });
      return this;
    }
    /**
     * 表单内一些元素体验增强处理
     * 私有方法
     * @return {Object} 返回当前实例
     */
    enhance() {
      const eleForm = this.element.form;
      eleForm.querySelectorAll("input, textarea").forEach(function(element) {
        const strAttrType = document.validate.getType(element);
        if (/^checkbox|radio|range$/i.test(strAttrType) == false) {
          ["paste", "drop"].forEach((eventType) => {
            element.addEventListener(eventType, function(event) {
              const type = this.getAttribute("type") || this.type;
              const objPassData = event.clipboardData || event.dataTransfer;
              let strPassText = "";
              if (!objPassData) {
                return;
              }
              if (this.dataset.enhance == "false") {
                return;
              }
              let textSelected = this.value.slice(element.selectionStart, element.selectionEnd);
              if (this.value.trim() == "" || textSelected === this.value) {
                event.preventDefault();
                strPassText = objPassData.getData("text") || "";
                if (type != "password") {
                  strPassText = strPassText.trim();
                }
                if (type == "email") {
                  strPassText = strPassText.replace("#", "@");
                } else if (type == "tel") {
                  strPassText = document.validate.getTel(strPassText);
                }
                this.value = strPassText;
                element.dispatchEvent(new CustomEvent("input"));
              }
            });
          });
        }
      });
    }
    /**
     * 表单即时验证的细节处理
     * @return {Object} 返回当前实例
     */
    immediate() {
      const eleForm = this.element.form;
      if (eleForm.isImmediated) {
        return this;
      }
      const funReportValidity = (event) => {
        if (this.params.immediate == false) {
          return;
        }
        this.reportValidity(event.target);
      };
      const funReportFocus = (event) => {
        if (this.params.immediate) {
          setTimeout((function() {
            document.validate.focusable = 0;
            this.reportValidity(event.target);
          }).bind(this), 20);
        }
      };
      const funReportInput = (event) => {
        if (this.params.immediate == false) {
          return;
        }
        document.validate.focusable = false;
        this.reportValidity(event.target);
        event.target.lastValue = event.target.value;
      };
      eleForm.querySelectorAll("input, select, textarea").forEach(function(element) {
        let strType = element.type;
        let strAttrType = element.getAttribute("type");
        if (strType == "button" || strType == "submit" || strType == "reset" || strType == "file" || strType == "image") {
          return;
        }
        if (strType == "radio" || strType == "checkbox") {
          element.addEventListener("click", funReportValidity);
        } else if (/select/.test(strType) || /range|date|time|hour|minute|hidden/.test(strAttrType)) {
          element.addEventListener("change", funReportValidity);
        } else {
          element.addEventListener("focus", funReportFocus);
          element.addEventListener("input", funReportInput);
        }
      });
      eleForm.isImmediated = true;
      const funRemoveValidate = function() {
        [...eleForm.elements].forEach((element) => {
          let strType = element.type;
          if (["button", "submit", "reset", "file", "image"].includes(strType)) {
            return;
          }
          let strAttrType = element.getAttribute("type");
          if (strType == "radio" || strType == "checkbox") {
            element.removeEventListener("click", funReportValidity);
          } else if (/select/.test(strType) || /range|date|time|hour|minute|hidden/.test(strAttrType)) {
            element.removeEventListener("change", funReportValidity);
          } else {
            element.removeEventListener("focus", funReportFocus);
            element.removeEventListener("input", funReportInput);
          }
        });
        [...eleForm.querySelectorAll(".valided")].forEach((element) => {
          element.classList.remove("valided");
        });
        [...eleForm.querySelectorAll("[is-error]")].forEach((element) => {
          let objErrorTip = element.data && element.data.errorTip;
          if (objErrorTip) {
            objErrorTip.hide();
          }
          element.removeAttribute("is-error");
        });
        eleForm.isImmediated = false;
        eleForm.removeEventListener("reset", funRemoveValidate);
      };
      eleForm.addEventListener("reset", funRemoveValidate);
      return this;
    }
    /**
     * 表单所有元素验证通过的判断处理
     * @return {Boolean} 是否表单所有元素验证通过
     */
    checkValidity() {
      const eleForm = this.element.form;
      let isAllPass = true;
      document.validate.focusable = true;
      eleForm.querySelectorAll("input, select, textarea").forEach((element) => {
        if (isAllPass == true || this.params.multiple) {
          const isPass = element.validity.valid;
          if (isAllPass == true && isPass == false) {
            this.reportValidity(element);
            isAllPass = false;
          } else {
            document.validate.styleError(element, isPass);
          }
        }
      });
      if (!eleForm.isImmediated && this.params.immediate) {
        this.immediate();
      }
      return isAllPass;
    }
    /**
     * 出错提示显示
     * @return {[type]} [description]
     */
    reportValidity(element, content) {
      if (element) {
        document.validate.reportValidity(element, content);
      }
    }
  }
  return Component;
})();
window.Validate = Validate;
HTMLFormElement.prototype.validate = function() {
  new Validate(this);
  return this;
};
(function() {
  const initAllValidate = (ele) => {
    const eleValidates = ele || document.querySelectorAll("[is-validate]");
    eleValidates.forEach((item) => {
      item.validate();
      item.dispatchEvent(new CustomEvent("connected", {
        detail: {
          type: "ui-validate"
        }
      }));
      item.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    });
  };
  const autoInitAndWatchingValidate = () => {
    initAllValidate();
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        mutation.addedNodes && mutation.addedNodes.forEach((eleAdd) => {
          if (!eleAdd.tagName) {
            return;
          }
          if (eleAdd.hasAttribute("is-validate")) {
            initAllValidate([eleAdd]);
          } else {
            initAllValidate(eleAdd.querySelectorAll("[is-validate]"));
          }
        });
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  if (document.readyState != "loading") {
    autoInitAndWatchingValidate();
  } else {
    window.addEventListener("DOMContentLoaded", autoInitAndWatchingValidate);
  }
})();
var Pagination = class extends HTMLElement {
  static get observedAttributes() {
    return ["per", "total", "current", "loading"];
  }
  constructor({ per, total, current, loading, href, container = null, onChange = () => {
  } } = {}) {
    super();
    const shadowRoot = this.attachShadow({
      mode: "open"
    });
    const isLink = href || this.href;
    const el = isLink ? "a" : "button";
    if (per) {
      this.per = per;
    }
    if (total) {
      this.total = total;
    }
    if (current) {
      this.setAttribute("current", current);
    }
    this.loading = loading;
    this.onchange = onChange;
    shadowRoot.innerHTML = `
        <style>
        :host {
            display: flex;
            font-size: 14px;
            height: 30px;
            align-items: center;
        }

        .ui-page {
            display: inline-flex;
            min-width: 18px;
            padding: 0 var(--ui-page-padding, 2px);
            margin: 0 5px;
            height: var(--ui-page-height, 28px);
            border: 1px solid transparent;
            border-radius: var(--ui-page-radius, 0);
            color: var(--ui-gray, #a2a9b6);
            font-size: var(--ui-font, 14px);
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            transition: border-color var(--ui-animate-time, .2s), background-color var(--ui-animate-time, .2s);
            text-decoration: none;
            user-select: none;
            position: relative;
            justify-content: center;
            align-items: center;
            background: none;
            box-sizing: content-box;
        }

        .ui-page:not(:focus-visible){
            outline: 0;
        }

        .ui-page[current] {
            cursor: default;
        }

        .ui-page:not([current]):not([disabled]):not(:disabled):hover {
            border-color: #b6bbc6;
            color: var(--ui-gray, #a2a9b6);
            cursor: pointer;
        }

        .ui-page:disabled {
            color: #ccd0d7;
            cursor: default;
        }

        .ui-page > svg {
            width: 20px;
            height: 20px;
        }

        .ui-page-prev,
        .ui-page-next {
            text-align: center;
            fill: currentColor;
            overflow: hidden;
        }

        /* 当前不可点的按钮颜色 */
        span.ui-page-prev,
        span.ui-page-next {
            color: var(--ui-diabled, #ccd0d7);
        }

        .ui-page-next svg {
            transform: scaleX(-1);
        }

        .ui-page-prev {
            margin-left: 0;
        }

        .ui-page-next {
            margin-right: 0;
        }

        .ui-page-ellipsis {
            display: inline-block;
        }

        :host(:not([loading]):not([data-loading=true])) .ui-page[current] {
            color: var(--ui-white, #ffffff);
            background-color: var(--ui-blue, #2a80eb);
        }

        .ui-page-text {
            color: var(--ui-dark, #4c5161);
        }

        .ui-page.loading > svg {
            visibility: hidden;
        }

        :host([loading]) .ui-page[current]::before,
        :host([data-loading=true]) .ui-page[current]::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-repeat: no-repeat;
            width: 20px;
            height: 20px;
            background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512q0-15 10.5-25.5T36 476t25.5 10.5T72 512q0 90 35 171 33 79 94 140t140 95q81 34 171 34t171-35q79-33 140-94t95-140q34-81 34-171t-35-171q-33-79-94-140t-140-95q-81-34-171-34-15 0-25.5-10.5T476 36t10.5-25.5T512 0q104 0 199 40 92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z' fill='%232a80eb'/%3E%3C/svg%3E")
                no-repeat center;
            background-size: 20px 20px;
            margin: auto;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from {
                transform: rotate(0);
            }
            to {
                transform: rotate(360deg);
            }
        }

        .simple-page {
            width: auto;
            padding: 0 .625em;
            pointer-events: none;
            color: #4c5161;
        }
        .page {
            display: inline-flex;
            height: 100%;
            align-items: center;
        }
        .pagination-wrap {
            display: contents;
            visibility: var(--ui-visibility, initial);
        }
        @media (prefers-reduced-motion: reduce) {
            .ui-page {
                transition: none;
            }
        }
        </style>
        <fieldset id="wrap" class="pagination-wrap">
            <${el} class="ui-page ui-page-prev" id="left">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M85.876,100.5l49.537-50.526c4.089-4.215,4.089-11.049,0-15.262 c-4.089-4.218-10.719-4.218-14.808,0L63.586,92.868c-4.089,4.215-4.089,11.049,0,15.264l57.018,58.156 c4.089,4.215,10.719,4.215,14.808,0c4.089-4.215,4.089-11.049,0-15.262L85.876,100.5z"></path></svg>
            </${el}>
            <div class="page" id="page"></div>
            <${el} class="ui-page ui-page-next" id="right">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M85.876,100.5l49.537-50.526c4.089-4.215,4.089-11.049,0-15.262 c-4.089-4.218-10.719-4.218-14.808,0L63.586,92.868c-4.089,4.215-4.089,11.049,0,15.264l57.018,58.156 c4.089,4.215,10.719,4.215,14.808,0c4.089-4.215,4.089-11.049,0-15.262L85.876,100.5z"></path></svg>
            </${el}>
        </fieldset>
        `;
    this.element = new Proxy({}, {
      get: (target, prop) => {
        if (prop == "trigger") {
          return this.htmlFor && document.getElementById(this.htmlFor);
        }
      }
    });
    if (typeof container == "string") {
      container = document.querySelector(container);
    }
    if (container) {
      container.append(this);
    }
  }
  get per() {
    return Number(this.getAttribute("per")) || 15;
  }
  get simple() {
    return this.getAttribute("mode") === "short";
  }
  get total() {
    return Number(this.getAttribute("total")) || 0;
  }
  get current() {
    return Number(this.getAttribute("current")) || 1;
  }
  get loading() {
    return this.getAttribute("loading") !== null;
  }
  get href() {
    return this.getAttribute("href");
  }
  set current(value) {
    this.setAttribute("current", Math.min(Math.max(1, value), this.count));
  }
  set per(value) {
    this.setAttribute("per", value);
  }
  set total(value) {
    this.setAttribute("total", value);
  }
  set loading(value) {
    if (!value) {
      this.removeAttribute("loading");
    } else {
      this.setAttribute("loading", "");
    }
  }
  get htmlFor() {
    return this.getAttribute("for");
  }
  set htmlFor(value) {
    this.setAttribute("for", value);
  }
  render(per, total) {
    const item = this.href ? "a" : "button";
    this.count = Math.ceil(total / per) || 1;
    const current = Math.min(Math.max(1, this.current), this.count);
    if (this.simple) {
      const html = `<div class="simple-page ui-page" >${current} / ${this.count}</div>`;
      this.page.innerHTML = html;
    } else {
      const arr = Array.from({ length: this.count }).splice(0, 9);
      const html = arr.map((el, index) => {
        return `<${item} class="ui-page" data-current="${index + 1}" aria-label="第${index + 1}页，共${this.count}页">${index + 1}</${item}>`;
      }).join("");
      this.page.innerHTML = html;
    }
    clearTimeout(this.timerRender);
    this.timerRender = setTimeout(() => {
      this.updatePage(current);
    });
  }
  updatePage(current = this.current) {
    if (current == 1) {
      this.left.setAttribute("disabled", true);
      this.left.setAttribute("aria-label", "已经是第一页了");
      this.left.removeAttribute("href");
    } else {
      this.left.removeAttribute("disabled");
      this.left.setAttribute("aria-label", `上一页，当前第${current}页`);
      this.left.href = this.href ? this.href.replace(/\${current}/g, current - 1) : "javascript:;";
    }
    if (current == this.count) {
      this.right.setAttribute("disabled", true);
      this.right.setAttribute("aria-label", "已经是最后一页了");
      this.right.removeAttribute("href");
    } else {
      this.right.removeAttribute("disabled");
      this.right.setAttribute("aria-label", `下一页，当前第${current}页`);
      this.right.href = this.href ? this.href.replace(/\${current}/g, current + 1) : "javascript:;";
    }
    if (this.simple) {
      this.page.querySelector(".simple-page").textContent = current + " / " + this.count;
    } else if (this.count > 9) {
      let place = [];
      switch (current) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          place = [1, 2, 3, 4, 5, 6, 7, "next", this.count];
          break;
        case this.count:
        case this.count - 1:
        case this.count - 2:
        case this.count - 3:
        case this.count - 4:
          place = [1, "pre", this.count - 6, this.count - 5, this.count - 4, this.count - 3, this.count - 2, this.count - 1, this.count];
          break;
        default:
          place = [1, "pre", current - 2, current - 1, current, current + 1, current + 2, "next", this.count];
          break;
      }
      this.page.querySelectorAll(".ui-page").forEach((el, i) => {
        if (typeof place[i] === "number") {
          el.dataset.current = place[i];
          el.textContent = place[i];
          el.disabled = false;
          el.href = "javascript:;";
          if (place[i] == current) {
            el.setAttribute("current", "");
            if (this.isKeepFocusIn) {
              el.focus({
                preventScroll: true
              });
            }
          } else {
            el.removeAttribute("current");
          }
          el.removeAttribute("disabled");
          el.setAttribute("aria-label", `第${place[i]}页，共${this.count}页`);
          if (this.href) {
            el.href = this.href.replace(/\${current}/g, el.dataset.current);
          }
        } else {
          el.textContent = "...";
          el.removeAttribute("current");
          el.removeAttribute("data-current");
          el.removeAttribute("aria-label");
          el.setAttribute("disabled", true);
          el.removeAttribute("href");
        }
      });
    } else {
      this.page.querySelectorAll(".ui-page").forEach((el) => {
        if (el.dataset.current == current) {
          el.setAttribute("current", "");
          if (this.isKeepFocusIn) {
            el.focus({
              preventScroll: true
            });
          }
        } else {
          el.removeAttribute("current");
        }
        if (this.href) {
          el.href = this.href.replace(/\${current}/g, el.dataset.current);
        }
      });
    }
  }
  // 上一个聚焦元素
  focusPrev() {
    const current = this.shadowRoot.activeElement;
    if (current === this.right) {
      if (this.simple) {
        this.left.focus();
      } else {
        this.page.lastElementChild.focus();
      }
    } else {
      const prev = current.previousElementSibling;
      if (prev) {
        if (!prev.disabled) {
          prev.focus();
        } else {
          prev.previousElementSibling.focus();
        }
      } else {
        this.left.focus();
      }
    }
  }
  // 下一个聚焦元素
  focusNext() {
    const current = this.shadowRoot.activeElement;
    if (current === this.left) {
      if (this.simple) {
        this.right.focus();
      } else {
        this.page.firstElementChild.focus();
      }
    } else {
      const next = current.nextElementSibling;
      if (next) {
        if (!next.disabled) {
          next.focus();
        } else {
          next.nextElementSibling.focus();
        }
      } else {
        this.right.focus();
      }
    }
  }
  connectedCallback() {
    if (this.isConnectedCallback) {
      return this;
    }
    this.page = this.shadowRoot.getElementById("page");
    this.left = this.shadowRoot.getElementById("left");
    this.right = this.shadowRoot.getElementById("right");
    this.wrap = this.shadowRoot.getElementById("wrap");
    this.render(this.per, this.total);
    this.page.addEventListener("click", (ev) => {
      const item = ev.target.closest(".ui-page");
      if (item) {
        this.nativeClick = true;
        this.current = Number(item.dataset.current);
      }
    });
    this.page.addEventListener("focusin", () => {
      this.isKeepFocusIn = true;
    });
    this.addEventListener("keydown", (ev) => {
      if (this.loading) {
        return;
      }
      switch (ev.key) {
        case "ArrowDown":
        case "PageDown":
          ev.preventDefault();
          this.nativeClick = true;
          this.current--;
          break;
        case "ArrowUp":
        case "PageUp":
          ev.preventDefault();
          this.nativeClick = true;
          this.current++;
          break;
        case "ArrowLeft":
          this.focusPrev();
          break;
        case "ArrowRight":
          this.focusNext();
          break;
        default:
          break;
      }
    });
    this.left.addEventListener("click", () => {
      this.nativeClick = true;
      this.current--;
      this.left.focus();
    });
    this.right.addEventListener("click", () => {
      this.nativeClick = true;
      this.current++;
      this.right.focus();
    });
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-pagination"
      }
    }));
    this.isConnectedCallback = true;
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.page || oldValue === newValue) {
      return;
    }
    let eleTrigger = this.element && this.element.trigger;
    if (name == "per") {
      this.render(newValue, this.total);
      if (eleTrigger) {
        eleTrigger.dataset.per = newValue;
      }
    } else if (name == "total") {
      this.render(this.per, newValue);
      if (eleTrigger) {
        eleTrigger.dataset.total = newValue;
      }
    } else if (name == "loading") {
      this.wrap.disabled = newValue !== null;
      if (eleTrigger) {
        eleTrigger.dataset.loading = newValue !== null;
      }
    } else if (name == "current" && oldValue !== newValue) {
      clearTimeout(this.timerRender);
      this.timerRender = setTimeout(() => {
        this.updatePage(Number(newValue));
      });
      if (eleTrigger) {
        eleTrigger.dataset.current = newValue;
      }
      if (this.nativeClick) {
        this.nativeClick = false;
        this.dispatchEvent(new CustomEvent("change", {
          detail: {
            current: Number(newValue),
            per: this.per,
            total: this.total
          }
        }));
        if (eleTrigger && eleTrigger != this) {
          eleTrigger.dispatchEvent(new CustomEvent("change", {
            detail: {
              current: Number(newValue),
              per: this.per,
              total: this.total
            }
          }));
        }
      }
    }
  }
};
if (!customElements.get("ui-pagination")) {
  customElements.define("ui-pagination", Pagination);
}
window.Pagination = Pagination;
HTMLElement.prototype.pagination = function(options) {
  if (this.matches("ui-pagination") || this["ui-pagination"]) {
    return this;
  }
  const {
    total = 0,
    current = 1,
    per = 15,
    href = null,
    loading = false
  } = this.dataset;
  let objParams = Object.assign({}, {
    per,
    total,
    href,
    loading
  }, options || {});
  const pagination = new Pagination(objParams);
  const strId = this.id || ("lulu_" + Math.random()).replace("0.", "");
  this.innerHTML = "";
  this.id = strId;
  this["ui-pagination"] = pagination;
  pagination.htmlFor = strId;
  pagination.setAttribute("current", current);
  pagination.addEventListener("connected", () => {
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-pagination"
      }
    }));
    pagination.remove();
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
  });
  document.body.append(pagination);
  const shadowRoot = this.attachShadow({
    mode: "open"
  });
  shadowRoot.append(pagination.shadowRoot);
  this.setAttribute("defined", "");
  return this;
};
(function() {
  const initAllPagination = (ele) => {
    const elePaginations = ele || document.querySelectorAll("[is-pagination]");
    elePaginations.forEach((item) => {
      item.pagination();
    });
  };
  const autoInitAndWatchingIsPaginationAttr = () => {
    initAllPagination();
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        mutation.addedNodes && mutation.addedNodes.forEach((eleAdd) => {
          if (!eleAdd.tagName) {
            return;
          }
          if (eleAdd.hasAttribute("is-pagination")) {
            initAllPagination([eleAdd]);
          } else {
            initAllPagination(eleAdd.querySelectorAll("[is-pagination]"));
          }
        });
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  if (document.readyState != "loading") {
    autoInitAndWatchingIsPaginationAttr();
  } else {
    window.addEventListener("DOMContentLoaded", autoInitAndWatchingIsPaginationAttr);
  }
})();
var Table = function() {
  let CHECKED = "checked";
  let SELECTED = "selected";
  let CL = {
    // 容器
    container: "table-x",
    // 为空
    empty: "table-null-x",
    // 错误
    error: "table-error-x",
    // 分页容器类名
    page: "table-page",
    // 复选框选择器
    checkbox: '[type="checkbox"]'
  };
  class Table2 extends HTMLTableElement {
    static get defaultKeyMap() {
      return {
        key: "",
        total: "total",
        per: "per",
        current: "current"
      };
    }
    // 滚动到顶部缓动实现
    // rate表示缓动速率，默认是2
    static scrollTopTo(top, callback) {
      let scrollTop = document.scrollingElement.scrollTop;
      let rate = 2;
      let funTop = function() {
        scrollTop = scrollTop + (top - scrollTop) / rate;
        if (Math.abs(scrollTop - top) <= 1) {
          document.scrollingElement.scrollTop = top;
          callback && callback();
          return;
        }
        document.scrollingElement.scrollTop = scrollTop;
        requestAnimationFrame(funTop);
      };
      funTop();
    }
    constructor() {
      super();
      this.params = this.params || {};
      this.element = this.element || {};
      this.params.parse = (data) => {
        if (this.params.template) {
          return this.params.template.interpolate(data);
        }
        return "";
      };
      this.params.ajax = {};
      this.params.form = {};
      this.params.list = [15, 30, 50];
      this.params.page = {
        // 总数据量
        total: 0,
        // 每页显示数目
        per: 15,
        // 当前的页数
        current: 1,
        // 与后台交互时候UI分页需要的参数和后台分页参数对应关系
        // 下面注释的是起点个人中心的接口对应关系
        // 其中key表示后台分页数据在那个接口名称下，例如，下面注释内容表示的JSON数据结构是：
        // {
        //     "code": 0,
        //     "data": {
        //         "pageInfo": {
        //             "pageIndex": 1,
        //             "pageSize": 20,
        //             "pageMax": 6,
        //             "totalCount": 113
        //          }
        //     }
        // }
        // keyMap: {
        //     key: 'pageInfo',
        //     total: 'totalCount',
        //     per: 'pageSize',
        //     current: 'pageIndex'
        // }
        // 下面这里未注释的是默认设定
        keyMap: Table2.defaultKeyMap
      };
    }
    setParams(options) {
      options = options || {};
      let objPageOption = options.page;
      if (objPageOption) {
        objPageOption.keyMap = Object.assign({}, this.params.page.keyMap || Table2.defaultKeyMap, objPageOption.keyMap || {});
      }
      this.params = Object.assign(this.params, options);
      return this;
    }
    /**
     * 列表解决方案中的事件处理
     * @return {[type]} [description]
     */
    events() {
      let objParams = this.params;
      let objElement = this.element;
      this.addEventListener("click", function(event) {
        let eleCheckbox = event.target;
        if (!eleCheckbox || eleCheckbox.type != "checkbox") {
          return;
        }
        let eleTr = eleCheckbox.closest("tr");
        if (eleTr.querySelector(":first-child " + CL.checkbox) !== eleCheckbox) {
          return;
        }
        let eleAllTdCheckbox = [];
        this.querySelectorAll("tr").forEach(function(tr) {
          if (tr.clientWidth == 0) {
            return;
          }
          let eleTdCheckbox = tr.querySelector("td:first-child " + CL.checkbox + ":enabled");
          if (eleTdCheckbox) {
            eleAllTdCheckbox.push(eleTdCheckbox);
          }
        });
        let isAllChecked = false;
        let isAllUnchecked = false;
        let eleTh = eleCheckbox.closest("th");
        if (eleTh) {
          isAllChecked = eleCheckbox[CHECKED];
          isAllUnchecked = !isAllChecked;
          eleAllTdCheckbox.forEach(function(eleTdCheckbox) {
            eleTdCheckbox[CHECKED] = isAllChecked;
          });
        } else {
          let numLengthChecked = [].slice.call(eleAllTdCheckbox).filter(function(eleTdCheckbox) {
            return eleTdCheckbox[CHECKED];
          }).length;
          isAllChecked = eleAllTdCheckbox.length == numLengthChecked;
          isAllUnchecked = numLengthChecked == 0;
        }
        let eleThCheckbox = this.querySelector("th:first-child " + CL.checkbox);
        if (eleThCheckbox) {
          eleThCheckbox[CHECKED] = isAllChecked;
        }
        eleAllTdCheckbox.forEach(function(eleTdCheckbox) {
          eleTdCheckbox.closest("tr").classList[eleTdCheckbox[CHECKED] ? "add" : "remove"](SELECTED);
        });
        this.dispatchEvent(new CustomEvent("check", {
          detail: {
            isAllChecked,
            isAllUnchecked,
            target: eleCheckbox,
            allEnabledCheckbox: eleAllTdCheckbox
          }
        }));
      });
      this.addEventListener("click", function(event) {
        let eleTarget = event.target;
        let eleCheckbox = null;
        if (eleTarget && /^(?:a|input|textarea|tbody|i|select|label|th)$/i.test(eleTarget.tagName) == false) {
          eleCheckbox = eleTarget.closest("tr") && eleTarget.closest("tr").querySelector("td:first-child " + CL.checkbox + ":enabled");
          if (eleCheckbox) {
            eleCheckbox.click();
          }
        }
      });
      let elePagination = this.element.pagination;
      if (elePagination) {
        elePagination.addEventListener("change", (event) => {
          let numCurrent = event.detail.current;
          objParams.page.current = numCurrent;
          elePagination.loading = true;
          this.ajax();
        });
      }
      let strStoreId = this.id;
      let numCurrentPer = objParams.page.per;
      let elePer = objElement.drop;
      if (elePer && elePer.list) {
        if (strStoreId && localStorage[strStoreId]) {
          numCurrentPer = localStorage[strStoreId];
          objParams.page.per = Number(numCurrentPer);
        }
        elePer.textContent = numCurrentPer;
        elePer.list(() => {
          return objParams.list.map(function(number) {
            return {
              value: number
            };
          });
        }, {
          width: 60,
          onSelect: (data) => {
            let numPerNew = data.value;
            if (strStoreId) {
              localStorage[strStoreId] = numPerNew;
            }
            if (objParams.page.per != numPerNew) {
              objParams.page.per = numPerNew;
              objParams.page.current = 1;
              this.ajax();
            }
          }
        });
      }
      let eleForm = this.form;
      if (eleForm) {
        new Validate(eleForm, () => {
          objParams.page.current = 1;
          this.ajax({
            data: this.params.form.data || {}
          });
        }, {
          validate: () => {
            return this.params.form.validate || [];
          }
        });
      }
    }
    /**
     * 列表数据请求
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    ajax(options) {
      options = options || {};
      let objParams = this.params;
      let objElement = this.element;
      if (this.getAttribute("aria-busy") == "true") {
        return this;
      }
      let eleContainer = this.parentElement;
      let eleTbody = this.querySelector("tbody");
      let eleForm = this.form;
      let objAjaxForm = {
        data: {}
      };
      if (eleForm) {
        let strAttrAction = eleForm.getAttribute("action");
        if (strAttrAction) {
          objAjaxForm.url = strAttrAction;
        }
        eleForm.querySelectorAll("input[name]:enabled, select[name]:enabled, textarea[name]:enabled").forEach((ele) => {
          if (/^(?:submit|image|file)$/.test(ele.type)) {
            return;
          }
          objAjaxForm.data[ele.name] = ele.value;
        });
      }
      let objAjax = Object.assign({}, this.dataset, objAjaxForm, objParams.ajax, options);
      if (!objAjax.url) {
        if (this.element.pagination) {
          this.element.pagination.loading = false;
        }
        return this;
      }
      if (/^\/\//.test(objAjax.url)) {
        objAjax.url = location.protocol + objAjax.url;
      }
      let data = options.data || {};
      let dataForm = objAjaxForm.data;
      let dataOptions = objParams.ajax.data || {};
      if (typeof dataOptions == "function") {
        dataOptions = dataOptions() || {};
      }
      if (typeof dataForm == "function") {
        dataForm = dataForm() || {};
      }
      if (typeof data == "function") {
        data = data() || {};
      }
      let dataPage = {};
      let objKeyMap = objParams.page.keyMap;
      if (objKeyMap) {
        dataPage[objKeyMap["current"]] = objParams.page.current;
        dataPage[objKeyMap["per"]] = objParams.page.per;
      }
      let objDataSend = Object.assign({}, dataPage, dataForm, dataOptions, data);
      if (objKeyMap) {
        objParams.page.current = objDataSend[objKeyMap["current"]];
        objParams.page.per = objDataSend[objKeyMap["per"]];
      }
      let objAjaxParams = new URLSearchParams(objDataSend);
      let strUrlAjax = objAjax.url;
      let strUrlSearch = "?";
      if (strUrlAjax.split("?").length > 1) {
        strUrlSearch = strUrlSearch + strUrlAjax.split("?")[1] + "&";
      }
      strUrlAjax = strUrlAjax.split("?")[0] + strUrlSearch + objAjaxParams.toString();
      let funError = (content) => {
        let eleError = objElement.error || eleContainer.querySelector("." + CL.error);
        if (!eleError) {
          eleError = document.createElement("div");
          eleError.className = CL.error;
          this.insertAdjacentElement("afterend", eleError);
          objElement.error = eleError;
        }
        eleError.style.display = "flex";
        eleError.innerHTML = content || "数据没有获取成功";
        if (typeof objAjax.error == "function") {
          objAjax.error();
        }
      };
      let funComplete = () => {
        this.removeAttribute("aria-busy");
        if (objElement.loading) {
          objElement.loading.style.display = "none";
        }
        if (objElement.pagination) {
          objElement.pagination.loading = false;
        }
        if (typeof objAjax.complete == "function") {
          objAjax.complete();
        }
        this.show();
      };
      let funAjax = () => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", strUrlAjax);
        xhr.onload = () => {
          let json = {};
          try {
            json = JSON.parse(xhr.responseText) || {};
          } catch (event) {
            funError("解析异常，请稍后重试");
            return;
          }
          if (json.code !== 0 && json.error !== 0) {
            funError(json.msg || "返回数据格式不符合要求");
            return;
          }
          let strHtml = objParams.parse(json);
          eleTbody.innerHTML = strHtml || "";
          let eleEmpty = objElement.empty;
          if (!strHtml || !strHtml.trim()) {
            if (!eleEmpty) {
              eleEmpty = document.querySelector("." + CL.empty) || document.createElement("div");
              eleEmpty.className = CL.empty;
              this.insertAdjacentElement("afterend", eleEmpty);
              objElement.empty = eleEmpty;
            }
            eleEmpty.style.display = "flex";
          }
          let jsonKey = objKeyMap.key;
          let numTotal;
          if (jsonKey) {
            numTotal = json.data[jsonKey][objKeyMap["total"]];
          } else {
            numTotal = json.data[objKeyMap["total"]];
          }
          if (numTotal || numTotal == 0) {
            eleContainer.querySelectorAll('output[data-type="total"]').forEach(function(eleTotal) {
              eleTotal.innerHTML = numTotal;
            });
            objParams.page.total = numTotal;
          }
          this.page();
          if (typeof objAjax.success == "function") {
            objAjax.success(json);
          }
        };
        xhr.onerror = () => {
          funError("网络异常，数据没有获取成功，您可以稍后重试！");
        };
        xhr.onloadend = () => {
          funComplete();
        };
        xhr.send();
        this.setAttribute("aria-busy", "true");
      };
      let numScrollTop = window.pageYOffset;
      let eleLoading = objElement.loading;
      if (!eleLoading) {
        eleLoading = document.createElement("ui-loading");
        eleLoading.setAttribute("rows", 15);
        this.insertAdjacentElement("afterend", eleLoading);
        objElement.loading = eleLoading;
      }
      eleLoading.style.paddingBottom = "";
      if (window.getComputedStyle(eleLoading).display == "none") {
        let eleThead = this.querySelector("thead");
        eleLoading.style.height = this.clientHeight - (eleThead ? eleThead.clientHeight : 0) + "px";
        if (eleTbody.innerHTML.trim() == "") {
          eleLoading.style.height = "";
        }
      }
      let numDistance = parseFloat(eleLoading.style.height) - window.innerHeight;
      if (numDistance > 0) {
        eleLoading.style.paddingBottom = numDistance + "px";
      }
      eleLoading.style.display = "block";
      if (objElement.empty) {
        objElement.empty.style.display = "none";
      }
      if (objElement.error) {
        objElement.error.style.display = "none";
      }
      eleTbody.innerHTML = "";
      let objBound = this.getBoundingClientRect();
      if (!this.isFirstAjax && objBound.top < 0) {
        numScrollTop = objBound.top + numScrollTop;
        Table2.scrollTopTo(numScrollTop, funAjax);
      } else if (!this.isFirstAjax && objBound.top > window.innerHeight) {
        numScrollTop = numScrollTop - objBound.top;
        Table2.scrollTopTo(numScrollTop, funAjax);
      } else {
        funAjax();
        this.isFirstAjax = false;
      }
      return this;
    }
    /**
     * 分页的处理
     * @param  {[type]} total [description]
     * @return {[type]}       [description]
     */
    page(total) {
      let objPage = this.params.page;
      let elePagination = this.element.pagination;
      if (!elePagination) {
        return;
      }
      let objParamPage = {
        total: total || objPage.total,
        current: objPage.current,
        per: objPage.per,
        mode: objPage.mode || "long"
      };
      for (let key in objParamPage) {
        elePagination[key] = objParamPage[key];
      }
    }
    /**
     * 列表请求完毕显示的方法
     * @return {[type]} [description]
     */
    show() {
      if (this.element.loading) {
        this.element.loading.style.paddingBottom = "";
      }
      let eleThCheckbox = this.querySelector("th:first-child " + CL.checkbox);
      if (eleThCheckbox) {
        eleThCheckbox[CHECKED] = false;
      }
      this.dispatchEvent(new CustomEvent("show", {
        detail: {
          type: "ui-table"
        }
      }));
      return this;
    }
    // 元素进入页面时候的生命周期函数执行
    connectedCallback() {
      let eleTbody = this.querySelector("tbody");
      if (!eleTbody) {
        eleTbody = document.createElement("tbody");
        this.append(eleTbody);
      }
      let eleTemplate = this.querySelector("template");
      if (eleTemplate) {
        this.params.template = eleTemplate.innerHTML;
      }
      let eleContainer = this.closest("." + CL.container);
      let elePagination = null;
      if (eleContainer) {
        elePagination = eleContainer.querySelector("ui-pagination");
        if (elePagination) {
          this.element.pagination = elePagination;
          this.setParams({
            page: {
              current: elePagination.current,
              total: elePagination.total,
              per: elePagination.per
            }
          });
        } else {
          elePagination = document.createElement("ui-pagination");
          this.element.pagination = elePagination;
          let elePage = eleContainer.querySelector("." + CL.page);
          if (elePage) {
            elePage.appendChild(elePagination);
          }
        }
        let eleLoading = eleContainer.querySelector("ui-loading");
        if (eleLoading) {
          this.element.loading = eleLoading;
        }
        let eleDrop = eleContainer.querySelector('ui-drop[data-type="per"]');
        if (eleDrop) {
          this.element.drop = eleDrop;
        }
      }
      setTimeout(() => {
        this.events();
        if (eleTbody.textContent.trim() == "") {
          this.isFirstAjax = true;
          this.ajax();
        } else {
          this.page();
        }
      }, 1);
      this.dispatchEvent(new CustomEvent("connected", {
        detail: {
          type: "ui-table"
        }
      }));
      this.isConnectedCallback = true;
      this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
    }
  }
  if (!"".interpolate) {
    String.prototype.interpolate = function(params) {
      const names = Object.keys(params);
      const vals = Object.values(params);
      return new Function(...names, `return \`${function(str) {
        return str.replace(/&(lt|gt|amp|quot);/ig, function(all, t) {
          return {
            "lt": "<",
            "gt": ">",
            "amp": "&",
            "quot": '"'
          }[t];
        });
      }(this)}\`;`)(...vals);
    };
  }
  return Table2;
}();
Object.defineProperty(HTMLTableElement.prototype, "form", {
  get() {
    let attrForm = this.getAttribute("form");
    if (!attrForm) {
      return null;
    }
    return document.getElementById(attrForm);
  }
});
if (!customElements.get("ui-table")) {
  customElements.define("ui-table", Table, {
    extends: "table"
  });
}
var Form = class extends HTMLFormElement {
  constructor() {
    super();
    this.element = this.element || {};
    this.params = this.params || {
      // 验证成功之后，请求发送前的条件约束
      // avoidSend: function () {}
    };
    this.callback = this.callback || {};
    Object.defineProperty(this.params, "validate", {
      set(value) {
        if (this.validate) {
          this.validate.setCustomValidity(value);
        }
      }
    });
    return this;
  }
  /**
   * 表单提交的处理
   * @return {[type]} [description]
   */
  ajax() {
    let optionCallback = this.callback;
    optionCallback = optionCallback || function() {
    };
    if (typeof optionCallback == "function") {
      optionCallback = {
        success: optionCallback
      };
    }
    let eleSubmit = [...this.elements].filter(function(control) {
      return control.type && /^(?:submit|image)$/i.test(control.type);
    })[0] || this.querySelector("button:nth-last-of-type(1)");
    if (!eleSubmit) {
      eleSubmit = (() => {
        let ele = document.createElement("button");
        ele.type = "submit";
        ele.setAttribute("hidden", "");
        this.appendChild(ele);
        return ele;
      })();
    }
    this.element.submit = eleSubmit;
    let eleButton = null;
    eleButton = eleSubmit.id && document.querySelector("label[for=" + eleSubmit.id + "]");
    if (!eleButton) {
      eleButton = eleSubmit;
    }
    this.element.button = eleButton;
    let strUrl = this.action.split("#")[0] || location.href.split("#")[0];
    let strMethod = this.method || "POST";
    let strEnctype = this.getAttribute("enctype") || this.enctype;
    eleButton.loading = true;
    eleSubmit.setAttribute("disabled", "disabled");
    let objFormData = new FormData(this);
    if (this.params.data) {
      Object.keys(this.params.data).forEach((key) => {
        objFormData.append(key, this.params.data[key]);
      });
    }
    let strSearchParams = new URLSearchParams(objFormData).toString();
    if (strMethod.toLowerCase() == "get") {
      if (strUrl.split("?").length > 1) {
        strUrl = strUrl + "&" + strSearchParams;
      } else {
        strUrl = strUrl + "?" + strSearchParams;
      }
    }
    let xhr = new XMLHttpRequest();
    xhr.open(strMethod, strUrl);
    if (optionCallback.beforeSend) {
      optionCallback.beforeSend.call(this, xhr, objFormData);
    }
    xhr.onload = () => {
      let json = {};
      try {
        json = JSON.parse(xhr.responseText);
      } catch (event) {
        new LightTip("返回数据解析出错。", "error");
        if (optionCallback.error) {
          optionCallback.error.call(this, event);
        }
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            data: {
              code: -1,
              msg: "解析出错"
            }
          }
        }));
        return;
      }
      if (json && (json.code === 0 || json.error === 0)) {
        if (optionCallback.success) {
          optionCallback.success.call(this, json);
        } else {
          new LightTip(json.msg || "操作成功。", "success");
          this.reset();
        }
        this.dispatchEvent(new CustomEvent("success", {
          detail: {
            data: json
          }
        }));
      } else {
        new LightTip(json && json.msg || "返回数据格式不符合要求。", "error");
        if (optionCallback.error) {
          optionCallback.error.call(this, json);
        }
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            data: json
          }
        }));
      }
    };
    xhr.onerror = () => {
      new LightTip("网络异常，刚才的操作没有成功，您可以稍后重试。", "error");
      if (optionCallback.error) {
        optionCallback.error.apply(this, arguments);
      }
      this.dispatchEvent(new CustomEvent("error", {
        detail: {
          code: -1,
          msg: "网络异常"
        }
      }));
    };
    xhr.onloadend = () => {
      eleButton.loading = false;
      eleSubmit.removeAttribute("disabled");
      if (optionCallback.complete) {
        optionCallback.complete.apply(this, arguments);
      }
      this.dispatchEvent(new CustomEvent("complete"));
    };
    if (strEnctype && strEnctype.toLowerCase() === "application/x-www-form-urlencoded") {
      xhr.send(strSearchParams);
    } else if (strEnctype == "application/json") {
      xhr.setRequestHeader("Content-Type", strEnctype);
      const objSend = {};
      objFormData.forEach(function(value, key) {
        objSend[key] = value;
      });
      xhr.send(JSON.stringify(objSend));
    } else {
      xhr.send(objFormData);
    }
  }
  connectedCallback() {
    this.validate = new Validate(this, () => {
      let funAvoidSend = this.params.avoidSend || this.callback.avoidSend;
      if (!funAvoidSend || !funAvoidSend(this)) {
        this.ajax();
      }
    }, this.params.validate || {});
    this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-form"
      }
    }));
    this.isConnectedCallback = true;
    this.dispatchEvent(new CustomEvent("DOMContentLoaded"));
  }
};
if (!customElements.get("ui-form")) {
  customElements.define("ui-form", Form, {
    extends: "form"
  });
}
//# sourceMappingURL=lu2_theme_edge_js_common_all__js.js.map
