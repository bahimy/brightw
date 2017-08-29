function fixBackground() {
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

        backgroundOffset.x = ((elementCoordinates.left)
            + window.pageXOffset) % 10;
        backgroundOffset.y = ((elementCoordinates.top)
            + window.pageYOffset) % 10;

        return backgroundOffset;
    }

    var generatePositioningString = function() {
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

    var updateDocument = function() {
        var elem = document.querySelector('.js-logo');
        elem.style.backgroundPosition =
            generatePositioningString("center", getBackgroundOffset(elem));

        var searchButtons = document.querySelectorAll('.js-zoom');
        searchButtons.forEach(function(current) {
            current.style.backgroundPosition =
                generatePositioningString(getBackgroundOffset(current));
        });
    }

    updateDocument();

    addEvent(window, 'resize', updateDocument);
};

fixBackground();
