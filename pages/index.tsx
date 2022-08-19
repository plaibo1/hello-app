import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { Layout } from "../components/LayoutComponents/Layout";
import Container from "../components/LayoutComponents/Container";
import {
  Card,
  StyledTitle1,
  StyledTitle2,
  StyledTitle4,
  StyledDivider,
  StyledSubhead,
  StyledNumericList,
} from "../components/GlobalComponents";
import classes from "../styles/Home.module.css";
import { Row, Col } from "react-flexbox-grid";

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <section className={classes.jumbotron}>
        <Container>
          <Row>
            <Col md={6}>
              <StyledTitle1>{t("Новые знакомства рядом с вами")}</StyledTitle1>
              <StyledSubhead mb="48px">
                {t(
                  "Ищите новые знакомства и полезные контакты через bluetooth, в приложении Hello"
                )}
              </StyledSubhead>
              <StyledTitle4>
                {t(
                  "Скачивайте приложение и присоединяйтесь с сообществу Hello"
                )}
              </StyledTitle4>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={classes.howItWork}>
        <Container>
          <Row>
            <Col md={6}>
              <StyledTitle2>Как работает Hello</StyledTitle2>
              <StyledDivider mb="24px" />
              <StyledNumericList
                items={[
                  "Скачайте приложение на телефон",
                  "Зарегистрируйтесь и создайте личный или бизнес профиль",
                  "Включите bluetooth и начните искать интересных людей поблизости ",
                ]}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className={classes.whatIsIt}>
        <Container>
          <Row>
            <Col md={12}>
              <StyledTitle2 textAlign="center">Что такое Hello</StyledTitle2>
              <StyledDivider mb="24px" />
              <Card
                icon={
                  <Image
                    src="/images/icon/people_search.svg"
                    height={36}
                    width={36}
                    alt="icon"
                  />
                }
                text=""
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Home;
