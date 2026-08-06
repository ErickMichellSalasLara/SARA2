import { useState, useEffect, useRef } from 'react';

export function useVisibility(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Dejar de observar una vez que ya es visible para no repetir la animación
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [threshold]);

    return [domRef, isVisible];
}