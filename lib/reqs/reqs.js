import { Service } from './inc/bootstrap'


export const loginService = new Service(Service.ACTIONS.LOGIN_ACTION);
export const logoutService = new Service(Service.ACTIONS.LOGOUT_ACTION);
export const heyService = new Service(Service.ACTIONS.HEY_ACTION);
export const contactService = new Service(Service.ACTIONS.CONTACT_ACTION);
export const enterService = new Service(Service.ACTIONS.ENTER_ACTION);


function getService(action) {
    switch (action) {
        case Service.ACTIONS.LOGIN_ACTION:
            return loginService;
        case Service.ACTIONS.LOGOUT_ACTION:
            return logoutService;
        case Service.ACTIONS.HEY_ACTION:
            return heyService;
        case Service.ACTIONS.CONTACT_ACTION:
            return contactService;
        case Service.ACTIONS.ENTER_ACTION:
            return enterService;
        default:
            return null;
    }
}

function getServiceCallback(action) {
    var service = getService(action);
    return service.callback;
}

function setServiceCallback(callback, action) {
    var service = getService(action);
    service.setCallback(callback);
}


export { Service }