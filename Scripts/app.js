import homeHandler from '../Controls/homeHandler.js'
import registerHandler from '../Controls/registerHandler.js'
import loginHandler from '../Controls/loginHandler.js'
import logoutHandler from '../Controls/logoutHandler.js'
import createTrekHendler from '../Controls/createTrekHandler.js'
import detailsHandler from '../Controls/detailsHandler.js'
import editHandler from '../Controls/editHandler.js'
import profileHandler from '../Controls/profileHandler.js'

(() => {
  var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
  
    // define a 'route'
    this.get('#/', homeHandler);
    this.get('#/home', homeHandler);
    this.get('#/register', registerHandler)
    this.post('#/register', () => false)
    this.get('#/login', loginHandler)
    this.post('#/login', () => false)
    this.get('#/logout', logoutHandler)
    this.get('#/createtrek', createTrekHendler)
    this.post('#/createtrek', () => false)
    this.get('#/home/:id', detailsHandler)
    this.get('#/home/:id/edit', editHandler)
    this.post('#/home/:id/edit', () => false)
    this.get('#/profile', profileHandler)
  });
  // start the application
  app.run('#/');
})()

