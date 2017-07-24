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

function func1(){
  var rota = document.querySelector('#camera').getAttribute('rotation');
  var posit = {x:0, y:0, z:0};

  posit.x = -1*Math.sqrt(65)*Math.cos(rota.x* (Math.PI/180))*Math.sin(rota.y* (Math.PI/180));
  posit.y = Math.sqrt(65)*Math.sin(rota.x* (Math.PI/180))+1.6;
  posit.z = -1*Math.sqrt(65)*Math.cos(rota.x* (Math.PI/180))*Math.cos(rota.y* (Math.PI/180));

  var sceneEl = document.querySelector('a-scene');
  var sphereEl = document.createElement('a-sphere');
  var animaEl = document.createElement('a-animation');
  animaEl.setAttribute('attribute', 'scale');
  animaEl.setAttribute('from','.3 .3 .3');
  animaEl.setAttribute('to','.5 .5 .5');
  animaEl.setAttribute('repeat','indefinite');
  animaEl.setAttribute('dur','1000');
  sphereEl.appendChild(animaEl);
  sphereEl.setAttribute('position', posit);
  sphereEl.setAttribute('color', 'white');
  sphereEl.setAttribute('scale', '.5 .5 .5');
  sphereEl.setAttribute('opacity', '0.8');
  sphereEl.setAttribute('getid','');
  sceneEl.appendChild(sphereEl);

}
