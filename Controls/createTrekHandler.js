import commonHandler from './commonHandler.js'
import createTrekModul from '../Moduls/createTrekModul.js'
import notifyHandler from './notifyHandler.js'


export default async function createTrek() {
    this.username = localStorage.getItem('username')

    await commonHandler.call(this, 'Views/Treks/createTrek.hbs')

    let form = document.querySelector('#create-trek-form')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        notifyHandler(null, 'loadingBox')
        createTrekModul.call(this, form)
            .then((response) => {

                notifyHandler(response, 'successBox')

                setTimeout(() => {
                    this.redirect(['#/home'])
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