import React, { Component } from 'react';
import axios from 'axios';

// The Home component might contain your homepage content. Adding new routes to routes.js will cause them to be rendered instead when those urls are accessed.

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: []
    }
  }

  componentWillMount(){
    axios.get('api/people')
      .then(res => {
        this.setState({people: res.data})
      })
      .catch(err => console.error(err));
  }

// add Links to people/:id when certain div is clicked
  render() {
    const { people } = this.state;
    return (
      <div>
        <div className='title'>People</div>
        <div className='peopleContainer'>
          {people && people.map(person => {
            return (
              <div
              key={person.id}
              className='personContainer'>
                <p>{person.name}</p>
                <p>{person.favoriteCity}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
