import commonHandler from './commonHandler.js'
import editModul from '../Moduls/editModul.js'
import notifyHandler from './notifyHandler.js'

export default async function editHandler(){
    
    this.username = localStorage.getItem('username')

    this.trekId = localStorage.getItem('trekId')
    
    await commonHandler.call(this, '../Views/Treks/editTrek.hbs')
    
    const inputs = {
        location: document.querySelector('input[name="location"]'),
        dateTime:document.querySelector('input[name="dateTime"]'),
        description:document.querySelector('textarea[name="description"]'),
        imageURL:document.querySelector('input[name="imageURL"]'),
        organizer:document.querySelector('input[name="organizer"]'),
        likes:document.querySelector('input[name="likes"]')
    }
    inputs.location.value = localStorage.getItem('location')
    inputs.dateTime.value = localStorage.getItem('dateTime')
    inputs.description.value = localStorage.getItem('description')
    inputs.imageURL.value = localStorage.getItem('imageURL')
    inputs.organizer.value = localStorage.getItem('organizer')
    inputs.likes.value = localStorage.getItem('likes')

    
    const submitButton = document.querySelector('button[type=submit]')
   
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault()
        const edidedTrak = {
            location: inputs.location.value,
            dateTime: inputs.dateTime.value,
            description: inputs.description.value,
            imageURL: inputs.imageURL.value,
        }
        notifyHandler(null, 'loadingBox')
        editModul(edidedTrak, this.trekId)
            .then(() => notifyHandler('Trek edited successfully', 'successBox'))
        
        setTimeout(async() => {
            this.redirect(['#/home'])
        }, 5000)
    })
}