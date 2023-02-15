/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import Cookies from 'js-cookie';
import moment from 'moment';
import Constant from './Constant';
const crypto = require('crypto');

class Utility {
  parseQueryString(path: string) {
    const parsedQueryString: any = {};

    const queryString = path?.split('?')[1];
    const queryStringList = queryString?.split('&');

    queryStringList?.forEach((item) => {
      const key = item.split('=')[0];
      const value = item.split('=')[1];
      parsedQueryString[decodeURIComponent(key)] = this.decodeValue(value);
    });

    return parsedQueryString;
  }

  decodeValue(value: any) {
    const decodedValue = decodeURIComponent(value || '');
    try {
      return JSON.parse(decodedValue);
    } catch (e) {
      return decodedValue;
    }
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          const base = `00${c.charCodeAt(0).toString(16)}`;
          return `%${base.slice(-2)}`
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  range(start: number, end: number) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledFutureDate(current: any) {
    return current && current > moment();
  }

  disabledFutureDateTime = () => {
    const hour = moment().hour();
    const minute = moment().minute();
    const seconds = moment().second();
    return {
      disabledHours: () => {
        if (hour < 23) {
          let start = hour;
          if (minute !== 0) {
            start += 1;
          }
          return this.range(start, 24);
        }
        return [];
      },
      disabledMinutes: () => {
        if (hour < 59) {
          if (moment().hour() === hour) {
            return this.range(minute + 1, 60);
          }
        }
        return [];
      },

      disabledSeconds: () => {
        if (moment().second() === seconds) {
          return this.range(seconds + 1, 60);
        }
        return [];
      },
    };
  };

  trimSpacesInValues(value: string) {
    if (value !== undefined || value !== null) {
      return value.trimLeft();
    }
    return '';
  }

  roundOff(num: number, places: number) {
    const x = 10 ** places;
    return Math.round(num * x) / x;
  }

  getCurrentUser = () => {
    if (Cookies.get(Constant.token)) {
      return this.parseJwt(Cookies.get(Constant.token) as string);
    }
    return null;
  };

  getRefreshTokenTime = () => {
    if (localStorage.refreshToken) {
      const refreshToken = this.parseJwt(localStorage.refreshToken);
      return refreshToken.expiryTime;
    }
    return null;
  };
  convertCreatedDate = (sdate: Date) => {
    let date = new Date(sdate);
    return moment(date).format('Do MMMM YYYY, h:mm a');
  };

  convertToMonthDate = (date: Date) => {
    let newdDate = new Date(date);
    return moment(newdDate).format('MMM D');
  }

  videoDurationConverter = (duration: any) => {
    if (duration !== undefined) {
      let dateObj = new Date(duration);
      let hours = dateObj.getUTCHours();
      let minutes = dateObj.getUTCMinutes();
      let seconds = dateObj.getSeconds();

      return hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');

    }
  };

  calculateDateDiff = (date: Date) => {
    const localDate = moment(date).local().format('MM/DD/YYYY ');
    const currentDate = moment().local().format('MM/DD/YYYY ');
    return moment(localDate, 'MM/DD/YYYY ').diff(
      moment(currentDate, 'MM/DD/YYYY '),
      'days'
    );
  }

  calculateTraining = (start: any, end: any) => {
    //checking upcoming plan  
    if (this.calculateDateDiff(start) > 0) {
      return 0;
    }

    //checking expired plan  
    if (this.calculateDateDiff(end) < 0) {
      return 0;
    }
    return this.calculateDateDiff(end) + 1;
  };

  calculateTimeCreated = (createdTime: any) => {
    let date = new Date(createdTime);
    return moment(date).fromNow();
  }

  cryptoRandom() {
    var array: any = new Uint32Array(1),
      randomValue = crypto.randomBytes(1)[array];
    return randomValue;
  }
  shuffleArray = (obj: any) => {
    if (obj) {
      obj = obj.sort(() => this.cryptoRandom() - 0.5);
    }
    return obj;
  }
}

export default new Utility();
