import styled from "styled-components";
import { useDarkMode } from "../context/Darkmodecontext";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const {darkmode}=useDarkMode();
  return (
    <StyledLogo>
      {darkmode?<Img src="/logo-dark.png" alt="Logo" />:<Img src="/logo-light.png" alt="Logo" />}
    </StyledLogo>
  );
}

export default Logo;
