import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const InactivityLogoutTimer = () => {
    const pathname = usePathname();
    const router = useRouter();
   


    const checkForInactivity = () => {
        const expireTimeString = localStorage.getItem('expireTime');
        const expireTime = expireTimeString ? parseInt(expireTimeString) : 0;

        if (expireTime < Date.now() && pathname !== '/') {
            localStorage.removeItem('token');
            signOut();
            router.push('/');
        }
    };

    const updateExpiryTime = () => {
        const expireTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        localStorage.setItem('expireTime', expireTime.toString());
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkForInactivity();
        }, 5000); // Check for inactivity every 5 seconds

        return () => clearInterval(interval);
    }, []);

useEffect(() => {
    const events = ['click', 'keypress', 'scroll', 'mousemove'];

    const update = () => {
        updateExpiryTime();
    };

    events.forEach(event => window.addEventListener(event, update));

    return () => {
        events.forEach(event => window.removeEventListener(event, update));
    };
}, []);

    return null; 
};

export default InactivityLogoutTimer;