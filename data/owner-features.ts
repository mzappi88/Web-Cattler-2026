import { PRICES_BY_COUNTRY, getExtraPenPrice, getExtraUserPrice } from "./owner-plans";
import { formatPrice, Country } from "@/hooks/use-pricing-translation";
import { getAdvancedFeedingPrice, getInputTransformationPrice, getAnimalHealthPrice, getAnimalHealthBasicPrice, 
  getBunkcoreCustomizationPrice, getAnimalHealthAdvancedPrice, getAnimalHealthChutePrice, getChutePrice, getchutequickstartPrice,
  getchutecattleinPrice,getchuteneworderPrice, getEIDIntegrationPrice, getCustomFeederPrice, getClientUsersPrice, getMicroingredientesManagementPrice, 
  getMarketValueReportPrice, getTruckScaleIntegrationPrice, getDumpBoxIntegrationPrice, getMicroMachineIntegrationPrice, getGrainBankPrice ,getAutoAdjustPrice,
  getFeedingAutomationPrice,getFeedingProtocolsPrice,getPurchasesPrice,getadvancedinventoryPrice,getBillingPrice,getAnalyticsPrice,getInformeCuota481Price,getPastureManagementBasicPrice,
  getPastureManagementAdvancedPrice,getCowCalfBasicPrice,getCowCalfAdvancedPrice} from "./owner-plans";


export interface Feature {
  name: string;
  plan1: any;
  plan2: any;
  plan3: any;
  plan4: any;
  isAddOn?: boolean;
  isExpandable?: boolean;
  isCustomFeeder?: boolean;
  comingSoon?: boolean;
  expandedByDefault?: boolean;
  subFeatures?: {
    name: string;
    plan1: any;
    plan2: any;
    plan3: any;
    plan4: any;
  }[];
  country: string;
}

// Feature configuration by country
interface FeatureConfig {
  [country: string]: {
    [featureKey: string]: {
      plan1: any;
      plan2: any;
      plan3: any;
      plan4: any;
      isAddOn?: boolean;
      isExpandable?: boolean;
      isCustomFeeder?: boolean;
      comingSoon?: boolean;
      expandedByDefault?: boolean;
      subFeatures?: {
        name: string;
        plan1: any;
        plan2: any;
        plan3: any;
        plan4: any;
      }[];
    };
  };
}

