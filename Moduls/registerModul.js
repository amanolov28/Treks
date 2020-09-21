import { createFormEntity } from '../Scripts/form-helpers.js'
import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function createUser(formRef) {
    let form = createFormEntity(formRef, ['email', 'password', 'rePassword'])
    let credentials = form.getValue()

    if (credentials.email.length < 3) {
        form.clear()
        throw 'The email should be at least 3 characters long'
    }

    if (credentials.password.length < 6) {
        form.clear()
        throw 'The password should be at least 6 characters long'
    }

    if (credentials.rePassword !== credentials.password) {
        form.clear()
        throw 'The repeat password should be equal to the password'
    }

    let error = ''
    
    let registeredUser = await firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => {
            localStorage.setItem('username', response.user.email);
        }).catch((e) => {
            form.clear()
            error = e.message
        })

    let token = await firebase.auth().currentUser.getIdToken()
        .then(token => {
            localStorage.setItem('token', token);
        })

    const firebaseUsers = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'users', localStorage.getItem('token'))

    let userId = await firebaseUsers.createEntity({ username: localStorage.getItem('username'), treks: ['none'] })
        .then((e) => {
            localStorage.setItem('userId', e.name)
        })

    if (error) {
        throw new Error(error)
    } else {
        return 'Successfully registered user.'
    }

}