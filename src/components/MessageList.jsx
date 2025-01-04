import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    axios
      .get('https://aj-pager-23c4e-default-rtdb.asia-southeast1.firebasedatabase.app/message.json')
      .then((response) => {
        let messageList = [];
        for (let messageId in response.data) {
          messageList.push(response.data[messageId]);
        }
        messageList.reverse();
        const messageListDisplay = messageList.slice(0, 5);
        setMessages(messageListDisplay);
      });
  };

  useEffect(() => {
    // Polling every 5 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    // Fetch initial data
    fetchMessages();

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="message-container">
      {messages.length > 0 &&
        messages.map((message, index) => (
          <div className="message-card" key={index}>
            <div className="user-name">{message.name}</div>
            <div className="user-message">{message.message}</div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;


/*
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MessageList = () => {
    const [messages , setMessages] = useState([])

    

    useEffect(()=>{
        axios.get('https://aj-pager-23c4e-default-rtdb.asia-southeast1.firebasedatabase.app/message.json')
        .then(response => {
            console.log(response.data);
            let messageList = [];
            for(let messageId in response.data){
                messageList.push(response.data[messageId])
            }
           
            messageList.reverse();
            let messageListDisplay = messageList.slice(0,5)
            setMessages(messageListDisplay);
        })
    },[])

  return (
    <div className='message-container'>

        {messages.length >0  && messages.map(message=>{
            return (
            <div className='message-card'>
                <div className="user-name">{message.name}</div>
                <div className="user-message">{message.message}</div>
            </div>
                )

        })}
    </div>
  )
}

export default MessageList
*/