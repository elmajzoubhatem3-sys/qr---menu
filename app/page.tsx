<header className="hero relative overflow-hidden rounded-[2rem] mb-8">

  {/* 🔥 BACKGROUND IMAGE WITH BLUR */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/placeholder-food.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(12px)",
      transform: "scale(1.1)" // مهم حتى ما تبين الحواف
    }}
  />

  {/* 🔥 DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40" />

  {/* 🔥 CONTENT */}
  <div className="relative z-10 px-6 py-12 text-white text-center">
    <div className="flex items-center justify-center gap-3 mb-4">
      <img src="/logo.png" className="h-12 w-12 object-contain" />
      <h1 className="text-2xl font-bold">LAMAR CAFFE</h1>
    </div>

    <p>Fresh meals, beautiful presentation, and a premium dining vibe.</p>
  </div>
</header>