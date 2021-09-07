function toggleMap(){
	var style=document.getElementById("map").style;
	if(style.display=="block") style.display="none";
	else style.display="block";
}
function closeMap(){
	document.getElementById("map").style.display="none";
}
function interactiveMap(current_page){
	const todo=["metaphysics_pin","farmer_pin","litch_pin","morality_pin","ethics_pin","support_pin"];
	const map=document.getElementById("map_svg").contentDocument;
	for(var i=0;i<todo.length;i++){
		map.getElementById(todo[i]).onmouseover="";
		map.getElementById(todo[i]).onmouseout="";
		map.getElementById(todo[i]).onclick=""
	}
	map.getElementById(current_page+"_pin").style.oppacity=1;
	map.getElementById(current_page+"_pin").onmouseover="";
	map.getElementById(current_page+"_pin").onmouseout="";
	map.getElementById(current_page+"_pin").onclick="";
	map.getElementById(current_page+"_star").style.oppacity=1;
}
