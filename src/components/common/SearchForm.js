import React from 'react';

import TextInput from '../common/TextInput';

const SearchForm = ({onSubmit, onChange, searchValue}) => {
    return (
      <div className="search-bar">
        <form onSubmit={onSubmit}>
          <TextInput 
          name="searchInput"
          label=""
          onChange={onChange}
          placeholder="Search for songs..."
          value={searchValue}
          />
          <input className="submit-btn btn" type="submit" value="Search"/>
        </form>
      </div>
    );
};

export default SearchForm;