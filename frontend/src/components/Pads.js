import React from 'react';

const Pads = ({ melody, tempoNum, transNum, oct, numberOfMel, onChangeMelody, onChangeTransformation, onChangeOct, onChangeNumberOfMel, onChangeTempo }) => {
  return <>
    <div className="row">
      <div className="cent">
        melody
      </div>
      <div className={'tile ' + (melody === 1 ? 'selected' : '')} selected onClick={() => onChangeMelody(1)}></div>
      <div className={'tile ' + (melody === 2 ? 'selected' : '')} onClick={() => onChangeMelody(2)}></div>
      <div className={'tile ' + (melody === 3 ? 'selected' : '')} onClick={() => onChangeMelody(3)}></div>
      <div className={'tile ' + (melody === 4 ? 'selected' : '')} onClick={() => onChangeMelody(4)}></div>
    </div>

    <div className="row">
      <div className="cent">
        transformation
      </div>
      <div className={'tile ' + (transNum === 1 ? 'selected' : '')} onClick={() => onChangeTransformation(1)}></div>
      <div className={'tile ' + (transNum === 2 ? 'selected' : '')} onClick={() => onChangeTransformation(2)}></div>
      <div className={'tile ' + (transNum === 3 ? 'selected' : '')} onClick={() => onChangeTransformation(3)}></div>
      <div className={'tile ' + (transNum === 4 ? 'selected' : '')} onClick={() => onChangeTransformation(4)}></div>
    </div>

    <div className="row">
      <div className="cent">
        octave
      </div>
      <div className={'tile ' + (oct === 1 ? 'selected' : '')} onClick={() => onChangeOct(1)}></div>
      <div className={'tile ' + (oct === 2 ? 'selected' : '')} onClick={() => onChangeOct(2)}></div>
      <div className={'tile ' + (oct === 3 ? 'selected' : '')} onClick={() => onChangeOct(3)}></div>
      <div className={'tile ' + (oct === 4 ? 'selected' : '')} onClick={() => onChangeOct(4)}></div>
    </div>

    <div className="row">
      <div className="cent">
        density
      </div>
      <div className={'tile ' + (numberOfMel === 1 ? 'selected' : '')} onClick={() => onChangeNumberOfMel(1)}></div>
      <div className={'tile ' + (numberOfMel === 2 ? 'selected' : '')} onClick={() => onChangeNumberOfMel(2)}></div>
      <div className={'tile ' + (numberOfMel === 3 ? 'selected' : '')} onClick={() => onChangeNumberOfMel(3)}></div>
      <div className={'tile ' + (numberOfMel === 4 ? 'selected' : '')} onClick={() => onChangeNumberOfMel(4)}></div>
    </div>

    <div className="row">
      <div className="cent">
        tempo
      </div>
      <div className={'tile ' + (tempoNum === 1 ? 'selected' : '')} onClick={() => onChangeTempo(1)}></div>
      <div className={'tile ' + (tempoNum === 2 ? 'selected' : '')} onClick={() => onChangeTempo(2)}></div>
      <div className={'tile ' + (tempoNum === 3 ? 'selected' : '')} onClick={() => onChangeTempo(3)}></div>
      <div className={'tile ' + (tempoNum === 4 ? 'selected' : '')} onClick={() => onChangeTempo(4)}></div>
    </div>
  </>
}

export default Pads;