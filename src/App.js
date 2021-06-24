import React from 'react';
import './App.css';
import CustomTable from './CustomTable';

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("http://api.coxauto-interview.com/api/datasetId")
      .then((response) => response.json())
      .then((result) => {
        const datasetId = result.datasetId;
        return fetch(
          `http://api.coxauto-interview.com/api/${datasetId}/cheat`,
          {
            method: "GET",
          }
        );
      })
      .then((result) => {
        if (!result) {
          const error = new Error("No data found!");
          error.statusCode = 422;
          return error;
        }
        return result.json();
      })
      .then((data) => {
        const tempData = [];
        if (data.dealers) {
          data.dealers.forEach((element) => {
            tempData.push(...element.vehicles);
          });
        }
        setData(tempData);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);
  return (
    <div className="App">
      <CustomTable vehiclesData={data}/>
    </div>
  );
}

export default App;
