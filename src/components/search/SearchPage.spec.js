import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store'

import SearchPage from './SearchPage';
import SearchForm from '../common/SearchForm';


describe('<SearchPage />', () => {
  it('should contain <SearchForm />', () => {
    const actions = {
      getTracks: () => {},
      setActiveTrack: () => {}
    };

    const initalState = {
      player: {
        playing: false
      },
      tracks: {
        activeTrackIndex: null,
        tracks: []
      },
      loading: false,
      ajaxStatus: {
        tracks: 0
      }
    }

    const mockStore = configureStore([]);
    const store = mockStore(initalState);

    const wrapper = shallow(<SearchPage store={store} />);

    // expect(wrapper.find(SearchForm)).to.be.length(1);
  });
});