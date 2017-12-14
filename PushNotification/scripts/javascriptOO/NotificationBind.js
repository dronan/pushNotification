class NotificationBind {

    constructor (model, view, props) {

        let proxy = NotificationProxyFactory.create(model, props, model => view.update(model));

        view.update(model);

        return proxy;
        
    }

}