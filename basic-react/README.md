This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.

# Web UI Scenarios - Basic React application

Make sure that you first expose an API to connect to before following the steps below. To use the sample provided, first go through the steps listed in [API extension sample](https://zowe.github.io/docs-site/samples/api.html).

## Troubleshooting Suggestions:

If you are running into issues, try these suggestions:

- Restart the Zowe Server/ VM.
- Double check that the name in the plugins folder matches your identifier in `pluginsDefinition.json` located in the Zowe root.
- After logging into the MVD, use the Chrome/ Firefox developer tools and navigate to the "network" tab to see what errors you are getting.
- Check each file with `cat <filename>` to be sure it wasn't corrupted while uploading. Try uploading with different methods like SCP or SFTP if so.

For this section we have provided a react sample (found below), which connects to the API defined in the API extension sample.

## To Install

1.  Point your project to the server hosting you API.
    - In the sample this can be defined in the `Constants.js` file.
    - The default is: `localhost:7443`, but otherwise point to your hardware address.
2.  Create a minified version of your project.
    - Generate minified version using `npm run build`
3.  Create folder for project and create new `web` folder inside it.
    - EX: `/Desktop/<Your_Project_Name>` and `Desktop/<Your_Project_Name>/web`
4.  Copy built project into `Desktop/<Your_Project_Name>/web`
    - Move `app.min.js`, `index.html` , `icon.png` and `css` into to `/Desktop/<Your_Project_Name>/web/`
5.  Copy the `pluginDefinition.json` to `Desktop/<Your_Project_Name>/`
6.  Copy project from `/Desktop` to `<zowe_base>/`
    - Use `scp <userID>@<server> /Users/path/to/files <zowe_base>/`
7.  Create new file within the plugins folder (`<zowe_base>/zlux-example-server-plugins`) called `com.basic-react.json`
    - `touch com.basic-react.json`
8.  Edit this folder (using vi) to read:

```json
{
  "identifier": "com.basic-react",
  "pluginLocation": "../../basic-react"
}
```

9.  Run `./deploy.sh` found in `<zowe_base>/zlux-build`
10. Run `./zoe-stop.sh` found in `<zowe_base>/scripts`
11. Run `./zoe-start.sh` found in `<zowe_base>/scripts`

## Verify Install

Upon restarting the server, navigate to the zlux server.

- This can be found at: `https://<base>:<port>/ZLUX/plugins/com.rs.mvd/web/`

Check to make sure that your new plugin has been added and that it is able to interact with the server.

If it is not able to interact with the server and you are getting CORS errors, you may need to update the server to accept all connections.

_Note: This is for development purposes only_

To update the server:

- Navigate to `<zowe-base>/explorer-server/wlp/usr/servers/Atlas/server.xml`
- Open to the file with vi and paste the following code in.

```javascript
<!-- FOR TESTING ONLY -->
    <cors allowCredentials="true" allowedMethods="GET, DELETE, POST, PUT, OPTIONS" allowedOrigins="*" allowedHeaders="*" domain="/"/>
<!-- /FOR TESTING ONLY -->
```
