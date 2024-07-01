import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useStudentLogin = () => {
    const [errorStudent, setErrorStudent] = useState(null);
    const [isLoadingStudent, setIsLoadingStudent] = useState(null);
    const [redirectStudent, setRedirectStudent] = useState(null);
    const { dispatch } = useAuthContext();

    useEffect(() => {
        if(isLoadingStudent == false && !errorStudent)
            setRedirectStudent(true);
    })
    
    const loginStudent = async (loginData) => {
        setIsLoadingStudent(true);
        setErrorStudent(null)

        try {
            const url = '/api/student/studentValidation/'

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'Content-Type': 'application/json' }
            });

            const json = await response.json();

            if(!response.ok) {
                setIsLoadingStudent(false)
                setErrorStudent(json.error)
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))

                dispatch({ type: 'LOGIN', payload: json });

                setIsLoadingStudent(false);
                setErrorStudent(null);
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    

    return { loginStudent, isLoadingStudent, redirectStudent, errorStudent }
}