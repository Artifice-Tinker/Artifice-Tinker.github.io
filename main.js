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

function audioSetup(){
	document.getElementById("source").src=audioSource;
	const audio=document.getElementById("audio");
	audio.onloadeddata=()=>{document.getElementById("audio-length").innerHTML=calcTime(audio.duration)};
	audio.load();
}

function interactiveMap(){
	const todo=["metaphysics_pin","farmer_pin","litch_pin","morality_pin","ethics_pin","support_pin"];
	const map=document.getElementById("map_svg").contentDocument;
	for(var i=0;i<todo.length;i++){
		map.getElementById(todo[i]).onmouseover="";
		map.getElementById(todo[i]).onmouseout="";
		map.getElementById(todo[i]).onclick="";
		map.getElementById(todo[i]).style.opacity=.4;
	}
	map.getElementById(pageName+"_pin").style.opacity=1;
	map.getElementById(pageName+"_pin").onmouseover="";
	map.getElementById(pageName+"_pin").onmouseout="";
	map.getElementById(pageName+"_pin").onclick="";
	map.getElementById(pageName+"_star").style.opacity=1;
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

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return 1;
    }
  }
}