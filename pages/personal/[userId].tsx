import { ScreenLoader } from "components/ScreenLoader/ScreenLoader";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Personal: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/');
  }, []);

  return <ScreenLoader />
};

export default Personal;
