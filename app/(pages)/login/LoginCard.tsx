"use client";

export default function LoginCard() {
  return (
    <div className="min-h-screen flex flex-col gap-4 bg-gray-100 p-10">
      <div className="p-2 bg-red-500 text-white border border-black">
        Padding 2 (p-2)
      </div>
      <div className="p-4 bg-green-500 text-white border border-black">
        Padding 4 (p-4)
      </div>
      <div className="p-6 bg-blue-500 text-white border border-black">
        Padding 6 (p-6)
      </div>
      <div className="p-8 bg-yellow-500 text-white border border-black">
        Padding 8 (p-8)
      </div>
      <div className="p-10 bg-sky-500 text-white border border-black">
        Padding 10 (p-10, sky-500)
      </div>
    </div>
  );
}
