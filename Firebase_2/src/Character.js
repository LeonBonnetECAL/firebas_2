import * as THREE from "three";

/**
 * Classe pour créer et gérer un personnage 3D
 */
export class Character {
  constructor(name, color, position) {
    this.name = name;
    this.color = color;
    this.position = position;
    this.group = new THREE.Group();
    this.animationMixer = null;

    this.createCharacter();
  }

  createCharacter() {
    // Corps (torse)
    const bodyGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: this.color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.2;
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);

    // Tête
    const headGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.2;
    head.castShadow = true;
    head.receiveShadow = true;
    this.group.add(head);

    // Yeux
    const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 2.3, 0.28);
    this.group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 2.3, 0.28);
    this.group.add(rightEye);

    // Bras gauche
    const leftArmGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const armMaterial = new THREE.MeshStandardMaterial({ color: this.color });
    const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial);
    leftArm.position.set(-0.6, 1.2, 0);
    leftArm.castShadow = true;
    this.group.add(leftArm);

    // Bras droit
    const rightArm = new THREE.Mesh(leftArmGeometry, armMaterial);
    rightArm.position.set(0.6, 1.2, 0);
    rightArm.castShadow = true;
    this.group.add(rightArm);

    // Jambe gauche
    const legGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x2c2c2c });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.25, 0.3, 0);
    leftLeg.castShadow = true;
    this.group.add(leftLeg);

    // Jambe droite
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.25, 0.3, 0);
    rightLeg.castShadow = true;
    this.group.add(rightLeg);

    // Positionner le groupe
    this.group.position.copy(this.position);
  }

  getMesh() {
    return this.group;
  }

  animate(deltaTime) {
    // Animation simple de rotation
    this.group.rotation.y += deltaTime * 0.3;
  }

  setActive(isActive) {
    // Effet visuel quand le personnage est actif
    if (isActive) {
      this.group.position.y = Math.sin(Date.now() * 0.003) * 0.1;
    } else {
      this.group.position.y = 0;
    }
  }
}
