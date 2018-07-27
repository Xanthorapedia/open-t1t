# open-t1t
A reproduction of WechatJump

### Installation (for offline rendering)
  - Follow the [instructions](https://github.com/Automattic/node-canvas#compiling) to install canvas dependencies.
  - ```bash
    npm install
    ```

### Run
  - Either open `index.html` in your browser
  - Or
    ```bash
    $ node index.js
    ```
    to start the rendering server and
    ```bash
    $ python reqState.py
    ```
    to start a client which fetches the game state
    ##### Note:
    If textures are not loaded correctly, it is possible that file access is blocked. Try add `--allow-file-access-from-files` (for Chrome) flag at browser launch like [this](https://stackoverflow.com/questions/18586921/how-to-launch-html-using-chrome-at-allow-file-access-from-files-mode).
