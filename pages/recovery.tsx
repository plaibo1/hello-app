import type { NextPage } from "next";
import * as cookie from "cookie";
import Head from "next/head";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { Layout } from "../components/LayoutComponents/Layout";
import Container from "../components/LayoutComponents/Container";
import {
  StyledCard,
  StyledTitle1,
  StyledTitle2,
  StyledTitle4,
  StyledDivider,
  StyledSubhead,
  StyledNumericList,
} from "../components/GlobalComponents";
import { RecoveryForm } from "../components/FormComponents";
import classes from "../styles/Recovery.module.css";
import { Row, Col } from "react-flexbox-grid";
import { getSelfInfo } from "../services";

const Recovery: NextPage = () => {
  const { t } = useTranslation("common");
  return (
    <section className={classes.recovery}>
      <Container>
        <Row center="xs" middle="xs">
          <Col lg={5}>
            <div className={classes.formWrap}>
              <RecoveryForm />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export const getServerSideProps = async ({ req, res }: any) => {
  let initialState = {
    user: {
      auth: false,
      data: {},
      premium: {
        autoPayment: false,
        tariff: "",
        unactivate: 0,
      },
    },
  };
  if (cookie.parse(req.headers.cookie).access_token) {
    const userInfo = await getSelfInfo(
      cookie.parse(req.headers.cookie).access_token
    );
    console.log(userInfo);
    initialState = {
      user: {
        auth: true,
        data: userInfo,
        premium: {
          autoPayment: false,
          tariff: "",
          unactivate: 0,
        },
      },
    };
    res.setHeader("location", "/account");
    res.statusCode = 302;
    res.end();
    return {
      props: { initialState },
    };
  }

  return {
    props: { initialState },
  };
};

export default Recovery;
