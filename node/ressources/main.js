//alert('[Main] '+initialDB['date']);
init();
trackball();
animate();

/* Mise en valeur d'un niveau par rapport à l'autre */
document.addEventListener ("CheckboxStateChange", checkbox_handler, false);
var checkbox_lvl1 = document.getElementById("lvl1_grey");
var checkbox_lvl2 = document.getElementById("lvl2_grey")

function checkbox_handler(){
	if(checkbox_lvl1.checked){
		lvl1.traverse(function(node){
			if (node.material) {
				node.material.opacity = 0.16;
				node.material.transparent = true;
			}
		});
	} else {
		lvl1.traverse(function(node){
			if (node.material) {
				node.material.opacity = 1;
			}
		});
	}
	if(checkbox_lvl2.checked){
		lvl2.traverse(function(node){
			if (node.material) {
				node.material.opacity = 0.16;
				node.material.transparent = true;
			}
		});
	} else {
		lvl2.traverse(function(node){
			if (node.material) {
				node.material.opacity = 1;
			}
		});
	}
}

//alert('MAIN END');