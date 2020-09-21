import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function likeModul(trekId){

    const firebaseTreks = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'treks', localStorage.getItem('token'))
    const firebaseUsers = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'users', localStorage.getItem('token'))
    
    let userId = localStorage.getItem('userId')
    let user = await firebaseUsers.getById(userId)
    if (typeof user.treks == 'string') {
        
        user.treks = ['none']
    } else {
        user.treks.splice(user.treks.indexOf(trekId), 1)
        user.treks.length ? false : user.treks.push('none')
    }
    
    
    
    Promise.all([
        firebaseTreks.deleteEntity(trekId),
        firebaseUsers.patchEntity({treks: user.treks}, userId)
    ])
}