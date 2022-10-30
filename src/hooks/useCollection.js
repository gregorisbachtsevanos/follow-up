import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        setIsPending(true)
        let ref = projectFirestore.collection(collection)
        const unsub = ref.onSnapshot(snapshot => {
            // if (snapshot.empty) {
            //     setError('No Users have ')
            //     setIsPending(false)
            // } else {
            let result = []
            snapshot.docs.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() })
            })
            setUsers(result)
            setIsPending(false)
            setError(null);

            // }
        },
            (err) => {
                setError(err.message);
                setIsPending(false);
            }
        );
        return () => unsub()
    }, [collection])

    return { users, error, isPending }
}