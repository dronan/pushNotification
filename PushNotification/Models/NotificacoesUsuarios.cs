using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PushNotification.Models
{
    public class NotificacoesUsuarios
    {

        public int cdNotificacaoUsuario { get; set; }
        public int cdNotificacao { get; set; }
        public int cdUsuario { get; set; }
        public DateTime dtLeitura { get; set; }
        public int cdStatus { get; set; }

        public virtual TbNotificaco TbNotificaco { get; set; }
    }
}