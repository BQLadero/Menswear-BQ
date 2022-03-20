import { StoreHouse } from './manager.js';
import ManagerController from './managerController.js';
import ManagerView from './managerView.js';
import AuthenticationService from './authentication.js';

const ManagerApp = new ManagerController(
  StoreHouse.getInstance(), new ManagerView(), AuthenticationService.getInstance()
);


export default ManagerApp;
