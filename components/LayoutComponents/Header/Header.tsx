import React, { useContext } from "react";
import { Logo, StyledLink, Avatar } from "../../GlobalComponents";
import Container from "../Container";
import { Context } from "../../../context";
import classes from "./Header.module.scss";
import { Row, Col } from "react-flexbox-grid";

const Header = () => {
  const { state } = useContext<any>(Context);
  return (
    <header className={classes.header}>
      <Container>
        <Row middle="xs">
          <Col xs={4} xsOffset={4}>
            <Row center="xs">
              <Col xs={12}>
                <Logo />
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <Row end="xs" middle="xs">
              <Col xs={12}>
                {state.user.auth ? (
                  <>
                    <Avatar />
                  </>
                ) : (
                  <StyledLink href="/login">Войти</StyledLink>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
