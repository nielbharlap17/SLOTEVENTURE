# System Design Documentation

## Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        string id PK
        string clerkId
        string email
        string username
        string firstName
        string lastName
        string photo
    }
    
    EVENT {
        string id PK
        string title
        string description
        string location
        date createdAt
        string imageUrl
        date startDateTime
        date endDateTime
        string price
        boolean isFree
        string url
    }
    
    CATEGORY {
        string id PK
        string name
    }
    
    ORDER {
        string id PK
        string stripeId
        string totalAmount
        string createdAt
        string eventId FK
        string buyerId FK
    }
    
    EVENT_ATTENDEE {
        string id PK
        string eventId FK
        string userId FK
        string status
        boolean isPublic
        date createdAt
    }
    
    EVENT_DISCUSSION {
        string id PK
        string eventId FK
        string title
        string description
        string createdById FK
        boolean isPublic
        date createdAt
        date updatedAt
    }
    
    MESSAGE {
        string id PK
        string discussionId FK
        string senderId FK
        string content
        array attachments
        date createdAt
    }
    
    FRIEND_REQUEST {
        string id PK
        string fromUserId FK
        string toUserId FK
        string status
        date createdAt
    }
    
    NEWSLETTER_SUBSCRIPTION {
        string id PK
        string email
        string name
        boolean eventAlerts
        boolean monthlyCalendar
        boolean industryInsights
        boolean exclusiveOffers
        date subscribedAt
    }

    USER ||--o{ EVENT : "organizes"
    USER ||--o{ ORDER : "places"
    USER ||--o{ EVENT_ATTENDEE : "attends"
    USER ||--o{ EVENT_DISCUSSION : "creates"
    USER ||--o{ MESSAGE : "sends"
    USER ||--o{ FRIEND_REQUEST : "sends"
    USER ||--o{ FRIEND_REQUEST : "receives"
    
    EVENT ||--|| CATEGORY : "belongs to"
    EVENT ||--o{ ORDER : "has"
    EVENT ||--o{ EVENT_ATTENDEE : "has"
    EVENT ||--o{ EVENT_DISCUSSION : "has"
    
    EVENT_DISCUSSION ||--o{ MESSAGE : "contains"
```

## System Architecture

```mermaid
graph TD
    Client[Client Browser/App]
    NextJS[Next.js Frontend]
    API[API Routes]
    Auth[Clerk Authentication]
    DB[MongoDB Database]
    Storage[Cloud Storage]
    Payments[Stripe Payments]
    Email[Email Service]
    
    Client <--> NextJS
    NextJS <--> API
    API <--> Auth
    API <--> DB
    API <--> Storage
    API <--> Payments
    API <--> Email
    
    subgraph "Frontend"
        NextJS
    end
    
    subgraph "Backend Services"
        API
        Auth
        DB
        Storage
        Payments
        Email
    end
```

## Database Schema Details

### User
- **id**: Unique identifier (MongoDB ObjectId)
- **clerkId**: External auth provider ID
- **email**: User's email address
- **username**: Unique username
- **firstName**: User's first name
- **lastName**: User's last name
- **photo**: URL to profile photo
- **friends**: Array of User IDs (references to other users)
- **friendRequests**: Array of friend request objects

### Event
- **id**: Unique identifier
- **title**: Event title
- **description**: Event description
- **location**: Physical or virtual location
- **createdAt**: Creation timestamp
- **imageUrl**: Event cover image
- **startDateTime**: Event start time
- **endDateTime**: Event end time
- **price**: Event price (if not free)
- **isFree**: Boolean indicating if event is free
- **url**: External URL (if applicable)
- **category**: Reference to Category
- **organizer**: Reference to User

### Category
- **id**: Unique identifier
- **name**: Category name

### Order
- **id**: Unique identifier
- **stripeId**: Stripe payment ID
- **totalAmount**: Payment amount
- **createdAt**: Order timestamp
- **event**: Reference to Event
- **buyer**: Reference to User

### EventAttendee
- **id**: Unique identifier
- **event**: Reference to Event
- **user**: Reference to User
- **status**: Attendance status (going/interested/not_going)
- **isPublic**: Whether attendance is publicly visible
- **createdAt**: Creation timestamp

### EventDiscussion
- **id**: Unique identifier
- **event**: Reference to Event
- **title**: Discussion title
- **description**: Discussion description
- **createdBy**: Reference to User
- **isPublic**: Whether discussion is public
- **participants**: Array of User IDs
- **messages**: Array of Message objects
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

### Message
- **id**: Unique identifier
- **sender**: Reference to User
- **content**: Message text
- **attachments**: Array of attachment URLs
- **createdAt**: Timestamp

### FriendRequest
- **id**: Unique identifier
- **from**: Reference to User (sender)
- **to**: Reference to User (receiver)
- **status**: Request status (pending/accepted/rejected)
- **createdAt**: Timestamp

### NewsletterSubscription
- **id**: Unique identifier
- **email**: Subscriber email
- **name**: Subscriber name
- **preferences**: Subscription preferences
- **subscribedAt**: Subscription timestamp

## API Endpoints

### Authentication
- `/api/auth/*` - Clerk authentication endpoints

### Events
- `GET /api/events` - List events with filtering
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/event/:eventId` - Get event orders

### Social Features
- `POST /api/social/friend-request` - Send friend request
- `PUT /api/social/friend-request/:id` - Respond to friend request
- `GET /api/social/friends/:userId` - Get user's friends
- `POST /api/social/attendance` - Update event attendance
- `GET /api/social/attendance/:eventId` - Get event attendees
- `GET /api/social/friends-attending/:eventId` - Get friends attending event
- `POST /api/social/discussions` - Create discussion
- `GET /api/social/discussions/:eventId` - Get event discussions
- `POST /api/social/messages` - Add message to discussion
- `GET /api/social/messages/:discussionId` - Get discussion messages

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `PUT /api/newsletter/preferences` - Update subscription preferences
- `DELETE /api/newsletter/unsubscribe` - Unsubscribe from newsletter

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **File Storage**: Cloud storage (e.g., Cloudinary)
- **Payment Processing**: Stripe
- **Email Service**: SendGrid or similar
- **Deployment**: Vercel 