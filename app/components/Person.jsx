import React, { Component } from 'react';

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {}
    }
  }

  // componentWillMount(){
  //   axios.get('api/people')
  //     .then(res => {
  //       this.setState({people: res.data})
  //     })
  //   .catch(err => console.error(err));
  // }

  render(){
    console.log(this.props)
    const { person } = this.state;
     return (
      <div className='title'>
        Person
      </div>
    )
  }
}
