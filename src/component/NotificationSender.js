import React, { useEffect, useState } from 'react';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

const NotificationComponent = () => {
    const [connection, setConnection] = useState(null);
    const [messageSet, setMessage] = useState('');
    const [newWindow, setNewWindow] = useState(null); // To store reference of the new window

     const [messageR, setMessageR] = useState("");

    // Set up SignalR connection when the component mounts
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7107/notificationhubs', {
                transport: HttpTransportType.WebSockets,
                skipNegotiation: true,
            })
            .configureLogging('debug')
            .build();

        newConnection.start()
            .then(() => {
                console.log('SignalR Connected');
            })
            .catch((err) => {
                console.error('SignalR Connection Error:', err);
            });

        setConnection(newConnection);

        // Listen for messages from SignalR Hub
        newConnection.on('ReceiveNotification', (message) => {
            debugger;
            setMessage(message.messages); // Assuming 'Messages' is the field in the Message object
            console.log(message);
        });



  // Listen for messages from SignalR Hub
  newConnection.on('SendMessageToUser', (message) => {
    debugger;
    setMessageR(message); // Assuming 'Messages' is the field in the Message object
    console.log("Info from client "+message);
});


        return () => {
            newConnection.stop();
        };
    }, []);

    
     

    // Send a notification to all users
    const sendNotificationToAll = (message) => {
        // Send notification to all via SignalR
        connection.invoke('ReceiveNotification', message)
            .then(() => {
                console.log('Notification sent to all:', message);
                
                // Wait for a response from the server after the message is broadcast
                connection.on('ReceiveNotificationResponse', (responseMessage) => {
                    console.log('Received response from server:', responseMessage);
                    
                    // Process the response from the server, e.g., show an alert
                    setMessage(responseMessage);
                  //  alert(responseMessage);  // Display response
                });
            })
            .catch(err => {
                console.error('Error sending notification:', err);
            });
    };

    const sendMessage = async () => {
        debugger;
         
          const userId = "targetUserId"; // Replace with the actual user ID
          connection.invoke('SendMessageToUser', userId,messageR)
            .then(() => {
                console.log('Notification sent to all:', messageR);
                
                // Wait for a response from the server after the message is broadcast
                connection.on('SendMessageToUser', (message) => {
                    console.log('Received response from server:', message);
                    
                    // Process the response from the server, e.g., show an alert
                    setMessage(message);
                    alert(message);  // Display response
                });
            })
            .catch(err => {
                console.error('Error sending notification:', err);
            });
      };

    

    // Handle messages in the new window
    useEffect(() => {
        if (newWindow) {
            // Listen for messages from the new window using window.postMessage()
            window.addEventListener('message', (event) => {
                if (event.origin === window.location.origin) {
                    // Handle message received from new window
                    setMessage(event.data.message);
                    console.log('Message from new window:', event.data.message);
                }
            });
        }
    }, [newWindow]);

    return (
        <div>
            <h1>Notification Component</h1>
            <div>
                <p>Received Message: {messageSet}</p>
                <button onClick={() => sendNotificationToAll('Hello Everyone!')}>Send to All</button>
                {/* <button onClick={openNewWindowAndNotify}>Send to All & Open New Window</button> */}
            </div>
        


            <input
                type="text"
                value={messageR}
                onChange={(e) => setMessageR(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>

       Sent to User {messageR}
        
        
        
        
        
        
        </div>
    );
};

export default NotificationComponent;
