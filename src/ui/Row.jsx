import styled, { css } from "styled-components";

// Row styled component uses idea of sharing flex containers throughout app but applying separate style rules based on type prop attached to JSX element.
const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// In React can assign a default prop value to a component - set as vertical in here so if no prop assigned to component will default to use a type prop with a value of vertical and apply rules inside here
Row.defaultProps = {
  type: "vertical",
};

export default Row;
