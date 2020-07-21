import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { setFilteredQuery } from '../../actions';
import './SearchField.scss';

const SearchField: FC<ConnectedProps<typeof connector>> = ({
  setFilteredQuery,
  children,
}) => {
  const history = useHistory();
  const params: { direction: string | undefined } = useParams();
  const direction = params.direction || 'departures';
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setFilteredQuery(query);
    // eslint-disable-next-line
  }, [query]);

  const [visibleQuery, setVisibleQuery] = useState<string>(query);

  const updateQuery = (value: string) => {
    if (params.direction || value) {
      if (value) {
        searchParams.set('query', value);
      } else {
        searchParams.delete('query');
      }

      history.push({
        pathname: direction,
        search: searchParams.toString(),
      });
    }
  };

  const handleQueryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVisibleQuery(value);
  };

  const handleButtonQueryUpdate = () => {
    updateQuery(visibleQuery);
  };

  return (
    <div className="flights__search-field search-field">
      <h2 className="search-field__title">SEARCH FLIGHT</h2>
      <div className="search-field__search-line">
        <input
          className="search-field__input"
          type="text"
          placeholder="Airline, destination or flight №"
          value={visibleQuery}
          onChange={handleQueryUpdate}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleButtonQueryUpdate();
            }
          }}
        />
        <button
          className="search-field__button"
          onClick={handleButtonQueryUpdate}
        >
          Search
        </button>
      </div>
      {children}
    </div>
  );
};

const connector = connect(null, { setFilteredQuery });
export default connector(SearchField);
