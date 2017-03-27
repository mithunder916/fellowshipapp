import React, { Component } from 'react';
import {Link} from 'react-router';

const ListPerson = props => {
  const { person, updateForm, toggleUpdateForm, deletePerson, fetchOnePerson } = props;
  return (
    <div
    className='personContainer'>
        <Link to={`/people/${person.id}`} onClick={() => fetchOnePerson(person.id)}><div className='nameLink'>{person.name}</div></Link>
      <span>City: {person.favoriteCity}</span>
      <div className='imageContainer'>

      </div>
      <div className='buttonRow'>
        <button onClick={(e) => toggleUpdateForm(e)}>EDIT</button>
        <button onClick={() => deletePerson(person.id)}><Link to={`/people`}>DELETE</Link></button>
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

export default ListPerson;
