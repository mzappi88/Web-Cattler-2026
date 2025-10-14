import { useState, useEffect } from 'react';

export interface IframeDetection {
  isInIframe: boolean;
  isWix: boolean;
  parentDomain: string | null;
  isCattlerComAr: boolean;
  isCattlerFarm: boolean;
  isCattlerAgrBr: boolean;
  platform: 'wix' | 'cattler.com.ar' | 'cattler.farm' | 'cattler.agr.br' | 'other' | 'direct';
  referrer: string;
  hostname: string;
}

export function useIframeDetection(): IframeDetection {
  const [detection, setDetection] = useState<IframeDetection>({
    isInIframe: false,
    isWix: false,
    parentDomain: null,
    isCattlerComAr: false,
    isCattlerFarm: false,
    platform: 'direct',
    referrer: '',
    hostname: ''
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectIframe = () => {
      // Basic iframe detection
      const isInIframe = window !== window.top;
      
      // Get referrer and hostname
      const referrer = document.referrer || '';
      const hostname = window.location.hostname;
      
      // Detect Wix
      const isWix = 
        hostname.includes('wix') ||
        hostname.includes('wixsite') ||
        referrer.includes('wix') ||
        referrer.includes('wixsite');
      
      // Detect parent domain
      let parentDomain: string | null = null;
      if (isInIframe && window.parent && window.parent.location) {
        try {
          parentDomain = window.parent.location.hostname;
        } catch (e) {
          // Cross-origin access blocked, try to get from referrer
          const referrerUrl = new URL(referrer);
          parentDomain = referrerUrl.hostname;
        }
      }
      
  // Detect Cattler domains
  const isCattlerComAr = 
    hostname.includes('cattler.com.ar') ||
    parentDomain?.includes('cattler.com.ar') ||
    referrer.includes('cattler.com.ar');
    
  const isCattlerFarm = 
    hostname.includes('cattler.farm') ||
    parentDomain?.includes('cattler.farm') ||
    referrer.includes('cattler.farm');
    
  const isCattlerAgrBr = 
    hostname.includes('cattler.agr.br') ||
    parentDomain?.includes('cattler.agr.br') ||
    referrer.includes('cattler.agr.br');
      
      // Determine platform
      let platform: IframeDetection['platform'] = 'direct';
      
      if (isWix) {
        platform = 'wix';
      } else if (isCattlerComAr) {
        platform = 'cattler.com.ar';
      } else if (isCattlerFarm) {
        platform = 'cattler.farm';
      } else if (isCattlerAgrBr) {
        platform = 'cattler.agr.br';
      } else if (isInIframe) {
        platform = 'other';
      }
      
      const result: IframeDetection = {
        isInIframe,
        isWix,
        parentDomain,
        isCattlerComAr,
        isCattlerFarm,
        isCattlerAgrBr,
        platform,
        referrer,
        hostname
      };
      
      // Log detection for debugging
      console.log('🔍 Iframe Detection:', {
        isInIframe,
        isWix,
        parentDomain,
        isCattlerComAr,
        isCattlerFarm,
        isCattlerAgrBr,
        platform,
        referrer,
        hostname
      });
      
      setDetection(result);
    };

    detectIframe();
  }, []);

  return detection;
}

// Helper function to get redirect URL based on iframe detection
export function getRedirectUrlBasedOnIframe(
  country: string, 
  detection: IframeDetection
): string {
  // If we're in Cattler.com.ar iframe, use Spanish URLs
  if (detection.isCattlerComAr) {
    return 'https://cattler.com.ar/demo';
  }
  
  // If we're in Cattler.agr.br iframe, use Portuguese URLs
  if (detection.isCattlerAgrBr) {
    return 'https://cattler.agr.br/demo';
  }
  
  // If we're in Cattler.farm iframe, use country-based URLs (normal detection)
  if (detection.isCattlerFarm) {
    switch (country) {
      case 'AR':
      case 'UY':
      case 'PY':
      case 'BO':
      case 'MX':
      case 'CH':
      case 'OT$ES':
        return 'https://cattler.com.ar/demo';
      case 'BR':
        return 'https://cattler.agr.br/demo';
      case 'US':
      case 'CA':
      case 'OT$EN':
        return 'https://cattler.farm/demo';
      default:
        return 'https://cattler.farm/demo';
    }
  }
  
  // If we're in Wix, use country-based URLs
  if (detection.isWix) {
    switch (country) {
      case 'AR':
      case 'UY':
      case 'PY':
      case 'BO':
      case 'MX':
      case 'CH':
      case 'OT$ES':
        return 'https://cattler.com.ar/demo';
      case 'BR':
        return 'https://cattler.agr.br/demo';
      case 'US':
      case 'CA':
      case 'OT$EN':
        return 'https://cattler.farm/demo';
      default:
        return 'https://cattler.farm/demo';
    }
  }
  
  // Default fallback
  return 'https://cattler.farm/demo';
}
