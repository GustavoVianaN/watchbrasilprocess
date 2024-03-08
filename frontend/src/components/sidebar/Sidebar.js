import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinusSquare, faPowerOff, faScrewdriver } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import Keycloak from 'keycloak-js';
import { Enviroment } from '../../enviroment/index'

var initOptions = {
    url: `${Enviroment.REACT_APP_KEYCLOACK_URL}`,
    realm: `${Enviroment.REACT_APP_KEYCLOACK_RELM}`,
    clientId: `${Enviroment.REACT_APP_KEYCLOACK_CLIENT_ID}`,
}

const kc = new Keycloak(initOptions);

kc.init({
    KeycloakResponseType: 'code',
    checkLoginIframe: false,
    pkceMethod: 'S256'
}).then((auth) => {
    if (!auth) {
        if (Enviroment.REACT_APP_KEYCLOACK_URL != undefined) {
            kc.login();
        }
    } else {
        localStorage.setItem('keycloak_token', kc.token);
        kc.onTokenExpired = () => {
            kc.updateToken(5).then((refreshed) => {
                if (refreshed) {
                    localStorage.setItem('keycloak_token', kc.token);
                }
            }).catch(() => {
                kc.logout({ redirectUri: `${Enviroment.REACT_APP_REDIRECT_LOGIN}` })
            });
        };
    }
}, () => {
    kc.logout({ redirectUri: `${Enviroment.REACT_APP_REDIRECT_LOGIN}` })
});

const handleLogout = () => {
    kc.logout({ redirectUri: `${Enviroment.REACT_APP_REDIRECT_LOGIN}` })
};

const Sidebar = ({ sidebarOpen, closeSidebar }) => {

    const [activeMenuLinkEvents, setActiveMenuLinkEvents] = useState('sidebar__link');
    const [activeMenuLinkTipos, setActiveMenuLinkTipos] = useState('sidebar__link');
    const [activeMenuLinkHome, setActiveMenuLinkHome] = useState('sidebar__link');

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('/eventos') || path.includes('/incluirevento')) {
            setActiveMenuLinkEvents('sidebar__link active_menu_link');
        }
        if (path.includes('/tipos')) {
            setActiveMenuLinkTipos('sidebar__link active_menu_link');
        }

        if (!path.includes('/tipos') && !path.includes('/eventos') && !path.includes('/incluirevento')) {
            setActiveMenuLinkHome('sidebar__link active_menu_link');
        }
    }, []);

    return (

        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img" style={{ marginLeft: '10px', fontSize: '40px' }}>
                    <FaRegUser icon={faMinusSquare} />
                    <h1 style={{ fontSize: '30px' }}>Usuário</h1>
                </div>
                <FontAwesomeIcon icon={faTimes} onClick={closeSidebar} id="sidebarIcon" aria-hidden="true" />
            </div>
            <div className="sidebar__menu">

                <h2>Admin</h2>

                <div className={activeMenuLinkEvents}>
                    <FontAwesomeIcon icon={faMinusSquare} />
                    <a href="/">Listagem de Filmes</a>
                </div>


                <div className={activeMenuLinkTipos}>
                    <FontAwesomeIcon icon={faScrewdriver} />
                    <a href="/usuarios">Listagem de Usuários</a>
                </div>

                <div className="sidebar__logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faPowerOff} />
                    <span>SAIR</span>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;
