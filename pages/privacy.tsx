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

const Privacy: NextPage = () => {
  const { t } = useTranslation("login");
  return (
    <Layout meta={{ title: t("metaTitle") }}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle1>Пользовательское соглашение</StyledTitle1>
            <StyledSubhead>
              Настоящее Соглашение определяет условия использования
              Пользователями материалов и сервисов сайта www. (далее — «Сайт»).
            </StyledSubhead>
            <StyledTitle3>1.Общие условия</StyledTitle3>
            <StyledSubhead>
              1.1. Использование материалов и сервисов Сайта регулируется
              нормами действующего законодательства Российской Федерации.
              <br></br>
              <br></br>
              1.2. Настоящее Соглашение является публичной офертой. Получая
              доступ к материалам Сайта Пользователь считается присоединившимся
              к настоящему Соглашению.
              <br></br>
              <br></br>
              1.3. Администрация Сайта вправе в любое время в одностороннем
              порядке изменять условия настоящего Соглашения. Такие изменения
              вступают в силу по истечении 3 (Трех) дней с момента размещения
              новой версии Соглашения на сайте. При несогласии Пользователя с
              внесенными изменениями он обязан отказаться от доступа к Сайту,
              прекратить использование материалов и сервисов Сайта.
            </StyledSubhead>
            <StyledTitle3>2. Обязательства Пользователя</StyledTitle3>
            <StyledSubhead>
              2.1. Пользователь соглашается не предпринимать действий, которые
              могут рассматриваться как нарушающие российское законодательство
              или нормы международного права, в том числе в сфере
              интеллектуальной собственности, авторских и/или смежных правах, а
              также любых действий, которые приводят или могут привести к
              нарушению нормальной работы Сайта и сервисов Сайта.
              <br></br>
              <br></br>
              2.2. Использование материалов Сайта без согласия правообладателей
              не допускается (статья 1270 Г.К РФ). Для правомерного
              использования материалов Сайта необходимо заключение лицензионных
              договоров (получение лицензий) от Правообладателей.
              <br></br>
              <br></br>
              2.3. При цитировании материалов Сайта, включая охраняемые
              авторские произведения, ссылка на Сайт обязательна (подпункт 1
              пункта 1 статьи 1274 Г.К РФ).
              <br></br>
              <br></br>
              2.4. Комментарии и иные записи Пользователя на Сайте не должны
              вступать в противоречие с требованиями законодательства Российской
              Федерации и общепринятых норм морали и нравственности.
              <br></br>
              <br></br>
              2.5. Пользователь предупрежден о том, что Администрация Сайта не
              несет ответственности за посещение и использование им внешних
              ресурсов, ссылки на которые могут содержаться на сайте.
              <br></br>
              <br></br>
              2.6. Пользователь согласен с тем, что Администрация Сайта не несет
              ответственности и не имеет прямых или косвенных обязательств перед
              Пользователем в связи с любыми возможными или возникшими потерями
              или убытками, связанными с любым содержанием Сайта, регистрацией
              авторских прав и сведениями о такой регистрации, товарами или
              услугами, доступными на или полученными через внешние сайты или
              ресурсы либо иные контакты Пользователя, в которые он вступил,
              используя размещенную на Сайте информацию или ссылки на внешние
              ресурсы.
              <br></br>
              <br></br>
              2.7. Пользователь принимает положение о том, что все материалы и
              сервисы Сайта или любая их часть могут сопровождаться рекламой.
              Пользователь согласен с тем, что Администрация Сайта не несет
              какой-либо ответственности и не имеет каких-либо обязательств в
              связи с такой рекламой.
            </StyledSubhead>
            <StyledTitle3>3. Прочие условия</StyledTitle3>
            <StyledSubhead>
              3.1. Все возможные споры, вытекающие из настоящего Соглашения или
              связанные с ним, подлежат разрешению в соответствии с действующим
              законодательством Российской Федерации.
              <br></br>
              <br></br>
              3.2. Ничто в Соглашении не может пониматься как установление между
              Пользователем и Администрации Сайта агентских отношений, отношений
              товарищества, отношений по совместной деятельности, отношений
              личного найма, либо каких-то иных отношений, прямо не
              предусмотренных Соглашением.
              <br></br>
              <br></br>
              3.3. Признание судом какого-либо положения Соглашения
              недействительным или не подлежащим принудительному исполнению не
              влечет недействительности иных положений Соглашения.
              <br></br>
              <br></br>
              3.4. Бездействие со стороны Администрации Сайта в случае нарушения
              кем-либо из Пользователей положений Соглашения не лишает
              Администрацию Сайта права предпринять позднее соответствующие
              действия в защиту своих интересов и защиту авторских прав на
              охраняемые в соответствии с законодательством материалы Сайта.
            </StyledSubhead>
            <StyledSubhead>
              Пользователь подтверждает, что ознакомлен со всеми пунктами
              настоящего Соглашения и безусловно принимает их.
            </StyledSubhead>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Privacy;