- A [[deep frozen]] object whose children are either themselves interfaces or functions.
- ```javascript
type Primitive = string | number | BigInt | boolean | undefined | ReadableRecord;
type AsyncFunction <A,O> = (...args:A[]) => Promise<O>

type ReadableRecord = {
  [key: string]: ReadableRecord | ReadableRecord[] | Primitive;
}

type FrozenInterface = {
  [key: string]: FrozenInterface | FrozenInterface[] | AsyncFunction<CapTpObject[], CapTpObject>;
};

type CapTpObject = ReadableRecord | FrozenInterface;```
