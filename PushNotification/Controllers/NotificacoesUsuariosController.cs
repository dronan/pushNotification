using PushNotification.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;

namespace PushNotification.Controllers
{
    public class NotificacoesUsuariosController : Controller
    {
        // GET: NotificacoesUsuarios
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult MarkAsRead(int id, int cdNotificacaoUsuario)
        {
            NotificacoesUsuariosDAO dao = new NotificacoesUsuariosDAO(cdNotificacaoUsuario);
            int linhasAfetadas = dao.MarkAsRead();

            var resultado = new { execucao = linhasAfetadas };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }


        [HttpGet]
        public ActionResult MarkAllAsRead(int id)
        {
            NotificacoesUsuariosDAO dao = new NotificacoesUsuariosDAO();
            int linhasAfetadas = dao.MarkAllAsRead(id);
            
            var resultado = new { execucao = linhasAfetadas };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult OcultarNotificacao(int id, int cdNotificacaoUsuario)
        {
            NotificacoesUsuariosDAO dao = new NotificacoesUsuariosDAO(cdNotificacaoUsuario);

            int linhasAfetadas = dao.OcultarNotificacao();

            var resultado = new { execucao = linhasAfetadas };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public JsonResult listar(int id, int? pagina)
        {

                NotificationComponent NC = new NotificationComponent();
                var list = NC.getNotificacoes(id, pagina);
                return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpGet]
        public JsonResult addLast(int id)
        {

            NotificationComponent NC = new NotificationComponent();
            var list = NC.getUltimaNotificacao(id);
            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        /*
        [HttpGet]
        public JsonResult totalNotifications(int id)
        {

            NotificationComponent NC = new NotificationComponent(id);
            NC.SendNotifications(id);
            var list = NC.getTotalNotifications(id);

            var totalNotificacoes = new { countNotificacoes = list };
            return Json(totalNotificacoes, JsonRequestBehavior.AllowGet);


        }
        */

    }
}