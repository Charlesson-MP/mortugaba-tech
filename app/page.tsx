import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { About } from "./components/Home/About";
import { Hero } from "./components/Home/Hero";
import { HowToJoin } from "./components/Home/HowToJoin";
import { Members } from "./components/Home/Members";
import { Projects } from "./components/Home/Projects";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Members />
        <HowToJoin />
      </main>
      <Footer />
    </div>
  );
}
