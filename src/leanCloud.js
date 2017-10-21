import AV from 'leancloud-storage'


var APP_ID = 'CGnHwITxqWGKhY1znCn955TT-gzGzoHsz';
var APP_KEY = 'icVfqMtxLHEz5tWJzbvmj5JY';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export  default AV
export function signUp(username,password,successFn,errorFn){
    var user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.signUp().then(function(loginedUser){
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null,user)
    },function(error){
        errorFn.call(null,error)
        }
    )
    return undefined
}
export function signIn(username,password,successFn,errorFn){
    AV.User.logIn(username,password).then(function(loginedUser){
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null,user)
    },function(error){
        errorFn.call(null,error)
    })
}
export function getCurrentUser(){
    let user = AV.User.current()
    if(user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}
export function signOut(){
    AV.User.logOut()
    return undefined
}
function getUserFromAVUser(AVUser){
    return {
        id:AVUser.id,
        ...AVUser.attributes
    }
}
