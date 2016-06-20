import React from 'react';

import TextInput from '../common/TextInput';

const SearchForm = ({onSubmit, onChange, searchValue}) => {
    return (
      <div className="searchForm">
        <form onSubmit={onSubmit}>
          <TextInput 
          name="searchInput"
          label="search"
          onChange={onChange}
          placeholder="Search for songs..."
          value={searchValue}
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
};

export default SearchForm;