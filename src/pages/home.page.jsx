import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Home</h1>
      <p>React and Redux</p>
      <Link to="about" className="btn btn-primary btn-lg">
        learn more
      </Link>
    </div>
  )
}
