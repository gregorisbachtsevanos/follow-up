import { useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext, user } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setIsPending(true);
        try {
            await projectFirestore.collection('users').doc(user.uid).update({ online: false })
            await projectAuth.signOut()

            dispatch({ type: 'LOGOUT' })
        } catch (error) {
            setIsPending(false)
            setError(error.message)
            console.log(error.message)
        }
        setIsPending(false);
    }

    return { logout, error, isPending }
}
