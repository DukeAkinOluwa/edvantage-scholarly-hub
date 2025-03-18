
/**
 * Utility functions for localStorage and IndexedDB storage.
 */

// Local Storage Helpers
export const setLocalStorageItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
};

export const getLocalStorageItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue || null;
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return defaultValue || null;
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage item:', error);
  }
};

// IndexedDB Helpers
interface DBOptions {
  name: string;
  version: number;
  stores: { 
    name: string; 
    keyPath: string; 
    indexes?: { name: string; keyPath: string; options?: IDBIndexParameters }[] 
  }[];
}

export class IndexedDBService {
  private db: IDBDatabase | null = null;
  private dbName: string;
  private dbVersion: number;
  private stores: DBOptions['stores'];

  constructor(options: DBOptions) {
    this.dbName = options.name;
    this.dbVersion = options.version;
    this.stores = options.stores;
    this.init();
  }

  // Initialize the database
  private init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event) => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = (event) => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = request.result;

        // Create object stores and indexes
        this.stores.forEach(store => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, { keyPath: store.keyPath });
            
            // Create indexes if specified
            if (store.indexes) {
              store.indexes.forEach(index => {
                objectStore.createIndex(index.name, index.keyPath, index.options);
              });
            }
          }
        });
      };
    });
  }

  // Get a reference to the database, initializing if necessary
  private async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return this.init();
  }

  // Add an item to a store
  async add<T>(storeName: string, item: T): Promise<IDBValidKey> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get an item by key
  async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get all items from a store
  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Update an item
  async put<T>(storeName: string, item: T): Promise<IDBValidKey> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Delete an item
  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Clear a store
  async clear(storeName: string): Promise<void> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// Create a default IndexedDB instance for the application
export const db = new IndexedDBService({
  name: 'edvantage-db',
  version: 1,
  stores: [
    {
      name: 'user-data',
      keyPath: 'id',
      indexes: [
        { name: 'userId', keyPath: 'userId' }
      ]
    },
    {
      name: 'achievements',
      keyPath: 'id',
      indexes: [
        { name: 'userId', keyPath: 'userId' },
        { name: 'earnedAt', keyPath: 'earnedAt' }
      ]
    },
    {
      name: 'tasks',
      keyPath: 'id',
      indexes: [
        { name: 'userId', keyPath: 'userId' },
        { name: 'dueDate', keyPath: 'dueDate' },
        { name: 'status', keyPath: 'status' }
      ]
    },
    {
      name: 'schedules',
      keyPath: 'id',
      indexes: [
        { name: 'userId', keyPath: 'userId' },
        { name: 'groupId', keyPath: 'groupId' }
      ]
    }
  ]
});

// Cache for storing data temporarily
const memoryCache = new Map<string, any>();

export const cacheService = {
  set: <T>(key: string, value: T, ttlSeconds?: number): void => {
    const item = {
      value,
      expires: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null
    };
    memoryCache.set(key, item);
  },
  
  get: <T>(key: string): T | null => {
    const item = memoryCache.get(key);
    
    if (!item) return null;
    
    if (item.expires && item.expires < Date.now()) {
      memoryCache.delete(key);
      return null;
    }
    
    return item.value;
  },
  
  remove: (key: string): void => {
    memoryCache.delete(key);
  },
  
  clear: (): void => {
    memoryCache.clear();
  }
};
