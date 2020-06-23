//import {database} from 'firebase/app'

export const where = async (ref, key, value) => {
    return (await ref.orderByChild(key).equalTo(value).once('value')).val()
}

export const range = async (ref, key, start, end) => {
    console.log(start, end)
    return (await ref.orderByChild(key).startAt(start).endAt(end).once('value')).val()
}
/*export const where = async (ref, search) => {
    const keys = Object.keys(search)
    const collection = {}
    for (let key of keys){
        //const end = search[key].replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
        const snap = await ref.orderByChild(key).startAt(search[key].toLowerCase()).endAt(end.toLowerCase())
        for (let element in snap){
            Object.assign(collection, {id: element.key, ...element.val()})
        }
    }
    console.log(collection)
    return collection
}*/


/*export const where = ({ref, search}) => {
    const keys = Object.keys(search)
    ref = db.ref(ref)
    for (key in keys){
        ref.orderByChild(key).equalTo(search[key])
    }
    User.where(name: 'arturo',)
}*/