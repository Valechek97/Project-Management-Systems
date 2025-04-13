import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import BoardsPage from './pages/boards';
import BoardPage from './pages/id';
import IssuesPage from './pages/issues';

// Создаем тему Material-UI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/board/:id" element={<BoardPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            {/* Fallback для несуществующих маршрутов */}
            <Route path="*" element={<BoardsPage />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;