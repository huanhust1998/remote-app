import { lazy, Suspense, useMemo, type FC } from 'react'
import './App.css'
import { getInstance, loadRemote } from "@module-federation/runtime";

function App() {
  const AppWrapper = useMemo(
    () =>
      lazy(() => {
        try {
          const instance = getInstance();
          console.log({ instance })
          console.log({ loadRemote: instance?.loadRemote(`shell/AppLayout`) })
          return loadRemote(`shell/AppLayout`) as Promise<{ default: FC<any> }>;
        } catch (error) {
          console.error("Error loading remote module:", error);
          return Promise.resolve({
            default: (() => <div>Error loading module</div>) as FC<any>
          });
        }
      }),
    []
  );


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppWrapper />
    </Suspense>
  )
}

export default App
