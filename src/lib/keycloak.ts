import session from 'express-session';
import Keycloak from 'keycloak-connect';
import { logger } from '../logger';

let _keycloak: Keycloak.Keycloak;

const keycloakConfig: any = {
  clientId: process.env.CLIENT_ID,
  bearerOnly: !!process.env.BEARER_ONLY,
  serverUrl: process.env.SERVER_URL,
  realm: process.env.REALM,
  credentials: {
    secret: process.env.CLIENT_SECRET
  }
};

export const initKeycloak = () => {
  if (_keycloak) {
    logger.info('Trying to init Keycloak again!');
    return _keycloak;
  }
  logger.info('Initializing Keycloak...');
  const memoryStore = new session.MemoryStore();
  _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
  return _keycloak;
};

export const getKeycloak = () => {
  if (!_keycloak) {
    logger.error('Keycloak has not been initialized. Please called init first.');
  }
  return _keycloak;
};
