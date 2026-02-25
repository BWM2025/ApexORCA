import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <img
        src="/apex-logo-banner.png"
        alt="ApexORCA"
        width={160}
        height={48}
        className="h-10 w-auto sm:h-12 sm:w-auto"
      />
    </Link>
  );
}
