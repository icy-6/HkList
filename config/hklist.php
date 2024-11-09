<?php

return [
    "fake_user_agent" => env("HKLIST_FAKE_USER_AGENT", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"),
    "fake_wx_user_agent" => env("HKLIST_FAKE_WX_USER_AGENT", "Mozilla/5.0 (Linux; Android 7.1.1; MI 6 Build/NMF26X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043807 Mobile Safari/537.36 MicroMessenger/6.6.1.1220(0x26060135) NetType/4G Language/zh_CN MicroMessenger/6.6.1.1220(0x26060135) NetType/4G Language/zh_CN miniProgram"),
    "fake_cookie" => env("HKLIST_FAKE_COOKIE", "BAIDUID=A4FDFAE43DDBF7E6956B02F6EF715373:FG=1; BAIDUID_BFESS=A4FDFAE43DDBF7E6956B02F6EF715373:FG=1; newlogin=1"),

    "admin_password" => env("HKLIST_ADMIN_PASSWORD", ""),
    "parse_password" => env("HKLIST_PARSE_PASSWORD", ""),
];
