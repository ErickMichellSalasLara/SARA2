import { useEffect } from "react";

function usePageAnimations(selector = "[data-reveal]") {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("page-reveal-visible");
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("page-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [selector]);
}

export default usePageAnimations;
