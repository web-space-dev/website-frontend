import { useEffect, useState } from "react";
import { breakpoints } from "../styles/variables";

export default function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsTablet(
        window.innerWidth < breakpoints.md && window.innerWidth > breakpoints.sm
      );
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  return isTablet;
}
