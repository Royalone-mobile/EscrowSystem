import * as firebase from "firebase";
import { Alert } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyBDaLBNfJOSUXRl3NC2IOKA9H3IQrfxojc",
    authDomain: "monarch-5fa63.firebaseapp.com",
    databaseURL: "https://monarch-5fa63.firebaseio.com",
    storageBucket: "monarch-5fa63.appspot.com",
};

class Firebase {
    static initialize() {
        firebase.initializeApp(firebaseConfig);
    }
//  
    static storage(){
        return firebase.storage()
    }
    static signup(email, password, callback) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            callback(null);
        })
        .catch(function(error) {
            callback(error.message);
        });
    }
    static getCurrentUser(){
        return firebase.auth().currentUser;
    }
    static login(email, password, callback) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((res)=> {
            callback(null);
        })
        .catch(function(error) {
            callback(error.message);
        });
    }
    static logout(callback){
        firebase.auth().signOut().then(function(){
             callback(null);  
        }).catch(function(error){
            callback(error.message);
        });
    }
    static writeUserdata(userid, data) {

        let path = "users/" + userid;
        console.log(data)
        firebase.database().ref(path).set(data);

    }
    static getUserData(userid, callback) {

        let path = "users/" + userid;

        firebase.database().ref(path).once('value', (snapshot) => {

            var res = [];

            if (snapshot.val()) {
                res = snapshot.val();
            }

            callback(res);
        });
    }
    static getUsersData(callback){
        console.log("getUsersData")
        let path = "users/";
        firebase.database().ref(path).on('value', (snapshot) => {

            var res = [];

            if (snapshot.val()) {
                res = snapshot.val();
            }

            callback(res);
        });
    }
    static getCountChild(name,callback){
        let path = name + "/" ;
        firebase.database().ref(path).on('value', (snapshot) => {
    
            var res = [];

            if (snapshot.val()) {
                res = snapshot.val();
            }
            var length = Object.keys(res).length;
                callback(length);
            });
    }
    static writeJobData(data,bid,callback){
        let path =  "jobs/"+ bid;
        firebase.database().ref(path).set(data);
        callback(null)
      
    }
    static getJobsData(callback) {
        console.log("getJobsData")
        let path = "jobs/";

        firebase.database().ref(path).on('value', (snapshot) => {

            var res = [];

            if (snapshot.val()) {
                res = snapshot.val();
            }

            callback(res);
        });
    }
    static getSelectedJobData(b_id,callback){
        let path =  "jobs/"+b_id;

        firebase.database().ref(path).once('value',(snapshot) =>{
            var res = [];

            if (snapshot.val()) {
                res = snapshot.val();
            }
            callback(res);
        })
    }
    static updateApplicant(b_id,uid,callback){
        let path="jobs/"+b_id+"/applicants"
        firebase.database().ref(path).once('value', (snapshot) => {

            var res = [];
    
            if (snapshot.val()) {
                res = snapshot.val();
                var a=[]
                a[uid]=' '
                var newdata = Object.assign({},res,a)
                firebase.database().ref(path).set(newdata);
            }
            else{
                var a=[]
                a[uid]=' '
                firebase.database().ref(path).set(a);
            }
            
        }).then(function(){
            callback(null);  
       }).catch(function(error){
           callback(error.message);
       });
    }
    static add_brieftoUser(b_id,uid,callback){
        let path = "users/"+uid+"/applied"
        firebase.database().ref(path).once('value', (snapshot) => {

            var res = [];

            if (snapshot.val()) {
                res = snapshot.val();
                var a=[]
                a[b_id]=' '
                var newdata = Object.assign({},res,a)
                firebase.database().ref(path).set(newdata);
            }
            else{
                var a=[]
                a[b_id]=' '
                firebase.database().ref(path).set(a);
            }
            
        }).then(function(){
            callback(null);  
       }).catch(function(error){
           callback(error.message);
       });
    }
    static add_UsertoClient(b_id,uid,callback){
        this.getSelectedJobData(b_id,(res)=>{
            var client_id = res.uid
            let path = "users/"+client_id+"/applied"

            firebase.database().ref(path).once('value', (snapshot) => {

                var res = [];
    
                if (snapshot.val()) {
                    res = snapshot.val();
                    var a=[]
                    a[uid]='unknown'
                    var newdata = Object.assign({},res,a)
                    firebase.database().ref(path).set(newdata);
                }
                else{
                    var a=[]
                    a[uid]='unknown'
                    firebase.database().ref(path).set(a);
                }
                
               }).then(function(){
                        callback(null);  
                }).catch(function(error){
                    callback(error.message);
                });
        }) 
      
    }
    static addtoChat(client_id,brief_id,uid,callback){
        let path="jobs/"+ brief_id+"/applicants/"+uid
        firebase.database().ref(path).set(true)
        //add to friendslist
        this.getUserData(uid,(res)=>{
            let newfriend={uid:uid,name:res.fullname,avatarURL:res.avatarURL}
            path="users/"+client_id+"/friends"
            //checking if it is already exist
            firebase.database().ref(path).once('value',(snapshot) =>{
                var res = [];
    
                if (snapshot.val()) {
                    res = snapshot.val();
                }
                console.log("res=",res)
                let flag = false
                for( i in res)
                {
                    if(res[i].uid == uid){
                        flag = true
                        break
                    }
                }
                if(!flag)
                     firebase.database().ref(path).push(newfriend)
            })
            
        })
        
        this.getUserData(client_id,(res)=>{
            let newfriend = {uid:client_id,name:res.fullname,avatarURL:res.avatarURL}
            path="users/"+uid+"/friends"
            //checking if it is already exist
            firebase.database().ref(path).once('value',(snapshot) =>{
                var res = [];
    
                if (snapshot.val()) {
                    res = snapshot.val();
                }
                console.log("res=",res)
                let flag = false
                for( i in res)
                {
                    if(res[i].uid == client_id){
                        flag = true
                        break
                    }
                }
                if(!flag)
                     firebase.database().ref(path).push(newfriend)
            })
            
        })
        
        callback(null)
    }
    static removefromChat(client_id,brief_id,uid,callback){
        let path="jobs/"+brief_id+"/applicants/"+uid
        firebase.database().ref(path).set(false)
        callback(null)
    }
    static sendMessages(sender_id,receiver_id,messages){
        let array = [sender_id,receiver_id].sort()
        let path = "chats/"+array[0]+"_"+array[1]
        let object = messages[0];
        object.team = array
        firebase.database().ref(path).push(object)
    }
    static getMessages(sender_id,receiver_id,callback) {
        let newdata = [sender_id,receiver_id].sort()
        let path = "chats/"+newdata[0]+"_"+newdata[1]
    
        firebase.database().ref(path).on('value', (snapshot) => {

            var res = [];

            if (snapshot.val()) {
                res = snapshot.val();
            }

            callback(res);
        });
    }
    
}
Firebase.initialize();
export default Firebase;