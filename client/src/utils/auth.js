import decode from 'jwt-decode';
class AuthService {
  getProfile() {
    //console.log(decode(this.getToken()));
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token, userId) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id', userId);
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  getUserId() {
    return localStorage.getItem('user_id')
  }

  login(idToken, permission, userId) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('permission', permission);
    // window.location.assign('/');
  }
  
  signup(idToken, userId, permission) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('permission', permission);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('permission');
    // window.location.reload('/');
    window.location.assign('/');
  }
}

// export default new AuthService();
const authService = new AuthService();
export { authService };