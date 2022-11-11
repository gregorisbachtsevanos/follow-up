import { useState, useEffect } from "react";
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, avatar) => {
        setIsPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            if (!res) throw new Error('Could not complete signup')

            //  upload user's image
            const uploadPath = `avatars/${res.user.uid}/${avatar.name}`;
            const img = await projectStorage.ref(uploadPath).put(avatar)
            const imgUrl = await img.ref.getDownloadURL()

            await res.user.updateProfile({ displayName, photoURL: imgUrl })

            // create user's document
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online: true,
                theme: 'light',
                displayName,
                photoURL: imgUrl
            })

            dispatch({ type: "LOGIN", payload: res.user })
        } catch (error) {
            setIsPending(false)
            setError(error.message)
            console.log(error.message)
        }
        setIsPending(false)

    }

    return { signup, error, isPending }
}
