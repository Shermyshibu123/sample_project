import { observable, decorate } from "mobx";
import Constant from "../Global/Constant";
import authService from "../Services/authService";
import Utility from "../Global/Utility";
import Cookies from "js-cookie";

type userType = {
  uid: string;
  name: string;
  email: string;
  userAccess: Array<any>;
  expiryTime: number;
  institutionName: string;
  departmentName: string;
  kiteRole: string;
};

class AuthStore {
  error = "";
  authListener: ((user: any) => void) | null = null;
  currentUser: userType | null = null;
  refreshExpireTime: any;

  addAuthListener(callbackListener: (user: any) => void) {
    this.authListener = callbackListener;
    this.currentUser = Utility.getCurrentUser();
    this.refreshExpireTime = Utility.getRefreshTokenTime();
    if (
      this.currentUser &&
      this.refreshExpireTime &&
      this.refreshExpireTime < new Date().getTime()
    ) {
      this.signOut();
    } else if (this.currentUser) {
      if (this.authListener) {
        this.authListener(this.currentUser);
      }
    } else if (this.authListener) {
      this.authListener(this.currentUser);
    }
  }

  containsRequiredUserRoles(userAccess: Array<number>) {
    const { dashboard, users, userRoles } = Constant.userAccess;

    if (
      [dashboard, users, userRoles].filter((val: any) =>
        userAccess.includes(val)
      ).length > 0
    ) {
      return true;
    }
    return false;
  }

  ssoLogin(callback: any) {
    authService
      .fakeLogin()
      .then(async (resp: any) => {
        if (resp && resp.data) {
          const token = Cookies.get(Constant.token) as string;
          if (!token) {
            callback(Constant.unAuthorizedError);
          } else {
            const user = await Utility.parseJwt(token);
            if (this.containsRequiredUserRoles(user.userAccess)) {
              this.currentUser = user;
              callback(null);
            } else {
              callback(Constant.unAuthorizedError);
            }
          }
        }
      })
      .catch((err: any) => {
        let errorMsg = Constant.defaultErrorMessage;
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          errorMsg = err.response.data.error.message;
        }
        callback(errorMsg);
      });
  }

  async signOut() {
    await authService.signOut();
    this.currentUser = null;
    localStorage.removeItem(Constant.pageNumber);
    if (
      process.env.REACT_APP_SSO_APP_ID !== undefined &&
      process.env.REACT_APP_SSO_SERVER !== undefined
    ) {
      window.location.href =
        process.env.REACT_APP_SSO_SERVER +
        "/sso/auth/login?appId=" +
        process.env.REACT_APP_SSO_APP_ID;
    }
  }

  async forgotPasswordRequest(email: string, callback: (err?: Error) => void) {
    try {
      await authService.forgotPasswordRequest(email);
      callback();
    } catch (err: any) {
      let errorMsg = Constant.defaultErrorMessage;
      if (err && err.response && err.response.data && err.response.data.error) {
        errorMsg = err.response.data.error.message;
      }
      callback(new Error(errorMsg));
    }
  }

  async resetPassword(
    password: string,
    userId: string,
    token: string,
    callback: (err?: Error) => void
  ) {
    try {
      const data = { password, token, userId };
      await authService.resetPassword(data);
      callback();
    } catch (err: any) {
      let errorMsg = Constant.defaultErrorMessage;
      if (err && err.response && err.response.data && err.response.data.error) {
        errorMsg = err.response.data.error.message;
      }
      callback(new Error(errorMsg));
    }
  }
}

decorate(AuthStore, {
  error: observable,
});

export default new AuthStore();
