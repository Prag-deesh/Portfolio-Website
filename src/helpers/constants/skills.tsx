/* ──────────────────────────────────────────
   Skills
   Add/remove skills or categories here.
   Each skill needs a name and an icon
   from react-icons.
   ────────────────────────────────────────── */

import type { ReactNode } from 'react'
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs,
  SiMongodb, SiPython, SiFlutter,
  SiGit, SiFirebase, SiBlender, SiFigma,
} from 'react-icons/si'
import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineClock, HiOutlineChat } from 'react-icons/hi'
import { BsBrush, BsPalette } from 'react-icons/bs'

export interface Skill {
  name: string
  icon: ReactNode
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface SoftSkill {
  name: string
  icon: ReactNode
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML & CSS', icon: <SiHtml5 /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'React', icon: <SiReact /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
    ],
  },
  {
    title: 'Mobile Development',
    skills: [
      { name: 'Flutter', icon: <SiFlutter /> },
      { name: 'React Native', icon: <SiReact /> },
      { name: 'Firebase', icon: <SiFirebase /> },
    ],
  },
  {
    title: 'Languages & Tools',
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Git', icon: <SiGit /> },
      { name: 'CSS', icon: <SiCss /> },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Photoshop', icon: <BsBrush /> },
      { name: 'Illustrator', icon: <BsPalette /> },
      { name: 'Blender', icon: <SiBlender /> },
      { name: 'Figma', icon: <SiFigma /> },
    ],
  },
]

export const softSkills: SoftSkill[] = [
  { name: 'Problem Solving', icon: <HiOutlineLightBulb /> },
  { name: 'Team Work', icon: <HiOutlineUserGroup /> },
  { name: 'Time Management', icon: <HiOutlineClock /> },
  { name: 'Communication', icon: <HiOutlineChat /> },
]
