const axios = require("axios");
const fs = require("fs");
const { env } = require("process");

const REAL_URL = "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch"
const FILE_DESTINATION = "./client/src/data.json"



  const generateRealConfig = (page) => { 
    return {
        method: 'GET',
        url: REAL_URL,
        params: {location: 'Jersey City, NJ', page: page},
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY, 
          'x-rapidapi-host': 'zillow-com1.p.rapidapi.com' 
        }
      }
}

  let data = [];
  let pageNum = 20;
  let currentPage = 0; 
  
  getData()
  
  function getData() {
      axios.request(generateRealConfig(currentPage)).then(
          res => {
              console.log(res.data)
              data = [...data, ...res.data.props]
              currentPage++
              if (currentPage > pageNum || res?.data?.props?.length === 0 || !res?.data?.props?.length) {
                console.log("saving data")
                let dataString = JSON.stringify(data);
                fs.writeFileSync(FILE_DESTINATION, dataString);
              } else {
                  setTimeout(getData, 1000)
              }
          }
      ).catch(err => {
          console.log(err)
          console.log("saving data anyway")
          let dataString = JSON.stringify(data);
          fs.writeFileSync(FILE_DESTINATION, dataString);
      })
  }
