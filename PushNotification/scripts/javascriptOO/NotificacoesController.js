class NotificacoesController {

    constructor(){
        this._usuario = document.querySelector('#codigoUsuario').value;
        this._idioma = document.querySelector('#idiomaUsuario').value;

        this._pagina = 1;
        this._cdNotificacao = null;
        this._cdNotificacaoUsuario = null;
        this._dsNotificacao = null;
        this._dtCriacao = null;
        this._dsIcone = null;
        this.loadingAjax = false;
        this.ajaxEof = false;
        this._totalHide = 0;
        this._cdNotificacaoUsuario = null;

        this._listaNotificacoes = new ListaNotificacoes();

        this.criaNotificacao();

        this._notificationCount = new NotificationCountHelper();
        
        this._notificacaoView = new NotificacaoView(document.querySelector('#notiContent'));

        this._notificacaoView.update(this._listaNotificacoes); // a view recebe o model para carregar a tabela
        
    }

    updateCount(total) {
        if (!/^[0-9]/.test(total)) throw new Error("Entrada de dados de count invalida.");
        this._notificationCount.count = total;        
    }

    criaNotificacao() {

        if (!this.loadingAjax && !this.ajaxEof) {
            
            this.loadingAjax = true;

            $.ajax({
                type: 'GET',
                url: 'https://www.legalbox.com.br/PushNotification/NotificacoesUsuarios/listar/'+this._usuario+'/' + this._pagina,
                success: (retornoNotificacoes) => {
                    
                    retornoNotificacoes.forEach(ntf => {

                        let notifica = new Notificacao();

                        notifica.cdNotificacao = ntf.cdNotificacao;
                        notifica.cdNotificacaoUsuario = ntf.cdNotificacaoUsuario;
                        notifica.dsNotificacao = ntf.dsNotificacao;
                        notifica.dtCriacao = ntf.dtCriacao;
                        notifica.dsIcone = ntf.dsIcone;
                        notifica.dsURL = ntf.dsURL;
                        notifica.dtLeitura = ntf.dtLeitura;
                        notifica.idioma = this._idioma;

                        this._listaNotificacoes.adiciona(notifica);

                    });

                    this._notificacaoView.update(this._listaNotificacoes);

                    if (retornoNotificacoes.length < 10) {
                        this.ajaxEof = true;
                        return;
                    } 

                    this._pagina++;

                }
            });

            this.loadingAjax = false;
        
        }
        
    }


    addLast() {

            $.ajax({
                type: 'GET',
                url: 'https://www.legalbox.com.br/PushNotification/NotificacoesUsuarios/addLast/'+this._usuario+'/',
                success: (retornoNotificacoes) => {
                    retornoNotificacoes.forEach( (ntf) => {
                        
                        let notifica = new Notificacao();
                                    
                        notifica.cdNotificacao = ntf.cdNotificacao;
                        notifica.cdNotificacaoUsuario = ntf.cdNotificacaoUsuario;
                        notifica.dsNotificacao = ntf.dsNotificacao;
                        notifica.dtCriacao = ntf.dtCriacao;
                        notifica.dsIcone = ntf.dsIcone;
                        notifica.dsURL = ntf.dsURL;
                        notifica.dtLeitura = ntf.dtLeitura;
                        notifica.idioma = this._idioma;
                        notifica.primeiraPosicaoArray = true;

                        this._listaNotificacoes.adiciona(notifica);

                    });

                    this._notificacaoView.update(this._listaNotificacoes);

                    $('.animacaoIconeSinoNotificacao').animateCss('swing');

                    }

            })


    }




    markAsRead(cd) {
        
        this._cdNotificacaoUsuario = cd;
        
        $.ajax({
            type: 'GET',
            url: 'https://www.legalbox.com.br/PushNotification/NotificacoesUsuarios/MarkAsRead/',
            data: {
                id: this._usuario,
                cdNotificacaoUsuario: this._cdNotificacaoUsuario
            },
            success: (response) => {
                if (response.execucao > 0) {
                    $('.notifica' + this._cdNotificacaoUsuario).removeClass("novaNotificacao");
                    this._notificationCount.subtraiCount();
                    this._notificationCount.atualizaTotal();
                    document.querySelector('.notifica'+ this._cdNotificacaoUsuario).setAttribute("onclick", document.querySelector('.notifica'+ this._cdNotificacaoUsuario).getAttribute("onclick").replace("controller.markAsRead('"+this._cdNotificacaoUsuario+"');", "void(0);"));
                }
            },
            error: function (error) {
                console.log(error);
            }
        })

    }
    
    paginacaoNotificacoes() {

        let notifica = new Notificacao();
        notifica.cdNotificacaoUsuario = this._cdNotificacaoUsuario;
        this._listaNotificacoes.remove(notifica);

        this._totalHide++;
        if (this._totalHide > 6 && !this.ajaxEof) {
            this._totalHide = 0;
            this.criaNotificacao();
        }
    }
    
    ocultarNotificacao(event, cd) {
        
        this._cdNotificacaoUsuario = cd;

        $.ajax({
            type: 'GET',
            url: 'https://www.legalbox.com.br/PushNotification/NotificacoesUsuarios/OcultarNotificacao/',
            data: {
                id: this._usuario,
                cdNotificacaoUsuario: this._cdNotificacaoUsuario
            },
            success: (response) => {
                $('.notifica' + this._cdNotificacaoUsuario).removeClass("novaNotificacao");
                $(".notifica" + this._cdNotificacaoUsuario).hide('slow');
                this.paginacaoNotificacoes();
            },
            error: function (error) {
                console.log(error);
            }
        })
        event.stopPropagation();
    }

    markAllAsRead(cd) {

        this._cdNotificacaoUsuario = cd;
        
        $.ajax({
            type: 'GET',
            url: 'https://www.legalbox.com.br/PushNotification/NotificacoesUsuarios/MarkAllAsRead/' + this._cdNotificacaoUsuario,
            success: (response) => {
                if (response.execucao > 0) {
                    $('.notificacao').removeClass("novaNotificacao");
                    this.updateCount(0);
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    }


}