"use client"

import { useEffect, useRef, useState } from "react"
import GradientBackground from "@/components/GradientBackground"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { 
  Code, 
  Database, 
  Globe, 
  Laptop, 
  Palette, 
  Server,
  GitBranch,
  Container,
  TestTube,
  Figma,
  MonitorSmartphone,
  Cpu,
  BrainCircuit,
  Terminal,
  PackageCheck,
  Blocks,
  Briefcase,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp
} from "lucide-react"

const experiences = [
  {
    title: "Digital Systems Development Officer",
    company: "EastWest Bank",
    period: "March 2022 - Sept 2023",
    description: "Led digital infrastructure development and AI implementation. Key achievements include implementing facial recognition systems, developing automated workflows, and creating AI-powered information systems.",
    skills: [
      "TensorFlow", "Node.js", "Power Apps", "Power Automate", 
      "Logic Apps", "Power BI", "AI/ML", "System Architecture"
    ]
  },
  {
    title: "Software Developer",
    company: "David James Development Company",
    period: "2020 - 2021",
    description: "Specialized in Odoo core applications development for international clients in Saudi Arabia and Australia. Implemented Agile methodologies and pair programming practices.",
    skills: ["Odoo", "Agile", "Pair Programming", "International Development"]
  },
  {
    title: "Technical Lead",
    company: "RBT Consulting Corporation",
    period: "2019 - 2020",
    description: "Led client projects using various technologies, managed large databases, and achieved significant cost reductions. Awarded Employee of the Year for exceptional performance.",
    skills: [
      "Django", "Flutter", "Flask", "Database Management",
      "Team Leadership", "Client Communication"
    ]
  },
  {
    title: "Freelance Web Developer",
    company: "Online Freelancing Websites",
    period: "2017 - Present",
    description: "Developed diverse web applications including HRIS, E-commerce, and Management Systems. Expertise in multiple platforms including Odoo, Shopify, WordPress, and Microsoft Dynamics 365.",
    skills: [
      "Odoo", "Shopify", "WordPress", 
      "Microsoft Dynamics 365", "E-commerce", "HRIS"
    ]
  }
]

const skills: Skill[] = [
  { 
    name: "Frontend Development", 
    icon: <Laptop className="w-5 h-5 text-blue-400" />, 
    description: "Building responsive and interactive user interfaces",
    items: [
      { name: "React", icon: <Blocks className="w-4 h-4" />, proficiency: 95 },
      { name: "Next.js", icon: <MonitorSmartphone className="w-4 h-4" />, proficiency: 90 },
      { name: "TypeScript", icon: <Code className="w-4 h-4" />, proficiency: 85 },
      { name: "Tailwind CSS", icon: <Palette className="w-4 h-4" />, proficiency: 95 }
    ]
  },
  { 
    name: "Backend Development", 
    icon: <Server className="w-5 h-5 text-purple-400" />, 
    description: "Creating robust and scalable server applications",
    items: [
      { name: "Node.js", icon: <Terminal className="w-4 h-4" />, proficiency: 90 },
      { name: "Express", icon: <PackageCheck className="w-4 h-4" />, proficiency: 85 },
      { name: "Python", icon: <BrainCircuit className="w-4 h-4" />, proficiency: 80 },
      { name: "Django", icon: <Cpu className="w-4 h-4" />, proficiency: 85 }
    ]
  },
  { 
    name: "Database", 
    icon: <Database className="w-5 h-5 text-green-400" />, 
    description: "Managing and optimizing data storage solutions",
    items: [
      { name: "PostgreSQL", icon: <Database className="w-4 h-4" />, proficiency: 90 },
      { name: "MongoDB", icon: <Database className="w-4 h-4" />, proficiency: 85 },
      { name: "MySQL", icon: <Database className="w-4 h-4" />, proficiency: 85 },
      { name: "Redis", icon: <Database className="w-4 h-4" />, proficiency: 80 }
    ]
  },
  { 
    name: "UI/UX Design", 
    icon: <Palette className="w-5 h-5 text-pink-400" />, 
    description: "Crafting beautiful and intuitive user experiences",
    items: [
      { name: "Figma", icon: <Figma className="w-4 h-4" />, proficiency: 85 },
      { name: "Adobe XD", icon: <Palette className="w-4 h-4" />, proficiency: 80 },
      { name: "User Research", icon: <BrainCircuit className="w-4 h-4" />, proficiency: 75 },
      { name: "Prototyping", icon: <MonitorSmartphone className="w-4 h-4" />, proficiency: 85 }
    ]
  },
  { 
    name: "Web Technologies", 
    icon: <Globe className="w-5 h-5 text-cyan-400" />, 
    description: "Implementing modern web standards and practices",
    items: [
      { name: "HTML5", icon: <Code className="w-4 h-4" />, proficiency: 95 },
      { name: "CSS3", icon: <Palette className="w-4 h-4" />, proficiency: 90 },
      { name: "JavaScript", icon: <BrainCircuit className="w-4 h-4" />, proficiency: 95 },
      { name: "REST APIs", icon: <Globe className="w-4 h-4" />, proficiency: 90 }
    ]
  },
  { 
    name: "Development Tools", 
    icon: <Code className="w-5 h-5 text-yellow-400" />, 
    description: "Utilizing industry-standard development tools",
    items: [
      { name: "Git", icon: <GitBranch className="w-4 h-4" />, proficiency: 90 },
      { name: "Docker", icon: <Container className="w-4 h-4" />, proficiency: 85 },
      { name: "CI/CD", icon: <PackageCheck className="w-4 h-4" />, proficiency: 85 },
      { name: "Testing", icon: <TestTube className="w-4 h-4" />, proficiency: 80 }
    ]
  },
]

