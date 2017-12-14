class NotificationProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy (objeto, {

            get(target, prop, receiver) {

                if (props.includes(prop) && NotificationProxyFactory._validaFuncao(target[prop])) {

                    return function() {

                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);

                    }

                }

                return Reflect.get(target, prop, receiver);

            },

            set(target, prop, value, receiver) {
                
                if (props.includes(prop)) acao[target];

                return Reflect.set(target, prop, value, receiver);
                

            }


        })

    }


    static _validaFuncao(func) {
        return typeof(func) == typeof(Function);
    }

}