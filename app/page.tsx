'use client'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Systems from '@/components/Systems'
import Projects from '@/components/Projects'
import Stack from '@/components/Stack'
import ParallelProcesses from '@/components/ParallelProcesses'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Systems />
      <Projects />
      <Stack />
      <ParallelProcesses />
      <Contact />
    </main>
  )
}