// Define feature configurations for each country
const FEATURE_CONFIG: FeatureConfig = {
  US: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
  
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    AnimalHealthbasic: { plan1: false, plan2: true, plan3: true, plan4: true },
    AnimalHealthadvanced: { plan1: false, plan2: false , plan3: true, plan4: true },   
    chuteQuickStart: { plan1: false, plan2:true, plan3: true, plan4: true },
    chuteCattleIn: { plan1: false, plan2: false, plan3: true, plan4: true },
    chuteNewOrder: { plan1: false, plan2: false, plan3: true, plan4: true },
    EIDIntegration: { plan1: false, plan2: "addon", plan3: true, plan4: true },    
     advancedFeeding: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "feedingProtocols", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "FeedingAutomation", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "BunkScoreCustomization", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "AutoAdjust", plan1: "", plan2: "", plan3: "", plan4: "" }
      ]
    },
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "purchases", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        {name: "inputTransformation", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        {name: "MicroingredientesManagement", plan1: false, plan2: false, plan3: "addon", plan4: true },
        
      ]
    },
    MicroMachineIntegration: { plan1: false, plan2: false, plan3: "addon", plan4: "addon" },    
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: true, plan3: true, plan4: true },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    GrainBank: { plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" ,
    isAddOn: true,
    isCustomFeeder: true,},
  },
  CA:  {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
  
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    AnimalHealthbasic: { plan1: false, plan2: true, plan3: true, plan4: true },
    AnimalHealthadvanced: { plan1: false, plan2: false , plan3: true, plan4: true },   
    chuteQuickStart: { plan1: false, plan2:true, plan3: true, plan4: true },
    chuteCattleIn: { plan1: false, plan2: false, plan3: true, plan4: true },
    chuteNewOrder: { plan1: false, plan2: false, plan3: true, plan4: true },
    EIDIntegration: { plan1: false, plan2: "addon", plan3: true, plan4: true },    
     advancedFeeding: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "feedingProtocols", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "FeedingAutomation", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "BunkScoreCustomization", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "AutoAdjust", plan1: "", plan2: "", plan3: "", plan4: "" }
      ]
    },
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "purchases", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        {name: "inputTransformation", plan1: true, plan2: "addon", plan3: true, plan4: true },
        {name: "MicroingredientesManagement", plan1: false, plan2: false, plan3: "addon", plan4: true },
        
      ]
    },
    MicroMachineIntegration: { plan1: false, plan2: false, plan3: "addon", plan4: "addon" },    
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    GrainBank: { plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" ,
    isAddOn: true,
    isCustomFeeder: true,},
  },
  AR: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    BunkScoreCustomization: { plan1:true, plan2: true , plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
  
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    FeedingAutomation: { plan1:true, plan2: true , plan3: true, plan4: true },
    
    AutoAdjust: { plan1:true, plan2: true , plan3: true, plan4: true },
    animalHealth: { plan1: "addon", plan2: true, plan3: true, plan4: true },  
    chute: { plan1: "addon", plan2: true, plan3: true, plan4: true, isExpandable: true, expandedByDefault: false,
      subFeatures: [
        {name: "EIDIntegration",plan1: "", plan2: "", plan3: "", plan4: "" },
        {name: "chuteCattleIn",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteNewOrder",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteQuickStart",plan1: "", plan2: "", plan3:"",plan4:""},        
      ]
    },      
    feedingProtocols: { plan1: "addon", plan2: "addon", plan3: true, plan4: true },
    AdvancedInventory: { plan1: "addon", plan2: "addon", plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "purchases", plan1: "", plan2: "", plan3: "", plan4: "" },
        {name: "inputTransformation", plan1: "", plan2: "", plan3: "", plan4: "" },
      ]
    },
    
    
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    
  },
  BR: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true , isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true , isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    advancedFeeding: { 
      plan1: "addon", 
      plan2: true, 
      plan3: true, 
      plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "feedingProtocols", plan1: false, plan2: true, plan3: true, plan4: true },
        { name: "FeedingAutomation", plan1: false, plan2: true, plan3: true, plan4: true },
        { name: "BunkScoreCustomization", plan1: false, plan2: true, plan3: true, plan4: true },
        { name: "AutoAdjust", plan1: false, plan2: true, plan3: true, plan4: true }
      ]
    },
    inputTransformation: { plan1: "addon", plan2: "addon", plan3: true, plan4: true },
    chute: { plan1: false, plan2: "addon", plan3: true, plan4: true, isExpandable: true, expandedByDefault: false,
      subFeatures: [
        {name: "chuteCattleIn",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteNewOrder",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteQuickStart",plan1: "", plan2: "", plan3:"",plan4:""},
        
      ]
    },
    EIDIntegration: { plan1: false, plan2: "addon", plan3: true, plan4: true },
    animalHealth: { plan1: false, plan2: "addon", plan3: "addon", plan4: true },   
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: false,
      subFeatures: [
        { name: "purchases", plan1: false, plan2: "addon", plan3: "addon", plan4: true },
        {name: "inputTransformation", plan1: false, plan2: "addon", plan3: "addon", plan4: true },
        
      ]
    },    
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    pastureManagementBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    pastureManagementAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    analytics: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },  
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
   
  },
  PY: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    advancedFeeding: { 
      plan1: false, 
      plan2: true, 
      plan3: true, 
      plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "feedingProtocols", plan1: false, plan2: true, plan3: true, plan4: true },
        { name: "FeedingAutomation", plan1: false, plan2: "addon", plan3: true, plan4: true },
        { name: "BunkScoreCustomization", plan1: false, plan2: "addon", plan3: true, plan4: true },
        { name: "AutoAdjust", plan1: false, plan2: "addon", plan3: true, plan4: true }
      ]
    },
    AnimalHealthChute: { plan1: false, plan2: "addon", plan3: "addon", plan4: true, isExpandable: true, expandedByDefault: false,
      subFeatures: [
        {name: "animalHealth",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteCattleIn",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteNewOrder",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteQuickStart",plan1: "", plan2: "", plan3:"",plan4:""},
        
      ]
    },
    EIDIntegration: { plan1: false, plan2: "addon", plan3: "addon", plan4: true },
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "purchases", plan1: "addon", plan2: "addon", plan3: "addon", plan4: true },
        {name: "inputTransformation", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        
      ]
    },
    pastureManagementBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    pastureManagementAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    analytics: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },  
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    MicroMachineIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
  },
  CH: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    animalHealth: { plan1: "addon", plan2: true, plan3: true, plan4: true,},
    chuteQuickStart: { plan1: "addon", plan2: true, plan3: true, plan4: true, isExpandable: false,},
    chute:{ plan1: "addon", plan2: "addon", plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "chuteCattleIn",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteNewOrder",plan1: "", plan2: "", plan3:"",plan4:""},
           ]
    },
    EIDIntegration: { plan1: "addon", plan2: "addon", plan3: true, plan4: true },
  
    advancedFeeding: { 
      plan1: "", 
      plan2: "", 
      plan3: "", 
      plan4: "",
      isExpandable: true,
      expandedByDefault: true,
      subFeatures: [
        { name: "FeedingAutomation", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        { name: "AutoAdjust", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        { name: "feedingProtocols", plan1: "addon", plan2: "addon", plan3: "addon", plan4: true },
        { name: "BunkScoreCustomization", plan1: "addon", plan2: "addon", plan3: "addon", plan4: true },
        ]
    },
    
  AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
    subFeatures: [
      { name: "purchases", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
      {name: "inputTransformation", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
      
    ]
  },
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    analytics: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },  
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    pastureManagementBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    pastureManagementAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    
    
  },
  UY: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: false },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: false },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: false },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: false, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    suppliesQuantity: { plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: false },
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: false, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: false },
    reports: { plan1: true, plan2: true, plan3: true, plan4: false },
    advancedFeeding: { 
      plan1: "", 
      plan2: "", 
      plan3: "", 
      plan4: "",
      isExpandable: true,
      expandedByDefault: true,
      subFeatures: [
        { name: "BunkScoreCustomization", plan1: true, plan2: true, plan3: true, plan4: true },
        { name: "feedingProtocols", plan1: false, plan2: true, plan3: true, plan4: false },
        { name: "FeedingAutomation", plan1: false, plan2: "addon", plan3: true, plan4: false },
        { name: "AutoAdjust", plan1: false, plan2: true, plan3: true, plan4: false }
      ]
    },
    animalHealth: { plan1: "addon", plan2: true, plan3: true, plan4: false },
    chute: { plan1: "addon", plan2: true, plan3: true, plan4: false, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "EIDIntegration",plan1: "", plan2: "", plan3: "", plan4: "" },
        {name: "chuteCattleIn",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteNewOrder",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteQuickStart",plan1: "", plan2: "", plan3:"",plan4:""},

        
      ]
    },      
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "accountManagement", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "marginsReport", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "inputTransformation", plan1: "addon", plan2: true, plan3: true, plan4: "addon" },
        {name: "purchases", plan1: "addon", plan2: "addon", plan3: true, plan4: "addon" },
        
        
      ]
    },
    informeCuota481: { plan1: "addon", plan2: "addon", plan3: true, plan4: "addon" },
    pastureManagementBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    pastureManagementAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    analytics: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },  
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: false },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: false },
  },
  BO: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: false },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: false },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: false },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: false, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    suppliesQuantity: { plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: false },
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: false, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Ilimitado", plan2: "Ilimitado", plan3: "Ilimitado", plan4: "Ilimitado" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: false },
    reports: { plan1: true, plan2: true, plan3: true, plan4: false },
    advancedFeeding: { 
      plan1: "", 
      plan2: "", 
      plan3: "", 
      plan4: "",
      isExpandable: true,
      expandedByDefault: true,
      subFeatures: [
        { name: "feedingProtocols", plan1: false, plan2: true, plan3: true, plan4: false },
        { name: "FeedingAutomation", plan1: false, plan2: "addon", plan3: true, plan4: false },
        { name: "BunkScoreCustomization", plan1: false, plan2: "addon", plan3: true, plan4: false },
        { name: "AutoAdjust", plan1: false, plan2: true, plan3: true, plan4: false }
      ]
    },
    AnimalHealthChute: { plan1: false, plan2: true, plan3: true, plan4: false, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "animalHealth",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteCattleIn",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteNewOrder",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteQuickStart",plan1: "", plan2: "", plan3:"",plan4:""},
        
      ]
    },    
    EIDIntegration: { plan1: "addon", plan2: true, plan3: true, plan4: false },
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "accountManagement", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "marginsReport", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "inputTransformation", plan1: "addon", plan2: true, plan3: true, plan4: "addon" },
        {name: "purchases", plan1: "addon", plan2: "addon", plan3: true, plan4: "addon" },
        
        
      ]
    },
    pastureManagementBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    pastureManagementAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfBasic: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    cowCalfAdvanced: {plan1: "comingSoon", plan2:"comingSoon", plan3: "comingSoon",plan4:"comingSoon"},
    analytics: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },  
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: false },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: false },
  },
  MX: {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
  
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    AnimalHealthbasic: { plan1: false, plan2: true, plan3: true, plan4: true },
    AnimalHealthadvanced: { plan1: false, plan2: false , plan3: true, plan4: true },   
    chuteQuickStart: { plan1: false, plan2:true, plan3: true, plan4: true },
    chuteCattleIn: { plan1: false, plan2: false, plan3: true, plan4: true },
    chuteNewOrder: { plan1: false, plan2: false, plan3: true, plan4: true },
    EIDIntegration: { plan1: false, plan2: "addon", plan3: true, plan4: true },    
     advancedFeeding: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "feedingProtocols", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "FeedingAutomation", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "BunkScoreCustomization", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "AutoAdjust", plan1: "", plan2: "", plan3: "", plan4: "" }
      ]
    },
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "purchases", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        {name: "inputTransformation", plan1: true, plan2: "addon", plan3: true, plan4: true },
        {name: "MicroingredientesManagement", plan1: false, plan2: false, plan3: "addon", plan4: true },
        
      ]
    },
    MicroMachineIntegration: { plan1: false, plan2: false, plan3: "addon", plan4: "addon" },    
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    GrainBank: { plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" ,
    isAddOn: true,
    isCustomFeeder: true,},
  },
  "OT$EN": {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
  
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    AnimalHealthbasic: { plan1: false, plan2: true, plan3: true, plan4: true },
    AnimalHealthadvanced: { plan1: false, plan2: false , plan3: true, plan4: true },   
    chuteQuickStart: { plan1: false, plan2:true, plan3: true, plan4: true },
    chuteCattleIn: { plan1: false, plan2: false, plan3: true, plan4: true },
    chuteNewOrder: { plan1: false, plan2: false, plan3: true, plan4: true },
    EIDIntegration: { plan1: false, plan2: "addon", plan3: true, plan4: true },    
     advancedFeeding: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "feedingProtocols", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "FeedingAutomation", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "BunkScoreCustomization", plan1: "", plan2: "", plan3: "", plan4: "" },
        { name: "AutoAdjust", plan1: "", plan2: "", plan3: "", plan4: "" }
      ]
    },
    AdvancedInventory: {plan1: "", plan2: "", plan3: "", plan4: "", isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "purchases", plan1: "addon", plan2: "addon", plan3: true, plan4: true },
        {name: "inputTransformation", plan1: true, plan2: "addon", plan3: true, plan4: true },
        {name: "MicroingredientesManagement", plan1: false, plan2: false, plan3: "addon", plan4: true },
        
      ]
    },
    MicroMachineIntegration: { plan1: false, plan2: false, plan3: "addon", plan4: "addon" },    
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    GrainBank: { plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" ,
    isAddOn: true,
    isCustomFeeder: true,},
  },
  "OT$ES": {
    feeding: { plan1: true, plan2: true, plan3: true, plan4: true },
    yardsheet: { plan1: true, plan2: true, plan3: true, plan4: true },
    cattleManagement: { plan1: true, plan2: true, plan3: true, plan4: true },
    suppliesInventory: { plan1: true, plan2: true, plan3: true, plan4: true,
      isExpandable: true,
      subFeatures: [
        { name: "suppliesQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
  
    rationManagement: { plan1: true, plan2: true, plan3: true, plan4: true, isExpandable: true,
      subFeatures: [
        { name: "rationQuantity", plan1: "Unlimited", plan2: "Unlimited", plan3: "Unlimited", plan4: "Unlimited" },
      ]
    },
    penRider: { plan1: true, plan2: true, plan3: true, plan4: true },
    reports: { plan1: true, plan2: true, plan3: true, plan4: true },
    FeedingAutomation: { plan1:true, plan2: true , plan3: true, plan4: true },
    BunkScoreCustomization: { plan1:true, plan2: true , plan3: true, plan4: true },
    AutoAdjust: { plan1:true, plan2: true , plan3: true, plan4: true },
    animalHealth: { plan1: "addon", plan2: true, plan3: true, plan4: true },  
    chute: { plan1: "addon", plan2: true, plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "EIDIntegration",plan1: "", plan2: "", plan3: "", plan4: "" },
        {name: "chuteCattleIn",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteNewOrder",plan1: "", plan2: "", plan3:"",plan4:""},
        {name: "chuteQuickStart",plan1: "", plan2: "", plan3:"",plan4:""},        
      ]
    },      
    feedingProtocols: { plan1: "addon", plan2: "addon", plan3: true, plan4: true },
            AdvancedInventory: { plan1: "addon", plan2: "addon", plan3: true, plan4: true, isExpandable: true, expandedByDefault: true,
      subFeatures: [
        {name: "purchases", plan1: "", plan2: "", plan3: "", plan4: "" },
        {name: "inputTransformation", plan1: "", plan2: "", plan3: "", plan4: "" },
      ]
    },
   
    informeCuota481: { plan1: "addon", plan2: "addon", plan3: "addon", plan4: true },        
    truckScalesIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    dumpBoxIntegration: { plan1: false, plan2: false, plan3: "comingSoon", plan4: "comingSoon" },
    
    customFeeder: { 
      plan1: "addon", 
      plan2: "addon", 
      plan3: "addon", 
      plan4: "addon",
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,
      subFeatures: [
        { name: "billing", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "accountManagement", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "marginsReport", plan1: false, plan2: false, plan3: false, plan4: false },
        { name: "clientUsers", plan1: "addon", plan2: "addon", plan3: "addon", plan4: "addon" },
      ]
    },
    
  },
};

// Helper function to get localized feature names
export function getLocalizedFeatureName(featureKey: string, country: Country): string {
  const translations: Record<string, Record<string, string>> = {
    pensIncluded: {
      BR: "Currais Incluidos",
      AR: "Corrales Incluidos",
      US: "Pens Included",
      CA: "Pens Included",
      MX: "Corrales Incluidos",
      PY: "Corrales Incluidos",
      UY: "Corrales Incluidos",
      BO: "Corrales Incluidos",
      CH: "Corrales Incluidos",
      OT$EN: "Pens Included",
      OT$ES: "Corrales Incluidos",
    },
    extraPen: {
      BR: "Curral Extra",
      AR: "Corral Extra",
      US: "Extra Pen",
      CA: "Extra Pen",
      MX: "Corral Extra",
      PY: "Corral Extra",
      UY: "Corral Extra",
      BO: "Corral Extra",
      CH: "Corral Extra",
      OT$EN: "Extra Pen",
      OT$ES: "Corral Extra",
    },
    extraUser: {
      BR: "Usuário Extra",
      AR: "Usuario Extra",
      US: "Extra User",
      CA: "Extra User",
      MX: "Usuario Extra",
      PY: "Usuario Extra",
      UY: "Usuario Extra",
      BO: "Usuario Extra",
      CH: "Usuario Extra",
      OT$EN: "Extra User",
      OT$ES: "Usuario Extra",
    },
    yardsheet: {
      BR: "Mapa do Confinamento",
      AR: "Mapa de Corrales",
      US: "Yardsheet",
      CA: "Yardsheet",
      MX: "Mapa de Confinamiento",
      PY: "Mapa de Confinamiento",
      UY: "Mapa del Feedlot",
      BO: "Mapa de Confinamiento",
      CH: "Mapa de Confinamiento",
      OT$EN: "Yardsheet",
      OT$ES: "Mapa de Confinamiento",
    },
    suppliesQuantity: {
      BR: "Quantidade de Suprimentos",
      AR: "Cantidad de Suministros",
      US: "Supplies Quantity",
      CA: "Supplies Quantity",
      MX: "Cantidad de Suministros",
      PY: "Cantidad de Suministros",
      UY: "Cantidad de Suministros",
      BO: "Cantidad de Suministros",
      CH: "Cantidad de Suministros",
      OT$EN: "Supplies Quantity",
      OT$ES: "Cantidad de Suministros",
    },
    rationQuantity: {
      BR: "Quantidade de Dietas",
      AR: "Cantidad de Dietas",
      US: "Ration Quantity",
      CA: "Ration Quantity",
      MX: "Cantidad de Dietas",
      PY: "Cantidad de Dietas",
      UY: "Cantidad de Dietas",
      BO: "Cantidad de Dietas",
      CH: "Cantidad de Dietas",
      OT$EN: "Ration Quantity",
      OT$ES: "Cantidad de Dietas",
    },
    reports: {
      BR: "Relatórios",
      AR: "Reportes",
      US: "Reports",
      CA: "Reports",
      MX: "Reportes",
      PY: "Reportes",
      UY: "Reportes",
      BO: "Reportes",
      CH: "Reportes",
      OT$EN: "Reports",
      OT$ES: "Reportes",
    },
    penRider: {
      BR: "Recorredor",
      AR: "Recorredor",
      US: "Pen Rider",
      CA: "Pen Rider",
      MX: "Recorredor",
      PY: "Recorredor",
      UY: "Recorredor",
      BO: "Recorredor",
      CH: "Recorredor",
      OT$EN: "Pen Rider",
      OT$ES: "Recorredor",
    },
    advancedFeeding: {
      BR: "Alimentação Avançada",
      AR: "Alimentación Avanzada",
      US: "Advanced Feeding",
      CA: "Advanced Feeding",
      MX: "Alimentación Avanzada",
      PY: "Alimentación Avanzada",
      UY: "Alimentación Avanzada",
      BO: "Alimentación Avanzada",
      CH: "Alimentación Avanzada",
      OT$EN: "Advanced Feeding",
      OT$ES: "Alimentación Avanzada",
    },
    feedingProtocols: {
      BR: "Protocolos de Alimentação",
      AR: "Programación de Plan de Alimentación por Lote",
      US: "Feeding Protocols",
      CA: "Feeding Protocols",
      MX: "Protocolos de Alimentación",
      PY: "Protocolos de Alimentación",
      UY: "Protocolos de Alimentación",
      BO: "Protocolos de Alimentación",
      CH: "Protocolos de Alimentación",
      OT$EN: "Feeding Protocols",
      OT$ES: "Protocolos de Alimentación",
    },
    FeedingAutomation: {
      BR: "Automação de Ordens de Carga/Descarga",
      AR: "Optimización de Viajes del Mixer",
      US: "Load & Drop Order Creation Automation",
      CA: "Load & Drop Order Creation Automation",
      MX: "Automatización de Órdenes de Carga/Descarga",
      PY: "Automatización de Órdenes de Carga/Descarga",
      UY: "Automatización de Órdenes de Carga/Descarga",
      BO: "Automatización de Órdenes de Carga/Descarga",
      CH: "Automatización de Órdenes de Carga/Descarga",
      OT$EN: "Load & Drop Order Creation Automation",
      OT$ES: "Automatización de Órdenes de Carga/Descarga",
    },
    BunkScoreCustomization: {
      BR: "Personalização da Leitura de Cocho",
      AR: "Lectura de Comederos Configurable",
      US: "Feeder Reading Customization",
      CA: "Feeder Reading Customization",
      MX: "Personalización de Lectura de Comederos",
      PY: "Personalización de Lectura de Comederos",
      UY: "Personalización de Lectura de Comederos",
      BO: "Personalización de Lectura de Comederos",
      CH: "Personalización de Lectura de Comederos",
      OT$EN: "Feeder Reading Customization",
      OT$ES: "Personalización de Lectura de Comederos",
    },
    inputTransformation: {
      BR: "Transformação de Insumos",
      AR: "Creación de Premezclas y Transformación de Suministros",
      US: "Input Transformation",
      CA: "Input Transformation",
      MX: "Transformación de Insumos",
      PY: "Transformación de Insumos",
      UY: "Transformación de Insumos",
      BO: "Transformación de Insumos",
      CH: "Transformación de Insumos",
      OT$EN: "Input Transformation",
      OT$ES: "Transformación de Insumos",
    },
    animalHealth: {
      BR: "Saúde Animal",
      AR: "Sanidad Animal",
      US: "Animal Health",
      CA: "Animal Health",
      MX: "Sanidad Animal",
      PY: "Sanidad Animal",
      UY: "Sanidad Animal",
      BO: "Sanidad Animal",
      CH: "Sanidad Animal",
      OT$EN: "Animal Health",
      OT$ES: "Sanidad Animal",
    },
    animalHealthbasic: {
      BR: "Saúde Animal Básica",
      AR: "Salud Animal Básica",
      US: "Basic Animal Health",
      CA: "Basic Animal Health",
      MX: "Salud Animal Básica",
      PY: "Salud Animal Básica",
      UY: "Salud Animal Básica",
      BO: "Salud Animal Básica",
      CH: "Salud Animal Básica",
      OT$EN: "Basic Animal Health",
      OT$ES: "Salud Animal Básica",
    },
    animalHealthadvanced: {
      BR: "Saúde Animal Avançada",
      AR: "Salud Animal Avanzada",
      US: "Advanced Animal Health",
      CA: "Advanced Animal Health",
      MX: "Salud Animal Avanzada",
      PY: "Salud Animal Avanzada",
      UY: "Salud Animal Avanzada",
      BO: "Salud Animal Avanzada",
      CH: "Salud Animal Avanzada",
      OT$EN: "Advanced Animal Health",
      OT$ES: "Salud Animal Avanzada",
    },
    animalHealthChute: {
      BR: "Saúde Animal no Tronco",
      AR: "Salud Animal y Trabajo de Manga",
      US: "Animal Health in Chute",
      CA: "Animal Health in Chute",
      MX: "Salud Animal y Trabajo de Manga",
      PY: "Salud Animal y Trabajo de Manga",
      UY: "Salud Animal y Trabajo de Manga",
      BO: "Salud Animal y Trabajo de Manga",
      CH: "Salud Animal y Trabajo de Manga",
      OT$EN: "Animal Health in Chute",
      OT$ES: "Salud Animal y Trabajo de Manga",
    },
    AnimalHealthbasic: {
      BR: "Saúde Animal Básico",
      AR: "Sanidad Animal Básica",
      US: "Animal Health Basic",
      CA: "Animal Health Basic",
      MX: "Sanidad Animal Básica",
      PY: "Sanidad Animal Básica",
      UY: "Sanidad Animal Básica",
      BO: "Sanidad Animal Básica",
      CH: "Sanidad Animal Básica",
      OT$EN: "Animal Health Basic",
      OT$ES: "Sanidad Animal Básica",
    },
    AnimalHealthadvanced: {
      BR: "Saúde Animal Avançado",
      AR: "Sanidad Animal Avanzada",
      US: "Animal Health Advanced",
      CA: "Animal Health Advanced",
      MX: "Sanidad Animal Avanzada",
      PY: "Sanidad Animal Avanzada",
      UY: "Sanidad Animal Avanzada",
      BO: "Sanidad Animal Avanzada",
      CH: "Sanidad Animal Avanzada",
      OT$EN: "Animal Health Advanced",
      OT$ES: "Sanidad Animal Avanzada",
    },
    chute: {
      BR: "Tronco",
      AR: "Manga e Integración con Lector de Caravana",
      US: "Chute",
      CA: "Chute",
      MX: "Manga",
      PY: "Manga",
      UY: "Manga e Integración con Lector de Caravana",
      BO: "Manga",
      CH: "Manga Completa",
      OT$EN: "Chute",
      OT$ES: "Manga",
    },
    chuteCattleIn: {
      BR: "Tronco de Entrada",
      AR: "Manga de Entrada",
      US: "Chute Cattle In",
      CA: "Chute Cattle In",
      MX: "Manga de Entrada",
      PY: "Manga de Entrada",
      UY: "Manga de Entrada",
      BO: "Manga de Entrada",
      CH: "Manga de Entrada",
      OT$EN: "Chute Cattle In",
      OT$ES: "Manga de Entrada",
    },
    chuteNewOrder: {
      BR: "Tronco de Nova Ordem",
      AR: "Creación de Órdenes de Manga",
      US: "Chute New Order",
      CA: "Chute New Order",
      MX: "Creación de Órdenes de Manga",
      PY: "Creación de Órdenes de Manga",
      UY: "Creación de Órdenes de Manga",
      BO: "Creación de Órdenes de Manga",
      CH: "Creación de Órdenes de Manga",
      OT$EN: "Chute New Order",
      OT$ES: "Creación de Órdenes de Manga",
    },
     chuteQuickStart: {
      BR: "Tronco de Início Rápido",
      AR: "Manga de Inicio Rápido",
      US: "Chute Quick Start",
      CA: "Chute Quick Start",
      MX: "Manga de Inicio Rápido",
      PY: "Manga de Inicio Rápido",
      UY: "Manga de Inicio Rápido",
      BO: "Manga de Inicio Rápido",
      CH: "Manga de Inicio Rápido",
      OT$EN: "Chute Quick Start",
      OT$ES: "Manga de Inicio Rápido",
    },
    EIDIntegration: {
      BR: "Integração de Leitores de Bretes",
      AR: "Integración de Lector de Caravanas",
      US: "EID Integration",
      CA: "EID Integration",
      MX: "Integración de Lector de Caravanas",
      PY: "Integración de Lector de Caravanas",
      UY: "Integración de Lector de Caravanas",
      BO: "Integración de Lector de Caravanas",
      CH: "Integración de Lector de Caravanas",
      OT$EN: "EID Integration",
      OT$ES: "Integración de Lector de Caravanas",
    },
    customFeeder: {
      BR: "Módulo Bôitel",
      AR: "Módulo Hotelería",
      US: "Custom Feeder Add On",
      CA: "Custom Feeder Add On",
      MX: "Módulo Hotelería",
      PY: "Módulo Hotelería",
      UY: "Módulo Hotelería",
      BO: "Módulo Hotelería",
      CH: "Módulo Hotelería",
      OT$EN: "Custom Feeder Add On",
      OT$ES: "Módulo Hotelería",
    },

    billing: {
      BR: "Demonstrativos",
      AR: "Liquidación",
      US: "Billing",
      CA: "Billing",
      MX: "Liquidación",
      PY: "Liquidación",
      UY: "Liquidación",
      BO: "Liquidación",
      CH: "Liquidación",
      OT$EN: "Billing",
      OT$ES: "Liquidación",
    },
    accountManagement: {
      BR: "Gestão de Contas",
      AR: "Gestión de Cuentas",
      US: "Account Management",
      CA: "Account Management",
      MX: "Gestión de Cuentas",
      PY: "Gestión de Cuentas",
      UY: "Gestión de Cuentas",
      BO: "Gestión de Cuentas",
      CH: "Gestión de Cuentas",
      OT$EN: "Account Management",
      OT$ES: "Gestión de Cuentas",
    },
    marginsReport: {
      BR: "Relatório de Margens e Lucros",
      AR: "Reporte de Márgenes y Ganancias",
      US: "Margins and Profits Report",
      CA: "Margins and Profits Report",
      MX: "Reporte de Márgenes y Ganancias",
      PY: "Reporte de Márgenes y Ganancias",
      UY: "Reporte de Márgenes y Ganancias",
      BO: "Reporte de Márgenes y Ganancias",
      CH: "Reporte de Márgenes y Ganancias",
      OT$EN: "Margins and Profits Report",
      OT$ES: "Reporte de Márgenes y Ganancias",
    },
    truckScalesIntegration: {
      BR: "Integração com Balanças de Caminhões",
      AR: "Integración con Balanzas de Camiones",
      US: "Truck Scales Integration",
      CA: "Truck Scales Integration",
      MX: "Integración con Balanzas de Camiones",
      PY: "Integración con Balanzas de Camiones",
      UY: "Integración con Balanzas de Camiones",
      BO: "Integración con Balanzas de Camiones",
      CH: "Integración con Balanzas de Camiones",
      OT$EN: "Truck Scales Integration",
      OT$ES: "Integración con Balanzas de Camiones",
    },
    dumpBoxIntegration: {
      BR: "Integração com misturador estacionário de doble descarga",
      AR: "Integración con mixer estático de doble descarga",
      US: "Dump Box Integration",
      CA: "Dump Box Integration",
      MX: "Integración con mixer estático de doble descarga",
      PY: "Integración con mixer estático de doble descarga",
      UY: "Integración con mixer estático de doble descarga",
      BO: "Integración con mixer estático de doble descarga",
      CH: "Integración con mixer estático de doble descarga",
      OT$EN: "Dump Box Integration",
      OT$ES: "Integración con mixer estático de doble descarga",
    },
    MicroMachineIntegration: {
      BR: "Integração com Micro Máquina",
      AR: "Integración con Micro Máquina",
      US: "Micro Machine Integration",
      CA: "Micro Machine Integration",
      MX: "Integración con Micro Máquina",
      PY: "Integración con Micro Máquina",
      UY: "Integración con Micro Máquina",
      BO: "Integración con Micro Máquina",
      CH: "Integración con Micro Máquina",
      OT$EN: "Micro Machine Integration",
      OT$ES: "Integración con Micro Máquina",
    },
    MicroingredientesManagement: {
      BR: "Gestão de Ingredientes",
      AR: "Gestión de Ingredientes",
      US: "Microingredientes Management",
      CA: "Microingredientes Management",
      MX: "Gestión de Ingredientes",
      PY: "Gestión de Ingredientes",
      UY: "Gestión de Ingredientes",
      BO: "Gestión de Ingredientes",
      CH: "Gestión de Ingredientes",
      OT$EN: "Microingredientes Management",
      OT$ES: "Gestión de MicroIngredientes",
    },

    AutoAdjust: {
      BR: "Ajuste Automático de Ordens de Entrega",
      AR: "Corrección por Desvíos de Entrega",
      US: "Drop Order auto adjust",
      CA: "Drop Order auto adjust",
      MX: "Auto Ajuste de Órdenes de Entrega",
      PY: "Auto Ajuste de Órdenes de Entrega",
      UY: "Auto Ajuste de Órdenes de Entrega",
      BO: "Auto Ajuste de Órdenes de Entrega",
      CH: "Auto Ajuste de Órdenes de Entrega",
      OT$EN: "Drop Order auto adjust",
      OT$ES: "Auto Ajuste de Órdenes de Entrega",
    },  
    
    GrainBank: {
      BR: "Grain Bank",
      AR: "Grain Bank",
      US: "Grain Bank",
      CA: "Grain Bank",
      MX: "Grain Bank",
      PY: "Grain Bank",
      UY: "Grain Bank",
      BO: "Grain Bank",
      CH: "Grain Bank",
      OT$EN: "Grain Bank",
      OT$ES: "Grain Bank",
    },  
    purchases: {
      BR: "Compras",
      AR: "Registro de Compras de Insumos",
      US: "Purchases",
      CA: "Purchases",
      MX: "Compras",
      PY: "Compras",
      UY: "Compras",
      BO: "Compras",
      CH: "Compras",
      OT$EN: "Purchases",
      OT$ES: "Compras",
    },
    AdvancedInventory: {
      BR: "Inventario Avançado",
      AR: "Inventario Avanzado",
      US: "Advanced Inventory",
      CA: "Advanced Inventory",
      MX: "Inventario Avanzado",
      PY: "Inventario Avanzado",
      UY: "Inventario Avanzado",
      BO: "Inventario Avanzado",
      CH: "Inventario Avanzado",
      OT$EN: "Advanced Inventory",
      OT$ES: "Inventario Avanzado",
    },  
      clientUsers: {
        BR: "Extra Usuário Clients",
        AR: "Extra Usuario Clientes",
        US: "Extra User Clients",
        CA: "Extra User Clients",
        MX: "Extra Usuario Clientes",
        PY: "Extra Usuario Clientes",
        UY: "Extra Usuario Clientes",
        BO: "Extra Usuario Clients",
        CH: "Extra Usuario Clientes",
        OT$EN: "Extra User Clients",
        OT$ES: "Extra Usuario Clients",
      },  
      analytics: {
        BR: "Análise de Dados",
        AR: "Análisis de Datos",
        US: "Analytics",
        CA: "Analytics",
        MX: "Análisis de Datos",
        PY: "Análisis de Datos",    
        UY: "Análisis de Datos",
        BO: "Análisis de Datos",
        CH: "Análisis de Datos",
        OT$EN: "Analytics",
        OT$ES: "Análisis de Datos",
      },
      informeCuota481: {
        BR: "Informes Cuota 481",
        AR: "Informes Cuota 481",
        US: "Cuota 481 Reports",
        CA: "Cuota 481 Reports",
        MX: "Informes Cuota 481",
        PY: "Informes Cuota 481",
        UY: "Informes Cuota 481",
        BO: "Informes Cuota 481",
        CH: "Informes Cuota 481",
        OT$EN: "Cuota 481 Reports",
        OT$ES: "Informes Cuota 481",
      },  
      pastureManagementBasic: {
        BR: "Pasture Management Basic",
        AR: "Manejo de Pasturas Básico",
        US: "Pasture Management Basic",
        CA: "Pasture Management Basic",
        MX: "Manejo de Pasturas Básico",
        PY: "Manejo de Pasturas Básico",
        UY: "Manejo de Pasturas Básico",
        BO: "Manejo de Pasturas Básico",
        CH: "Manejo de Pasturas Básico",
        OT$EN: "Pasture Management Basic",
        OT$ES: "Manejo de Pasturas Básico",
      },  
      pastureManagementAdvanced: {
        BR: "Pasture Management Advanced",
        AR: "Manejo de Pasturas Avanzado",
        US: "Pasture Management Advanced",
        CA: "Pasture Management Advanced",
        MX: "Manejo de Pasturas Avanzado",
        PY: "Manejo de Pasturas Avanzado",
        UY: "Manejo de Pasturas Avanzado",
        BO: "Manejo de Pasturas Avanzado",
        CH: "Manejo de Pasturas Avanzado",
        OT$EN: "Pasture Management Advanced",
        OT$ES: "Manejo de Pasturas Avanzado",
      },    
      cowCalfBasic: {
        BR: "Cow Calf Basic",
        AR: "Manejo de Crías y Recría Básico",
        US: "Cow Calf Basic",
        CA: "Cow Calf Basic",
        MX: "Manejo de Crías y Recría Básico",
        PY: "Manejo de Crías y Recría Básico",
        UY: "Manejo de Crías y Recría Básico",
        BO: "Cow Calf Basic",
        CH: "Manejo de Crías y Recría Básico",
        OT$EN: "Cow Calf Basic",
        OT$ES: "Manejo de Crías y Recría Básico",
      },  
      cowCalfAdvanced: {  
        BR: "Cow Calf Advanced",
        AR: "Manejo de Crías y Recría Avanzado",
        US: "Cow Calf Advanced",
        CA: "Cow Calf Advanced",
        MX: "Manejo de Crías y Recría Avanzado",
        PY: "Manejo de Crías y Recría Avanzado",
        UY: "Manejo de Crías y Recría Avanzado",
        BO: "Manejo de Crías y Recría Avanzado",
        CH: "Manejo de Crías y Recría Avanzado",
        OT$EN: "Cow Calf Advanced",
        OT$ES: "Manejo de Crías y Recría Avanzado",
      },
    comingSoon: {
      BR: "Proximamente",
      AR: "Próximamente",
      US: "Coming Soon",
      CA: "Coming Soon",
      MX: "Próximamente",
      PY: "Próximamente",
      UY: "Próximamente",
      BO: "Próximamente",
      CH: "Próximamente",
      OT$EN: "Coming Soon",
      OT$ES: "Próximamente",
    },
  };

  return translations[featureKey]?.[country] || translations[featureKey]?.["OT$EN"] || featureKey;
}

// Helper functions to get pens and users dynamically
function getPensForPlan(selectedCountry: string, planNumber: number): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  
  switch (planNumber) {
    case 1:
      return countryPrices.plan1pens;
    case 2:
      return countryPrices.plan2pens;
    case 3:
      return countryPrices.plan3pens;
    case 4:
      return countryPrices.plan4pens;
    default:
      return 0;
  }
}

