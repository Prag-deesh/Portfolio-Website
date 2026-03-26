/* ── Skills ─────────────────────────────────── */

import {
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiNextdotjs,
  SiPython, SiAndroidstudio, SiGithub, SiFirebase, SiCplusplus,
  SiSpringboot, SiFramer, SiOpenai, SiUnity, SiTailwindcss,
} from 'react-icons/si'
import {
  HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineCube,
  HiOutlineLightningBolt, HiOutlineSearch, HiOutlineRefresh, HiOutlineBadgeCheck,
  HiOutlineKey, HiOutlineLockClosed, HiOutlineFingerPrint,
} from 'react-icons/hi'
import { BsBrush, BsPalette, BsHeadsetVr, BsController } from 'react-icons/bs'
import { FaJava } from 'react-icons/fa'
import type { SkillCategory, SoftSkill } from '../interfaces'

export const primarySkills: SkillCategory = {
  title: 'Web Development',
  featured: true,
  skills: [
    { name: 'React', icon: <SiReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'Prompting & Agents', icon: <SiOpenai /> },
    { name: 'HTML & CSS', icon: <SiHtml5 /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'GitHub', icon: <SiGithub /> },
    { name: 'Node.js', icon: <SiNodedotjs /> },
    { name: 'Spring Boot', icon: <SiSpringboot /> },
    { name: 'Architecture', icon: <HiOutlineCube /> },
    { name: 'Animations', icon: <SiFramer /> },
    { name: 'Optimization', icon: <HiOutlineLightningBolt /> },
    { name: 'Analytics & SEO', icon: <HiOutlineSearch /> },
  ],
}

export const secondarySkills: SkillCategory[] = [
  {
    title: 'Coding',
    skills: [
      { name: 'Java', icon: <FaJava /> },
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'Python', icon: <SiPython /> },
    ],
  },
  {
    title: 'Mobile',
    skills: [
      { name: 'Android Studio', icon: <SiAndroidstudio /> },
      { name: 'Firebase', icon: <SiFirebase /> },
    ],
  },
  {
    title: 'VR & Game',
    skills: [
      { name: 'Virtual Reality', icon: <BsHeadsetVr /> },
      { name: 'Game Dev', icon: <BsController /> },
      { name: 'Code Animations', icon: <SiFramer /> },
      { name: 'Unity', icon: <SiUnity /> },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Photoshop', icon: <BsBrush /> },
      { name: 'Illustrator', icon: <BsPalette /> },
    ],
  },
  {
    title: 'Cyber',
    skills: [
      { name: 'Cryptography', icon: <HiOutlineKey /> },
      { name: 'Encryption', icon: <HiOutlineLockClosed /> },
      { name: 'Digital Signatures', icon: <HiOutlineFingerPrint /> },
    ],
  },
]

export const softSkills: SoftSkill[] = [
  { name: 'Critical Thinking', icon: <HiOutlineLightBulb /> },
  { name: 'Adaptability', icon: <HiOutlineRefresh /> },
  { name: 'Fast Learner', icon: <HiOutlineLightningBolt /> },
  { name: 'Collaboration', icon: <HiOutlineUserGroup /> },
  { name: 'Ownership', icon: <HiOutlineBadgeCheck /> },
]
