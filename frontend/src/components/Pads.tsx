/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { PadState, PadStateLabels, Patch } from '../types';

type Props = {
  cols: number;
  labels: PadStateLabels;
  onUpdate: (rowIndex: number, colIndex: number) => void;
  state: PadState;
  patch: Patch;
};

const Pads = ({ state, cols, onUpdate, labels, patch }: Props) => {
  const theCols = fillArr(cols);
  const rows = Object.keys(state).map(r => +r);
  const getLabel = (i: number) => labels[i];

  const [labelValues, setLabelValues] = useState([]);

  useEffect(() => {
    const theLabelValues = Object.keys(patch)
      .map((key, i) => {
        const x = state[i + 1];
        return patch[key][x][1];
      });
    setLabelValues(theLabelValues);
  }, [state]);

  return <>
    {rows.map(rowIdx =>
      <div key={rowIdx} className="row">
        <div className="cent">
          <div style={{ fontSize: '14px' }}>
            {getLabel(rowIdx)}<br />
          </div>
          <div>
            {!!labelValues && labelValues[rowIdx - 1] && labelValues[rowIdx - 1].toLowerCase()}

          </div>
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