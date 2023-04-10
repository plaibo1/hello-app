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
import { TermsContent } from "components/PrivacyAndTermsContent";
import { useRouter } from "next/router";

const UserAgreement: NextPage = () => {
  const { t } = useTranslation("layout");
  const { locale } = useRouter();

  return (
    <Layout meta={{ title: t("footer.termsOfUse") }}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle1>{t("footer.termsOfUse")}</StyledTitle1>
            <TermsContent locale={locale} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserAgreement;
