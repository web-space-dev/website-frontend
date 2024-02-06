export default function Navbar() {
  return (
    <>
      <nav className="flex py-4 px-2 mx-auto rounded-xl bg-blue-200 items-center w-max">
        <ul className="flex gap-6 mx-4">
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Projects</a>
          </li>
          <li>
            <a href="">Client space</a>
          </li>
          <li>
            <a href="">Chat</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
