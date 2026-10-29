import React, { useState } from 'react';
import { Sliders, AlertCircle, Info, Zap } from 'lucide-react';

interface RuntimeCalculatorProps {
  initialCategory?: 'home' | 'farm';
}

export const RuntimeCalculator: React.FC<RuntimeCalculatorProps> = ({ initialCategory = 'home' }) => {
  const [selectedPack, setSelectedPack] = useState<'home' | 'farm'>(initialCategory);
  const [loadWatts, setLoadWatts] = useState<number>(selectedPack === 'farm' ? 900 : 190);
  const [usableDoD, setUsableDoD] = useState<number>(80); // 80%
  const [inverterEff, setInverterEff] = useState<number>(90); // 90%

  // Update load default when pack changes
  const handlePackChange = (pack: 'home' | 'farm') => {
    setSelectedPack(pack);
    if (pack === 'farm') {
      setLoadWatts(900);
    } else {
      setLoadWatts(190);
    }
  };

  const nominalKwh = selectedPack === 'farm' ? 3.0 : 2.5;
  const netDeliveredWh = (nominalKwh * 1000) * (usableDoD / 100) * (inverterEff / 100);
  const estimatedHours = loadWatts > 0 ? (netDeliveredWh / loadWatts) : 0;

  // Preset appliances
  const appliances = selectedPack === 'home' 
    ? [
        { name: '4x LED Lights', watts: 40 },
        { name: '2x BLDC Fans', watts: 60 },
        { name: 'Wi-Fi & Phones', watts: 25 },
        { name: '32" Smart TV', watts: 65 },
        { name: 'Full Domestic Mix', watts: 190 },
        { name: 'Home Refrigerator (Inverter)', watts: 120 }
      ]
    : [
        { name: '1 HP Agri Pump (Nominal)', watts: 900 },
        { name: '0.5 HP Drip Booster Pump', watts: 450 },
        { name: 'Battery Sprayer Rapid Station', watts: 180 },
        { name: 'Farm Shed Security Lighting', watts: 120 },
        { name: 'Electric Fence + Sensor Array', watts: 50 },
        { name: 'Heavy Farm Load (Combined)', watts: 1400 }
      ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
            Engineering Tool
          </div>
          <h3 className="text-xl font-bold text-stone-900 tracking-tight">
            Battery Runtime & Load Estimator
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Calculate operational hours based on usable energy, inverter efficiency, and real electrical wattage.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl self-start sm:self-auto border border-stone-200">
          <button
            onClick={() => handlePackChange('home')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedPack === 'home'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            HomePack 2.5 kWh
          </button>
          <button
            onClick={() => handlePackChange('farm')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedPack === 'farm'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            AgriPack 3.0 kWh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Sliders and presets */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="load-slider" className="text-xs font-medium text-stone-700">
                Connected Electrical Load (Watts)
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="load-slider"
                  type="number"
                  min="20"
                  max="3500"
                  value={loadWatts}
                  onChange={(e) => setLoadWatts(Math.max(10, Number(e.target.value) || 0))}
                  className="w-20 px-2 py-1 text-right text-xs font-mono font-semibold bg-stone-50 border border-stone-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
                <span className="text-xs text-stone-500 font-mono">W</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max={selectedPack === 'farm' ? 2200 : 1500}
              step="10"
              value={loadWatts}
              onChange={(e) => setLoadWatts(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
              <span>20W</span>
              <span>Nominal continuous max: {selectedPack === 'farm' ? '2200W' : '1500W'}</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <div className="text-[11px] font-medium text-stone-500 mb-2">
              Quick Load Presets ({selectedPack === 'home' ? 'Rural Domestic' : 'Agricultural Field'}):
            </div>
            <div className="flex flex-wrap gap-2">
              {appliances.map((app) => (
                <button
                  key={app.name}
                  onClick={() => setLoadWatts(app.watts)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all text-left ${
                    loadWatts === app.watts
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                      : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <span>{app.name}</span>
                  <span className="ml-1.5 font-mono text-[11px] text-stone-500">({app.watts}W)</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced engineering parameters */}
          <div className="pt-4 border-t border-stone-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 mb-3">
              <Sliders className="w-3.5 h-3.5 text-stone-500" />
              <span>Engineering Assumptions (Configurable)</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">
                  Usable Depth of Discharge (DoD): <span className="font-mono font-medium">{usableDoD}%</span>
                </label>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={usableDoD}
                  onChange={(e) => setUsableDoD(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-700"
                />
                <span className="text-[10px] text-stone-400">80% default protects LiFePO4 cell longevity</span>
              </div>
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">
                  Inverter / Conversion Efficiency: <span className="font-mono font-medium">{inverterEff}%</span>
                </label>
                <input
                  type="range"
                  min="75"
                  max="96"
                  value={inverterEff}
                  onChange={(e) => setInverterEff(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-700"
                />
                <span className="text-[10px] text-stone-400">90% pure sine-wave inverter benchmark</span>
              </div>
            </div>
          </div>
        </div>

        {/* Output card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-stone-900 text-stone-100 rounded-xl p-6 border border-stone-800">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <span className="text-xs font-medium text-stone-400">Calculated Runtime</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">
                {selectedPack === 'farm' ? 'AgriPack 3.0 kWh' : 'HomePack 2.5 kWh'}
              </span>
            </div>

            <div className="py-6 text-center">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-emerald-400">
                {estimatedHours >= 1 
                  ? `${estimatedHours.toFixed(1)} hrs` 
                  : `${Math.round(estimatedHours * 60)} mins`}
              </div>
              <div className="text-xs text-stone-400 mt-2 font-mono">
                at continuous {loadWatts}W electrical draw
              </div>
            </div>

            <div className="space-y-2 text-xs bg-stone-800/70 p-3.5 rounded-lg border border-stone-700/60 font-mono">
              <div className="flex justify-between text-stone-300">
                <span>Nominal Pack Energy:</span>
                <span>{nominalKwh * 1000} Wh</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Net Usable Output:</span>
                <span className="text-emerald-300">{netDeliveredWh.toFixed(0)} Wh</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Formula:</span>
                <span className="text-stone-400">(Nominal × DoD × Eff) / Load</span>
              </div>
            </div>
          </div>

          {/* Caveat */}
          <div className="mt-4 pt-4 border-t border-stone-800 text-[11px] text-stone-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {selectedPack === 'farm' ? (
                <>
                  <strong className="text-stone-300">1 HP Agricultural Pump Note:</strong> At 900W electrical input, runtime is approximately 2.4 hours. This is an engineering estimate, not a performance guarantee. Induction motors draw 3× to 5× starting surge current; inverter capacity and pumping head must be inspected prior to deployment.
                </>
              ) : (
                <>
                  <strong className="text-stone-300">Domestic Backup Note:</strong> At standard 190W evening domestic load (lights + fans + TV/phone), runtime is ~9.5 hours. Actual runtime varies with appliance motor types and ambient temperature.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
