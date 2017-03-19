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
          <Link to={`/people/${person.id}`} onClick={() => fetchOnePerson(person.id)}><div className='nameLink'>{person.name}</div></Link>
        <span>City: {person.favoriteCity}</span>
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
          <span>New City:<input type='text' name='city' defaultValue='Brooklyn' /></span>
          <input className='submitButton' type='submit' value='UPDATE' />
        </form>
      </div>
    )
  }
}
