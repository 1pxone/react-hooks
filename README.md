# React Hooks | 1px.one

Bunch of react hooks mostly built on top of Web APIs

[![npm version](https://img.shields.io/npm/v/@1px.one/react-hooks.svg?style=flat-square)](https://www.npmjs.com/package/@1px.one/react-hooks)


### Installation
    yarn add @1px.one/react-hooks
    
  or
    
    npm i @1px.one/react-hooks


### Description
* [`useNetworkStatus`](#network-status-hook) - Hook to detect online/offline network status.

* [`usePageVisibility`](#page-visibility-hook) - Hook built on top of Page Visibility API. Helps to detect active tab.

* [`useResizeObserver`](#resize-observer-hook) - Hook build on top Resize Observer API. It requires to pass callback to detect size changes of specified Element.

* [`useObservedSize`](#observed-size-hook) - Hook build on top `useResizeObserver` hook. Additionally returns `size` of specified Element. No callback needed.

* [`useFullscreen`](#fullscreen-hook) - Hook built on top of Fullscreen API. Used to present specified Element (and its descendants) in full-screen mode. 

* [`useLocalStorage`](#local-storage-hook) - Hook to set and get localstorage values.

* [`useDisclosure`](#disclosure-hook) - Hook to set toggle opened/closed state with additional callbacks.

* [`useClipboard`](#clipboard-hook) - Hook to copy text to clipboard.

* [`useElementHighlight`](#element-highlight-hook) - Hook to wrap specified Element with backdrop.

* [`useImagePreload`](#image-preload-hook) - Hook to preload image with loading and error states.

* [`useWhyDidYouUpdate`](#debug-hook) - Hook to log updated props and state inside components and other hooks. Helpful for development.


### Demo

Here's a [Demo](https://1pxone.github.io/react-hooks).

#### Network Status Hook

```javascript
...

import { useNetworkStatus } from '@1px.one/react-hooks';

function SomeComponent() {
    const online = useNetworkStatus();

    useEffect(() => {
        if (!online) {
            // save form to localstorage
        } else {
            // restore form from localstorage
        }
    }, [online]);

    return online ? <span>Connected</span> : <span>Connection lost</span>;
}
```

#### Page Visibility Hook

```javascript
...

import { usePageVisibility } from '@1px.one/react-hooks';

function SomeComponent() {
    const isVisible = usePageVisibility();

    useEffect(() => {
        if (!isVisible) {
            // stop playing video
        } else {
            // continue playing video
        }
    }, [isVisible]);

    return isVisible ? <span>Playing</span> : <span>Paused</span>;
}
```

#### Resize Observer Hook

```javascript
```

#### Observed Size Hook

```javascript
```

#### Fullscreen Hook

```javascript
```

#### Local Storage Hook

```javascript
...

import { useLocalStorage } from '@1px.one/react-hooks';

function SomeComponent() {
    const [value, setValue] = useLocalStorage('lastSubmit'); // store under the 'lastSubmit' key in LS

    const onSubmit = () => {
        const submitPayload = {
            user: 'John Doe',
            items: ['1', {foo: 'bar'}, 'baz'],
            date: new Date().getUTCDate()
        }       
        setValue(submitPayload)
    }; 
  
    const status = value 
        ?   <span>{value.user} submited at {value.date}</span>
        :   <span>Not submited yet!</span>;

    return (
        <>
            <button onClick={onSubmit}>Submit</button>
            {status}
        </>
    );
}
```

#### Disclosure hook

```javascript
...

import { useDisclosure } from '@1px.one/react-hooks';

function SomeComponent() {
    const onOpenCb = () => {
       console.log('content opened')
   }; 

    const onCloseCb = () => {
        console.log('content closed')
    }; 

    const { isOpen, open, close } = useDisclosure(false, onOpenCb, onCloseCb);
  
    const content = isOpen 
        ?   <span>Hello world!</span>
        :   null;

    return (
        <>
            <button onClick={isOpen ? close : open}>toggle content</button>
            {content}
        </>
    );
}
```

#### Clipboard hook

```javascript
```

#### Element Highlight Hook

```javascript
```

#### Image preload Hook

```javascript
```

#### Debug Hook

```javascript
...

import { useWhyDidYouUpdate } from '@1px.one/react-hooks';

function SomeComponent(props) {
    // This hook will show in console difference between props on each render.
    // It helps to debug complicated components.
    // This hook supports nested objects compare. Use it only in development mode.

    useWhyDidYouUpdate(props, 'my complicated component to debug'); 

    // also you can specify console prefix to identify current hook usage 

   
    // For example if props.name changed it will log:
    // [why-did-you-update] my complicated component to debug {name: { from: 'Jim', to: 'Joe' }}
        
    return (
        ...
    );
}
```

### TODO
* Add SSR support
