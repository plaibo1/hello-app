import type { NextPage } from "next";
import { useEffect, useContext } from "react";
import * as cookie from "cookie";
import useTranslation from "next-translate/useTranslation";
import Container from "../components/LayoutComponents/Container";
import { LoginForm } from "../components/FormComponents";
import classes from "../styles/Login.module.css";
import { Row, Col } from "react-flexbox-grid";
import { Context } from "../context";
import { useRouter } from "next/router";
import { getSelfInfo } from "../services";

const Login: NextPage = (props: any) => {
  console.log("props", props);
  const { t } = useTranslation("common");
  const { push } = useRouter();
  const { state, dispatch } = useContext<any>(Context);

  return (
    <section className={classes.signIn}>
      <Container>
        <Row center="xs" middle="xs">
          <Col lg={5}>
            <div className={classes.formWrap}>
              <LoginForm />
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

export default Login;
