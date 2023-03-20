import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "../../components/LayoutComponents/Layout";
import { checkAuth } from "../../helpers/checkAuth";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BrowserView,
  MobileView,
  isDesktop,
} from "react-device-detect";
import { ScreenLoader } from "components/ScreenLoader/ScreenLoader";

const Personal: NextPage = () => {
  const { t } = useTranslation("home");
  const { push } = useRouter();
  // const [agent, setAgent] = useState("");

  useEffect(() => {
    push('/');
    // setAgent(navigator.userAgent);
  }, []);

  return <ScreenLoader />

};

export default Personal;
