import { useState, useEffect } from 'react';

export function useWixIframe() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);
    
    // Check screen size
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Track scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Track resize
    const handleResize = () => {
      checkScreenSize();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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
    // Only apply specific positioning on client-side and desktop
    if (isClient && isDesktop) {
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
    }
    
    // Default styles for server-side rendering and mobile
    return {
      container: {
        alignItems: 'flex-start',
        paddingTop: '4px'
      },
      modal: {
        maxHeight: '90vh'
      }
    };
  };

  return {
    scrollPosition,
    isClient,
    isDesktop,
    getModalClasses,
    getModalStyles
  };
}
