import { useState } from 'react';

const useUser = (initialValue) => {
    const [storedUser, setStoredUser] = useState(() => {
        try {
            const userString = localStorage.getItem('user');
            return userString ? JSON.parse(userString) : initialValue;
        }
        catch (error) {
            return initialValue;
        }
    });

    const setUser = (user) => {
        setStoredUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    return [storedUser, setUser];
}

export default useUser;