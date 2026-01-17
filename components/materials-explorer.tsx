"use client"

import { useState } from "react"

export type MaterialSample = {
  id: string
  name: string
  color: string
  texture?: string
}

export default function MaterialsExplorer({ samples }: { samples?: MaterialSample[] }) {
  const defaultSamples: MaterialSample[] = [
    { id: "m1", name: "Soft Knit - Ivory", color: "#f7f3ee" },
    { id: "m2", name: "Quilted - Charcoal", color: "#2b2b2b" },
    { id: "m3", name: "Luxury Linen - Sand", color: "#e6d9c6" },
    { id: "m4", name: "Velvet - Midnight", color: "#0f172a" },
  ]

  const list = samples && samples.length > 0 ? samples : defaultSamples
  const [left, setLeft] = useState<MaterialSample>(list[0])
  const [right, setRight] = useState<MaterialSample>(list[1] || list[0])

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-playfair text-xl font-bold">Materials Explorer</h3>
        <p className="text-sm text-gray-500">Compare finishes side-by-side</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-600 mb-2">Left Sample</div>
            <div className="h-44 rounded-lg shadow-inner overflow-hidden flex items-center justify-center" style={{ background: left.color }}>
              <div className="text-sm font-semibold text-gray-800">{left.name}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-600 mb-2">Right Sample</div>
            <div className="h-44 rounded-lg shadow-inner overflow-hidden flex items-center justify-center" style={{ background: right.color }}>
              <div className={`text-sm font-semibold ${right.color === '#0f172a' ? 'text-white' : 'text-gray-800'}`}>{right.name}</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-100">
          <div className="text-xs text-gray-600 mb-2">Swatches</div>
          <div className="grid grid-cols-2 gap-3">
            {list.map((s) => (
              <button
                key={s.id}
                onClick={() => setLeft(s)}
                className="flex items-center gap-3 p-2 rounded-lg hover:shadow-md transition"
                title={`Set left to ${s.name}`}
              >
                <div className="w-8 h-8 rounded-md border" style={{ background: s.color }} />
                <div className="text-sm text-gray-700">{s.name}</div>
              </button>
            ))}

            {list.map((s) => (
              <button
                key={s.id + "-r"}
                onClick={() => setRight(s)}
                className="flex items-center gap-3 p-2 rounded-lg hover:shadow-md transition"
                title={`Set right to ${s.name}`}
              >
                <div className="w-8 h-8 rounded-md border" style={{ background: s.color }} />
                <div className="text-sm text-gray-700">{s.name}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-500">Tip: Mix left/right to quickly compare color and finish.</div>
        </div>
      </div>
    </section>
  )
}
