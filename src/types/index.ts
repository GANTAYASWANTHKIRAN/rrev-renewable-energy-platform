export type UserRole = 'guest' | 'customer' | 'admin';

export type CustomerCategory = 'home' | 'farmer' | 'school' | 'healthcare' | 'business';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  customerType: CustomerCategory;
  village: string;
  mandal?: string;
  district: string;
  state: string;
  preferredPackageId: string;
  joinedDate: string;
  activeSubscriptionId?: string;
  notes?: string;
}

export interface BatteryPackage {
  id: string;
  name: string;
  category: 'home' | 'farm' | 'commercial';
  nominalKwh: number;
  usableDoD: number; // e.g. 0.8 for 80%
  inverterEfficiency: number; // e.g. 0.9 for 90%
  maxContinuousWatts: number;
  peakSurgeWatts: number;
  nominalVoltage: number;
  chemistry: string;
  weightKg: number;
  formFactor: string;
  outdoorRating: string;
  description: string;
  suitableUseCases: string[];
  sampleScenarioName: string;
  sampleScenarioLoadWatts: number;
  sampleScenarioEstimatedHours: number;
  sampleScenarioCaveat: string;
  isPrototype: boolean;
  baseMonthlyPriceINR: number;
  baseYearlyPriceINR: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  category: 'home' | 'farm' | 'commercial';
  packageId: string;
  monthlyPriceINR: number;
  yearlyPriceINR: number;
  monthlyIncludedSwaps: number;
  yearlyIncludedSwaps: number;
  additionalSwapPriceINR: number;
  serviceAreaEligibility: string[];
  supportLevel: string;
  usageLimits: string;
  isPilotAssumption: boolean;
  description: string;
  popular?: boolean;
}

export interface CustomerSubscription {
  id: string;
  userId: string;
  planId: string;
  packageId: string;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'pending' | 'suspended';
  startDate: string;
  renewalDate: string;
  includedSwaps: number;
  usedSwaps: number;
  remainingSwaps: number;
  pricePaidINR: number;
}

export type BatteryStatus = 
  | 'available' 
  | 'charging' 
  | 'reserved' 
  | 'in_use' 
  | 'maintenance' 
  | 'unavailable';

export interface BatteryItem {
  id: string;
  packageId: string;
  category: 'home' | 'farm' | 'commercial';
  nominalKwh: number;
  stateOfChargePct: number;
  status: BatteryStatus;
  assignedHubLocation: string;
  assignedCustomerId?: string;
  healthPct: number;
  cycleCount: number;
  temperatureCelsius: number;
  compatibilityNotes: string;
  lastUpdated: string;
}

export type SwapRequestStatus = 'pending' | 'approved_dispatched' | 'completed' | 'cancelled' | 'rejected';

export interface SwapRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerVillage: string;
  district: string;
  packageCategory: 'home' | 'farm' | 'commercial';
  preferredTimeSlot: string;
  deliveryMode: 'hub_pickup' | 'doorstep_delivery';
  status: SwapRequestStatus;
  requestDate: string;
  completedDate?: string;
  notes?: string;
  assignedBatteryId?: string;
  returnedBatteryId?: string;
  adminNotes?: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  village: string;
  category: 'technical' | 'billing' | 'battery_damage' | 'swap_inquiry' | 'general';
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  adminResponse?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  villageOrTown: string;
  district: string;
  state: string;
  customerType: CustomerCategory;
  interestedPackage: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'pilot_waitlist';
}
