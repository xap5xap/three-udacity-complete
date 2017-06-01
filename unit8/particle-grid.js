"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Particle System
////////////////////////////////////////////////////////////////////////////////
/*global THREE, document, window, $*/

var path = "";	// STUDENT: set to "" to run on your computer, "/" for submitting code to Udacity

var camera, scene, renderer;
var cameraControls;

var clock = new THREE.Clock();

function fillScene() {
	scene = new THREE.Scene();

	var geometry = new THREE.Geometry();

	// Student: rewrite the following vertex generation code so that
	// vertices are generated every 100 units:
	// -1000,-1000,-1000 to 1000,1000,1000, e.g.
	// at -1000,-1000,-1000, -900,-1000,-1000,
	// and so on, for the 21*21*21 = 9261 points.

	for (var x = -1000; x <= 1000; x += 100) {
		for (var y = -1000; y <= 1000; y += 100) {
			for (var z = -1000; z <= 1000; z += 100) {

				var vertex = new THREE.Vector3(x, y, z);
				geometry.vertices.push(vertex);
			}
		}
	}

	var disk = THREE.ImageUtils.loadTexture(path + 'media/img/cs291/disc.png');
	var material = new THREE.ParticleBasicMaterial(
		{ size: 35, sizeAttenuation: false, map: disk, transparent: true });
	material.color.setHSL(0.9, 0.2, 0.6);

	var particles = new THREE.ParticleSystem(geometry, material);
	particles.sortParticles = true;
	scene.add(particles);
}

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer = new THREE.WebGLRenderer({ clearAlpha: 1 });
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColorHex(0xAAAAAA, 1.0);

	// CAMERA
	camera = new THREE.PerspectiveCamera(55, canvasRatio, 2, 8000);
	camera.position.set(10, 5, 15);
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0, 0, 0);

}

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length > 0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild(renderer.domElement);
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	renderer.render(scene, camera);
}

try {
	init();
	fillScene();
	addToDOM();
	animate();
} catch (e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport + e);
}