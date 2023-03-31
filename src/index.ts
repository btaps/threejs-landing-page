import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// @ts-ignore - Ignoring 'Cannot find module' - png file is there.
import normalMap from '../static/textures/NormalMap.png'
import * as dat from 'dat.gui'
import { Vector3 } from 'three'

// Loading
const textureLoader = new THREE.TextureLoader()
// TODO: We need to figure out how to use URI to point to the local file.
// const normalTexture = textureLoader.load('data:img/png;base64,./../static/textures/NormalMap.png')
const normalTexture = textureLoader.load(normalMap)

// // Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(0.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2

material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Light 1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// Light 2
// In order to be able to add to gui, we need to make this THREE.PointLight decleration type any since it complains of
// 				Argument of type 'Vector3' is not assignable to parameter of type 'Record<string, unknown>'.
//  				Index signature for type 'string' is missing in type 'Vector3'
// TODO: Look into fixing above typescript error.
const pointLight2 = new THREE.PointLight(0xff0000, 2) as any

// Set light position in one command set()
pointLight2.position.set(-2.2, 1.5, -0.3)
pointLight2.intensity = 10

scene.add(pointLight2)

// Add gui controls for lights
const light1 = gui.addFolder('Light 1')
light1.add(pointLight2.position, 'x', -3, 3, 0.1)
light1.add(pointLight2.position, 'y', -6, 6, 0.1)
light1.add(pointLight2.position, 'z', -3, 3, 0.1)
light1.add(pointLight2, 'intensity', 0, 10, 0.1)

// PointLightHelper is used to show where the camera is looking at our objects. Only used in dev mode.
// const pointLightHelper1 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper1)

// Light 3
// In order to be able to add to gui, we need to make this THREE.PointLight decleration type any since it complains of
// 				Argument of type 'Vector3' is not assignable to parameter of type 'Record<string, unknown>'.
//  				Index signature for type 'string' is missing in type 'Vector3'
// TODO: Look into fixing above typescript error.
const pointLight3 = new THREE.PointLight(0xFFA400, 2) as any

// Set light position in one command set()
pointLight3.position.set(1.6, -1.2, -0.5)
pointLight3.intensity = 5.6

scene.add(pointLight3)

// Add gui controls for lights
const light2 = gui.addFolder('Light 2')
light2.add(pointLight3.position, 'x', -3, 3, 0.1)
light2.add(pointLight3.position, 'y', -6, 6, 0.1)
light2.add(pointLight3.position, 'z', -3, 3, 0.1)
light2.add(pointLight3, 'intensity', -0, 10, 0.1)

const light2Color = {
	color: 0xff0000
}

light2.addColor(light2Color, 'color').onChange(() => {
	pointLight3.color.set(light2Color.color)
})

// PointLightHelper is used to show where the camera is looking at our objects. Only used in dev mode.
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)



/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
	const elapsedTime = clock.getElapsedTime()

	// Update objects
	sphere.rotation.y = 0.5 * elapsedTime

	// Update Orbital Controls
	// controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()
