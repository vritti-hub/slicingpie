import { Founder, Category, LedgerEntry, FounderCalculations } from '@/types/slicingPie';
import { HOURS_PER_MONTH, TOTAL_PERIOD_MONTHS, LIVING_BENEFIT_PER_MONTH } from './constants';

export function calculateFounderSlices(
  founder: Founder,
  entries: LedgerEntry[],
  categories: Category[]
): FounderCalculations {
  const founderEntries = entries.filter(e => e.founderId === founder.id);
  
  // Calculate hours worked
  const hoursWorked = founderEntries
    .filter(e => e.categoryId === 'time')
    .reduce((sum, e) => sum + e.amount, 0);
  
  // Calculate working/non-working months
  const workingMonths = Math.min(hoursWorked / HOURS_PER_MONTH, TOTAL_PERIOD_MONTHS);
  const nonWorkingMonths = Math.max(TOTAL_PERIOD_MONTHS - workingMonths, 0);
  
  // Hourly rates
  const hourlyMarketRate = founder.marketSalary / HOURS_PER_MONTH;
  const hourlyPaidRate = founder.paidSalary / HOURS_PER_MONTH;
  const hourlyGap = hourlyMarketRate - hourlyPaidRate;
  
  // Cash calculations
  const cashInvested = founderEntries
    .filter(e => e.categoryId === 'cash')
    .reduce((sum, e) => sum + e.amount, 0);
  const cashDraw = nonWorkingMonths * LIVING_BENEFIT_PER_MONTH;
  const netCash = Math.max(cashInvested - cashDraw, 0);
  
  // Salary gap value
  const salaryGapValue = hourlyGap * hoursWorked;
  
  // Revenue and expenses
  const revenueTotal = founderEntries
    .filter(e => e.categoryId === 'revenue')
    .reduce((sum, e) => sum + e.amount, 0);
  const expensesTotal = founderEntries
    .filter(e => e.categoryId === 'expenses')
    .reduce((sum, e) => sum + e.amount, 0);
  
  // Get category multipliers
  const cashMultiplier = categories.find(c => c.id === 'cash')?.multiplier ?? 4;
  const timeMultiplier = categories.find(c => c.id === 'time')?.multiplier ?? 2;
  const revenueCategory = categories.find(c => c.id === 'revenue');
  const revenueMultiplier = revenueCategory?.multiplier ?? 8;
  const revenueCommission = (revenueCategory?.commissionPercent ?? 10) / 100;
  const expensesMultiplier = categories.find(c => c.id === 'expenses')?.multiplier ?? 4;
  
  // Calculate slices - Time now includes salary gap (hourlyGap × hours × multiplier)
  const timeSlices = salaryGapValue * timeMultiplier;
  
  const slices = {
    cash: netCash * cashMultiplier,
    time: timeSlices,
    revenue: revenueTotal * revenueCommission * revenueMultiplier,
    expenses: expensesTotal * expensesMultiplier,
    total: 0,
  };
  slices.total = slices.cash + slices.time + slices.revenue + slices.expenses;
  
  return {
    founderId: founder.id,
    hoursWorked,
    workingMonths,
    nonWorkingMonths,
    hourlyMarketRate,
    hourlyPaidRate,
    hourlyGap,
    cashInvested,
    cashDraw,
    netCash,
    salaryGapValue,
    revenueTotal,
    expensesTotal,
    slices,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatSlices(slices: number): string {
  return formatNumber(Math.round(slices));
}
