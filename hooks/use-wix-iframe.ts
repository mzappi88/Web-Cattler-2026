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

  // Utility function to get modal positioning classes
  const getModalClasses = () => {
    return {
      container: "items-start pt-4 md:pt-8",
      modal: "max-h-[85vh] md:max-h-[90vh]",
      videoContainer: "calc(85vh - 160px)"
    };
  };

  // Function to scroll to specific position when modal opens
  const scrollToTopForModal = () => {
    const targetPosition = window.innerWidth >= 768 ? 1100 : 0;
    
    // Method 1: Direct scroll assignment
    document.documentElement.scrollTop = targetPosition;
    document.body.scrollTop = targetPosition;
    
    // Method 2: Window scrollTo
    window.scrollTo(0, targetPosition);
    
    // Method 3: Force scroll after a delay
    setTimeout(() => {
      document.documentElement.scrollTop = targetPosition;
      document.body.scrollTop = targetPosition;
      window.scrollTo(0, targetPosition);
    }, 50);
    
    // Method 4: Try smooth scroll
    setTimeout(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, 100);
    
    // Method 5: Final attempt
    setTimeout(() => {
      document.documentElement.scrollTop = targetPosition;
      document.body.scrollTop = targetPosition;
    }, 200);
  };

  return {
    scrollPosition,
    getModalClasses,
    scrollToTopForModal
  };
}
