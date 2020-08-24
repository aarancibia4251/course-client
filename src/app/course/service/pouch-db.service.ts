import { Injectable } from '@angular/core';
// @ts-ignore
import PouchDB from 'pouchdb';
import { SuccessPouch } from '../model/success-pouch';

@Injectable({
  providedIn: 'root',
})
export class PouchDbService {
  private db: PouchDB.Database;
  constructor() {
    this.db = new PouchDB('course');
  }

  get(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (id) {
        this.db
          .get(id)
          .then((doc) => resolve(doc))
          .catch((err) => reject(err));
      } else {
        resolve(null);
      }
    });
  }

  put(id: string, model): Promise<SuccessPouch> {
    return new Promise<SuccessPouch>(async (resolve, reject) => {
      if (id) {
        await this.db
          .get(id)
          .then((doc) => {
            model._rev = doc._rev;
          })
          .catch((e) => {});
      }
      this.db
        .put(model)
        .then((update) => {
          resolve(
            new SuccessPouch(
              update.id,
              update.rev,
              update.ok,
              model._rev ? 'Actualizado Correctamente' : 'Credo Correctamente'
            )
          );
        })
        .catch((e) => reject(e));
    });
  }

  getDocumentsByEntity(idEntity: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.allDocs({ include_docs: true })
        .then(docs => {
          const filteredDocs = docs.rows.filter(x => x.doc.idEntity === idEntity).map(x => x.doc);
          resolve(filteredDocs);
        })
        .catch(e => reject(e));
    });
  }
}
