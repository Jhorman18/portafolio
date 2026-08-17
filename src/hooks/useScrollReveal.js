import { useEffect } from "react";

/**
 * useScrollReveal — Observes `.reveal-on-scroll` elements and adds
 * `reveal-visible` when they enter the viewport.
 *
 * Uses a MutationObserver to detect dynamically added elements (e.g.,
 * when React filters re-render cards). Elements already in the viewport
 * get revealed immediately; others wait for scroll intersection.
 *
 * Fix: When React re-renders and strips `reveal-visible` from a reused
 * DOM node, the MutationObserver detects the className change and
 * re-observes the element.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          io.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeNew = () => {
      document.querySelectorAll(".reveal-on-scroll:not(.reveal-visible)").forEach((el) => {
        io.observe(el);
      });
    };

    // Initial pass
    observeNew();

    // Watch for DOM changes (filter switches, lazy loads, React re-renders)
    const mo = new MutationObserver(() => {
      // Use rAF to batch multiple rapid mutations into one sweep
      requestAnimationFrame(observeNew);
    });

    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
};
