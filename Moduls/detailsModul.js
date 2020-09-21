import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function detailsModul(trekId){

    const firebase = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'treks', localStorage.getItem('token'))

    return await firebase.getById(trekId)

    
}