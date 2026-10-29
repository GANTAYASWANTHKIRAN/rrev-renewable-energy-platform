import { 
  BatteryPackage, 
  SubscriptionPlan, 
  BatteryItem, 
  UserProfile, 
  CustomerSubscription, 
  SwapRequest, 
  SupportTicket, 
  ContactInquiry 
} from '../types';

export const INITIAL_PACKAGES: BatteryPackage[] = [
  {
    id: 'pkg-home-25',
    name: 'RREV HomePack 2.5',
    category: 'home',
    nominalKwh: 2.5,
    usableDoD: 0.8, // 80% usable depth of discharge = 2.0 kWh usable
    inverterEfficiency: 0.9, // 90% inverter efficiency = 1.8 kWh net delivered
    maxContinuousWatts: 1500,
    peakSurgeWatts: 2500,
    nominalVoltage: 48,
    chemistry: 'Lithium Iron Phosphate (LiFePO4)',
    weightKg: 28,
    formFactor: 'Wall-mounted compact enclosure with handle',
    outdoorRating: 'IP55 sheltered outdoor / indoor',
    description: 'Designed for rural households, schools, and small shops to maintain continuous lighting, ceiling fans, mobile charging, Wi-Fi, and small television during grid outages.',
    suitableUseCases: [
      '3-4 LED lights (40W total)',
      '2 BLDC ceiling fans (60W total)',
      'Smartphone charging & Wi-Fi router (25W)',
      'Small LED TV or laptop (65W)',
      'Critical medical equipment / nebulizer backup'
    ],
    sampleScenarioName: 'Typical Evening Domestic Load (190W)',
    sampleScenarioLoadWatts: 190,
    sampleScenarioEstimatedHours: 9.5, // 2000Wh usable * 0.9 / 190W = 9.47 hrs
    sampleScenarioCaveat: 'Estimate based on 80% usable capacity and 90% inverter efficiency under nominal ambient temperature. Actual runtime varies with connected equipment wattage, power factor, battery age, and temperature.',
    isPrototype: true,
    baseMonthlyPriceINR: 799,
    baseYearlyPriceINR: 7990
  },
  {
    id: 'pkg-farm-30',
    name: 'RREV AgriPack 3.0',
    category: 'farm',
    nominalKwh: 3.0,
    usableDoD: 0.8, // 80% DoD = 2.4 kWh usable
    inverterEfficiency: 0.9, // 90% inverter efficiency = 2.16 kWh delivered
    maxContinuousWatts: 2200,
    peakSurgeWatts: 3800,
    nominalVoltage: 48,
    chemistry: 'High-Cycle Rugged LiFePO4',
    weightKg: 34,
    formFactor: 'Trolley-mounted ruggedized mobile cart with all-terrain pneumatic wheels',
    outdoorRating: 'IP65 dust-tight and water-jet resistant',
    description: 'Engineered for farmers in Andhra Pradesh and Telangana to operate compatible agricultural machinery, micro-irrigation pumps, sprayer pumps, and farm-shed processing equipment.',
    suitableUseCases: [
      '1 HP energy-efficient agricultural monoblock/submersible pump (check motor starting current)',
      'Horticultural drip irrigation booster systems',
      'Solar-coupled battery charging during daytime',
      'Electric knapsack sprayer high-throughput recharging',
      'Farmyard night illumination and electric fencing energizers'
    ],
    sampleScenarioName: '1 HP Agricultural Pump (900W Electrical Load)',
    sampleScenarioLoadWatts: 900,
    sampleScenarioEstimatedHours: 2.4, // (3000Wh * 0.80 * 0.90) / 900W = 2160 / 900 = 2.4 hours
    sampleScenarioCaveat: 'Illustrative planning scenario only. Based on an assumed 900W electrical input at 80% usable battery energy and 90% inverter efficiency. Actual pump starting inrush current, motor efficiency factor, pumping depth/head, pipe friction, and inverter ratings must be verified on-site by an RREV technician before commissioning.',
    isPrototype: true,
    baseMonthlyPriceINR: 1499,
    baseYearlyPriceINR: 14990
  },
  {
    id: 'pkg-comm-50',
    name: 'RREV CommunityPro 5.0',
    category: 'commercial',
    nominalKwh: 5.0,
    usableDoD: 0.85,
    inverterEfficiency: 0.92,
    maxContinuousWatts: 3600,
    peakSurgeWatts: 5500,
    nominalVoltage: 48,
    chemistry: 'Commercial-Grade LiFePO4',
    weightKg: 52,
    formFactor: 'Modular roll-in station cart with quick-disconnect terminal',
    outdoorRating: 'IP65 rated',
    description: 'Designed for rural primary healthcare clinics (vaccine cold chain), rural schools, milk collection centers, and small flour/spice mills.',
    suitableUseCases: [
      'Primary Health Centre vaccine refrigerator & clinic lights',
      'Rural digital classroom (projector, 5 laptops, lights, fans)',
      'Village milk collection center chiller & testing units',
      'Small commercial welding / tailoring shop machines'
    ],
    sampleScenarioName: 'Clinic Essential Cold-Chain & Lighting (450W)',
    sampleScenarioLoadWatts: 450,
    sampleScenarioEstimatedHours: 8.7,
    sampleScenarioCaveat: 'Prototype specification. Intended for institutional pilot evaluation. Commercial inverter certification and load compatibility testing mandatory prior to deployment.',
    isPrototype: true,
    baseMonthlyPriceINR: 2499,
    baseYearlyPriceINR: 24990
  }
];

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-home-essential',
    name: 'Home Essential',
    category: 'home',
    packageId: 'pkg-home-25',
    monthlyPriceINR: 799,
    yearlyPriceINR: 7990,
    monthlyIncludedSwaps: 4,
    yearlyIncludedSwaps: 48,
    additionalSwapPriceINR: 120,
    serviceAreaEligibility: [
      'Kurnool District (AP)', 
      'Anantapur District (AP)', 
      'Warangal Rural (TS)', 
      'Nalgonda District (TS)'
    ],
    supportLevel: 'Standard Hub Support (8 AM - 7 PM)',
    usageLimits: 'Max 1 swap per 48 hours unless emergency override requested. Additional swaps billed at ₹120 each.',
    isPilotAssumption: true,
    description: 'Reliable evening power backup for rural households facing routine load-shedding and unannounced power cuts.',
    popular: true
  },
  {
    id: 'plan-home-plus',
    name: 'Home Plus',
    category: 'home',
    packageId: 'pkg-home-25',
    monthlyPriceINR: 1299,
    yearlyPriceINR: 12990,
    monthlyIncludedSwaps: 8,
    yearlyIncludedSwaps: 96,
    additionalSwapPriceINR: 100,
    serviceAreaEligibility: [
      'Kurnool District (AP)', 
      'Anantapur District (AP)', 
      'Warangal Rural (TS)', 
      'Nalgonda District (TS)',
      'Chittoor Rural (AP)'
    ],
    supportLevel: 'Priority Hub Support & WhatsApp Dispatch',
    usageLimits: 'Flexible swapping schedule. Up to 2 swaps per week included. Doorstep delivery available at pilot hubs.',
    isPilotAssumption: true,
    description: 'Ideal for larger joint-family homes, student study centers, and home-based micro-enterprises requiring frequent fresh batteries.'
  },
  {
    id: 'plan-farm-essential',
    name: 'Farm Essential',
    category: 'farm',
    packageId: 'pkg-farm-30',
    monthlyPriceINR: 1499,
    yearlyPriceINR: 14990,
    monthlyIncludedSwaps: 6,
    yearlyIncludedSwaps: 72,
    additionalSwapPriceINR: 180,
    serviceAreaEligibility: [
      'Chinnatekur cluster (Kurnool)', 
      'Madikonda cluster (Warangal)', 
      'Nakrekal cluster (Nalgonda)'
    ],
    supportLevel: 'Agricultural Field Assistance (6 AM - 8 PM)',
    usageLimits: 'Tailored for irrigation cycles. Up to 6 swaps per month included. Additional swap ₹180.',
    isPilotAssumption: true,
    description: 'Empowers smallholder farmers with portable power for critical 1 HP pump irrigation and crop maintenance.',
    popular: true
  },
  {
    id: 'plan-farm-plus',
    name: 'Farm Plus',
    category: 'farm',
    packageId: 'pkg-farm-30',
    monthlyPriceINR: 2499,
    yearlyPriceINR: 24990,
    monthlyIncludedSwaps: 12,
    yearlyIncludedSwaps: 144,
    additionalSwapPriceINR: 150,
    serviceAreaEligibility: [
      'All designated RREV pilot clusters in AP & Telangana'
    ],
    supportLevel: 'Dedicated Field Technician & Emergency Replacement',
    usageLimits: 'High-frequency farm operations. 12 swaps per month included, scheduled around irrigation rosters.',
    isPilotAssumption: true,
    description: 'Comprehensive farm energy plan for intensive horticultural plots, cash crops, and continuous irrigation needs.'
  }
];

