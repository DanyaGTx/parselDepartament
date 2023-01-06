export function getAllRequestsFromStorage() {
   return JSON.parse(localStorage.getItem('allRequestsList'))
}

