import * as signalR from "@microsoft/signalr";

const hubConnection = new signalR.HubConnectionBuilder()

     .withUrl('https://localhost:7107/notificationhubs', {
                    transport: signalR.HttpTransportType.WebSockets,
                    skipNegotiation: true,
                })
                .configureLogging('debug')
                .build();

hubConnection.start()
    .then(() => console.log("Connected to SignalR Hub"))
    .catch((err) => console.error("SignalR Connection Error: ", err));
 
export default hubConnection;
