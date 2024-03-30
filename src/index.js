import { createRoot } from 'react-dom/client';
import WeatherApp from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<WeatherApp />);

