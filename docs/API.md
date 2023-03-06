# Controlled State Hook API

## Table of contents

### Type Aliases

- [ControlledStateMethod](modules.md#controlledstatemethod)
- [ControlledStateMethodAsync](modules.md#controlledstatemethodasync)
- [ExtraUtilsReturn](modules.md#extrautilsreturn)

### Functions

- [useControlledState](modules.md#usecontrolledstate)


## Type Aliases

### ControlledStateMethod

Ƭ **ControlledStateMethod**<`PropType`, `StateType`, `ReturnType`\>: (`prevProp`: `PropType`, `newProp`: `PropType`, `currentState`: `StateType`) => `ReturnType`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `PropType` | `PropType` | The data type of the prop. |
| `StateType` | `StateType` | The data type of the state. |
| `ReturnType` | `StateType` | The return type of the function, by default ReturnType=StateType. |

#### Type declaration

▸ (`prevProp`, `newProp`, `currentState`): `ReturnType`

A function type that is used in [useControlledState](modules.md#usecontrolledstate) hook.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prevProp` | `PropType` | The previous value of the prop |
| `newProp` | `PropType` | The new value of the prop |
| `currentState` | `StateType` | The current value of the state |

##### Returns

`ReturnType`

___

### ControlledStateMethodAsync

Ƭ **ControlledStateMethodAsync**<`PropType`, `StateType`, `ReturnType`\>: (`prevProp`: `PropType`, `newProp`: `PropType`, `currentState`: `StateType`) => `ReturnType` \| `Promise`<`ReturnType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PropType` | `PropType` |
| `StateType` | `StateType` |
| `ReturnType` | `StateType` |

#### Type declaration

▸ (`prevProp`, `newProp`, `currentState`): `ReturnType` \| `Promise`<`ReturnType`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `prevProp` | `PropType` |
| `newProp` | `PropType` |
| `currentState` | `StateType` |

##### Returns

`ReturnType` \| `Promise`<`ReturnType`\>


___

### ExtraUtilsReturn

Ƭ **ExtraUtilsReturn**<`PropType`, `StateType`\>: `Object`

An interface describing the extra utilities returned from [useControlledState](modules.md#usecontrolledstate). It is the type of the third value in the tuple returned from [useControlledState](modules.md#usecontrolledstate)

#### Type parameters

| Name | Description |
| :------ | :------ |
| `PropType` | The data type of the prop. |
| `StateType` | The data type of the state. |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getAllowPropChangeState` | () => `boolean` |
| `getPrevProp` | () => `PropType` |
| `setAllowPropChangeState` | (`allowPropChangeState`: `boolean` \| (`currentAllowPropChangeState`: `boolean`) => `boolean`) => `void` |


## Functions

### useControlledState

▸ **useControlledState**<`PropType`, `StateType`\>(`prop`, `configuration`): [`StateType` \| `undefined`, `Dispatch`<`SetStateAction`<`StateType` \| `undefined`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]

This Hook Allows you to define a state that is depending on a prop,
 and control whether it updates from the prop, or updates manually using a setter.

**`Remarks`**

Also, You can pass functions that:
 - derive new state value from the new prop (`configuration.getDerivedStateFromProp`).
 - checks a condition to decide to update the state based on each prop value (`configuration.shouldPropChangeState`).

The hook will behave as a normal useState, if:
 - `prop` param is not passed.
	- A literal value passed instead of a prop.
	- `configuration.allowPropChangeState` is set to false.

!!WARNING!!: Components Like <React.StrictMode> Could cause useEffect to be called twice, which will affect the behavior of `configuration.allowFirstEffect`.

**`See`**

[`ExtraUtilsReturn` For the type of the 3rd value in the tuple](modules.md#extrautilsreturn)

#### Type parameters

| Name | Description |
| :------ | :------ |
| `PropType` | The data type of the prop. |
| `StateType` | The data type of the state. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prop` | `PropType` | The Prop that is updating the state. If the prop is undefined then the state type is whatever Passed in the generics and undefined. |
| `configuration` | `Object` | configuration object to control the behavior of the hook. |
| `configuration.allowFirstEffect?` | `boolean` | a boolean value to determine whether the first effect should run. !!WARNING!!: Components Like <React.StrictMode> Could cause useEffect to be called twice. |
| `configuration.allowPropChangeState?` | `boolean` | a boolean value to determine whether the prop changes the state, it can also be controlled using the setter `setAllowPropChangeState` that is returned. there's also a getter for it `getAllowPropChangeState` |
| `configuration.getDerivedStateFromProp` | [`ControlledStateMethodAsync`](modules.md#controlledstatemethodasync)<`undefined` \| `PropType`, `undefined` \| `StateType`, `undefined` \| `StateType`\> | a function that derives new state from the prop. It takes in the (prevProp,prevState,newProp) and should return the new state value. if the state and props types are different then you have to define the type in the params of the function. |
| `configuration.initialValue` | `undefined` \| () => `undefined` | a value or a function that returns the value. (If not passed then `prop` is initial value) |
| `configuration.shouldPropChangeState?` | [`ControlledStateMethod`](modules.md#controlledstatemethod)<`undefined` \| `PropType`, `undefined` \| `StateType`, `boolean`\> | a function that determines whether the new state should update based on the new prop. It takes in the (prevProp,prevState,newProp) and should return a boolean. |

#### Returns

[`StateType` \| `undefined`, `Dispatch`<`SetStateAction`<`StateType` \| `undefined`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]

A Tuple [State, SetState, ExtraUtils]


▸ **useControlledState**<`PropType`, `StateType`\>(`prop`, `configuration`): [`StateType`, `Dispatch`<`SetStateAction`<`StateType`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]

#### Type parameters

| Name |
| :------ |
| `PropType` |
| `StateType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `PropType` |
| `configuration` | `Object` |
| `configuration.allowFirstEffect?` | `boolean` |
| `configuration.allowPropChangeState?` | `boolean` |
| `configuration.getDerivedStateFromProp` | [`ControlledStateMethodAsync`](modules.md#controlledstatemethodasync)<`PropType`, `StateType`, `StateType`\> |
| `configuration.initialValue?` | `StateType` \| () => `StateType` |
| `configuration.shouldPropChangeState?` | [`ControlledStateMethod`](modules.md#controlledstatemethod)<`PropType`, `StateType`, `boolean`\> |

#### Returns

[`StateType`, `Dispatch`<`SetStateAction`<`StateType`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]


▸ **useControlledState**<`PropType`, `StateType`\>(`prop`, `configuration`): [`StateType` \| `undefined`, `Dispatch`<`SetStateAction`<`StateType` \| `undefined`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PropType` | `PropType` |
| `StateType` | `PropType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `PropType` |
| `configuration` | `Object` |
| `configuration.allowFirstEffect?` | `boolean` |
| `configuration.allowPropChangeState?` | `boolean` |
| `configuration.initialValue` | `undefined` \| () => `undefined` |
| `configuration.shouldPropChangeState?` | [`ControlledStateMethod`](modules.md#controlledstatemethod)<`undefined` \| `PropType`, `undefined` \| `StateType`, `boolean`\> |

#### Returns

[`StateType` \| `undefined`, `Dispatch`<`SetStateAction`<`StateType` \| `undefined`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]


▸ **useControlledState**<`PropType`, `StateType`\>(`prop`, `configuration`): [`StateType`, `Dispatch`<`SetStateAction`<`StateType`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PropType` | `PropType` |
| `StateType` | `PropType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `PropType` |
| `configuration` | `Object` |
| `configuration.allowFirstEffect?` | `boolean` |
| `configuration.allowPropChangeState?` | `boolean` |
| `configuration.initialValue?` | `StateType` \| () => `StateType` |
| `configuration.shouldPropChangeState?` | [`ControlledStateMethod`](modules.md#controlledstatemethod)<`PropType`, `StateType`, `boolean`\> |

#### Returns

[`StateType`, `Dispatch`<`SetStateAction`<`StateType`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]


▸ **useControlledState**<`PropType`, `StateType`\>(`prop`, `configuration?`): [`StateType`, `Dispatch`<`SetStateAction`<`StateType`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PropType` | `PropType` |
| `StateType` | `PropType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `PropType` |
| `configuration?` | `Object` |
| `configuration.allowFirstEffect?` | `boolean` |
| `configuration.allowPropChangeState?` | `boolean` |
| `configuration.getDerivedStateFromProp?` | [`ControlledStateMethodAsync`](modules.md#controlledstatemethodasync)<`undefined` \| `PropType`, `undefined` \| `StateType`, `undefined` \| `StateType`\> |
| `configuration.initialValue?` | `StateType` \| () => `StateType` |
| `configuration.shouldPropChangeState?` | [`ControlledStateMethod`](modules.md#controlledstatemethod)<`undefined` \| `PropType`, `undefined` \| `StateType`, `boolean`\> |

#### Returns

[`StateType`, `Dispatch`<`SetStateAction`<`StateType`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`PropType`, `StateType`\>]


▸ **useControlledState**<`T`\>(`prop?`, `configuration?`): [`T` \| `undefined`, `Dispatch`<`SetStateAction`<`T` \| `undefined`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`T`, `T`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop?` | `T` |
| `configuration?` | `Object` |
| `configuration.allowFirstEffect?` | `boolean` |
| `configuration.allowPropChangeState?` | `boolean` |
| `configuration.getDerivedStateFromProp?` | [`ControlledStateMethodAsync`](modules.md#controlledstatemethodasync)<`undefined` \| `T`, `undefined` \| `T`, `undefined` \| `T`\> |
| `configuration.initialValue?` | `T` \| () => `T` |
| `configuration.shouldPropChangeState?` | [`ControlledStateMethod`](modules.md#controlledstatemethod)<`undefined` \| `T`, `undefined` \| `T`, `boolean`\> |

#### Returns

[`T` \| `undefined`, `Dispatch`<`SetStateAction`<`T` \| `undefined`\>\>, [`ExtraUtilsReturn`](modules.md#extrautilsreturn)<`T`, `T`\>]

