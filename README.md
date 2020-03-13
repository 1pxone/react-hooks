# React Hooks | 1px.one

Useful React Hooks

* [`useClipboard`](#clipboard-hook) - Hook to copy to clipboard
* [`useDebounce`](#debounce-hook) - Hook to make debounce
* [`useDelay`](#delay-hook) - Hook to make a delay
* [`useElementHighlight`](#element-highlight-hook) - Hook to highlight element 
* [`useFullscreen`](#fullscreen-hook) - Hook to handle a click outside an element
* [`useImagePreload`](#image-preload-hook) - Hook to make a GraphQL request

* [`useInterval`](#interval-hook) - Hook to connect to Hapijs NES
* [`useLocalStorage`](#local-storage-hook) - Hook to local storage
* [`useNetworkInfo`](#network-info-hook) - Hook to Cookies
* [`usePageVisibility`](#page-visibility-hook) - Hook for binding to hover of an element
* [`useResizeObserver`](#resize-observer-hook) - Hook for binding to an hander to DOM event
* [`useThrottle`](#throttle-hook) - Hook to set a favicon
* [`useWhyDidYouUpdate`](#debug-hook) - Hook to manipulate the page title

* [`useKeypress`](#keypress-hook) - Hook to Keypress
* [`useKeypressed`](#key-pressed-hook) - Hook to fire a method when the keydown is triggered

## Clipboard hook

```jsx
import React, { useEffect } from 'react'
import { useAsync } from '@brightleaf/react-hooks'

export default () => {
  const { loading, error, data, execute } = useAsync(asyncFunction)
  useEffect(() => {
    execute()
  }, [])
  if (loading) {
    return <div>Executing Async Function</div>
  }
  if (error) {
    return <div>Error executing async function</div>
  }
  return <div>{data}</div>
}
```

## Debounce Hook

```javascript
import React, { useState } from 'react'
import { useFetch } from '@brightleaf/react-hooks'
export default () => {
  const [id, setId] = useState(1)

  const { data, error, loading } = useFetch(
    `https://swapiql.herokuapp.com/api/characters/${id}`
  )
  if (error) {
    return (
      <div className="App">
        <h1>Error Getting Data</h1>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="App">
        <h1>Loading Data</h1>
      </div>
    )
  }
  return (
    <div className="App">
      <h1>{data[0].name}</h1>
    </div>
  )
}
```

## Delay Hook

```javascript
import React, { useState } from 'react'
import { useGraphQL } from '@brightleaf/react-hooks'

export default () => {
  const [id, setId] = useState(1)
  const { data, loading, error } = useGraphQL(
    'https://swapiql.herokuapp.com/graphql',
    `query Person($id: ID) {
      person(id: $id) {
        id,
        name
      }
    }`,
    { id }
  )
  if (loading) {
    return <div>Loading Data</div>
  }
  if (error) {
    return <div>Error getting graphql data</div>
  }
  return <div>{data.person[0].name}</div>
}
```

## Element Highlight Hook

```javascript
import React from 'react'
import { Button, Form, TextBox } from 'react-form-elements'
import { usePost } from '@brightleaf/react-hooks'

export default () => {
  const { data, error, loading, postData } = usePost(
    `https://kev-pi.herokuapp.com/api/echo`
  )

  if (loading) {
    return <div>Loading Data</div>
  }
  if (error) {
    return <div>Error getting graphql data</div>
  }
  return (
    <Form
      name="testForm"
      onSubmit={data => {
        postData(data)
      }}
    >
      <TextBox label="My Label" name="myTextBox" />
      <Button>Send</Button>
    </Form>
  )
}

```

## Fullscreen Hook

```javascript
import React, { useState } from 'react'
import { useGet } from '@brightleaf/react-hooks'
export default () => {
  const [id, setId] = useState(1)

  const { data, error, loading, getUrl } = useGet(
    `https://swapiql.herokuapp.com/api/characters/${id}`
  )
  if (error) {
    return (
      <div className="App">
        <h1>Error Getting Data</h1>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="App">
        <h1>Loading Data</h1>
      </div>
    )
  }
  return (
    <div className="App">
      <h1>{data[0].name}</h1>
      <h2>Pick a number</h2>
      <div className="select">
        <div
          onClick={e => {
            getUrl('https://swapiql.herokuapp.com/api/characters/2')
          }}
        >
          2
        </div>
      </div>
    </div>
  )
}
```

## Image preload Hook

```javascript
import React, { useState, useRef } from 'react'
import { useClickOutside } from '@brightleaf/react-hooks'

export default () => {
  const [menu, setMenu] = useState(false)
  const navMenu= useRef()
  const hideDropDown = () => {
    setMenu(false)
  }
  useClickOutside(navMenu, hideDropDowns, menu)

  return (
    <div className="App">
      <nav ref={navMenu}>
        <div className={`dropdown ${menu ? 'active' : ' '}`}>
          <button
            type="button"
            className="dropdown-trigger"
            onClick={e => {
              setMenu(!menu)
            }}
          >
            Menu
          </button>
          <div>
            ...// items
          </div>
        </div>
      </nav>
      ... // rest of page
    </div>
  )
}
```

## Interval Hook

```jsx
import React, { useEffect } from 'react'
import { useTitle } from '@brightleaf/react-hooks'

export default () => {
  useTitle('Brightleaf JS Hooks')

  return <div>The Page</div>
}
```

## Local Storage Hook

```javascript
import React, { useRef } from 'react'
import { useLocalStorage } from '@brightleaf/react-hooks'

export default () => {
  const [count, setCount] = useLocalStorage('count', 0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Network Info Hook

```javascript
import React, { useRef } from 'react'
import { useCookie } from '@brightleaf/react-hooks'

export default () => {
  const [count, setCount] = useCookie('count', 0);
  const [longCount, setLongCount] = useCookie('count', 0, { expires: 21 });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Resize Observer Hook

```javascript
import React from 'react'
import { useStyles } from '@brightleaf/react-hooks'

export default () => {
   useStyles(`
    html,
    body {
        font-family: 'Open Sans';
    }
    div {
        padding: 5px;
        border: 1px solid #ccc;
    }
  `)

  return (
    <div>
      <div>
        Something
      </div>
    </div>
  );
}
```

## Throttle Hook

```javascript
import React from 'react'
import { useStyleSheet } from '@brightleaf/react-hooks'

export default () => {
  useStyleSheet(
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
  )
  useStyleSheet('https://fonts.googleapis.com/css?family=Open+Sans')

  return (
    <div>
      ...
    </div>
  );
}
```

## Page Visibility Hook

```javascript
import React from 'react'
import { usePageVisibility } from '@brightleaf/react-hooks'

export default () => {
  const { visible, hidden } = usePageVisibility()

  return (
    <div>
      ...
    </div>
  );
}
```

## Debug Hook

```javascript
import React from 'react'
import { useScript } from '@brightleaf/react-hooks'

export default () => {
  useScript('/js/script.js')

  return (
    <div>
      ...
    </div>
  );
}
```

## Keypress Hook

```jsx
import React from 'react'
import { useKeypress } from '@brightleaf/react-hooks'
export default () => {
  const aKeyDown = useKeypress('a')
  return (
    <div className="App content">
      <h2>Key Press?</h2>
      {aKeyDown && (
        <div>
          Yes, the <b>{'"a"'}</b> key is pressed
        </div>
      )}
      {!keyDown && <div>No the <b>{'"a"'}</b> key is not currently pressed</div>}
    </div>
  )
}
```

## Key Pressed Hook

```jsx
import React, { useState } from 'react'
import { useKeypressed } from '@brightleaf/react-hooks'
export default () => {

  const keyPressed = useKeypressed('a')

  return (
    <div className="App content">
      <h2>Key Press?</h2>
      {keyPressed && (
        <div>
          Yes, the <b>{'"a"'}</b> key has been pressed
        </div>
      )}
      {!keyPressed && <div>No the <b>{'"a"'}</b> key is not been pressed yet</div>}
    </div>
  )
}
```
