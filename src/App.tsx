import { FloatingGradient } from "@/components/ui/FloatingGradient";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";

function App() {
  return (
    <div className="relative flex min-h-screen min-h-dvh flex-1 flex-col">
      <FloatingGradient />
      <main className="flex flex-1 flex-col">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
