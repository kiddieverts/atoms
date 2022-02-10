import React from 'react';

const Pads = ({ melody, transNum, oct, numberOfMel, onChangeMelody, onChangeTransformation, onChangeOct, onChangeNumberOfMel }) => {
  return <>
    <div>
      <button className={melody === 1 ? 'selected' : ''} selected onClick={() => onChangeMelody(1)}></button>
      <button className={melody === 2 ? 'selected' : ''} onClick={() => onChangeMelody(2)}></button>
      <button className={melody === 3 ? 'selected' : ''} onClick={() => onChangeMelody(3)}></button>
      <button className={melody === 4 ? 'selected' : ''} onClick={() => onChangeMelody(4)}></button>
    </div>

    <div>
      <button className={transNum === 1 ? 'selected' : ''} onClick={() => onChangeTransformation(1)}></button>
      <button className={transNum === 2 ? 'selected' : ''} onClick={() => onChangeTransformation(2)}></button>
      <button className={transNum === 3 ? 'selected' : ''} onClick={() => onChangeTransformation(3)}></button>
      <button className={transNum === 4 ? 'selected' : ''} onClick={() => onChangeTransformation(4)}></button>
    </div>

    <div>
      <button className={oct === 1 ? 'selected' : ''} onClick={() => onChangeOct(1)}></button>
      <button className={oct === 2 ? 'selected' : ''} onClick={() => onChangeOct(2)}></button>
      <button className={oct === 3 ? 'selected' : ''} onClick={() => onChangeOct(3)}></button>
      <button className={oct === 4 ? 'selected' : ''} onClick={() => onChangeOct(4)}></button>
    </div>

    <div>
      <button className={numberOfMel === 1 ? 'selected' : ''} onClick={() => onChangeNumberOfMel(1)}></button>
      <button className={numberOfMel === 2 ? 'selected' : ''} onClick={() => onChangeNumberOfMel(2)}></button>
      <button className={numberOfMel === 3 ? 'selected' : ''} onClick={() => onChangeNumberOfMel(3)}></button>
      <button className={numberOfMel === 4 ? 'selected' : ''} onClick={() => onChangeNumberOfMel(4)}></button>
    </div>
  </>
}

export default Pads;