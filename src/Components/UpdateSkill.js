import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { updateSkill } from '../store'

class UpdateSkill extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      skillName: this.props.skill ? this.props.skill.name : '',
      clients: this.props.skill ? this.props.skill.clients : []
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.skill && this.props.skill) {
      this.setState({
        skillName: this.props.skill.name,
        clients: this.props.skill.clients
      });
    }
  }

  onSubmit = async(ev) => {
    ev.preventDefault();
    try {
      const { skillName, clients } = this.state;
      await this.props.updateSkill({id: this.props.skill.id, name: skillName, clients});
    }
    catch(ex) {
      console.log(ex);
    }
  }

  onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change)
  }

  render() {
    const text = this.props.skill ? this.props.skill.name : '';
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input 
              className='formDiv' 
              type='text' 
              name='skillName' 
              value={this.state.skillName} 
              onChange={this.onChange} />
            <div className='buttonDiv'>
              <button 
                className='formButton' 
                type='submit' 
                disabled={this.state.skillName === text || !this.state.skillName.length}
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
        <div className='buttonDiv'>
          <Link to='/'><button className='formButton'>CANCEL</button></Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const skill = state.skills.find((skill) => skill.id === match.params.id * 1);
  return {
    skill
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateSkill: (skill) => dispatch(updateSkill(skill, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSkill)