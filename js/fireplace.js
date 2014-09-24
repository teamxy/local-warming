var Fireplace = function (container) {
  console.log('Winter is coming...');

  this.scene = new THREE.Scene();
  this.sceneCube = new THREE.Scene();
  this.clock = new THREE.Clock();

  this.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    15000
  );

  this.camera.position.y = 500;
  this.camera.position.z = 850;
  this.camera.lookAt(new THREE.Vector3(0,0,0));
  this.camera.updateMatrixWorld();

  this.controls = new THREE.OrbitControls(this.camera);
  this.controls.damping = 0.2;
  this.controls.maxDistance = 3500;
  this.controls.minDistance = 10;
  this.controls.rotateSpeed = 0.3;

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 500, 0);
  this.scene.add(hemiLight);

  this.renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });

  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.renderer.setClearColor(0x000000);

  this.animate();

  window.addEventListener('resize', this.onResize.bind(this), false);

  container.appendChild(this.renderer.domElement);
};

Fireplace.prototype.render = function (dt) {
  this.renderer.render(this.scene, this.camera);
};

Fireplace.prototype.animate = function () {
  requestAnimationFrame(this.animate.bind(this));
  var dt = this.clock.getDelta();

  // TODO: Do complicated stuff here

  this.render(dt);
};

Fireplace.prototype.onResize = function () {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};
