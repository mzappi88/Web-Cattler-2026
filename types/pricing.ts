// Centralized pricing types and interfaces

export interface Plan {
  id: string;
  name: string;
  price: number;
  annualPrice?: number;
  description: string;
  pens: string;
  users: string;
  keyFeatures: string[];
  popular: boolean;
  country: string;
  billingCycle?: "monthly" | "annual";
  planType?: "owner" | "custom";
  promotionalState?: any;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  availableFor: string[];
  includedIn: string[];
  isCustomFeeder?: boolean;
  comingSoon?: boolean;
  hidden?: boolean;
  country: string;
  promotionalState?: any;
}

export interface PricingState {
  isAnnual?: boolean;
  isPlan5050?: boolean;
  headCount?: number;
  summerStartDate?: string;
  summerEndDate?: string;
  defaultDiscountFactor?: number;
  saleActive: boolean;
  saleName: string;
  defaultIsAnnual?: boolean;
  discounts: {
    monthly: {
      [productId: string]: {
        isActive: boolean;
        discountFactor: number;
      };
    };
    annual: {
      [productId: string]: {
        isActive: boolean;
        discountFactor: number;
      };
    };
    xMonthly: {
      [productId: string]: {
        isActive: boolean;
        discountFactor: number;
        xMonths: number;
      };
    };
    freeMonths: {
      [productId: string]: {
        isActive: boolean;
        discountFactor: number;
        freeMonths: number;
      };
    };
  };
}

export interface PaymentData {
  plan: {
    name: string;
    description: string;
    price: number;
    pens: string;
    users: string;
  };
  addOns: string[];
  customerInfo: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  total: number;
  billingCycle: "monthly" | "annual";
  planType: "owner" | "custom" | "addon";
  isAddOnOnly?: boolean;
  additionalPens: number;
  additionalUsers: number;
  additionalClientUsers: number;
  promotionalState?: PricingState;
}

export type Country = 
  | "US" 
  | "CA" 
  | "AR" 
  | "PY" 
  | "UY" 
  | "BO" 
  | "BR" 
  | "MX" 
  | "OT$EN" 
  | "OT$ES";

export type Language = "en" | "es" | "pt" | "es-ar"; 