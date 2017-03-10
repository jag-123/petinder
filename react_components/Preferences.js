import React, { Component } from 'react';

//Preferences include animal, breed, size, sex, location
export default class Preferences extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pet: []
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		const { checked, value } = e.target;
		let { pet } = this.state;
		if(checked && pet.indexOf(value) === -1) {
			pet.push(value);
		}else {
			pet = pet.filter(i => i !== value)
		}
		this.setState({
			pet
		});
	}
	render() {
		const { pet } = this.state;
		return (
			<div className='container'>
				<h3>Choose your pets:</h3>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Cat'
						checked={pet.indexOf('Cat') !== -1}
						onChange={this.handleChange} />
					Cat
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Dog'
						checked={pet.indexOf('Dog') !== -1}
						onChange={this.handleChange} />
					Dog
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Barnyard'
						checked={pet.indexOf('Barnyard') !== -1}
						onChange={this.handleChange} />
					Barnyard
				</label>
				</div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Bird'
            checked={pet.indexOf('Bird') !== -1}
            onChange={this.handleChange} />
          Bird
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Horse'
            checked={pet.indexOf('Horse') !== -1}
            onChange={this.handleChange} />
          Horse
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Pig'
            checked={pet.indexOf('Pig') !== -1}
            onChange={this.handleChange} />
          Pig
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Reptile'
            checked={pet.indexOf('Reptile') !== -1}
            onChange={this.handleChange} />
          Reptile
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Smallfurry'
            checked={pet.indexOf('Smallfurry') !== -1}
            onChange={this.handleChange} />
          Smallfurry
        </label>
        </div>

				<br />
				Your Pets: {pet.join(', ')}
			</div>
		)
	}
}