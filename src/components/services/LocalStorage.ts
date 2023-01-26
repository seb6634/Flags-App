export function removeItem(itemToRemove: string) {
  localStorage.removeItem(itemToRemove);
}

export function getItem(item: string) {
  return localStorage.getItem(item);
}

export function addItem(localeStorageName: string, newItem: string) {
  localStorage.setItem(localeStorageName, newItem);
}
