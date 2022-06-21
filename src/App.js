import './App.css';
import {useState, useEffect} from "react"
import DocumentTitle from "react-document-title"

const App = ()=> {
  
  const [countries, setCountries] = useState([])

  const [word, setWord] = useState("")

  const [dataFilter] = useState(["name"])


  
  


  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      setCountries(data)
    })
  },[])

  //ฟังก์ชันการใส่ comma คั่นตัวเลข
  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

   //ฟังก์ชันการค้นหาข้อมูลที่สนใจ
  const searchCountries = (countries)=>{
    return countries.filter((item)=>{      
      return dataFilter.some((filter)=>{                    
        return item[filter].common.toString().toLowerCase().indexOf(word.toLowerCase())  > -1       
      })
    })
  }



  return (
    <div className = "container">
      <DocumentTitle title="Search-filter Countries"/>
      <div className="search">
        <label htmlFor="search-form">
          <input type="text" 
          className="search-input" 
          placeholder="ค้นหาข้อมูลประเทศที่ต้องการ (ชื่อประเทศ)" 
          value={word}
          onChange={(e)=>setWord(e.target.value)}
          />
        </label>
      </div>

      <ul className="row">
        {searchCountries(countries).map((item, index)=>{
          return(
            <li key={index}>
              <div className="card">
                <div className="card-title">
                  <img src={item.flags.png} alt={item.name.common} />
                </div>
                <div className="card-body">
                  <div className="card-description">
                    <h2>{item.name.common}</h2>
                    <ol className="card-list">
                      <li>ประชากร : <span>{formatNumber(item.population)}</span> คน </li>
                      <li>ภูมิภาค : <span>{item.region}</span></li>
                      <li>เมืองหลวง : <span>{item.capital}</span></li>
                    </ol>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
