import React, { Component } from 'react';
import axios from 'axios';

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {}
    }
  }

  componentWillMount(){
    axios.get(`../api/people/${this.props.params.id}`)
      .then(res => {
        this.setState({person: res.data})
      })
    .catch(err => console.error(err));
  }

  render(){
    const { person } = this.state;
     return (
      <div className='title'>
        {person.name}
        {person.favoriteCity}
      </div>
    )
  }
}
