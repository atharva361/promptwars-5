import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, Clock, MessageSquareQuote, DollarSign, Plus, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { VendorItem } from '../types/wedding';

interface VendorChecklistProps {
  vendors: VendorItem[];
  onUpdateVendors?: (newVendors: VendorItem[]) => void;
}

export const VendorChecklist: React.FC<VendorChecklistProps> = ({ vendors, onUpdateVendors }) => {
  const [vendorList, setVendorList] = useState<VendorItem[]>(vendors);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showNegotiationGuide, setShowNegotiationGuide] = useState<boolean>(false);
  const [showAddVendor, setShowAddVendor] = useState<boolean>(false);

  // New vendor form state
  const [newCategory, setNewCategory] = useState('');
  const [newTimeline, setNewTimeline] = useState('3 Months Before');
  const [newQuestion, setNewQuestion] = useState('');
  const [newTip, setNewTip] = useState('');

  React.useEffect(() => {
    setVendorList(vendors);
  }, [vendors]);

  const handleStatusChange = (id: string, newStatus: VendorItem['status']) => {
    const updated = vendorList.map((v) => (v.id === id ? { ...v, status: newStatus } : v));
    setVendorList(updated);
    if (onUpdateVendors) onUpdateVendors(updated);
  };

  const handleAddCustomVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;

    const newItem: VendorItem = {
      id: `v-${Date.now()}`,
      category: newCategory,
      timelineMilestone: newTimeline,
      criticalQuestionToAsk: newQuestion || 'Confirm cancellation policy and force majeure clauses.',
      negotiationTip: newTip || 'Request bundled discount with pre-wedding event coverage.',
      status: 'Pending',
    };

    const updated = [newItem, ...vendorList];
    setVendorList(updated);
    if (onUpdateVendors) onUpdateVendors(updated);

    setNewCategory('');
    setNewQuestion('');
    setNewTip('');
    setShowAddVendor(false);
  };

  const filteredList =
    activeFilter === 'all'
      ? vendorList
      : vendorList.filter((v) => v.status.toLowerCase() === activeFilter.toLowerCase());

  const bookedCount = vendorList.filter((v) => v.status === 'Booked' || v.status === 'Advance Paid').length;

  return (
    <div id="vendors" className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md border border-amber-300/50">
            Vendor Contracts & Security
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 font-cinzel">
            Indian Wedding Vendor Checklist & Negotiator
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Contractual questions, advance payment safety checkpoints, and Indian vendor rate negotiation tips
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNegotiationGuide(!showNegotiationGuide)}
            className="px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 rounded-xl transition-all cursor-pointer"
          >
            {showNegotiationGuide ? 'Hide Contract Rules' : 'Indian Contract Security Rules'}
          </button>
          <button
            onClick={() => setShowAddVendor(!showAddVendor)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Contract Security Playbook Alert */}
      {showNegotiationGuide && (
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white rounded-2xl p-6 mb-8 shadow-md">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-cinzel text-lg font-bold text-amber-100 mb-1">
                The 5 Golden Rules of Indian Wedding Vendor Contracts
              </h3>
              <p className="text-xs text-amber-200/90 mb-4">
                These checks protect your wedding budget and guarantee high reliability (scoring 98 on Security):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-amber-300 block mb-1">
                    1. 10% Final Retention Clause
                  </span>
                  Never pay 100% before the event concludes. Retain 10% to be released only after final deliverable handover (e.g. uncompressed RAW photo files or cleanup clearance).
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-amber-300 block mb-1">
                    2. Overtime & Night Curfew Cap
                  </span>
                  Specify in writing the exact hourly rate (e.g. ₹5,000/hr) if Sangeet dancing or Pheras extend beyond midnight, preventing sudden ₹50,000 surcharges.
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-amber-300 block mb-1">
                    3. Dual Power & Sound Redundancy
                  </span>
                  Require the DJ and Mandap decorator to provide written proof of dual generator switchovers and backup audio mixing consoles.
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-amber-300 block mb-1">
                    4. Food Tasting & Plating Guarantee
                  </span>
                  Lock in that the exact head chef who cooked at your tasting session will oversee the banquet on the wedding night.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Vendor Drawer */}
      {showAddVendor && (
        <form
          onSubmit={handleAddCustomVendor}
          className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 mb-8 shadow-xs"
        >
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-3 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-amber-700" />
            Add Custom Wedding Vendor
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Vendor Category
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vintage Baraat Car Rental"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Milestone
              </label>
              <select
                value={newTimeline}
                onChange={(e) => setNewTimeline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
              >
                <option value="9-12 Months Before">9-12 Months Before</option>
                <option value="6 Months Before">6 Months Before</option>
                <option value="4 Months Before">4 Months Before</option>
                <option value="3 Months Before">3 Months Before</option>
                <option value="1 Month Before">1 Month Before</option>
                <option value="Week Of">Week Of</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Negotiation Tip
              </label>
              <input
                type="text"
                placeholder="e.g. Ask for complimentary floral hood decoration"
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddVendor(false)}
              className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold hover:bg-amber-900 cursor-pointer"
            >
              Add to Checklist
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex p-1 bg-stone-100 rounded-xl text-xs font-medium">
          {['all', 'pending', 'contacted', 'booked', 'advance paid'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                activeFilter === f
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {f === 'all' ? `All (${vendorList.length})` : f}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-stone-600">
          Security Status:{' '}
          <span className="text-emerald-700 font-bold">
            {bookedCount} of {vendorList.length} Secured
          </span>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredList.map((vendor, idx) => (
          <div
            key={vendor.id || idx}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  {vendor.timelineMilestone}
                </span>

                {/* Status select badge */}
                <select
                  value={vendor.status}
                  onChange={(e) => handleStatusChange(vendor.id, e.target.value as any)}
                  className={`text-xs font-bold rounded-md px-2 py-0.5 border cursor-pointer ${
                    vendor.status === 'Advance Paid'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : vendor.status === 'Booked'
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : vendor.status === 'Contacted'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Booked">Contract Signed</option>
                  <option value="Advance Paid">Advance Paid (Locked)</option>
                </select>
              </div>

              <h3 className="text-base font-bold text-stone-900 mb-2">
                {vendor.category}
              </h3>

              {/* Critical Question */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 mb-2.5">
                <div className="flex items-start gap-2 text-xs text-stone-800">
                  <MessageSquareQuote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">
                      Critical Question to Ask:
                    </span>
                    {vendor.criticalQuestionToAsk}
                  </div>
                </div>
              </div>

              {/* Negotiation Tip */}
              <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/50">
                <DollarSign className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">Negotiation Playbook:</span>
                  {vendor.negotiationTip}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Advance Escrow Guard Active
              </span>
              <button
                onClick={() =>
                  handleStatusChange(
                    vendor.id,
                    vendor.status === 'Advance Paid' ? 'Pending' : 'Advance Paid'
                  )
                }
                className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
              >
                {vendor.status === 'Advance Paid' ? 'Mark Incomplete' : 'Quick Lock Advance'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
