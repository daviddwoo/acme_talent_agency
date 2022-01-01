import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Clients = ({clients, clientSkills}) => {
  return (
    <div className='clients'>
      <h2>Clients</h2>
      {
        clients.map((client) => {
          let clientFilteredSkills = clientSkills.filter((clientSkill) => clientSkill.clientId === client.id)
          return (
            <div key={client.id} className='singleData'>
              <Link to={`/clients/${client.id}`}><span>{client.name}({clientFilteredSkills.length})</span></Link>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = ({clients, clientSkills}) => {
  return {
    clients,
    clientSkills
  }
}
export default connect(mapStateToProps)(Clients)