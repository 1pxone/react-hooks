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

* [`useObservedSize`](#resize-observer-hook) - Hook build on top `useResizeObserver` hook. Additionally returns `size` of specified Element. No callback needed.

* [`useFullscreen`](#fullscreen-hook) - Hook built on top of Fullscreen API. Used to present specified Element (and its descendants) in full-screen mode. 

* [`useLocalStorage`](#local-storage-hook) - Hook to set and get localstorage values.

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

####Page Visibility Hook

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

####Resize Observer Hook

```javascript
```

####Observed Size Hook

```javascript
```

####Fullscreen Hook

```javascript
```

####Local Storage Hook

```javascript
```

####Clipboard hook

```javascript
```

####Element Highlight Hook

```javascript
```

####Image preload Hook

```javascript
```

####Debug Hook

```javascript
```
