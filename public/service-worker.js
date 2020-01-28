// importScripts("/precache-manifest.dc06d27fdd615061ff86617f9ad1dba5.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// console.log("aaaaaaaaaaaa")

// if ("function" === typeof importScripts) {
//     importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");
//     /* global workbox */
//     if (workbox) {
//         console.log("Workbox is loaded");

//         /* injection point for manifest files.  */
//         workbox.precaching.precacheAndRoute([]);

//         /* custom cache rules*/
//         workbox.routing.registerNavigationRoute("/index.html", {
//             blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
//         });

//         workbox.routing.registerRoute(
//             /\.(?:png|gif|jpg|jpeg)$/,
//             workbox.strategies.cacheFirst({
//                 cacheName: "images",
//                 plugins: [
//                     new workbox.expiration.Plugin({
//                         maxEntries: 60,
//                         maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
//                     })
//                 ]
//             })
//         );
//     } else {
//         console.log("Workbox could not be loaded. No Offline support");
//     }
// }

"use strict";
function setOfCachedUrls(e) {
    return e
        .keys()
        .then(function(e) {
            return e.map(function(e) {
                return e.url;
            });
        })
        .then(function(e) {
            return new Set(e);
        });
}
var precacheConfig = [
        ["bundle.js", "32edf42bea779eaf0898c1b3f1ac80cb"],
        ["index.html", "895b711e319d78b26540833ed0f50939"],
        ["logo.png", "350b582d4dbc138b28f4e528ed1db934"],
        ["manifest.json", "76d2b37a958fa411dc8b44ba4074c257"],
        ["style.css", "c30bad4c42f11950d078a5e624d8ed86"]
    ],
    cacheName = "sw-precache-v3-sw-precache-webpack-plugin-" + (self.registration ? self.registration.scope : ""),
    ignoreUrlParametersMatching = [/^utm_/],
    addDirectoryIndex = function(e, t) {
        var n = new URL(e);
        return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString();
    },
    cleanResponse = function(e) {
        return e.redirected
            ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) {
                  return new Response(t, { headers: e.headers, status: e.status, statusText: e.statusText });
              })
            : Promise.resolve(e);
    },
    createCacheKey = function(e, t, n, r) {
        var a = new URL(e);
        return (
            (r && a.pathname.match(r)) ||
                (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)),
            a.toString()
        );
    },
    isPathWhitelisted = function(e, t) {
        if (0 === e.length) return !0;
        var n = new URL(t).pathname;
        return e.some(function(e) {
            return n.match(e);
        });
    },
    stripIgnoredUrlParameters = function(e, t) {
        var n = new URL(e);
        return (
            (n.hash = ""),
            (n.search = n.search
                .slice(1)
                .split("&")
                .map(function(e) {
                    return e.split("=");
                })
                .filter(function(e) {
                    return t.every(function(t) {
                        return !t.test(e[0]);
                    });
                })
                .map(function(e) {
                    return e.join("=");
                })
                .join("&")),
            n.toString()
        );
    },
    hashParamName = "_sw-precache",
    urlsToCacheKeys = new Map(
        precacheConfig.map(function(e) {
            var t = e[0],
                n = e[1],
                r = new URL(t, self.location),
                a = createCacheKey(r, hashParamName, n, /\.\w{8}\./);
            return [r.toString(), a];
        })
    );
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(function(e) {
                return setOfCachedUrls(e).then(function(t) {
                    return Promise.all(
                        Array.from(urlsToCacheKeys.values()).map(function(n) {
                            if (!t.has(n)) {
                                var r = new Request(n, { credentials: "same-origin" });
                                return fetch(r).then(function(t) {
                                    if (!t.ok)
                                        throw new Error("Request for " + n + " returned a response with status " + t.status);
                                    return cleanResponse(t).then(function(t) {
                                        return e.put(n, t);
                                    });
                                });
                            }
                        })
                    );
                });
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
}),
    self.addEventListener("activate", function(e) {
        var t = new Set(urlsToCacheKeys.values());
        e.waitUntil(
            caches
                .open(cacheName)
                .then(function(e) {
                    return e.keys().then(function(n) {
                        return Promise.all(
                            n.map(function(n) {
                                if (!t.has(n.url)) return e.delete(n);
                            })
                        );
                    });
                })
                .then(function() {
                    return self.clients.claim();
                })
        );
    }),
    self.addEventListener("fetch", function(e) {
        if ("GET" === e.request.method) {
            var t,
                n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
            (t = urlsToCacheKeys.has(n)) || ((n = addDirectoryIndex(n, "index.html")), (t = urlsToCacheKeys.has(n)));
            !t &&
                "navigate" === e.request.mode &&
                isPathWhitelisted([], e.request.url) &&
                ((n = new URL("/index.html", self.location).toString()), (t = urlsToCacheKeys.has(n))),
                t &&
                    e.respondWith(
                        caches
                            .open(cacheName)
                            .then(function(e) {
                                return e.match(urlsToCacheKeys.get(n)).then(function(e) {
                                    if (e) return e;
                                    throw Error("The cached response that was expected is missing.");
                                });
                            })
                            .catch(function(t) {
                                return (
                                    console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t),
                                    fetch(e.request)
                                );
                            })
                    );
        }
    });
