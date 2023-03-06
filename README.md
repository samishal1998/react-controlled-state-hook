# Controlled State Hook

## Motivation

When Building Complex Components, like; Components that switch between controlled and uncontrolled, Components that could be controlled imperatively or declaratively or both, A pattern keeps appearing where you need a state that sometimes update with the prop and sometimes not, and derive new state values from the props.
And you end up with a lot of (useEffect)s, (useMemo)s, ..., and you always have the risk of writing something wrong that cause the call stack to maxout and end up spending a lot of time debugging.

This Hook allows you to create a state that switches between being updated from the prop or manually using a setter, and it also has a lot of configuration utilities that allow you to:

- Control whether it updates depending on the value of the props and previous props and states.
- Derive state values from new prop, and previous prop and state.
- enable/disable updates from props completely.
- Set State manually.
- Get previous prop value.

## Installation

```bash
npm install react-controlled-state-hook
```

## Usage

### General Usage

- Hook Inputs
  - `prop`: the prop variable that will be tracked to control the state.
  - Configuration object:
    - `initialValue`: the initial value of the state, this overrides the value from 1st argument `prop`.
    - `getDerivedStateFromProp`: a function of the type [ControlledStateMethod](docs/API.md#controlledstatemethod) that should return the new state value, the function takes (`prevProp`,`newProp`,`currentState`)
    - `allowFirstEffect`: this decide whether the first effect that listen to the prop and changes the state should run the on the first render, (default value = `false`).
    - `allowPropChangeState`: this is a control variable that dictates whether the prop should change the state at all, this the initial value for the control variable (default `true`), but the variable can be controlled imperatively using the setter `setAllowPropChangeState`.
    - `shouldPropChangeState`: a function of the type [ControlledStateMethod<P,S,boolean>](docs/API.md#controlledstatemethod) that should return a boolean to decide whether the new prop value should change the state or not, the function takes (`prevProp`,`newProp`,`currentState`). Unlike `allowPropChangeState`, `shouldPropChangeState` is on per prop value basis, it's called on each new prop value to decide whether it should change the state. if `allowPropChangeState` is `false` then this function is not called.
- Hook Outputs
  - Tuple of:
    - `state` from `useState`.
    - `setState` from `useState`.
    - Object with extra functionality:
      - `getAllowPropChangeState`/`setAllowPropChangeState`: are the getter/setter for the control variable `allowPropChangeState`
      - `getPrevProp`: a getter that returns the previous value of the prop.

```javascript
function Component({prop1}){
    ...
    ...
    const [state, setState, {setAllowPropChangeState,getAllowPropChangeState,getPrevProp}] = useControlledState(prop1,{
        initialValue,
        getDerivedStateFromProp,
        allowFirstEffect,
        allowPropChangeState,
        shouldPropChangeState,
    })
    ...
    ...
}
```

### No Prop passed

if no prop was passed to the first parameter or a literal value was passed, then the hook will behave exactly like `useState`.

```js
function Component({prop1}){
    ...
    ...
    const [state0, setState0] = useControlledState() // the type of state will be `undefined`
    const [state1, setState1] = useControlledState<string>() // the type of state will be `string|undefined`

    const [state2, setState2] = useControlledState("...") // the type of state will be `string`

    const [state3, setState3] = useControlledState("...",{
        initialValue: undefined,
    })// the type of state will be `string|undefined` and the initial value will be undefined not "..."
    ...
    ...
}
```

### Prop & State of the same type

```js
function Component({prop1}){
    ...
    ...
    const [state0, setState0, {...}] = useControlledState(prop1) // the type of state will be `typeof prop1`
    const [state1, setState1, {...}] = useControlledState(prop1,{initialValue:undefined}) // the type of state will be `typeof prop1|undefined`

    const [state2, setState2, {...}] = useControlledState(prop1,{
        initialValue:undefined,
        allowFirstEffect, // boolean
        getDerivedStateFromProp, // if passed should have the type `(typeof prop1,typeof prop1,typeof prop1|undefined)=>typeof prop1 | undefined`
        allowPropChangeState, // boolean
        shouldPropChangeState,// if passed should have the type `(typeof prop1,typeof prop1,typeof prop1|undefined)=> boolean`
    })

    const [state3, setState3, {...}] = useControlledState(prop1,{
        initialValue, // the type of `initialValue` (if passed) should be `typeof prop1| ( ()=>typeof prop1 )`
        allowFirstEffect, // boolean
        getDerivedStateFromProp, // if passed should have the type `(typeof prop1,typeof prop1,typeof prop1)=>typeof prop1`
        allowPropChangeState, // boolean
        shouldPropChangeState,// if passed should have the type `(typeof prop1,typeof prop1,typeof prop1)=> boolean`
    })

    ...
    ...
}
```

### Prop & State of different types

- This Case is decided by two configuration options:
  - `initialValue`: should be provided with the type of the state you require, (can be `undefined`).
  - `getDerivedStateFromProp`: should be defined and returns the type of the state. (In case of Typescript the types should be defined clearly in the function declaration or provided in the generics of the hook `useControlledState<PropType,StateType>()`)

```js
function Component({prop}){
    ...
    ...
    // S is any type you want for the state
    const [state, setState, {...}] = useControlledState( // optionally you can define it like this `useControlledState<typeof prop1, S>` 
        prop,                                      // then you won't have to specify it in the passed functions below.
        {
            allowFirstEffect, // boolean
            allowPropChangeState, // boolean
            initialValue: ...,  // should of type S
            getDerivedStateFromProp(prevProp: typeof prop,newProp: typeof prop,currentState: S): S {
                ...
            }, 
            shouldPropChangeState(prevProp: typeof prop,newProp: typeof prop,currentState: S): boolean {
                ...
            },
        }
)


    ...
    ...
}
```

## Example

```js

async function safeFile(fileOrUrl:File|string): Promise<File | null>{
    if(fileOrUrl instanceof File){
        return fileOrUrl;
    }else if( fileOrUrl instanceof String || typeof fileOrUrl === 'string'){
        return fetchFile(fileOrUrl);
    }

    return null;
}

function FileViewer({ file: fileProp }: {file: File|string}){
    ...
        const [
            file,
            setFile,
            {setAllowPropChangeState,getAllowPropChangeState,getPrevProp}
        ] = useControlledState<File|string, File | null>(
                file,
                {
                    initialValue: null,
                    allowFirstEffect: true, // since `initialValue` can't be async, it was set to `null` and
                                            //  on the first effect `getDerivedStateFromProp` will be called.
                    getDerivedStateFromProp(prevProp,newProp,currentState){
                        return safeFile(newProp)
                    },
                }
        )
    ...

}
```

## API
[docs/API](docs/API.md)
## Next Releases

- [x] Allow async calls in `getDerivedStateFromProp`.
- [ ] Add configuration option to enhance usage with React.StrictMode.
- [ ] Enhance the async functionality of `getDerivedStateFromProp` with monitoring of the promise state.
