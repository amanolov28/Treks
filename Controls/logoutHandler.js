import logoutModul from '../Moduls/logoutModul.js'
import commonHandler from '../Controls/commonHandler.js'
import notifyHandler from './notifyHandler.js'

export default async function logoutHandler() {

    commonHandler.call(this)
    
    notifyHandler(null, 'loadingBox')

    await logoutModul().then(() => notifyHandler('Logout succesfull!', 'successBox'))

    localStorage.clear();

    setTimeout(() => {

        this.redirect(['#/home'])
    },2000)
}