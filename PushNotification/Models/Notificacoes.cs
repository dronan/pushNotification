using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace PushNotification.Models
{
    public class Notificacoes
    {
        public bool stNaoLido { get; set; }

        public int cdNotificacao { get; set; }

        public int cdNotificacaoUsuario { get; set; }

        public string dsNotificacao { get; set; }

        public int cdUsuarioCriacaoNotificacao { get; set; }

        private int dia { get; set; }
        private int ano { get; set; }
        private string mes { get; set; }
        private string diasemana { get; set; }
        private string hora { get; set; }

        public DateTime dtCriacao { get; set; }

        public DateTime dtLeitura { get; set; }
        public string dataCriacao { get; set; }

    }
}