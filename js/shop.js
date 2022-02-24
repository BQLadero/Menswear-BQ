import ManagerApp from './manager/managerApp.js';

const historyActions = {
    init: () => {
        ManagerApp.handleInit();
    },
    //productsCategoryList: (event) => ManagerApp.handleProductsCategoryList(event.state.category),
    //productsTypeList: (event) => ManagerApp.handleProductsTypeList(event.state.type),
    showProduct: (event) => ManagerApp.handleShowProduct(event.state.serial)
}

window.addEventListener('popstate', function (event) {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

history.replaceState({ action: 'init' }, null);