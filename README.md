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
```

6. Add custom headers for security
   File: customHttp.yml

```
customHeaders:
  - pattern: '**'
    headers:
      - key: Strict-Transport-Security
        value: max-age=31536000; includeSubDomains
      - key: X-Frame-Options
        value: SAMEORIGIN
      - key: X-XSS-Protection
        value: 1; mode=block
      - key: X-Content-Type-Options
        value: nosniff
      - key: Content-Security-Policy
        value: >-
            connect-src 'self';
            script-src 'self' '<SHA256_FILE_INLINE_SCRIPT>' '<SHA256_FILE_INLINE_SCRIPT_IFRAME>';
            style-src-elem 'self' '<SHA256_FILE_INLINE_STYLE>' https://fonts.googleapis.com/;
            img-src 'self';
            frame-src {IFRAME_URL/};
            frame-ancestors 'none';
            font-src 'self' https://fonts.gstatic.com/;
            media-src 'none'; object-src 'none';
            manifest-src 'none'; form-action 'self';
```

7. Save and deploy
