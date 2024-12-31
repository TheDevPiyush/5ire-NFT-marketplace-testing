import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Marketplace</Link></li>
          <li><Link href="/list">List NFT</Link></li>
          <li><Link href="/admin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}
