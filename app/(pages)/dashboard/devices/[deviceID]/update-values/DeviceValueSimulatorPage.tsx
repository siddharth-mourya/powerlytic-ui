"use client";

import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import { api } from "@/app/_lib/api/axios";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface SimulatorRow {
  ts: string;
  di1: number;
  di2: number;
  ai1: number;
  ai2: number;
  miSummary: string;
}

interface DeviceValueSimulatorPageProps {
  deviceId: string;
}

/* ------------------------------------------------------------------ */
/* Constants */
/* ------------------------------------------------------------------ */

const DEVICE_ID = "695fe1021270a1366a9f5766";

const SLAVES = [
  {
    slave_id: "c618ac18-3536-4984-90ed-8a178aca662f",
    reads: [
      "c7b3ea49-8e06-459c-ab88-efdfe92a634b",
      "6573d437-2376-4c1d-806e-8f77998c0850",
    ],
  },
  {
    slave_id: "b942fb50-ed3c-436d-9686-b0ee87dbf44c",
    reads: [
      "bd5b7bef-e723-4602-a116-a457e8e3903e",
      "4ce00b0b-99db-4983-8a0a-bbddc35047c1",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

const randomBool = () => (Math.random() > 0.5 ? 1 : 0);
const randomRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export default function DeviceValueSimulatorPage({
  deviceId,
}: DeviceValueSimulatorPageProps) {
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState<SimulatorRow[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pushValues = async () => {
    const di1 = randomBool();
    const di2 = randomBool();
    const ai1 = randomRange(200, 300);
    const ai2 = randomRange(400, 500);

    const miData = SLAVES.map((slave) => ({
      slave_id: slave.slave_id,
      registers: slave.reads.map((readId) => ({
        readId,
        value: [randomRange(1000, 10000)],
      })),
    }));

    const payload = {
      deviceId: deviceId || DEVICE_ID,
      ts: new Date().toISOString(),
      values: {
        DI_1: di1,
        DI_2: di2,
        AI_1: ai1,
        AI_2: ai2,
        MI_1: miData,
      },
    };

    try {
      await api.post(`/values/devices/${deviceId}`, payload);

      // create MI summary for table
      const miSummary = miData
        .map(
          (s) =>
            `${s.slave_id.slice(0, 4)}: ${s.registers
              .map((r) => r.value[0])
              .join(", ")}`
        )
        .join(" | ");

      setRows((prev) =>
        [
          {
            ts: payload.ts,
            di1,
            di2,
            ai1,
            ai2,
            miSummary,
          },
          ...prev,
        ].slice(0, 100)
      ); // keep last 100 rows
    } catch (err) {
      console.error("Failed to push values", err);
    }
  };

  const start = () => {
    if (timerRef.current) return;
    pushValues();
    timerRef.current = setInterval(pushValues, 5000);
    setRunning(true);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.VIEW}>
      <SectionWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">Device Value Simulator</h1>
              <p className="text-sm text-gray-500">
                Random telemetry pushed every 5 seconds
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                running
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {running ? "RUNNING" : "STOPPED"}
            </span>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={start}
              disabled={running}
              className="px-4 py-2 rounded border border-green-600 text-green-700
                         hover:bg-green-50 disabled:opacity-50"
            >
              ▶ Start
            </button>

            <button
              onClick={stop}
              disabled={!running}
              className="px-4 py-2 rounded border border-red-500 text-red-600
                         hover:bg-red-50 disabled:opacity-50"
            >
              ⏹ Stop
            </button>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-center">DI_1</th>
                  <th className="px-3 py-2 text-center">DI_2</th>
                  <th className="px-3 py-2 text-center">AI_1</th>
                  <th className="px-3 py-2 text-center">AI_2</th>
                  <th className="px-3 py-2 text-left">MI_1 Values</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-400"
                    >
                      No data yet
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-none hover:bg-gray-50"
                    >
                      <td className="px-3 py-2 text-gray-500">
                        {new Date(row.ts).toLocaleTimeString()}
                      </td>
                      <td className="px-3 py-2 text-center">{row.di1}</td>
                      <td className="px-3 py-2 text-center">{row.di2}</td>
                      <td className="px-3 py-2 text-center">{row.ai1}</td>
                      <td className="px-3 py-2 text-center">{row.ai2}</td>
                      <td className="px-3 py-2 text-xs">{row.miSummary}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>
    </RoleProtectedGuard>
  );
}
