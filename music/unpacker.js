outlets = 2;
inlets = 1;

function anything()
{		
	var argsString = arrayfromargs(messagename, arguments);
	
	var args = JSON.parse(argsString);
	var input = args[0];
	var melody = args[1];
			
	var u = unpack(melody);
	var p = u[0];
	var r = prepareRhythm(u[1]);
	
	var pitches = p.map(function (currentPitch) { 
		return currentPitch;
		/*
		if (currentPitch === null) { 
			return 0; 
		} else { 
			return currentPitch; 
		}
		*/
	}
		
	outlet(0, p);
	outlet(1, r);
}

function prepareRhythm(rhythm){
	var arr = [];
	for(var i=0; i<=rhythm.length-1;i++) {
		var step = rhythm[i];
		
		if(step == 1)
		{
			arr.push(step);
		} else {
			arr.push(step);
			for(var j=0; j<=step-2; j++) {
				arr.push(0);
			}
		}
	}
	return arr;
}

function unpack(m) {
  var p = [];
  var r = [];
  
  for (var i = 0; i <= m.length - 1; i++) {
    p.push(m[i][0]);
    r.push(m[i][1]);
  }


  return [p, r];
}
