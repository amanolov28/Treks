import commonHandler from './commonHandler.js'
import homeModul from '../Moduls/homeModul.js'

export default async function homeHandler() {

    this.username = localStorage.getItem('username')
    this.token = localStorage.getItem('token')

    await commonHandler.call(this)

    if (this.username && this.token) {
        
        // get all treks
        this.treks = await homeModul(this.token)
  
        if (this.treks) {
            this.treks = Object.keys(this.treks).reduce((acc, id) => {
                this.treks[id].id = id
                acc.push(this.treks[id])
                return acc
            }, [])
                .sort((a, b) => b.likes - a.likes)

            this.partials.trek = await this.load('../Views/Treks/trek.hbs')
            await this.partial('../Views/homeTreks.hbs')
        } else{
            await this.partial('../Views/home.hbs')
        }
    } else {
        await this.partial('../Views/home.hbs')
    } 
}