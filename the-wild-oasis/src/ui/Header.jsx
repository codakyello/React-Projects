import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 1.3rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
}

export default Header;
