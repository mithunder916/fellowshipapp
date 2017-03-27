import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import ListPerson from './ListPerson';

// REFACTOR: instead of using conditional logic to change what this component renders, and having state change based on the URL, I should make another component to display a single person, and simply update React Router to render that component when /peope/:id is accessed

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
    let personId = this.state.singleId;
    if (!personId) this.fetchAllPeople();
    else this.fetchOnePerson(personId);
  }

  // GET requests
  fetchAllPeople(){
    let path = (this.state.singleId) ? '../api/people' : '/api/people';
    // resets single id
    axios.get(path)
      .then(res => {
        this.setState({people: res.data, singleId: undefined})
      })
      .catch(err => console.error(err));
  }

  fetchOnePerson(id){
    this.setState({singleId: id})
    axios.get(`../api/people/${id}`)
      .then(res => {
        this.setState({people: [res.data]})
      })
      .catch(err => console.error(err));
  }
  // POST request
  submitNewPerson(event){
    event.preventDefault();

    let body = {
      name: event.target.name.value,
      favoriteCity: event.target.favoriteCity.value
    },
        personId = this.state.singleId,
        path = personId ? '../api/people' : 'api/people';

    // only updates state/view if on /people page
    axios.post(path, body)
      .then(res => {
        if (path === 'api/people') {
          this.setState({people: [...this.state.people, res.data]})
          // unnecessary because of React; used only to make the GET request show up in Chrome's network tab
          this.fetchAllPeople()
        }
      })
      .catch(err => console.error(err));
  }
  // DELETE request
  deletePerson(id){
    let path = this.state.singleId ? `../api/people/${id}` : `api/people/${id}`;

    axios.delete(path)
      .then(() => {
        this.fetchAllPeople();
      })
      .catch(err => console.error(err));
  }

  toggleUpdateForm(event){
    let updateForm = (event.target.parentNode.nextSibling);
    updateForm.style.display = updateForm.style.display === 'none' ? 'flex' : 'none';
  }

  // PUT request
  updateForm(event, id, city){
    event.preventDefault();
    let path = this.state.singleId ? `../api/people` : `api/people`;

    axios.put(path, {personId: id, favoriteCity: city})
      .then((res) => {
        if (path === `api/people`){
          this.fetchAllPeople();
        } else this.fetchOnePerson(id);
      })
      .catch(err => console.error(err));
  }

  // renders Back button if single id is show, renders 'Create New Person' form if all people are shown
  render() {
    const { people, singleId } = this.state;
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
        {singleId ?
        <div className='backContainer'><button
        className='backButton'
        onClick={() => this.fetchAllPeople()}><Link to={`/people`}>Back to Home</Link></button></div>
        :
        <form id='newPerson' onSubmit={(e) => this.submitNewPerson(e)}>
          <p>Create New Person:</p>
          <input type="text" name='name' defaultValue='Sean' />
          <input type="text" name='favoriteCity' defaultValue='New York' />
          <input className='submitButton' type="submit"/>
        </form>}
      </div>
    )
  }
}
