function toggleMap(){
	var style=document.getElementById("map").style;
	if(style.visibility=="visible") style.visibility="collapse";
	else style.visibility="visible";
}
function closeMap(){
	document.getElementById("map").style.visibility="visible";
}
const calcTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

function interactiveMap(current_page){
	const todo=["metaphysics_pin","farmer_pin","litch_pin","morality_pin","ethics_pin","support_pin"];
	const map=document.getElementById("map_svg").contentDocument;
	for(var i=0;i<todo.length;i++){
		map.getElementById(todo[i]).onmouseover="";
		map.getElementById(todo[i]).onmouseout="";
		map.getElementById(todo[i]).onclick="";
		map.getElementById(todo[i]).style.opacity=.4;
	}
	map.getElementById(current_page+"_pin").style.opacity=1;
	map.getElementById(current_page+"_pin").onmouseover="";
	map.getElementById(current_page+"_pin").onmouseout="";
	map.getElementById(current_page+"_pin").onclick="";
	map.getElementById(current_page+"_star").style.opacity=1;
}
