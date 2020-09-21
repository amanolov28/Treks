import { createFormEntity } from '../Scripts/form-helpers.js'
import { fireBaseRequestFactory } from '../Scripts/firebase-requests.js'

export default async function createTrekModul(formRef) {

    let form = createFormEntity(formRef, ['location', 'dateTime', 'description', 'imageURL'])
    let trekData = form.getValue()

    let error = '';

    if (trekData.location.length < 6) {
        form.clear()
        throw 'The trek location should be at least 6 characters long'
    }

    if (trekData.description.length < 10) {
        form.clear()
        throw 'The trek description should be at least 10 characters long'
    }

    let userId = localStorage.getItem('userId')

    trekData.organizer = localStorage.getItem('username')
    trekData.likes = 0

    let token = localStorage.getItem('token')

    const firebaseUsers = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'users', token)
    const firebaseTreks = fireBaseRequestFactory('https://treks-f88d1.firebaseio.com/', 'treks', token)

    await Promise.all([
        firebaseTreks.createEntity(trekData),
        firebaseUsers.getById(userId)
    ]).then(([trek, user]) => {
        if (user.treks[0] === 'none') {
            firebaseUsers.patchEntity({ treks: user.treks[0] = trek.name }, userId)
        } else {
            let arr
            if (typeof user.treks == 'string') {
                arr = [user.treks, trek.name]
            } else {
                arr = [...user.treks, trek.name]
            }
            firebaseUsers.patchEntity({ treks: arr }, userId)
            
        }
    })

    if (error) {
        throw new Error(error)
    } else {
        return 'Trek created successfully'
    }
}
