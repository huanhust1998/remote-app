import React, { lazy, Suspense, useMemo, type FC } from 'react'
// import { loadRemote } from "@module-federation/runtime";
import 'shell/styles';

const AppWrapper = React.lazy(() => import('shell/AppWrapper'));

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppWrapper />
    </Suspense>
  )
}

export default App
