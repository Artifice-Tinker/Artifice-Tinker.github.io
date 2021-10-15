function toggleMap(){
	var style=document.getElementById("map").style;
	if(style.visibility=="visible") style.visibility="collapse";
	else style.visibility="visible";
}
function closeMap(){
	document.getElementById("map").style.visibility="collapse";
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

function changeSvg(svgID, percent, presets){
	function subpercent(total, min, max){
		return (total-min)/(max-min);
	}
	//'presets' is type map, with ordered integer keys coorasponding to first percent to be used
	//'presets' values are type map(elementID,opacity) or 'null' for transition
	const keys=presets.keys();
	var last={val:0};
	var prev={val:0};
	var surounding={prev:-1,next:-1};
	presets.forEach(function(value,key){
		if(surounding.prev>-1)return;
		if(key>percent){
			surounding.prev=prev.val;
			surounding.next=key;
			return;
		}
		prev.val=last.val;
		last.val=key;
	});
	
	const preset=presets.get(last.val);
	if(preset!=null){
		preset.forEach(function(value,key){
			svgID.getElementById(key).style.opacity=value;
		})
	}
	else{
		const per=subpercent(percent,last.val,surounding.next);
		var mix= new Map();
		presets.get(surounding.prev).forEach(function(value,key){
			mix.set(key,value*(1-per)+presets.get(surounding.next).get(key)*per);
		});
		mix.forEach(function(value,key){
			svgID.getElementById(key).style.opacity=value;
		})
	}

}