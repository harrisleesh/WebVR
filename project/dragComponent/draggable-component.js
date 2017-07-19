AFRAME.registerComponent('draggable-component', {
    schema: {
        default: true
    },
    init: function() {
        var el = this.el;
        var property = this;
        var sceneEl = document.querySelector('a-scene');
        var mouseDownFlag = false;
        var mousePosition = null;
        var offsetX = null;
        var offsetY = null;
        var currentRotation = null;

        el.addEventListener('mousedown', function() {
            mouseDownFlag = true;
        });

        sceneEl.addEventListener('mouseup', function() {
            mouseDownFlag = false;
            mousePosition = null;
            offsetX = null;
            offsetY = null;
            currentRotation = null;
        });

        sceneEl.addEventListener('mousemove', function(mouseData) {
            if (property.data) {
                if (mouseDownFlag) {
                    if (mousePosition) {
                        offsetY = mouseData.clientY - mousePosition.clientY;
                        offsetX = mouseData.clientX - mousePosition.clientX;
                        currentRotation = el.getAttribute('rotation');
                        el.setAttribute('rotation', {
                            x: currentRotation.x - offsetY / 4.6,
                            y: currentRotation.y - offsetX / 4.6,
                            z: currentRotation.z
                        });
                    }
                    mousePosition = mouseData;
                }
            }
        });
    },
    update: function() {
        
    }
});
