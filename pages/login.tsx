import type { NextPage } from "next";
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
import { LoginForm } from "../components/FormComponents";
import classes from "../styles/Login.module.css";
import { Row, Col } from "react-flexbox-grid";

const Login: NextPage = () => {
  const { t } = useTranslation("common");
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

export default Login;
