outlets = 2;
autowatch = 1;

var SCALE = [0, 2, 4, 5, 7, 9, 11];

function anything() {
    var argsString = arrayfromargs(messagename, arguments);

    var args = JSON.parse(argsString);
    var input = args[0];
    var melody = args[1];
    var transNum = input[1];

    var t = transform(transNum, melody);

    var arr = [input, pack(t[0], t[1])];
    var final = JSON.stringify(arr);

    outlet(0, final);
    outlet(1, transNum);
}

function transform(transNum, m) {
    var u = unpack(m);
    var p = u[0];
    var r = u[1];

    switch (transNum) {
        case 1:
            return retrograde(p, r);
        case 2:
            return eightNotesTwoAndSixUpOctave(p, r);
        case 3:
            return upDiatonicThird(p, r);
        case 4:
            return retrogradeEveryOther(p, r);
        default:
            return [p, r];
    }
}

/* Retrograde */

function retrograde(pitches, rhythm) {
    var p = pack(pitches, rhythm);
    return unpack(p.reverse());
}

/* Eight notes two and six up are up an octave */

function eightNotesTwoAndSixUpOctave(pitches, rhythm) {
    var melody = pack(pitches, rhythm);

    var m = _make32Steps(melody);
    var arr = [];
	
    for (var i = 0; i <= m.length - 1; i++) {
        var stepsToBeTransposed = [3, 4, 13, 14, 19, 20, 27, 28];
        if (stepsToBeTransposed.indexOf(i) !== -1) {
            var newPitch = m[i][0] + 12;
            var duration = m[i][1];
            arr.push([newPitch, duration]);
        } else {
            arr.push(m[i]);
        }
    }

   return unpack(_makeCompact(arr));
}

/* Up a diatonic third */

function upDiatonicThird(pitches, rhythm) {	
     var arr = [];
     for (var i = 0; i <= pitches.length - 1; i++) {
         var pitch = _transposeDiatonicUp(pitches[i], SCALE, 2);
         var duration = rhythm[i];
         arr.push([pitch, duration]);
     }
     return unpack(arr);
}

function _transposeDiatonicUp(note, scale, offset) {
    if (note === null) return null;

    var p = note;
    var octave = 0;
    while (p >= 12) {
        octave++;
        p = p - 12;
    }

    var i = scale.indexOf(p);
    var combined = scale.concat(scale.map(function(num) { return num + 12; }));
    return combined[i + offset] + (octave * 12);
}

/* Retrograde flipped within the mesasure */

function retrogradeEveryOther(pitches, rhythm) {
	var packed = pack(pitches, rhythm);
	var retrograde = packed.reverse();
    var m = _make32Steps(retrograde);
    var arr = _collectIntoBeats(m);
    var shuffled = [arr[1], arr[0], arr[3], arr[2]];
	var comb = _combineIntoOneArray(shuffled);
    var x = _makeCompact(comb);
	return unpack(x);
}

function _combineIntoOneArray(comb) {
    var arr = [];
    for (var i = 0; i <= 3; i++) {
        for (var j = 0; j <= comb[i].length - 1; j++) {
            arr.push(comb[i][j]);
        }
    }
    return arr;
}

function _collectIntoBeats(m) {
    var arr = [];
    for (var i = 0; i <= 3; i++) {
        var step = 8 * i;
        var a = [];
        for (var j = step; j <= step + 7; j++) {
            a.push(m[j]);
        }
        arr.push(a);
    }
    return arr;
}

function _make32Steps(melody) {
    var arr = [];

    for (var i = 0; i <= melody.length - 1; i++) {
        var pitch = melody[i][0];
        var step = melody[i][1];

        if (step == 1) {
            arr.push([pitch, step]);
        } else {
            arr.push([pitch, step]);
            for (var j = 0; j <= step - 2; j++) {
                arr.push([pitch, 0]);
            }
        }
    }
    return arr;
}

function _makeCompact(melody) {
    var arr = [];
    for (var i = 0; i <= melody.length - 1; i++) {
        if (melody[i][1] === 0) {
            continue;
        }
        else {
            arr.push(melody[i]);
        }
    }
    return arr;
}

/* Utility functions */

function unpack(m) {
    var pitches = [];
    var rhythm = [];
    for (var i = 0; i <= m.length - 1; i++) {
        pitches.push(m[i][0]);
        rhythm.push(m[i][1]);
    }

    return [pitches, rhythm];
}

function pack(pitches, rhythm) {
    var final = [];
    for (var i = 0; i <= pitches.length - 1; i++) {
        final.push([pitches[i], rhythm[i]]);
    }
    return final;
}
