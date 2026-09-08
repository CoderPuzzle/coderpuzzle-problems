// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   RaceCase exposes this problem's one judged invocation: .fn is the
//   callable built from the case's function source, .inputs are the
//   arguments for that single time limited call, and .t is the limit in
//   virtual milliseconds.
//
//   TIMING IS VIRTUAL. The clock below replaces setTimeout globally
//   before the submission source is evaluated, so the fn internals and
//   the submission's own limit timer arm delays on the same deterministic
//   schedule; real time has no influence on what is judged — only which
//   side of the race settles.

interface RaceTick {
    time: number;
    sequence: number;
    callback: () => void;
}

class RaceClock {
    private ticks: RaceTick[] = [];
    private sequence = 0;
    now = 0;

    // Absolute-time scheduling relative to a base keeps relative
    // setTimeout semantics for code arming timers at later ticks.
    scheduleFrom(base: number, delay: number, callback: () => void): void {
        const tick: RaceTick = {
            time: Math.max(0, base + Math.max(0, delay)),
            sequence: this.sequence++,
            callback,
        };
        const position = this.ticks.findIndex(
            (scheduled) =>
                scheduled.time > tick.time || (scheduled.time === tick.time && scheduled.sequence > tick.sequence),
        );
        if (position === -1) {
            this.ticks.push(tick);
        } else {
            this.ticks.splice(position, 0, tick);
        }
    }

    get size(): number {
        return this.ticks.length;
    }

    // Fire the earliest due tick; the driver interleaves these fires with
    // microtask checkpoints so settlement cascades fully drain between
    // them.
    fireNext(): void {
        const tick = this.ticks.shift()!;
        this.now = tick.time;
        tick.callback();
    }
}

const coderpuzzleRaceClock = new RaceClock();
// Ambient timer name for submissions (the judge compiles with ES libs
// only): at run time this resolves to the virtual patched version below.
declare const setTimeout: (callback: (...args: any[]) => void, delay?: number) => number;
const coderpuzzleBuiltinSetTimeout: (callback: (...args: any[]) => void, delay?: number) => unknown = (
    globalThis as any
).setTimeout;

(globalThis as any).setTimeout = function coderpuzzleVirtualSetTimeout(
    callback: (...args: any[]) => void,
    delay?: number,
): number {
    void (coderpuzzleBuiltinSetTimeout as any);
    coderpuzzleRaceClock.scheduleFrom(coderpuzzleRaceClock.now, Number(delay) || 0, callback);
    return 0;
};

class RaceCase {
    inputs: unknown[];
    t: number;
    fn: (...args: any[]) => any;
    outcome: { resolved: unknown } | { rejected: unknown } | null;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values ([source, inputs, t]) plus the query budget
    // (unused — the driver schedules a bounded number of ticks by design).
    constructor(values: any[], _queryBudget?: unknown) {
        const [source, inputs, t] = values;
        void _queryBudget;
        this.inputs = inputs;
        this.t = t;
        this.outcome = null;
        // Lexical shadowing plus the global patch above both route to the
        // same virtual clock: an inner arrow's bare `setTimeout` resolves
        // to this parameter even without the patch.
        this.fn = new Function("setTimeout", "return (" + source + ");")(function (
            callback: () => void,
            delay?: number,
        ) {
            coderpuzzleRaceClock.scheduleFrom(coderpuzzleRaceClock.now, Number(delay) || 0, callback);
            return 0;
        }) as (...args: any[]) => any;
    }

    clockSize(): number {
        return coderpuzzleRaceClock.size;
    }

    // One macrotask hop on the REAL clock: every pending microtask —
    // however many earlier hops create — drains before it resolves.
    static hop(): Promise<void> {
        return new Promise<void>((resolve) => {
            coderpuzzleBuiltinSetTimeout(resolve, 0);
        });
    }

    // Hand the case's fn and limit to the submission's withDeadline, call
    // the resulting limited function once with this case's inputs, pump
    // every scheduled settlement in due-time order with microtask
    // checkpoints between fires, then adopt the returned promise's fate
    // as this case's outcome object.
    async drive(withDeadline: (fn: (...args: any[]) => any, t: number) => (...args: any[]) => unknown): Promise<void> {
        if (typeof withDeadline !== "function") {
            throw new Error("withDeadline must be a function");
        }
        const limited = withDeadline(this.fn, this.t);
        if (typeof limited !== "function") {
            throw new Error("withDeadline(fn, t) must return a function");
        }
        const returned = limited(...this.inputs) as Promise<unknown>;
        if (!returned || typeof returned.then !== "function") {
            throw new Error("the time limited call must return a promise");
        }
        // A defensive no-op catch marks every rejection as handled up
        // front — the pump below takes several macrotask hops before the
        // adoption at the end, and without this marker a limit-wins race
        // would be flagged unhandled mid-drive instead of surfacing as
        // this case's verdict through the awaited branch.
        (returned as Promise<unknown>).catch(() => {});
        // Between ticks the whole microtask waterfall must finish before
        // the next one fires — exactly how real event loops schedule
        // timers behind microtasks. One await leaks only one microtask
        // step, so the barrier is a genuine macrotask hop through the
        // builtin setTimeout captured before the virtual patch.
        let fired = 0;
        while (this.clockSize() > 0) {
            if (++fired > 100000) {
                throw new Error("Virtual tick cap exceeded");
            }
            await RaceCase.hop();
            coderpuzzleRaceClock.fireNext();
            await RaceCase.hop();
        }
        await RaceCase.hop();
        try {
            const value = await returned;
            this.outcome = { resolved: value === undefined ? null : value };
        } catch (reason) {
            this.outcome = { rejected: reason === undefined ? null : reason };
        }
    }

    verdict(): { resolved: unknown } | { rejected: unknown } {
        if (this.outcome === null) {
            throw new Error("Returned promise never settled");
        }
        return this.outcome;
    }
}
