import * as THREE from "three";
import { Scene3D } from "./Scene3D.js";
import { Controls } from "./Controls.js";
import { Character } from "./Character.js";

/**
 * Classe principale pour gérer l'application 3D
 */
class App3D {
  constructor() {
    this.scene3D = null;
    this.controls = null;
    this.characters = [];
    this.activeCharacterIndex = 0;

    this.init();
  }

  init() {
    // Créer la scène 3D
    const container = document.getElementById("canvas-container");
    this.scene3D = new Scene3D(container);

    // Créer les contrôles
    this.controls = new Controls(
      this.scene3D.getCamera(),
      this.scene3D.renderer.domElement
    );

    // Créer le sol
    this.createGround();

    // Créer les personnages (Vincent et Jules)
    const vincent = new Character(
      "Vincent",
      0x2c2c2c,
      new THREE.Vector3(-1.5, 0, 0)
    );

    const jules = new Character(
      "Jules",
      0x1a1a1a,
      new THREE.Vector3(1.5, 0, 0)
    );

    this.characters.push(vincent, jules);

    // Ajouter les personnages à la scène
    this.characters.forEach((character) => {
      this.scene3D.getScene().add(character.getMesh());
    });

    // Démarrer la boucle d'animation
    this.animate();
  }

  createGround() {
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene3D.getScene().add(ground);
  }

  setActiveCharacter(index) {
    if (index >= 0 && index < this.characters.length) {
      this.activeCharacterIndex = index;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const deltaTime = this.scene3D.getDeltaTime();

    // Mettre à jour les contrôles
    this.controls.update();

    // Animer les personnages
    this.characters.forEach((character, index) => {
      character.setActive(index === this.activeCharacterIndex);
    });

    // Rendre la scène
    this.scene3D.render();
  }
}

// Initialiser l'application quand le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
  const app = new App3D();

  // Exposer l'application pour permettre l'interaction externe
  window.app3D = app;
});
