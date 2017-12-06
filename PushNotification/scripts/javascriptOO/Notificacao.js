class Notificacao {

    constructor(){
        this._cdNotificacao = null;
        this._cdNotificacaoUsuario = null;
        this._dsNotificacao = null;
        this._dtCriacao = null;
        this._dsIcone = null;
        this._idioma = null;
        this._primeiraPosicaoArray = false;
        this._novanot = null;
        this._dsURL = null;
        this._action = null;
        this._dtLeitura = null;
    }

    get cdNotificacao() {
        return this._cdNotificacao;
    }

    get cdNotificacaoUsuario() {
        return this._cdNotificacaoUsuario;
    }

    get dsNotificacao() {
        return this._dsNotificacao;
    }

    get dtCriacao() {
        return this._dtCriacao;
    }

    get dtCriacaoEpoch() {
        return new DateTimeEpochHelper(this.dtCriacao, this._idioma).exibe();
    }

    get dsIcone() {
        return this._dsIcone;
    }

    get primeiraPosicaoArray() {
        return this._primeiraPosicaoArray;
    }

    get novanot() {
        return this._novanot;
    }    

    get dsURL() {
        if (this._dsURL == null)
            return "";

        return this._dsURL;
    }      

    get action() {
        return this._action;
    }    

    get dtLeitura() {
        return this._dtLeitura;
    }   

    set cdNotificacao(cdNotificacao) {
        this._cdNotificacao = cdNotificacao;
    }

    set cdNotificacaoUsuario(cdNotificacaoUsuario) {
        this._cdNotificacaoUsuario = cdNotificacaoUsuario;
    }

    set dsNotificacao(dsNotificacao) {
        this._dsNotificacao = dsNotificacao;
    }

    set dtCriacao(dtCriacao) {
        this._dtCriacao = dtCriacao;
    }

    set dsIcone(dsIcone) {
        this._dsIcone = dsIcone;
    }

    set primeiraPosicaoArray(primeiraPosicaoArray) {
        this._primeiraPosicaoArray = primeiraPosicaoArray;
    }

    set novanot(novanot) {
        this._novanot = novanot;
    }

    set dsURL(dsURL) {
        this._dsURL = dsURL;
        if (dsURL !== null) this._action = this.dsURL;
    }    

    set action(action) {
        this._action = action;
    }

    set dtLeitura(dtLeitura) {
        this._dtLeitura = dtLeitura;
        if (dtLeitura == null) {
            this._novanot = "novaNotificacao";
            this._action = "controller.markAsRead('" + this._cdNotificacaoUsuario + "\');"+this.dsURL+"";
        }    
    }

}