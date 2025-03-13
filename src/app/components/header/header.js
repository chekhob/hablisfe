import Link from "next/link";
import NavLink from "../nav-link/nav-link";
import styles from "./header.module.css";
const links = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" },
];

export default function Header() {
  return (
    <header className={styles.headerCont}>
      <nav className={styles.header}>
        <Link href="/">Our Cool Project</Link>
        <ul className={styles.link}>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}