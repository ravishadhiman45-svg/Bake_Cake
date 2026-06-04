import ScrollyCanvas from "./components/ScrollyCanvas";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <NavBar />
      <ScrollyCanvas />
      <Experience />
      <Projects />
      <footer className="py-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Rajesh Chityal.
      </footer>
    </main>
  );
}
