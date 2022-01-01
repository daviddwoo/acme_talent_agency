import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteClientSkill, addClientSkill } from '../store';

class SingleClient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client: this.props.client ? this.props.client : {name: '', skills: []},
      currentSkills: this.props.currentSkills.length ? this.props.currentSkills : [],
      skillsLeft: this.props.skillsLeft.length ? this.props.skillsLeft : [],
      currentSkillId: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.currentSkills.length && this.props.currentSkills.length !== 0) {
      this.setState({client: this.props.client, currentSkills: this.props.currentSkills, skillsLeft: this.props.skillsLeft});
    }
    if (!prevProps.client && this.props.client) {
      this.setState({client: this.props.client, currentSkills: this.props.currentSkills, skillsLeft: this.props.skillsLeft});
    }
    if (!prevProps.skillsLeft.length && this.props.skillsLeft.length !== 0) {
      this.setState({client: this.props.client, currentSkills: this.props.currentSkills, skillsLeft: this.props.skillsLeft});
    }
  }

  deleteSkill = async(skill) => {
    try {
      const clientSkill = this.props.clientSkills.find((clientSkill) => clientSkill.skillId === skill.id);
      await this.props.deleteClientSkill(clientSkill);
      this.setState({
        ...this.state, 
        skillsLeft: [...this.state.skillsLeft, skill], 
        currentSkills: this.state.currentSkills.filter((currentSkill) => currentSkill.id !== skill.id)
      });
    }
    catch(ex) {
      console.log(ex);
    }
  }

  onChange = (ev) => {
    this.setState({...this.state, currentSkillId: ev.target.value * 1});
  }

  onSubmit = async(ev) => {
    ev.preventDefault();
    try {
      await this.props.addClientSkill({clientId: this.state.client.id, skillId: this.state.currentSkillId});
      this.setState({
        ...this.state, 
        skillsLeft: this.state.skillsLeft.filter((skillLeft) => skillLeft.id !== this.state.currentSkillId), 
        currentSkills: [...this.props.currentSkills]
      });
    }
    catch(ex) {
      console.log(ex);
    }
  }

  render() {
    const { client, skillsLeft, currentSkills } = this.state;
    return (
      <div className='singleClient'>
        <h1>{client.name}</h1>
        <div className='singleClientSkills'>
          {client.name} has the following skills:
          <div>
            {
              !currentSkills.length ? <ul><li>{'No Skills!'}</li></ul>:
                <ul>
                {
                  currentSkills.map((skill) => {
                    return (
                      <li key={skill.id}> {skill.name} <button onClick={() => this.deleteSkill(skill)}> X </button></li>
                    )
                  })
                }
              </ul>
            }
          </div>
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <select onChange={this.onChange}>
              <option>Select an Option!</option>
              {
                skillsLeft.map((skill) => {
                  return (
                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                  )
                })
              }
            </select>
            <button className='addButton' type='submit'> Add </button>
          </form>
        </div>
        <Link to='/'><button className='buttonDiv'>Back to Home Page</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const client = state.clients.find((client) => client.id === match.params.id * 1);
  const clientSkills = state.clientSkills.filter((clientSkill) => clientSkill.clientId === match.params.id * 1);
  const clientSkillsId = clientSkills.map((clientSkill) => clientSkill.skillId);
  const skillsLeft = state.skills.filter((skill) => !clientSkillsId.includes(skill.id));
  const currentSkills = state.skills.filter((skill) => clientSkillsId.includes(skill.id));
  return {
    client,
    skillsLeft,
    currentSkills,
    clientSkills
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClientSkill: (clientSkill) => dispatch(deleteClientSkill(clientSkill)),
    addClientSkill: (clientSkill) => dispatch(addClientSkill(clientSkill))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleClient)