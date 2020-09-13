import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  getItem(key: string): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      if (localStorage.getItem(key)) {
        resolve(JSON.parse(localStorage.getItem(key)));
      } else {
        resolve(null);
      }
    }));
  }

  setItem(key: string, value: any): Promise<boolean> {
    return new Promise<any>(((resolve, reject) => {
      if (key && value) {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(true);
      } else {
        resolve(false);
      }
    }));
  }
}
