import { SERVER_URL, actions, services, servicesInfo} from "../inc/bootstrap";

export class Service {
    static ACTIONS = actions;
    constructor(action) {
        this.action = action;
        this.#data = servicesInfo[action];
        this.callback = () => {console.log("Service callback not set (" + this.action + ").")};
    }

    #doesSendData() {
        return this.#data.request.data.length > 0;
    }

    #doesReceiveData() {
        return this.#data.response.data.length > 0;
    }

    #isPost() {
        return this.#data.request.method === "POST";
    }

    #isGet() {
        return this.#data.request.method === "GET";
    }

    #getURL() {
        return `${SERVER_URL}?action=${this.action}`;
    }

    #getRequestParams() {
        return this.#data.request.data;
    }

    #getResponseParams() {
        return this.#data.response.data;
    }

    setCallback(callback) {
        this.callback = callback;
    }

    async execute(...this.#getRequestParams()) {
        var response = null;
        if (this.#isGet()) {
            var url = this.#getURL();
            if (this.#doesSendData()) {
              //  var params = arguments[0];
                var i = 0;
                url += "?";
                var args = arguments[0];
                var i = 0;
                Object.keys(args).forEach(function(key) {
                    url += key + "=" + args[key];
                    i++;
                    if (i < Object.keys(args).length - 1) {
                        url += "&";
                    }
                });
            }
            response = await fetch(url);
            callback(response);
        }
        if (this.#isPost()) {
            var url = this.#getURL();
            var args = arguments[0];
            $.ajax({
                type: "POST",
                url: url,
                data: args,
                success: function(output) {
                    console.log(output);
                    var data = JSON.parse(output);
                    this.callback(data);
                },
            });
        } 
    }
}


