<header className="hero relative overflow-hidden rounded-[2rem] mb-8">

  {/* 🔥 BACKGROUND IMAGE BLURRED */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/placeholder-food.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(45px)",
      transform: "scale(1.15)",
    }}
  />

  {/* ❌ خففنا التغميق */}
  <div className="absolute inset-0 bg-white/10" />

  {/* CONTENT */}
  <div className="relative z-10 px-6 py-12 text-white text-center">

    {/* 🔥 LOGO بالنص */}
    <div className="flex flex-col items-center justify-center mb-4">
      <img src="/logo.png" className="h-8 w-8 object-contain mb-2" />
      <h1 className="text-xl font-bold">LAMAR CAFFE</h1>
    </div>

    <p>Fresh meals, beautiful presentation, and a premium dining vibe.</p>
  </div>

</header>