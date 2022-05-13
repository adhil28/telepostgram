import { useState, useLayoutEffect } from 'react'

export const IsVisible = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    useLayoutEffect(() => {
        if (element != null) {
            console.log('s');
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setState(entry.isIntersecting);
                }, { rootMargin }
            );

            element.current && observer.observe(element.current);

            return () => observer.unobserve(element.current);
        } else {
            return false
        }
    }, []);

    return isVisible;
};