class NotificacaoView {

    constructor(elemento){ // recebe a div que exibira o template
        this._elemento = elemento;
    }

    _template(model) {
        return `${
        model.notificacoes.map((n) => {
                return ` 
                    <li class="notificacao notifica${n.cdNotificacaoUsuario} ${n.novanot}" onclick="${n.action}">
                        <div class="row" style="margin:1px">
                            <div class="col-xs-2 col-sm-2">
                                <span class="${n.dsIcone} ico-notificacao  centraliza-ico-notifica' ${n.cdNotificacaoUsuario} ${n.novanot}"></span>
                            </div>
                            <div class="col-xs-10 col-sm-10">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12"> 
                                        <div class="pull-right"><span style="cursor:pointer" onclick="controller.ocultarNotificacao(event, ${n.cdNotificacaoUsuario});" class="glyphicon glyphicon-remove noti-visualiza-nao"></span></div>
                                        ${(function(){
                                            if (n.dsNotificacao.length > 90) {
                                                let texto = n.dsNotificacao.substring(0, 90);
                                                texto = texto.replace("<br>", " ");
                                                return texto + '</b>...';
                                            }

                                            return n.dsNotificacao
                                        })()}
                                    </div>
                                        <div class="col-xs-12 col-sm-12 col-data">
                                        <span class="glyphicon glyphicon-calendar"></span><span class="data">${n.dtCriacaoEpoch}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`;
                }).join('')}` 
           }
  
    update(model) {
        this._elemento.innerHTML = this._template(model);
    }


  
}