function getAnimalData() {
    fetch("https://fakerapi.it/api/v1/persons")
      .then(async function(response) {
        const jsonData = await response.json();
        console.log(jsonData)  
      })
  }