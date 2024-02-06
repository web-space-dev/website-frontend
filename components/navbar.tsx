import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function Navbar() {
  const currentPath = usePathname();

  return (
    <>
      <nav className="flex mx-auto rounded-xl bg-blue-200 items-center w-max">
        <ul className="flex items-center gap-6 mx-4">
          <span className={currentPath === '#' ? 'text-white' : 'border-b-2 border-b-black w-8'}>
            <li className="hover:bg-blue-400 rounded-xl px-3 py-2 mx-auto my-2">
              <Link href="#" >About</Link>
            </li>
          </span>
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
