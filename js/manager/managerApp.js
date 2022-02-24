import { StoreHouse } from './manager.js';
import ManagerController from './managerController.js';
import ManagerView from './managerView.js';

const ManagerApp = new ManagerController(
  StoreHouse.getInstance(), new ManagerView()
);


export default ManagerApp;
