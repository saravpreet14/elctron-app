import fs from 'fs';
import path from "path";

// const dataFilePath = path.join(process.cwd(), 'validation.json');
// const rawData = fs.readFileSync(dataFilePath, "utf-8");
// const authData = JSON.parse(rawData);

const authData = [
    { "username": "sprinklr@123", "password": "sprinklr@123" },
    { "username": "sarav@123", "password": "sarav@123" },
    { "username": "phani@123", "password": "phani@123" },
    { "username": "aneree@123", "password": "aneree@123" },
    { "username": "dhruv@123", "password": "dhruv@123" }
  ]

export async function authenticate(username: string, password: string) { 
    const user = await authData.filter(user => {
        if(user.username === username && user.password === password && typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify({username, password}));
            return true;
        }
        else return false
    });
    return user.length > 0;
}

export async function isAuth() {
    if(typeof window !== 'undefined') {
        const rawData = localStorage.getItem('user');
        if(!rawData) {
            return false;
        }
        const userData:{username: string, password: string} = JSON.parse(rawData);
        return authenticate(userData.username, userData.password);
    }
}

export async function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
    }
}

export async function getUser() {
    if(typeof window !== 'undefined') {
        const rawData = localStorage.getItem('user');
        if(!rawData) {
            return false;
        }
        const userData:{username: string, password: string} = JSON.parse(rawData);
        return userData.username;
        // authenticate(userData.username, userData.password).then(auth => {
        //     console.log(auth)
        //     if(auth) {
        //         return userData.username;
        //     }
        // })
    }
}