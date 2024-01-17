import styled, { css } from "styled-components";

// Can place styled-component rules in a separate file and export them to use inside a component - localisation will remain the same.
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

// Use css method from style-components as syntax highlighting for stored style rules to make it easy to understand what variable is for
const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  /* With global styles component added can use variables declared inside as normal and will apply values in the local styled components declarations */
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  /* Can access props sent through from styled-component using a callback function with the parameter props and attach name of prop used in app */
  /* Can use props to share style-components functionality but declare separate values using the prop values */
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]} /* cursor: pointer; */
  /* Can use Sass declarations in style-components when wanting to apply style rules to pseudo classes */
  /* &:hover {
    background-color: var(--color-brand-700);
  } */
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
