import io from 'socket.io-client';
let socket;

export function init() {
    socket = io('http://localhost:3000');
    socket.on('connect', () => {
        console.log('connected');
    });

    socket.send('hello from client');

    socket.on('hello', (msg) => {
        console.log(msg);
    });

    socket.on('error', (error) => {
        console.log('error: ' + error);
    });

    $(window).on('unload', socket.close);
}


let to;
let i = 0, j = 0, k = 0;
export function host(success_cb, failure_cb) {
    if(i++ % 2 == 0) {
        to = setTimeout(() => {
            success_cb();
        }, 1200);
    } else {
        to = setTimeout(() => {
            failure_cb();
        }, 1200);
    }
}

export function request_opponent(success_cb, failure_cb) {
    if(j++ % 2 == 0) {
        to = setTimeout(() => {
            success_cb('Dummy');
        }, 1200);
    } else {
        to = setTimeout(() => {
            failure_cb();
        }, 1200);
    }
}

let request_count = 0;
export function request_hosts(success_cb, failure_cb) {
    if(k !== 1) {
        to = setTimeout(() => {
            if(request_count === 0) {
                success_cb([
                    {
                        name: 'Bitchfresse',
                        id: 0,
                    },
                    {
                        name: 'Masafaka',
                        id: 1,
                    }
                ]);
            } else if(request_count === 1) {
                success_cb([
                    {
                        name: 'Nigguh',
                        id: 2,
                    }
                ]);
            } else {
                success_cb([
                    {
                        name: 'Bitchfresse',
                        id: 0,
                    },
                    {
                        name: 'Masafaka',
                        id: 1,
                    },
                    {
                        name: 'Nigguh',
                        id: 2,
                    }
                ]);
            }
            ++request_count;
        }, 1200);
    } else {
        to = setTimeout(() => {
            failure_cb();
        }, 1200);
    }

    ++k;
}

let n = 0;
export function join_host(id, player_name, success_cb, failure_cb) {
    if(n++ % 2 === 0) {
        to = setTimeout(() => {
            success_cb();
        }, 1200);
    } else {
        to = setTimeout(() => {
            failure_cb();
        }, 1200);
    }
}

export function cancel_request() {
    clearTimeout(to);
    to = null;
}
