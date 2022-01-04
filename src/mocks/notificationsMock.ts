import mock from '../utils/mock';
import { notifications } from './data';

mock.onGet('/api/notifications').reply(200, { notifications });
