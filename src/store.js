import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//---------------Action Creators---------------//

const _loadClients = (clients) => {
  return {
    type: 'LOAD_CLIENTS',
    clients
  }
};

const _loadSkills = (skills) => {
  return {
    type: 'LOAD_SKILLS',
    skills
  }
};

const _loadClientSkills = (clientSkills) => {
  return {
    type: 'LOAD_CLIENT_SKILLS',
    clientSkills
  }
};

const _updateSkill = (skill) => {
  return {
    type: 'UPDATE_SKILL',
    skill
  }
};

const _addClientSkill = (clientSkill) => {
  return {
    type: 'ADD_CLIENTSKILL',
    clientSkill
  }
};

const _deleteClientSkill = (clientSkill) => {
  return {
    type: 'DELETE_CLIENTSKILL',
    clientSkill
  }
};


//---------------Thunks---------------//

export const loadClientSkills = () => {
  return async(dispatch) => {
    const clientSkills = (await axios.get('/api/clientSkills')).data;
    dispatch(_loadClientSkills(clientSkills));
  }
};

export const addClientSkill = (clientSkill) => {
  return async(dispatch) => {
    clientSkill = (await axios.post('/api/clientSkills', clientSkill)).data;
    dispatch(_addClientSkill(clientSkill));
  }
};

export const loadClients = () => {
  return async(dispatch) => {
    const clients = (await axios.get('/api/clients')).data;
    dispatch(_loadClients(clients));
  }
};

export const loadSkills = () => {
  return async(dispatch) => {
    const skills = (await axios.get('/api/skills')).data;
    dispatch(_loadSkills(skills));
  }
};

export const updateSkill = (skill, history) => {
  return async(dispatch) => {
    skill = (await axios.put(`/api/skills/${skill.id}`, skill)).data;
    dispatch(_updateSkill(skill));
    history.push('/');
  }
};

export const deleteClientSkill = (clientSkill) => {
  return async(dispatch) => {
    await axios.delete(`/api/clientSkills/${clientSkill.id}`);
    dispatch(_deleteClientSkill(clientSkill));
  }
};

//---------------combineReducers---------------//

const clientReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CLIENTS':
      return action.clients
    default:
      return state
  }
};

const skillReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_SKILLS':
      return action.skills
    case 'UPDATE_SKILL':
      return state.map((skill) => skill.id === action.skill.id ? action.skill : skill)
    default:
      return state
  }
};

const clientSkillsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CLIENT_SKILLS':
      return action.clientSkills
    case 'DELETE_CLIENTSKILL':
      return state.filter((clientSkill) => clientSkill.id !== action.clientSkill.id)
    case 'ADD_CLIENTSKILL':
      return [...state, action.clientSkill]
    default:
      return state
  }
};

const reducer = combineReducers({
  clients: clientReducer,
  skills: skillReducer,
  clientSkills: clientSkillsReducer
});

//---------------store---------------//

const store = createStore(reducer, applyMiddleware(thunk));

export default store;