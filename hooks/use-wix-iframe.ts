import { useState, useEffect } from 'react';

export function useWixIframe() {
  const [isWixIframe, setIsWixIframe] = useState(false);
  const [iframeHeight, setIframeHeight] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Detect if we're in a Wix iframe
    const isInIframe = window !== window.top;
    setIsWixIframe(isInIframe);

    // If in iframe, try to get the height
    if (isInIframe) {
      // Try to get height from parent window or document
      const height = window.innerHeight || document.documentElement.clientHeight;
      setIframeHeight(height);
    }

    // Track scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utility function to get modal positioning classes
  const getModalClasses = () => {
    if (isWixIframe) {
      return {
        container: "items-start pt-4 md:pt-8",
        modal: "max-h-[85vh] md:max-h-[90vh]",
        videoContainer: "calc(85vh - 160px)"
      };
    }
    return {
      container: "items-start md:items-center pt-16 md:pt-4",
      modal: "max-h-[70vh] md:max-h-[80vh]",
      videoContainer: "calc(70vh - 160px)"
    };
  };

  // Function to scroll to top when modal opens (for Wix iframe)
  const scrollToTopForModal = () => {
    if (isWixIframe && scrollPosition > 100) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return {
    isWixIframe,
    iframeHeight,
    scrollPosition,
    getModalClasses,
    scrollToTopForModal
  };
}
