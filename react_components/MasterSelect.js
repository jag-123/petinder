import React from 'react';

export default React.createClass({
    setMasterpieces: function(e) {
      this.setState({
        masterpieces: e.target.value
      });
    },
    setMasterpiece: function(e) {
      this.setState({
        masterpiece: e.target.value
      });
    },

    getInitialState: function() {
      return {
        masterpieces: 0,
        masterpiece: 0
      }
    },

    render: function() {
      var breeds = [
        'breed1',
        'breed2',
      ],
      size = [
        'small',
        'large',
      ],
      sex = [
        'M',
        'F',
      ],
      masters = [
        'Default value ',
        'Breed ',
        'Size ',
        'Sex ',
      ],
      masterpieces = [
        [], breeds, size, sex
      ],
      oMasters = masters.map(function(option, i) {
        return <option value={i}>{option}</option>
      }),
      oMasterpieces = masterpieces[this.state.masterpieces].map(function(option, i) {
        return <option value={i}>{option}</option>
      });

      return (
        <div>
          <select onChange={ this.setMasterpieces }>
            { oMasters }
          </select>
          {
            oMasterpieces && oMasterpieces.length ?
            <span>
              <select onChange={ this.setMasterpiece } >
                { oMasterpieces }
              </select>
              <div className="gap">
                { masters[this.state.masterpieces] } makes { masterpieces[this.state.masterpieces][this.state.masterpiece] }
              </div>
            </span>
            : ''
          }

        </div>
      )
    }
  });