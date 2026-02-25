import Link from "next/link";
import Logo from "@/components/logo";

export default function Navigation() {
  return (
    <nav className="border-b border-zinc-800 bg-[#050A0F]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex gap-8 text-[#A1AAB8] hover:text-white transition-colors">
          <Link href="/playbook">Playbook</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/dashboard">Live Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
