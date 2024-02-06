import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="flex mx-auto rounded-xl bg-blue-200 items-center w-max">
        <ul className="flex gap-6 mx-4">
          <li className="hover:bg-blue-400 rounded-xl px-3 py-2 mx-auto my-2">
            <Link href="#">About</Link>
          </li>
          <li className="hover:bg-blue-400 rounded-xl px-3 py-2 mx-auto my-2">
            <Link href="#">Projects</Link>
          </li>
          <li className="hover:bg-blue-400 rounded-xl px-3 py-2 mx-auto my-2">
            <Link href="#">Client space</Link>
          </li>
          <li className="hover:bg-blue-400 rounded-xl px-3 py-2 mx-auto my-2">
            <Link href="#">Chat</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
