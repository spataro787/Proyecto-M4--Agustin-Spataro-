import { AuthProvider } from './features/auth/AuthContext';
import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
