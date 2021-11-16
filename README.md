# die-with-stdin

This is a simple script that launches its argumets as child process and ensures the process is killed when
parent stdin exits. It is similar to webpack's `--watch-stdin` but should be usable with any npm script (at least in theory).

## Reason for being
This script has been created out of frustration with zombie processes left around when restarting Elixir/Phoenix dev instances. With this library any npm watcher script prefixed with `die-with-stdin` should exit correctly when phoenix is killed.

## Usage
### Install
```bash
npm install --save-dev die-with-stdin
```


### Use
```json
    ...,
    "scripts": {
        ...,
        "tailwind:dev": "die-with-stdin tailwindcss --input=css/app.css --output=../priv/static/assets/app.css --postcss --watch",
    },
    ...
```

### Use with Phoenix
Edit `config/dev.exs`
```elixir
config :your_project, YourProject.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]},
    npm: [
      "run",
      "dev:css",
      cd: Path.expand("../assets", __DIR__)
    ]
  ]
```

## NOTE:
This module has been developed on LINUX and is actively being used on Mac. Windows is NOT actively supported. If anyone is interested in testing it/patching it for Windows - PRs are welcome.

## LICENSE
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.