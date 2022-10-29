import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setIsPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            if (!res) throw new Error('Could not complete signup')

            await res.user.updateProfile({ displayName })
            dispatch({ type: "LOGIN", payload: res.user })
        } catch (error) {
            setIsPending(false)
            setError(error.message)
            console.log(error.message)
        }

    }

    return { signup, error, isPending }
}
