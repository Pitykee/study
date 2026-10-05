import { useTheme } from '../context/ThemeContext.jsx';
import ThemeButton from './ThemeButton.jsx';

export default function Panel() {
  const { theme } = useTheme();
  const osztaly = theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark';

  return (
    <div className={`card card-body ${osztaly}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h5 m-0">Beállítások</h3>
        <ThemeButton />
      </div>
      <p className="mb-0">Ez a panel a context-ből kapja a témát. Ha a gomb működik, a színe vált.</p>
    </div>
  );
}
