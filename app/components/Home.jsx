import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import { ListPerson } from './ListPerson';

// The Home component might contain your homepage content. Adding new routes to routes.js will cause them to be rendered instead when those urls are accessed.

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      singleId: window.location.pathname.split('/')[2]
    }

    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.fetchOnePerson = this.fetchOnePerson.bind(this);
  }

  componentWillMount(){
    let personId = window.location.pathname.split('/')[2];
    if (!personId) this.fetchAllPeople();
    else this.fetchOnePerson(personId);
  }

  fetchAllPeople(){
    axios.get('api/people')
      .then(res => {
        this.setState({people: res.data})
      })
      .catch(err => console.error(err));
  }

  fetchOnePerson(id){
    this.setState({singleId: id})
    console.log('FETCH ONE')
    axios.get(`../api/people/${id}`)
      .then(res => {
        this.setState({people: [res.data]})
      })
      .catch(err => console.error(err));
  }

  submitNewPerson(event){
    event.preventDefault();

    let body = {
      name: event.target.name.value,
      favoriteCity: event.target.favoriteCity.value
    },
        personId = window.location.pathname.split('/')[2],
        path = personId ? '../api/people' : 'api/people';

    // only updates state/view if on /people page
    axios.post(path, body)
      .then(res => {
        if (path === 'api/people') {
          this.setState({people: [...this.state.people, res.data]})
        }
      })
      .catch(err => console.error(err));
  }

  deletePerson(id){
    axios.delete(`api/people/${id}`)
      .then(() => {
        this.fetchAllPeople();
      })
      .catch(err => console.error(err));
  }

  toggleUpdateForm(event){
    let updateForm = (event.target.parentNode.nextSibling);
    updateForm.style.display = updateForm.style.display === 'none' ? 'flex' : 'none';
  }

  updateForm(event, id, city){
    event.preventDefault();
    axios.put(`api/people/${id}`, {favoriteCity: city})
      .then((res) => {
        this.fetchAllPeople();
      })
      .catch(err => console.error(err));
  }


// separate map return into Person component and render multiple of those?
  render() {
    const { people } = this.state;
    console.log(this.state.singleId)
    return (
      <div>
        <div className='title'>People</div>
        <div className='peopleContainer'>
          {people && people.map(person => {
            return (
              <ListPerson
              key={person.id}
              person={person}
              updateForm={this.updateForm}
              toggleUpdateForm={this.toggleUpdateForm}
              deletePerson={this.deletePerson}
              fetchOnePerson={this.fetchOnePerson} />
            )
          })}
        </div>
        <form id='newPerson' onSubmit={(e) => this.submitNewPerson(e)}>
          <p>Create New Person:</p>
          <input type="text" name='name' defaultValue='Sean' />
          <input type="text" name='favoriteCity' defaultValue='New York' />
          <input className='submitButton' type="submit"/>
        </form>
      </div>
    )
  }
}
