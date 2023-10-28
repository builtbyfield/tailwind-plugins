/**
 * Type definition for a callback function.
 * The function can accept any number of arguments of any type.
 */
type Callback = (...args: unknown[]) => void;

/**
 * Creates a throttled version of a function that only invokes the provided function at most once every `limit` milliseconds.
 *
 * @param func - The function to throttle.
 * @param limit - The number of milliseconds to wait before invoking the function again.
 * @returns A new, throttled function.
 */
function throttle(func: Callback, limit: number): Callback {
  // Store the ID of the timeout between function calls
  let lastFunc: ReturnType<typeof setTimeout> | undefined;
  // Store the timestamp of the last time the function was invoked
  let lastRan: number | undefined;

  // Return a new function that controls when `func` gets called
  return (...args: unknown[]) => {
    // If `func` hasn't been called yet, call it and record the call time
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      // If `func` has been called before, clear the previous timeout and set a new one
      if (lastFunc) clearTimeout(lastFunc);

      lastFunc = setTimeout(() => {
        // If the specified `limit` has passed since the last call to `func`, call `func` again and record the call time
        if (Date.now() - (lastRan as number) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - (lastRan as number)));
    }
  };
}

/**
 * Creates a div element, sets its overflow to scroll, appends it to the body,
 * calculates the width of the scrollbar by subtracting the clientWidth from the offsetWidth of the div,
 * removes the div from the body, and finally returns the calculated scrollbar width.
 *
 * @returns {number} The width of the scrollbar.
 */
export function getScrollBarWidth(): number {
  // Create a new div element
  const scrollBox = document.createElement("div");
  // Make it scrollable
  scrollBox.style.overflow = "scroll";
  // Add it to the body of the document
  document.body.appendChild(scrollBox);
  // Calculate the width of the scrollbar
  const scrollBarWidth = scrollBox.offsetWidth - scrollBox.clientWidth;
  // Remove the div from the body
  document.body.removeChild(scrollBox);
  // Return the width of the scrollbar
  return scrollBarWidth;
}

/**
 * Calculates the width of the scrollbar and sets it to a CSS variable.
 * It also listens to the window's load and resize events to adjust the scrollbar width accordingly.
 *
 * @function setScrollBarVisible
 * @returns {void}
 */
export function setScrollBarVisible(): void {
  // Get the width of the scrollbar
  const scrollBarWidth = getScrollBarWidth();
  // Check if the scrollbar is visible
  const scrollBarVisible =
    document.documentElement.scrollHeight >
    document.documentElement.clientHeight;
  // Check if the overflow-y property is set to scroll
  const overflowYSet =
    window
      .getComputedStyle(document.documentElement, null)
      .getPropertyValue("overflow-y") === "scroll";
  // Set the CSS variable --scrollbar-visible-width to the width of the scrollbar if it's visible, or 0px if it's not
  document.documentElement.style.setProperty(
    "--scrollbar-visible-width",
    `${scrollBarVisible || overflowYSet ? scrollBarWidth : 0}px`
  );
}

/**
 * Calculates the width of the scrollbar and sets it to a CSS variable.
 * It also listens to the window's load and resize events to adjust the scrollbar width accordingly.
 *
 * @function scrollbarVisibleWidth
 * @param {Object} [throttleOptions] - The options for throttling the setScrollBarVisible function.
 * @param {boolean|number} [throttleOptions.throttle=true] - Whether or not to throttle the setScrollBarVisible function.
 * @returns {void} Returns a void value but sets the CSS variable `--scrollbar-visible-width` to the width of the scrollbar.
 */
export function scrollbarVisibleWidth({
  throttle: _throttle = 200,
}: {
  throttle?: boolean | number;
}): void {
  const setScrollBarVisibleFn = () => {
    // If throttleOptions is false or less than or equal to 0, don't throttle the setScrollBarVisible function
    if (
      (typeof _throttle === "boolean" && _throttle === false) ||
      (typeof _throttle === "number" && _throttle <= 0)
    ) {
      return setScrollBarVisible();
    }

    if (typeof _throttle === "boolean" && _throttle === true) {
      // Throttled version of setScrollBarVisible function with a default throttle of 200ms
      return throttle(setScrollBarVisible, 200);
    }

    // Throttled version of setScrollBarVisible function
    return throttle(setScrollBarVisible, _throttle);
  };

  // Call the setScrollBarVisible function when the window is loaded
  window.addEventListener("load", setScrollBarVisibleFn);
  // Call the setScrollBarVisible function when the window is resized
  window.addEventListener("resize", setScrollBarVisibleFn);
}
