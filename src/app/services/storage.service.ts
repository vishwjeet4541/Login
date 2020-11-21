import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  // Store the value
  async store(res) {
    console.log("In stor",res)
    const encryptedValue = btoa(escape(JSON.stringify(res)));
    await Storage.set({
    key: res,
    value: encryptedValue
    });
  
    }
    
    // Get the value
    async get(userid: string) {
    const ret = await Storage.get({ key: userid });
    return JSON.parse(unescape(atob(ret.value)));
    }
    
    async removeStorageItem(storageKey: string) {
      localStorage.clear();
    // await Storage.remove({ key: storageKey });
    }
    
    // Clear storage
    async clear() {
    await Storage.clear();
    }
}
