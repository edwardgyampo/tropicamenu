import { Menu } from './components/Menu';
import { NavigationProvider } from './lib/navigation/Provider';

function App() {

  return (
    <>
      <NavigationProvider>
        <Menu  />
      </NavigationProvider>
    </>
  )
}

export default App
