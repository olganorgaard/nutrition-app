
import { useEffect, useState } from 'react';
import './App.css';
import { Nutrition } from './Nutrition';
import Swal from 'sweetalert2';
import { LoaderPage } from './LoaderPage';

function App() {

  const [wordSubmitted, setWordSubmitted] = useState("")
  const [mySearch, setMySearch]= useState('')
  const [stateLoader, setStateLoader] = useState(false)
  const [myNutrition, setMyNutrition] = useState()

  const APP_ID = 'dc43f5c9';
  const APP_KEY = '41004f36187693a52846881269bea7f0';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async(ingr) =>{
      setStateLoader(true);

      const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingr: ingr})
      })

      if (response.ok){
        setStateLoader(false);
        const data = await response.json()
        setMyNutrition(data)
      } else{
        setStateLoader(false)
        Swal.fire("you set ingredients incorrectly");
      }
  }

  const finalSearch = (e)=>{
    e.preventDefault()
      setWordSubmitted(mySearch)
  }

  const handleSearch = (e)=>{
    setMySearch(e.target.value)
  }

  useEffect(() =>{
    if (wordSubmitted !== ''){
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/)
      fetchData(ingr)
    }
  }, [wordSubmitted])
  
  return(
    <div>
      {stateLoader && <LoaderPage/>}
      <div className='container'>
        <h1>My Nutritions</h1>
        <form onClick={finalSearch}>
        <input onChange={handleSearch}></input>
        <button>Search</button>
        </form>
      </div>
   <div className='nutritions_items'>
    {myNutrition && Object.values(myNutrition.totalNutrients)
    .map(({label, quantity, unit}, index) => 
      <Nutrition
      key={index}
      label={label}
      quantity={quantity}
      unit={unit}
      />
    )}
   </div>
    </div>
  )}

export default App;
