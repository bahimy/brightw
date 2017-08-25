(function() {
    document.querySelector('.js-root').style.backgroundImage = 'repeating-linear-gradient(to right, transparent, transparent 9px, rgb(210,210,210) 10px), repeating-linear-gradient(to bottom, transparent, transparent 9px, rgb(210,210,210) 10px)';
})();

(function() {
    var addEvent = function(object, type, callback) {
        if (object == null || typeof(object) == 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on"+type] = callback;
        }
    }

    var getBackgroundOffset = function(element) {
        var elementCoordinates = element.getBoundingClientRect();
        var backgroundOffset = {};

        backgroundOffset.x = Math.ceil(elementCoordinates.left)
            + window.pageXOffset;
        backgroundOffset.y = Math.ceil(elementCoordinates.top)
            + window.pageYOffset;

        return backgroundOffset;
    }

    var generatePositioningValue = function() {
        var result = '';

        for (var arg in arguments) {
            if (typeof arguments[arg] !== 'object')
                result += arguments[arg];
            else {
                for (var val in arguments[arg]) {
                    result +=
                        val === 'x' ?
                        -arguments[arg][val] + 'px ' :
                        -arguments[arg][val] + 'px';
                }
            }

            if (arg < arguments.length - 1) result += ", ";
        }

        return result;
    }

    var elem = document.querySelector('.js-logo');
    elem.style.backgroundPosition =
        generatePositioningValue("center", getBackgroundOffset(elem));

    // addEvent(window, 'resize', updateBackgroundPosition);
})();
