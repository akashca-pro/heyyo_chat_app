export const placeholderChats = [
    {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Are we still meeting tomorrow?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      status: "Online",
      unread: 2,
    },
    {
      id: "user2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I sent you the document",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      status: "Last seen 20 minutes ago",
      unread: 0,
    },
    {
      id: "user3",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for your help!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: "Online",
      unread: 0,
    },
    {
      id: "user4",
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Let's catch up soon",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      status: "Last seen yesterday",
      unread: 0,
    },
    {
      id: "user5",
      name: "Olivia Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Did you see the news?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      status: "Online",
      unread: 0,
    },
    {
      id: "user6",
      name: "Work Group",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Alex: Meeting postponed to 3pm",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      status: "5 participants",
      unread: 0,
    },
    {
      id: "user7",
      name: "Family",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Mom: Don't forget dinner on Sunday",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      status: "4 participants",
      unread: 0,
    },
  ]
  
  export const placeholderMessages = [
    {
      id: "msg1",
      senderId: "user1",
      text: "Hey there! How are you doing?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      status: "read",
    },
    {
      id: "msg2",
      senderId: "current-user",
      text: "I'm good, thanks! Just finishing up some work. How about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 minutes ago
      status: "read",
    },
    {
      id: "msg3",
      senderId: "user1",
      text: "Same here. Are we still meeting tomorrow for coffee?",
      timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(), // 50 minutes ago
      status: "read",
    },
    {
      id: "msg4",
      senderId: "current-user",
      text: "Yes, definitely! How about 10am at the usual place?",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      status: "read",
    },
    {
      id: "msg5",
      senderId: "user1",
      text: "Perfect! I'll see you then.",
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(), // 40 minutes ago
      status: "read",
    },
    {
      id: "msg6",
      senderId: "user1",
      text: "Oh, and can you bring that book we talked about?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      status: "read",
    },
    {
      id: "msg7",
      senderId: "current-user",
      text: "Sure thing! I'll bring it along.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
      status: "delivered",
    },
  
    // Messages for user2
    {
      id: "msg8",
      senderId: "user2",
      text: "Hi, I just emailed you the document you requested.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: "read",
    },
    {
      id: "msg9",
      senderId: "current-user",
      text: "Got it, thanks! I'll take a look at it soon.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(), // 1.5 hours ago
      status: "read",
    },
    {
      id: "msg10",
      senderId: "user2",
      text: "Great! Let me know if you need any clarification.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      status: "read",
    },
    {
      id: "msg11",
      senderId: "user2",
      text: "I sent you the document",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      status: "read",
    },
  
    // Messages for user3
    {
      id: "msg12",
      senderId: "current-user",
      text: "Hey Emma, do you have a minute to help me with something?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      status: "read",
    },
    {
      id: "msg13",
      senderId: "user3",
      text: "Of course! What do you need help with?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.8).toISOString(), // 2.8 hours ago
      status: "read",
    },
    {
      id: "msg14",
      senderId: "current-user",
      text: "I'm trying to figure out how to use this new software for work.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.7).toISOString(), // 2.7 hours ago
      status: "read",
    },
    {
      id: "msg15",
      senderId: "user3",
      text: "I can walk you through it. Let's set up a call later today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), // 2.5 hours ago
      status: "read",
    },
    {
      id: "msg16",
      senderId: "current-user",
      text: "That would be great, thank you so much!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.3).toISOString(), // 2.3 hours ago
      status: "read",
    },
    {
      id: "msg17",
      senderId: "user3",
      text: "No problem at all. Thanks for your help!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: "read",
    },
  ]
  