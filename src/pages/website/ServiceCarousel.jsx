import React, { useState } from "react";

const ChecklistAccordion = ({ category, subtitle, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
      <button
        className="w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <span className="text-xl text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="overflow-x-auto px-4 pb-4">
          <table className="min-w-full mt-2 border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 w-1/2 text-left">Task</th>
                <th className="px-4 py-2 text-center">Regular</th>
                <th className="px-4 py-2 text-center">Total</th>
                <th className="px-4 py-2 text-center">Deep</th>
              </tr>
            </thead>
            <tbody>
              {items.map((task, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 text-gray-800">{task}</td>
                  <td className="px-4 py-2 text-center text-gray-400">—</td>
                  <td className="px-4 py-2 text-center text-gray-400">—</td>
                  <td className="px-4 py-2 text-center text-gray-400">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ServiceCarousel = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
        The Ultimate Cleaning Checklist
      </h1>

      <ChecklistAccordion
        category="Living Room"
        subtitle="Living, Dining Room, and Common Areas"
        items={[
          "Dust all furniture and disinfect surfaces",
          "Clean under furniture cushions",
          "Fluff and fold pillows & blankets",
          "Dust table tops, lamps, wall hangings",
          "Dry dust baseboards",
          "Dust window frames",
          "Dust doors, door frames and handles",
          "Vacuum carpets, stairs, and rugs",
          "Sweep, mop, and disinfect floors",
          "Clean Family Room and Home Office (Add-On)",
        ]}
      />

      <ChecklistAccordion
        category="Kitchen & Laundry Room"
        items={[
          "Disinfect sinks, countertops, and backsplash",
          "Sanitize stovetop and stove fan",
          "Clean inside oven (Add-On)",
          "Polish stainless steel appliances",
          "Clean inside refrigerator (Add-On – must be emptied)",
          "Disinfect exterior of large appliances",
          "Dust furniture, tables, and chairs",
          "Sanitize microwave (inside & outside)",
          "Clean exterior cabinets and hardware",
          "Clean inside cabinets/drawers (Add-On – emptied)",
          "Dishwashing or loading dishwasher (Add-On)",
          "Sweep and mop floors",
          "Empty trash and replace bag",
          "Clean washer/dryer exterior and lint trap",
        ]}
      />

      <ChecklistAccordion
        category="Bathrooms"
        items={[
          "Scrub and disinfect bathtub",
          "Scrub and disinfect shower",
          "Clean and disinfect toilets",
          "Scrub sinks and vanity",
          "Clean mirrors",
          "Disinfect faucets and handles",
          "Wipe cabinets and hardware",
          "Clean towel racks and paper holders",
          "Sweep and mop the floor",
          "Dry dust baseboards",
          "Empty trash and replace bag",
          "Bathroom Deep Clean (Add-On)",
        ]}
      />

      <ChecklistAccordion
        category="Bedrooms"
        items={[
          "Make beds (change linens if left on top)",
          "Dust all furniture and headboards",
          "Clean mirrors",
          "Dry dust baseboards",
          "Dust lights and lampshades",
          "Disinfect doors and handles",
          "Vacuum carpets or clean wood floors (under bed if possible)",
        ]}
      />

      <ChecklistAccordion
        category="Rotational Tasks"
        subtitle="Completed during initial clean, then rotated as needed"
        items={[
          "Clean under furniture and rugs",
          "Cobweb patrol",
          "Clean doors, frames, handles",
          "Clean window frames",
          "Interior sliding doors (Add-On)",
          "Clean light fixtures",
          "Polish kitchen & bathroom cabinets",
          "Polish furniture",
          "Clean air vents (if reachable)",
          "Clean baseboards and backsplash",
          "Optional Add-Ons: interior windows, ceiling fans, fridge, oven, cabinets",
        ]}
      />
    </div>
  );
};

export default ServiceCarousel;
