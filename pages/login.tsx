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
import { checkAuth } from "../helpers/checkAuth";

const Login: NextPage = (props: any) => {
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

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Login;
