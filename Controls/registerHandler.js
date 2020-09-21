import commonHandler from './commonHandler.js'
import createUser from '../Moduls/registerModul.js'
import notifyHandler from './notifyHandler.js'

export default async function registerHandler() {

    await commonHandler.call(this, 'Views/Registration&Login/registration.hbs')

    this.username = ''

    let formRef = document.getElementById('register-form')

    formRef.addEventListener('submit', (e) => {
        e.preventDefault()
        notifyHandler(null, 'loadingBox')
        createUser.call(this, formRef).then(async(response) => {

            await notifyHandler(response, 'successBox')
            setTimeout(() => {
                this.redirect('#/home')
            }, 5000)
            
        }).catch((error) => {

            if (error.message) {
                notifyHandler(error.message, 'errorBox') 
            } else {
                notifyHandler(error, 'errorBox') 
            }
        })
    })
}