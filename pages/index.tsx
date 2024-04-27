import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
