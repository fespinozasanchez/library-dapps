'use client'
import { useState } from 'react'
export default function App () {
  const [year] = useState(new Date().getFullYear())
  return (
    <footer className="flex items-center justify-center">
      © Felipe Espinoza, {year}
    </footer>
  )
}
