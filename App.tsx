import "./App.css";
import { SAMPLE_MENU, TropicaMenu, TropicaMenuProvider } from './src';

function App() {

  return <TropicaMenuProvider menu={SAMPLE_MENU}>
      
    <TropicaMenu />
    
  </TropicaMenuProvider>
}

export default App
