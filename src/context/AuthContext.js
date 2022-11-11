import { createContext, useEffect, useReducer } from 'react';
import { projectAuth } from '../firebase/config';
import { useCollection } from '../hooks/useCollection';

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };
		case 'LOGOUT':
			return { ...state, user: null };
		case 'AUTH_IS_READY':
			return { ...state, user: action.payload, authIsReady: true };
		case 'THEME_CHANGE':
			return {
				...state,
				user: action.payload,
				authIsReady: true,
				theme: action.payload,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, {
		user: null,
		authIsReady: false,
		theme: null,
	});

	const changeTheme = (color) => {
		console.log(color)
		dispatch({ type: 'THEME_CHANGE', payload: color });
	}

	useEffect(() => {
		const unsub = projectAuth.onAuthStateChanged((user) => {
			dispatch({ type: 'AUTH_IS_READY', payload: user });
			unsub();
		});
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch, changeTheme }}>
			{children}
		</AuthContext.Provider>
	);
};
