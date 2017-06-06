using System;
using System.Linq;
using Microsoft.AspNet.SignalR;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using PagedList;

namespace PushNotification
    {

        public class NotificationComponent
        {

            private int cdUsuario { get; set; }
            public string ConnectionId { get; set; }
            public int Count { get; set; }

            public NotificationComponent()
            { }

            public NotificationComponent(int cdUsuario)
            {
                this.cdUsuario = cdUsuario;
            }

            public void SendNotifications(int cdUsuario, string connectionID)
            {
                this.cdUsuario = cdUsuario;
                this.ConnectionId = connectionID;

                string conStr = ConfigurationManager.ConnectionStrings["sqlConString"].ConnectionString;

                using (SqlConnection conn = new SqlConnection(conStr))
                {

                string query = @"SELECT " +
                                " [TbNotificacoesUsuarios].[cdNotificacao], " +
                                " [TbNotificacoesUsuarios].[cdNotificacaoUsuario], " +
                                " [TbNotificacoesUsuarios].[cdUsuario], " +
                                " [TbNotificacoesUsuarios].[dtLeitura] " +
                             " from [dbo].[TbNotificacoesUsuarios] " +
                             " where [dbo].[TbNotificacoesUsuarios].[cdStatus] = 15 " +
                             " and [cdUsuario] = @cdUsuario " +
                             " and [dbo].[TbNotificacoesUsuarios].[dtLeitura] IS NULL ";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        try
                        {
                            cmd.Notification = null;
                            DataTable dtbl = new System.Data.DataTable();
                            cmd.Parameters.AddWithValue("@cdUsuario", cdUsuario);
                            SqlDependency sqlDep = new SqlDependency(cmd);
                            sqlDep.OnChange += new OnChangeEventHandler(sqlDep_OnChange);

                            if (conn.State == System.Data.ConnectionState.Closed)
                            {
                                conn.Open();
                            }

                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                dtbl.Load(reader);
                                dtbl.DefaultView.ToTable();
                                Count = dtbl.Rows.Count;
                            }
                            conn.Close();

                            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
                            //context.Clients.All.RecieveNotification(Count);
                            context.Clients.Group(ConnectionId).RecieveNotification(Count);


                    }
                        catch (Exception)
                        {
                            throw;
                        }
                    }
                }
            }

            public void sqlDep_OnChange(object sender, SqlNotificationEventArgs e)
            {
                if (e.Type == SqlNotificationType.Change && (e.Info == SqlNotificationInfo.Insert))
                {
                    SqlDependency sqlDep = sender as SqlDependency;
                    sqlDep.OnChange -= sqlDep_OnChange;

                    var notificationHub = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
                    //notificationHub.Clients.All.notify("added");
                    notificationHub.Clients.Group(ConnectionId).notify("added");


            }

                SendNotifications(cdUsuario, ConnectionId);

        }

        
        public IPagedList getNotificacoes(int id, int? pagina)
        {
            using (MyPushNotificationEntities dc = new MyPushNotificationEntities())
            {

                int tamanhopagina = 10;
                int numeroPagina = pagina ?? 1;

                var resultado = from a in dc.TbNotificacoes
                                join b in dc.TbNotificacoesUsuarios on a.cdNotificacao equals b.cdNotificacao
                                where (b.cdUsuario == id) && (b.stOcultarNotificacao == false)
                                orderby a.dtCriacao descending
                                select new
                                {
                                    a.cdNotificacao,
                                    b.cdNotificacaoUsuario,
                                    a.dsNotificacao,
                                    a.dtCriacao,
                                    a.dsIcone,
                                    b.cdUsuario,
                                    b.dtLeitura,
                                    b.dsURL
                                };

                resultado.AsEnumerable().ToList();

                return resultado.ToPagedList(numeroPagina, tamanhopagina);
                
            }
        }
            

            public IPagedList getUltimaNotificacao(int id)
            {
                using (MyPushNotificationEntities dc = new MyPushNotificationEntities())
                {

                    int tamanhopagina = 10;
                    int numeroPagina = 1;

                    var resultado = from a in dc.TbNotificacoes
                                    join b in dc.TbNotificacoesUsuarios on a.cdNotificacao equals b.cdNotificacao
                                    where (b.cdUsuario == id) && (b.stOcultarNotificacao == false)
                                    orderby a.dtCriacao descending
                                    select new
                                    {
                                        a.cdNotificacao,
                                        b.cdNotificacaoUsuario,
                                        a.dsNotificacao,
                                        a.dtCriacao,
                                        a.dsIcone,
                                        b.cdUsuario,
                                        b.dtLeitura,
                                        b.dsURL
                                    };

                    resultado.Take(1).AsEnumerable().ToList();

                    return resultado.ToPagedList(numeroPagina, tamanhopagina);

                }
            }



        public int getTotalNotifications(int id)
        {
            using (MyPushNotificationEntities dc = new MyPushNotificationEntities())
            {

                var resultado = from a in dc.TbNotificacoes
                                join b in dc.TbNotificacoesUsuarios on a.cdNotificacao equals b.cdNotificacao
                                where (b.cdUsuario == id) && (b.stOcultarNotificacao == false) && (!b.dtLeitura.HasValue)
                                select new
                                {
                                    a.cdNotificacao,
                                    b.cdNotificacaoUsuario,
                                    b.dtLeitura
                                };

                return resultado.Count();

            }
        }

    }
    }




