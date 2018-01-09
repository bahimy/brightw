(function() {
    // Get the container which hold showcase elements
    var container = document.querySelector('.js-samples');
    var containerRect = container.getBoundingClientRect();
    var child = document.querySelector('.js-sample');
    var childRect = child.getBoundingClientRect();
    var children = document.querySelectorAll('.js-sample');

    var containerCapacity = {
        x: 4,
        y: 1,
        get total() { return this.x * this.y }
    };

    var buttonFirst = document.querySelector('.js-first');
    var buttonPrev = document.querySelector('.js-prev');
    var buttonNext = document.querySelector('.js-next');
    var buttonLast = document.querySelector('.js-next');

    var windowIndex = 1;

    var hideLeftovers = function(arr, winId, winCapacity) {
        /*
         * arr -- array of elements
         * winId -- scope id currently in display
         * winCapacity -- the size of the scope
         */

        var scopeBorders = [(winId - 1) * winCapacity,
                            winId * winCapacity - 1];

        arr.forEach(function(element, index) {
            if (index < scopeBorders[0] || index > scopeBorders[1])
                element.style.display = 'none';
            else element.style.display = 'unset';
        });
    };

    var addPageLinks = function(targetList) {
        for (var i = 1;
                i <= Math.ceil(children.length / containerCapacity.total);
                i++) {

            var item = document.createElement('li');
            var itemLink = document.createElement('div');
            var itemValue = document.createTextNode(i);

            item.classList.add('pagination__item')
            itemLink.classList.add('link', 'js-pageNum', 'pagination__link');
            item.classList.add('item');

            itemLink.appendChild(itemValue);
            item.appendChild(itemLink);
            targetList.appendChild(item);
        }

        paginationNumbers = document.querySelectorAll('.js-pageNum');
    };

    var toggleWindow = function(index) {
        hideLeftovers(children, index, containerCapacity.total);
        paginationNumbers.forEach(function(current) {
            current.style.fontWeight = 'normal';
            current.style.color = '';
            current.style.backgroundColor = 'transparent';
        });
        paginationNumbers[index - 1].style.fontWeight = 'bold';
        paginationNumbers[index - 1].style.color = 'red';
        paginationNumbers[index - 1].style.backgroundColor = 'white';

        windowIndex = index;

        // This is from another module
        fixBackground();
    };

    // containerCapacity.x = Math.floor(containerRect.width / childRect.width);
    // containerCapacity.y = Math.floor(containerRect.height / childRect.height);

    addPageLinks(document.querySelector(".js-pageNums"));

    toggleWindow(1);

    paginationNumbers.forEach(function(current) {
        current.addEventListener('click', function() {
            toggleWindow(parseInt(this.textContent));
        });
    });

    document.querySelector('.js-first').addEventListener('click', function(e) {
        toggleWindow(1);
    });

    document.querySelector('.js-prev').addEventListener('click', function() {
        if (windowIndex > 1)
            toggleWindow(windowIndex - 1);
    });

    document.querySelector('.js-next').addEventListener('click', function() {
        if (windowIndex < paginationNumbers.length)
            toggleWindow(windowIndex + 1);
    });

    document.querySelector('.js-last').addEventListener('click', function() {
        toggleWindow(paginationNumbers.length);
    });
})();

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
