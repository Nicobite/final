/* http://stackoverflow.com/questions/10806529/threejs-webgl-most-performant-way-for-just-cubes
		TODO ^ nécessaire pour la suite par souci de performance */

		
	//TODO Si les linewidth pouvaient scale avec le zoom, la vie serait plus belle.		
		

var TR_WIDTH = 8;
var TR_HEIGHT = 50;
var ARROW_FACTOR = 20;
var ARROW_ANGLE = 0.52; /* pi/6 */

var TR_MATERIAL = new THREE.MeshBasicMaterial({color: 0x000000,linewidth: 2})

		
/**
	Returns a line in the shape of a circle
*/
function draw_circle(radius,resolution,x,y,z){
	/* Creating vertices */
	var geometry = new THREE.CircleGeometry( radius, resolution );
	/* Removing central vertice */
	geometry.vertices.shift();
	/* Creating standard material for a place */
	//TODO: Make linewidth scale with zoom
	var material = new THREE.LineBasicMaterial({
        color: 0x000000,
		linewidth: 3
    });
	var line = new THREE.Line(geometry, material);
	line.position.x = x;
	line.position.y = y;
	line.position.z = z;
	return line;
}

/**
	Returns a line in the shape of a transition
*/
function draw_transition(x,y,z,direction){
	/* Creating vertices */
	var geometry = new THREE.Geometry();
	if(direction=='v'){
		var v1 = new THREE.Vector3(x+TR_WIDTH,y+TR_HEIGHT,z);
		var v2 = new THREE.Vector3(x-TR_WIDTH,y+TR_HEIGHT,z);
		var v3 = new THREE.Vector3(x-TR_WIDTH,y-TR_HEIGHT,z);
		var v4 = new THREE.Vector3(x+TR_WIDTH,y-TR_HEIGHT,z);
		var v5 = v1;//*/
	} else {
		var v1 = new THREE.Vector3(x+TR_HEIGHT,y+TR_WIDTH,z);
		var v2 = new THREE.Vector3(x-TR_HEIGHT,y+TR_WIDTH,z);
		var v3 = new THREE.Vector3(x-TR_HEIGHT,y-TR_WIDTH,z);
		var v4 = new THREE.Vector3(x+TR_HEIGHT,y-TR_WIDTH,z);
	}
	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
	geometry.vertices.push(v3);
	geometry.vertices.push(v4);
	geometry.faces.push(new THREE.Face3(0,1,2));
	geometry.faces.push(new THREE.Face3(0,2,3));
	//geometry.computeFaceNormals();
	var material = new THREE.MeshBasicMaterial({
		color: 0x000000,
		linewidth: 2
    });//*/
	var line = new THREE.Mesh(geometry, material);
	return line;
}


/**
	Returns a line in the shape of a transition but not as convincing
*/
function draw_transition_thin(x,y,z,direction){
	/* Creating vertices */
	var geometry = new THREE.Geometry();
	if(direction=='v'){
		var v1 = new THREE.Vector3(x,y+50,z);
		var v2 = new THREE.Vector3(x,y-50,z);
	} else {
		var v1 = new THREE.Vector3(x+50,y,z);
		var v2 = new THREE.Vector3(x-50,y,z);
	}
	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
	geometry.faces.push(new THREE.Face3(0,1));
	//geometry.computeFaceNormals();
	var material = new THREE.LineBasicMaterial({
        color: 0x000000,
		linewidth: 12
    });//*/
	var line = new THREE.Line(geometry, material);
	return line;
}


/**
	Returns an arrow as well without using arrowHelper.
*/
function draw_arrow(x1,y1,x2,y2,z){
	var ARROW_SIZE = 20;
	var ARROW_SIZE_TOO = 6;
	var geometry = new THREE.Geometry();
	var v1 = new THREE.Vector3(x1,y1,z);
	var v2 = new THREE.Vector3(x2,y2,z);
	var D = v1.distanceTo(v2);
	var v3 = new THREE.Vector3((x2*(D-ARROW_SIZE)+x1*ARROW_SIZE)/D
							  ,(y2*(D-ARROW_SIZE)+y1*ARROW_SIZE)/D
							  ,z);
	var normal10 = new THREE.Vector3((y2-y1),(x1-x2),0).normalize().multiplyScalar(ARROW_SIZE_TOO);
	var v4 = new THREE.Vector3();
	var v5 = new THREE.Vector3();
	v4.addVectors(v3,normal10);
	v5.subVectors(v3,normal10);
	/*
	.applyAxisAngle(axis, angle) this
	axis -- A normalized Vector3
	angle -- An angle in radians
	Applies a rotation specified by an axis and an angle to this vector. 
	*/
	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
	geometry.vertices.push(v4);
	geometry.vertices.push(v2);
	geometry.vertices.push(v5);
	//geometry.faces.push(new THREE.Face3(1,2,4)); // not eneded for now
	var material = new THREE.LineBasicMaterial({
        color: 0x000000,
		linewidth: 2
    });//*/
	var line = new THREE.Line(geometry, material);
	return line;
}