import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _orderBy = null, _query = null) => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState([]);

    console.log(collection, _orderBy, _query)

    const orderBy = useRef(_orderBy).current

    useEffect(() => {

        setIsPending(true)
        let ref = projectFirestore.collection(collection)
        if (orderBy) ref = ref.orderBy(...orderBy)

        const unsub = ref.onSnapshot(snapshot => {
            let result = []
            snapshot.docs.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() })
            })
            setDocuments(result)
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
    }, [collection, orderBy])
    // console.log(documents)

    return { documents, error, isPending }
}