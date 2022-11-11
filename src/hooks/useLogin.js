import { useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            await projectFirestore.collection('users').doc(res.user.uid).update({ online: true, theme: 'light' })
            dispatch({ type: 'LOGIN', payload: res.user })
        } catch (error) {
            setIsPending(false)
            setError(error.message)
            console.log(error.message)
        }
        setIsPending(false)

    }

    return { login, error, isPending }
}
