class KeycloakConfig {
    constructor() {
        this.initOptions = {
            url: 'https://192.168.13.117:9998/',
            realm: 'ipms-dev',
            clientId: 'portal-web',
            onLoad: 'check-sso',
            KeycloakResponseType: 'code',
        };
    }
    getInitOptions() {
        return this.initOptions;
    }
}

export default KeycloakConfig;
