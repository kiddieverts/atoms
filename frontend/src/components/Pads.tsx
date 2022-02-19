import React from 'react';
import { PadState, PadStateLabels } from '../types';

type Props = {
  cols: number;
  labels: PadStateLabels;
  onUpdate: (rowIndex: number, colIndex: number) => void;
  state: PadState;
};

const Pads = ({ state, cols, onUpdate, labels }: Props) => {
  const theCols = fillArr(cols);
  const rows = Object.keys(state).map(r => +r);
  const getLabel = (i: number) => labels[i];

  return <>
    {rows.map(rowIdx =>
      <div key={rowIdx} className="row">
        <div className="cent">
          {getLabel(rowIdx)}
        </div>
        {theCols.map(colIdx =>
          <div
            key={colIdx}
            className={'tile ' + (colIdx === state[rowIdx] ? 'selected' : '')}
            onClick={() => onUpdate(rowIdx, colIdx)}
          ></div>
        )}
      </div>
    )}
  </>
}

const fillArr = (cols: number) => {
  const arr: number[] = [];

  for (let i = 1; i <= cols; i++) {
    arr.push(i);
  }
  return arr;
}

export default Pads;