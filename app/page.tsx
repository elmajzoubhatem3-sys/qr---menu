"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* 🔥 الخلفية المغبشة */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder-food.jpg')",
          filter: "blur(30px)",
          transform: "scale(1.2)",
        }}
      />

      {/* المحتوى */}
      <div className="relative z-10 p-10 text-white text-center">

        <h1 className="text-3xl font-bold">LAMAR CAFFE</h1>

        <p className="mt-4">Fresh meals, beautiful presentation, and a premium dining vibe.</p>

      </div>

    </main>
  );
}