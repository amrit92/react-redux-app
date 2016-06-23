import firebase from '../../Firebase';
import Auth from '../../auth/index';

import {mergeArrayObjectWithKey, mergeObjectWithKey} from '../../../utils/firebaseUtils';

export default class PostFirebase {

    /**
     * Get post lists
     * @returns {Promise}
     */
    getUniversityList() {
        let universitiesFirebase = firebase.child('universities');
        let promise = new Promise((resolve, reject) => {
            try {
                universitiesFirebase.on('value', function (snapshot) {
                    let universities = mergeArrayObjectWithKey(snapshot.val());
                    let loopGetUser = (postIndex) => {
                        if (universityIndex == universities.length) {
                            resolve(universities.reverse())
                        } else {
                            Auth.getProfile(universities[universityIndex].uid).then((profile)=> {
                                universities[universityIndex].user = profile;
                                loopGetUser(universityIndex + 1)
                            });
                        }
                    }
                    loopGetUser(0);
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
        return promise;
    }

    /**
     * Get Post
     * @param id | string
     * @returns {Promise}
     */
    getUniversity(id) {
        let universityFirebase = firebase.child('universities').child(id);
        let promise = new Promise((resolve, reject) => {
            try {
                universityFirebase.on('value', function (snapshot) {
                    let university = snapshot.val();
                                        console.log(snapshot.val());

                    if (university) {
                        Auth.getProfile(university.uid).then((profile)=> {
                            university.user = profile;
                            resolve(mergeObjectWithKey(university, id));
                        });
                    }
                    else {
                        reject('university\'s not exists');
                    }
                });
            }
            catch (e) {
                reject(e.message);
            }
        });
        return promise;
    }

    getResultSummary(id) {
        return new Promise(resolve => {
          setTimeout(() => {
            let profile = {first_name:"amrit"};
            let post = {title:"Fiat", user:profile, color:"white", content: "hihi content"};
            resolve(post);
          }, 1000);
        });
    }

    getUnilist() {
        let universitiesFirebase = firebase.child('universities');
        let promise = new Promise((resolve, reject) => {
            try {
                universitiesFirebase.on('value', function (snapshot) {
                    let universities = mergeArrayObjectWithKey(snapshot.val());
                    resolve(universities);
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
        return promise;
    }

}
