
export default async function logoutModul(){
    
    
    await firebase.auth().signOut();

    
}