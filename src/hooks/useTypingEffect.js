import { useState, useEffect } from 'react';

export function useTypingEffect(roles, typeSpeed = 80, deleteSpeed = 40, pauseAfterType = 2000, pauseAfterDelete = 500) {
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            if (text.length < currentRole.length) {
                timeout = setTimeout(() => {
                    setText(currentRole.substring(0, text.length + 1));
                }, typeSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseAfterType);
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => {
                    setText(currentRole.substring(0, text.length - 1));
                }, deleteSpeed);
            } else {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
                timeout = setTimeout(() => {}, pauseAfterDelete);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex, roles, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

    return text;
}
