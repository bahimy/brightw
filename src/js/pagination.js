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
