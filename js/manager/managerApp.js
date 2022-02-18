import {StoreHouse} from './manager.js';
import ManagerController from './managerController.js';
import ManagerView from './managerView.js';
$(function(){
  const ManagerApp = new ManagerController(
    StoreHouse.getInstance(), new ManagerView()
  );
});
