import loginUser from '../Moduls/loginModul.js'
import commonHandler from './commonHandler.js'
import notifyHandler from './notifyHandler.js'

export default async function loginHandler(){
    await commonHandler.call(this, 'Views/Registration&Login/login.hbs')

    let formRef = document.getElementById('login-form')

    formRef.addEventListener('submit', (e) => {
        e.preventDefault()
        notifyHandler(null, 'loadingBox')

        loginUser.call(this, formRef).then(async(response) => {

            await notifyHandler(response, 'successBox')
            setTimeout(() => {
                this.redirect('#/home')
            }, 1000)

        }).catch((error) => {

            if (error.message) {
                notifyHandler(error.message, 'errorBox')
            } else {
                notifyHandler(error, 'errorBox')
            }
        })
    })
}