Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlogs', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const token = `bearer ${loggedInUser.token}`
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/blogs',
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    },
    body: {
      'title': 'testi1',
      'author': 'joku kirjottelija',
      'url': 'http//blog1.example.com'
    }
  })
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/blogs',
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    },
    body: {
      'title': 'testi2',
      'author': 'toinen kirjoittelija',
      'url': 'http://blog2.example.com'
    }
  })
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/blogs',
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    },
    body: {
      'title': 'testi3',
      'author': 'nimetön kirjoittelija',
      'url': 'http://blog3.example.com'
    }
  })
  cy.visit('http://localhost:3000')
})
