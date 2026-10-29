import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  BatteryPackage, 
  SubscriptionPlan, 
  CustomerSubscription, 
  BatteryItem, 
  SwapRequest, 
  SupportTicket, 
  ContactInquiry,
  BatteryStatus,
  CustomerCategory
} from '../types';
import { 
  INITIAL_PACKAGES, 
  INITIAL_PLANS, 
  INITIAL_BATTERIES, 
  INITIAL_USERS, 
  INITIAL_SUBSCRIPTIONS, 
  INITIAL_SWAP_REQUESTS, 
  INITIAL_TICKETS, 
  INITIAL_INQUIRIES 
} from '../data/initialData';

interface AppContextType {
  currentUser: UserProfile | null;
  allUsers: UserProfile[];
  packages: BatteryPackage[];
  plans: SubscriptionPlan[];
  batteries: BatteryItem[];
  subscriptions: CustomerSubscription[];
  swapRequests: SwapRequest[];
  supportTickets: SupportTicket[];
  inquiries: ContactInquiry[];
  
  // Auth & Roles
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  logout: () => void;
  registerCustomer: (data: {
    name: string;
    email: string;
    phone: string;
    customerType: CustomerCategory;
    village: string;
    mandal?: string;
    district: string;
    state: string;
    preferredPackageId: string;
  }) => UserProfile;
  switchDemoUser: (userId: string) => void;
  updateUserProfile: (userId: string, data: Partial<UserProfile>) => void;

  // Customer actions
  subscribeToPlan: (userId: string, planId: string, billingCycle: 'monthly' | 'yearly') => CustomerSubscription;
  requestSwap: (data: {
    customerId: string;
    preferredTimeSlot: string;
    deliveryMode: 'hub_pickup' | 'doorstep_delivery';
    notes?: string;
  }) => { success: boolean; message: string; request?: SwapRequest };
  cancelSwapRequest: (requestId: string) => void;
  submitSupportTicket: (data: {
    customerId: string;
    category: SupportTicket['category'];
    subject: string;
    message: string;
    priority?: SupportTicket['priority'];
  }) => SupportTicket;

