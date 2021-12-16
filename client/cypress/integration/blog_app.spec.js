describe('Blog app', function () {
  const user = {
    name: 'Testi Testaaja',
    username: 'testaaja',
    password: 'testaaja'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    // check to see that loginform is displayed by default
    cy.get('form').contains('Username')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#loginButton').should('be.visible')
  })

  describe('Login', function () {

    it('succeeded with correct credentials', function () {
      // test login with valid creds
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginButton').click()
      cy.contains(`logged in as ${user.name}`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(`${user.password}wrong`)
      cy.get('#loginButton').click()
      cy.get('.error').contains('learn to type!').should('have.class', 'error').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function () {
      cy.contains('add new blog').click()
      cy.get('#title').type('foobar')
      cy.get('#author').type('Sensei Foobar')
      cy.get('#url').type('http://blog.example.com')
      cy.get('#createBlogButton').click()
      cy.get('#blogList').contains('foobar').contains('Sensei Foobar')
    })

    it('A blog can be liked', function () {
      cy.addBlogs()
      // now let's test liking!
      cy.contains('.blog', 'testi1').contains('view').click()
      cy.contains('.blog', 'testi1').contains('likes 0')
      cy.contains('.blog', 'testi1').contains('like').click()
      cy.get('.success').contains('was liked')
      cy.contains('.blog', 'testi1').contains('likes 1')
    })

    it('A blog can be deleted', function () {
      cy.addBlogs()
      cy.contains('.blog', 'testi2').contains('view').click()
      cy.contains('.blog', 'testi2').contains('remove').click()
      cy.contains('.blog', 'testi2').should('not.exist')
      cy.reload()
      cy.contains('.blog', 'testi2').should('not.exist')
    })

    it('List by likes', function () {
      // this will be a sh**ty script and most certainly not going to be pretty
      cy.addBlogs()
      cy.get('.blog').should('have.length', 3).each((blog, index) => {
        cy.wrap(blog).contains('view').click()
        cy.wrap(blog).contains(`testi${index + 1}`)
      })
      // this SHOULD be refactored, but I guess I'll make it prettier in my project
      cy.contains('.blog', 'testi3').contains('like').click().then(() => {
        cy.contains('.blog', 'testi3').contains('like').click().then(() => {
          cy.contains('.blog', 'testi2').contains('like').click().then(() => {
            cy.wait(500)
            cy.get('.blog').should('have.length', 3).each((blog, index) => {
              cy.wrap(blog).contains(`testi${3 - index}`)
            })
          })
        })
      })
    })
  })
})
