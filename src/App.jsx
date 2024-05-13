import { useState } from 'react'
import './App.css'
function App() {
  const [search, setSearch] = useState('')
 
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };
  
  return (
    <div className='flex inline-flex gap-4 mt-20'>
  	  <input 
        type="text" 
        onChange={handleInputChange} 
        value={search} 
        className='rounded-s-sm text-center drop-shadow-2xl border' 
        placeholder='Insert your City' 
      />
      <button onSubmit={onSubmit} className='rounded-s-sm drop-shadow-2xl'>
        <img 
          src="src\assets\icons\search-svgrepo-com.svg" 
          className='search-btn' 
          alt="Search City Button" />
      </button>    
    </div>
  )
}

export default App
