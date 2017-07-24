var sphereEl=null;
var nel = null;
AFRAME.registerComponent('getid',{
  schema:{
    default : true
  },

  init: function(){
    var el = this.el;
    el.addEventListener('mousedown',function(){
      sphereEl=el;
      this.setAttribute('color','black');
      console.log(el);
      nel=el;
    })
    el.addEventListener('click',function(){
        nel=null;
        this.setAttribute('color','white');
    })
  }
});

AFRAME.registerComponent('draggable-component', {
    schema: {
        default: true
    },
    init: function() {
        var el = this.el;
        var property = this;
        var sceneEl = document.querySelector('a-scene');
        var cameraEl = document.querySelector('a-camera');

        sphereEl = document.querySelector('#hotspot');

        var sphereObj = sphereEl.object3D;
        var mouseDownFlag = false;
        var mouse = { x: 0, y: 0 };
        var cameraObj = this.el.getObject3D('camera');
        var dist = sphereObj.position.distanceTo(cameraObj.position);

        el.addEventListener('mousedown', function() {
            mouseDownFlag = true;
        });

        sceneEl.addEventListener('mouseup', function() {
            mouseDownFlag = false;
        });

        sceneEl.addEventListener('mousemove', function(mouseData) {
            if (property.data) {
                if (mouseDownFlag) {
                  sphereEl=nel;
                  if(nel!=null){
                    sphereObj = sphereEl.object3D;
                    let rc = new THREE.Raycaster();
                    mouse.x = (mouseData.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(mouseData.clientY / window.innerHeight) * 2 + 1;
                    rc.setFromCamera(mouse, cameraObj);
                    let point = rc.ray.at(dist);
                    sphereEl.setAttribute('position', point);


                  }
                }
            }
        });

    },
    update: function() {

    }
});
