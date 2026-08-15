import { Menu } from './components/Menu';
import { Stack } from './components/Stack';
import { NavigationProvider } from './lib/navigation/Provider';

function App() {

  return (
    <>
      <Stack direction="row" style={{
        alignItems: "center",
        gap: "var(--space-4)"
      }}>
        <NavigationProvider>
          <Menu />
        </NavigationProvider>
      </Stack>
    </>
  )
}

export default App
