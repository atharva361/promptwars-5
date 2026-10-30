import React, { useState } from 'react';
import { IndianRupee, PieChart, TrendingUp, AlertTriangle, CheckCircle, Plus, ShieldCheck } from 'lucide-react';
import { BudgetItem } from '../types/wedding';

interface BudgetManagerProps {
  totalBudgetLakhs: number;
  budgetAllocations: BudgetItem[];
  onUpdateAllocations: (newAllocations: BudgetItem[]) => void;
}

export const BudgetManager: React.FC<BudgetManagerProps> = ({
  totalBudgetLakhs,
  budgetAllocations,
  onUpdateAllocations,
}) => {
  const [allocations, setAllocations] = useState<BudgetItem[]>(budgetAllocations);
  const [newExpenseCategory, setNewExpenseCategory] = useState<string>('');
  const [newExpenseName, setNewExpenseName] = useState<string>('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('');
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);

  // Sync when prop updates
  React.useEffect(() => {
    setAllocations(budgetAllocations);
  }, [budgetAllocations]);

  const totalAllocated = allocations.reduce((sum, item) => sum + (item.amountLakhs || 0), 0);
  const totalSpent = allocations.reduce((sum, item) => sum + (item.spentLakhs || 0), 0);
  const remainingLakhs = totalBudgetLakhs - totalSpent;
  const bufferFund = allocations.find((a) => a.category.toLowerCase().includes('emergency') || a.category.toLowerCase().includes('buffer'))?.amountLakhs || (totalBudgetLakhs * 0.06);

  const handleSpentChange = (idx: number, val: number) => {
    const updated = [...allocations];
    updated[idx] = {
      ...updated[idx],
      spentLakhs: Math.max(0, val),
    };
    setAllocations(updated);
    onUpdateAllocations(updated);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseCategory || !newExpenseAmount) return;

    const amt = parseFloat(newExpenseAmount);
    const targetIdx = allocations.findIndex((a) => a.category === newExpenseCategory);

    if (targetIdx >= 0) {
      const updated = [...allocations];
      const curSpent = updated[targetIdx].spentLakhs || 0;
      updated[targetIdx] = {
        ...updated[targetIdx],
        spentLakhs: +(curSpent + amt).toFixed(2),
      };
      setAllocations(updated);
      onUpdateAllocations(updated);
    }

    setNewExpenseName('');
    setNewExpenseAmount('');
    setShowAddExpense(false);
  };

  return (
    <div id="budget" className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md border border-amber-300/50">
            INR Financial Control
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 font-cinzel">
            Indian Wedding Budget Optimizer
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Categorized allocations in ₹ Lakhs, live commitments, and emergency buffer reserves
          </p>
        </div>

        <button
          onClick={() => setShowAddExpense(!showAddExpense)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-xl transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          {showAddExpense ? 'Close' : 'Log Actual Advance / Payment'}
        </button>
      </div>

      {/* Top Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Total Target Budget</span>
            <IndianRupee className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 tabular-nums">
            ₹{totalBudgetLakhs} Lakhs
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {totalBudgetLakhs >= 100
              ? `₹${(totalBudgetLakhs / 100).toFixed(2)} Crores total outlay`
              : 'Optimized for royal celebration'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Committed / Paid</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-800 tabular-nums">
            ₹{totalSpent.toFixed(2)} Lakhs
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {((totalSpent / totalBudgetLakhs) * 100).toFixed(1)}% of total budget spent
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Remaining Runway</span>
            <CheckCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className={`text-2xl font-black tabular-nums ${remainingLakhs < 0 ? 'text-red-700' : 'text-stone-900'}`}>
            ₹{remainingLakhs.toFixed(2)} Lakhs
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Available for remaining vendor milestones
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Emergency Buffer Reserve</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900 tabular-nums">
            ₹{bufferFund.toFixed(2)} Lakhs
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Locked safety buffer for overtime & guest surge
          </p>
        </div>
      </div>

      {/* Add Expense Drawer */}
      {showAddExpense && (
        <form
          onSubmit={handleAddExpense}
          className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 mb-8 shadow-xs"
        >
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-3 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-amber-700" />
            Record Vendor Advance Payment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Category
              </label>
              <select
                required
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
              >
                <option value="">Select Category...</option>
                {allocations.map((a) => (
                  <option key={a.category} value={a.category}>
                    {a.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Description / Vendor Name
              </label>
              <input
                type="text"
                placeholder="e.g. Palace Mandap 25% Advance"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Amount Paid (₹ Lakhs)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.05"
                  min="0.01"
                  required
                  placeholder="e.g. 3.5"
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white tabular-nums"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 text-white rounded-xl text-xs font-bold hover:bg-amber-900 cursor-pointer whitespace-nowrap"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Category Breakdown Table / Cards */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900">
            Categorized Allocation & Payout Tracking
          </h3>
          <span className="text-xs text-stone-500">
            Click amounts below to record or update spent amounts
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {allocations.map((item, idx) => {
            const spent = item.spentLakhs || 0;
            const progress = item.amountLakhs > 0 ? (spent / item.amountLakhs) * 100 : 0;
            const isExceeded = spent > item.amountLakhs;

            return (
              <div key={idx} className="p-5 sm:px-6 hover:bg-stone-50/70 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                      {item.percentage}%
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {item.category}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1">
                        {item.guidance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-xs text-stone-500">Allocated</div>
                      <div className="text-sm font-bold text-stone-900 tabular-nums">
                        ₹{item.amountLakhs.toFixed(2)}L
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-stone-500">Spent / Advance</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-stone-400">₹</span>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={spent}
                          onChange={(e) => handleSpentChange(idx, parseFloat(e.target.value) || 0)}
                          className={`w-16 px-1.5 py-0.5 text-xs font-bold text-right border rounded bg-white tabular-nums ${
                            isExceeded ? 'text-red-700 border-red-300' : 'text-stone-900 border-stone-200'
                          }`}
                        />
                        <span className="text-xs text-stone-600">L</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isExceeded ? 'bg-red-500' : progress > 80 ? 'bg-amber-500' : 'bg-[#10b981]'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
