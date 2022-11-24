export const authLocalstorage = {
  saveAuth(token: string, name: string) {
    localStorage.setItem('auth', JSON.stringify({ token: token, name: name }));
  },
  getAuth() {
    const auth = localStorage.getItem('auth');
    let authObj;
    try {
      authObj = auth ? JSON.parse(auth) : null;
    } catch {
      this.clearAuth();
    }
    return authObj;
  },
  clearAuth() {
    localStorage.removeItem('auth');
  },
};
