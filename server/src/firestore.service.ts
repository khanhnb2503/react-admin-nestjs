import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { fromEvent, Observable } from 'rxjs';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private db: firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  listenToChanges() {
    const collectionRef = this.db.collection('groups');
    return collectionRef;
  }
}