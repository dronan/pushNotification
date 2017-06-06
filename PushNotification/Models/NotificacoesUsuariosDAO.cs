using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PushNotification.Models
{
    public class NotificacoesUsuariosDAO
    {
        public NotificacoesUsuariosDAO()
        {
        }

        public NotificacoesUsuariosDAO(int cdNotificacaoUsuario)
        {
            this.cdNotificacaoUsuario = cdNotificacaoUsuario;
        }

        private int cdNotificacaoUsuario { get; set; }

        private int cdUsuario { get; set; }

        public int MarkAsRead()
        {
            string conStr = ConfigurationManager.ConnectionStrings["sqlConString"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(conStr))
            {

                string query = @"UPDATE " +
                                    "[TbNotificacoesUsuarios]  " + 
                                " SET " +
                                    " [dtLeitura] = getdate() " +
                                " WHERE " +
                                    " [cdNotificacaoUsuario] = @cdNotificacaoUsuario AND " +
                                    " [dtLeitura] IS NULL";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    try
                    {
                        cmd.Notification = null;

                        cmd.Parameters.AddWithValue("@cdNotificacaoUsuario", cdNotificacaoUsuario);

                        if (conn.State == System.Data.ConnectionState.Closed)
                            conn.Open();


                        int linhasAfetadas = cmd.ExecuteNonQuery();

                        conn.Close();

                        return linhasAfetadas;



                    }
                    catch (Exception)
                    {
                        throw;
                    }

                }
                
            }

        }

        public int MarkAllAsRead(int cdUsuario)
        {

            this.cdUsuario = cdUsuario;

            string conStr = ConfigurationManager.ConnectionStrings["sqlConString"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(conStr))
            {

                string query = @"UPDATE " +
                                    "[TbNotificacoesUsuarios]  " +
                                " SET " +
                                    " [dtLeitura] = getdate() " +
                                " WHERE " +
                                    " [cdUsuario] = @cdUsuario AND " +
                                    " [dtLeitura] IS NULL";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    try
                    {
                        cmd.Notification = null;

                        cmd.Parameters.AddWithValue("@cdUsuario", cdUsuario);

                        if (conn.State == System.Data.ConnectionState.Closed)
                            conn.Open();
                        
                        int linhasAfetadas = cmd.ExecuteNonQuery();

                        conn.Close();

                        return linhasAfetadas;

                    }
                    catch (Exception)
                    {
                        throw;
                    }

                }
               
            }

        }



        public int OcultarNotificacao()
        {

            this.cdUsuario = cdUsuario;

            string conStr = ConfigurationManager.ConnectionStrings["sqlConString"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(conStr))
            {
                string query = @"UPDATE " + 
                                    "[TbNotificacoesUsuarios] " + 
                                "SET "+
                                    "[stOcultarNotificacao] = 1 " + 
                                "WHERE " + 
                                    "[cdNotificacaoUsuario] = @cdNotificacaoUsuario and " + 
                                    "[stOcultarNotificacao] = 0";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    try
                    {
                        cmd.Notification = null;

                        cmd.Parameters.AddWithValue("@cdNotificacaoUsuario", cdNotificacaoUsuario);

                        if (conn.State == System.Data.ConnectionState.Closed)
                            conn.Open();

                        int linhasAfetadas = cmd.ExecuteNonQuery();

                        conn.Close();

                        return linhasAfetadas;

                    }
                    catch (Exception)
                    {
                        throw;
                    }

                }

            }

        }



    }
}