  // Admin actions
  updateSwapRequestStatus: (requestId: string, status: SwapRequest['status'], assignedBatteryId?: string, adminNotes?: string) => void;
  addBattery: (data: Omit<BatteryItem, 'id' | 'lastUpdated'>) => BatteryItem;
  updateBattery: (id: string, data: Partial<BatteryItem>) => void;
  deleteBattery: (id: string) => void;
  updatePlan: (id: string, data: Partial<SubscriptionPlan>) => void;
  addPlan: (data: Omit<SubscriptionPlan, 'id'>) => SubscriptionPlan;
  updatePackage: (id: string, data: Partial<BatteryPackage>) => void;
  updateSupportTicket: (ticketId: string, status: SupportTicket['status'], adminResponse?: string) => void;
  updateInquiryStatus: (inquiryId: string, status: ContactInquiry['status']) => void;
  submitContactInquiry: (data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => ContactInquiry;
  resetAllData: () => void;

  // Helpers
  getUserSubscription: (userId: string) => CustomerSubscription | undefined;
  getUserPackage: (userId: string) => BatteryPackage | undefined;
  getUserBattery: (userId: string) => BatteryItem | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'rrev_storage_users_v1',
  CURRENT_USER_ID: 'rrev_storage_curr_user_v1',
  PACKAGES: 'rrev_storage_packages_v1',
  PLANS: 'rrev_storage_plans_v1',
  BATTERIES: 'rrev_storage_batteries_v1',
  SUBSCRIPTIONS: 'rrev_storage_subscriptions_v1',
  SWAPS: 'rrev_storage_swaps_v1',
  TICKETS: 'rrev_storage_tickets_v1',
  INQUIRIES: 'rrev_storage_inquiries_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved !== null ? saved : 'usr-customer-farm-1'; // Default to Ramesh Reddy for rich demo experience
  });

  const [packages, setPackages] = useState<BatteryPackage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLANS);
    return saved ? JSON.parse(saved) : INITIAL_PLANS;
  });

  const [batteries, setBatteries] = useState<BatteryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BATTERIES);
    return saved ? JSON.parse(saved) : INITIAL_BATTERIES;
  });

  const [subscriptions, setSubscriptions] = useState<CustomerSubscription[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SWAPS);
    return saved ? JSON.parse(saved) : INITIAL_SWAP_REQUESTS;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BATTERIES, JSON.stringify(batteries));
  }, [batteries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SWAPS, JSON.stringify(swapRequests));
  }, [swapRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  const currentUser = allUsers.find(u => u.id === currentUserId) || null;

  const login = (email: string, role?: 'customer' | 'admin'): boolean => {
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUserId(found.id);
      return true;
    }
    // If not found and role specified, quick demo provision
    if (role) {
      const newUser: UserProfile = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: email.split('@')[0],
        email: email,
        phone: '+91 98000 00000',
        role: role,
        customerType: 'home',
        village: 'Kurnool Area',
        district: 'Kurnool',
        state: 'Andhra Pradesh',
        preferredPackageId: 'pkg-home-25',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setAllUsers(prev => [...prev, newUser]);
      setCurrentUserId(newUser.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const switchDemoUser = (userId: string) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUserId(found.id);
    }
  };

  const registerCustomer = (data: {
    name: string;
    email: string;
    phone: string;
    customerType: CustomerCategory;
    village: string;
    mandal?: string;
    district: string;
    state: string;
    preferredPackageId: string;
  }): UserProfile => {
    const newId = `usr-c-${Date.now().toString().slice(-4)}`;
    const newUser: UserProfile = {
      id: newId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      customerType: data.customerType,
      village: data.village,
      mandal: data.mandal,
      district: data.district,
      state: data.state,
      preferredPackageId: data.preferredPackageId,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setAllUsers(prev => [...prev, newUser]);
    setCurrentUserId(newId);
    return newUser;
  };

  const updateUserProfile = (userId: string, data: Partial<UserProfile>) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, ...data } : u));
  };

  const subscribeToPlan = (userId: string, planId: string, billingCycle: 'monthly' | 'yearly'): CustomerSubscription => {
    const plan = plans.find(p => p.id === planId) || plans[0];
    const subId = `sub-${Date.now().toString().slice(-5)}`;
    const now = new Date();
    const renewal = new Date();
    if (billingCycle === 'monthly') {
      renewal.setMonth(now.getMonth() + 1);
    } else {
      renewal.setFullYear(now.getFullYear() + 1);
    }

    const included = billingCycle === 'monthly' ? plan.monthlyIncludedSwaps : plan.yearlyIncludedSwaps;
    const price = billingCycle === 'monthly' ? plan.monthlyPriceINR : plan.yearlyPriceINR;

    const newSub: CustomerSubscription = {
      id: subId,
      userId,
      planId,
      packageId: plan.packageId,
      billingCycle,
      status: 'active',
      startDate: now.toISOString().split('T')[0],
      renewalDate: renewal.toISOString().split('T')[0],
      includedSwaps: included,
      usedSwaps: 0,
      remainingSwaps: included,
      pricePaidINR: price
    };

    setSubscriptions(prev => [newSub, ...prev]);
    // update user's activeSubscriptionId
    updateUserProfile(userId, { activeSubscriptionId: subId });
    return newSub;
  };

  const requestSwap = (data: {
    customerId: string;
    preferredTimeSlot: string;
    deliveryMode: 'hub_pickup' | 'doorstep_delivery';
    notes?: string;
  }): { success: boolean; message: string; request?: SwapRequest } => {
    const user = allUsers.find(u => u.id === data.customerId);
    if (!user) return { success: false, message: 'User not found' };

    const sub = subscriptions.find(s => s.userId === data.customerId && s.status === 'active');
    if (!sub) {
      return { 
        success: false, 
        message: 'No active energy subscription found. Please select an energy subscription plan first.' 
      };
    }

    if (sub.remainingSwaps <= 0) {
      return { 
        success: false, 
        message: 'Monthly swap allowance exhausted. You can request extra swaps at standard pilot rates or upgrade your plan.' 
      };
    }

    const pkg = packages.find(p => p.id === sub.packageId) || packages[0];

    // Find available battery in user's category if possible
    const availableBat = batteries.find(b => b.category === pkg.category && b.status === 'available');

    const newRequest: SwapRequest = {
      id: `SWAP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      customerVillage: user.village,
      district: user.district,
      packageCategory: pkg.category,
      preferredTimeSlot: data.preferredTimeSlot,
      deliveryMode: data.deliveryMode,
      status: 'pending',
      requestDate: new Date().toLocaleString('en-IN', { hour12: false }),
      notes: data.notes || '',
      assignedBatteryId: availableBat ? availableBat.id : undefined
    };

    // Deduct remaining swap from subscription
    setSubscriptions(prev => prev.map(s => {
      if (s.id === sub.id) {
        return {
          ...s,
          usedSwaps: s.usedSwaps + 1,
          remainingSwaps: Math.max(0, s.remainingSwaps - 1)
        };
      }
      return s;
    }));

    // Reserve battery if found
    if (availableBat) {
      setBatteries(prev => prev.map(b => b.id === availableBat.id ? { ...b, status: 'reserved' } : b));
    }

    setSwapRequests(prev => [newRequest, ...prev]);

    return { 
      success: true, 
      message: 'Swap request submitted successfully! RREV hub team has been notified.',
      request: newRequest
    };
  };

  const cancelSwapRequest = (requestId: string) => {
    const req = swapRequests.find(r => r.id === requestId);
    if (!req || req.status === 'completed' || req.status === 'cancelled') return;

    // Refund swap to subscription
    const sub = subscriptions.find(s => s.userId === req.customerId && s.status === 'active');
    if (sub) {
      setSubscriptions(prev => prev.map(s => {
        if (s.id === sub.id) {
          return {
            ...s,
            usedSwaps: Math.max(0, s.usedSwaps - 1),
            remainingSwaps: s.remainingSwaps + 1
          };
        }
        return s;
      }));
    }

    // Release reserved battery
    if (req.assignedBatteryId) {
      setBatteries(prev => prev.map(b => b.id === req.assignedBatteryId && b.status === 'reserved' ? { ...b, status: 'available' } : b));
    }

    setSwapRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'cancelled' } : r));
  };

  const updateSwapRequestStatus = (
    requestId: string, 
    status: SwapRequest['status'], 
    assignedBatteryId?: string, 
    adminNotes?: string
  ) => {
    const req = swapRequests.find(r => r.id === requestId);
    if (!req) return;

    setSwapRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status,
          assignedBatteryId: assignedBatteryId || r.assignedBatteryId,
          adminNotes: adminNotes || r.adminNotes,
          completedDate: status === 'completed' ? new Date().toLocaleString('en-IN', { hour12: false }) : r.completedDate
        };
      }
      return r;
    }));

    // If completed, update battery states:
    // Assigned battery becomes 'in_use', assigned to customer
    const targetBatteryId = assignedBatteryId || req.assignedBatteryId;
    if (status === 'completed' && targetBatteryId) {
      setBatteries(prev => prev.map(b => {
        if (b.id === targetBatteryId) {
          return {
            ...b,
            status: 'in_use',
            assignedCustomerId: req.customerId,
            lastUpdated: new Date().toLocaleString('en-IN', { hour12: false })
          };
        }
        return b;
      }));
    } else if (status === 'approved_dispatched' && targetBatteryId) {
      setBatteries(prev => prev.map(b => {
        if (b.id === targetBatteryId) {
          return {
            ...b,
            status: 'reserved',
            lastUpdated: new Date().toLocaleString('en-IN', { hour12: false })
          };
        }
        return b;
      }));
    }
  };

  const addBattery = (data: Omit<BatteryItem, 'id' | 'lastUpdated'>): BatteryItem => {
    const prefix = data.category === 'home' ? 'RREV-BAT-H' : data.category === 'farm' ? 'RREV-BAT-F' : 'RREV-BAT-C';
    const num = Math.floor(200 + Math.random() * 800);
    const newBattery: BatteryItem = {
      ...data,
      id: `${prefix}${num}`,
      lastUpdated: new Date().toLocaleString('en-IN', { hour12: false })
    };
    setBatteries(prev => [newBattery, ...prev]);
    return newBattery;
  };

  const updateBattery = (id: string, data: Partial<BatteryItem>) => {
    setBatteries(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          ...data,
          lastUpdated: new Date().toLocaleString('en-IN', { hour12: false })
        };
      }
      return b;
    }));
  };

  const deleteBattery = (id: string) => {
    setBatteries(prev => prev.filter(b => b.id !== id));
  };

  const updatePlan = (id: string, data: Partial<SubscriptionPlan>) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const addPlan = (data: Omit<SubscriptionPlan, 'id'>): SubscriptionPlan => {
    const newPlan: SubscriptionPlan = {
      ...data,
      id: `plan-${Date.now().toString().slice(-4)}`
    };
    setPlans(prev => [...prev, newPlan]);
    return newPlan;
  };

  const updatePackage = (id: string, data: Partial<BatteryPackage>) => {
    setPackages(prev => prev.map(pkg => pkg.id === id ? { ...pkg, ...data } : pkg));
  };

  const submitSupportTicket = (data: {
    customerId: string;
    category: SupportTicket['category'];
    subject: string;
    message: string;
    priority?: SupportTicket['priority'];
  }): SupportTicket => {
    const user = allUsers.find(u => u.id === data.customerId);
    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(200 + Math.random() * 800)}`,
      customerId: data.customerId,
      customerName: user ? user.name : 'Registered Member',
      customerPhone: user ? user.phone : '',
      village: user ? user.village : '',
      category: data.category,
      subject: data.subject,
      message: data.message,
      status: 'open',
      priority: data.priority || 'medium',
      createdAt: new Date().toLocaleString('en-IN', { hour12: false })
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const updateSupportTicket = (ticketId: string, status: SupportTicket['status'], adminResponse?: string) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status,
          adminResponse: adminResponse || t.adminResponse
        };
      }
      return t;
    }));
  };

  const submitContactInquiry = (data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry => {
    const newInquiry: ContactInquiry = {
      ...data,
      id: `INQ-${Math.floor(600 + Math.random() * 400)}`,
      createdAt: new Date().toLocaleString('en-IN', { hour12: false }),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (inquiryId: string, status: ContactInquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === inquiryId ? { ...inq, status } : inq));
  };

  const resetAllData = () => {
    setAllUsers(INITIAL_USERS);
    setCurrentUserId('usr-customer-farm-1');
    setPackages(INITIAL_PACKAGES);
    setPlans(INITIAL_PLANS);
    setBatteries(INITIAL_BATTERIES);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setSwapRequests(INITIAL_SWAP_REQUESTS);
    setSupportTickets(INITIAL_TICKETS);
    setInquiries(INITIAL_INQUIRIES);
    localStorage.clear();
  };

  const getUserSubscription = (userId: string) => {
    return subscriptions.find(s => s.userId === userId && s.status === 'active');
  };

  const getUserPackage = (userId: string) => {
    const sub = getUserSubscription(userId);
    if (sub) {
      return packages.find(p => p.id === sub.packageId);
    }
    const user = allUsers.find(u => u.id === userId);
    return user ? packages.find(p => p.id === user.preferredPackageId) : packages[0];
  };

  const getUserBattery = (userId: string) => {
    return batteries.find(b => b.assignedCustomerId === userId && b.status === 'in_use');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      allUsers,
      packages,
      plans,
      batteries,
      subscriptions,
      swapRequests,
      supportTickets,
      inquiries,
      login,
      logout,
      registerCustomer,
      switchDemoUser,
      updateUserProfile,
      subscribeToPlan,
      requestSwap,
      cancelSwapRequest,
      submitSupportTicket,
      updateSwapRequestStatus,
      addBattery,
      updateBattery,
      deleteBattery,
      updatePlan,
      addPlan,
      updatePackage,
      updateSupportTicket,
      submitContactInquiry,
      updateInquiryStatus,
      resetAllData,
      getUserSubscription,
      getUserPackage,
      getUserBattery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
