export function Container() {
  return (
    <div>
      <div className="container prose max-w-none">
        <h1>Container</h1>
        <h2 id="description">Description</h2>
        <p>
          By default all components render across the full width of the
          viewport. You can use the <code>.container</code> class to create a
          contained layout. The container class uses the values set in{" "}
          <code>outerGutters</code> and <code>containerWidths</code> in your{" "}
          <code>tailwind.config.js</code> to create a responsive container.
        </p>
        <p>
          Note that the default Tailwind container plugin will need to be
          disabled.
        </p>
        <p>
          Also includes a <code>.breakout</code> class to allow full 100vw
          elements inside a container.
        </p>
        <ul>
          <li>
            <code>.container</code> makes a container that conforms to your{" "}
            <code>theme.containerWidths</code> taking into account your{" "}
            <code>theme.outerGutters</code>
          </li>
          <li>
            <code>.breakout</code> breaks out of a <code>.container</code>, to
            make your element <code>100vw</code> wide
          </li>
          <li>
            <code>.container-reset</code> resets a <code>.container</code>
          </li>
          <li>
            <code>.breakout-reset</code> resets a <code>.breakout</code>
          </li>
        </ul>

        <h2 id="demo">Demo</h2>

        <h3 id="container">Container</h3>

        <p>
          This site has its content wrapped in{" "}
          <code>{`<div class="container">`}</code>. You'll see it is fluid with
          outer margins set to the
          <code>outerGutters</code> for each breakpoint. At then, when the
          window is wider than 1536px wide (<code>theme.screens.2xl</code>) the
          main column is a fixed width of 960px (
          <code>theme.containerWidths.2xl</code>) and centered within the
          window.
        </p>

        <h4 id="container-nesting">Container nesting</h4>

        <div className="container bg-blue-600/20 mt-5 py-5">
          <div className="container bg-blue-600/20 py-5">
            <p>
              <code>{`.container > .container > .container`}</code>
            </p>
          </div>
        </div>

        <div>
          <figure>
            <figcaption>document.html</figcaption>
            <pre>
              <code>
                {`<div class="container">
  <div class="container">
    ...
  </div>
</div>
`}
              </code>
            </pre>
          </figure>

          <p>
            Nesting of <code>.container</code> inside of <code>.breakout</code>,{" "}
            <code>.breakout-reset</code> and <code>.container-reset</code>{" "}
            should{" "}
            <a href="./container-nesting-tests.html">all work as expected</a>.
          </p>

          <h3 id="container_reset">Container Reset</h3>

          <p>
            Instead of wrapping all your pages in <code>.container</code>,
            perhaps you wrap each of your components, and then perhaps at some
            breakpoint you want go full bleed. In which case{" "}
            <code>.container-reset</code> will be useful. Here, at the{" "}
            <code>lg</code> breakpoint, a <code>.container</code> resets to full
            bleed:
          </p>
        </div>
      </div>
      <div className="container lg:container-reset mt-5 bg-blue-600/20 p-5">
        <p>...</p>
      </div>
      <div className="container prose max-w-none">
        <div>
          <figure>
            <figcaption>document.html</figcaption>
            <pre>
              <code>
                {`<div class="container lg:container-reset">
  ...
</div>
`}
              </code>
            </pre>
          </figure>
        </div>
      </div>
    </div>
  );
}
