import React, {PropTypes} from 'react';

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

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string
};

export default SearchForm;
