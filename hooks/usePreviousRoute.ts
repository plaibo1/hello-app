import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export const usePreviousRoute = () => {
  const { asPath } = useRouter();

  const pathRef = useRef<string>("");

  useEffect(() => {
    pathRef.current = asPath;
  }, [asPath]);

  return pathRef.current;
};