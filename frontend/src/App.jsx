import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

const App = () => {
  return (
    <main className='mx-40 min-h-screen'>
        <Navbar />
        <Manager />
    </main>
  )
}

export default App