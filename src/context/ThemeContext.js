import { createContext, useReducer } from 'react';
import { projectAuth } from '../firebase/config';
import { useCollection } from '../hooks/useCollection';

export const ThemeContext = createContext();

export const ThemeReducer = (state, action) => {
	switch (action.type) {
		case 'THEME_CHANGE':
			return {
				...state,
				theme: action.payload,
			};
		default:
			return state;
	}
};
export const ThemeContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(ThemeReducer, {
		theme: 'dark',
	});

	const changeColor = (color) => {
		console.log(color);

		dispatch({ type: 'CHANGE_COLOR', payload: color });
	};
	return (
		<ThemeContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ThemeContext.Provider>
	);
};
