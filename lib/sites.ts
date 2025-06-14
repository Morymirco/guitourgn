import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';

export interface Site {
  id?: string;
  name: string;
  location: string;
  rating: number;
  imageId: string;
  description: string;
  entryPrice: number;
  recommendedDuration: number;
  bestPeriod: string;
  difficultyLevel: number;
  openingHours: string;
  contact: string;
  website: string;
  address: string;
  services: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Photo {
  imageId: string;
  caption: string;
  uploadedAt: string;
  url?: string;
}

export const getSites = async (): Promise<Site[]> => {
  try {
    const sitesRef = collection(db, 'sites');
    const q = query(sitesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Site));
  } catch (error) {
    console.error('Erreur lors de la récupération des sites:', error);
    throw error;
  }
};

export const getSite = async (siteId: string): Promise<Site | null> => {
  try {
    const siteRef = doc(db, 'sites', siteId);
    const siteDoc = await getDoc(siteRef);
    if (siteDoc.exists()) {
      return { id: siteDoc.id, ...siteDoc.data() } as Site;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du site:', error);
    throw error;
  }
};

export const addSite = async (site: Omit<Site, 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const sitesRef = collection(db, 'sites');
    const now = Timestamp.now();
    const newSite = {
      ...site,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(sitesRef, newSite);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du site:', error);
    throw error;
  }
};

export const updateSite = async (siteId: string, site: Partial<Site>): Promise<void> => {
  try {
    const siteRef = doc(db, 'sites', siteId);
    const updateData = {
      ...site,
      updatedAt: Timestamp.now(),
    };
    await updateDoc(siteRef, updateData);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du site:', error);
    throw error;
  }
};

export const deleteSite = async (siteId: string): Promise<void> => {
  try {
    const siteRef = doc(db, 'sites', siteId);
    await deleteDoc(siteRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du site:', error);
    throw error;
  }
};

export const uploadPhoto = async (siteId: string, file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `sites/${siteId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Erreur lors de l\'upload de la photo:', error);
    throw error;
  }
};

export const getSitePhotos = async (siteId: string): Promise<string[]> => {
  try {
    const photosRef = collection(db, `sites/${siteId}/photos`);
    const querySnapshot = await getDocs(photosRef);
    return querySnapshot.docs.map((doc) => doc.data().url);
  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error);
    throw error;
  }
}; 