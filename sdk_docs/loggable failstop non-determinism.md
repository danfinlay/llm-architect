- I mentioned that [[E (Language)]] had [[loggable failstop non-determinism]]"and explained [[loggable non-determinism]] above. Like virtually all language specs, the E spec was silent about when computation would run out of memory. Two correct E implementations driven from the same overt inputs would deterministically do the same thing as long as neither ran out of memory. But one may run out of memory at some step where the other does not. Unlike JS and most languages, in E, running out of memory was immediately fatal to the vat (see https://github.com/tc39/proposal-oom-fails-fast ), ensuring that all computations that complete successfully must be in deterministic agreement. This is fail-stop non-determinism.