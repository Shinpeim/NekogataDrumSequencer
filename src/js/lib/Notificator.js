export default class {

    constructor(){
        this._subscriptionId = 0;
        this.subscribers = {}
    }

    subscribe(f) {
        this._subscriptionId++;
        this.subscribers[this._subscriptionId] = f;

        return new Subscription(this._subscriptionId, this);
    }

    notify(e){
        for (const key in this.subscribers ) {
            this.subscribers[key](e);
        }
    }

    remove(subscriptionId) {
        delete this.subscribers[subscriptionId];
    }
}

class Subscription {
    constructor(id, notificator) {
        this.id = id;
        this.notificator = notificator;
    }

    unsbscribe() {
        this.notificator.remove(this.id);
    }
}
