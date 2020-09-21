import commonHadnler from './commonHandler.js'
import profileModul from '../Moduls/profileModul.js'

export default async function profileHadnler() {

    this.username = localStorage.getItem('username')

    let user = await profileModul()

    if (user.treks.includes('none')) {
        this.treks = false
    } else if (typeof user.treks == 'string') {
        this.treks = [user.treks]
    } else {
        this.treks = [...user.treks]
    }

    this.length = this.treks.length

    await commonHadnler.call(this, '../Views/Profile/profile.hbs')

}