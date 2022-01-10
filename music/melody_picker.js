outlets = 1;
inlets = 1;

function list()
{
	var input = arrayfromargs(arguments);
	var melodyNum = input[0];	
	var m = getMelody(melodyNum);
	var final = JSON.stringify([input, m]);
	outlet(0, final);
}

function getMelody(numb) {
    var melody1 = [
        [60, 4],
        [62, 4],
        [64, 4],
        [65, 4],
        [67, 4],
        [69, 4],
        [71, 4],
        [72, 4],
    ];

  var melody2 = [
    [null,  2],
    [60, 2],
    [65, 2],
    [64, 2],
    [null,  2],
    [null,  2],
    [60, 2],
    [65, 2],
    [57, 2],
    [60, 2],
    [64, 6],
    [63, 2],
    [64, 4],
  ];

  var melody3 = [
    [30, 1],
    [31, 1],
    [32, 2], 
    [33, 2], 
    [34, 4],
    [35, 2],
    [36, 2],
    [37, 2],
    [38, 2],
    [39, 2],
    [40, 2],
    [41, 2],
    [42, 8], 
  ];

  var melody4 = [
    [81, 2],
    [82, 2],
    [83, 4],
    [84, 1],
    [85, 1],
    [86, 2],
    [87, 2],
    [88, 2],
    [89, 2],
    [90, 2],
    [91, 8],
    [92, 2],
    [93, 2],
  ];

  var melodies = [melody1, melody2, melody3, melody4];
  return melodies[numb - 1];
}
