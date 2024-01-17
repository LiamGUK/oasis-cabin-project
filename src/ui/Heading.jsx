import styled, { css } from "styled-components";

// Use css method from style-components as syntax highlighting for stored style rules to make it easy to understand what variable is for
const test = css`
  text-align: center;
  ${10 > 5 && "background-color: yellow;"}
`;

// Tagged template literal
// Store style template literal to a variable (name with uppercase as is a component) and can then be used in JSX wrapped with content - Will apply style rules to element
// Styled component locally scoped = style rules here will only apply to element declared inside this component
const Heading = styled.h1`
  /* Can access props sent through from styled-component using a callback function with the parameter props and attach name of prop used in app */
  /* Can use props to share style-components functionality but declare separate values using the prop values */
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `} /* Can use JS syntax with CSS declarations with styled components and declare values based on a validation */

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `} /* Can use JS syntax with CSS declarations with styled components and declare values based on a validation */
  /* font-size: ${10 > 5 ? "30px" : "5px"}; */
  /* Can also declare CSS declarations outside and store as strings to a variable and can add inside here */
  /* ${test} */
`;

export default Heading;
