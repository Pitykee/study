import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="btn btn-outline-secondary" onClick={toggleTheme}>
      {theme === 'light' ? 'Sötét mód' : 'Világos mód'}
    </button>
  );
}
