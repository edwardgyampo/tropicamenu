import { Menu } from './components/Menu';
import { NavigationProvider } from './lib/navigation/Provider';

function App() {

  return (
    <>
      <NavigationProvider>
        <Menu debug />
      </NavigationProvider>
    </>
  )
}

export default App
