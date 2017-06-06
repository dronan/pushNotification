using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace PushNotification
{
    [HubName("notificationHub")]
    public class NotificationHub : Hub
    {

        //public static ConcurrentDictionary<string, NotificationComponent> MyUsers = new ConcurrentDictionary<string, NotificationComponent>();

        [HubMethodName("sendNotifications")]
        public void SendNotifications(int cdUsuario)
        {
            NotificationComponent NC = new NotificationComponent();
            NC.SendNotifications(cdUsuario, Context.ConnectionId);
        }
        
        public override Task OnConnected()
        {

            var connectionId = Context.ConnectionId;

            //MyUsers.TryAdd(connectionId, new NotificationComponent() { ConnectionId = Context.ConnectionId });

            Groups.Add(connectionId, connectionId);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var connectionId = Context.ConnectionId;

            //NotificationComponent garbage;

            //MyUsers.TryRemove(connectionId, out garbage);

            Groups.Remove(connectionId, connectionId);
            
            return base.OnDisconnected(stopCalled);
        }
        



    }
}