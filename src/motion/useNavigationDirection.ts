import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRouteIndex } from "./routes";

export function useNavigationDirection(): number {
  const { pathname } = useLocation();
  const currentIndex = getRouteIndex(pathname);
  const [previousIndex, setPreviousIndex] = useState(currentIndex);

  const direction = currentIndex >= previousIndex ? 1 : -1;

  useEffect(() => {
    setPreviousIndex(currentIndex);
  }, [currentIndex]);

  return direction;
}