export const INITIAL_BATTERIES: BatteryItem[] = [
  {
    id: 'RREV-BAT-H001',
    packageId: 'pkg-home-25',
    category: 'home',
    nominalKwh: 2.5,
    stateOfChargePct: 98,
    status: 'available',
    assignedHubLocation: 'Kurnool Central Hub #1 (Chinnatekur)',
    healthPct: 99,
    cycleCount: 24,
    temperatureCelsius: 28,
    compatibilityNotes: 'Standard 48V Anderson connector, Wall dock tested',
    lastUpdated: '2026-10-29 08:15'
  },
  {
    id: 'RREV-BAT-H002',
    packageId: 'pkg-home-25',
    category: 'home',
    nominalKwh: 2.5,
    stateOfChargePct: 42,
    status: 'charging',
    assignedHubLocation: 'Kurnool Central Hub #1 (Chinnatekur)',
    healthPct: 97,
    cycleCount: 46,
    temperatureCelsius: 32,
    compatibilityNotes: 'Standard 48V Anderson connector, Solar bay #2',
    lastUpdated: '2026-10-29 08:30'
  },
  {
    id: 'RREV-BAT-H003',
    packageId: 'pkg-home-25',
    category: 'home',
    nominalKwh: 2.5,
    stateOfChargePct: 82,
    status: 'in_use',
    assignedHubLocation: 'Warangal Rural Hub #2 (Madikonda)',
    assignedCustomerId: 'usr-customer-home-1',
    healthPct: 98,
    cycleCount: 38,
    temperatureCelsius: 29,
    compatibilityNotes: 'In service at customer home in Madikonda',
    lastUpdated: '2026-10-29 07:45'
  },
  {
    id: 'RREV-BAT-F101',
    packageId: 'pkg-farm-30',
    category: 'farm',
    nominalKwh: 3.0,
    stateOfChargePct: 96,
    status: 'available',
    assignedHubLocation: 'Kurnool Central Hub #1 (Chinnatekur)',
    healthPct: 100,
    cycleCount: 18,
    temperatureCelsius: 27,
    compatibilityNotes: 'Pneumatic cart verified. Inrush surge capacitor OK for 1 HP pump.',
    lastUpdated: '2026-10-29 08:10'
  },
  {
    id: 'RREV-BAT-F102',
    packageId: 'pkg-farm-30',
    category: 'farm',
    nominalKwh: 3.0,
    stateOfChargePct: 24,
    status: 'in_use',
    assignedHubLocation: 'Kurnool Central Hub #1 (Chinnatekur)',
    assignedCustomerId: 'usr-customer-farm-1',
    healthPct: 96,
    cycleCount: 52,
    temperatureCelsius: 31,
    compatibilityNotes: 'Connected to 1 HP borewell pump in Chinnatekur fields',
    lastUpdated: '2026-10-29 08:22'
  },
  {
    id: 'RREV-BAT-F103',
    packageId: 'pkg-farm-30',
    category: 'farm',
    nominalKwh: 3.0,
    stateOfChargePct: 65,
    status: 'charging',
    assignedHubLocation: 'Nalgonda Agri Hub #1 (Nakrekal)',
    healthPct: 98,
    cycleCount: 33,
    temperatureCelsius: 33,
    compatibilityNotes: 'Charging from 2 kW solar array microgrid',
    lastUpdated: '2026-10-29 08:35'
  },
  {
    id: 'RREV-BAT-F104',
    packageId: 'pkg-farm-30',
    category: 'farm',
    nominalKwh: 3.0,
    stateOfChargePct: 94,
    status: 'available',
    assignedHubLocation: 'Warangal Rural Hub #2 (Madikonda)',
    healthPct: 99,
    cycleCount: 15,
    temperatureCelsius: 27,
    compatibilityNotes: 'Heavy-duty trolley frame, clean terminals',
    lastUpdated: '2026-10-29 08:00'
  },
  {
    id: 'RREV-BAT-H004',
    packageId: 'pkg-home-25',
    category: 'home',
    nominalKwh: 2.5,
    stateOfChargePct: 15,
    status: 'maintenance',
    assignedHubLocation: 'Kurnool Central Hub #1 (Chinnatekur)',
    healthPct: 88,
    cycleCount: 120,
    temperatureCelsius: 26,
    compatibilityNotes: 'Routine BMS firmware recalibration and connector inspection',
    lastUpdated: '2026-10-28 17:00'
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-admin-1',
    name: 'Anil Varma (Operations Lead)',
    email: 'admin@rrev.energy',
    phone: '+91 98480 12345',
    role: 'admin',
    customerType: 'business',
    village: 'Kurnool Town Hub',
    mandal: 'Kurnool Urban',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    preferredPackageId: 'pkg-comm-50',
    joinedDate: '2026-08-01'
  },
  {
    id: 'usr-customer-farm-1',
    name: 'Ramesh Reddy',
    email: 'ramesh.reddy@example.com',
    phone: '+91 94401 88231',
    role: 'customer',
    customerType: 'farmer',
    village: 'Chinnatekur',
    mandal: 'Kallur',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    preferredPackageId: 'pkg-farm-30',
    joinedDate: '2026-09-12',
    activeSubscriptionId: 'sub-cust-farm-1',
    notes: 'Cultivates 4 acres of groundnut and cotton. Uses 1 HP monoblock pump for drip irrigation.'
  },
  {
    id: 'usr-customer-home-1',
    name: 'Lakshmi Devi',
    email: 'lakshmi.devi@example.com',
    phone: '+91 98492 55120',
    role: 'customer',
    customerType: 'home',
    village: 'Madikonda',
    mandal: 'Kazipet',
    district: 'Warangal',
    state: 'Telangana',
    preferredPackageId: 'pkg-home-25',
    joinedDate: '2026-09-20',
    activeSubscriptionId: 'sub-cust-home-1',
    notes: 'Rural household with 2 school-going children. Priority need for evening lighting and study fan.'
  }
];

