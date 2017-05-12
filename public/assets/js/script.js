/**
 * Created by csmat on 2017. 04. 27..
 */

//Create Scene

var scene = new THREE.Scene();

//Create Camera
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set(0,0,1);
camera.maxZoom = 0.1;
camera.minZoom = 501;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

//Image texture
THREE.ImageUtils.crossOrigin = '';
var texture = THREE.ImageUtils.loadTexture('/assets/images/stock1.jpeg');
var texture2 = THREE.ImageUtils.loadTexture('/assets/images/logo1.PNG');
texture.anisotropy = renderer.getMaxAnisotropy();
texture2.anisotropy = renderer.getMaxAnisotropy();

//Cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshFaceMaterial([

    new THREE.MeshBasicMaterial({
        map: texture2
    }),
    new THREE.MeshBasicMaterial({
        map: texture2
    }),
    new THREE.MeshBasicMaterial({
        map: texture2
    }),
    new THREE.MeshBasicMaterial({
        map: texture2
    }),
    new THREE.MeshBasicMaterial({
        map: texture2
    }),
    new THREE.MeshBasicMaterial({
        map: texture
    })
]);

var cube = new THREE.Mesh( geometry, material );
cube.rotateY(0.5);
cube.rotateX(0.5);
scene.add( cube );
cube.position.x = 4;

var cubeMelkweg = new THREE.Mesh(geometry, material);
scene.add(cubeMelkweg);

//Create random cubes
function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}

function createCubes(){

    var geometryRand = new THREE.BoxGeometry( 1, 1, 1 );
    var materialRand = new THREE.MeshFaceMaterial([

        new THREE.MeshBasicMaterial({
            map: texture2
        }),
        new THREE.MeshBasicMaterial({
            map: texture2
        }),
        new THREE.MeshBasicMaterial({
            map: texture2
        }),
        new THREE.MeshBasicMaterial({
            map: texture2
        }),
        new THREE.MeshBasicMaterial({
            map: texture2
        }),
        new THREE.MeshBasicMaterial({
            map: texture2
        })
    ]);
    //var cubes = [];
    for (var i = 0; i< 150; i++){
        cubeRandom = new THREE.Mesh( geometryRand, materialRand );
        cubeRandom.position.x = getRandomPosition(-100, 100);
        cubeRandom.position.y = getRandomPosition(-100, 100);
        cubeRandom.position.z = getRandomPosition(-100, 100);
        scene.add( cubeRandom );

    }
}

createCubes();


camera.position.z = 5;

/**************************************/
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

$(renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
    .on('mousemove', function(e) {
        //console.log(e);
        var deltaMove = {
            x: e.offsetX-previousMousePosition.x,
            y: e.offsetY-previousMousePosition.y
        };

        if(isDragging) {

            var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 1),
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));

            cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
        }

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });
/* */

$(document).on('mouseup', function(e) {
    isDragging = false;
});



//ZOOM functions
var timeout;
$('#zoom-in').mousedown(function(){

    timeout = setInterval(function(){
        camera.position.z -=0.5
    }, 1);

return false;
});

$('#zoom-out').mousedown(function(){
    timeout = setInterval(function(){
        camera.position.z +=0.5
    }, 1);
    console.log(camera.position.z);
    return false;
});

$(document).mouseup(function(){
    clearInterval(timeout);
    return false;
});





// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;
function update(dt, t) {

    setTimeout(function() {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;

        update(dt, totalGameTime);

        lastFrameTime = currTime;
    }, 0);
}

//Render
function render() {
    requestAnimationFrame( render );
   // renderer.render( bufferScene, camera, bufferTexture );
    renderer.render( scene, camera );
    cubeMelkweg.rotation.x += 0.01;
    cubeMelkweg.rotation.y += 0.01;
    //camera.position.z -=0.01;

}
render();


function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

/*
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

var material = new THREE.LineBasicMaterial({ color: 0x6e00ff });

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, -10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

var line = new THREE.Line(geometry, material);

scene.add(line);
//renderer.render(scene, camera);

function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    geometry.vertices

}
 render();
 */
