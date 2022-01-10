import React, { useState } from 'react';

const Tile = ({ value, i, onClick }) => {
  const clz = value ? 'selected' : ''
  return <>
    <div
      style={{
        cursor: 'pointer',
        height: '64px',
        width: '64px',
        margin: '2px',
        // backgroundColor: value === true ? 'rgb(249, 224, 0)' : 'black',
      }}
      className={'tile ' + clz}
      onClick={() => onClick({ i, value: !value })}
    ></div>
  </>
}


const Unit = ({ element }) => {
  const [x1, setX1] = useState([false, false, false, false]);

  const handleClick = ({ i, value }) => {
    const arr = [false, false, false, false];
    arr[i] = value;
    setX1(arr);
  }

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
  }}>
    <div style={{ width: '80px' }} className="cent">
      {element}
    </div>
    {x1.map((unit, i) => <Tile key={i} value={unit} i={i} onClick={handleClick}></Tile>)}
  </div>
}

const App = () => {
  return <div className="main" style={{ height: '100vh' }}>
    <div>
      <div >
        <Unit element="rhythm" />
        <Unit element="harmony" />
        <Unit element="pitch" />
        <Unit element="dynamic" />
        <Unit element="density" />
        <Unit element="tempo" />
      </div>
      <div className="cent" style={{ padding: '48px' }}>
        <div style={{ width: '80px' }} className="cent"></div>
        <button style={{ cursor: 'pointer' }}>Mint</button>
      </div>
    </div>

  </div>
}

export default App;
