import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// Filter component stores state to the URL (makes it bookmarkable and can be easily shared with other components - won't need to manually provide state to child components etc)
function Filter({ filterField, options }) {
  // useSearchParams hook from React Router allows to read and modify query string in URL - auto gives access to searchParams variable and method to update params
  const [searchParams, setSearchParams] = useSearchParams();

  // Grabs the current query string attached to URL on component mount or uses first value from prop data
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    // set method included with searchParams variables allows to create new query string in URL. 1st argument query name with = and 2nd argument is query value
    searchParams.set(filterField, value);

    // Fix's bug of trying to filter items on last page and the app trying to load the next page which doesn't exist, so defaults back to page 1
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {/* <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
      <FilterButton onClick={() => handleClick("no-discount")}>
        No discount
      </FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>
        With discount
      </FilterButton> */}
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          key={option.value}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
