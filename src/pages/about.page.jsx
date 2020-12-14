import React from 'react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div>
      <h2>About</h2>
      <Link to="/" className="btn btn-primary btn-lg">
        back
      </Link>
    </div>
  )
}
