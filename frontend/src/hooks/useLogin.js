import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const login = async (loginData) => {
        setIsLoading(true);
        setError(null)

        try {
            const url = '/api/tutor/tutorValidation/'

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'Content-Type': 'application/json' }
            });

            const json = await response.json();

            if(!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))

                dispatch({ type: 'LOGIN', payload: json });

                setIsLoading(false);
                setError(null);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return { login, isLoading, error }
}