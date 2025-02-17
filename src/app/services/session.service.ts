import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This service is provided at the root level, making it a singleton.
})
export class SessionService {
  setUser(user: any): void {
    if (typeof window !== 'undefined') { // Ensures this code runs only in a browser environment.
      console.log('Saving user in session:', user); // Logs the user object being saved.
      sessionStorage.setItem('user', JSON.stringify(user)); // Converts the user object to a JSON string and stores it.
    }
  }

  getUser(): any {
    if (typeof window !== 'undefined') { // Ensures this code runs only in a browser environment.
      const user = sessionStorage.getItem('user'); // Retrieves the user object as a JSON string.
      console.log('Retrieving user from session:', user); // Logs the retrieved user object.
      return user ? JSON.parse(user) : null; // Parses the JSON string back into an object, or returns null if not found.
    }
    return null; // Returns null if the code is not running in a browser environment.
  }

  clearUser(): void {
    if (typeof window !== 'undefined') { // Ensures this code runs only in a browser environment.
      console.log('Removing user from session'); // Logs that the user object is being removed.
      sessionStorage.removeItem('user'); // Removes the user object from session storage.
    }
  }
}