export const INITIAL_SUBSCRIPTIONS: CustomerSubscription[] = [
  {
    id: 'sub-cust-farm-1',
    userId: 'usr-customer-farm-1',
    planId: 'plan-farm-essential',
    packageId: 'pkg-farm-30',
    billingCycle: 'monthly',
    status: 'active',
    startDate: '2026-10-01',
    renewalDate: '2026-11-01',
    includedSwaps: 6,
    usedSwaps: 2,
    remainingSwaps: 4,
    pricePaidINR: 1499
  },
  {
    id: 'sub-cust-home-1',
    userId: 'usr-customer-home-1',
    planId: 'plan-home-essential',
    packageId: 'pkg-home-25',
    billingCycle: 'monthly',
    status: 'active',
    startDate: '2026-10-05',
    renewalDate: '2026-11-05',
    includedSwaps: 4,
    usedSwaps: 1,
    remainingSwaps: 3,
    pricePaidINR: 799
  }
];

export const INITIAL_SWAP_REQUESTS: SwapRequest[] = [
  {
    id: 'SWAP-2026-001',
    customerId: 'usr-customer-farm-1',
    customerName: 'Ramesh Reddy',
    customerPhone: '+91 94401 88231',
    customerVillage: 'Chinnatekur',
    district: 'Kurnool',
    packageCategory: 'farm',
    preferredTimeSlot: 'Morning (07:00 - 10:00)',
    deliveryMode: 'doorstep_delivery',
    status: 'pending',
    requestDate: '2026-10-29 07:30',
    notes: 'Need full charge AgriPack for morning cotton field drip irrigation. Current battery SoC is ~24%.',
    assignedBatteryId: 'RREV-BAT-F101'
  },
  {
    id: 'SWAP-2026-002',
    customerId: 'usr-customer-home-1',
    customerName: 'Lakshmi Devi',
    customerPhone: '+91 98492 55120',
    customerVillage: 'Madikonda',
    district: 'Warangal',
    packageCategory: 'home',
    preferredTimeSlot: 'Afternoon (14:00 - 17:00)',
    deliveryMode: 'hub_pickup',
    status: 'completed',
    requestDate: '2026-10-26 11:20',
    completedDate: '2026-10-26 15:10',
    notes: 'Exchanged depleted battery (18% SoC) for freshly charged HomePack (99% SoC).',
    assignedBatteryId: 'RREV-BAT-H003',
    returnedBatteryId: 'RREV-BAT-H002',
    adminNotes: 'Smooth exchange at Warangal Rural Hub #2.'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-101',
    customerId: 'usr-customer-farm-1',
    customerName: 'Ramesh Reddy',
    customerPhone: '+91 94401 88231',
    village: 'Chinnatekur',
    category: 'technical',
    subject: 'Pump motor starting query for 1.5 HP motor',
    message: 'I have a neighbor asking if the RREV AgriPack 3.0 can support a 1.5 HP motor instead of 1 HP. Please advise on inrush surge limits.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-10-28 14:10',
    adminResponse: 'Field engineer visited site to measure starting current. 1.5 HP motor has higher inductive inrush than 3.8 kW surge limit. Recommended dedicated VFD or soft-starter before trial.'
  },
  {
    id: 'TCK-102',
    customerId: 'usr-customer-home-1',
    customerName: 'Lakshmi Devi',
    customerPhone: '+91 98492 55120',
    village: 'Madikonda',
    category: 'general',
    subject: 'Request for scheduled evening swap during exam week',
    message: 'Children have quarterly exams next week. Wanted to ensure a fully charged pack is available every alternate day.',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-10-27 10:00',
    adminResponse: 'Confirmed reservation of HomePack at Madikonda hub for designated dates.'
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'INQ-501',
    name: 'Srinivasa Rao',
    phone: '+91 99890 33412',
    email: 'srinivas.rao@kurnoolagri.org',
    villageOrTown: 'Banaganapalle',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    customerType: 'farmer',
    interestedPackage: 'pkg-farm-30',
    message: 'Interested in joining pilot program for 5 farmer cooperative members with mango and citrus orchards.',
    createdAt: '2026-10-28 16:45',
    status: 'pilot_waitlist'
  },
  {
    id: 'INQ-502',
    name: 'Dr. Anuradha',
    phone: '+91 98481 77654',
    email: 'dr.anuradha@phc-rural.gov.in',
    villageOrTown: 'Alair',
    district: 'Yadadri Bhuvanagiri',
    state: 'Telangana',
    customerType: 'healthcare',
    interestedPackage: 'pkg-comm-50',
    message: 'Primary health sub-centre power backup for vaccine refrigerator during regular power supply disruptions.',
    createdAt: '2026-10-27 09:15',
    status: 'contacted'
  }
];

export const PILOT_REGIONS = [
  { district: 'Kurnool', state: 'Andhra Pradesh', hubName: 'Kurnool Central Hub #1 (Chinnatekur)', activeBatteries: 4 },
  { district: 'Anantapur', state: 'Andhra Pradesh', hubName: 'Anantapur South Station (Bukkarayasamudram)', activeBatteries: 2 },
  { district: 'Warangal', state: 'Telangana', hubName: 'Warangal Rural Hub #2 (Madikonda)', activeBatteries: 3 },
  { district: 'Nalgonda', state: 'Telangana', hubName: 'Nalgonda Agri Hub #1 (Nakrekal)', activeBatteries: 2 },
  { district: 'Chittoor', state: 'Andhra Pradesh', hubName: 'Kuppam Pilot Center (Planned Q1 2027)', activeBatteries: 0 },
  { district: 'Nizamabad', state: 'Telangana', hubName: 'Armoor Cluster (Planned Q2 2027)', activeBatteries: 0 }
];
