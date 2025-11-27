import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Classe pour gérer les contrôles de la caméra
 */
export class Controls {
  constructor(camera, domElement) {
    this.controls = new OrbitControls(camera, domElement);
    this.init();
  }

  init() {
    // Configuration des contrôles
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 15;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 1, 0);
  }

  update() {
    this.controls.update();
  }

  getControls() {
    return this.controls;
  }
}
