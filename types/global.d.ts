declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormReady?: () => void;
          onFormSubmitted?: () => void;
          onFormError?: (error: any) => void;
        }) => void;
      };
    };
  }
}

export {}; 