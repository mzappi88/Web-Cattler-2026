import { useState, useEffect } from 'react';

export function useWixIframe() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Track scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utility function to get modal positioning classes and styles
  const getModalClasses = () => {
    return {
      container: "items-start pt-4 md:pt-8",
      modal: "max-h-[85vh] md:max-h-[90vh]",
      videoContainer: "calc(85vh - 160px)"
    };
  };

  // Function to get modal positioning styles for specific position
  const getModalStyles = () => {
    if (window.innerWidth >= 768) {
      // For desktop: position at pixel 1100
      return {
        container: {
          alignItems: 'flex-start',
          paddingTop: '1100px',
          transform: 'translateY(-1100px)'
        },
        modal: {
          maxHeight: '85vh'
        }
      };
    } else {
      // For mobile: position at top
      return {
        container: {
          alignItems: 'flex-start',
          paddingTop: '4px'
        },
        modal: {
          maxHeight: '90vh'
        }
      };
    }
  };

  return {
    scrollPosition,
    getModalClasses,
    getModalStyles
  };
}
