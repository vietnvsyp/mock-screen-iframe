# TagTag mock site

## Local build

```bash
# npm
npm install

```

Start server on `http://localhost:3000`

```bash
npm run dev
```

## AWS setup

```bash
1. Login to AWS console

2. Create new app `Host web app`

3. Connect to this Git repository / branch

4. Edit Build setting for `amplify.yml`
   Build command: `yarn generate`
   baseDirectory: `dist/`

5. Add environment variables
   `IFRAME_URL = {URL of frontend server}`

6. Save and deploy


```
