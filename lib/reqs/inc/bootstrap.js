const LIBRARY_ROOT_PATH = "/lib/reqs";

import * as config from "./config.js";

import { Service } from "./../models/service.js";

import { service as enterService } as enterService from "./enterService.js";
import { service as loginService } as loginService from "./loginService.js";
import { service as logoutService } as logoutService from "./logoutService.js";
import { service as heyService } as heyService from "./heyService.js";
import { service as contactService } from "./contactService.js";

const actions = {
    ENTER_ACTION: config.ENTER_ACTION,
    LOGIN_ACTION: config.LOGIN_ACTION,
    LOGOUT_ACTION: config.LOGOUT_ACTION,
    HEY_ACTION: config.HEY_ACTION,
    CONTACT_ACTION: config.CONTACT_ACTION,
}

const servicesInfo = {
    [actions.ENTER_ACTION]: {
        action: config.ENTER_ACTION,
        index: 0,
        request: {
            method: "GET",
            data: [],
        },
        response: {
            data: [
                "message"
            ],
        }
        //execute: enterService.executeService
    },
    [actions.LOGIN_ACTION]: {
        action: config.LOGIN_ACTION,
        index: 1,
        request: {
            method: "POST",
            data: [
                "username"
            ],
        },
        response: {
            data: [],
        }
        //execute: loginService.executeService
    },
    [actions.LOGOUT_ACTION]: {
        action: config.LOGOUT_ACTION,
        index: 2,
        request: {
            method: "GET",
            data: [],
        },
        response: {
            data: [],
        }
        //execute: logoutService.executeService
    },
    [actions.HEY_ACTION]: {
        action: config.HEY_ACTION,
        index: 3,
        request: {
            method: "GET",
            data: [],
        },
        response: {
            data: [
                "message"
            ],
        }
        //execute: heyService.executeService
    },
    [actions.CONTACT_ACTION]: {
        action: config.CONTACT_ACTION,
        index: 4,
        request: {
            method: "POST",
            data: [
                "message"
            ],
        },
        response: {
            data: [
                "message"
            ],
        }
        //execute: contactService.executeService-
    }
}


export { LIBRARY_ROOT_PATH };
export { config.SERVER_URL as SERVER_URL };
export { Service };
export { actions };
export { servicesInfo };
