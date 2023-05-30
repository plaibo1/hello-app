import { Context } from "context";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { toggleSubscribeEmailLetter } from "services";
import styles from "./UnsubscribeAgree.module.scss";

const Logo = () => {
  return (
    <svg
      width="100"
      height="80"
      viewBox="0 0 66 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M51.8583 29.9977C51.8583 27.7273 50.0305 25.8867 47.7758 25.8867C45.5212 25.8867 43.6934 27.7273 43.6934 29.9977V36.5302C43.6934 38.8006 45.5212 40.6412 47.7758 40.6412C50.0308 40.6412 51.8583 38.8006 51.8583 36.5302V29.9977Z"
        fill="#4392BF"
      />
      <path
        d="M18.3823 6.21411H18.3823C16.1276 6.21411 14.2998 8.05465 14.2998 10.3251V20.1363C14.2998 22.4068 16.1276 24.2473 18.3823 24.2473H18.3823C20.637 24.2473 22.4647 22.4068 22.4647 20.1363V10.3251C22.4647 8.05465 20.637 6.21411 18.3823 6.21411Z"
        fill="#4392BF"
      />
      <path
        d="M33.8955 10.7224V10.7225C33.8955 12.986 35.7177 14.8209 37.9654 14.8209H47.7884C50.036 14.8209 51.8584 12.986 51.8584 10.7225V10.7224C51.8584 8.45895 50.036 6.62402 47.7884 6.62402H37.9654C35.7177 6.62402 33.8955 8.45895 33.8955 10.7224Z"
        fill="#4392BF"
      />
      <path
        d="M14.2998 29.9853V29.9853C14.2998 32.2488 16.122 34.0838 18.3698 34.0838H28.1927C30.4405 34.0838 32.2627 32.2488 32.2627 29.9853V29.9853C32.2627 27.7218 30.4405 25.8868 28.1927 25.8868H18.3698C16.122 25.8868 14.2998 27.7218 14.2998 29.9853Z"
        fill="#4392BF"
        fillOpacity="0.3"
      />
      <path
        d="M24.0977 20.1489V20.1489C24.0977 22.4124 25.9198 24.2473 28.1676 24.2473H37.9904C40.2385 24.2473 42.0604 22.4124 42.0604 20.1489V20.1489C42.0604 17.8853 40.2385 16.0504 37.9904 16.0504H28.1676C25.9198 16.0504 24.0977 17.8853 24.0977 20.1489Z"
        fill="#4392BF"
        fillOpacity="0.3"
      />
      <path
        d="M33.8955 29.9852C33.8955 27.7216 35.7237 25.8867 37.9716 25.8867C40.2262 25.8867 42.0603 27.7273 42.0603 29.9977V34.0838H37.9654C35.7178 34.0838 33.8955 32.2487 33.8955 29.9852Z"
        fill="#4392BF"
      />
      <path
        d="M24.0977 10.7225C24.0977 8.45899 25.9261 6.62402 28.1739 6.62402C30.4286 6.62402 32.2626 8.46464 32.2626 10.7351V14.821H28.1676C25.9198 14.821 24.0977 12.9861 24.0977 10.7225Z"
        fill="#4392BF"
        fillOpacity="0.3"
      />
      <path
        d="M43.6934 20.1488C43.6934 17.8853 45.5219 16.0504 47.77 16.0504C50.0246 16.0504 51.8587 17.891 51.8587 20.1614V24.2473H47.7637C45.5157 24.2473 43.6934 22.4124 43.6934 20.1488Z"
        fill="#4392BF"
        fillOpacity="0.3"
      />
    </svg>
  );
};

export const UnsubscribeAgree = () => {
  const { state } = useContext<any>(Context)
  const isMailingDisabled = state.user.data.mailingDisabled;
  const { t } = useTranslation("unsubscribe");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubsAgain, setIsSubsAgain] = useState(false);
  const [isError, setIsError] = useState(false);
  const { push } = useRouter();

  const unsubscribeEmail = async () => {
    setIsLoading(true);

    try {
      const res = await toggleSubscribeEmailLetter(false);
      setIsLoading(false);
      if (res === "Success") {
        setIsSuccess(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.error(err);
    }
  };

  const subscribeAgain = async () => {
    setIsLoading(true);

    try {
      const res = await toggleSubscribeEmailLetter(true);
      setIsLoading(false);
      if (res === "Success") {
        setIsSubsAgain(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.error(err);
    }
  };

  const redirectToIndex = () => {
    push("/");
  };

  if (isMailingDisabled && !isSubsAgain) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Logo />
          <div className={styles.title}>{t("alreadyUnsubscribe")}</div>

          <div className={styles.btnRow}>
            <button
              disabled={isLoading}
              onClick={subscribeAgain}
              className={styles.btn}
            >
              {t("subsAgain")}
            </button>
            <button onClick={redirectToIndex} className={styles.btn}>
              {t("goHome")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Logo />

        {!isSuccess && !isMailingDisabled && (
          <>
            <div className={styles.title}>{t("agreeText")}</div>

            <div className={styles.btnRow}>
              <button onClick={redirectToIndex} className={styles.btn}>
                {t("no")}
              </button>

              <button
                disabled={isLoading}
                onClick={unsubscribeEmail}
                className={styles.btn}
              >
                {t("yes")}
              </button>
            </div>
          </>
        )}

        {isSuccess && !isSubsAgain && (
          <>
            <div className={styles.title}>{t("successUnsubscribe")}</div>

            <div className={styles.btnRow}>
              <button
                disabled={isLoading}
                onClick={subscribeAgain}
                className={styles.btn}
              >
                {t("subsAgain")}
              </button>
              <button onClick={redirectToIndex} className={styles.btn}>
                {t("goHome")}
              </button>
            </div>
          </>
        )}

        {isSubsAgain && (
          <>
            <div className={styles.title}>{t("successResubscribe")}</div>

            <div className={styles.btnRow}>
              <button onClick={redirectToIndex} className={styles.btn}>
                {t("goHome")}
              </button>
            </div>
          </>
        )}

        {isError && <div className={styles.error}>{t("errorText")}</div>}
      </div>
    </div>
  );
};
