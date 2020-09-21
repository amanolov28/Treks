import commonHandler from './commonHandler.js'
import detailsModul from '../Moduls/detailsModul.js'
import likeModul from '../Moduls/likeModul.js'
import closeModul from '../Moduls/closeModul.js'
import notifyHandler from './notifyHandler.js'

export default async function detailsHandler() {
    this.username = localStorage.getItem('username')
    this.hash = window.location.hash
    this.trekId = this.hash.substr(this.hash.indexOf('-'))
    localStorage.setItem('trekId', this.trekId)

    this.trek = await detailsModul(this.trekId)

    await commonHandler.call(this, '../Views/Treks/detailsTrek.hbs')

    const [edit, close, like] = document.querySelectorAll('.buttons-together .a-button')

    if (this.username !== this.trek.organizer) {
        edit.setAttribute('style', 'display:none')
        close.setAttribute('style', 'display:none')

    } else {
        like.setAttribute('style', 'display:none')
        localStorage.setItem('location', this.trek.location)
        localStorage.setItem('description', this.trek.description)
        localStorage.setItem('dateTime', this.trek.dateTime)
        localStorage.setItem('imageURL', this.trek.imageURL)
        localStorage.setItem('organizer', this.trek.organizer)
        localStorage.setItem('likes', this.trek.likes)

    }

    like.addEventListener('click', async (e) => {
        e.preventDefault()
        notifyHandler(null, 'loadingBox')
        await likeModul(this.trekId, this.trek.likes)
            .then(() => notifyHandler('You liked the trek successfully', 'successBox'))


        setTimeout(() => {
                this.redirect([`#/home`])
        }, 5000)
    })

    close.addEventListener('click', async (e) => {
        e.preventDefault()
        notifyHandler(null, 'loadingBox')
        await closeModul(this.trekId)
            .then(() => notifyHandler('You closed the trek successfully', 'successBox'))
  
        setTimeout(() => {
            
                this.redirect([`#/home`])
           
        }, 5000)
    })

}