/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { PadState, PadStateLabels, Patch } from '../types';

type Props = {
  cols: number;
  labels: PadStateLabels;
  onUpdate: (rowIndex: number, colIndex: number) => void;
  state: PadState;
  patch: Patch;
  hideLabels: boolean;
  isLocked: boolean;
};

const Pads = ({ state, cols, onUpdate, labels, patch, hideLabels, isLocked }: Props) => {
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

  const clzName = isLocked ? 'tile-static' : 'tile';

  return <>
    <div className="boxx">
      {rows.map(rowIdx =>
        <div key={rowIdx} className="row">
          {!hideLabels && <div className="cent">
            <div style={{ fontSize: '14px' }}>
              {getLabel(rowIdx)}<br />
            </div>
            <div>
              {!!labelValues && labelValues[rowIdx - 1] && labelValues[rowIdx - 1].toLowerCase()}
            </div>
          </div>}
          {theCols.map(colIdx =>
            <div
              key={colIdx}
              className={clzName + ' ' + (colIdx === state[rowIdx] ? 'selected' : '')}
              onClick={() => {
                if (isLocked) return;
                onUpdate(rowIdx, colIdx);
              }}
            ></div>
          )}
        </div>
      )}
    </div>
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