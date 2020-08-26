window.addEventListener('DOMContentLoaded', function(){
  const jobList = document.querySelector('#job-pannel')
  const searchBtn = document.querySelector('#search-job .button')
  const nextBtn = document.querySelector('.pagination-next')
  let currentPage = 0

  searchBtn.addEventListener('click', apiurl)
  nextBtn.addEventListener('click', apiurl2)

  apiurl()

  function apiurl(event){
    if (event) {
      event.preventDefault()
    }
    let description = document.querySelector('input[name="description"]').value
    let location = document.querySelector('input[name="location"]').value
    let fullCheck = document.querySelector('input[name="full_time"]').checked

    currentPage = 0
    jobList.innerHTML = ''

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
    .then((jobs) => {
      console.log(jobs)
      jobs.forEach((job) => createJob(job))
    })
  }

  function createJob(job){
    const t = document.getElementById('api-template')
    const clone = document.importNode(t.content, true)

    clone.querySelector("h4 a").href = job.url
    clone.querySelector("h4 a").textContent = job.title
    clone.querySelector(".company").href = job.company_url
    clone.querySelector(".company").textContent = job.company
    clone.querySelector(".fulltime").textContent = job.type
    clone.querySelector(".location").textContent = job.location

    // const jobList = document.querySelector('#job-pannel')
    jobList.appendChild(clone)
  }

  function apiurl2(event){
    event.preventDefault()
    // if(按鈕預設是關掉的)
    // 就不執行
    console.log(nextBtn.disabled)
    if(nextBtn.disabled) return;

    let description = document.querySelector('input[name="description"]').value
    let location = document.querySelector('input[name="location"]').value
    let fullCheck = document.querySelector('input[name="full_time"]').checked

    let params = new URLSearchParams()

    params.append('description', description)
    params.append('location', location)
    if (fullCheck) {
      params.append('full_time', 'on')
    }
    params.append('page', currentPage++)
    //最上面有宣告currentPage = 0

    let stringurl = `https://still-spire-37210.herokuapp.com/positions.json?${params.toString()}`

    console.log(stringurl)

    // 按鈕關掉。等資料回來，暫時關掉
    nextBtn.setAttribute('disabled', 'disabled')

    fetch(stringurl)
    .then((response) => response.json())
    .then((jobs) => {
      console.log(jobs)
      jobs.forEach((job) => createJob(job))
      //按鈕打開
      nextBtn.removeAttribute('disabled')
    })
  }
})