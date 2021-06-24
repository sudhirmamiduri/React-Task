import React, { useEffect, useState, useCallback} from 'react';


function CustomTable ({vehiclesData}){
    const [showLoder, setShowLoader] = useState(true);
    const [data, setData]= useState([vehiclesData]);
    const [searchInput, setSearchInput] = useState("");
        const SearchClose = () => {
        setSearchInput("");
        setData(vehiclesData);
      };
    
      const searchHandler = (event) => {
        // list filter search handler here
        const searchInputs = event.currentTarget.value.toUpperCase();
        const trimed = searchInputs.trimStart();
        setSearchInput(trimed);
        const cloneData = JSON.parse(JSON.stringify(data)); // Object.assign([], data);
        
        const filterData = cloneData.filter(item=> item.make.toUpperCase().indexOf(trimed) > -1);
        if(!!trimed){
            setData(filterData);
        }else{
            setData(vehiclesData);
        }
      };

    // Data sorting 
    const sortData = useCallback(
        (event) => {
            const sortBy = event.target.innerHTML.toLowerCase();
            const tempData = JSON.parse(JSON.stringify(data));
            console.log(tempData)
            const sortedData = tempData.sort((a,b)=>a[sortBy].toString().localeCompare(b[sortBy].toString()));
            setData(sortedData);
        },
        [data])
    
   useEffect(()=>{
        if(vehiclesData && vehiclesData.length > 0){
            setData(vehiclesData);
            setShowLoader(false);
        }
   },[vehiclesData])
    return(
        <React.Fragment>
          {showLoder ? (<div className="loader"></div>) : (data? (<>
          <div>
            <input type="text" className="search" name="wildSearch" value={searchInput} onChange={searchHandler}/>
            <button type="button" className="clearBtn" onClick={SearchClose}>Clear</button>
          </div>
            <table className="customers">
	        <thead>
		    <tr>
			<th onClick={sortData} name="year">YEAR</th>
			<th onClick={sortData} name="make" scope="col">MODEL</th>
			<th onClick={sortData} name="model" scope="col">MAKE</th>
		</tr>
	    </thead>
	    <tbody>
            {data.map((vehicle)=>(
                <tr key={vehicle.vehicleId}>
                <td >{vehicle.year}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.make}</td>
            </tr>
            ))}
		
	    </tbody>
         </table>
          </>): null)}
        </React.Fragment>
    )
}

export default CustomTable;