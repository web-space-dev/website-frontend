import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <>
      <nav className="flex fixed bottom-8 inset-x-1/4 mx-auto rounded-xl bg-petrol/20 w-max backdrop-blur-sm">
        <ul className="flex items-center gap-4 mx-1">
          <div className="flex flex-col items-center">
            <li className="hover:bg-petrol/20 rounded-lg px-3 py-1  my-2 transition ease-in-out duration-500">
              <Link href="#">About</Link>
            </li>
            <span
              className={
                currentPath === "#"
                  ? "text-white"
                  : "border-b-[1px] border-b-black w-6"
              }
            ></span>
          </div>
          <div className="flex flex-col items-center">
            <li className="hover:bg-petrol/20 rounded-lg px-3 py-1  my-2 transition ease-in-out duration-500">
              <Link href="#">Projects</Link>
            </li>
            <span
              className={
                currentPath === "#"
                  ? "text-white"
                  : "border-b-[1px] border-b-transparent w-6"
              }
            ></span>
          </div>
          <div className="flex flex-col items-center">
            <li className="hover:bg-petrol/20 rounded-lg px-3 py-1  my-2 transition ease-in-out duration-500">
              <Link href="#">Client space</Link>
            </li>
            <span
              className={
                currentPath === "#"
                  ? "text-white"
                  : "border-b-[1px] border-b-transparent w-6"
              }
            ></span>
          </div>
          <div className="flex flex-col items-center">
            <li className="hover:bg-petrol/20 rounded-lg px-3 py-1  my-2 transition ease-in-out duration-500">
              <Link href="#">chat</Link>
            </li>
            <span
              className={
                currentPath === "#"
                  ? "text-white"
                  : "border-b-[1px] border-b-transparent w-6"
              }
            ></span>
          </div>
        </ul>
      </nav>
    </>
  );
}
