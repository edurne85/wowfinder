import { debug, debugError } from './debug';

function debugTime(title: string): void {
    if (debug) {
        console.time(title);
    }
}

function debugTimeLog(title: string, ...data: any[]): void {
    if (debug) {
        console.timeLog(title, ...data);
    }
}

function debugTimeEnd(title: string): void {
    if (debug) {
        console.timeEnd(title);
    }
}

type Logger = (...data: any[]) => void;

class DebugTimer {
    #label: string;
    #finished: boolean;
    constructor(label: string) {
        this.#label = label;
        this.#finished = false;
        debugTime(label);
    }

    log(...data: any[]): void {
        if (this.#finished) {
            debugError(`Timer ${this.#label} already finished`);
        } else {
            debugTimeLog(this.#label, ...data);
        }
    }

    finish(): void {
        if (this.#finished) {
            debugError(`Timer ${this.#label} already finished`);
        } else {
            this.#finished = true;
            debugTimeEnd(this.#label);
        }
    }

    static execute(label: string, callback: (logger: Logger) => void): void {
        const timer = new DebugTimer(label);
        callback(timer.log.bind(timer));
        timer.finish();
    }
}

export { DebugTimer };
