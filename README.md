# Oculus Graph
Unofficial Oculus Graph API

## Feature
* [x] Request GraphQL
    * [x] section list
    * [x] application list in specific section
    * [x] application information


## How to get Authorization key?
0. [Packet Capture](https://play.google.com/store/apps/details?id=app.greyshirts.sslcapture)
1. Enable capture packet
2. Launch Oclus
3. See captured packet. You can find `Authorization: Bearer ....` in packet.

## How to run demo?
```bash
export OCULUS_AUTH_KEY="Bearer xxxxxx"
node demo.js
```

## GraphQL

### Sections
```
section_name,
items.after(<cursor>).first(<count>) {
  nodes {
    id,
    display_name,
  },
  page_info {
    start_cursor,
    end_cursor,
    has_next_page,
  },
},
```

### Application
```
id,
display_name,
category,
category_name,
latest_supported_binary {
  id,
  package_name,
  version,
  version_code,
  size,
  permissions,
  user_quality_rating {
    id,
    author {
      id,
      alias,
      name,
      profile_photo.size(360x360) as avatar {
        name,
        uri,
        width,
        height,
      },
    },
    date,
    score,
    review_title,
    review_description,
  },
  uri,
},
cover_landscape_image.size(720x405) {
  name,
  uri,
},
cover_landscape_image.size(360x203) as thumbnail {
  name,
  uri,
},
display_long_description,
display_short_description,
is_gamepad_required,
app_viewer_id,
is_viewer_entitled,
internet_connection,
internet_connection_name,
user_interaction_modes,
user_interaction_mode_names,
supported_in_app_languages {
  tag,
  name,
},
current_offer {
  id,
  price {
    offset_amount,
    formatted,
  },
},
quality_rating_average_current_version,
quality_rating_histogram_current_version {
  star_rating,
  count,
},
```

### user
```
id,
email,
name,
notifications
  .notification_type(room_invite)
  .application_platform(android)
  .sent_after(<sent_after>) {
  nodes {
    is_read,
  },
},
profile_photo.size(<pic_dimension>) {
  name,
  uri,
  width,
  height,
},
friend_requests_received_2 {
  count,
},
friends {
  count,
},
alias,
is_pin_set,
current_room {
  nodes {
    app {
      display_name,
    },
  },
},
payment_methods {
  nodes {
    id,
    last4,
    card_type,
  },
},
```

## Known Constants
* Application `Snake VR` id : 992503684170594

* Node `Spotlight` category id : 1935996033291466
* Node `Experiences` category id : 930388057074475
* Node `Apps` category id : 151512185206033
* Node `Games` category id : 1546709722301834
* Node `Top Free VR` category id : 566241156859665
* Node `Top Selling VR` category id: 1015654725165422
* Node `Concepts` category id : 184404451907866
* Node `Must Haves` category id : 1656680354599468
* Node `New & Noteworthy` category id : 1028559983874769
* Node `Entertainment` category id : 1512624839034652
* Node `Samsung Picks` category id : 1049478685139267
