import React,{useState} from 'react' 
import Axios from 'axios'
import './App.css'
import Recipe from './components/Recipe.js'
import {v4 as uuidv4} from 'uuid'
import Alert from './components/Alert.js'
document.title='food recipe'
const App=()=> {
  const [query,setQuery]=useState('')
  const [recipes,setRecipes]=useState([])
  const [alert,setAlert]=useState('')
  const APP_ID='26652b7f'
  const APP_KEY='3a09f6b5f4754784592b5c40f1f147ef'
  const URL=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  const getData=async()=>{
    if(query !==""){
     const result=await Axios.get(URL)
     if(!result.data.more){
       return setAlert("No Food With Such Name")
     }
     setRecipes(result.data.hits)
     console.log(result)
     setQuery('')
     setAlert('')
    }
    else{
      setAlert("Please Fill the Form")
    }
  }
  const onSubmit =(e)=>{
   e.preventDefault()
   getData()
  }
  return (
    <div className="App">
      <h1>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert!=='' && <Alert alert={alert}/>}
       <input type="text" placeholder="Search Food" value={query} autoComplete="off" onChange={(e)=>{setQuery(e.target.value)}} />
       <input type="submit" value="search"/>
      </form>
      <div className="recipes">
        {recipes!==[] && recipes.map(recipe=><Recipe key={uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
}

export default App;
