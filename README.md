# React Hooks | 1px.one

Bunch of React hooks mostly built on top of Web APIs

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

This hook built on top of [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

```javascript
...

import { useResizeObserver } from '@1px.one/react-hooks';

function SomeComponent() {
	const [wrapperHeight, setHeight] = useState<number | undefined>();
	const ref = useResizeObserver<HTMLDivElement>({
		onResize: ({ height, width }) => setHeight(height)
	});
	const [blocks, addBlock] = useState([]);

	const onAdd = () => {
		addBlock([...blocks, (Math.random() * 100 + 50).toFixed(0) + "px"]);
	};
	const onDelete = (index) => {
		addBlock(blocks.filter((_, i) => index !== i));
	};
	return (
		<>
			<p>Height: {wrapperHeight}</p>
			<button onClick={onAdd}>Add +</button>
			<div ref={ref}>
				{blocks.map((block, index) => (
					<div
						style={{
							height: block,
							backgroundColor: index % 2 ? "gray" : "lightgray"
						}}>
						Block height: {block}
						<br />
						<button onClick={() => onDelete(index)}>Delete</button>
					</div>
				))}
			</div>
		</>
	);
}

```

#### Observed Size Hook

This hook built on top of [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
and uses `useResizeObserver` hook inside to automate getting `size` of specified element.
Optionally, you can path `deboubceMs` argument to hook, it will slowdown changing `size` value if needed, but not
effects on visual element size changing. Could be useful to prevent expensive re-rendering.


```javascript
...

import { useResizeObserver } from '@1px.one/react-hooks';

function SomeComponent() {
	const [ref, size] = useObservedSize<HTMLDivElement>(100);
	const [blocks, addBlock] = useState([]);

	const onAdd = () => {
		addBlock([...blocks, (Math.random() * 100 + 50).toFixed(0) + "px"]);
	};
	const onDelete = (index) => {
		addBlock(blocks.filter((_, i) => index !== i));
	};
	return (
		<>
			<p>Height: {size.heigth}</p>
			<button onClick={onAdd}>Add +</button>
			<div ref={ref}>
				{blocks.map((block, index) => (
					<div
						style={{
							height: block,
							backgroundColor: index % 2 ? "gray" : "lightgray"
						}}>
						Block height: {block}
						<br />
						<button onClick={() => onDelete(index)}>Delete</button>
					</div>
				))}
			</div>
		</>
	);
}
```

#### Fullscreen Hook

```javascript
...

import { useFullScreen } from '@1px.one/react-hooks';

function SomeComponent() {
    const playerElement = useRef<HTMLVideoElement>(null);

    const { open, close, toggleFullScreen, isFullScreen } = useFullScreen({ element: playerElement });
    
    return (
        <>
            <button onClick={toggleFullScreen}>Toggle fullscreen</button>
            <video poster="video/preview.jpg" ref={playerElement}>
                <source src="video/cats.ogv" type='video/ogg; codecs="theora, vorbis"'>
                <source src="video/cats.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                <source src="video/cats.webm" type='video/webm; codecs="vp8, vorbis"'>
            </video>
        </>
    );
}
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
...

import { useClipboard } from '@1px.one/react-hooks';

function SomeComponent() {
    const onCopyCb = () => {
       console.log('Copied');
    }; 

    // optional successResetIntervalMs parameter 
    // to set hasCopied to false in timeout
    // defaults = 500 ms
    const { copy, hasCopied } = useClipboard(onCopyCb, 1000);
    
    const onCopyClick = () => {
        copy('Hello world!') // any text
    }

    useEffect(()=>{
        if (hasCopied) {
            alert('Successfully copied!')
        }       
    },[hasCopied]);

    return (
        <button onClick={onCopyClick}>Copy text</button>
    );
}
```

#### Element Highlight Hook

Could be used to build onboarding scenario or learning interactive guide.
This hook renders `Backdrop` to highlight selected element and provides callbacks
to set elements by calling `setElement` returned second from hook.

It allows to set additional props to `Backdrop` but also supports all default `HTMLDivElement` props.

You can configure `Backdrop` view by setting

`backdropColor` (defaults: `rgba(0,0,0,0.75)`),

 `zIndex` (defaults: `999`) and 
 
 `overlay` (defaults: `false`).
 
If `overlay` set to `true` it will render overlaying `<div />` to block user iteration with selected element.


@TODO: Smooth animation, resizing, highlighting dynamic elements

```javascript
...

import { useElementHighLight } from '@1px.one/react-hooks';

function SomeComponent() {
	const [value, setValue] = useState("");
	const inputRef = React.useRef();

	const [currentElement, setElement, Backdrop] = useElementHighLight<
		HTMLDivElement,
		{ someExtraPropsToBackDrop: string }
	>({ overlay: false, backdropColor: "rgba(0,0,0,0.75)", zIndex: 999 });

	React.useEffect(() => {
		setElement(inputRef.current);
	}, [inputRef]);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		if (value.length > 3) {
			setElement(null);
		}
	}, [value]);

	const onBackdropClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<>
			<Backdrop onClick={onBackdropClick}someExtraPropsToBackDrop={'foo'} />
			<input value={value} onChange={onChange} ref={inputRef} />
		</>
	);
}
```

#### Image preload Hook

```javascript
...

import { useImagePreload } from '@1px.one/react-hooks';

const imgSrc = 'https://example.com/static/dog.jpg';
const imgPlaceholder = 'https://example.com/static/placeholder.jpg'; // optionally


export const SomeComponent = () => {
    const { source, loading, error } = useImagePreload(imgSrc, imgPlaceholder);


    if (loading) {
        return (
            <span>Image loading...</span>
        );
    } else if (error) {
        return (
            <span>Error occured</span>
        );
    } else {
        return  (
            <img src={source} alt="dog"/>
        );
    }
}
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
* Add demo
* Tests
* Add useAccelerometer
* Add useParallax
