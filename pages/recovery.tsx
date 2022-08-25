import type { NextPage } from "next";
import Container from "../components/LayoutComponents/Container";
import { RecoveryForm } from "../components/FormComponents";
import classes from "../styles/Recovery.module.css";
import { Row, Col } from "react-flexbox-grid";
import { checkAuth } from "../helpers/checkAuth";

const Recovery: NextPage = () => {
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

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Recovery;
