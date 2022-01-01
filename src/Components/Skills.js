import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Skills = ({skills, clientSkills}) => {
  return (
    <div className='skills'>
      <h2>Skills</h2>
      {
        skills.map((skill) => {
          let clientFilteredSkills = clientSkills.filter((clientSkill) => clientSkill.skillId === skill.id)
          return (
            <div key={skill.id} className='singleData'>
              <Link to={`/skills/${skill.id}`}>
                <span>{skill.name}({clientFilteredSkills.length})</span>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = ({skills, clientSkills}) => {
  return {
    skills,
    clientSkills
  }
}
export default connect(mapStateToProps)(Skills)