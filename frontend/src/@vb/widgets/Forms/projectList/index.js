import React, { useState, useEffect } from 'react'
import { getProjectsDataId } from 'services/projects'
import { useParams } from 'react-router-dom'

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const { id } = useParams()

  const getProjectsId = async () => {
    const projectsId = await getProjectsDataId(id)
    setProjects(projectsId)
  }
  console.log('****Projetos', projects)

  // const projectsList = projects.map(project => {
  //     return (
  //       <li
  //         key={project.id}
  //       >
  //         {project.name}
  //       </li>
  //     )
  // })

  useEffect(() => {
    getProjectsId()
  }, [])

  return <ul>{projects.name}</ul>
}

export default ProjectsList
