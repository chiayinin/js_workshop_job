window.addEventListener('DOMContentLoaded', function(){
  const searchBtn = document.querySelector('#search-job .button')

  searchBtn.addEventListener('click', apiurl)

  function apiurl(event){
    event.preventDefault()
    let description = document.querySelector('input[name="description"]').value
    let location = document.querySelector('input[name="location"]').value
    let fullCheck = document.querySelector('input[name="full_time"]').checked


    let params = new URLSearchParams()

    params.append('description', description)
    params.append('location', location)
    if (fullCheck) {
      params.append('full_time', 'on')
    }

    let stringurl = `https://still-spire-37210.herokuapp.com/positions.json?${params.toString()}`

    console.log(stringurl)

    // fetch(stringurl).then((response) => {
    //  const { data } = response
    //  console.log(data)
    //  return data
    //})

    fetch(stringurl)
    .then((response) => response.json())
    .then((jobs) => console.log(jobs))

  }



})