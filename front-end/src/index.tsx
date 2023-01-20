import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from './components/Layout';
import { MealContextProvider } from './components/MealContext';
import './index.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<MealContextProvider>
 			<Layout />
		</MealContextProvider>
	</React.StrictMode>
);

