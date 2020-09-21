export default async function notifyHandler(text, id) {
    let loadingBox = document.getElementById('loadingBox')
    let baner = document.getElementById(id)   
    baner.setAttribute('style', 'display:block')

    if (id !== 'loadingBox') {
        loadingBox.setAttribute('style', 'display:none')
        baner.textContent = text
        baner.addEventListener('click', () => {
            baner.setAttribute('style', 'display:none')
            return
        })
    
        await setTimeout( async () => {
            await baner.setAttribute('style', 'display:none')
            return
        }, 5000)
    }
    
}