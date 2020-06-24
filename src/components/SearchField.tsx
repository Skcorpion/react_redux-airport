import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { setFilteredQuery } from '../actions';
import { getFilteredQuery } from '../reducers';
import { RootState } from '../utils/interfaces';

const SearchField: FC<ConnectedProps<typeof connector>> = ({
  filteredQuery,
  setFilteredQuery,
}) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setFilteredQuery(query);
    // eslint-disable-next-line
  }, [query]);

  const [visibleQuery, setVisibleQuery] = useState<string>(query);

  const updateQuery = (value: string) => {
    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    history.push({
      search: searchParams.toString(),
    });
  };

  const handleQueryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVisibleQuery(value);
  };

  const handleButtonQueryUpdate = () => {
    updateQuery(visibleQuery);
  };

  return (
    <div>
      <h1>SEARCH FLIGHT</h1>
      <input
        type="text"
        placeholder="Airline, destination or flight #"
        value={visibleQuery}
        onChange={handleQueryUpdate}
      />
      <button onClick={handleButtonQueryUpdate}>Search</button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  filteredQuery: getFilteredQuery(state),
});
const connector = connect(mapStateToProps, { setFilteredQuery });
export default connector(SearchField);
