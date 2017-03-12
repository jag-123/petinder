import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

//Preferences include animal, breed, size, sex
export default class Preferences extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pet: [],
			size: [],
			sex: []
		}
		this.handlePetChange = this.handlePetChange.bind(this);
		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleSexChange = this.handleSexChange.bind(this);
		this.submitPage = this.submitPage.bind(this);
	}
	handlePetChange(e) {
		const { checked, value } = e.target;
		var pet = this.state.pet;
		if(checked && pet.indexOf(value) === -1) {
			pet.push(value);
		}else {
			pet = pet.filter(i => i !== value)
		}
		this.setState({
			pet
		});
	}
	handleSizeChange(e) {
		const { checked, value } = e.target;
		var size = this.state.size;
		if(checked && size.indexOf(value) === -1) {
			size.push(value);
		}else {
			size = size.filter(i => i !== value)
		}
		this.setState({
			size
		});
	}
	handleSexChange(e) {
		const { checked, value } = e.target;
		var sex = this.state.sex;
		if(checked && sex.indexOf(value) === -1) {
			sex.push(value);
		}else {
			sex = sex.filter(i => i !== value)
		}
		this.setState({
			sex
		});
	}
	submitPage(e){
		e.preventDefault();
		var preferenceData = {
			pet: this.state.pet,
			size: this.state.size,
			sex: this.state.sex
		}
		$.post('/preferences', preferenceData)
			.done(function(data) {
				browserHistory.push("/getpet");
				console.log(data);
			})
			.error(function(err, status) {
				console.error(status);
			});
	}
	render() {
		var pet = this.state.pet;
		var size = this.state.size;
		var sex = this.state.sex;
		return (
			<div className='container'>
				<h3>Choose your pets:</h3>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='cat'
						checked={pet.indexOf('cat') !== -1}
						onChange={this.handlePetChange} />
					Cat
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='dog'
						checked={pet.indexOf('dog') !== -1}
						onChange={this.handlePetChange} />
					Dog
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='barnyard'
						checked={pet.indexOf('barnyard') !== -1}
						onChange={this.handlePetChange} />
					Barnyard
				</label>
				</div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='bird'
            checked={pet.indexOf('bird') !== -1}
            onChange={this.handlePetChange} />
          Bird
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='horse'
            checked={pet.indexOf('horse') !== -1}
            onChange={this.handlePetChange} />
          Horse
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='pig'
            checked={pet.indexOf('pig') !== -1}
            onChange={this.handlePetChange} />
          Pig
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='reptile'
            checked={pet.indexOf('reptile') !== -1}
            onChange={this.handlePetChange} />
          Reptile
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='smallfurry'
            checked={pet.indexOf('smallfurry') !== -1}
            onChange={this.handlePetChange} />
          Smallfurry
        </label>
        </div>

				<br />
				Your Pets: {pet.join(', ')}

				<h3>Choose your sizes:</h3>
				<div className='checkbox'>
				<label>
					<input type='checkbox' value='S' checked={size.indexOf('S') !== -1} onChange={this.handleSizeChange} />
					Small
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input type='checkbox' value='M' checked={size.indexOf('M') !== -1} onChange={this.handleSizeChange} />
					Medium
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input type='checkbox' value='L' checked={size.indexOf('L') !== -1} onChange={this.handleSizeChange} />
					Large
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input type='checkbox' value='XL' checked={size.indexOf('XL') !== -1} onChange={this.handleSizeChange} />
					XL
				</label>
				</div>

				<br />
				Your Sizes: {size.join(', ')}

				<h3>Choose your sexes:</h3>
				<div className='checkbox'>
				<label>
					<input type='checkbox' value='M' checked={sex.indexOf('M') !== -1} onChange={this.handleSexChange} />
					Male
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input type='checkbox' value='F' checked={sex.indexOf('F') !== -1} onChange={this.handleSexChange} />
					Female
				</label>
				</div>

				<br />
				Your Sexes: {sex.join(', ')}

				<br />

				<form id="preference-page" onSubmit={this.submitPage}>
					<input type="submit" value="Submit"/>
				</form>

			</div>
		)
	}
}
