/**
 * Calls `fn`, or, if `fn` has been called less than `msWait` ago, queues `fn` to be called.
 * If `fn` is already queued to be called, update `fn` args to be used when cooldown is over.
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, msWait: number): (...args: Parameters<T>) => void {

    let timeoutId: number | undefined = undefined;
    let fireNextAfter: number = 0;

    return function (...args: Parameters<T>) {

        // we'll always clear timeout to refresh with new params
        clearTimeout(timeoutId);

        const now = Date.now();
        const timeRemaining = fireNextAfter - now;

        if (timeRemaining > 0) {
            // if we need to wait, set a timeout that will call the fn when cooldown is over
            timeoutId = setTimeout(() => {
                fn(...args)
            }, timeRemaining);
        }
        else {
            // otherwise, update next fire time and call fn
            fireNextAfter = now + msWait;
            fn(...args);
        }

    }
}