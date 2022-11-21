export const authLocalstorage = {
  saveAuth(token: string) {
    localStorage.setItem('auth', token);
  },
  getAuth() {
    const token = localStorage.getItem('auth');
    return token ? token : null;
  },
};
