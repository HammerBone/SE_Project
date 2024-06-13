import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(null)
    const { dispatch } = useAuthContext();
let response, json;
    useEffect(() => {
        if (isLoading == false && !error) {
            setRedirect(true)
        }
    })

    const signUp = async ({ firstName, lastName, email, password, isTutor }) => {
        setIsLoading(true)
        setError(null)

        const tutorUrl = '/api/tutor/createTutor';
        const studentUrl = '/api/student/createStudent';
        const registerData = { firstName, lastName, email, password }

        try {
            
            if (isTutor){
                response = await fetch(tutorUrl, {
                    method:'POST',
                    body: JSON.stringify(registerData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                json = await response.json();
            }
            else if (!isTutor) {
                response = await fetch(studentUrl, {
                    method:'POST',
                    body: JSON.stringify(registerData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                json = await response.json();
            }

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

    return { signUp, isLoading, redirect, error };
}