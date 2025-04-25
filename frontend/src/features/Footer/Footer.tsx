import {
  FooterSelf,
  TopBlock,
  TopBlockWrapper,
  BottomBlock,
  Logo,
  Label,
  BottomBlockSelf,
  Section,
  SocialSelf,
  Address,
  Link,
  Links,
} from "./styled";

import { Container } from "@/App.styled";
import Social from "@/components/MainComponents/Social";

import LogoImage from "@/assets/images/logo.png";

const Footer: React.FC = () => {
  return (
    <FooterSelf>
      <TopBlock>
        <Container>
          <TopBlockWrapper>
            <Section>
              <Logo src={LogoImage}></Logo>
            </Section>
            <Section>
              <SocialSelf>
                <Social />
              </SocialSelf>
              <Address>Göyçay rayonu. Az2023 Heydər Əliyev 207.</Address>
            </Section>
            <Section>
              <Links>
                <Link>
                  <a href="mailto:example@mail.com">
                    <i className="fa-solid fa-envelope fa-xl"></i>
                    goycayditk@mail.ru
                  </a>
                </Link>
                <Link>
                  <a href="https://gditk.edu.az">
                    <i className="fa-brands fa-chrome fa-xl"></i>
                    www.gditk.edu.az
                  </a>
                </Link>
                <Link>
                  <a href="tel:+994202740172">
                    <i className="fa-solid fa-phone fa-xl"></i>+994202740172
                  </a>
                </Link>
              </Links>
            </Section>
          </TopBlockWrapper>
        </Container>
      </TopBlock>
      <BottomBlock>
        <Container>
          <BottomBlockSelf>
            <Label>Bütün hüquqlar qorunur © 2025 GDITK</Label>
          </BottomBlockSelf>
        </Container>
      </BottomBlock>
    </FooterSelf>
  );
};

export default Footer;
