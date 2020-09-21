import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function homeModul(token){

    const fireBaseTreks = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'treks', token)

    return fireBaseTreks.getAll()

} 