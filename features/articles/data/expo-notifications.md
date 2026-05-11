---
title: Sending notifications from Expo is 💋
date: 2026-05-10
summary: >
  If you have delayed implementing notifications, let me show you how easy it is...
img: /images/expo-banner.png
---

I'm not sure why, but I was slightly intimidated by the thought of starting notification integration into the react native app I'm currently working on _(more about the app at a later date!)_.

Having now implemented a working notification system using Expo, I can confidently say it's quite easy and straightforward. Let me explain the mental model:

- **You ask for notification permission** (after login, for example) → Expo returns a _push token_. This is a unique string that represents the device the user is logged in with. Store it in your session, or database.
- **When you want to send notifications** → Use Expo to send a notification to a given list of _push tokens_.
- **When a user logs out** → Remove the push token

It's really that simple, and since we're using Expo it's very easy to set up. Let me show you an example of what the code looks like on the server, where you fire off the notifications (in this case, a python server):

:::window
/main.py

```python
from exponent_server_sdk import (
    PushClient,
    PushMessage,
)

client = PushClient()
for token in tokens:
    client.publish(
        PushMessage(
            to=token,
            title="You got poked! 👆",
            body=f"{sender_username} just poked you",
            data={"type": "poke"},
        )
    )
```

:::

> One thing worth adding is a way to handle invalid or expired push tokens — `client.publish` (or whatever equivalent in your language) will raise an error for tokens that are no longer valid, so you should probably remove those from your database when that happens.

And to get the token on the client:

:::window
/services/notifications.ts

```tsx
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function getPushToken() {
  if (!Device.isDevice) return null;

  // get existing permissions
  const { status } = await Notifications.getPermissionsAsync();

  let finalStatus = status;

  if (status !== "granted") {
    // request permissions
    const permissions =
      await Notifications.requestPermissionsAsync();
    finalStatus = permissions.status;
  }

  // if permissions are denied, no push token is produced
  if (finalStatus !== "granted") return null;

  // otherwise, we produce a push token and return it
  const pushToken = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  });

  return pushToken.data;
}
```

:::

Other than making the required database changes to support storing the push tokens, this is pretty much it! If you've been putting this off for the same reason I was, hopefully this gives you the nudge you need.
