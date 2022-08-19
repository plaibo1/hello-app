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
              <Row>
                <Col md={6}>
                  <StyledCard
                    icon={
                      <Image
                        src="/images/icons/people_search.svg"
                        height={36}
                        width={36}
                        alt="icon"
                      />
                    }
                    title="Простой поиск"
                    text="Простой и удобный поиск людей поблизости, использующий bluetooth и работающий в фоне"
                  />
                </Col>
                <Col md={6}>
                  <StyledCard
                    icon={
                      <Image
                        src="/images/icons/account_filter.svg"
                        height={36}
                        width={36}
                        alt="icon"
                      />
                    }
                    title="Фильтры по категориям"
                    text="Система фильтрации, позволяющая тонко настроить поиск и находить только нужные вам контакты и знакомства"
                  />
                </Col>
                <Col md={6}>
                  <StyledCard
                    icon={
                      <Image
                        src="/images/icons/message.svg"
                        height={36}
                        width={36}
                        alt="icon"
                      />
                    }
                    title="Обмен сообщениями"
                    text="Короткие Push-сообщения, позволяющие быстро обмениваться своим профилем с другими людьми"
                  />
                </Col>
                <Col md={6}>
                  <StyledCard
                    icon={
                      <Image
                        src="/images/icons/slide_settings.svg"
                        height={36}
                        width={36}
                        alt="icon"
                      />
                    }
                    title="Широкий выбор настроек"
                    text="Настройки профилей и аккаунта, позволяющие настроить ваш опыт взаимодействия с приложением"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Home;
