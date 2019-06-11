import { observable, computed } from 'mobx';
class AuthRight {
    @observable isAuthenticated = false;
    @computed
    get authenticate() {
        this.isAuthenticated = true;
        // setTimeout(cb, 100); // fake async
    }

    @computed
    get signout() {
        this.isAuthenticated = false;
        // setTimeout(cb, 100);
    }
}
export default AuthRight;