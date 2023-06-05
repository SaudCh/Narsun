import { PaperProvider } from 'react-native-paper';

import AppNavigation from './src/navigation';

export default function App() {

  const theme = {
    colors: {
      primary: '#FF5733',
      secondary: '#3333FF',
    },
  };

  return (
    <PaperProvider
      theme={theme}
    >
      <AppNavigation />
    </PaperProvider>
  );
}