function getUsersForPlan(selectedCountry: string, planNumber: number): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  
  switch (planNumber) {
    case 1:
      return countryPrices.plan1users;
    case 2:
      return countryPrices.plan2users;
    case 3:
      return countryPrices.plan3users;
    case 4:
      return countryPrices.plan4usesr; // Note: there's a typo in the original data
    default:
      return 0;
  }
}

// Main function to get features for a specific country
export function getFeaturesForCountry(selectedCountry: Country, t: (key: string) => string): Omit<Feature, "country">[] {
  // Get the feature configuration for the country, fallback to US if not found
  const countryConfig = FEATURE_CONFIG[selectedCountry] || FEATURE_CONFIG.US;
  
  // Helper function to process feature values
  const processFeatureValue = (featureKey: string, planKey: string, value: any): any => {
    if (value === "addon") {
      // Return addon price for this feature
      switch (featureKey) {
        case "advancedFeeding":
          return `+${formatPrice(getAdvancedFeedingPrice(selectedCountry), selectedCountry)}`;
        case "inputTransformation":
          return `+${formatPrice(getInputTransformationPrice(selectedCountry), selectedCountry)}`;
        case "animalHealth":
          return `+${formatPrice(getAnimalHealthPrice(selectedCountry), selectedCountry)}`;
        case "AnimalHealthbasic":
          return `+${formatPrice(getAnimalHealthBasicPrice(selectedCountry), selectedCountry)}`;
        case "AnimalHealthadvanced":
          return `+${formatPrice(getAnimalHealthAdvancedPrice(selectedCountry), selectedCountry)}`;
        case "AnimalHealthChute":
          return `+${formatPrice(getAnimalHealthChutePrice(selectedCountry), selectedCountry)}`;
        case "chute":
          return `+${formatPrice(getChutePrice(selectedCountry), selectedCountry)}`;
        case "chuteQuickStart":
          return `+${formatPrice(getchutequickstartPrice(selectedCountry), selectedCountry)}`;
        case "chuteCattleIn":
          return `+${formatPrice(getchutecattleinPrice(selectedCountry), selectedCountry)}`;
        case "chuteNewOrder":
          return `+${formatPrice(getchuteneworderPrice(selectedCountry), selectedCountry)}`;
        case "EIDIntegration":
          return `+${formatPrice(getEIDIntegrationPrice(selectedCountry), selectedCountry)}`;
        case "customFeeder":
          return `+${formatPrice(getCustomFeederPrice(selectedCountry), selectedCountry)}`;
        case "clientUsers":
          return `+${formatPrice(getClientUsersPrice(selectedCountry), selectedCountry)}`;
         case "MicroMachineIntegration":
          return `+${formatPrice(getMicroMachineIntegrationPrice(selectedCountry), selectedCountry)}`;
        case "MicroingredientesManagement":
          return `+${formatPrice(getMicroingredientesManagementPrice(selectedCountry), selectedCountry)}`;
        case "marketValueReport":
          return `+${formatPrice(getMarketValueReportPrice(selectedCountry), selectedCountry)}`;
        case "truckScaleIntegration":
          return `+${formatPrice(getTruckScaleIntegrationPrice(selectedCountry), selectedCountry)}`;
        case "dumpBoxIntegration":
          return `+${formatPrice(getDumpBoxIntegrationPrice(selectedCountry), selectedCountry)}`;
        case "BunkcoreCustomization":
          return `+${formatPrice(getBunkcoreCustomizationPrice(selectedCountry), selectedCountry)}`;
        case "GrainBank":
          return `+${formatPrice(getGrainBankPrice(selectedCountry), selectedCountry)}`;
        case "AutoAdjust":
          return `+${formatPrice(getAutoAdjustPrice(selectedCountry), selectedCountry)}`;
        case "FeedingAutomation":
          return `+${formatPrice(getFeedingAutomationPrice(selectedCountry), selectedCountry)}`;
        case "feedingProtocols":
          return `+${formatPrice(getFeedingProtocolsPrice(selectedCountry), selectedCountry)}`;
        case "purchases":
          return `+${formatPrice(getPurchasesPrice(selectedCountry), selectedCountry)}`;
        case "AdvancedInventory":
          return `+${formatPrice(getadvancedinventoryPrice(selectedCountry), selectedCountry)}`;
        case "billing":
          return `+${formatPrice(getBillingPrice(selectedCountry), selectedCountry)}`;
        case "BunkScoreCustomization":
          return `+${formatPrice(getBunkcoreCustomizationPrice(selectedCountry), selectedCountry)}`;
          case "analytics":
            return `+${formatPrice(getAnalyticsPrice(selectedCountry), selectedCountry)}`;
        case "informeCuota481":
          return `+${formatPrice(getInformeCuota481Price(selectedCountry), selectedCountry)}`;
        case "pastureManagementBasic":
          return `+${formatPrice(getPastureManagementBasicPrice(selectedCountry), selectedCountry)}`;
        case "pastureManagementAdvanced":
          return `+${formatPrice(getPastureManagementAdvancedPrice(selectedCountry), selectedCountry)}`;
        case "cowCalfBasic":
          return `+${formatPrice(getCowCalfBasicPrice(selectedCountry), selectedCountry)}`;
        case "cowCalfAdvanced":
          return `+${formatPrice(getCowCalfAdvancedPrice(selectedCountry), selectedCountry)}`;
        default:
            return value;}
      
    } else if (value === "comingSoon") {
      return { type: "comingSoon", text: getLocalizedFeatureName("comingSoon", selectedCountry) };
    }
    return value;
  };

  // Helper function to create a feature object
  const createFeature = (featureKey: string, config: any): Omit<Feature, "country"> => {
    const feature: Omit<Feature, "country"> = {
      name: getFeatureName(featureKey, selectedCountry, t),
      plan1: processFeatureValue(featureKey, "plan1", config.plan1),
      plan2: processFeatureValue(featureKey, "plan2", config.plan2),
      plan3: processFeatureValue(featureKey, "plan3", config.plan3),
      plan4: processFeatureValue(featureKey, "plan4", config.plan4),
    };

    // Add optional properties
    if (config.isAddOn) feature.isAddOn = config.isAddOn;
    if (config.isExpandable) feature.isExpandable = config.isExpandable;
    if (config.isCustomFeeder) feature.isCustomFeeder = config.isCustomFeeder;
    if (config.comingSoon) feature.comingSoon = config.comingSoon;
    if (config.expandedByDefault) feature.expandedByDefault = config.expandedByDefault;

    // Process subFeatures if they exist
    if (config.subFeatures) {
      feature.subFeatures = config.subFeatures.map((subFeature: any) => ({
        name: getLocalizedFeatureName(subFeature.name, selectedCountry),
        plan1: processFeatureValue(subFeature.name, "plan1", subFeature.plan1),
        plan2: processFeatureValue(subFeature.name, "plan2", subFeature.plan2),
        plan3: processFeatureValue(subFeature.name, "plan3", subFeature.plan3),
        plan4: processFeatureValue(subFeature.name, "plan4", subFeature.plan4),
      }));
    }

    return feature;
  };

  // Helper function to get feature name
  const getFeatureName = (featureKey: string, country: Country, t: (key: string) => string): string => {
    switch (featureKey) {
      case "feeding":
        return t("feeding");
      case "yardsheet":
        return getLocalizedFeatureName("yardsheet", country);
      case "cattleManagement":
        return t("cattleManagement");
      case "suppliesInventory":
        return t("suppliesInventory");
      case "suppliesQuantity":
        return getLocalizedFeatureName("suppliesQuantity", country);
      case "rationManagement":
        return t("rationManagement");
      case "rationQuantity":
        return getLocalizedFeatureName("rationQuantity", country);
      case "penRider":
        return getLocalizedFeatureName("penRider", country);
      case "reports":
        return getLocalizedFeatureName("reports", country);
      case "advancedFeeding":
        return getLocalizedFeatureName("advancedFeeding", country);
      case "inputTransformation":
        return getLocalizedFeatureName("inputTransformation", country);
      case "animalHealth":
        return getLocalizedFeatureName("animalHealth", country);
      case "AnimalHealthbasic":
        return getLocalizedFeatureName("animalHealthbasic", country);
      case "AnimalHealthadvanced":
        return getLocalizedFeatureName("animalHealthadvanced", country);
      case "AnimalHealthChute":
        return getLocalizedFeatureName("animalHealthChute", country);
      case "chute":
        return getLocalizedFeatureName("chute", country);
      case "chuteQuickStart":
        return getLocalizedFeatureName("chuteQuickStart", country);
      case "chuteCattleIn":
        return getLocalizedFeatureName("chuteCattleIn", country);
      case "chuteNewOrder":
        return getLocalizedFeatureName("chuteNewOrder", country);
      case "EIDIntegration":
        return getLocalizedFeatureName("EIDIntegration", country);
      case "customFeeder":
        return getLocalizedFeatureName("customFeeder", country);
      case "truckScalesIntegration":
        return getLocalizedFeatureName("truckScalesIntegration", country);
      case "dumpBoxIntegration":
        return getLocalizedFeatureName("dumpBoxIntegration", country);
      case "MicroMachineIntegration":
        return getLocalizedFeatureName("MicroMachineIntegration", country);
      case "BunkScoreCustomization":
        return getLocalizedFeatureName("BunkScoreCustomization", country);
      case "MicroingredientesManagement":
        return getLocalizedFeatureName("MicroingredientesManagement", country);
      case "GrainBank":
        return getLocalizedFeatureName("GrainBank", country);
      case "AutoAdjust":
        return getLocalizedFeatureName("AutoAdjust", country);
      case "FeedingAutomation":
        return getLocalizedFeatureName("FeedingAutomation", country);      
      case "feedingProtocols":
        return getLocalizedFeatureName("feedingProtocols", country);
      case "purchases":
        return getLocalizedFeatureName("purchases", country);
      case "AdvancedInventory":
        return getLocalizedFeatureName("AdvancedInventory", country);
      case "billing":
        return getLocalizedFeatureName("billing", country);
        case "clientUsers":
          return getLocalizedFeatureName("clientUsers", country);
        case "analytics":
            return getLocalizedFeatureName("analytics", country);
        case "informeCuota481":
          return getLocalizedFeatureName("informeCuota481", country);
        case "pastureManagementBasic":
          return getLocalizedFeatureName("pastureManagementBasic", country);
        case "pastureManagementAdvanced":
          return getLocalizedFeatureName("pastureManagementAdvanced", country);
        case "cowCalfBasic":
          return getLocalizedFeatureName("cowCalfBasic", country);
        case "cowCalfAdvanced":
          return getLocalizedFeatureName("cowCalfAdvanced", country);
        default:
        return featureKey;

      
    }
  };

  // Build the features array
  const features: Omit<Feature, "country">[] = [
    // Pens and Users (always dynamic)
    {
      name: `${t("pens")} ${getLocalizedFeatureName("pensIncluded", selectedCountry)}`,
      plan1: getPensForPlan(selectedCountry, 1).toString(),
      plan2: getPensForPlan(selectedCountry, 2).toString(),
      plan3: getPensForPlan(selectedCountry, 3).toString(),
      plan4: getPensForPlan(selectedCountry, 4).toString(), isExpandable: true, expandedByDefault: true, subFeatures: [
      {
        name: getLocalizedFeatureName("extraPen", selectedCountry),
        plan1: `+${formatPrice(getExtraPenPrice(selectedCountry), selectedCountry)}`,
        plan2: `+${formatPrice(getExtraPenPrice(selectedCountry), selectedCountry)}`,
        plan3: `+${formatPrice(getExtraPenPrice(selectedCountry), selectedCountry)}`,
        plan4: `+${formatPrice(getExtraPenPrice(selectedCountry), selectedCountry)}`,
      },
    ]
      },
    { 
      name: t("users"), 
      plan1: getUsersForPlan(selectedCountry, 1).toString(), 
      plan2: getUsersForPlan(selectedCountry, 2).toString(), 
      plan3: getUsersForPlan(selectedCountry, 3).toString(), 
      plan4: getUsersForPlan(selectedCountry, 4).toString() , isExpandable: true, expandedByDefault: true, subFeatures: [
      {
        name: getLocalizedFeatureName("extraUser", selectedCountry),
        plan1: `+${formatPrice(getExtraUserPrice(selectedCountry), selectedCountry)}`,
        plan2: `+${formatPrice(getExtraUserPrice(selectedCountry), selectedCountry)}`,
        plan3: `+${formatPrice(getExtraUserPrice(selectedCountry), selectedCountry)}`,
        plan4: `+${formatPrice(getExtraUserPrice(selectedCountry), selectedCountry)}`,
      },
    ]
    },
  
  ];

  // Add dynamic features from configuration
  Object.entries(countryConfig).forEach(([featureKey, config]) => {
    features.push(createFeature(featureKey, config));
  });

  return features;
} 