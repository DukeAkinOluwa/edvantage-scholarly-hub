
import { useEffect, useState } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          entry.target.classList.remove("opacity-0");
          entry.target.classList.remove("translate-y-10");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    const animatedElements = document.querySelectorAll(".scroll-animation");
    animatedElements.forEach((el) => {
      observer.observe(el);
      el.classList.add("opacity-0", "translate-y-10");
      el.classList.add("transition-all", "duration-700", "ease-out");
    });

    setElements(Array.from(animatedElements));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [threshold]);

  return elements;
};