interface Skill {
  name: string
  icon: JSX.Element
  description: string
  items: {
    name: string
    icon: JSX.Element
    proficiency: number
  }[]
}

interface SkillCardProps {
  skill: Skill
  inView: boolean
}

const SkillCard = ({ skill, inView }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsExpanded(true)
      }, Math.random() * 500)
      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="group bg-black/40 backdrop-blur-md border-white/10 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] h-full relative">
        <motion.div
          className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: [
              "linear-gradient(to right, rgba(59, 130, 246, 0), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0))",
              "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0), rgba(236, 72, 153, 0))",
              "linear-gradient(to right, rgba(59, 130, 246, 0), rgba(168, 85, 247, 0), rgba(236, 72, 153, 0.1))",
              "linear-gradient(to right, rgba(59, 130, 246, 0), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0))",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <CardContent className="p-6 h-full flex flex-col">
          <motion.div 
            className="flex items-center gap-3 mb-3 cursor-pointer relative group/header"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="p-2 rounded-lg bg-white/5 group-hover/header:bg-white/10 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover/header:opacity-100 blur-sm transition-opacity"
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
                    "linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              {skill.icon}
            </motion.div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white group-hover/header:text-white/90 transition-colors">{skill.name}</h3>
              <p className="text-sm text-white/60 group-hover/header:text-white/70 transition-colors">{skill.description}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-2 rounded-full bg-white/0 group-hover/header:bg-white/5 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              <ChevronDown className="w-5 h-5 text-white/60 group-hover/header:text-white/90 transition-colors relative z-10" />
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mt-4"
              >
                {skill.items.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="gradient-subtle"
                        className="flex items-center gap-1.5 py-1 px-2 group/badge cursor-default"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          {item.icon}
                        </motion.div>
                        {item.name}
                      </Badge>
                      <span className="text-white/60 text-sm">{item.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.proficiency}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative group/progress"
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/0 group-hover/progress:bg-white/10 transition-colors"
                          whileHover={{ scaleX: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function About() {
  const skillsRef = useRef(null)
  const isSkillsInView = useInView(skillsRef, { once: true })
  
  return (
    <main className="min-h-screen pt-20 pb-16">
      <GradientBackground />
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h1>
        
        {/* Background Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8 bg-black/40 backdrop-blur-md border-white/10 hover:bg-black/50 transition-all duration-300">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">My Background</h2>
              <p className="text-white/80 leading-relaxed">
                With over 6 years of professional experience in software development, I have established myself as a versatile Full Stack Developer with a proven track record of delivering high-quality solutions. My expertise spans multiple frameworks and technologies, including Odoo, Laravel, Next.js, and various cloud platforms.
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                Throughout my career, I've had the privilege of working with international clients from Saudi Arabia, Australia, and beyond, developing enterprise-level applications and implementing complex business solutions. My experience includes building comprehensive ERP systems with Odoo, creating scalable web applications with Laravel, and developing modern frontend interfaces with React and Next.js.
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                I take pride in my ability to adapt to new technologies and deliver solutions that not only meet technical requirements but also drive business value. Whether it's developing custom modules for Odoo, architecting database solutions, or implementing responsive user interfaces, I approach each project with a focus on quality, scalability, and user experience.
              </p>
              <div className="mt-4">
                <Button 
                  variant="gradient" 
                  size="sm" 
                  className="gap-2"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1gVG6Xe-zU_coJHPL-rTeLKgOEaMfTOxe/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Skills Section */}
        <div className="space-y-6" ref={skillsRef}>
          <motion.h2 
            className="text-2xl font-semibold text-white text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isSkillsInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
              {skills.map((skill, index) => (
              <div key={index} className="h-full">
                <SkillCard skill={skill} inView={isSkillsInView} />
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Timeline */}
        <Card className="mt-24 mb-8 bg-black/40 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Work Experience</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2" />
              
              {/* Timeline items */}
              <div className="space-y-12">
                {experiences.map((experience, index) => (
                  <div key={index} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-6 transform transition-all duration-300 hover:scale-[1.02] hover:bg-black/70">
                        <h3 className="text-lg font-semibold text-white">{experience.title}</h3>
                        <div className={`flex items-center gap-2 text-white/60 text-sm mb-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          <Briefcase className="w-4 h-4" />
                          <span>{experience.company}</span>
                          <span className="text-white/40">•</span>
                          <Calendar className="w-4 h-4" />
                          <span>{experience.period}</span>
                        </div>
                        <p className="text-white/80 mb-3">{experience.description}</p>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          {experience.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="gradient-subtle"
                              className="hover:scale-105 transition-transform cursor-default"
                            >
                              {skill}
                </Badge>
              ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline dot and line */}
                    <div className="absolute left-1/2 top-8 -translate-x-1/2 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center transform transition-all duration-300 hover:scale-110">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center">
                            {index === 0 ? (
                              <Server className="w-4 h-4 text-white" />
                            ) : index === 1 ? (
                              <Code className="w-4 h-4 text-white" />
                            ) : index === 2 ? (
                              <Terminal className="w-4 h-4 text-white" />
                            ) : (
                              <Globe className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:bg-black/50 transition-all duration-300">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">What I Do</h2>
              
              {/* Core Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <Code className="w-5 h-5 text-blue-400" />
                    <h3 className="font-medium">Full Stack Development</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Develop end-to-end solutions using modern technologies like Next.js, React, Node.js, and Python. 
                    Create scalable architectures and implement robust backend systems.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <Database className="w-5 h-5 text-purple-400" />
                    <h3 className="font-medium">Database Architecture</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Design and optimize database structures using PostgreSQL, MongoDB, and MySQL. 
                    Implement efficient data models and ensure data integrity.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <Globe className="w-5 h-5 text-green-400" />
                    <h3 className="font-medium">API Development</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Create RESTful APIs and GraphQL endpoints with comprehensive documentation. 
                    Integrate third-party services and ensure secure authentication.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <Palette className="w-5 h-5 text-pink-400" />
                    <h3 className="font-medium">UI/UX Implementation</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Transform designs into responsive, accessible, and performant web interfaces. 
                    Implement modern UI patterns and smooth animations.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  I specialize in building modern web applications that combine technical excellence with exceptional user experience. 
                  My approach focuses on creating scalable, maintainable solutions that leverage the latest technologies while adhering to industry best practices.
                </p>
                
                <p>
                  With expertise in both frontend and backend development, I deliver comprehensive solutions that range from single-page applications to complex enterprise systems. 
                  I emphasize clean code architecture, performance optimization, and thorough testing to ensure reliable and efficient applications.
                </p>
                
                <p>
                  My commitment to continuous learning keeps me at the forefront of web development trends and technologies. 
                  I regularly explore new tools and methodologies to provide innovative solutions that give my clients a competitive edge in their respective industries.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}

