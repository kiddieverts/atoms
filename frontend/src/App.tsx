import React, { useState } from 'react';
import AppRoutes from './AppRoutes';
import { AtomsContext } from './components/Atoms/AtomsContext';

const App = () => {
  const [atm, setAtm] = useState(undefined);

  return <>
    <AtomsContext.Provider value={[atm, setAtm]}>
      <AppRoutes />
    </AtomsContext.Provider>
  </>
}

export default App;
