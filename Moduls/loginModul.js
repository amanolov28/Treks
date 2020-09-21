import { createFormEntity } from '../Scripts/form-helpers.js'
import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function loginUser(formRef) {


    let form = createFormEntity(formRef, ['email', 'password'])

    let formValue = form.getValue();

    let error = '';
    
    let login = await firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password)
        .then(response => {
            localStorage.setItem('username', response.user.email);
        }).catch((e) => {
            form.clear()
            error = e.message
        })

    if (localStorage.getItem('username')) {
        let token = await firebase.auth().currentUser.getIdToken()
            .then(token => {
                localStorage.setItem('token', token);
            })

        const firebaseUsers = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'users', localStorage.getItem('token'))
        let user = await firebaseUsers.getAll().then(obj => {
            let found = Object.keys(obj).find(x => obj[x].username === localStorage.getItem('username'))
            localStorage.setItem('userId', found)

        })
    }

    if (error) {
        throw new Error(error)
    } else {
        return 'Successfully logged user.'
    }
}