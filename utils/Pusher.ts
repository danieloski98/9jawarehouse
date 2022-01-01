import Pusher from 'pusher-js';

export const pusher = new Pusher(process.env.NEXT_PUBLIC_P_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_CLUSTER as string,
});

pusher.connection.bind('connection', () => {
    console.log('PUSHER CONNECTED');
});

// pusher.connection.bind('disconnected', () => {
//     console.log('Pusher disconnected');
// });
