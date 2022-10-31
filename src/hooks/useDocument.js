import { useState, useReducer, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [document, setDocument] = useState(null);

	useEffect(() => {
		setIsPending(true);

		const ref = projectFirestore.collection(collection).doc(id);

		const unsub = ref.onSnapshot(
				(doc) => {
					// return console.log(doc)
					if (doc.exists) {
						setDocument({...doc.data(), id: doc.id});
					} else {
						setError('Could not find that project');
					}
					setIsPending(false);
				},
				(err) => {
					setError(err.message);
					setIsPending(false);
				}
			);
		return () => unsub();
	}, [collection, id]);

	return { document, isPending, error };
};
