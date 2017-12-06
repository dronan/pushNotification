class ListaNotificacoes {

    constructor(){
        this._notificacoes = [];
    }

    adiciona(notificacao) {
    	if (!notificacao.primeiraPosicaoArray) {
        	let index = this._notificacoes.findIndex(y => y.cdNotificacaoUsuario == notificacao.cdNotificacaoUsuario); 
            if (index < 0) this._notificacoes.push(notificacao);
	    } else {
	    	let index = this._notificacoes.findIndex(y => y.cdNotificacaoUsuario == notificacao.cdNotificacaoUsuario); 
    		if (index < 0) {
                this._notificacoes.unshift(notificacao);
            } else {
                this._notificacoes.splice(index, 1, notificacao);
            }

            
	    }
    }

    remove(notificacao) {
        let index = this._notificacoes.findIndex(y => y.cdNotificacaoUsuario == notificacao.cdNotificacaoUsuario); 
        if (index >= 0) { 

            if ( index == this._notificacoes.length ){
                this._notificacoes.pop();
            } else if ( index == 0 ){
                this._notificacoes.shift();
            } else {
                var arrAuxIni = this._notificacoes.slice(0, index);
                var arrAuxEnd = this._notificacoes.slice(index + 1);
                this._notificacoes = arrAuxIni.concat(arrAuxEnd);
            }
            
        }


    }

	get notificacoes() {
		return this._notificacoes;
	} 

}