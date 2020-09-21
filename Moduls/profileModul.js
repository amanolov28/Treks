import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default function profileModul(){

    let firebaseUser = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'users', localStorage.getItem('token'))

    return firebaseUser.getById(localStorage.getItem('userId'))
}