export interface RecommendedArea {
  name: string;
  description: string;
  averagePrice: string;
  growthRating: 'High' | 'Moderate' | 'Stable' | 'Risky';
}

export interface ProjectionPoint {
  year: string;
  estimatedValue: number;
}

export interface RealEstateReport {
  summary: string;
  bestAreas: RecommendedArea[];
  hiddenCosts: string[];
  pros: string[];
  cons: string[];
  investmentPlan: ProjectionPoint[];
  adviceForBudget: string;
}

export interface UserPreferences {
  budget: string;
  location: string;
  propertyType: 'Residential' | 'Commercial' | 'Plot' | 'Apartment' | 'File';
  duration: 'Short Term (1-2 years)' | 'Medium Term (3-5 years)' | 'Long Term (5+ years)';
  paymentMode: 'Cash' | 'Installments';
}

export enum GrowthRatingColor {
  High = 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Moderate = 'bg-blue-100 text-blue-700 border-blue-200',
  Stable = 'bg-slate-100 text-slate-700 border-slate-200',
  Risky = 'bg-amber-100 text-amber-700 border-amber-200',
}