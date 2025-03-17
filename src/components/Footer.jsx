import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <p>
        &copy; {new Date().getFullYear()} Mark McFadden. All Rights Reserved.
      </p>
      <p>
        <StyledLink href="mailto:mcfadden.a.mark@gmail.com">
          mcfadden.a.mark@gmail.com
        </StyledLink>
      </p>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.nav`
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border-radius: 2%;
  margin-top: 20px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;
