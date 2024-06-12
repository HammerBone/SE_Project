import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signUp = async (registerData) => {
        setIsLoading(true)
        setError(null)

        const url = '/api/tutor/createTutor/';

        try {
            const response = await fetch(url, {
                method:'POST',
                body: JSON.stringify(registerData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error);
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))

                dispatch({ type: 'LOGIN', payload: json });

                setIsLoading(false);
                setError(null);
            }
        }
        catch (error){
            console.log(error.message);
        }
    } 

    return { signUp, isLoading, error };
}