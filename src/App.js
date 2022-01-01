import React from 'react';
import { connect } from 'react-redux';
import { loadClients, loadClientSkills, loadSkills } from './store';
import HomePage from './Components/HomePage';
import UpdateSkill from './Components/UpdateSkill';
import SingleClient from './Components/SingleClient';
import { HashRouter as Router, Route} from 'react-router-dom';

class App extends React.Component {

  componentDidMount() {
    this.props.loadClients();
    this.props.loadSkills();
    this.props.loadClientSkills();
  }

  render() {
    return (
      <Router>
        <div>
          <h1>ACME Talent Agency</h1>
          <div className='app'>
            <Route exact path='/' component={HomePage} />
            <Route path='/clients/:id' component={SingleClient} />
            <Route path='/skills/:id' component={UpdateSkill} />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({clients, skills}) => {
  return {
    clients,
    skills
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadClients: () => dispatch(loadClients()),
    loadSkills: () => dispatch(loadSkills()),
    loadClientSkills: () => dispatch(loadClientSkills())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)