import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  StyledLink,
  StyledLanguageSwitcher,
  StyledTitle3,
  StyledSubhead,
  StyledButton,
  StyledTitle1,
} from "../../GlobalComponents";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import Container from "../Container";
import classes from "./Footer.module.scss";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { PrivacyContent, TermsContent } from "components/PrivacyAndTermsContent";


const Footer = () => {
  const { t } = useTranslation("layout");
  const [termsModalOpen, setTermsModalOpen] = useState<boolean>(false);
  const [policyModalOpen, setPolicyModalOpen] = useState<boolean>(false);

  const {push, query, replace, pathname} = useRouter();

  useEffect(() => {
    if (query?.policy === 'open') {
      setPolicyModalOpen(true);
    }
    if (query?.terms === 'open') {
      setTermsModalOpen(true);
    }
  }, [])

  const handleTermsModalOpen = (event: any) => {
    event?.preventDefault();
    push('?terms=open')
    setTermsModalOpen(true);
  };

  const handlePolicyModalOpen = (event: any) => {
    event?.preventDefault();
    push('?policy=open')
    setPolicyModalOpen(true);
  };

  const handleTermsModalClose = () => {
    replace(pathname, undefined, {shallow: true})
    setTermsModalOpen(false);
  };

  const handlePolicyModalClose = () => {
    replace(pathname, undefined, {shallow: true})
    setPolicyModalOpen(false);
  };
  return (
    <footer className={classes.footer}>
      <Container>
        <Row middle="xs">
          <Col md={2}>
            <StyledLanguageSwitcher />
          </Col>
          <Col md={8} xl={5}>
            <div className={classes.copyrightWrapper}>
              <StyledLink
                fontSize="11px"
                underline
                mr="4px"
                md={{ mb: "4px" }}
                onClick={handleTermsModalOpen}
              >
                {t("footer.termsOfUse")}
              </StyledLink>
              <StyledLink
                fontSize="11px"
                underline
                mr="4px"
                md={{ mb: "4px" }}
                onClick={handlePolicyModalOpen}
              >
                {t("footer.privacyPolicy")}
              </StyledLink>
              <span> © {`${new Date().getFullYear()}`} {t("footer.copyright")}</span>
            </div>
          </Col>
        </Row>
      </Container>
      <Dialog
        onClose={handleTermsModalClose}
        visible={termsModalOpen}
        className={classes.modalWrapper}
        modalRender={() => (
          <div className={classes.modalContent}>
            <div className={classes.modalClose} onClick={handleTermsModalClose}>
              <Image
                src="/images/icons/dismiss.svg"
                width={24}
                height={24}
                alt="Close modal"
              />
            </div>

            <TermsContent />
          </div>
        )}
      ></Dialog>
      <Dialog
        onClose={handlePolicyModalClose}
        visible={policyModalOpen}
        className={classes.modalWrapper}
        modalRender={() => (
          <div className={classes.modalContent}>
            <div
              className={classes.modalClose}
              onClick={handlePolicyModalClose}
            >
              <Image
                src="/images/icons/dismiss.svg"
                width={24}
                height={24}
                alt="Close modal"
              />
            </div>
            <StyledTitle1>
              Политика в отношении обработки персональных данных
            </StyledTitle1>
            
            <div className={classes.linksMDStyles}>
              <PrivacyContent />
            </div>
          </div>
        )}
      ></Dialog>
    </footer>
  );
};

export default Footer;
