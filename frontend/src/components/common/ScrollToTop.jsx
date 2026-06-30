import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable smooth scrolling temporarily to prevent any scroll transition animation
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      } else {
        // Fallback for slower rendering components
        const timer = setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView();
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }

    // Restore original scroll behavior for anchors or scroll effects
    html.style.scrollBehavior = originalScrollBehavior;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
