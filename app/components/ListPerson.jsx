import React, { Component } from 'react';
import {Link} from 'react-router';

export class ListPerson extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { person, updateForm, toggleUpdateForm, deletePerson, fetchOnePerson } = this.props;
    return (
      <div
      className='personContainer'>
        <div className='nameLink'>
          <Link to={`/people/${person.id}`} onClick={() => fetchOnePerson(person.id)}>{person.name}</Link>
        </div>
        <span>Favorite City: {person.favoriteCity}</span>
        <div className='imageContainer'>

        </div>
        <div className='buttonRow'>
          <button onClick={(e) => toggleUpdateForm(e)}>EDIT</button>
          <button onClick={() => deletePerson(person.id)}>DELETE</button>
        </div>
        <form
        style={{display: 'none'}}
        className='updatePerson'
        onSubmit={(e) => updateForm(e, person.id, e.target.city.value)}>
          <input type='text' name='city' defaultValue='Brooklyn' />
          <input className='submitButton' type='submit' value='Update' />
        </form>
      </div>
    )
  }
}
