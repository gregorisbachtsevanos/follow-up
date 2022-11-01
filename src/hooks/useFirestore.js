import { useReducer, useState, useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

const initialState = {
	document: null,
	success: null,
	error: null,
	isPending: false,
};

const firestorResucer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return {
				success: false,
				error: null,
				isPending: true,
				document: null,
			};
		case 'ERROR':
			return {
				success: false,
				error: action.payload,
				isPending: false,
				document: null,
			};
		case 'ADD_DOCUMENT':
			return {
				success: true,
				error: null,
				isPending: false,
				document: action.payload,
			};
		case 'UPDATE_DOCUMENT':
			return {
				success: true,
				error: null,
				isPending: false,
				document: action.payload,
			};
		case 'UPDATE_DOCUMENT':
			return {
				success: true,
				error: null,
				isPending: false,
				document: null
			};
		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	const [res, dispatch] = useReducer(firestorResucer, initialState);

	const ref = projectFirestore.collection(collection);

	const addDocument = async (doc) => {
		dispatch({ type: 'IS_PENDING' });

		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await ref.add({ ...doc, createdAt });
			dispatch({ type: 'ADD_DOCUMENT', payload: addedDocument });
		} catch (error) {
			dispatch({ type: 'ERROR', payload: error.message });
		}
	};

	const updateDocument = async (id, updates) => {
		dispatch({ type: 'IS_PENDING' });
		// return console.log(updates)
		const updatedDocument = await ref.doc(id).update({...updates});
		try {
			dispatch({ type: 'UPDATE_DOCUMENT', payload: updatedDocument });
		} catch (error) {
			console.log(error.message)
			dispatch({ type: 'ERROR', payload: error.message });
		}
	};

	const deleteDocument = async (id) => {
		dispatch({ type: 'IS_PENDING' });
		try {
			await ref.doc(id).delete();
			console.log(id)
			dispatch({ type: 'DELETE_DOCUMENT' });
		} catch (error) {
			dispatch({ type: 'ERROR', payload: error.message });
		}
	};

	return { addDocument, updateDocument, deleteDocument, res };
};
