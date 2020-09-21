import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function likeModul(trekId, likes){

    const firebaseTreks = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'treks', localStorage.getItem('token'))
    
    firebaseTreks.patchEntity({likes: (likes+1)}, trekId)



}