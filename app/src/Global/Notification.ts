import { notification } from 'antd';
import Constant from './Constant';

function error(params: { description: string, message: string, duration?: number }) {
  notification.destroy();
  notification.error({
    placement: 'topRight',
    description: params.description,
    message: params.message,
    duration: params.duration ? params.duration : Constant.notificationDuration,
  });
}

function success(params: { description: string, message: string, duration?: number }) {
  notification.destroy();
  notification.success({
    placement: 'topRight',
    description: params.description,
    message: params.message,
    duration: params.duration ? params.duration : Constant.notificationDuration,
  });
}

function warn(params: { description: string, message: string, duration?: number }) {
  notification.destroy();
  notification.warn({
    placement: 'topRight',
    description: params.description,
    message: params.message,
    duration: params.duration ? params.duration : Constant.notificationDuration,
  });
}

export default {
  error, success, warn
};
