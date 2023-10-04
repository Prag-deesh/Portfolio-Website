import React from 'react'
import './skills.css'
import WebDev from './WebDev'
import MobDev from './MobDev'
import CodeKnow from './CodeKnow'
import DigitalArt from './DigitalArt'
import OtherSkills from './OtherSkills'
import Softskills from './Softskills'

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical level</span>

      <div className="skills__container container grid">
        <WebDev />
        <MobDev />
        <CodeKnow />
        <DigitalArt />
        <OtherSkills />
        <Softskills />
      </div>
    </section>
  )
}

export default Skills