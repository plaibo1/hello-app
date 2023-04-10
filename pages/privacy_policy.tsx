import type { GetServerSideProps, NextPage } from "next";
import { LoginForm } from "../components/FormComponents";
import classes from "../styles/Login.module.scss";
import { checkAuth } from "../helpers/checkAuth";
import { Layout } from "components/LayoutComponents/Layout";
import useTranslation from "next-translate/useTranslation";
import Container from "components/LayoutComponents/Container";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledSubhead,
  StyledTitle1,
  StyledTitle3,
} from "components/GlobalComponents";
import { PrivacyContent } from "components/PrivacyAndTermsContent";
import { useRouter } from "next/router";

const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation("layout");
  const { locale } = useRouter();

  return (
    <Layout meta={{ title: t("footer.privacyPolicy") }}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle1>{t("footer.privacyPolicy")}</StyledTitle1>
            <PrivacyContent locale={locale} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
