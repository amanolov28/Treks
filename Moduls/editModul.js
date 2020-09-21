import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function editModul(edidedTrak, trekId){

    const firebaseTrek = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'treks', localStorage.getItem('token'))

    let response = firebaseTrek.patchEntity(edidedTrak, trekId)

    return response
}