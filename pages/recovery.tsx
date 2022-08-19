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
import { RecoveryForm } from "../components/FormComponents";
import classes from "../styles/Recovery.module.css";
import { Row, Col } from "react-flexbox-grid";

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

export default Recovery;
