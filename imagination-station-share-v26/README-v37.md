# Imagination Station v37 — Secure Creator Vault + Verified Release

**Date:** November 13, 2026 (Central).  **Creator vision:** One imagination. One personalized world. One integrated studio.

## What this version changes

1. Adds an optional **encrypted complete-project travel case** to the existing Creator Vault. It encrypts local ideas, C5 character canon, commercials, conversations/task history, personalized world, Cinema Bibles and Clip Assembly edit plans in the browser with AES-256-GCM and PBKDF2-SHA-256 (350,000 iterations). Each export uses a cryptographically random 16-byte salt and 12-byte nonce. Never stores or uploads the creator passphrase. Minimum passphrase: 14 characters; recommend a unique longer phrase. The .isvault file is meaningless without its password, but it can still be deleted/lost, and this encryption does not protect the running browser from a compromised device.
2. Adds **encrypted restore** that first decrypts, then invokes the existing *validated* Merge/Replace process and its user confirmations. Wrong password, damaged ciphertext, invalid schema, and oversized payloads are rejected. The plain JSON backup remains as a deliberately labeled option, and it remains unencrypted.
3. Adds **Release 37 readiness** near device diagnostics. It checks the invitation session and the availability/size/type of protected sample MP4 and MP3 media. It reports that real AI provider generation and individual cloud accounts are not connected. This is separate from browser media-storage diagnostics.
4. Makes the Node gateway expose an authenticated `/readiness` summary without revealing any creator content, API credentials or invitation token. Public `/health` reports version 37. Existing MP4 HTTP byte ranges and protected media delivery remain intact. Adds HSTS.
5. Leaves the immersive entrance, Creative Director chat, Idea Mutant, Character Forge, Video Render Dock, Cinema Director, Clip Assembly, Screening Room, and local Media Vault in place. The existing invitation link is unchanged.

## How to use

In the guest studio, enter your world and go to **Creator Vault**. Choose **Encrypted Travel Case**, enter/confirm a unique long passphrase and click **Encrypt & download complete project backup**. Save both file and passphrase safely. On your next device, use the same shareable studio link, open **Creator Vault**, choose the `.isvault` file, enter the passphrase, and select **Merge** or **Replace** using the existing confirmation flow. **Transfer original MP4/MP3/art files separately**; the project backup stores metadata and edit plans only, not large binary media. You must reimport original footage to edit the saved cut.

Run **Verify this live studio** under Device Readiness to check actual authenticated media delivery from the phone/browser. A pass does not certify browser media capacity or external AI generation; run the separate local storage diagnostic as well.

## Verification completed

- 13 embedded JavaScript blocks and Node gateway passed Node syntax checks.
- Real Node Web Crypto PBKDF2+AES-256-GCM encryption/decryption round-trip passed with wrong-passphrase and tamper rejections.
- Mobile-sized Chromium UI loaded with zero JS errors using an in-memory localStorage shim; validated full backup payload, security form controls and explicit passphrase confirmation.
- Mocked release-health responses exercised both PASS and NOT VERIFIED displays (no claim of external browser HTTP acceptance).
- Local Node HTTP server with **test-only invitation credentials** passed anonymous access denial, invalid-origin/invalid-token denial, secure HttpOnly cookie, authenticated `/readiness`, authenticated protected MP4/MP3, HTTP Range 206 and invalid Range 416.
- Sample files, engine scripts, and Version 36 rollback are included.

## Still genuinely unfinished

- Real end-user Android HTTPS/WebCrypto and persistent IndexedDB acceptance tests remain unverified in this environment.
- The external AI-video inference provider has no verified production backend configuration or authorized paid budget. No provider render is claimed.
- Individual account registration/email and cloud sync remain blocked: Supabase default SMTP limits email delivery to preauthorized project-team addresses, so arbitrary invited guest registration needs verified SMTP and owner approval. A public login pretending otherwise is deliberately not present.
- Server-side durable jobs, payment metering and full AI character animation are not implemented.
- A password-protected backup **is not** a hosted backup. Users must keep the file and passphrase.

## Security and deployment rules

Never commit the owner-specific HTML, private user canon, service-role keys, access tokens or invitation fragment to the public GitHub repo. The public repo contains only safe clean guest application source and original sample media. Keep `$0` automatic paid provider use and the browser's explicit opt-in behavior. Invite links are bearer capabilities: holders can forward them. Render's server remains a free web service with autoDeploy disabled.

Rollback: restore the provided `rollback/v36-guest.html` and `rollback/v36-server.js` into the guest repo directory and trigger a new manual Render deployment. Browser localStorage and IndexedDB should be preserved by a normal code rollback, but creators must keep backups.