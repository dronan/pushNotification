<script src="https://www.legalbox.com.br/PushNotification/scripts/jquery.signalR-2.2.1.min.js"></script>
<script src="https://www.legalbox.com.br/homologacao/includes/js/server.js"></script>
<link href="https://www.legalbox.com.br/PushNotification/Content/Notificacoes-legalbox.css" rel="stylesheet" />
<script src="https://www.legalbox.com.br/homologacao/includes/js/Notificacao.js"></script>
<script src="https://www.legalbox.com.br/homologacao/includes/js/NotificacoesController.js"></script>
<script src="https://www.legalbox.com.br/homologacao/includes/js/DateTimeEpochHelper.js"></script>
<script src="https://www.legalbox.com.br/homologacao/includes/js/ListaNotificacoes.js"></script>
<script src="https://www.legalbox.com.br/homologacao/includes/js/NotificacaoView.js"></script>
<script src="https://www.legalbox.com.br/homologacao/includes/js/NotificationCountHelper.js"></script>

<input type="hidden" name="idiomaUsuario" id="idiomaUsuario" value="<%=session("cd_idioma")%>">
<input type="hidden" name="codigoUsuario" id="codigoUsuario" value="<%=session("cd_user")%>">

<script>
    var cd_usuario = document.querySelector("#codigoUsuario").value;
    let controller = new NotificacoesController();

    var notifications = $.connection.notificationHub;
    $.connection.hub.start().done(function () {  notifications.server.sendNotifications(cd_usuario); });

    notifications.client.recieveNotification = function (data) {
        if (data == 0) return false;
        controller.updateCount(data);
    };

    notifications.client.notify = function (message) {
        if (message == "added") controller.addLast();
    }



    $("#notiContent").on("scroll", function () {
        if (!controller.loadingAjax && ($(this).scrollTop() + $(this).height() == $(this).get(0).scrollHeight)) {
            isLoading = false;
            controller.criaNotificacao();
        }
    });

</script>

